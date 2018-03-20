Ext.define('CS.schede.schede.morse.MorseController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-morse-morse',
    
    
	 // verifico automatismi:
		//if GridCadute è vuota --> 0 altrimenti 25
		//if GridDiagnosi ha più di 1 elemento --> 15 altrimenti 0
		//if GridTerapia è vuota --> 0 altrimenti 20
	radioDefault: function() {
		var me = this;
	
		if(!Ext.isEmpty(me.lookupReference('GridCadute').getStore().getData().items)) {
			me.lookupReference('RadioCadute').setValueExclusive('25');
		} else {
			me.lookupReference('RadioCadute').setValueExclusive('0');
		}
		
		if(!Ext.isEmpty(me.lookupReference('GridPatologie').getStore().getData().items) && me.lookupReference('GridPatologie').getStore().getData().items.length > 1) {
			me.lookupReference('RadioDiagnosi').setValueExclusive('15');
		} else {	
			me.lookupReference('RadioDiagnosi').setValueExclusive('0');
		}
		
	},
	
	beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var myForm = me.lookupReference('Form');
		if(form.dirty_oldIsDirty || !me.recordTestata){
			StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
			return false;
		}
		if(newTab.getItemId().indexOf('TabAndamento') != -1) {
			if(form.dirty_oldIsDirty|| !me.recordTestata) {
				StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
				return false;
			}
			me.abilitaDisabilitaBoxBottoni(true);
			newTab.down().controller.generaGrafico();
			
		} else if(newTab.getItemId().indexOf('TabProvvedimenti') != -1) {
			me.abilitaDisabilitaBoxBottoni(true);
			newTab.controller.idTest = me.recordTestata.get('id');
			newTab.controller.aggiornaStore();
			
		} else if(oldTab.getItemId().indexOf('TabAndamento') != -1) {
			me.abilitaDisabilitaBoxBottoni();
			
		} else {
			me.abilitaDisabilitaBoxBottoni();
		}
	},
	
	aggiornaLabelPunteggio: function() {
		var me = this;
		var descrizione = "";
		
		if(!Ext.isEmpty(me.vettorePunteggi)) {
			for (var i=0; i<me.vettorePunteggi.length; i++) {
				if(me.punteggio>=me.vettorePunteggi[i].data.punteggioMin && me.punteggio<=me.vettorePunteggi[i].data.punteggioMax) {
					descrizione = me.vettorePunteggi[i].data.descrizione;
				}
				me.lookupReference('TotTest').setHtml(StdCba.traduci("PUNTEGGIO:") + me.punteggio + '/125' + '<br>' + descrizione);
			}
		}
		
	},
	
	verificaCampiForm: function() {
		var me = this;
		var messaggi= [];
		var vettoreRadio = [];
		var form= me.lookupReference('Form');
		//controlli su data
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
			
		vettoreRadio = me.lookupReference('Form').query('cbaMultipleChoice');
		
		Ext.each(vettoreRadio, function(radio) {
			if(Ext.isEmpty(radio.getValueExclusive()) && !radio.cbaConfig.itemIdPadre) {
				StdCba.msgAddError(messaggi, StdCba.traduci("DOMANDA_") + StdCba.traduci(radio.cbaConfig.titoloLabel) + StdCba.traduci("NON_COMPILATA"));
			}
		});
			
		if (messaggi.length == 0 && !form.isValid()) {
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
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		me.dataRecord = me.getPnlCompilatore().getDataOraReg();
		
		let mobilita;
		let mobilitaAppo;
		
		if(risposte.mobilita == '1' || risposte.mobilita == '2' || risposte.mobilita == '3') {
			mobilitaAppo = risposte.mobilita;
			mobilita = 0;
		} else {
			mobilita = risposte.mobilita;
			mobilitaAppo = 0;
		}
		
		delete risposte.mobilita;
		delete risposte.mobilitaAppo;
		
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: me.getPnlCompilatore().getDataOraReg(),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			mobilita: mobilita,
			mobilitaAppo: mobilitaAppo,
	//		agenda:risposte.slider ? 'T' : 'F'
		});
		
		if(controller_salvaRecord(form,risposte,false,false,true)){
			
			// calcolo la somma dei punteggi di cadute, mobilità, andatura e stato mentale
			var punteggioMobilità;
			if(me.getRadioMobilita().getValueExclusive() == '1' || me.getRadioMobilita().getValueExclusive() == '2' || me.getRadioMobilita().getValueExclusive() == '3') {
				punteggioMobilità = 0;
			} else {
				punteggioMobilità = parseInt(me.getRadioMobilita().getValueExclusive());
			}
			var punteggioParziale = parseInt(me.getRadioCadute().getValueExclusive()) + punteggioMobilità +
									parseInt(me.getRadioAndatura().getValueExclusive()) + parseInt(me.getRadioStatoMentale().getValueExclusive());
			
			// se il punteggio parziale è > 25 e quello complessivo è tra 25 e 55 chiedo di compilare la scheda Tinetti e alla conferma apro NuovoDefault della Tinetti
			if( (me.punteggio>=25 && me.punteggio<=55) && punteggioParziale>=25) {
				
				var tabTinetti = false;
				var controllerPopUp = me.cbaConfig.controllerTestata.cbaConfig.controllerTestata;
				var tabPanel = me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.getTpVideate();
				var nomeForm;
				tabPanel.tabBar.items.items.forEach(function(videata) {
					if (videata.card.cbaConfig.videata.codVideata == 5) {
						tabTinetti = videata.card;
						nomeForm = videata.card.cbaConfig.videata.voceMenu.nomeForm;
					}
				});
				
				if (tabTinetti.cbaConfig.videata.tipoPermesso == 'S') {
					Messaggio('ATTENZIONE', traduci("COMPILARE_TINETTI"), 'YESNO', 'QUESTION', false,
						function() {
							me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.scalaMorse = true;
							me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.progrMorse = me.getForm().getValues().id;
							tabPanel.setActiveTab(tabTinetti);
						}
					);
				}
				
			}
			
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	calcolaPunteggio: function(newValue, oldValue) {
		var me = this;
		me.punteggio = me.punteggio - (Ext.isEmpty(oldValue) ? 0 : parseFloat(oldValue)) + (Ext.isEmpty(newValue) ? 0 : parseFloat(newValue));
		me.aggiornaLabelPunteggio();
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
			me.nuovo = true;
			me.isCopia = false;
			ControllerStd.nuovoRecord(form);
//			if(me.nonSomministrabile)
//				me.getFieldInfoPunteggio().legend.removeAll();
			
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
			me.bloccaForm = false;
			me.punteggio = 0;
//			me.getFiltroAgenda().setValue(0);
			if(!Ext.is.Phone){
				me.clickLivelloDolore()
			}else{
				me.punteggio = 0;
				me.percentuale = 0;
			}   
		});
		
		btnRipristina.on('tap', function(){
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
				svuotaStore(me.getGridCadute().getStore());
				svuotaStore(me.getGridPatologie().getStore());
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
			me.clickCopia(me);
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			//controllo che ci sia l'id compilato	
			me.nuovo = false;
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							if(me.soloUnaTestata){
								//TODO_PLS
								//form.up('window').close();
								return false;
							}
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
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.morse.MorseStore');

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
	
	clickCopia: function(controller) {
		var me = controller;
		var myForm = me.getForm();
		var form = myForm.getForm();
		var store = me.storeForm;
	
		if(store.getCount() > 0) {
			store.load({
				params: {
					id: form.findField('id').getValue() ? parseInt(form.findField('id').getValue()) : me.testataSelezionata
				},
				callback: function(records,operation,success){
					if(success){
						var rec= records[0];
						
						if(!Ext.isEmpty(rec)){	
							form.setValues({
								dataRegAppo: rec.get('data'),
								oraRegAppo: rec.get('data')
							});
							
							me.getPnlCompilatore().setLabelCompilatore(rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')');
							
							// nuova registrazione 
							controller_nuovoRecord(myForm);
							me.getComboValidita().setValue(me.scadenzaDaImpoTest);				
							me.getFiltroAgenda().setValue(0);
							
							me.loadGridCadute();
							me.loadGridPatologie();
							
							// carico i dati e mantengo l'id negativo
							form.loadRecord(rec);
							me.getForm().getForm().findField('id').setValue('-9999');
							bloccaFormCss(me.getForm(), false, true, [me.getPnlFunzioni()]);
							
							me.salvaStatoBottoni();
							
							if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
								me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
							}
						}
					}else{
						msgShowError('',operation.getError());	
					}			
				}
			});
		} else Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
	},
	
	aggiornaStore: function(idRecord){		
		var me= this;
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabTest'));
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			me.lookupReference('TotTest').hide();
			me.lookupReference('DataRegistrazione').setValue(me.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = me.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			if(idRecord || me.testataSelezionata){
				var form = me.lookupReference('Form');
				var store = me.storeForm;	
				me.onLoad = true;
				store.load({
					params: {
						id: idRecord ? idRecord : me.testataSelezionata
					},
					callback: function(records,operation,success){
						if(success){
							var rec= records[0];
							
							me.changeData = false;
							if(!Ext.isEmpty(rec)){	
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
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
								/* controllo sui valori mobilia e mobilitaAppo:
								 * se mobilitaAppo != 0 -> rec.mobilita = mobilitaAppo
								 * altrimenti -> rec.mobilita = mobilita*/
								
								let mobilita;
								
								if((rec.get('mobilitaAppo') != '0') && (rec.get('mobilitaAppo') != null) && (rec.get('mobilitaAppo') != '')) {
									mobilita = rec.get('mobilitaAppo');
								} else {
									mobilita = rec.get('mobilita');
								}
								
								delete rec.data.mobilita;
								delete rec.data.mobilitaAppo;
								
								Ext.apply(rec.data,{
									mobilita: mobilita,
								});
								
								me.loadGridCadute(rec.get('data'));
								me.loadGridPatologie(rec.get('data'));
								
//								me.salvaStatoBottoni();
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								} 
								me.lookupReference('TotTest').show();
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}
			else{
				me.lookupReference('TotTest').show();
				me.lookupReference('Form').setRecord_cba(); //risetto il valori del dirty
				StdCba.bloccaFormCss(form, false, false/*, [me.getPnlFunzioni()]*/);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			} 
			if(form.permesso != 'L')
				this.lookupReference('Form').createFabs.btnCopia.setHidden(!this.testataSelezionata);
		}	
	},
	
	// carico la griglia delle cadute negli ultimi 3 mesi
	loadGridCadute: function(data) {
		var me = this;
		var grid = me.lookupReference('GridCadute');
	
		var store = grid.getStore();
		store.load({
			params:{
				idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).get('idRicovero'),
				data: data ? data : new Date()
			},	
			callback: function(success){
				if(success) {
					if(success[0]) {
						store.loadData(success[0].get('cadute'));
					}
					grid.setTitle(StdCba.traduci('CADUTE_3_MESI') + StdCba.FormattaData(success[0].data.dataDal) + ')');
					if(!Ext.isEmpty(success[0].get('cadute'))) grid.getSelectionModel().select(0);
				} else {
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
	},
	
	// carico la griglia delle patologie (solo attive e croniche non annullate)
	loadGridPatologie: function(data) {
		var me = this;
		var grid = me.lookupReference('GridPatologie');
		var store = grid.getStore();
		
		store.filterBy(function(rec) {
			return ( rec.get('tipoBlocco').valore!="A" );
		});
		
		store.load({
			params:{
				idProfilo: CBA.parametriGenerali.idProfiloCss,
				idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).get('idRicovero'),
				anamnesi: 'F',
				stato: [1, 3],
				dataAl: data ? data : new Date()
			},
			callback: function(success){
				if(success) {
					let records = success;
					grid.setTitle(StdCba.traduci('PROB_PAT_AL') + StdCba.FormattaData(data ? data : new Date()));
					if(!Ext.isEmpty(records)) {
						grid.getSelectionModel().select(0);
					}
					if (!me.onLoad)
						me.radioDefault();
					
				} else {
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
	},
	
	init : function(){
		this.callParent(arguments);
		this.punteggio = 0;
		this.cbaConfig.punteggioMax = 125;
		var form = this.lookupReference('Form');
		form.controller = this;
		
		this.caricaPunteggio(()=> {
			this.aggiornaLabelPunteggio();
		});
		
		// al change della data del pannello compilatore devo aggiornare le griglie (aggiunto l'evento per aggiornare le griglie in caso di retrodatazione)
		this.changeData = true;
		this.lookupReference('DataRegistrazione').on('change', (th, newValue, oldValue) => {
			if(Ext.isDate(newValue) && this.changeData) {
				this.loadGridCadute(newValue);
				this.loadGridPatologie(newValue);
			}
			if(!this.changeData) this.changeData = true;
		});
		
		/** scorro i cbaMultipleChoice e al change salvo oldValue e newValue e aggiorno punteggio
		    (per RadioMobilità modifico i valori in quanto newValue=0 e newValue=0 non scatenano l'evento e setto il campo mobilitaAppo) **/
		
		vettCbaMultiple = this.lookupReference('Form').query('cbaMultipleChoice');
		vettCbaMultiple.forEach(function(radio) {
			// al cambio dei radio aggiorno punteggio
			radio.on('choicechange', (th, newValue, oldValue) =>{
				
				if(th.up().up().itemId=="RadioMobilita") {
					
					if(oldValue=='1' || oldValue=='2' || oldValue=='3') {
						oldValue = '0';
					}
					
					if(newValue=='1' || newValue=='2' || newValue=='3') {
						this.mobilitaAppo = newValue;
						newValue = 0;
					}
					
					if(newValue=='15') {
						this.mobilita = '15';
					}
					
					if(newValue=='30') {
						this.mobilita = '30';
					}
				}
				this.calcolaPunteggio(newValue, oldValue);
			});
		});
				
		this.cbaConfig.tipoTestata = 'Morse';
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
//		this.lookupReference('ImgCalendario().addCls('agenda-no');
		this.caricaValidita();
		
	},
	
	destroy: function(){
		eliminaStore(this.storeForm);
	    this.callParent();
	}

});
