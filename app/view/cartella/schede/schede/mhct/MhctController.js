Ext.define('CS.schede.schede.mhct.MhctController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-mhct-mhct',
    
    beforetabchangeTabPanel: function(th, newTab, oldTab) {
    	var me = this;
    	var form = me.lookupReference('Form');
    	if(newTab.getItemId().indexOf('TabAndamento') != -1){
			
			if(form.dirty_oldIsDirty|| !me.recordTestata){
				StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
				return false;
			}
			StdCba.tapTabAndamento(form, true);
			newTab.down('#PnlFiltroGrafico').controller.generaGrafico();
			
		}else if(oldTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, false);
		}
	},
	
	aggiornaLabelPunteggio: function() {
		this.lookupReference('TotTest').setHtml(`Tot. Comportamentale: ${this.punteggioComportam}/27<br>
								Tot. Menomazione: ${this.punteggioMenomaz}/18<br>
								Tot. Psicopatologica: ${this.punteggioPsico}/23<br>
								Tot. Sociale: ${this.punteggioSociale}/36<br>
								Tot. Storico: ${this.punteggioStorico}/54<br>
								Totale generale: ${this.punteggioTotale}/158`);
	},
	
	verificaCampiForm: function() {
		var messaggi = [],
			vettoreRadio = [],
			form = this.lookupReference('Form');
		
		//controlli su data
//		let dataF = form.down('datefield'),
//			dataValidator = dataF.validator(dataF);
//		
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
			
		if (messaggi.length == 0 && !form.isValid()) {
			StdCba.msgAddError(messaggi, 'MSG_CAMPI_OBBLIGATORI');
		}
		
		messaggi = this.controllaCampiTest();
		
		if (messaggi) {
			return StdCba.msgShow('', messaggi);
		}
	},
	
	controllaCampiTest:function() {
		Ext.suspendLayouts();
		let primoFocus = true,
			form = this.lookupReference('Form'),
			messaggi = [],
			domande = form.query('[itemId=CntCorpoDomanda]'),
			trovato = false;
		this.testValido = true;
		
		Ext.each(domande, rec => {
			let ctrlDettaglio = rec.up().controller,
				risposte = rec.down('textfield');
			if(Ext.isEmpty(risposte.getValue())) {
				this.testValido = false;
				ctrlDettaglio.lookupReference('PanelRisposte').up().addCls('cbaCssBordoErrore');
				trovato = true;
				if(primoFocus) {
					ctrlDettaglio.lookupReference('CntCorpoDomanda').focusable = true;
					ctrlDettaglio.lookupReference('CntCorpoDomanda').focus();	
					primoFocus = false;
				}
			}
		});
		
		
		let domanda8 = form.query('#SelecteDom8')[0];
		if(Ext.isEmpty(domanda8.getValue())) {
			if(!form.query('#Choice8')[0]._hidden)
				form.query('#Choice8')[0].addCls('cbaCssBordoErrore');
		}
		
		if(trovato)
			StdCba.msgAddError(messaggi, 'MSG_CAMPI_OBBLIGATORI');
		
		Ext.resumeLayouts(true); 
		return messaggi;
	},
	
	salvaForm:function(esci){debugger
		var me = this;
		var form = me.lookupReference('Form');
		var risposte= form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		me.aggiornamentoTestata = true;
		
		var fields = form.getFields();
		risposte = StdCba.convertiBool(risposte, fields);
		risposte.domanda8Risposta
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
	
		Ext.apply(risposte,{
			domanda8Risposta: form.query('cbaMultipleChoice')[0].getValueExclusive(),
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			scadenza: Ext.isEmpty(risposte.scadenza) ? 21 : risposte.scadenza
//			agenda:risposte.slider ? 'T' : 'F' 
		});
		
		delete risposte.undefined;
		me.dataRecord = risposte.data;
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	calcolaPunteggio: function(newValue, oldValue) {
		this.punteggio = this.punteggio - (Ext.isEmpty(oldValue) ? 0 : parseFloat(oldValue)) + (Ext.isEmpty(newValue) ? 0 : parseFloat(newValue));
		this.aggiornaLabelPunteggio();
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnCopia = form.createFabs.btnCopia,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnNuovo.on('tap', function(){
			me.isCopia = false;
			ControllerStd.nuovoRecord(form);
//			this.getFiltroAgenda().setValue(0);
			StdCba.bloccaFormCss(form, false, false);
			me.bloccaForm = false;

			me.generaDomande(false);
			Ext.resumeLayouts(true);
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			me.nuovo = false;
			//controllo che ci sia l'id compilato	
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.aggiornaStore();
					}
				);
			}else	StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
	
	gestioneForm: function(){		
		var me= this;
		var form= me.lookupReference('Form');	
		
		form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';

		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L' ? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');
		
		this.storeForm = form.store= Ext.create('CS.schede.schede.mhct.MhctStore');

		StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniSchede', function(controller, rec){
			if(!Ext.isEmpty(rec)) {
				controller.scadenzaDaImpoTest = rec.get('scadenza');
				controller.stopInterval = Ext.isEmpty(rec.get('scadenza'));
			}
		});
		
		form.on('dirtychange', function(th, isDirty) {
        	StdCba.btnNascondiMostra(isDirty, th);
        	if(isDirty)
        		StdCba.retrodatazione(th);
        	me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(isDirty)
        	me.lookupReference('ComboValidita').setHidden(!isDirty);
			me.lookupReference('Totali').setHidden(isDirty);
        	me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			StdCba.abilitaDisabilitaDataPicker(isDirty, me.cbaConfig.controllerPageStd);
			
			var id = form.getFields().id.getValue();
			
			//si imposta nuovo record quando si hanno azioni di nuovo record
			if(isDirty && !StdCba.cbaValidId(id) ) {
				var controllerPageStd = me.cbaConfig.controllerPageStd,
    	 			pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
				pnlCompilatore.setNuovoRecord();
				
			}
		});
	},
	
	aggiornaStore: function(idRecord) {
		let messaggi = [],
			cbox = this.lookupReference('ComboValidita'),
			cboxStore = cbox.getStore();
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem._itemId;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabDatiDomande'));
		
		if(this.aggiornamentoTestata) {
			this.aggiornamentoTestata = false;
			this.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		} else {
			StdCba.clearForm(this.lookupReference('Form'));
			this.lookupReference('DataRegistrazione').setValue(this.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = this.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			
			if(idRecord || this.testataSelezionata) {
				let form = this.lookupReference('Form'),
					store = this.storeForm;										
				store.load({
					params: {
						id: idRecord ? idRecord : this.testataSelezionata
					},
					callback: (records,operation,success) => {
						if(success) {
							let rec = records[0];
							form.dirty_suspendDirtyChange = true
							form.setRecord_cba(rec);
							
							if(!Ext.isEmpty(rec)) {	
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								this.generaDomande(rec, () =>{
									
									/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
									var fields = form.getFields();
									let newRecord = StdCba.convertiStringinBool(rec, fields);
									
									if(rec.get('scadenza') == null) 
										this.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
									
									/*avvaloro cbaMultipleChoice*/
//									StdCba.cercaCbaMultipleChoice(form, rec);
									//permessi scrittura
									let blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(this.recordTestata.get('tipoBlocco'));
									this.bloccaForm = blocco;
									StdCba.bloccaFormCss(form, blocco, false);
									form.dirty_suspendDirtyChange = false;
									form.dirty_resetOriginal();
								});
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(this.callbackFnPortlet && !this.callbackFnPortlet_disattiva){
									this.callbackFnPortlet[0](this.callbackFnPortlet[1], this);
								} 
								
							}
						} else {
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			} else {
				this.generaDomande(false, ()=>{
					this.lookupReference('Form').setRecord_cba(); //risetto il valori del dirty
				});
				this.punteggio = 0;
				StdCba.calcolaDataDiScadenza(false,false,this.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				this.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				
			} 
			if(this.lookupReference('Form').permesso != 'L')
				this.lookupReference('Form').createFabs.btnCopia.setHidden(!this.testataSelezionata);
		}	
	},
	
	generaDomande: function(recordDomande, callback) {
		
		Ext.suspendLayouts();
		
		let fieldTitolo = Ext.create('Ext.form.FieldSet',{
			itemId: 'PnlSottoDomanda', reference: 'PnlSottoDomanda',
			title: StdCba.traduci('TINETTIAND_TITOLO')
		});
		
		this.punteggioComportam = 0;
		this.punteggioMenomaz = 0;
		this.punteggioPsico = 0;
		this.punteggioSociale = 0;
		this.punteggioStorico = 0;
		this.punteggioTotale = 0;
		
		this.lookupReference('CntDomande1').setHidden(false);
		this.lookupReference('CntDomande2').setHidden(false);
		this.lookupReference('CntDomande3').setHidden(false);
		this.lookupReference('CntDomande4').setHidden(false);
		this.lookupReference('CntDomande5').setHidden(false);
		
//		if(!recordDomande)
//			this.getImgCalendario().addCls('agenda-no');
		
		/*Creo l'icona warning se e solo se è T il campo nonSomministrabile nello store  altrimenti */
		this.storeMhct = Ext.create('CS.schede.schede.mhct.StoreDati');

		this.lookupReference('CntDomande1').removeAll();
		this.lookupReference('CntDomande2').removeAll();
		this.lookupReference('CntDomande3').removeAll();
		this.lookupReference('CntDomande4').removeAll();
		this.lookupReference('CntDomande5').removeAll();
		
		for(let i=0; i< this.storeMhct.totalCount; i++){
			let rec = this.storeMhct.getData().items[i];
			let valoreSub = null;
			let valore = this.cercaValoreInOggetto(recordDomande, rec.data.name);
			if(rec.data.risposte[0].subName) {
				valoreSub = this.cercaValoreInOggetto(recordDomande, rec.data.risposte[0].subName);
			}
			
			Ext.apply(rec.data, {
				risposta: valore,
				subRisposta: valoreSub
			});
			
			let cnt = 'CntDomande'+rec.get('sezione');
			
			this.lookupReference(cnt).add(Ext.create('CS.schede.schede.mhct.dettaglio.Dettaglio',{
				cbaConfig: {
					dati: rec,
					controllerMain: this,
					nonSomministrabile: this.nonSomministrabile
				}
			}));				
		};
		
		this.aggiornaLabelPunteggio();
		
		if(callback)
			callback();
		Ext.resumeLayouts(true);
	},
	
	cercaValoreInOggetto: function(oggetto,valoreRicerca) {
		if(!oggetto)
			return null;
		for(var key in oggetto.data) {
			if(key == valoreRicerca) {
				return oggetto.data[key];
			}
		}
	},
	
	init: function() {
		this.callParent(arguments);
		this.punteggioComportam = 0;
		this.punteggioMenomaz = 0;
		this.punteggioPsico = 0;
		this.punteggioSociale = 0;
		this.punteggioStorico = 0;
		this.punteggioTotale = 0;
		this.cbaConfig.punteggioMax = 140;
		this.nuovo = false;
		let form = this.lookupReference('Form');
		form.controller = this;
		
		this.cbaConfig.tipoTestata = 'Mhct';
		this.sottoTipoTestata = this.cbaConfig.controllerTestata.cbaConfig.codVideata;
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		this.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		this.gestioneForm();
		
		/*abilito pulsante annulla*/
		this.annullabile = true;
		this.modeAnnullabile = true; //cssSetAnnullabile con dirty
		this.aggiornaDaTestata = true;
		
		this.caricaValidita();
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		this.caricaStoreExtraDati();
//		this.setInfoPunteggio(this.getFieldInfoPunteggio(), 'NOTE_BIBLIOGRAFICHE', 'INFO_MHCT');
//		this.getImgCalendario().addCls('agenda-no');
		
		this.caricaPunteggio( () => {
			this.aggiornaLabelPunteggio();
		});
	
	},
	
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
