Ext.define('CS.schede.schede.Tinetti.TinettiController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-tinetti-tinetti',
    
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
	
	GestioneEsapndiCollassa:function(th,funzione){
		Ext.suspendLayouts();
		var me = this;
		var ctrl;
		var messaggi=[];
		var cntDomande = me.lookupReference('Form').query('[itemId=CntCorpoDomanda]');
		for(var i = 0;i < cntDomande.length; i++ ){
			var ctrl=cntDomande[i].up().controller;

			ctrl.apriPanel = funzione == 'espandi';
			ctrl.collassa(ctrl.getCntIcona().down('image'));
		}
		Ext.resumeLayouts(true);

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
			me.nuovo = true;
			ControllerStd.nuovoRecord(form);
			//if(!me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.scalaMorse) me.cbaConfig.scalaMorse = false;
			StdCba.bloccaFormCss(form, false, true);
			if(me.nonSomministrabile){
				me.nonSomministrabile = false;					
			}
//			me.getFiltroAgenda().setValue(0);
			
			me.generaDomande(false);
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
		
		me.storeForm = form.store =  Ext.create('CS.schede.schede.Tinetti.TinettiStore');

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
	
	salvaForm:function(esci){
		var me = this;
		var form = me.lookupReference('Form');
		var risposte = form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			punteggioMassimo:me.punteggioTotale,
			agenda:risposte.slider ? 'T' : 'F',
			nonSomministrabile:'F',
			progrMorse: me.cbaConfig.scalaMorse ? me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.progrMorse : null
		});
		
		delete risposte.slider;
		
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
			me.lookupReference('CntEdit').setHidden(true);
			//me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.scalaMorse = false;
			me.lookupReference('Totali').setHidden(false);
			me.cbaConfig.scalaMorse = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	controllaCampiTest:function(){
		var me = this;
		Ext.suspendLayouts();
		var primoFocus=true;
		var form= me.lookupReference('Form');
		var messaggi=[];
		var domande = me.lookupReference('Form').query('[itemId=CntCorpoDomanda]');
		me.testValido=true;
		Ext.each(domande,function(rec){
			var ctrlDettaglio = rec.up().controller;
			var risposte = rec.down('textfield');
			if(Ext.isEmpty(risposte.getValue())){
				me.testValido=false;
				ctrlDettaglio.lookupReference('PanelRisposte').up().addCls('cbaCssBordoErrore');
				
				if(primoFocus){
					ctrlDettaglio.lookupReference('CntCorpoDomanda').focusable=true;
					if(ctrlDettaglio.cbaConfig.dati.data.tab == 1) 
						me.lookupReference('TabPanel').setActiveItem(me.lookupReference('TabAndatura'));
					else
						me.lookupReference('TabPanel').setActiveItem(me.lookupReference('TabEquilibrio'));

					ctrlDettaglio.lookupReference('CntCorpoDomanda').focus();	
					primoFocus=false;
				}
				ctrlDettaglio.apriPanel=true;
			}else {
				ctrlDettaglio.apriPanel=false;
			}
			//ctrlDettaglio.collassa(ctrlDettaglio.getBtnCollassa());
		});
		if(me.testValido === false)
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		Ext.resumeLayouts(true); 
		return messaggi;
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= me.lookupReference('Form');
		//controlli su data
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		var messaggi = me.controllaCampiTest();
		if (messaggi){
			return StdCba.msgShow('',messaggi);
		}							
	},
	
	aggiornaStore: function(idRecord){	
		var me= this;
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
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
								me.nonSomministrabile = rec.get('nonSomministrabile');	
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});	
								
								me.cbaConfig.scalaMorse = rec.get('progrMorse') ? true : false;
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
								
								me.generaDomande(rec, function(){
									//permessi scrittura
									var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
									StdCba.bloccaFormCss(form, blocco, false);

									form.dirty_suspendDirtyChange = false;
									form.dirty_resetOriginal();
								});

								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}
			else{
				me.generaDomande(false);
				StdCba.bloccaFormCss(form, false);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			} 
		}	
	},

	aggiornaLabelPunteggio: function(ctrl,tab) {
		var me = ctrl? ctrl : this;
		var descrizione = "";
		if (me.lookupReference('TotAndatura') && me.lookupReference('TotEquilibrio') && me.lookupReference('TotTest')){
			me.lookupReference('TotAndatura').setHtml(me.punteggioAndatura +'/12');
			me.lookupReference('TotEquilibrio').setHtml(me.punteggioEquilibrio +'/16');
			me.lookupReference('TotTest').setHtml(me.punteggioTotale);
			if(me.cbaConfig.scalaMorse) {
				var testo = me.getTotTest().html;
				if(me.punteggioTotale > 19) {
					me.lookupReference('TotTest').setHtml(testo + " - Non a rischio cadute");
				} else {
					me.lookupReference('TotTest').setHtml(testo + " - A rischio cadute");
				}
			}
		}
	},
	
	generaDomande:function(recordDomande,callbackFn){
		var me=this;
		
		Ext.suspendLayouts();
		
		let fieldTitolo = Ext.create('Ext.form.FieldSet',{
			itemId: 'PnlSottoDomanda', reference: 'PnlSottoDomanda',
			title: StdCba.traduci('TINETTIAND_TITOLO')
		});
		
		me.punteggioAndatura = 0;
		me.punteggioEquilibrio = 0;
		me.punteggioTotale = 0;
//		if(!recordDomande)
//			me.getImgCalendario().addCls('agenda-no');
		/*Creo l'icona warning se e solo se è T il campo nonSomministrabile nello store  altrimenti */
		me.storeTinetti = Ext.create('CS.schede.schede.Tinetti.StoreDati');
		me.lookupReference('TabAndatura').removeAll();
		me.lookupReference('TabEquilibrio').removeAll();
		
		for(let i=0; i< this.storeTinetti.totalCount; i++){
//		me.storeTinetti.each(function(rec){
			let rec = this.storeTinetti.getData().items[i],
				cntDomanda,
				valore = me.cercaValoreInOggetto(recordDomande,rec.data.name);
			Ext.apply(rec.data,{
				risposta:valore
			});
			cntDomanda = Ext.create('CS.schede.schede.Tinetti.dettaglio.Dettaglio',{	
				cbaConfig: {
					dati:rec,
					controllerMain:me,
					nonSomministrabile:me.nonSomministrabile 
				}
			});
			if(rec.data.tab == 1){
				if(rec.data.sottoDomanda){
					me.lookupReference('TabAndatura').add(fieldTitolo);
					fieldTitolo.add(cntDomanda);
				}else	
					me.lookupReference('TabAndatura').add(cntDomanda);
				
			}else if(rec.data.tab == 2){
				me.lookupReference('TabEquilibrio').add(cntDomanda);
			}					
		};
		me.aggiornaLabelPunteggio();
		if(callbackFn)	callbackFn();
		Ext.resumeLayouts(true);
		
		/*Risetto i valori originali per avere il change sui campi*/
		me.lookupReference('Form').setRecord_cba();
	},
	
	cercaValoreInOggetto:function(oggetto,valoreRicerca){
		if(!oggetto)
			return null;
		for(var key in oggetto.data) {
			if(key == valoreRicerca ){
				return oggetto.data[key];
			}
		}
	},
	
	init : function(){
		var me =this;
		this.callParent(arguments);
		me.nuovo = false;
		me.punteggioAndatura = 0;
		me.punteggioEquilibrio = 0;
		me.punteggioTotale = 0;
		me.isCopia = false;
		
		var form= me.lookupReference('Form');
		me.nonSomministrabile = true;
		form.controller=me;
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		me.cbaConfig.tipoTestata = 'Tinetti';
		
		me.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		me.gestioneForm();
		
		
		me.storeForm.controller = me;
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		
		me.caricaValidita();
		me.caricaStoreExtraDati();
//		me.getImgCalendario().addCls('agenda-no'); 
		
		me.cbaConfig.scalaMorse = false;
		
		//TODO_PLS DA TENERE??
		// se ho aperto la tinetti dalla scala morse devo aggiungere alla label del punteggio il "rischio caduta"
//		if(me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.scalaMorse) {
//			me.cbaConfig.scalaMorse = true;
//			me.cbaConfig.controllerTestata.nuovoDefault = true;
//			ImpostaNuovoDefault(me, true);
//		}
		
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
		StdCba.eliminaStore(this.storeTinetti);
		StdCba.eliminaStore(this.storeExtra);
		StdCba.eliminaStore(this.storeImpostazioni);
	    this.callParent();
	}
});
