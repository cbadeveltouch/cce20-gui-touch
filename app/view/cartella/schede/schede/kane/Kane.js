
Ext.define('CS.schede.schede.kane.Kane',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.kane.KaneController'
    ],

    controller: 'cartella-schede-schede-kane-kane',
    
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
					scrollable: false,
					border:false,
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
							xtype: 'panel',
							itemId: 'FieldLeggenda', reference: 'FieldLeggenda',
							title: 'LEGENDA_KANE',
							cls: 'cbaPanelCollapsed',
							width: '100%',
							layout:{
								type: Ext.is.Phone ? 'vbox' : 'hbox',
								align: 'stretch'
							},
							collapsed: true,
							collapsible: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									flex:1,
									items:[
										{
											xtype:'label',
											cls:'cbaCssLabel',
											margin:'0 10 0 0',
											width:24,
											height:24,
											style:'font-weight:bold;border:1px solid  #518bbe;text-align:center;line-height: 25px;',
											html:'6'
										},
										{
											xtype:'label',
											cls:'cbaCssLabel',
											html:'SPESSO_TUTTIIGIORNI'
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									flex:1,
									items:[
										{
											xtype:'label',
											cls:'cbaCssLabel',
											margin:'0 10 0 0',
											width:24,
											height:24,
											style:'font-weight:bold;border:1px solid  #518bbe;text-align:center;line-height: 25px;',
											html:'3'
										},
										{
											xtype:'label',
											cls:'cbaCssLabel',
											html:'OCCASIONALMENTE'
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									flex:1,
									items:[
										{
											xtype:'label',
											cls:'cbaCssLabel',
											margin:'0 10 0 0',
											width:24,
											height:24,
											style:'font-weight:bold;border:1px solid  #518bbe;text-align:center;line-height: 25px;',
											html:'1'
										},
										{
											xtype:'label',
											cls:'cbaCssLabel',
											html:'RARAMENTE'
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									flex:1,
									items:[
										{
											xtype:'label',
											cls:'cbaCssLabel',
											margin:'0 10 0 0',
											width:24,
											height:24,
											style:'font-weight:bold;border:1px solid  #518bbe;text-align:center;line-height: 25px;',
											html:'0'
										},
										{
											xtype:'label',
											cls:'cbaCssLabel',
											html:'MAI'
										}
									]
								}
							]
						},
						{
							xtype:'container',
							itemId: 'Totali', reference: 'Totali',
							layout:{
								type: 'hbox',
								align: 'center'
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
									itemId:'TotCorretto',reference:'TotCorretto',
									style:'font-weight:bold',
											
								},
								{
									xtype:'label',
									cls:'cbaCssLabel',
									itemId:'DescrizionePunteggio',reference:'DescrizionePunteggio',
									style:'font-weight:bold',
											
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
							itemId:'TabPanel', reference:'TabPanel',
							cls: 'cbaTabParam',
							tabBarPosition: 'top',
							width: '100%',
							flex: 1,
							listeners:{
								beforeactiveItemchange: 'beforetabchangeTabPanel'
							},
							items:[
								{
								    title: 'TEST',
									itemId:'TabAndatura', reference:'TabAndatura',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true,
									items:[
										{
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											margin:'10 0 0 0',
											items:[
												{
													xtype:'container',
													layout:{
														type:'hbox',
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? '95%' : 600,
													padding: '3px',
													items:[
														{
															xtype:'label',
															itemId: 'LabelDescrDomanda', reference: 'LabelDescrDomanda',
															height:20,
															name:'descrizione',
															cls:'cbaCssLabelTitolo',
															margin:'0 0 0 8',
															width: '100%',
															cbahtml: 'KANE_DOMANDA1',
															listeners:{
																painted: function(th){
																	/*Identifico quando la string va a capo*/
																	if(th.innerHtmlElement.dom.clientHeight > 30)
																		th.setHeight(45)
																}
															}
														}	
													]
												},
												{
													xtype: 'selectfield',
													itemId:'SelectLettura',reference:'SelectLettura',
													cbahtml:'KANE_RISPOSTA1',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													name:'lettura',
													autoSelect: false,
													labelAlign: !Ext.is.Phone ? 'left' : 'placeholder',
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectlavoriAMano',reference:'SelectlavoriAMano',
													cbahtml:'KANE_RISPOSTA2',
													labelWrap: 'true',
													labelWidth: '75%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													width:'80%',
													name:'lavoriAMano',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectAnimazione',reference:'SelectAnimazione',
													cbahtml:'KANE_RISPOSTA3',
													labelWrap: 'true',
													labelWidth: '75%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													width:'80%',
													name:'animazione',
													listeners:{
														change: 'changeSelect'
													},
													autoSelect: false,
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectTelefono',reference:'SelectTelefono',
													cbahtml:'KANE_RISPOSTA4',
													labelWrap: 'true',
													labelWidth: '75%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													width:'80%',
													name:'telefonate',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectGiochi',reference:'SelectGiochi',
													cbahtml:'KANE_RISPOSTA5',
													labelWrap: 'true',
													labelWidth: '75%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													width:'80%',
													name:'giochiSocieta',
													autoSelect: false,listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectTelevisione',reference:'SelectTelevisione',
													cbahtml:'KANE_RISPOSTA6',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'segueLaTelevisione',
													listeners:{
														change: 'changeSelect'
													},
													autoSelect: false,
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'middle',
														pack:'end'
													},
													flex:1,
													height:50,
													margin:'5 10 0 0',
													items:[
														{
															xtype:'container',
															cls:'cbaCssPunteggioRisposta',
															layout:{
																type : 'hbox',
																align:'middle',
																pack:'center'
															},
															width:60,
															height:40,
															items:[
																{
																	xtype:'label',
																	style:'text-align:center',
																	itemId:'TotalePunteggioA',reference:'TotalePunteggioA'
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? '95%' : 600,
													padding: '3px',
													margin: '10 0 0 0',
													items:[
														{
															xtype:'label',
															itemId: 'LabelDescrDomanda', reference: 'LabelDescrDomanda',
															cbahtml: 'KANE_DOMANDA2',
															height:20,
															cls:'cbaCssLabelTitolo',
															margin:'0 0 0 8',
															width: '100%',
															listeners:{
																painted: function(th){
																	/*Identifico quando la string va a capo*/
																	if(th.innerHtmlElement.dom.clientHeight > 30)
																		th.setHeight(45)
																}
															}
														}	
													]
												},
												{
													xtype: 'selectfield',
													itemId:'SelectVisiteFamiliari',reference:'SelectVisiteFamiliari',
													cbahtml:'KANE_RISPOSTA7',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'visiteFamiliari',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectVisiteAmici',reference:'SelectVisiteAmici',
													cbahtml:'KANE_RISPOSTA8',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'visiteAmici',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectConversazione',reference:'SelectConversazione',
													cbahtml:'KANE_RISPOSTA9',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'conversa',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectIstituto',reference:'SelectIstituto',
													cbahtml:'KANE_RISPOSTA10',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'qualcunoIstitutoLegato',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectFuoriLegato',reference:'SelectFuoriLegato',
													cbahtml:'KANE_RISPOSTA11',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'qualcunoFuoriLegato',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'middle',
														pack:'end'
													},
													height:50,
													flex:1,
													margin:'5 10 0 0',
													items:[
														{
															xtype:'container',
															cls:'cbaCssPunteggioRisposta',
															layout:{
																type : 'hbox',
																align:'middle',
																pack:'center'
																
															},
															width:60,
															height:40,
															//flex:1,
															items:[
																{
																	xtype:'label',
																	style:'text-align:center',
																	itemId:'TotalePunteggioB',reference:'TotalePunteggioB'
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? '95%' : 600,
													padding: '3px',
													margin: '10 0 0 0',
													items:[
														{
															xtype:'label',
															itemId: 'LabelDescrDomanda', reference: 'LabelDescrDomanda',
															height:20,
															cbahtml: 'KANE_DOMANDA3',	
															cls:'cbaCssLabelTitolo',
															margin:'0 0 0 8',
															width: '100%',
															listeners:{
																painted: function(th){
																	/*Identifico quando la string va a capo*/
																	if(th.innerHtmlElement.dom.clientHeight > 30)
																		th.setHeight(45)
																}
															}
														}	
													]
												},
												{
													xtype: 'selectfield',
													itemId:'SelectUscito',reference:'SelectUscito',
													cbahtml:'KANE_RISPOSTA12',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'eUscito',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype: 'selectfield',
													itemId:'SelectOspitatoDormire',reference:'SelectOspitatoDormire',
													cbahtml:'KANE_RISPOSTA13',
													labelWrap: 'true',
													labelWidth: '75%',
													width:'80%',
													labelAlign: !Ext.is.Phone ? 'left' : 'top',
													name:'ospitatoDormire',
													autoSelect: false,
													listeners:{
														change: 'changeSelect'
													},
													options:[
														{
															text: '6',
															value: 6
														},
														{
															text: '3',
															value: 3
														},
														{
															text: '1',
															value: 1
														},
														{
															text: '0',
															value: 0
														}
													]	
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'middle',
														pack:'end'
													},
													flex:1,
													height:50,
													margin:'5 10 0 0',
													items:[
														{
															xtype:'container',
															cls:'cbaCssPunteggioRisposta',
															layout:{
																type : 'hbox',
																align:'middle',
																pack:'center'
																
															},
															width:60,
															height:40,
															items:[
																{
																	xtype:'label',
																	style:'text-align:center',
																	itemId:'TotalePunteggioC',reference:'TotalePunteggioC'
																}
															]
														}
													]
												},
												{
													xtype:'textareafield',
													nonObbligatorio :true,
													cls: 'cbaTextArea',
													label:'NOTE',
													labelAlign: 'top',
													itemId:'Note',reference:'Note',
													height:200,
													padding: '0 10 0 5',
													width: '90%',
													name:'note'
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
