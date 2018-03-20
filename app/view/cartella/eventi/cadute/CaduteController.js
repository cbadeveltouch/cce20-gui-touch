Ext.define('CS.eventi.cadute.CaduteController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-eventi-cadute-cadute',

    btnContenzioni: function(th){
    	let panelContenzioni = Ext.create('Ext.Panel', {
				    		   layout: {
									type:'vbox',
									align: 'center'
								},
								width: Ext.is.Phone ? '60%' : 350,
							    height: 350,
							    top: '20%',
							    left: '20%',
							    floated: true,
							    modal: true,
							    hideOnMaskTap: true,
							    flex: 1,
							    closeAction: 'method-destroy',
							    items:[
							    	{
										xtype: 'panel',
										itemId: 'FieldContUso',reference:'FieldContUso',
										layout:{
											type:'vbox',
											align: 'stretch'
										},
										modificaTerzi: true,
										padding: 10,
										items:[
											{
												xtype:'panel',
												itemId:'CheckContenzioni',reference:'CheckContenzioni',
												scrollable:true,
												layout:{
													type: 'vbox',
													align: 'stretch'
												},
												height:'100%',
												items:[],
												cbaConfig:{
													campo:'Quali contenzioni utilizzava'
												}
											}
										]
									},
							    ]
							});

    	this.creaCampiDinamici(panelContenzioni.down('#CheckContenzioni'));
    	panelContenzioni.show();
    },
    
    changeRadioTestimoni: function(th, newValue, oldValue){
    	
    	this.lookupReference('ImgTestimoni').setHidden(!newValue)
    },
    
    changeCboxReparto: function (select, newValue,oldValue) {
        var me= this;
        StdCba.svuotaSelect(me.lookupReference('Stanza'));
        if ((select._value > 0) && (me.lookupReference('Sede').getValue() > 0)){
            me.lookupReference('Stanza').getStore().getProxy().extraParams = {
                sede: me.lookupReference('Sede').getValue(),
                reparto: select._value
            };
            me.lookupReference('Stanza').getStore().load({
            	callback: function(records,operation,success){
					if(success){
						var rec= records[0];
						if(!Ext.isEmpty(rec)){
//							if(!me.interazioneUtente){
//								me.interazioneUtente = false;
//								me.getStanza().select(me.stanza);
//								me.interazioneUtente = true;
//							}
							me.lookupReference('Form').setValues({
								codStanza: me.stanza
							});
						}
					}else{
						StdCba.msgShowError('',operation.getError());	
					}
				}
        	});
        }
	},
    
	changeCboxSede:function (select, newValue,oldValue){
		var me = this;
//		  if(me.onLoad){
//			return false;
//		}
//		if(me.interazioneUtente){
			StdCba.svuotaSelect(me.lookupReference('Reparto'));
			StdCba.svuotaSelect(me.lookupReference('Stanza'));	
	        if (select._value > 0){
	            me.lookupReference('Reparto').getStore().getProxy().extraParams = {
	                sede: select._value
	            };
	            me.lookupReference('Reparto').getStore().load();
	        }
//		}
	},
	
	changeRadioPresOstacoli: function(th, newValue, oldValue, eOpts){
		var me = this;
//		if(me.onLoad){
//			return false;
//		}
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			me.lookupReference('RadioOstacolo').setDisabled(!newValue);	
			me.interazioneUtente = true;
		}
	},
	
	changeRadioAppAcDurante: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(me.onLoad)
			return false;
		
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue){
				me.lookupReference('RadioAppAcustico').setValue({apparecchioAcustico : newValue.apparecchioAcusticoInUso});
			}
			me.interazioneUtente = true;
		}
	},
	
	changeRadioAltraProtesiDurante: function(th, newValue, oldValue, eOpts){
		var me= this;
		if(me.onLoad)
			return false;
		
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue){
				me.lookupReference('RadioAltraProtesi').setValue({altraProtesi : newValue.altraProtesiInUso});
			}
			me.interazioneUtente = true;
		}
	},
	
	changeRadioAltraProtesi: function(th, newValue, oldValue, eOpts){
		var me= this;
//		if(me.onLoad){
//			return false;
//		}
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue.altraProtesi == 'T'){
				me.lookupReference('RadioAltraProtesiDurante').setValue({altraProtesiInUso : newValue.altraProtesi});
				me.lookupReference('TxtAltraProtesi').setDisabled(!newValue);
			}else{
//				me.getRadioAltraProtesiDurante().setValue(false);
				Ext.each(me.lookupReference('RadioAltraProtesiDurante').items.items,function(i){
					i.setValue(false);
				});
				me.lookupReference('TxtAltraProtesi').setDisabled(true);
			}
			me.interazioneUtente = true;
		}
	},
	
	changeRadioOcchialiDurante: function(th, newValue, oldValue, eOpts){
		var me= this;
		if(me.onLoad)
			return false;
		
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue){
				me.lookupReference('RadioOcchiali').setValue({occhiali : newValue.occhialiInUso});
			}
			me.interazioneUtente = true;
		}
	},
	
	changeRadioOcchiali: function(th, newValue, oldValue, eOpts){
		var me= this;
		if(me.onLoad)
			return false;
		
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue){
				me.lookupReference('RadioOcchialiDurante').setValue({occhialiInUso : newValue.occhiali});
			}else{
				Ext.each(me.getRadioOcchialiDurante().items.items,function(i){
					i.setValue(false);
				});
			}
			me.interazioneUtente = true;
		}
	},
	
	changeRadioAppAcustico: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(me.onLoad)
			return false;
		
		if(me.interazioneUtente){
			me.interazioneUtente = false;
			if(newValue){
				me.lookupReference('RadioAppAcDurante').setValue({apparecchioAcusticoInUso : newValue.apparecchioAcustico});
			}else{
				Ext.each(me.lookupReference('RadioAppAcDurante').items.items,function(i){
					i.setValue(false);
				});
			}
			me.interazioneUtente = true;
		}
	},
	
	changeSelectCalzatura: function(th, newValue, oldValue){
		
		if(th.getValue() != null)
			this.lookupReference('RadioCalzaturaCome').setHidden(false);
		else
			this.lookupReference('RadioCalzaturaCome').setHidden(false);
	},
	
	changeRadioContenzioni: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!th.rendered)
			return false;
