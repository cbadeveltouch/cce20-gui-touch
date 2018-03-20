Ext.define('CS.schede.schede.spmsq.SpmsqController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-spmsq-spmsq',
    
	beforetabchangeTabPanel: function(th, newTab, oldTab){
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
	
	calcolaPunteggio:function(th,newValue,oldValue){
		var me = this;
		if(newValue == true)
			me.punteggio = me.punteggio + 1;
		else
			me.punteggio = me.punteggio - 1;
		
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
			me.isCopia = false;
			me.nuovo = true;
			StdCba.bloccaFormCss(form, false);
			ControllerStd.nuovoRecord(form);
//			if(me.nonSomministrabile)
//				me.lookupReference('FieldInfoPunteggio').legend.removeAll();
			
			
			me.lookupReference('CheckNonSomministrabile').setValue(false);
//			me.getFiltroAgenda().setValue(0); TODO_PLS
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
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.spmsq.SpmsqStore');

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
		var risposte= form.getValues();
		var keys;
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		me.aggiornamentoTestata = true;
		
		let fields = form.getFields();
		risposte = StdCba.convertiBool(risposte, fields);
		
		keys = Ext.Object.getKeys(risposte);
		
		Ext.Object.each(risposte, (key, value, object)=>{
			if(key.indexOf('mms') != -1 && value == null)
				object[key] = '0'
		});
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			punteggioMassimo:me.punteggio,
			agenda:risposte.slider ? 'T' : 'F',
			nonSomministrabile:(me.lookupReference('CheckNonSomministrabile').getValue() == true) ? 'T':'F'  //TODO_PLS controlla
		});
		
		delete risposte.slider;
		
		me.dataRecord =risposte.data;
		
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
			me.lookupReference('CntEdit').setHidden(true);
			//me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.scalaMorse = false;
			me.lookupReference('Totali').setHidden(false);
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');
		
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			StdCba.msgAddError(messaggi, dataValidator);
		if(!me.nonSomministrabile)
			if (messaggi.length == 0 && !form.isValid()){
				StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
			}
		return StdCba.msgShow('',messaggi); 	
	},
	
	aggiornaStore: function(idRecord){		
		var me= this;
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		var form = this.lookupReference('Form');
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabDatiDomande'));
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			me.lookupReference('TotTest').hide();
		
			StdCba.clearForm(me.lookupReference('Form'));
			me.lookupReference('DataRegistrazione').setValue(me.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = me.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
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
								/*Converto e checko Booleani*/
								let fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
//								if(!Ext.isEmpty(rec.get('certificatoProblComp')))
									
//								me.gestisciNonSomministrabile(rec.get('nonSomministrabile'));
								me.lookupReference('CntRegione').setHidden((CBA.moduli.modulo49.regione != 'T' && CBA.moduli.modulo49.regione != 'V' ));
								me.lookupReference('CntRegione').setHidden((me.nonSomministrabile &&  me.nonSomministrabile == 'F') || !me.nonSomministrabile);
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								}
								
								me.lookupReference('TotTest').show();
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				me.punteggio = 0;
				/*controllo in caso di ingeresso nella videata senza testate */
				StdCba.bloccaFormCss(form, form.permesso != 'S');
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				me.lookupReference('TotTest').show();
			}
		}	
	},

	changeCheckNonSomministrabile: function(th,newValue,oldValue){
		var me = this;
	
		if(!th._readOnly){
			me.nonSomministrabile = newValue;
			me.lookupReference('CntRegione').setHidden(!me.nonSomministrabile);
			me.lookupReference('CntCheck').setHidden(me.nonSomministrabile);
			if(me.nonSomministrabile){
				/* nel caso in cui premo il non somministrabile sbianco le domande cognitive e abilito il contenuto */
				me.lookupReference('Form').setValues({
						mms1:'0',
						mms2:'0',
						mms3:'0',
						mms4:'0',
						mms5:'0',
						mms6:'0',
						mms7:'0',
						mms8:'0',
						mms9:'0',
						mms10:'0',
						//desc1:me.getDescrizioneDomande().down('textareafield').setValue(''); 
					});
				me.punteggio = 0;
				
			}
			me.aggiornaLabelPunteggio();
		}
	},
	
	aggiornaLabelPunteggio: function() {
		var me = this;	
		var descrizione = "";
		if(!me.nonSomministrabile){
			if(me.vettorePunteggi){
				Ext.each(me.vettorePunteggi,(rec)=>{
					if(me.punteggio <= rec.data.punteggioMax && me.punteggio >= rec.data.punteggioMin)
						descrizione = rec.data.descrizione;			
				});	
			}
		}else
			me.punteggioCorretto = 0;
		me.lookupReference('TotTest').setHtml('Tot. Punteggio: '+ me.punteggio+ '/10');
		if(me.annullaTest){
			me.punteggioCorretto = 0;
		}
		me.lookupReference('DescrizionePunteggio').setHtml(descrizione);
		me.lookupReference('DescrizionePunteggio').setHidden(me.nonSomministrabile);
		
	},
	
	init : function(){
		var me =this;
		this.callParent(arguments);
		me.nuovo = false;
		var form= me.lookupReference('Form');
		me.punteggio = 0;
		me.fattoreCorrezione = false;
		me.punteggioCorretto = false;
		form.controller=me;
		me.cbaConfig.tipoTestata = 'SPMSQ';
		
		me.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		
		me.gestioneForm();
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		
//		me.getImgCalendario().addCls('agenda-no'); 
		me.caricaValidita();
		me.caricaStoreExtraDati();
		me.caricaPunteggio(function(){
			me.aggiornaLabelPunteggio();
		});
		
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
