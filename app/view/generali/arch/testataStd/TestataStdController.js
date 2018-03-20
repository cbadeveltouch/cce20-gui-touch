Ext.define('Generali.arch.testataStd.TestataStdController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-arch-testatastd-testatastd',
    
    changeData: function(th, newValue){
    	this.lookupReference('DataTestata').setHtml(StdCba.FormattaData(newValue));
    },
    
   showPnlRicerca: function(th){
		this.pnlRicerca.showBy(this.lookupReference('BtnAvanzate'), "tl-tr?");
	},

    navigaButton: function (th) {
		this.naviga(th.direzione, th);
	},
	
	naviga: function(direzione, btn){
		var me = this,
			rec,
			sinistra = direzione == 'sinistra',
			url;		
			
		//* Prendo i dati del quarto record (indice 3)
		if(sinistra){			
			rec = me.storeRegistrazioni.getAt(0); 
			url = me.urlNext;
		}else{			
			rec = me.storeRegistrazioni.getAt(me.storeRegistrazioni.getCount()-1);
			url = me.urlPrev;
		}
		if(Ext.isEmpty(rec)){
			me.controllerForm.aggiornaStore();
			return false;
		}
		var parametri = {
			id: rec.get('id'),
			data: rec.get('data'),
			tipoTestata: me.controllerForm.cbaConfig.tipoTestata,
			idRicovero: me.anagraficaCorrente.idRicovero,
			idProfilo: me.idProfilo,
			compilatore: me.compilatore
		};

		//per ingresso da progetti diversi da cartella vedi scheda far bina viene passato il loro idRicovero
		if (Ext.isDefined(me.anagraficaCorrente.idRicoveroCu)) {
			
			if (!me.anagraficaCorrente.idRicovero) {
				delete parametri.idRicovero;
			}
			
			Ext.apply(parametri, {
				idRicoveroCu: me.anagraficaCorrente.idRicoveroCu
			});
		}
		
		if(me.controllerForm.cbaConfig.sottoTipoTestata)
			Ext.apply(parametri, {
				sottoTipoTestata: me.controllerForm.cbaConfig.sottoTipoTestata
			});
		
		if(me.lookupReference('BtnAvanzate').cbaConfig && me.lookupReference('BtnAvanzate').cbaConfig.attivo){
			Ext.apply(parametri, me.pnlRicerca.down('formpanel').getValues());
			parametri.me = StdCba.getBoolValue(parametri.me);
			parametri.avanzate = StdCba.getBoolValue(parametri.avanzate);
			let dateAlAppo = Ext.clone(parametri.al)
			dateAlAppo.setHours(23)
			dateAlAppo.setMinutes(59)
			Ext.apply(parametri, {
				al: dateAlAppo
			});
		}
		
		Ext.Ajax.request({
			method: 'GET',
			url: url,
			params: parametri,
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);

				if(risposta.success){
					if(risposta.data.length > 0){	
						if(sinistra){
							me.storeRegistrazioni.removeAt(0);		
							//inserisco il record nella prima posizione dello store
							me.storeRegistrazioni.insert(0 ,risposta.data[0]);					
						}else{
							me.storeRegistrazioni.removeAt(0);							
							//inserisco il record nell'ultima posizione dello store (store.getCount() mi da il numero dei record perciò l'ultima posizione)
							me.storeRegistrazioni.insert(me.storeRegistrazioni.getCount(),risposta.data[0]);			
						}
						
						let record = me.storeRegistrazioni.data.items[0],
							idRecord = record.get('id');
						
						//si resettano bottoni registrazioni
						me.lookupReference('DataTestata').setHtml(null);
						me.lookupReference('OraTestata').setHtml(null);
						
						
						me.abilitaDisabilita(record);
						if(!Ext.isEmpty(record)) {
							me.avvaloraCampiTestata(record);
							me.cbaConfig.dataRegistrazione = record.get('data');
							me.lookupReference('DataTestata').setHtml(StdCba.FormattaData(record.get('data')));
							me.lookupReference('OraTestata').setHtml(StdCba.FormattaData(record.get('data'), 'H:i'));
							me.lookupReference('DataTestataInsert').setValue(record.get('data'));
							me.lookupReference('OraTestataInsert').setValue(StdCba.FormattaData(record.get('data'), 'H:i'));
						}
						
						me.setRecTe(idRecord);
						me.controllerForm.lookupReference('Form').dirty_original = null; //blocco il dirtyChange
						me.controllerForm.aggiornaStore();
						
						/*Gestione pulsante annulla*/
						var recTe = me.controllerForm.recordTestata;
						me.abilitaAnnulla(recTe);
					}
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
	},
	
	abilitaAnnulla: function(recTe) {
		if( this.controllerForm.annullabile ) {
			var btnAnnulla = this.controllerForm.lookupReference('Form').createFabs.btnAnnulla,
				permesso = this.controllerForm.lookupReference('Form').permesso == 'S',	//ctrl PERMESSO
				tipoBlocco = recTe.get('tipoBlocco'),
				recordAnnullato = ( tipoBlocco && StdCba.cssGetBlocchi(tipoBlocco)[0] == 'DEL' ),	//ctrl RECORD ANNULLATO
				compLog = this.compilatore,	//compilatore utente LOGGATO
				comps = recTe.get('permessiAnnulla'),	//lista compilatori
				compScheda = recTe.get('compilatore'),	//compilatore scheda
				proprietarioScheda = ( comps && comps.length > 0 ) ? ( comps.indexOf(compLog) != -1 ) : ( compLog == compScheda ),
//				giornataScaduta = ( FormattaData( new Date(CBA.moduli.modulo49.serverDate), 'd-m-Y' ) != FormattaData(recTe.get('data'), 'd-m-Y') );	//ctrl GIORNATA
				giornataScaduta = false;	//ctrl GIORNATA (da ora si toglie controllo, sara' semprepossibile annullare anche in date future!)

			//attivo (o meglio RENDO ATTIVABILE) il BOTTONE ANNULLA in base alle varie condizioni
			if( permesso && !recordAnnullato && proprietarioScheda && !giornataScaduta ) {
				btnAnnulla.cbaConfig.recordAnnullabile = true;
				btnAnnulla.setHidden(false);
			} else {
				btnAnnulla.cbaConfig.recordAnnullabile = false;
				btnAnnulla.setHidden(true);
			}
		}
	},
	
	aggiornaStore: function(idRecord, datiDettaglio) {
		var me = this;
		
		if(Ext.isEmpty(me.anagraficaCorrente))/*Caso in cui non ho un ospite selezionato*/
			return false;
		
		var parametri = {															//TODO_PLS serverDate??
			al: me.controllerForm.salvataggioRecord ? me.controllerForm.dataRecord : new Date(),	//gestito nei casi in cui si può tornare indietro con le date
			tipoTestata: me.controllerForm.cbaConfig.tipoTestata,
			idRicovero: me.anagraficaCorrente.idRicovero,
			idProfilo: me.idProfilo,
			compilatore: me.compilatore,
			soloUnaTestata: 'F',
			isMobile: true
		};

		//per ingresso da progetti diversi da cartella vedi scheda far bina viene passato il loro idRicovero
		if (Ext.isDefined(me.anagraficaCorrente.idRicoveroCu)) {
			
			if (!me.anagraficaCorrente.idRicovero) {
				delete parametri.idRicovero;
			}
			
			Ext.apply(parametri, {
				idRicoveroCu: me.anagraficaCorrente.idRicoveroCu
			});
		}
		
		if (idRecord) {
			Ext.apply(parametri, {
				idTestata: idRecord
			});
		}
		/*Schede di valutazione modulari (DomandeController.js)*/
		if(me.controllerForm.cbaConfig.sottoTipoTestata)
			Ext.apply(parametri, {
				sottoTipoTestata: me.controllerForm.cbaConfig.sottoTipoTestata
			});
		
		//azzero (salvataggioRecord viene usato quando serve variare i parametri della ricerca testata in base al record di dettaglio)
		if(me.controllerForm.salvataggioRecord)
			me.controllerForm.salvataggioRecord = false;
		
		if(me.lookupReference('BtnAvanzate').cbaConfig && me.lookupReference('BtnAvanzate').cbaConfig.attivo){
			Ext.apply(parametri, me.pnlRicerca.down('formpanel').getValues());
			parametri.me = StdCba.getBoolValue(parametri.me);
			parametri.avanzate = StdCba.getBoolValue(parametri.avanzate);
			let dateAlAppo = Ext.clone(parametri.al)
			dateAlAppo.setHours(23)
			dateAlAppo.setMinutes(59)
			Ext.apply(parametri, {
				al: dateAlAppo
			});
		}
		
		
		me.storeRegistrazioni.load({			
			params:	parametri,
			callback: function(st, operation, success){
				if(success){
					let record = st[0],
						idRecord = record ? record.get('id') : null,
						form = me.controllerForm.lookupReference('Form');

					me.controllerForm.testataSelezionata = idRecord;
					//si resettano bottoni registrazioni
					me.lookupReference('DataTestata').setHtml(null);
					me.lookupReference('OraTestata').setHtml(null);
					
					me.abilitaDisabilita(record);
					//collego la form alla page standard per funzionamento pulsanti
					me.cbaConfig.controllerPageStd.cbaConfig.controller = me.controllerForm;
					if(record) {
						me.avvaloraCampiTestata(record);
						me.lookupReference('DataTestata').setHtml(StdCba.FormattaData(record.get('data')));
						me.lookupReference('OraTestata').setHtml(StdCba.FormattaData(record.get('data'), 'H:i'));
						me.lookupReference('DataTestataInsert').setValue(record.get('data'));
						me.lookupReference('OraTestataInsert').setInputValue(StdCba.FormattaData(new Date(), 'H:i'));;
						
						me.setRecTe(idRecord);
						me.cbaConfig.dataRegistrazione = record.get('data');

						me.controllerForm.lookupReference('Form').dirty_original = null; //blocco il dirtyChange
						me.controllerForm.aggiornaStore(record.get('id'), datiDettaglio);
						
						/*Gestione pulsante annulla*/
						var recTe = me.controllerForm.recordTestata;
						me.abilitaAnnulla(recTe);
						
					}else{
						me.controllerForm.recordTestata = null;
						me.controllerForm.testataSelezionata = null;
						if(me.lookupReference('BtnAvanzate').cbaConfig && me.lookupReference('BtnAvanzate').cbaConfig.attivo)
							StdCba.bloccaFormCss(form, true);
						
						me.controllerForm.lookupReference('Form').dirty_original = null; //blocco il dirtyChange
						me.controllerForm.aggiornaStore();
						form.setRecord_cba(); //TODO_PLS verificare 
					}
					
					if(form.permesso != 'L'){
						if(form.createFabs.btnCopia.getHidden() == false)
							form.createFabs.btnCopia.setHidden(!me.controllerForm.testataSelezionata);
						form.createFabs.btnAnnulla.setHidden(!me.controllerForm.testataSelezionata);
					}
						
				}else{
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
		
	},
	
	avvaloraCampiTestata: function(record){
		var me = this;
		var btn = me.cbaConfig.controllerPageStd.lookupReference('ImgBlocco');
		var tipoBlocco = StdCba.cssGetBlocchi(record.get('tipoBlocco'));
		
	
		me.lookupReference('DataTestata').removeCls('testataAnnullata');
		me.lookupReference('OraTestata').removeCls('testataAnnullata');

		if ( tipoBlocco[0] == 'DEL' ) {
			//RECORD ANNULLATO
			me.lookupReference('DataTestata').addCls('testataAnnullata');
			me.lookupReference('OraTestata').addCls('testataAnnullata');
		}	


		btn.cbaConfig.idRec = record.get('id');
				
	},
	
	setRecTe: function(idRecord){
		var me = this;
		if(idRecord) {
			me.controllerForm.testataSelezionata = idRecord;
			let recTe = me.controllerForm.recordTestata = StdCba.trovaRecord(me.storeRegistrazioni, 'id', idRecord);
		}
	},
	
	abilitaDisabilita: function(record){
		var me = this;
		if(Ext.isEmpty(record)){
			me.lookupReference('BtnLeft').setHidden(true);
			me.lookupReference('BtnRight').setHidden(true);
			return false;
		}
		me. primo = record.get('first') == 'T';
		me.ultimo = record.get('last') == 'T';
		
		me.lookupReference('BtnLeft').setHidden(me.primo);
		me.lookupReference('BtnRight').setHidden(me.ultimo);
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		me.primaVolta = true;
		
		//TODO_PLS per il momento toast sulla paginaStandard
		/*Caso in cui non ho un ospite selezionato*/
		me.anagraficaCorrente = me.cbaConfig.anagraficaExtra || 
									(CBA.moduli.modulo49.storeAnagraficaSel.getAt(0) ? CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data : null);
	
		
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.compilatore = Ext.isDefined(CBA.moduli.modulo49) && Ext.isDefined(CBA.moduli.modulo49.operatore) ? CBA.moduli.modulo49.operatore.id : null;
		me.lookupReference('CntRegistrazioni').controller = me;				
		me.codOspite = me.anagraficaCorrente ? me.anagraficaCorrente.codOspite : null;
		
		//si controlla personalizzazione percorsi testate
		me.urlNext = `${CbaRootServer}`+'/cba/css/cs/ws/testate/next';
		me.urlPrev = `${CbaRootServer}`+'/cba/css/cs/ws/testate/prev';	
		
		StdCba.initRicercaAvanzataMobile( me.lookupReference('ContainerTestata'), me );
		
		me.cbaConfig.controllerPageStd.lookupReference('CntPageStd').add(Ext.create(me.cbaConfig.controllerPageStd.percorsoVideata,{
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			cbaConfig: {
				controllerTestata: me,
				permesso: me.cbaConfig.controllerPageStd.permesso,
				anagraficaCorrente: me.anagraficaCorrente,
				controllerPageStd: me.cbaConfig.controllerPageStd,
				idVideata: me.cbaConfig.controllerPageStd.cbaConfig.idVideata
			}
		}));
		
		me.controllerForm = me.cbaConfig.controllerPageStd.cbaConfig.controller;		
		me.storeRegistrazioni = Ext.create('Generali.arch.testataStd.TestataStdStore');
		
		//TODO_PLS adattare a mobile
//		//BES server per videate generali es: scheda di valutazione bina
//		if (!Ext.isEmpty(me.controllerForm.cbaConfig) ? me.controllerForm.cbaConfig.testataGen : null) {
//			ImpostaUrl([me.storeRegistrazioni]);
//			var proxy = me.storeRegistrazioni.getProxy();
//			me.controllerForm.urlNext =  proxy.url.substring(0, proxy.url.lastIndexOf('/') + 1) + 'next';
//			me.controllerForm.urlPrev = proxy.url.substring(0, proxy.url.lastIndexOf('/') + 1) + 'prev';
//		}
		
		if(me.controllerForm.aggiornaDaTestata)
			me.aggiornaStore();	//altrimenti viene fatto dalla form (dettaglio)
	},

	destroy: function(){
	    this.callParent();
	}

});
