Ext.define('CS.schede.schedeModulari.domande.DomandeController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schedemodulari-domande-domande',
    
    beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		
		var form = me.lookupReference('Form');
		if(form.dirty_oldIsDirty || !me.recordTestata){
			StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
			return false;
		}
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, true);
			/* setto configurazioni per generazione grafico  */
			let pnlController = newTab.down('#PnlFiltroGrafico').controller
			pnlController.maxPunteggio = me.punteggioMax;
			pnlController.minPunteggio = 0;
			pnlController.lookupReference('DataDal').setValue(new Date());
			pnlController.lookupReference('DataAl').setValue(new Date());
			pnlController.generaGrafico();
			
		}else if(newTab.getItemId().indexOf('TabProvvedimenti') != -1){
			//TODO_pls
			StdCba.tapTabAndamento(form, true);
			newTab.controller.idTest = me.recordTestata.get('id');
			newTab.controller.aggiornaStore();
			
		}else{
			StdCba.tapTabAndamento(form, false);
		}
	},

	generaDomande:function(rec,idTest, callbackFn){
		var me=this;
		var messaggi=[];
		Ext.suspendLayouts();	
		me.Punteggio = 0;
		me.lookupReference('Note').setHidden(true);
		me.lookupReference('CntCorpoDomande').removeAll();
		
		me.storeDati = Ext.create('CS.schede.schedeModulari.domande.StoreDati');
		me.storeDati.add(rec);
		
		Ext.each(rec,function(item){  
			var cntDomanda = Ext.create('CS.schede.schedeModulari.domande.CntDomandeDe',{	
				cbaConfig: {
					dati: item,
					idTest:idTest,
					controllerMain:me			
				}
			});
			me.lookupReference('CntCorpoDomande').add(cntDomanda);
		});
		me.aggiornaLabelPunteggio();
		me.lookupReference('Note').setHidden(false);
		if(callbackFn)	callbackFn();
		Ext.resumeLayouts(true);
	},
	
	aggiornaLabelPunteggio: function(ctrl) {
		var me = ctrl? ctrl : this;
		var descrizione = "";
		var oreAss = "";		
		if (me.lookupReference('TotPunteggio')){
			if(me.nonSomministrabile == 'F' || !me.nonSomministrabile){
				if(me.vettorePunteggi){
					
					Ext.each(me.vettorePunteggi,function(rec){
						if(me.Punteggio <= rec.data.punteggioMax && me.Punteggio >= rec.data.punteggioMin){
							if(rec.get('oreAssistenza'))
								oreAss = StdCba.traduci('ORE_ASSISTENZA_SET')+': ' + rec.data.oreAssistenza;
							descrizione=rec.data.descrizione;	
						}						
					});	
				}
			}
			me.lookupReference('TotPunteggio').setHtml('Tot. punteggio: ' + me.Punteggio + '/'+ me.totalePunteggio);	
			me.lookupReference('OreAssistenza').setHtml(oreAss);
			me.lookupReference('DescrizionePunteggio').setHtml(descrizione);
			me.lookupReference('OreAssistenza').setHidden(me.nonSomministrabile);
			me.lookupReference('DescrizionePunteggio').setHidden(me.nonSomministrabile);
		}
	},
	
	nuovoTest:function(){
		var me= this;
		var form = me.lookupReference('Form');
		Ext.Ajax.request({
			method: 'GET',
			url:`${CbaRootServer}`+'/cba/css/cs/ws/skval/domande/listbymodulo',
			params:{
				codiceModulo: me.cbaConfig.sottoTipoTestata
			},
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				if(risposta.success){
					if(!Ext.isEmpty(risposta)){	
						me.nuovoTestDom = true;
						me.generaDomande(risposta.data);
						form.setValues({
							slider: 0	
						});
//						me.getImgCalendario().addCls('agenda-no');
						if(!me.testataSelezionata && me.controllo){
							me.totalePunteggio = risposta.data[0].punteggioMassimo;
							me.aggiornaLabelPunteggio();	
							
							/*Risetto i valori originali per avere il change sui campi*/
							me.lookupReference('Form').setRecord_cba();
							return false;
						}
						
						me.lookupReference('ComboValidita').setValue(me.scadenzaDaImpoTest);
						me.lookupReference('Note').setValue(''); 
						
					}
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});	
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
			
			me.svuotaValori();
			
			ControllerStd.nuovoRecord(form);
			StdCba.bloccaFormCss(me.lookupReference('Form'), false, true);
			if(me.nonSomministrabile) {
				me.nonSomministrabile = 'F';
				var IconaWarning = Ext.getCmp('IconaWarning');
				me.getFieldInfoPunteggio().legend.remove(IconaWarning);
			}
			
			me.controllo=false;
			me.nuovoTest();
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(me.soloUnaTestata){
				form.up('window').close();
				return false;
			}
			if(!me.testataSelezionata){	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			}				
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
			me.clickCopia(me);
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			me.nuovo = false;
			//controllo che ci sia l'id compilato
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							if(me.soloUnaTestata){
								form.up('window').close();
								return false;
							}
							me.aggiornamentoTestata = true;
							me.aggiornaStore(id);
					}
				);
			}else	StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
	
	gestioneForm: function(){
		var me= this;
		var form= me.lookupReference('Form');
		form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';

		me.storeForm = form.store= Ext.create('CS.schede.schedeModulari.domande.store.DomandeStore');
		form.controller= me; //associo il controller alla form
		
		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L'? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');

		if(form.permesso == 'S'){			
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
        }
		StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniSchede', function(controller, rec){
			if(!Ext.isEmpty(rec)) {
				controller.scadenzaDaImpoTest = rec.get('scadenza');
				controller.stopInterval = Ext.isEmpty(rec.get('scadenza'));
			}
		});
	},
	
	GestioneEsapndiCollassa: function(th,funzione){
		Ext.suspendLayouts();
		var me = this;
		var ctrl;
		var apritutti=false;
		var messaggi=[];
		var cntDomande = me.lookupReference('CntCorpoDomande').query('[itemId=CntCorpoDomanda]');
		for(var i = 0;i < cntDomande.length;i++ ){
			var ctrl=cntDomande[i].up().controller;
			if(funzione=='espandi'){	
				ctrl.apriPanel=true;
				ctrl.collassa(ctrl.lookupReference('CntIcona').down('image'));
			}else {
				ctrl.apriPanel=false;
				ctrl.collassa(ctrl.lookupReference('CntIcona').down('image'));
			}
		}
		Ext.resumeLayouts(true);
	},
	
	controllaCampiTest: function(){
		var me=this;
		Ext.suspendLayouts();
		var form=me.lookupReference('Form');
		var primoFocus=true;
		var ctrlDettaglio = null;
		var messaggi=[];
		var testRisposte= form.getValues();
		Ext.apply(testRisposte, me.cbaConfig.arrayDomande);
		var CorpoDomande = me.lookupReference('CntCorpoDomande').query('[itemId=CntCorpoDomanda]');
		me.testValido=true;
		let trovato = false;
		Ext.each(me.lookupReference('CntCorpoDomande').query('[itemId=TextIdRisposta]'), function(risposta, i){
			var risposta = risposta.getValue();
			
			ctrlDettaglio=CorpoDomande[i].up().controller;
			if(Ext.isEmpty(risposta)){
				
				me.testValido=false;
				ctrlDettaglio.lookupReference('PanelRisposte').up().addCls('cbaCssBordoErrore');
				trovato = true;
				if(primoFocus){
					ctrlDettaglio.lookupReference('CntCorpoDomanda').focusable=true;
					ctrlDettaglio.lookupReference('CntCorpoDomanda').focus();
					primoFocus=false;
				}
				ctrlDettaglio.apriPanel=true;
			} 
			else if(me.testValido) {
				
				if(risposta == '-1'){
					risposta=null;
					var img = ctrlDettaglio.lookupReference('CntIcona').down('image');
				}
				ctrlDettaglio.apriPanel=false;
				
			}else {
				
				ctrlDettaglio.apriPanel=false;
			}
			ctrlDettaglio.collassa(ctrlDettaglio.lookupReference('CntIcona').down('image'));
		});
		
//		for(var i=0;i<=risposte.length-1;i++){
//			
//			
//		};
		if(trovato)
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
			
		Ext.resumeLayouts(true); 
		return messaggi;
	},
	
	verificaCampiForm: function(){
		
		//var messaggi= [];
		var me=this;
		var form= me.lookupReference('Form');
		var testRisposte= form.getValues();
		var domande=testRisposte.idDomanda;
		var risposte = testRisposte.idRisposta;
		var messaggi=me.controllaCampiTest();
		if (messaggi){
			return StdCba.msgShow('',messaggi);
			//msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}			
	},

	salvaForm: function(esci){		
		var me= this;
		var form= me.lookupReference('Form');  
		var testRisposte= form.getValues();
		Ext.apply(testRisposte, me.cbaConfig.arrayDomande);
		var note=testRisposte.note; 		//MI SALVO IL CONTENUTO PRIMA DI ELIMINARLO 
		var scadenza=testRisposte.scadenza;	
		var vettoreDomande =[];
		var j=0;
		delete testRisposte.dataRegAppo;
		delete testRisposte.oraRegAppo;
		if(testRisposte.id  == '-9999') {
			testRisposte.idTestRisposta = null;
			testRisposte.idTest=null;	
		}
		Ext.each(testRisposte.idDomanda,function(item){
			var tmp={
					id:(Ext.isEmpty(testRisposte.idTestRisposta)) ? '': testRisposte.idTestRisposta[j],
					idTest: (Ext.isEmpty(testRisposte.idTest)) ? '': testRisposte.idTest[j],
					idDomanda:item,
					idRisposta:testRisposte.idRisposta[j]	
			};
			vettoreDomande.push(tmp);
			j++;
		});
		
		var test={
			id: (Ext.isEmpty(testRisposte.idTest)) ? '': testRisposte.idTest[0],
			compilatore:  CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			codiceModulo:me.cbaConfig.sottoTipoTestata,
			note:testRisposte.note,
			scadenza:scadenza,
			agenda:testRisposte.slider ? 'T' : 'F'
		};
		
//		if(me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita)
//			test.collegamento = me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita;

		var testCompilato={
			test:test,
			testRisposte:vettoreDomande
		};
		//delete newRecord.descrizioneX;	//cosi elimino il campo da non inviare al server
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;	//si cercano le testate in base alla data del record
		me.dataRecord = test.data;
		if(ControllerStd.salvaRecord(form,testCompilato,false,false,true)){
			me.nuovo = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
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
			//svuoto form
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
							var scadenzaTest;
							if(!Ext.isEmpty(rec)){
								//TODO_PLS
//								me.getCntAgenda().setDisabled(Ext.isEmpty(rec.get('scadenza')));
								
								me.totalePunteggio = rec.get('punteggioMassimo');
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
//								me.gestisciNonSomministrabile(rec.get('nonSomministrabile'));
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								me.nuovoTestDom = false;
								me.generaDomande(rec.data.domande,rec.data.id, function(){
									//permessi scrittura
									var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
									StdCba.bloccaFormCss(form, blocco, false);
									StdCba.containerSolaLettura(pnlCompilatore, blocco);
									
									form.dirty_suspendDirtyChange = false;
									form.dirty_resetOriginal();
								});
//								me.salvaStatoBottoni();
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								}
								if(me.soloUnaTestata)
									me.disabilitaNuovoCopia();
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				me.controllo=true;
				me.lookupReference('Form').setRecord_cba(); //risetto il valori del dirty
				StdCba.bloccaFormCss(form, false, false/*, [me.getPnlFunzioni()]*/);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				me.nuovoTest();
			}
			if(form.permesso != 'L')
				me.lookupReference('Form').createFabs.btnCopia.setHidden(!this.testataSelezionata);
		}	
	},
	
	svuotaValori: function(){
		var me = this;
		me.cbaConfig.arrayDomande = {};
		me.cbaConfig.arrayDomande.idDomanda = [];
		me.cbaConfig.arrayDomande.idRisposta = [];
		me.cbaConfig.arrayDomande.idTest = [];
		me.cbaConfig.arrayDomande.idTestRisposta = [];
	},

	init: function(){
		var me =this;
		me.callParent(arguments);
		me.nuovo = false;
		var form = me.lookupReference('Form');
		form.controller = me;
		me.Punteggio = 0;
		me.cbaConfig.tipoTestata = 'Test';
		/*sottoTipoTestata*/
		me.cbaConfig.sottoTipoTestata = me.cbaConfig.controllerPageStd.cbaConfig.codVideata;
		
		me.svuotaValori();
		//TODO_PLS ??
//		var controllerTest = me.cbaConfig.controllerTestata.cbaConfig;
//		if(controllerTest && controllerTest.controllerTestata.cbaConfig.controllerCadute){
//			me.cbaConfig.sottoTipoTestata = controllerTest.controllerTestata.cbaConfig.sottoTipoTestata;
//		}else{
//			me.cbaConfig.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
//		}
		
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero;

		me.gestioneForm();

		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		me.totalePunteggio = 0;
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		me.caricaValidita();
		me.caricaStoreExtraDati();
		me.caricaPunteggio(function(records){
			me.aggiornaLabelPunteggio();
//			if(!Ext.isEmpty(records) && records[0].get('oreAssistenza'))
//				me.setInfoPunteggio(me.lookupReference('Totali'), 'NOTE_BIBLIOGRAFICHE', 'INFO_ORE_ASSISTENZA');
			
		});
		//TODO_PLS ??
		//per ingresso da visiste
//		me.ingressoDaVisite();

	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
