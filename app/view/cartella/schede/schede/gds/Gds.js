
Ext.define('CS.schede.schede.gds.Gds',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.gds.GdsController'
    ],

    controller: 'cartella-schede-schede-gds-gds',
    
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
							itemId: 'Totali', reference: 'Totali',
							layout:{
								type: 'hbox',
								align: 'center'
							},
							items:[
								{
									xtype:'label',
									cls:'cbaCssLabel',
									cbahtml: 'PUNTEGGIO:',
									itemId:'TotTest',reference:'TotTest',
									style:'font-weight:bold',
									maxWidth:400
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
									itemId:'Test', reference:'Test',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true,
									items:[
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											items: [
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA1',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest1',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest1',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA1'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA2',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest2',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest2',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA2'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA3',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest3',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest3',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA3'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA4',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest4',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest4',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA4'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA5',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest5',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest5',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA5'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA6',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest6',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest6',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA6'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA7',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest7',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest7',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA7'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													margin: '5 0 5 0',
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA8',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest8',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest8',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA8'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA9',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest9',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest9',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA9'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA10',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															margin: '5 0 5 0',
															style: 'border: none !important;',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest10',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest10',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA10'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA11',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest11',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest11',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA11'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA12',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest12',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest12',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA12'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA13',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest13',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest13',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA13'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA14',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',															
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest14',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest14',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA14'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA15',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest15',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest15',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA15'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA16',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest16',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest16',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA16'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA17',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest17',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest17',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA17'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA18',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															flex: 1,
															margin: '5 0 5 0',
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest18',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest18',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA18'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA19',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest19',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest19',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA19'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA20',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest20',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest20',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA20'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA21',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest21',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest21',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA21'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA22',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest22',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest22',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA22'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA23',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest23',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest23',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA23'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA24',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest24',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest24',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA24'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA25',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest25',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest25',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA25'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA26',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest26',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest26',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA26'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA27',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest27',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest27',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA27'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA28',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '1',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest28',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	},
																	{
																		html: '0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest28',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA28'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA29',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest29',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest29',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA29'
															}
														}
													]
												},
												{
													xtype: 'container',
													layout: {
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align: 'stretch'
													},
													flex: 1,
													items: [
														{
															xtype: 'label',
															cbahtml: 'GDS_DOMANDA30',
															width: Ext.is.Phone ? null : 400,
															margin: Ext.is.Phone ? null : '20 15 0 0'	
														},
														{
															xtype: 'cbaMultipleChoice',
															layout: {
																type: 'hbox',
																align: 'stretch',
																pack: 'start'
															},
															style: 'border: none !important;',
															margin: '5 0 5 0',
															flex: 1,
															cbaConfig: {
																itemsCfg: [
																	{    
																		html: '0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: '_valoriTest30',
																		label: 'SI',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '0',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '0'
																	},
																	{
																		html: '1',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: '_valoriTest30',
																		label: 'NO',
																		labelWidth: 60,
																		isFormField: true,
																		inputValue: '1',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		cbaInputValue: '1'
																	}
																],
																esclusivo: true,
																titoloLabel: 'GDS_DOMANDA30'
															}
														}
													]
												}
											]
										},
										{
											xtype:'container',
											itemId:'CntNote',reference:'CntNote',
											padding:10,
											items:[
												{
													xtype:'textareafield',
													height:250,
													label:'NOTE',
													labelAlign: 'top',
													itemId:'Note',reference:'Note',
													cls: 'cbaTextArea',
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
