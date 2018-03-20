Ext.define('CS.schede.schede.gds.GdsController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-gds-gds',
    
    beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var form = me.lookupReference('Form');
		
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			
			if(form.dirty_oldIsDirty || !me.recordTestata){
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
		var me = this;
		var descrizione = "";
		
		for (var i=0; i<me.vettorePunteggi.length; i++) {
			if(me.punteggio>=me.vettorePunteggi[i].data.punteggioMin && me.punteggio<=me.vettorePunteggi[i].data.punteggioMax) {
				descrizione = me.vettorePunteggi[i].data.descrizione;
			}
		}
		me.lookupReference('TotTest').setHtml(StdCba.traduci("PUNTEGGIO:") + me.punteggio + '/30' + '<br>' + descrizione);
		
	},
	
	verificaCampiForm: function() {
		var me = this;
		
		let messaggi= [],
			vettoreRadio = [],
			form= me.lookupReference('Form'),
			trovato  = false;
		//controlli su data
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
			
		vettoreRadio = me.lookupReference('Form').query('cbaMultipleChoice');
		
		Ext.each(vettoreRadio, function(radio) {
			if(Ext.isEmpty(radio.getValueExclusive())) {
				trovato = true;
				return false;
			}
		});
		if(trovato)
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}	
		return StdCba.msgShow('',messaggi);
		
	},
	
	salvaForm:function(esci) {
		var me = this;
		var form = me.lookupReference('Form');
		var risposte= form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.campoDirty;
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		var valoriTest = '';
		for(var i=1; i<=30; i++) {
			valoriTest = valoriTest.concat(risposte['_valoriTest'+i]);
			delete risposte['_valoriTest'+i];
		}
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		
		Ext.apply(risposte,{
			compilatore: CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			agenda: risposte.slider ? 'T' : 'F',
			slider: risposte.slider[0],
			valoriTest: valoriTest,
			scadenza: Ext.isEmpty(risposte.scadenza) ? 21 : risposte.scadenza
		});
		
		me.dataRecord = risposte.data;
		
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnCopia = form.createFabs.btnCopia,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnConferma.on('tap',() =>{
			me.nuovaRegistrazione = false;
		})
		
		btnNuovo.on('tap', function(){
			me.isCopia = false;
			ControllerStd.nuovoRecord(form);
			me.nuovo = true;
//			me.getFiltroAgenda().setValue(0);
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
			me.bloccaForm = false;
		});
		
		btnRipristina.on('tap', function(){
			me.aggiornamentoTestata = true;
			me.nuovo = false;
			me.aggiornaStore(me.testataSelezionata ? me.testataSelezionata : null, function(){
				me.resetControlli();
			});
			
			if(me.isCopia) {
				me.isCopia == false;
			}
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			//controllo che ci sia l'id compilato	
			me.nuovo = false;
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
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L'? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.gds.GdsStore');

		StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniSchede', function(controller, rec){
			if(!Ext.isEmpty(rec)) {
				controller.scadenzaDaImpoTest = rec.get('scadenza');
				controller.stopInterval = Ext.isEmpty(rec.get('scadenza'));
			}
		});
		
		form.on('dirtychange', function(th, isDirty) {
			if(isDirty)
        		StdCba.retrodatazione(th);
        	StdCba.btnNascondiMostra(isDirty, th);
        	me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(isDirty)
        	me.lookupReference('CntEdit').setHidden(!isDirty);
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
		
	aggiornaStore: function(idRecord){		
		var me= this;
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		var form= this.lookupReference('Form');
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('Test'));
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			
			me.lookupReference('TotTest').hide();
			StdCba.clearForm(me.lookupReference('Form'));
			
			me.lookupReference('DataRegistrazione').setValue(me.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = me.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			
			if(idRecord || me.testataSelezionata){
				var form = me.lookupReference('Form');
				var store = me.storeForm;											
				store.load({
					params: {
						id: idRecord ? idRecord : me.testataSelezionata
					},
					callback: function(records,operation,success){
						if(success){
							var rec= records[0];
							
							if(!Ext.isEmpty(rec)){	
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
								/*Converto e checko Booleani*/
								let fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});	
								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								me.bloccaForm = blocco;
								StdCba.bloccaFormCss(form, blocco);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								form.dirty_suspendDirtyChange = false;
								
								
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								} 
								me.lookupReference('TotTest').show();
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}
			else{
				me.lookupReference('TotTest').show();
				StdCba.bloccaFormCss(form, form.permesso != 'S');
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			} 
		}	
	},

	calcolaPunteggio: function(newValue, oldValue) {
		var me = this;
		me.punteggio = me.punteggio - (Ext.isEmpty(oldValue) ? 0 : parseFloat(oldValue)) + (Ext.isEmpty(newValue) ? 0 : parseFloat(newValue));
		me.aggiornaLabelPunteggio();
	},
	
	init: function() {
		this.callParent(arguments);
		var me = this;
		me.punteggio = 0;
		me.oldValue = 0;
		me.nuovo = false;
		var vettCbaMultiple = [];
		var form = me.lookupReference('Form');
		form.controller = me;
		
		// per ogni cbaMultipleChoice al change salvo oldValue e newValue e aggiorno punteggio
		vettCbaMultiple  = me.lookupReference('Form').query('cbaMultipleChoice');
		vettCbaMultiple.forEach(function(radio) {
			//agganciamo l'evento al radio
			radio.on('choicechange', function(th, newValue, oldValue) {
				var radio = th.up().up();
				me.calcolaPunteggio(newValue, oldValue);
			});
		});
		
		me.cbaConfig.tipoTestata = 'Gds';
		me.cbaConfig.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		me.gestioneForm();
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		me.caricaValidita();
		me.caricaStoreExtraDati();
//		me.getImgCalendario().addCls('agenda-no'); 
		
		me.caricaPunteggio(function(records){
			me.aggiornaLabelPunteggio();
		});
	},
		
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
