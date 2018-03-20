Ext.define('CS.schede.schede.kane.KaneController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-kane-kane',

	
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
//			if(me.nonSomministrabile)
//				me.getFieldInfoPunteggio().legend.removeAll();
			me.punteggio = 0;
			me.punteggioA = 0;
			me.punteggioB = 0;
			me.punteggioC = 0;

			StdCba.bloccaFormCss(me.lookupReference('Form'), false, true);
			me.aggiornaLabelPunteggio(me.punteggioA,me.punteggioB,me.punteggioC);
//			me.getFiltroAgenda().setValue(0);
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
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
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.kane.KaneStore');

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
		var obj = {};
		var form = me.lookupReference('Form');
		var risposte= form.getValues();
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
			punteggioMassimo:me.punteggio,
			agenda:risposte.slider ? 'T' : 'F',
			nonSomministrabile:'F'  
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
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		/*controllo su campi radio */
		var lettura = me.lookupReference('SelectLettura').getValue();
		var lavori = me.lookupReference('SelectlavoriAMano').getValue();
		var animazione = me.lookupReference('SelectAnimazione').getValue();
		var telefono = me.lookupReference('SelectTelefono').getValue();
		var giochi = me.lookupReference('SelectGiochi').getValue(); 
		var televisione = me.lookupReference('SelectTelevisione').getValue();
		var visiteFamiliari = me.lookupReference('SelectVisiteFamiliari').getValue();
		var visiteAmici = me.lookupReference('SelectVisiteAmici').getValue();
		var conversazione = me.lookupReference('SelectConversazione').getValue();
		var istituto = me.lookupReference('SelectIstituto').getValue();
		var istitutoFuoriLegato = me.lookupReference('SelectFuoriLegato').getValue();
		var uscito = me.lookupReference('SelectUscito').getValue();
		var ospitatoDormire = me.lookupReference('SelectOspitatoDormire').getValue();
		
		if(Ext.isEmpty(lettura) || Ext.isEmpty(lavori) || Ext.isEmpty(animazione) || Ext.isEmpty(telefono) || Ext.isEmpty(giochi) || Ext.isEmpty(televisione) ){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI_ATTIVITA');
		}
		if(Ext.isEmpty(visiteFamiliari) || Ext.isEmpty(visiteAmici) || Ext.isEmpty(conversazione) || Ext.isEmpty(istituto) || Ext.isEmpty(istitutoFuoriLegato)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI_CONTATTI');
		}
		if(Ext.isEmpty(visiteFamiliari) || Ext.isEmpty(visiteAmici)){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI_ATTIVITA_SOCIALI');
		}
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
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabAndatura'));
		
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
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco, false);
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
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
				/*controllo in caso di ingeresso nella videata senza testate */
				me.lookupReference('TotTest').show();
				me.punteggio = 0;
				me.lookupReference('Form').setRecord_cba(); //risetto il valori del dirty
				StdCba.bloccaFormCss(form, false, false/*, [me.getPnlFunzioni()]*/);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
					
			}
		}	
	},

	changeSelect:function(th,newValue,oldValue){
		var me = this;
		
		var container = th.up('container').up('container');
		me.punteggio = me.punteggio - (Ext.isEmpty(oldValue) ? 0 : parseInt(oldValue)) + (Ext.isEmpty(newValue) ? 0 : parseInt(newValue));
		
		/*assegno al mio radiogroup il l'item id del container di riferimento*/
		if(container.getItemId() == 'CntAttivita')
			me.punteggioA = me.punteggio - me.punteggioC  - me.punteggioB;
		if(container.getItemId()  == 'CntContatti')
			me.punteggioB = me.punteggio - me.punteggioA  - me.punteggioC;
		if(container.getItemId()  == 'CntAttivitaSociali')
			me.punteggioC = me.punteggio - me.punteggioB  - me.punteggioA;

		me.aggiornaLabelPunteggio(me.punteggioA,me.punteggioB,me.punteggioC);
	},

	aggiornaLabelPunteggio: function(punteggioA,punteggioB,punteggioC) {
		var me = this;
		if(!Ext.isEmpty(punteggioA)){
			me.lookupReference('TotalePunteggioA').setHtml(punteggioA + ' /36');
		}
		if(!Ext.isEmpty(punteggioB)){
			me.lookupReference('TotalePunteggioB').setHtml(punteggioB + ' /30');
		}
		if(!Ext.isEmpty(punteggioC)){
			me.lookupReference('TotalePunteggioC').setHtml(punteggioC + ' /12');
		}		
		var descrizione = "";
		me.lookupReference('TotTest').setHtml('Tot. Punteggio: ' +  me.punteggio +'/78' );
	},

	init: function(){
		var me =this;
		this.callParent(arguments);
		var form= me.lookupReference('Form');
		me.punteggio = 0;
		me.punteggioA = 0;
		me.punteggioB = 0;
		me.punteggioC = 0;
		me.nuovo = false;
		
		form.controller = me;
		me.cbaConfig.tipoTestata = 'Kane';
		me.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
	
//		me.getFieldLeggenda().legend.add(Ext.create('Ext.Img',{
//			src:'/cba/css/generali/images/skval/legend.png',
//			margin:'0 0 0 5',
//			width:16,
//			height:16
//		}));

		me.gestioneForm();
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.aggiornaDaTestata = true;
		
		me.aggiornaLabelPunteggio(me.punteggioA, me.punteggioB, me.punteggioC);
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		me.caricaValidita();
		me.caricaStoreExtraDati();
//		me.getImgCalendario().addCls('agenda-no');
		
		
	},
	
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
