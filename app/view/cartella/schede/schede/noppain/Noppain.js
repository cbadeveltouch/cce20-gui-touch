
Ext.define('CS.schede.schede.noppain.Noppain',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.noppain.NoppainController',
        'CbaCssView.store.schede.Frequenze'
    ],

    controller: 'cartella-schede-schede-noppain-noppain',
    
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
					xtype:'tabpanel',
					cls: 'cbaTabParam',
					flex:1,
					itemId:'TabPanel', reference:'TabPanel',
					listeners:{
						beforeactiveItemchange: 'beforetabchangeTabPanel'
					},
					items:[
						{	
							title: 'TEST',
							itemId:'TabTest',reference:'TabTest',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							flex:1,
							items:[
								{
									xtype:'CbaForm',
									itemId:'Form',reference:'Form',
									cls:'cbaCssForm',
									trackResetOnLoad: true,
									border:false,
									layout:{
										type:'vbox',
										align:'stretch'
									},
									scrollable: true,
									flex:1,
									items:[
										{
											xtype: 'textfield',
											name:'id',
											hidden:true,	
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
													xtype:'label',
													cls:'cbaCssLabel',
													itemId:'TotTest',reference:'TotTest',
													style:'font-weight:bold',
															
												},
												{
													xtype:'label',
													cls:'cbaCssLabel',
													itemId:'LblPunteggioVpia',reference:'LblPunteggioVpia',
													style:'font-weight:bold',
															
												}
											]
										},
										{
											xtype:'selectfield',
											itemId:'ComboValidita',reference:'ComboValidita',
											label:'VALIDITA',
											name:'scadenza',
											width: '90%',
											width: 250,
											labelWidth: 80,
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
											hidden: true
										},
										{
										
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											layout:{
												type:'vbox',
												align:'stretch'
											},
//											flex:1,
											items:[	
												{
													xtype:'label',
													cbahtml:'NOPPAIN_TITOLO1'
												},
												{
													xtype:'label',
													cbahtml:'NOPPAIN_TITOLO2'
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA1',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectAS',reference:'SelectAS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'as',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectAR',reference:'SelectAR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'ar',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{

													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA2',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectBS',reference:'SelectBS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'bs',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectBR',reference:'SelectBR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'br',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA3',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectCS',reference:'SelectCS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'cs',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectCR',reference:'SelectCR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'cr',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA4',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectDS',reference:'SelectDS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'ds',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectDR',reference:'SelectDR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'dr',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA5',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectES',reference:'SelectES',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'es',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectER',reference:'SelectER',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'er',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA6',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectFS',reference:'SelectFS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'fs',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectFR',reference:'SelectFR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'fr',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{

													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA7',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectGS',reference:'SelectGS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'gs',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectGR',reference:'SelectGR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'gr',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{

													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA8',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectHS',reference:'SelectHS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'hs',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectHR',reference:'SelectHR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'hr',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{
													xtype: 'container',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_DOMANDA9',
															cls: 'labelStrong'
														},
														{
															xtype: 'container',
															layout:{
																type: 'vbox',
																align: 'stretch'
															},
															margin: '5 0 0 10',
															items:[
																{
																	xtype: 'selectfield',
																	itemId:'SelectIS',reference:'SelectIS',
																	cbahtml:'SVOLTO_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'is',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																},
																{
																	xtype: 'selectfield',
																	itemId:'SelectIR',reference:'SelectIR',
																	cbahtml:'DOLORE_ATTIVITA',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'ir',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
																		}
																	]	
																}
															]
														}
													]
												},
												{
													xtype: 'selectfield',
													cbahtml:'NOPPAIN_DOMANDA10',
													labelAlign: 'top',
													labelCls : 'labelStrong',
													name:'senteDolore',
													autoSelect: false,
//													listeners:{
//														change: 'changeSelect'
//													},
													options:[
														{
															text: 'Si',
															value: true
														},
														{
															text: 'No',
															value: false
														}
													]	
												},
												{
													xtype: 'selectfield',
													cbahtml:'NOPPAIN_DOMANDA11',
													labelAlign: 'top',
													labelCls : 'labelStrong',
													name:'faccioMale',
													autoSelect: false,
//													listeners:{
//														change: 'changeSelect'
//													},
													options:[
														{
															text: 'Si',
															value: true
														},
														{
															text: 'No',
															value: false
														}
													]	
												},
												{
													xtype: 'container',
													layout: {
														type: 'vbox',
														align:'stretch'
													},
													margin: '15 0 0 0',
													items:[
														{
															xtype:'label',
															cbahtml:'NOPPAIN_TITOLO3',
															cls:'cbaCssLabelTitolo'
														},
														{
															xtype:'container',
															margin:'10 0 0 10',
															itemId:'CntRispostaDolore',reference:'CntRispostaDolore',
															items:[
																{
																	xtype:'label',
																	cbahtml: 'NOPPAIN_DOMANDA12',
																	cls: 'labelStrong'
																},
																{
																	xtype: 'selectfield',
																	itemId: 'Ind1', reference:'Ind1',
																	cbahtml:'NOPPAIN_DOMANDA10',
																	labelWrap: 'true',
																	labelWidth: '65%',
																	width:'85%',
																	name:'ind1',
																	autoSelect: false,
//																	listeners:{
//																		change: 'changeSelect'
//																	},
																	options:[
																		{
																			text: 'Si',
																			value: true
																		},
																		{
																			text: 'No',
																			value: false
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
				}
			]
		}
	]
});
