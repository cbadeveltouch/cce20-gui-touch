
Ext.define('CS.schede.schede.spmsq.Spmsq',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.spmsq.SpmsqController',
        'CS.schede.schede.spmsq.SpmsqStore',
        'CbaCssView.store.schede.Frequenze'
    ],

    controller: 'cartella-schede-schede-spmsq-spmsq',
    
    items:[
    	{
			xtype:'container',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			height:'98%',
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
					border:false,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					scrollable: false,
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
							layout: 'fit',
							items:[
								{
									xtype:'container',
									itemId: 'Totali', reference: 'Totali',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									items:[
										{
											xtype:'container',
											layout:{
												type:'vbox',
												align:'stretch',
											},
											flex:1,
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
										}
									]
								},
								{
									xtype:'checkboxfield',
									cls:'cbaCssLabel',
									name:'nonSomministrabile',
									boxLabel:'Non somministrabile',
									itemId:'CheckNonSomministrabile',reference:'CheckNonSomministrabile',
									inputValue: true,
									listeners:{
										change: 'changeCheckNonSomministrabile'
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
									width:30,
									height:30
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
							flex: 1,
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
									flex: 1,
									width: '100%',
									scrollable: true,
									items:[
										{
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											width: '95%',
											items:[	
												{
													xtype:'container',
													itemId: 'CntCheck', reference: 'CntCheck',
													layout:{
														type:'vbox',
														align: 'stretch'
													},
													flex:1,
													items:[
														{
															xtype:'container',
															layout:{
																type:'hbox',
																align:'stretch'
															},
															cls: 'headerFormSchede',
															width: Ext.is.Phone ? 350 : 500,
															padding: '3px',
															items:[
																{
																	xtype:'label',
																	height:20,
																	cls:'cbaCssLabelTitolo',
																	margin:'0 0 0 8',
																	cbahtml: 'SPMSQ_TITOLO1',
																	width: '90%',
																	listeners:{
																		painted: function(th){
																			/*Identifico quando la string va a capo*/
																			if(th.innerHtmlElement.dom.clientHeight > 30)
																				th.setHeight(40)
																		}
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
															margin:'8 0 0 8',
															items:[
																{
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA1',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	labelCls: 'cbaLabelCheck',
																	name: 'mms1',
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA2',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms2',
																	inputValue: 1,
																	value: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA3', 
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms3',
																	inputValue: 1,
																	value: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA4', 
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms4', 
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA5',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms5',
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA6',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms6', 
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{	
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA7', 
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms7', 
																	value: 1,
																	inputValue:1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA8',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms8',
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA9',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms9',
																	value: 1,
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																},
																{ 
																	xtype: 'checkboxfield',
																	cbahtml: 'SPMSQ_RISPOSTA10',
																	labelAlign: 'right',
																	labelWidth: '92%',
																	labelWrap: true,
																	name: 'mms10',
																	value: '1',
																	inputValue: 1,
																	listeners:{
																		change: 'calcolaPunteggio'
																	}
																}
															]
														}
													]
												},
												{

													xtype:'container',
													itemId:'CntRegione',reference:'CntRegione',
													layout:{
														type:'vbox',
														align:'stretch'
													},
													flex:1,
													items:[
														{
															xtype:'label',
															margin:'15 0 0 8',
															cbahtml:'SPMSQ_RISPOSTA11'
														},
														{
															margin:'10 0 0 8',
															xtype:'textareafield',
															cls: 'cbaTextArea',
															title:'',
															itemId:'DescrizioneDomande',reference:'DescrizioneDomande',
															height:150,
															name:'desc1'
															
														},
														{
															margin:'8 0 0 8',
															xtype:'numberfield',
															name:'vCog1',
															labelClsExtra:'cbaCssLabel',
															maxValue:10,
															width:350,
															minValue:0,
															decimalPrecision: 0,
															label:'SPMSQ_RISPOSTA12'
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
													width: Ext.is.Phone ? 350 : 500,
													padding: '3px',
													items:[
														{
															xtype:'label',
															height:20,
															cls:'cbaCssLabelTitolo',
															margin:'0 0 0 8',
															html: 'SPMSQ_RISPOSTA13'
														}	
													]
												},
												{
													xtype:'container',
													layout:{
														type:'vbox',
														align:'stretch'
													},
													margin:'10 0 0 8',
													items:[
														{
															xtype:'label',
															margin:'10 0 0 8',
															cbahtml:'SPMSQ_RISPOSTA14'
														},
														{ 
															xtype:'radiofield',
															cbahtml: 'SPMSQ_RISPOSTA15',		
															labelAlign: 'right',
															labelWidth: '92%',
															labelWrap: true,
															name: 'certificatoProblComp',
															value: false,
															inputValue: false,
															cbaConfig: {
																deselezionabile: true
															},
														},
														{
															xtype:'radiofield',
															cbahtml: 'SPMSQ_RISPOSTA16',
															labelAlign: 'right',
															labelWidth: '92%',
															labelWrap: true,
															name: 'certificatoProblComp', 
															inputValue: 'M',
															value: 'M',
															cbaConfig: {
																deselezionabile: true
															},
														},
														{
															xtype:'radiofield',
															cbahtml: 'SPMSQ_RISPOSTA17',
															labelAlign: 'right',
															labelWidth: '92%',
															labelWrap: true,
															name: 'certificatoProblComp',
															inputValue: true,
															value: true,
															cbaConfig: {
																deselezionabile: true
															},
														},
														{
															xtype:'textareafield',
															cls: 'cbaTextArea',
//															margin:'10 0 0 8',
															title:'',
															height:150,
															name:'desc2'
														},
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align: 'stretch'
													},
													cls: 'headerFormSchede',
													width: Ext.is.Phone ? 350 : 500,
													padding: '3px',
													items:[
														{
															xtype:'label',
															height:20,
															width: '94%',
															cls:'cbaCssLabelTitolo',
															margin:'0 0 0 8',
															cbahtml: 'SPMSQ_RISPOSTA18',
															listeners:{
																painted: function(th){
																	/*Identifico quando la string va a capo*/
																	if(th.innerHtmlElement.dom.clientHeight > 30)
																		th.setHeight(43)
																}
															}
														}	
													]
												},
												{
													xtype:'label',
													margin:'8 0 0 8',
													cbahtml: 'SPMSQ_RISPOSTA19'
												},
												{
													xtype:'textareafield',
													cls: 'cbaTextArea',
													margin:'10 0 0 8',
													title:'',
													height:150,
													name:'desc3'
															
												},
												{
													margin:'10 0 0 8',
													xtype:'textareafield',
													cls: 'cbaTextArea',
													nonObbligatorio :true,
													label:'NOTE',
													labelAlign: 'top',
													itemId:'Note',reference:'Note',
													height: 150,
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