//		me.lookupReference('FieldContUso').setHidden(!newValue);
		me.lookupReference('ImgContenzioni').setHidden(!newValue);
		
		if(newValue == false){
//			Ext.each(me.lookupReference('CheckContenzioni').items.items,function(i){
//				i.setValue(false);
//			});
		}else{
			let dataReg = StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert'));
			Ext.Ajax.request({
				method: 'GET',
				url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/listContenzioniPrescritte',
				params: {
					idRicovero: me.idRicovero,
					al: dataReg
				},
				success: function (response) {
					var risposta = Ext.JSON.decode(response.responseText);
					var records = risposta.data;
					if(risposta.success){
						if(!Ext.isEmpty(records)){
							me.lookupReference('FieldConsRiportate').removeAll();
							records.listaContenzioni.map( i => {
								me.lookupReference('FieldConsRiportate').add({
									xtype: 'label',
									html: i,
									cls:'cbaCssLabel',
								});
							});
						}
					}else{
						StdCba.msgShowError('',risposta.message);
					}
				}
			});
		}
		me.lookupReference('FieldConsRiportate').up('container').setHidden(!newValue);
		
	},
	
	abilitaDisabilitaCampi: function(value, campo){
		var me = this;
		campo.setValue(value);
	},
	
	changeRadioCadutePrec: function(th, newValue, oldValue, eOpts){
		var me = this;
		me.lookupReference('DataUltimaCaduta').setHidden(!newValue);
	},
	
	changeCheckAltroFattAmb: function(th, newValue, oldValue, eOpts){
		var me = this;
		me.lookupReference('TxtAltroFattAmb').setHidden(!newValue);
	},
    
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnConsegna = form.createFabs.btnConsegna,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnNuovo.on('tap', function(){
			ControllerStd.nuovoRecord(form);
			me.visualizzaNascondiCampi(true);
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
		});
		
		btnConsegna.on('tap', function(){
			StdCba.tapBtnConsegna(me);
		});
		
		btnRipristina.on('tap', function(){
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.aggiornaStore();
		});
		
		btnAnnulla.on('tap', function(){
			var id= form.getFields().id.getValue();
			
			if(!Ext.isEmpty(id)){
				let messaggio = StdCba.setMsgOnDeleteRecWithConsegna(me);
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.aggiornaStore(id);
				},false, messaggio
				);
			}else StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
    
    gestioneForm: function(){		
		var me= this;
		var form= me.lookupReference('Form');	
		form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';
		
		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		
		me.storeForm = form.store= Ext.create('CS.eventi.cadute.CaduteStore');
		form.controller= me; //associo il controller alla form
		
	},
	
    aggiornaStore: function(idRecord){		
		var me= this;
		var formFields = me.lookupReference('Form').getFields();
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;			
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);			
		}else{
			//svuoto form
			StdCba.clearForm(me.lookupReference('Form'));
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
//								me.lookupReference('FieldContUso').setHidden(true);
								me.lookupReference('FieldConsRiportate').up('container').setHidden(true);
								/*
								 * Variabile onLoad implementata x i meccanismi di change implementati sui campi
								 * del gruppo UTENTE PORTATOTE DI, con questa variabile facciamo scatenare l'effettivo funzionamento del change
								 * solo dopo che � stato caricato lo store. 
								 */
								me.onLoad = true; 
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
//								StdCba.cercaCbaMultipleChoice(form, rec);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								//TODO_PLS schede di valutazione
//								if(me.storeImpostazioni.data && me.storeImpostazioni.data.items[0].get('areaTest1')){
//									me.caricaSchedeValutazione(rec.get('data'));
//								}
								
//								me.testataSelect = idRecord ? idRecord : me.testataSelezionata;
								if(me.tipoVideata == 'EventoAvverso'){
									me.lookupReference('DataUltimaCaduta').setHtml(StdCba.traduci('DATA_ULTIMO_EVENTO')+': '+StdCba.FormattaData(rec.get('dataUltimaCaduta')));
								}else{
									me.lookupReference('DataUltimaCaduta').setHtml(StdCba.traduci('DATA_ULTIMA_CADUTA')+': '+StdCba.FormattaData(rec.get('dataUltimaCaduta')));
								}
//								
//								me.dataUltimaCaduta = rec.get('dataUltimaCaduta') ? FormattaData(rec.get('dataUltimaCaduta')) : false;
//								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco);
								
//								StdCba.caricaFieldString(me.lookupReference('Form'), rec.get('contenzioneTipo'), 'contenzioneTipo');
								StdCba.caricaFieldString(me.lookupReference('Form'), rec.get('farmaciAssunti'), 'farmaciAssunti');
								StdCba.caricaFieldString(me.lookupReference('Form'), rec.get('provv'), 'provv');
//								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
//								
////								Ext.each(rec.get('testimoni'),function(i){
//								
//								me.getGridTestimoni().getStore().clearFilter();
//								if(!Ext.isEmpty(me.getGridTestimoni().getStore())){
//									me.getGridTestimoni().getStore().removeAll();
//								}
//								me.getGridTestimoni().getStore().add(!Ext.isEmpty(rec.get('testimoni')) ? rec.get('testimoni') : false);
////								
//								/*
//								 * Salvo nei due record i record attualmente presenti nelle due griglie e poi concatener� eventuali nuovi
//								 * testimoni/operatori
//								 */
//								me.recGridTestimoni = new Array();
//								Ext.each(me.getGridTestimoni().getStore().data.items,function(i){
//									if(!Ext.isEmpty(i.data)){
//										me.recGridTestimoni.push(i.data);
//									}
//								});
//								
////								});
////								Ext.each(rec.get('operatori'),function(k){
//								me.getGridOperatori().getStore().clearFilter();
//								if(!Ext.isEmpty(me.getGridOperatori().getStore())){
//									me.getGridOperatori().getStore().removeAll();
//								}
//								me.getGridOperatori().getStore().add(!Ext.isEmpty(rec.get('operatori')) ? rec.get('operatori') : false);
////								});
//								me.recGridOperatori = new Array();
//								Ext.each(me.getGridOperatori().getStore().data.items,function(i){
//									if(!Ext.isEmpty(i.data)){
//										me.recGridOperatori.push(i.data);
//									}
//								});
//								
//								// history
//								if( !Ext.isEmpty(me.getPnlCompilatore().query('#BtnHistoryCompilatori')) ){
//									me.getPnlCompilatore().query('#BtnHistoryCompilatori')[0].destroy();
//								}
//								if( rec.get('listaCompilatori').length > 1 ){
//									if( !Ext.isEmpty(me.getPnlCompilatore().query('#BtnHistoryCompilatori')) ){
//										me.getPnlCompilatore().query('#BtnHistoryCompilatori')[0].setHidden(false);
//									}
//									me.gestisciStoricoCompilatori(rec.get('listaCompilatori'));
//								}
//								
//								var idRec = idRecord ? idRecord : me.testataSelezionata;
//								if(me.tipoVideata != 'Caduta'){
//									if(rec.get('frequenza') || rec.get('gravita') || rec.get('rilevabilita')){
//										me.getChartFreq().up('fieldset').setHidden(false);
//										me.getChartGrav().up('fieldset').setHidden(false);
//										me.getChartRil().up('fieldset').setHidden(false);
//										me.getChartIPR().up('fieldset').setHidden(false);
//										
//									} else {
//										me.getChartFreq().up('fieldset').setHidden(true);
//										me.getChartGrav().up('fieldset').setHidden(true);
//										me.getChartRil().up('fieldset').setHidden(true);
//										me.getChartIPR().up('fieldset').setHidden(true);
//									}
//									me.gestisciValutazioneRischio(rec,idRec);
//								}
								me.stanza = rec.get('codStanza');
//								
//								
//								me.listParametriVitali(rec.get('data'));
////								Ext.defer(function(){me.getStanza().select(me.stanza)},500);
//
								StdCba.cssGestioneConsegna(rec, me);

								me.onLoad = false;
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
//				if(me.getChartFreq()){
//					me.getChartFreq().removeAll();
//					me.getChartGrav().removeAll();
//					me.getChartRil().removeAll();
//					me.getChartIPR().removeAll();
//					me.primaVolta = 0;
//				}
			}
		}
	},
	
	afterrenderForm: function(){
		var me = this;
		this.creaCampiDinamici();
		
		var winFiltri = this.cbaConfig.controllerTestata.pnlRicerca;
		if(this.tipoVideata == 'EventoAvverso'){
			this.getNoteDescCadute().setTitle('B - ' + StdCba.traduci('DESCRIZIONE_EVENTO_NOTE'));
			this.getFieldConseguenze().setTitle ('C - ' + StdCba.traduci('CONSEGUENZE_RIPORTATE'));
			this.getFieldProvvedimenti().setTitle('D - '+ StdCba.traduci('PROVVEDIMENTI_ADOTTATI'));
			this.getFieldLuogoDellaCaduta().setTitle(StdCba.traduci('LUOGO_EVENTO'));
			this.getFieldQuandoUtCaduto().setTitle(StdCba.traduci('QUAND_ACC_EVENTO'));
			this.getFieldAttSvoltaDurCaduta().setTitle(StdCba.traduci('ATT_SVOLT_DUR_EVENT'));
			this.getFieldCadutePrec().setTitle(StdCba.traduci('EVENTI_PREC'));
			this.getCntAddCampoEvAvversi().add({
				xtype:'cbaFieldsetHtmlEditor',
				title: StdCba.traduci('DESC_ANT'),
				height:200,
				width:300,
				flex:1,
				margin:'10 5 0 0',
				modificaTerzi: true,
				cbaConfig:{
					name:'descAnte',
					campo:'Descrizione Antecedente'
				}
			});
		}
		
		var formFiltri = winFiltri.down("#FormFiltri");
		formFiltri.add({
			xtype: 'checkboxfield',
			boxLabel: StdCba.traduci('ABILITA_CONS_MOD'),
			cls: 'cbaCssLabel',
			inputValue: 'T',
			uncheckedValue: 'F',
			margin: '5 0 0 0',
			itemId: 'CheckHistory', reference: 'CheckHistory',
			listeners:{
				change: function(th, newValue, oldValue, eOpts){
					if( newValue ){
						Ext.create('winCBA',{
							name: 'GeneraliCS.standard.history.view.History',
							maximizable: false,
							//closable: true,
							titolo: StdCba.traduci('HISTORY_MODIFICHE'),
							larghezzaWin: 845,
							altezzaWin: 630,
							clsWin:'cbaCssBordoPopup',
							configItem: {
								controller: me,
								idTe: me.testataSelezionata,
								filtriAttivi: formFiltri,
								cadute: true
							}
						}).showAt(CBA.parametriGenerali.cmpTbMenu.getWidth() * 0.5 - 800 * 0.5, 200);
					}
				}
			}
		});
		winFiltri.query('#SoloOperatoreLog')[0].hidden = true;
	},
	
	creaCampiDinamici: function(campo){
		var me = this;
		me.countCreazioneCampi = 0;
		
		if(me.tipoVideata == 'EventoAvverso'){
			campiCnt.push(me.getRadioModalitaCaduta(),me.getRadioTipoEvento());
			campiDom.push(100,90);
		}
		
		me.campiDinamici = [];
		if(campo){
			me.campiDinamici.push(
					{
						contenitore: campo,
						tipoCampo: 'checkboxstring',
						url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
						parametri: {
							codArea: 5,
							codDomanda: 50,
							idProfilo: me.idProfilo
						},
						nameTemp: '_tmp_contenzioneTipo_'
					}
				);
		}else{
			me.campiDinamici.push(
					{
						contenitore: me.lookupReference('CheckFarmaciAssunti'),
						tipoCampo: 'checkboxstring',
						url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
						parametri: {
							codArea: 5,
							codDomanda: 60,
							idProfilo: me.idProfilo
						},
						nameTemp: '_tmp_farmaciAssunti_'
					},
					{
						contenitore: me.lookupReference('CheckProvvedimenti'),
						tipoCampo: 'checkboxstring',
						url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
						parametri: {
							codArea: 5,
							codDomanda: 80,
							idProfilo: me.idProfilo
						},
						nameTemp: '_tmp_provv_'
					}
				);
		}
		if(me.campiDinamici.length > 0){
			Ext.suspendLayouts();
			me.campiDinamici.forEach(function(i){
				StdCba.genFieldsDinamiciCss(i.contenitore, i.tipoCampo, i.url, i.parametri,i.nameTemp ? i.nameTemp : false, i.listeners ? i.listeners : false, function(){
					me.countCreazioneCampi++;
					if(me.countCreazioneCampi == me.campiDinamici.length){
						Ext.resumeLayouts();
//						if(callbackFn)	callbackFn();
//						me.getForm().up('window').fireEvent('riposizionaWindow');
						me.aggiornamentoTestata = true;												
						me.aggiornaStore();
					}
				});
			});
		}
//		me.aggiornaDaTestata = true;
	},
	
	loadRisposte: function(){
		this.loadCbox(this.lookupReference('RadioLuogoCaduta').getStore(), 5, 20);
		this.loadCbox(this.lookupReference('RadioUsoAusili').getStore(), 5, 10);
		this.loadCbox(this.lookupReference('RadioAttSvolta').getStore(), 5, 40);
		this.loadCbox(this.lookupReference('SelectCalzatura').getStore(), 5, 30);
		this.loadCbox(this.lookupReference('RadioConseguenzeRipo').getStore(), 5, 70);
	},
	
	loadCbox: function(store, codArea, codDomanda){
		var params = {
			codArea: codArea,
			codDomanda: codDomanda,
			idProfilo: 1
		};
		store.load({
			params: params
		});
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		var form= this.lookupReference('Form');
		form.controller=this;
		this.primaVolta = 0;
		this.loadRisposte();
		//TODO_PLS parametri vitali??
//		/* inserisco la view relativa ai parametri */
//		this.lookupReference('CtnParametri').add(Ext.create('CS.parametri.view.GridParametri', {
//			cbaConfig: {
//				controllerMain: this
//			}
//		}));
		
//		if(me.cbaConfig.controllerTestata.cbaConfig.codVideata == 'Scheda eventi avversi'){
//			me.cbaConfig.tipoTestata = 'EventoAvverso';
//			me.tipoVideata = 'EventoAvverso';
//			me.getCntEventiAvversi().setHidden(false);
//		}else{
			this.cbaConfig.tipoTestata = 'Caduta';
			this.tipoVideata = 'Caduta';
//			me.getCntAddCampoEvAvversi().destroy();
//			me.getCntEventiAvversi().destroy();
//		}
		this.idProfilo = CBA.parametriGenerali.idProfiloCss ? CBA.parametriGenerali.idProfiloCss : 1; //profilo_css_sostituire
		this.idRicovero = this.cbaConfig.anagraficaCorrente.idRicovero;
		
		this.lookupReference('Sede').getStore().load();
		this.lookupReference('Reparto').getStore().load();
		this.lookupReference('Stanza').getStore().load();
		
		this.gestioneForm();
		this.aggiornaDaTestata = true;
		/*abilito pulsante annulla*/
		this.annullabile = true;
		this.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		this.permesso = this.cbaConfig.permesso;
		this.formDirty = false;
		/*
		 * La variabile sottostante � stata creata per i  campi dei box 'Utente portatore di',
		 * per evitare che vada in loop l'abilitazione/disabilitazione al change dei vari checkbox.
		 * 
		 */
		this.interazioneUtente = true;
		
//		me.recGridTestimoni = new Array();
//		me.recGridOperatori = new Array();
		this.cbaConfig.tipoConsegna = this.cbaConfig.tipoTestata == 'Caduta' ? 'U' : 'H';
		StdCba.cssCreaConsegna(this, this.cbaConfig.permesso);
		//TODO_PLS Convalida
		//StdCba.cssAbilitaConvalida(me);
		
	},
	
	destroy: function(){
	    this.callParent();
	}
});
