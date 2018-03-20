
Ext.define('CS.schede.schede.nortonexton.NortonExton',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.nortonexton.NortonExtonController',
        'CbaCssView.store.schede.Frequenze',
        'Generali.schede.grafico.TabAndamento'
    ],

    controller: 'cartella-schede-schede-nortonexton-nortonexton',

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
					xtype:'CbaForm',
					itemId:'Form',reference:'Form',
					cls:'cbaCssForm',
//					trackResetOnLoad: true, da problemi con il setValues nel clearForm per i multipleChoice
					border:false,
					scrollable: false,
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
									style:'font-weight:bold'
								},
								{
									xtype:'label',
									cls:'cbaCssLabel',
									itemId:'LblPunteggioVpia',reference:'LblPunteggioVpia',
									style:'font-weight:bold'
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
							cls: 'cbaTabParam',
							flex:1,
							itemId:'TabPanel', reference:'TabPanel',
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
									width: '100%',
									scrollable: true,
									items:[
										{
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											margin:'5 0 5 0',
											width: '95%',
											items:[	
												{
													xtype:'container',
													layout:{
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex:1,
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															flex:1,
															margin: Ext.is.Phone ? '8 0 0 0' : '8 10 0 0',
															items:[
																{
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	cls: 'headerFormSchede',
																	padding:4,
																	margin: '0 0 5 0',
																	width: 300,
																	items:[
																		{	
																			xtype:'label',
																			width:300,
																			height:20,
																			cls:'cbaCssLabelTitolo',
																			margin:'0 0 0 8',
																			html: 'NORTON_EXTON_TITOLO1'				
																		},
																	]
																},
																{
																	xtype: 'cbaMultipleChoice',
																	itemId: 'RadioCondGenerali', reference: 'RadioCondGenerali',
																	layout: {
																		type: 'vbox',
																		align: 'stretch',
																		
																	},
																	style: 'border: none !important',
																	//flex: 1,
																	margin: '0 0 0 0',
																	listeners:{
																		choicechange: 'calcolaPunteggio'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: '4',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'condGenerali', 
																					isFormField: true,
																					inputValue: '4',
																					cbaInputValue: '4',
																					label:'NORTON_EXTON_RISPOSTA1'
																				},
																				{    
																					html: '3',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'condGenerali',
																					isFormField: true,
																					inputValue: '3',
																					cbaInputValue: '3',
																					label:'NORTON_EXTON_RISPOSTA2'
																				},
																				{    
																					html: '2',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'condGenerali',
																					isFormField: true,
																					inputValue: '2',
																					cbaInputValue: '2',
																					label:'NORTON_EXTON_RISPOSTA3'
																				},
																				{    
																					html: '1',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'condGenerali',
																					isFormField: true,
																					inputValue: '1',
																					cbaInputValue: '1',
																					label:'NORTON_EXTON_RISPOSTA4'
																				},
																				
																			],
																		   esclusivo: true  
																	}
																}
																
															]
														},
														{	
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															flex:1,
															margin: Ext.is.Phone ? '8 0 0 0' : '8 10 0 0',
															items:[
																{
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	cls: 'headerFormSchede',
																	padding:4,
																	width: 300,
																	margin: '0 0 5 0',
																	items:[
																		{	
																			xtype:'label',
																			width:300,
																			height:20,
																			cls:'cbaCssLabelTitolo',
																			margin:'0 0 0 8',
																			html: 'NORTON_EXTON_TITOLO2'				
																		},
																	]
																},
																{
																	xtype: 'cbaMultipleChoice',
																	itemId: 'RadioCapMuoversi', reference: 'RadioCapMuoversi',
																	layout: {
																		type: 'vbox',
																		//pack: 'start'
																	},
																	style: 'border: none !important',
																	//flex: 1,
																	margin: '0 0 0 0',
																	listeners:{
																		choicechange: 'calcolaPunteggio'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: '4',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'capMuoversi', 
																					isFormField: true,
																					inputValue: '4',
																					cbaInputValue: '4',
																					label:'NORTON_EXTON_RISPOSTA5'
																				},
																				{    
																					html: '3',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capMuoversi',
																					isFormField: true,
																					inputValue: '3',
																					cbaInputValue: '3',
																					label:'NORTON_EXTON_RISPOSTA6'
																					  
																				},
																				{    
																					html: '2',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capMuoversi',
																					isFormField: true,
																					inputValue: '2',
																					cbaInputValue: '2',
																					label:'NORTON_EXTON_RISPOSTA7'
																				},
																				{    
																					html: '1',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capMuoversi',
																					isFormField: true,
																					inputValue: '1',
																					cbaInputValue: '1',
																					label:'NORTON_EXTON_RISPOSTA8'
																				},
																				
																			],
																		   esclusivo: true  
																	}
																}
															]
														},
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
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	cls: 'headerFormSchede', 
																	width: 300,
																	padding:4,
																	margin: '0 0 5 0',
																	items:[
																		{	
																			xtype:'label',
																			width:300,
																			height:20,
																			cls:'cbaCssLabelTitolo',
																			margin:'0 0 0 8',
																			html: 'NORTON_EXTON_TITOLO3'				
																		},
																	]
																},
																{
																	xtype: 'cbaMultipleChoice',
																	itemId: 'RadioStatoMentale', reference: 'RadioStatoMentale',
																	layout: {
																		type: 'vbox'
																	},
																	style: 'border: none !important',
																	//flex: 1,
																	margin: '0 0 0 0',
																	listeners:{
																		choicechange: 'calcolaPunteggio'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: '4',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'statoMentale', 
																					isFormField: true,
																					inputValue: '4',
																					cbaInputValue: '4',
																					label:'NORTON_EXTON_RISPOSTA9'
																				},
																				{    
																					html: '3',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'statoMentale',
																					isFormField: true,
																					inputValue: '3',
																					cbaInputValue: '3',
																					label:'NORTON_EXTON_RISPOSTA10'
																					  
																				},
																				{    
																					html: '2',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'statoMentale',
																					isFormField: true,
																					inputValue: '2',
																					cbaInputValue: '2',
																					label:'NORTON_EXTON_RISPOSTA11'
																				},
																				{    
																					html: '1',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'statoMentale',
																					isFormField: true,
																					inputValue: '1',
																					cbaInputValue: '1',
																					label:'NORTON_EXTON_RISPOSTA12'
																				},
																				
																			],
																		   esclusivo: true  
																	}
																}
															]
														}																
													]
												},
												{
													xtype:'container',
													margin:'10 0 0 0',
													layout:{
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: Ext.is.Phone ? 'stretch' : 'center',
														pack: Ext.is.Phone ? null : 'center'
													},
													flex:1,
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															margin: Ext.is.Phone ? '8 0 0 0' : '8 10 0 0',
															width:300,
															items:[
																{
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	cls: 'headerFormSchede',
																	padding:4,
																	width: 300,
																	margin: '0 0 5 0',
																	items:[
																		{	
																			xtype:'label',
																			width:300,
																			height:20,
																			cls:'cbaCssLabelTitolo',
																			margin:'0 0 0 8',
																			html: 'NORTON_EXTON_TITOLO4'				
																		},
																	]
																},
																{
																	xtype: 'cbaMultipleChoice',
																	itemId: 'RadioIncontinenza', reference: 'RadioIncontinenza',
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	style: 'border: none !important',
																	//flex: 1,
																	listeners:{
																		choicechange: 'calcolaPunteggio'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: '4',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'incontinenza', 
																					isFormField: true,
																					inputValue: '4',
																					cbaInputValue: '4',
																					label:'NORTON_EXTON_RISPOSTA13'
																				},
																				{    
																					html: '3',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'incontinenza',
																					isFormField: true,
																					inputValue: '3',
																					cbaInputValue: '3',
																					label:'NORTON_EXTON_RISPOSTA14'
																					  
																				},
																				{    
																					html: '2',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'incontinenza',
																					isFormField: true,
																					inputValue: '2',
																					cbaInputValue: '2',
																					label:'NORTON_EXTON_RISPOSTA15'
																				},
																				{    
																					html: '1',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'incontinenza',
																					isFormField: true,
																					inputValue: '1',
																					cbaInputValue: '1',
																					label:'NORTON_EXTON_RISPOSTA16'
																				},
																				
																			],
																		   esclusivo: true  
																	}
																}
															]
														},
														{	
													
															xtype:'container',
															layout:{
																type:'vbox',
																align:'stretch'
															},
															//flex:1,
															width:320,
															margin:'8 0 0 0',
															items:[
																{
																	xtype:'container',
																	layout:{
																		type:'hbox',
																		align: 'stretch'
																	},
																	cls: 'headerFormSchede',
																	padding:4,
																	width: 300,
																	margin: '0 0 5 0',
																	items:[
																		{	
																			xtype:'label',
																			height:20,
																			cls:'cbaCssLabelTitolo',
																			margin:'0 0 0 8',
																			html: 'NORTON_EXTON_TITOLO5'				
																		},
																	]
																},
																{
																	xtype: 'cbaMultipleChoice',
																	itemId: 'RadioCapCamminare', reference: 'RadioCapCamminare',
																	layout: {
																		type: 'vbox'
																	},
																	style: 'border: none !important',
																	//flex: 1,
																	margin: '0 0 0 0',
																	listeners:{
																		choicechange: 'calcolaPunteggio'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: '4',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'capCamminare', 
																					isFormField: true,
																					inputValue: '4',
																					cbaInputValue: '4',
																					label:'NORTON_EXTON_RISPOSTA17'
																				},
																				{    
																					html: '3',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capCamminare',
																					isFormField: true,
																					inputValue: '3',
																					cbaInputValue: '3',
																					label:'NORTON_EXTON_RISPOSTA18'
																					  
																				},
																				{    
																					html: '2',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capCamminare',
																					isFormField: true,
																					inputValue: '2',
																					cbaInputValue: '2',
																					label:'NORTON_EXTON_RISPOSTA19'
																				},
																				{    
																					html: '1',
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'capCamminare',
																					isFormField: true,
																					inputValue: '1',
																					cbaInputValue: '1',
																					label:'NORTON_EXTON_RISPOSTA20'
																				},
																				
																			],
																		   esclusivo: true  
																	}
																}
															]
														}														
													]
												},
												{
													xtype:'container',
													margin:'20 0 0 5',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													flex:1,
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align: 'stretch'
															},
															cls: 'headerFormSchede',
															width:300,
															padding:4,
															margin: '0 0 5 0',
															items:[
																{	
																	xtype:'label',
																	height:20,
																	cls:'cbaCssLabelTitolo',
																	margin:'0 0 0 8',
																	html: 'NORTON_EXTON_TITOLO7'				
																},
															]
														},
														{
															xtype: 'panel',
															itemId:'FieldEsami',reference:'FieldEsami',
															layout:{
																type: Ext.is.Phone ? 'vbox' : 'hbox'
															},
															width:600,
															margin: '10 10 0 0',
															items: [
																{
																	xtype:'container',
																	layout:{
																		type:'vbox',
																		align: 'stretch'
																	},
																	flex:1,
																	items:[
																		{
																			xtype:'checkboxfield',
																			itemId:'CheckEsami1',reference:'CheckEsami1',
																			boxLabel: 'NORTON_EXTON_RISPOSTA25',
																			name: 'diabete',
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA26',
																			itemId:'CheckEsami2',reference:'CheckEsami2',
																			name: 'ipertensione',
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{
																			xtype:'label',
																			html:'Ematocrito Basso:'
																		},
																		{ 
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA27', 
																			itemId:'CheckEsami3',reference:'CheckEsami3',
																			name: 'ematocritoMaschi',
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA28', 
																			itemId:'CheckEsami4',reference:'CheckEsami4',
																			name: 'ematocritoFemmine', 
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																	]
																},
																{
																	xtype:'container',
																	layout:{
																		type:'vbox',
																		align: 'stretch'
																	},
																	width: 300,
																	flex:1,
																	items:[
																		{ 
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA29',
																			itemId:'CheckEsami5',reference:'CheckEsami5',
																			name: 'albuminetemia',
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{ 
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA30',
																			itemId:'CheckEsami6',reference:'CheckEsami6',
																			name: 'tempCorporea', 
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{
																			xtype:'checkboxfield',
																			boxLabel: 'NORTON_EXTON_RISPOSTA31', 
																			itemId:'CheckEsami7',reference:'CheckEsami7',
																			name: 'uso5Farmaci', 
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
																		{ 
																			xtype:'checkboxfield',
																			cbahtml: 'NORTON_EXTON_RISPOSTA32',
																			labelAlign: 'right',
																			labelWidth: '92%',
																			labelWrap: true,
																			itemId:'CheckEsami8',reference:'CheckEsami8',
																			name: 'modStatoMentale',
																			inputValue: true,
																			listeners:{
																				change: 'sottraiPunteggio'
																			}
																		},
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
													flex:1,
													itemId:'CntRischioDec',reference:'CntRischioDec',
													margin:'8 0 0 0',
													items:[
														{
															xtype:'container',
															layout:{
																type:'vbox',
																align: 'stretch'
															},
															width:300,
															cls: 'headerFormSchede',
															padding:4,
															margin: '0 0 5 0',
															items:[
																{	
																	xtype:'label',
																	height:20,
																	cls:'cbaCssLabelTitolo',
																	margin:'0 0 0 8',
																	html: 'NORTON_EXTON_TITOLO8'				
																}
															]
														},
														{
															xtype: 'cbaMultipleChoice',
															itemId: 'RadioRischioDec', reference: 'RadioRischioDec',
															layout: {
																type: 'vbox',
																align:'stretch'
															},
															style: 'border: none !important',
															listeners:{
																choicechange: 'calcolaPunteggio'
															},
															cbaConfig: {
																itemsCfg: [
																		{
																			html: '0',
																			layout: {
																				type: 'vbox',
																				align: 'center'
																			},
																			margin: Ext.is.Phone ? '0 0 0 0' : null,
																			cls: 'choice-round-unchecked-css-border2', 
																			checkedClsPerson: 'choice-checked-css',
																			name: 'rischioDec', 
																			isFormField: true,
																			inputValue: '0',
																			cbaInputValue: '0',
																			label:'NORTON_EXTON_RISPOSTA21'
																		},
																		{    
																			html: '10',
																			layout: {
																				type: 'vbox',
																				align: 'center'
																			},
																			margin: Ext.is.Phone ? '10 0 0 0' : null,
																			checkedClsPerson: 'choice-checked-css', 
																			cls: 'choice-round-unchecked-css-border2',
																			style: 'padding-left: 3px !important;',
																			name: 'rischioDec',
																			isFormField: true,
																			inputValue: '10',
																			cbaInputValue: '10',
																			label:'NORTON_EXTON_RISPOSTA22'
																			  
																		},
																		{    
																			html: '15',
																			layout: {
																				type: 'vbox',
																				align: 'center'
																			},
																			margin: Ext.is.Phone ? '10 0 0 0' : null,
																			checkedClsPerson: 'choice-checked-css', 
																			style: 'padding-left: 3px !important;',
																			cls: 'choice-round-unchecked-css-border2',
																			name: 'rischioDec',
																			isFormField: true,
																			inputValue: '15',
																			cbaInputValue: '15',
																			label:'NORTON_EXTON_RISPOSTA23'
																		},
																		{    
																			html: '25',
																			layout: {
																				type: 'vbox',
																				align: 'center'
																			},
																			margin: Ext.is.Phone ? '10 0 0 0' : null,
																			checkedClsPerson: 'choice-checked-css', 
																			style: 'padding-left: 3px !important;',
																			cls: 'choice-round-unchecked-css-border2',
																			name: 'rischioDec',
																			isFormField: true,
																			inputValue: '25',
																			cbaInputValue: '25',
																			label:'NORTON_EXTON_RISPOSTA24'
																		},
																		
																	],
																   esclusivo: true  
															}
														}										
													]
												},
												{
													xtype:'textareafield',
													itemId:'CntNote',reference:'CntNote',
													cls: 'cbaTextArea',
													labelAlign: 'top',
													label:'NOTE',
													itemId:'Note',reference:'Note',
													height:200,
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
