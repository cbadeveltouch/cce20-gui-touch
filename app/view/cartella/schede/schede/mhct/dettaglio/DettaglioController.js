Ext.define('CS.schede.schede.mhct.dettaglio.DettaglioController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-schede-mhct-dettaglio-dettaglio',   
	
	calcolaPunteggio: function(punteggioTe, punteggio) {
		if(punteggioTe) {
			punteggioTe = punteggioTe - (Ext.isEmpty(this.punteggioDomanda) ? 0 : this.punteggioDomanda) + (Ext.isEmpty(punteggio) ? 0 : punteggio);
		} else {
			punteggioTe = Ext.isEmpty(punteggio) ? 0 : punteggio;
		}
		return punteggioTe;
	},
	
	aggiornaPunteggio: function(punteggio, sezione) {
		let ctrl = this.cbaConfig.controllerMain,
			punteggioTe = 0;
		
		switch (sezione) {
			case 1:
				ctrl.punteggioComportam = this.calcolaPunteggio(ctrl.punteggioComportam, punteggio);
				break;
			case 2:
				ctrl.punteggioMenomaz = this.calcolaPunteggio(ctrl.punteggioMenomaz, punteggio);
				break;
			case 3:
				ctrl.punteggioPsico = this.calcolaPunteggio(ctrl.punteggioPsico, punteggio);
				break;
			case 4:
				ctrl.punteggioSociale = this.calcolaPunteggio(ctrl.punteggioSociale, punteggio);
				break;
			case 5:
				ctrl.punteggioStorico = this.calcolaPunteggio(ctrl.punteggioStorico, punteggio);
				break;
			default:
				break;
		}
		
		ctrl.punteggioTotale = ctrl.punteggioComportam + ctrl.punteggioMenomaz + ctrl.punteggioPsico + ctrl.punteggioSociale + ctrl.punteggioStorico;
		this.punteggioDomanda = punteggio;
		
		if(ctrl)
			ctrl.aggiornaLabelPunteggio(ctrl, sezione);
	},
	
	 selectDom8: function(th, newValue) {
			if(newValue)
				this.aggiornaPunteggio(parseInt(newValue), 3);
			else
				this.aggiornaPunteggio(0, 3);
	},
	
	tapRisposta: function(e){
		e.preventDefault();
		var container = Ext.fly(e.currentTarget).component;
		var cntMain = this.cbaConfig.controllerMain;
		
		Ext.create('CS.schede.schedeModulari.domande.insert.DomandeInsert', {
			cbaConfig: {
				controllerMain: this.cbaConfig.controllerMain,
				dati: this.cbaConfig.dati.data,
				cntDomanda: container
			}
		}).show();
	},
	
	init: function() {
		var me = this;
		this.callParent(arguments);
		this.punteggioDomanda = 0;
		
		this.cbaConfig.controllerMain.cbaConfig.controllerDettaglio = this;
		
//		this.cbaConfig.dati.data.name === 'domanda8Risposta' ? this.lookupReference('TextfieldDomanda').isFormField(false) : this.lookupReference('TextfieldDomanda').isFormField(true);
		this.cbaConfig.dati.data.name ? this.lookupReference('TextfieldDomanda').setName(this.cbaConfig.dati.data.name) : null;
		this.cbaConfig.dati.data.descrDomanda ? this.lookupReference('LabelDescrizione').setHtml(StdCba.traduci(this.cbaConfig.dati.data.descrDomanda)) : null;
		
		Ext.suspendLayouts();
		
		let domanda8 = false;
		let item = me.cbaConfig.dati.data.risposte[me.cbaConfig.dati.data.risposta];
		if (this.cbaConfig.dati.data.ordine === 8) {
			
			if(!domanda8) {
				
				let dati = this.cbaConfig.dati.data;
				
				this.lookupReference('PanelRisposte').add(Ext.create('Ext.Container', {

					itemId: 'CntDomanda8', reference: 'CntDomanda8',
					punteggio: Ext.isDefined(item) ? item.punteggio : null,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					flex:1,
					width:'100%',
					items: [
						{
							  xtype: 'cbaMultipleChoice',
							  risposte8: true,
							  layout: {
								  type: 'vbox',
								  align: 'stretch'
							  },
							  style: 'border: none !important;',
							  flex: 1,
							  margin: '5 0 0 0',
							  cbaConfig: {
								   itemsCfg: [
										{
											cls: 'choice-round-unchecked-css-border2', 
											checkedClsPerson: 'choice-checked-css',
											label: StdCba.traduci(dati.risposte[0].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: '1',
											cbaInputValue:'1',
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css',
											label: StdCba.traduci(dati.risposte[1].testoRisp),
											cls: 'choice-round-unchecked-css-border2',
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 2,
											cbaInputValue: 2,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css',
											label: StdCba.traduci(dati.risposte[2].testoRisp),
											cls: 'choice-round-unchecked-css-border2',
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 3,
											cbaInputValue: 3,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											label: StdCba.traduci(dati.risposte[3].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 4,
											cbaInputValue: 4,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											label: StdCba.traduci(dati.risposte[4].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 5,
											cbaInputValue: 5,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											label: StdCba.traduci(dati.risposte[5].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 6,
											cbaInputValue: 6,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											label:StdCba.traduci( dati.risposte[6].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 7,
											cbaInputValue: 7,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										},
										{
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											label: StdCba.traduci(dati.risposte[7].testoRisp),
//											name: dati.name,
											isFormField: true,
											width: 25,
											height: 25,
											inputValue: 8,
											cbaInputValue: 8,
											layout: {
												type: 'vbox',
												align: 'center'
											}
										}
									],
									esclusivo: true,
									titoloLabel: dati.descrDomanda
							  },
							  onRender: function(){
								  if(!Ext.isEmpty(me.cbaConfig.dati.data.risposta))
									  this.setValueExclusive(me.cbaConfig.dati.data.risposta);
							  },
							  listeners: {
								  choicechange: (th, newValue, oldValue) => {
									  if(newValue) {
										  
										  let cnt = th.up('#CntDomanda8').query('#Choice8')[0],
										  		select = cnt.query('#SelecteDom8')[0],
										  		domanda = parseInt(newValue),
										  		marginTopMobile = domanda > 4 ?((domanda-1)*35).toString() : ((domanda-1)*28).toString(),
								  				marginTopTablet = ((domanda-1)*35).toString(),
						  						marginTop = Ext.is.Phone ? marginTopMobile : marginTopTablet,
										  		labelRisposta = me.lookupReference('TextfieldDomanda');
										  
										  cnt.setHidden(true); // nascondo il multipleChoice
										  select.setValue(cnt.punteggio);
										  
										  labelRisposta.setValue(domanda);
										  
										  Ext.suspendLayouts();
										  
										  
										  // sposto il cbaMultipleChoice all'altezza della risposta selezionata
										  cnt.setMargin(`${marginTop} 0 0 0`);
										  if(cnt._hidden)
											  cnt.setHidden(false);
										  
										  Ext.resumeLayouts(true);
									  }
								  }
							  }
						},
						{
							xtype: 'container',
							itemId: 'Choice8', reference: 'Choice8',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							maxHeight: 45,
							hidden: true,
							items:[
								{
									xtype: 'selectfield',
									itemId: 'SelecteDom8', reference: 'SelecteDom8',
									name: dati.risposte[0].subName,
									width: 50,
						            triggers: false,
									autoSelect: false,
									listeners:{
										change: 'selectDom8'
									},
									value: Ext.isEmpty(me.cbaConfig.dati.data.subRisposta) ? null : me.cbaConfig.dati.data.subRisposta, 
									options: [
										{
											 text: '1',
								             value: 1
										},
										{
											 text: '2',
								             value: 2
										},
										{
											 text:'3',
								             value: 3
										},
										{
											 text: '4',
								             value: 4
										},
										{
											 text: '5',
								             value: 5
										}
									]
								}
							]
						}
					]				
				}));
				
				domanda8 = true;
			}
			
			if(Ext.isDefined(item) && item.punteggio === this.cbaConfig.dati.data.subRisposta) {
				this.aggiornaPunteggio(this.cbaConfig.dati.data.subRisposta, this.cbaConfig.dati.data.sezione);
				this.lookupReference('PanelRisposte').query('#Choice8')[0].punteggio = this.cbaConfig.dati.data.subRisposta;
			}
			
		} else if(Ext.isEmpty(me.cbaConfig.dati.data.risposta)){
			var cntRisposte = Ext.create('Ext.Container', {
				cls: 'cbaCssRispostaSelezionata',
				padding:6,
				layout:{
					type:'hbox',
					align:'stretch'
				},
				flex:1,
				margin:'0 5 8 0',
				listeners:{	
					 element: 'element',
					 tap: 'tapRisposta'
				},
				items:[
					{
						xtype:'label',
						name:'descrizione',
						html: 'Selezionare per visualizzare risposte',
						flex: 1
					},
					{
						xtype:'container',
						 layout : {
							type : 'hbox',
							align:'center'
						},
						width:70,
						margin: '0 10 0 0',
						items:[
							{											
								xtype:'container',
								width:50,
								height:30,
								margin: '0 5 0 0',
								cls:'cbaCssPunteggioRisposta',
								html:'<p style="text-align:center;">'+ '0'+'</p>',
							}									
						]
					}
					
				]
			});
			
			me.lookupReference('PanelRisposte').add(cntRisposte);
			
		}else{
			/*Aggiungo valore al textfield per avere le risposte nella getValues per dirtyForm*/
			let textfield = me.lookupReference('TextfieldDomanda');
			textfield.setHtml(item.punteggio);
	//			item.punteggio == me.cbaConfig.dati.data.risposta ? textfield.setValue(item.punteggio) : null;
			var cntRisposte = Ext.create('Ext.Container', {
				punteggio: item.punteggio,
				tab: me.cbaConfig.dati.data.tab,
				sezione: this.cbaConfig.dati.data.sezione,
				cls: 'cbaCssRispostaSelezionata' ,
				padding:6,
				layout:{
					type:'hbox',
					align:'center'
				},
				flex:1,
				margin:'0 0 8 0',
				items:[
					{
						xtype:'label',
						html: StdCba.traduci(item.testoRisp),
						value: item.punteggio,
						flex:1
					},
					{
						xtype:'container',
						 layout : {
							type : 'hbox',
							align:'center'
						},
						width:60,
						items:[
							{											
								xtype:'container',
								width:50,
								height:30,
								cls:'cbaCssPunteggioRisposta',
								html:'<p style="text-align:center;">'+ item.punteggio+'</p>',
							}									
						]
					}
				]
			});
			if(item.punteggio == me.cbaConfig.dati.data.risposta){
				if(me.cbaConfig.dati.data.tab == 1){
					me.aggiornaPunteggio(item.punteggio,me.cbaConfig.dati.data.tab);
				}else 
					me.aggiornaPunteggio(item.punteggio,me.cbaConfig.dati.data.tab);
			}
			me.lookupReference('PanelRisposte').add(cntRisposte);	
			
		}
		
//		Ext.each(this.cbaConfig.dati.data.risposte, item => {
//			
//			this.lookupReference('PanelRisposte').controller = this;
//			
//			if (this.cbaConfig.dati.data.ordine === 8) {
//				
//				if(!domanda8) {
//					
//					let dati = this.cbaConfig.dati.data;
//					
//					this.lookupReference('PanelRisposte').add(Ext.create('Ext.Container', {
//
//						itemId: 'CntDomanda8', reference: 'CntDomanda8',
//						punteggio: item.punteggio,
//						layout: {
//							type: 'hbox',
//							align: 'stretch'
//						},
//						flex:1,
//						width:'100%',
//						items: [
//							{
//								xtype: 'container',
//								layout: {
//									type: 'vbox',
//									align: 'stretch'
//								},
//								maxWidth: 245,
//								flex:1,
//								items: [
//									{
//										  xtype: 'cbaMultipleChoice',
//										  risposte8: true,
//										  layout: {
//											  type: 'vbox',
//											  align: 'stretch'
//										  },
//										  style: 'border: none !important;',
//										  flex: 1,
//										  margin: '5 0 0 0',
//										  cbaConfig: {
//											   itemsCfg: [
//													{
//														cls: 'choice-round-unchecked-css-border2', 
//														checkedClsPerson: 'choice-checked-css',
//														label: StdCba.traduci(dati.risposte[0].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 1,
//														cbaInputValue: 1,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css',
//														label: StdCba.traduci(dati.risposte[1].testoRisp),
//														cls: 'choice-round-unchecked-css-border2',
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 2,
//														cbaInputValue: 2,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css',
//														label: StdCba.traduci(dati.risposte[2].testoRisp),
//														cls: 'choice-round-unchecked-css-border2',
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 3,
//														cbaInputValue: 3,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css', 
//														cls: 'choice-round-unchecked-css-border2',
//														label: StdCba.traduci(dati.risposte[3].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 4,
//														cbaInputValue: 4,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css', 
//														cls: 'choice-round-unchecked-css-border2',
//														label: StdCba.traduci(dati.risposte[4].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 5,
//														cbaInputValue: 5,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css', 
//														cls: 'choice-round-unchecked-css-border2',
//														label: StdCba.traduci(dati.risposte[5].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 6,
//														cbaInputValue: 6,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css', 
//														cls: 'choice-round-unchecked-css-border2',
//														label:StdCba.traduci( dati.risposte[6].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 7,
//														cbaInputValue: 7,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													},
//													{
//														checkedClsPerson: 'choice-checked-css', 
//														cls: 'choice-round-unchecked-css-border2',
//														label: StdCba.traduci(dati.risposte[7].testoRisp),
//														name: dati.name,
//														isFormField: true,
//														width: 25,
//														height: 25,
//														inputValue: 8,
//														cbaInputValue: 8,
//														layout: {
//															type: 'vbox',
//															align: 'center'
//														}
//													}
//												],
//												esclusivo: true,
//												titoloLabel: dati.descrDomanda
//										  },
//										  listeners: {
//											  choicechange: (th, newValue, oldValue) => {
//												  if(newValue) {
//													  
//													  let cnt = th.up('#CntDomanda8').query('#Choice8')[0],
//													  		select = cnt.query('#SelecteDom8')[0],
//													  		domanda = parseInt(newValue),
//													  		marginTopMobile = domanda > 4 ?((domanda-1)*35).toString() : ((domanda-1)*28).toString(),
//											  				marginTopTablet = ((domanda-1)*35).toString(),
//									  						marginTop = Ext.is.Phone ? marginTopMobile : marginTopTablet,
//													  		labelRisposta = this.lookupReference('CntCorpoDomanda').down('textfield');
//													  
//													  cnt.setHidden(true); // nascondo il multipleChoice
//													  select.setValue(cnt.punteggio);
//													  
//													  labelRisposta.setValue(domanda);
//													  
//													  Ext.suspendLayouts();
//													  
//													  
//													  // sposto il cbaMultipleChoice all'altezza della risposta selezionata
//													  cnt.setMargin(`${marginTop} 0 0 0`);
//													  if(cnt._hidden)
//														  cnt.setHidden(false);
//													  
//													  Ext.resumeLayouts(true);
//												  }
//											  }
//										  }
//									}
//								]
//							},
//							{
//								xtype: 'container',
//								itemId: 'Choice8', reference: 'Choice8',
//								layout: {
//									type: 'vbox',
//									align: 'stretch'
//								},
//								maxHeight: 45,
//								hidden: true,
//								items:[
//									{
//										xtype: 'selectfield',
//										itemId: 'SelecteDom8', reference: 'SelecteDom8',
//										name: dati.risposte[0].subName,
//										width: 50,
//							            triggers: false,
//										cls: 'cbaTextField',
//										autoSelect: false,
//										listeners:{
//											change: 'selectDom8'
//										},
//										options: [
//											{
//												 text: '1',
//									             value: 1
//											},
//											{
//												 text: '2',
//									             value: 2
//											},
//											{
//												 text:'3',
//									             value: 3
//											},
//											{
//												 text: '4',
//									             value: 4
//											},
//											{
//												 text: '5',
//									             value: 5
//											}
//										]
//									}
//								]
//							}
//						]				
//					}));
//					
//					domanda8 = true;
//				}
//				
//				if(item.punteggio === this.cbaConfig.dati.data.subRisposta) {
//					this.aggiornaPunteggio(this.cbaConfig.dati.data.subRisposta, this.cbaConfig.dati.data.sezione);
//					this.lookupReference('PanelRisposte').query('#Choice8')[0].punteggio = this.cbaConfig.dati.data.subRisposta;
//				}
//				
//			} else {
//				item.punteggio == me.cbaConfig.dati.data.risposta ? me.lookupReference('TextfieldDomanda').setValue(item.punteggio) : null;
//				let cntRisposte = Ext.create('Ext.Container', {
//					punteggio: item.punteggio,
//					sezione: this.cbaConfig.dati.data.sezione,
//					cls: (item.punteggio === this.cbaConfig.dati.data.risposta) ? 'cbaCssRispostaSelezionata' : '',
//					padding: 6,
//					layout: {
//						type: 'hbox',
//						align: 'center'
//					},
//					flex: 1,
//					margin: '0 0 8 0',
//					items: [
//					    {
//							xtype: 'container',
//							flex: 1,
//							items: [
//								{
//									xtype: 'label',
//									html: StdCba.traduci(item.testoRisp),
//								}
//							]							
//						},
//						{
//							xtype:'container',
//							 layout: {
//								type: 'hbox',
//								align:'center'
//							},
//							width: 50,
//							items: [
//								{											
//									xtype: 'container',
//									width: 50,
//									height: 30,
//									cls: 'cbaCssPunteggioRisposta',
//									html: '<p style="text-align:center;">'+ item.punteggio +'</p>',
//								}									
//							]
//						}
//					],
//					listeners: {
//						painted: th => {
//							th.el.on('tap', () => {
//								let cntMain = this.cbaConfig.controllerMain,
//									recTe = cntMain.recordTestata;
//								if( cntMain.lookupReference('Form').permesso == 'S'
//										&& ( !recTe || (recTe && !StdCba.cssHasBloccoModifica(recTe.get('tipoBlocco'))
//												|| cntMain.lookupReference('Form').getFields().id.getValue() < 0
//											) ) ){
//									this.gestioneSelezione(th, item.punteggio.toString());
//								}
//							});
//						}
//					}
//						
//				});
//				
//				if(item.punteggio === this.cbaConfig.dati.data.risposta) {
//					this.aggiornaPunteggio(item.punteggio, this.cbaConfig.dati.data.sezione);
//				}
//				this.lookupReference('PanelRisposte').add(cntRisposte);
//
//			}
//		});
		
		Ext.resumeLayouts(true);
	},
	
	destroy: function() {
	    this.callParent();
	}

});
