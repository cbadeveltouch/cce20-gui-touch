Ext.define('CS.schede.schede.cgi.CgiiController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-cgi-cgii',

    beforetabchangeTabPanel: function(th, newTab, oldTab) {
    	var me = this;
		var form = me.lookupReference('Form');
		if(form.dirty_oldIsDirty || !me.recordTestata){
			StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
			return false;
		}
		
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, true);
			newTab.down('#PnlFiltroGrafico').controller.generaGrafico();
			
		}else if(oldTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, false);
		}
	},
	
	aggiornaLabelPunteggio: function() {
		for (var i=0; i<this.vettorePunteggi.length; i++) {
			if(this.punteggio>=this.vettorePunteggi[i].data.punteggioMin && this.punteggio<=this.vettorePunteggi[i].data.punteggioMax) {
			}
		}
		this.lookupReference('TotTest').setHtml(StdCba.traduci("PUNTEGGIO:") + this.punteggio + '/7' + '<br>');
		
	},
	
	verificaCampiForm: function() {
		var messaggi= [];
		var vettoreRadio = [];
		var form = this.lookupReference('Form');
		//controlli su data
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
			
		vettoreRadio = this.lookupReference('Form').query('cbaMultipleChoice');
		
		Ext.each(vettoreRadio, (radio) => {
			if(Ext.isEmpty(radio.getValueExclusive()) && !radio.cbaConfig.itemIdPadre) {
				StdCba.msgAddError(messaggi, StdCba.traduci("DOMANDA_") + StdCba.traduci(radio.cbaConfig.titoloLabel) + StdCba.traduci("NON_COMPILATA"));
			}
		});
			
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}
		
		return StdCba.msgShow('',messaggi);
	},
	
	salvaForm:function(esci){
		var me = this;
		var form = me.lookupReference('Form');
		var risposte= form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		me.aggiornamentoTestata = true;
		
		var fields = form.getFields();
		risposte = StdCba.convertiBool(risposte, fields);
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			scadenza: Ext.isEmpty(risposte.scadenza) ? 21 : risposte.scadenza,
			slider:risposte.slider[0] 
		});
		
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
			this.isCopia = false;
			me.nuovo = true;
			ControllerStd.nuovoRecord(form);
//			this.getFiltroAgenda().setValue(0);
			StdCba.bloccaFormCss(form, false, true);
			this.bloccaForm = false;
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
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L' ? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');
		
		this.storeForm = form.store= Ext.create('CS.schede.schede.cgi.CgiiStore');

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
		var messaggi = [];
		var cbox = this.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		var form = this.lookupReference('Form');
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('Test'));
		
		if(this.aggiornamentoTestata){
			this.aggiornamentoTestata = false;
			this.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			StdCba.clearForm(this.lookupReference('Form'));
			this.lookupReference('DataRegistrazione').setValue(this.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = this.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			if(idRecord || this.testataSelezionata){
				var form = this.lookupReference('Form');
				var store = this.storeForm;											
				store.load({
					params: {
						id: idRecord ? idRecord : this.testataSelezionata
					},
					callback: (records,operation,success) => {
						if(success){
							var rec= records[0];
							
							form.dirty_suspendDirtyChange = true
							form.setRecord_cba(rec);
							
							if(!Ext.isEmpty(rec)){	
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								/*avvaloro cbaMultipleChoice*/
//								StdCba.cercaCbaMultipleChoice(form, rec);
								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(this.recordTestata.get('tipoBlocco'));
								this.bloccaForm = blocco;
								StdCba.bloccaFormCss(form, blocco, false);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(rec.get('scadenza') == null) 
									this.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								if(this.callbackFnPortlet && !this.callbackFnPortlet_disattiva){
									this.callbackFnPortlet[0](this.callbackFnPortlet[1], this);
								} 
								
								let iconAgenda = rec.get('slider') == 1 ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}
			else{
				this.punteggio = 0;
				StdCba.bloccaFormCss(form, form.permesso != 'S');
				StdCba.calcolaDataDiScadenza(false,false,this.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				this.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			} 
		}	
	},
	
	init: function() {
		this.callParent(arguments);
		this.punteggio = 0;
		this.cbaConfig.punteggioMax = 7;
		var form = this.lookupReference('Form');
		form.controller = this;
		this.nuovo = false;
		vettCbaMultiple  = this.lookupReference('Form').query('cbaMultipleChoice');
		// scorro i cbaMultipleChoiche
		vettCbaMultiple.forEach( radio => {
			//aggancio l'evento al radio
			radio.on('choicechange', (th, newValue, oldValue) => {
				this.calcolaPunteggio(newValue, oldValue);
			});
		});
		
		this.cbaConfig.tipoTestata = 'Cgii';
		this.sottoTipoTestata = this.cbaConfig.controllerTestata.cbaConfig.codVideata;
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		this.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		this.gestioneForm();
		
		/*abilito pulsante annulla*/
		this.annullabile = true;
		this.modeAnnullabile = true; //cssSetAnnullabile con dirty
		this.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		this.caricaStoreExtraDati();
//		this.setInfoPunteggio(this.lookupReference('FieldInfoPunteggio'), 'NOTE_BIBLIOGRAFICHE', 'INFO_CGI');
//		this.getImgCalendario().addCls('agenda-no');
		this.caricaValidita();
		
		this.caricaPunteggio( () => {
			this.aggiornaLabelPunteggio();
		});
	
	},
	
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}
});
