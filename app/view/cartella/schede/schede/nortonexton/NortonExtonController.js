Ext.define('CS.schede.schede.nortonexton.NortonExtonController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-nortonexton-nortonexton',
    
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
	
	sottraiPunteggio:function(th,newValue,oldValue){
		var me = this;
		if(newValue == null)
			return false
		var tmp_punteggio = me.punteggio;
		if(newValue)
			me.punteggio = me.punteggio -1 ;
		else
			me.punteggio = me.punteggio  + 1 ;
		me.aggiornaLabelPunteggio(tmp_punteggio);
		
	},
	
	calcolaPunteggio:function(th,newValue,oldValue){
		var me = this;
	
		var group = th.up('cbaMultipleChoice');
		var tmp_punteggio = me.punteggio;
		if(group.getItemId().indexOf('RadioRischioDec')== 0){
			me.punteggioVPIA = newValue;
		}else{
			me.punteggio = me.punteggio - (Ext.isEmpty(oldValue) ? 0 : parseInt(oldValue)) + (Ext.isEmpty(newValue) ? 0 : parseInt(newValue));
		}
		me.aggiornaLabelPunteggio(tmp_punteggio);
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
			me.nuovoTest = true; 	//serve perbloccare il messaggio del punteggio in negativo fa partire la clearForm e scatena i change 
			ControllerStd.nuovoRecord(form);
			me.nuovoTest = false;
//			if(me.nonSomministrabile) 
//				me.FieldInfoPunteggio().legend.removeAll();

			StdCba.bloccaFormCss(form, false, true);
			me.punteggio = 0;
			me.punteggioVPIA = -1;
			me.aggiornaLabelPunteggio(false);
//			me.getFiltroAgenda().setValue(0);
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
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.nortonexton.store.NortonExton');

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
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		me.aggiornamentoTestata = true;
		
		var fields = form.getFields();
		risposte = StdCba.convertiBool(risposte, fields);
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
	
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			punteggioMassimo:me.punteggio,
			agenda:risposte.slider ? 'T' : 'F',
			nonSomministrabile:'F',  
		});
		
		delete risposte.slider;
		
		me.dataRecord = risposte.data;
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	verificaCampiForm: function(){
		var messaggi= [];
		var me = this;
		var form= me.lookupReference('Form');
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		
		/*controllo su campi obbligatori */
		var condizGenerali = me.lookupReference('RadioCondGenerali').getValueExclusive();
		if(Ext.isEmpty(condizGenerali)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_CONDIZIIONI_GENERALI');
		}
		var mobilita = me.lookupReference('RadioStatoMentale').getValueExclusive();
		if(Ext.isEmpty(mobilita)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_STATO_MENTALE');
		}
		
		var camminare = me.lookupReference('RadioCapCamminare').getValueExclusive();
		if(Ext.isEmpty(camminare))
			StdCba.msgAddError(messaggi,'MSG_CAMPI_CAMMINARE');
		
		var muoversi = me.lookupReference('RadioCapMuoversi').getValueExclusive();
		if(Ext.isEmpty(muoversi)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_MUOVERSI');
		}
		
		var incontinenza = me.lookupReference('RadioIncontinenza').getValueExclusive();
		if(Ext.isEmpty(incontinenza)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_INCONTINENZA');
		}
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}
		return 	StdCba.msgShow('',messaggi);
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
			
			me.onload = true;
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
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
								me.onload = false;
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco, false);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								me.nonSomministrabile = rec.get('nonSomministrabile');
//								me.salvaStatoBottoni();
//								me.gestisciNonSomministrabile();
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								} 
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								me.lookupReference('TotTest').show();
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				me.lookupReference('TotTest').show();
				me.punteggio = 0;
				me.aggiornaLabelPunteggio(false);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				StdCba.bloccaFormCss(form, form.permesso != 'S');
			}
		}	
	},
	
	aggiornaLabelPunteggio: function(tmp_punteggio) {
		var me = this;
		var descrizione = "";
		if(!me.nuovoTest && (!me.onload && tmp_punteggio >= 0 && me.punteggio  < 0))
			StdCba.Messaggio('ATTENZIONE', 'PUNTEGGIO_NEGATIVO', 'OK', 'QUESTION');
		
		me.lookupReference('TotTest').setHtml('Tot. Punteggio: '+ me.punteggio + '/20');
		if(me.nascondiVPIA)
			me.lookupReference('LblPunteggioVpia').setHidden(true);
		else
			me.lookupReference('LblPunteggioVpia').setHtml('VSAN:'+ (me.punteggioVPIA != -1 ? me.punteggioVPIA : ''));
	},
	
	init : function(){
		var me =this;
		this.callParent(arguments);
		me.punteggio = 0;
		me.onload = false;
		me.nuovo = false;
		me.punteggioVPIA = -1;
		var form = me.lookupReference('Form');
		me.nascondiVPIA = (CBA.moduli.modulo49.regione != 'T' && CBA.moduli.modulo49.regione != 'V' && CBA.moduli.modulo49.regione != 'U') ? true : false;
		me.lookupReference('CntRischioDec').setHidden(me.nascondiVPIA);
		form.controller=me;
		
		me.cbaConfig.tipoTestata = 'Norton';
		me.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
		
		me.gestioneForm();
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.aggiornaDaTestata = true;
		me.aggiornaLabelPunteggio(false);
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
//		me.getImgCalendario().addCls('agenda-no');
		me.caricaStoreExtraDati();
		me.caricaValidita();
		
		
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}
});
