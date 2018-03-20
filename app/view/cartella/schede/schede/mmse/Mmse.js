
Ext.define('CS.schede.schede.mmse.Mmse',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.mmse.MmseController',
        'CS.schede.schede.mmse.MmseStore',
        'CbaCssView.store.schede.Frequenze',
        'CbaUtils.componenti.all.ControllerGenSchedeVal',
        'Generali.schede.grafico.TabAndamento'
    ],

    controller: 'cartella-schede-schede-mmse-mmse',

    items:[
    	{
			xtype:'container',
			cls:'cbaCssPnlPopup',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			flex:1,
			items:[
				{
					xtype: 'datefield',
					itemId: 'DataRegistrazione', reference: 'DataRegistrazione',
					hidden:true
				},
				{
					xtype:'CbaForm',
					itemId:'Form',reference:'Form',
					cls:'cbaCssForm',
					trackResetOnLoad: true,
					border:false,
					scrollable: false,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					flex:1,
					items:[
						{
							xtype: 'textfield',
							name:'id',
							hidden:true,	
						},
						{
							xtype: 'textfield',
							itemId: 'Agenda', reference: 'Agenda',
							name:'agenda',
							hidden:true
						},
						{
							xtype:'container',
							itemId: 'Totali', reference: 'Totali',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							items:[
								{
									xtype:'container',
									layout:{
										type: 'vbox',
										align: 'stretch'
									},
									items:[
										{
											xtype:'container',
											layout:{
												type: 'hbox',
												align: 'stretch'
											},
											margin: '0 0 5 0',
											items:[
												{
													xtype: 'label',
													html: 'TOTALE_PUNTEGGIO',
													cls:'cbaCssLabel',
													style:'font-weight:bold'
												},
												{
													xtype: 'label',
													html: ': ',
													style:'font-weight:bold'
												},
												{
													xtype: 'label',
													itemId:'TotTest',reference:'TotTest',
													cls:'cbaCssLabel',
													style:'font-weight:bold'
												}
											]
										},
										{
											xtype:'container',
											layout:{
												type: 'hbox',
												align: 'stretch'
											},
											width: '95%',
											items:[
												{
													xtype: 'label',
													cls:'cbaCssLabel',
													itemId:'TotCorretto',reference:'TotCorretto',
													style:'font-weight:bold',
													width: '100%'
												}
											]
										}
									]
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type: 'hbox',
								align: 'center'
							},
							items:[
								{
									xtype: 'label',
									cls:'cbaCssLabel',
									itemId:'DescrizionePunteggio',reference:'DescrizionePunteggio',
									style:'font-weight:bold'
								},
								{
									xtype:'checkboxfield',
									itemId: 'CheckNonSomministrabile',
									cls:'cbaCssLabel',
									labelAlign: 'right',
									labelWidth: 180,
									width: 200,
									name:'nonSomministrabile',
									//isFormField:false,
									label:'Non somministrabile',
									itemId:'CheckNonSomministrabile',reference:'CheckNonSomministrabile',
									inputValue: true,
									margin:'0 0 0 10',
									listeners:{
										initialize: function(th){
											/*Deve entrare prima nell'override*/
											th.on('change', function(th, newValue, oldValue){
												th.lookupController().changeNonSomministrabile(this, newValue, oldValue)
											})
										}
									}
								}
							]
						},
						{
							xtype:'container',
							itemId:'CntEdit',reference:'CntEdit',
							layout:{
								type: 'hbox',
								align: 'center'
							},
							hidden: true,
							items:[
								{
									xtype:'selectfield',
									itemId:'ComboValidita',reference:'ComboValidita',
									label:'VALIDITA',
									name:'scadenza',
									width: 140,
									/*altrimenti da problemi alla seconda apertura*/
									store: {
										type: 'frequenze'
									},
									labelClsExtra: 'cbaCssLabel',
									minChars:0,
									displayField: 'descFreq',
									queryMode: 'local',
									valueField: 'id',
									autoSelect: false,
									listeners:{
										change: 'changeScadenza'
									},
								},	   
								{	
									xtype: 'image',
									margin:'0 5 0 15',
									itemId:'ImgCalendario',reference:'ImgCalendario',
									width:34,
									height:34
								},
								{
									xtype: 'sliderfield',
									useTips: false,
									itemId:'FiltroAgenda', reference:'FiltroAgenda',
									width: 40,
									increment: 1,
									minValue: 0,
									maxValue: 1,
									name:'slider',
									margin: '0 5 0 5',
									fieldLabel: 'AGENDA',
									labelAlign: 'top',
									labelClsExtra: 'cbaCssLabel',
									labelSeparator: '',
									isFormField: false,
									listeners:{
										change: 'changeFiltroAgenda'
									}
								}
							]
						},
						{
							xtype:'tabpanel',
							flex:1,
							width: '100%',
							itemId:'TabPanel', reference:'TabPanel',
							cls: 'cbaTabParam',
							listeners:{
								beforeactiveItemchange: 'beforetabchangeTabPanel'
							},
							items:[
								{
								    title: 'TEST',
									itemId:'TabDatiDomande', reference:'TabDatiDomande',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true,
//									listeners:{
//										beforeactiveItemchange: 'beforetabchangeTabPanel'
//									},
									items:[
										{
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											layout:{
												type: 'vbox',
												align:'stretch'
											},
											items:[	
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'stretch'
													},
													cls: 'headerFormSchede',
													width: 300,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															cls:'cbaCssLabelTitolo',
															valore:0,
															margin:'0 0 0 8',
															html: 'MMSE_TITOLO1'				
														}
													
													]
												},
												{	
													xtype:'fieldset',
													itemId:'FieldOrientamento',reference:'FieldOrientamento',
													margin: '15 10 5 10',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													items:[
														{
															xtype:'selectfield',
															itemId:'ComboOrientamento',reference:'ComboOrientamento',
															cbahtml: 'MMSE_DOMANDA1',
															labelAlign: Ext.is.Phone ? 'top' : 'left',
															labelWrap: true,
															labelWidth: Ext.is.Phone ? null : '90%',
															name:'orientamento',
															autoSelect: false,
															listeners:{
																change: 'calcolaPunteggio'
															},
															options: [
																{
													                text: '0',
													                value: '0'
													            }, 
													            {
													                text: '1',
													                value: '1'
													            }, 
													            {
													                text: '2',
													                value: '2'
													            },
													            {
													                text: '3',
													                value: '3'
													            }, 
													            {
													                text: '4',
													                value: '4'
													            }, 
													            {
													                text: '5',
													                value: '5'
													            }
												            ]
														},
														{
															xtype:'selectfield',
															itemId:'ComboSpazio',reference:'ComboSpazio',
															name:'spazio',
															cbahtml: 'MMSE_DOMANDA2',
															labelAlign: Ext.is.Phone ? 'top' : 'left',
															labelWrap: true,
															labelWidth: Ext.is.Phone ? null : '90%',
															minChars:0,
															autoSelect: false,
															listeners:{
																change: 'calcolaPunteggio'
															},
															options: [
																{
													                text: '0',
													                value: '0'
													            }, 
													            {
													                text: '1',
													                value: '1'
													            }, 
													            {
													                text: '2',
													                value: '2'
													            },
													            {
													                text: '3',
													                value: '3'
													            }, 
													            {
													                text: '4',
													                value: '4'
													            }, 
													            {
													                text: '5',
													                value: '5'
													            }
												            ]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'stretch'
													},
													cls: 'headerFormSchede',
													width: 300,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															valore:1,
															cls:'cbaCssLabelTitolo',
															cbahtml: 'MMSE_TITOLO2'				
														}
													
													]
												},
												{
													xtype:'fieldset',
													itemId:'FieldMemoria',reference:'FieldMemoria',
													margin: '15 10 5 10',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															margin:'8 0 0 0',
															items:[
																{
																	xtype:'selectfield',
																	itemId:'ComboMemoria',reference:'ComboMemoria',
																	name:'memoria',
																	cbahtml: 'MMSE_DOMANDA3',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	autoSelect: false,
																	listeners:{
																		change: 'calcolaPunteggio'
																	},
																	options: [
																		{
															                text: '0',
															                value: '0'
															            }, 
															            {
															                text: '1',
															                value: '1'
															            }, 
															            {
															                text: '2',
															                value: '2'
															            },
															            {
															                text: '3',
															                value: '3'
															            }
														            ]
																},
																{
																	xtype:'numberfield',
																	itemId:'NumberTentativi',reference:'NumberTentativi',
																	margin:'0 0 0 5',
																	cbahtml: 'MMSE_DOMANDA4',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	maxValue: 6,
																	minValue: 1,
																	decimalPrecision: 0,
																	name:'memoriaTent',
																	label:'TENTATIVI'
																}
																
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'stretch'
													},
													cls: 'headerFormSchede',
													width: 300,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															valore:2,
															cls:'cbaCssLabelTitolo',
															cbahtml: 'MMSE_TITOLO3'				
														}
													
													]
												},
												{	
													xtype:'fieldset',
													itemId:'FieldAttenzione',reference:'FieldAttenzione',
													flex:1,
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 10 5 10',
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															flex:1,
															margin:'8 0 0 0',
															items:[
																{
																	xtype:'selectfield',
																	itemId:'ComboAttenzione',reference:'ComboAttenzione',
																	name:'attenzione',
																	cbahtml: 'MMSE_DOMANDA5',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	autoSelect: false,
																	listeners:{
																		change: 'calcolaPunteggio'
																	},
																	options: [
																		{
															                text: '0',
															                value: '0'
															            }, 
															            {
															                text: '1',
															                value: '1'
															            }, 
															            {
															                text: '2',
															                value: '2'
															            },
															            {
															                text: '3',
															                value: '3'
															            },
															            {
															                text: '4',
															                value: '4'
															            },
															            {
															                text: '5',
															                value: '5'
															            }
														            ]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'stretch'
													},
													cls: 'headerFormSchede',
													width: 300,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															cls:'cbaCssLabelTitolo',
															cbahtml: 'MMSE_TITOLO4',
															valore:3
														}
													
													]
												},
												{	
													xtype:'fieldset',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													flex:1,
													margin: '15 10 5 10',
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															flex:1,
															margin:'8 0 0 0',
															items:[
																{
																	xtype:'selectfield',
																	itemId:'ComboRichiamo',reference:'ComboRichiamo',
																	name:'richiamo',
																	cbahtml: 'MMSE_DOMANDA6',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	autoSelect: false,
																	listeners:{
																		change: 'calcolaPunteggio'
																	},
																	options: [
																		{
															                text: '0',
															                value: '0'
															            }, 
															            {
															                text: '1',
															                value: '1'
															            }, 
															            {
															                text: '2',
															                value: '2'
															            }
														            ]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'stretch'
													},
													cls: 'headerFormSchede',
													width: 300,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															cls:'cbaCssLabelTitolo',
															cbahtml: 'MMSE_TITOLO5',
															valore:4																	
														}
													
													]
												},
												{	
													xtype:'fieldset',
													flex:1,
													margin: '15 10 5 10',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															flex:1,
															margin:'8 0 0 0',
															items:[
																{
																	xtype:'selectfield',
																	itemId:'ComboLinguaggio',reference:'ComboLinguaggio',
																	name:'linguaggio',
																	cbahtml: 'MMSE_DOMANDA7',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	autoSelect: false,
																	listeners:{
																		change: 'calcolaPunteggio'
																	},
																	options: [
																		{
															                text: '0',
															                value: '0'
															            }, 
															            {
															                text: '1',
															                value: '1'
															            }, 
															            {
															                text: '2',
															                value: '2'
															            }
														            ]
																},
																{
																	xtype:'selectfield',
																	itemId:'ComboRipetizione',reference:'ComboRipetizione',
																	name:'ripetizione',
																	cbahtml: 'MMSE_DOMANDA8',
																	labelAlign: Ext.is.Phone ? 'top' : 'left',
																	labelWrap: true,
																	labelWidth: Ext.is.Phone ? null : '90%',
																	autoSelect: false,
																	listeners:{
																		change: 'calcolaPunteggio'
																	},
																	options: [
																		{
															                text: '0',
															                value: '0'
															            }, 
															            {
															                text: '1',
															                value: '1'
															            }, 
															            {
															                text: '2',
															                value: '2'
															            }
														            ]
																},
																{
																	xtype:'container',
																	layout:{
																		type:'vbox',
																		align:'stretch'
																	},
																	margin:'10 0 10 0',
																	items:[
																		{
																			xtype:'selectfield',
																			itemId:'ComboCompito',reference:'ComboCompito',
																			name:'compito',
																			cbahtml: 'MMSE_DOMANDA9',
																			labelAlign: Ext.is.Phone ? 'top' : 'left',
																			labelWrap: true,
																			labelWidth: Ext.is.Phone ? null : '90%',
																			autoSelect: false,
																			listeners:{
																				change: 'calcolaPunteggio'
																			},
																			options: [
																				{
																	                text: '0',
																	                value: '0'
																	            }, 
																	            {
																	                text: '1',
																	                value: '1'
																	            }, 
																	            {
																	                text: '2',
																	                value: '2'
																	            },
																	            {
																	                text: '3',
																	                value: '3'
																	            }
																            ]
																		}
																	]	
																},
																{
																	xtype:'container',
																	layout:{
																		type:'vbox',
																		align: 'stretch'
																	},
																	//flex:1,
																	items:[
																		{
																			xtype:'container',
																			layout:{
																				type:'vbox',
																				align:'stretch'
																			},
																			flex:1,
																			items:[
																				{
																					xtype:'selectfield',
																					itemId:'ComboOrdine',reference:'ComboOrdine',
																					cbahtml: 'MMSE_DOMANDA10',
																					labelAlign: Ext.is.Phone ? 'top' : 'left',
																					labelWrap: true,
																					labelWidth: Ext.is.Phone ? null : '90%',
																					autoSelect: false,
																					listeners:{
																						change: 'calcolaPunteggio'
																					},
																					options: [
																						{
																			                text: '0',
																			                value: '0'
																			            }, 
																			            {
																			                text: '1',
																			                value: '1'
																			            }
																		            ]
																				}
																			]
																		},
																		{
																			xtype:'container',
																			layout:{
																				type:'hbox',
																				align: 'stretch'
																			},
																			margin:'10 0 0 0',
																			flex:1,
																			items:[
																				{	
																					xtype:'button',
																					html:'VISUALIZZA_FOGLIO',
																					itemId:'BtnVisualizzaFoglio',reference:'BtnVisualizzaFoglio',
																					margin:'0 8 0 0 ',
																					listeners:{
																						tap: 'fullScreen'
																					}
																				}
																			
																			]
																		}
																		
																	]
																},
																{
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	items:[
																		{
																			xtype:'container',
																			flex:1,
																			layout:{
																				type:'vbox',
																				align:'stretch'
																			},
																			items:[
																				{
																					xtype:'selectfield',
																					itemId:'ComboFrase',reference:'ComboFrase',
																					name:'frase',
																					cbahtml: 'MMSE_DOMANDA11',
																					labelAlign: Ext.is.Phone ? 'top' : 'left',
																					labelWrap: true,
																					labelWidth: Ext.is.Phone ? null : '90%',
																					autoSelect: false,
																					listeners:{
																						change: 'calcolaPunteggio'
																					},
																					options: [
																						{
																			                text: '0',
																			                value: '0'
																			            }, 
																			            {
																			                text: '1',
																			                value: '1'
																			            }
																		            ]
																				}
																			]
																		}
																	]
																},
																{
																	xtype:'container',
																	layout:{
																		type:'vbox',
																		align: 'stretch'
																	},
																	items:[
																		{
																			xtype:'container',
																			layout:{
																				type:'vbox',
																				align:'stretch'
																			},
																			flex:1,
																			items:[
																				{
																					xtype:'selectfield',
																					itemId:'ComboCopiaDisegno',reference:'ComboCopiaDisegno',
																					name:'copiaDisegno',
																					cbahtml: 'MMSE_DOMANDA12',
																					labelAlign: Ext.is.Phone ? 'top' : 'left',
																					labelWrap: true,
																					labelWidth: Ext.is.Phone ? null : '90%',
																					autoSelect: false,
																					listeners:{
																						change: 'calcolaPunteggio'
																					},
																					options: [
																						{
																			                text: '0',
																			                value: '0'
																			            }, 
																			            {
																			                text: '1',
																			                value: '1'
																			            }
																		            ]
																				}
																			]
																		},
																		{
																		
																			xtype:'container',
																			layout:{
																				type:'vbox',
																				align: 'stretch'
																			},
																			margin:'0 0 20 0',
																			flex:1,
																			items:[
																				{
																					xtype:'image',
																					src:'resources/images/skval/MMSE.png',
																					itemId:'ImgMMse',reference:'ImgMMse',
																					width:257,
																					height:166,
																				},
																				{
																					xtype:'container',
																					layout:{
																						type:'hbox',
																						align: 'stretch'
																					},
																					items:[
//																						{
//																							xtype:'button',
//																							text:'STAMPA_IMMAGINE',
//																							itemId:'BtnStampaDisegno',reference:'BtnStampaDisegno',
//																						},
																						{
																							xtype:'button',
																							margin:'0 0 0 5',
																							itemId:'BtnDisegna',reference:'BtnDisegna',
																							text:'DISEGNA_IMMAGINE',
																							listeners:{
																								tap: 'disegna'
																							}
																						},
																						{
																							xtype:'button',
																							nonDisabilitare:true,
																							margin:'0 0 0 5',
																							itemId:'BtnVisualizzaDisegno',reference:'BtnVisualizzaDisegno',
																							text:'VISUALIZZA_IMMAGINE',
																							listeners:{
																							 	tap: 'calcolaIdAllegato'
																							}
																						}
																						
																					
																					]
																				}
																			]
																		}
																	]	
																}																			
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'vbox',
														align:'stretch'
													},
													itemId:'CntNote',reference:'CntNote',
													padding:10,
													items:[
														{
															xtype:'textareafield',
															nonObbligatorio :true,
															cls: 'cbaTextArea',
															labelAlign: 'top',
															label:'NOTE',
															itemId:'Note',reference:'Note',
															height:200,
															name:'note'
														}
													]
												},													
											]	
										}
									]	
								}
							]
						}
					]
				}						
			]
		
    	}
    ]
});
