
Ext.define('CS.schede.schede.cgi.Cgi',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.cgi.CgiController'
    ],

    controller: 'cartella-schede-schede-cgi-cgi',
    
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
									xtype:'label',
									itemId:'TotTest',reference:'TotTest',
									cls:'cbaCssLabel',
//									cbahtml: 'PUNTEGGIO:',
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
									itemId:'Test', reference:'Test',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true,
									padding:5,
									items:[
										{
											xtype:'container',
											layout:{
												type:'hbox',
											},
											cls: 'headerFormSchede',
											width:Ext.is.Phone ? 300 : 600,
											padding: '3px',
											items:[
												{	
													xtype:'label',
//													width:200,
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
													},
													cbahtml: 'CGI_TITOLO1'
												}
											]
										},
										{
											xtype: 'label',
											margin: '15 5 0 10',
											cbahtml: 'CGI_DOMANDA1'
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											padding: 10,
											info: true,
											indexCmp: 2,
											margin: '5 5 5 5',
											items: [
												{
													xtype: 'cbaMultipleChoice',
													itemId: 'RadioGravita', reference: 'RadioGravita',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													style: 'border: none !important;',
													flex: 1,
													margin: '5 10 5 0',
													cbaConfig: {
														itemsCfg: [
															{
																html: '1',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita',
																isFormField: true,
																inputValue: '1',
																cbaInputValue: '1',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA1'
															},
															{
																html: '2',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita',
																isFormField: true,
																inputValue: '2',
																cbaInputValue: '2',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA2'
															},
															{
																html: '3',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita',
																isFormField: true,
																inputValue: '3',
																cbaInputValue: '3',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA3'
															},
															{
																html: '4',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita',
																isFormField: true,
																inputValue: '4',
																cbaInputValue: '4',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA4'
															},
															{
																html: '5',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita', 
																isFormField: true,
																inputValue: '5',
																cbaInputValue: '5',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA5'
															},
															{
																html: '6',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita',
																isFormField: true,
																inputValue: '6',
																cbaInputValue: '6',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA6'
															},
															{
																html: '7',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'gravita', 
																isFormField: true,
																inputValue: '7',
																cbaInputValue: '7',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA7'
															}
														],
														titoloLabel: 'CGI_DOMANDA1',
														esclusivo: true  
													 }
												}		
											]
										},
										{
											xtype:'container',
											layout:{
												type:'hbox',
											},
											cls: 'headerFormSchede',
											width:Ext.is.Phone ? 300 : 600,
											padding: '3px',
											items:[
												{	
													xtype:'label',
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
													},
													cbahtml: 'CGI_TITOLO2'
												}
											]
										},
										{
											xtype: 'label',
											margin: '15 5 0 10',
											cbahtml: 'CGI_DOMANDA2'
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											padding: 10,
											info: true,
											indexCmp: 2,
											margin: '5 5 5 5',
											items: [
												{
													xtype: 'cbaMultipleChoice',
													itemId: 'RadioMiglioramento', reference: 'RadioMiglioramento',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													style: 'border: none !important;',
													flex: 1,
													margin: '5 10 5 0',
													cbaConfig: {
														itemsCfg: [
															{
																html: '1',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento',
																isFormField: true,
																inputValue: '1',
																cbaInputValue: '1',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA8'
															},
															{
																html: '2',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento',
																isFormField: true,
																inputValue: '2',
																cbaInputValue: '2',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA9'
															},
															{
																html: '3',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento',
																isFormField: true,
																inputValue: '3',
																cbaInputValue: '3',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA10'
															},
															{
																html: '4',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento',
																isFormField: true,
																inputValue: '4',
																cbaInputValue: '4',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA11'
															},
															{
																html: '5',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento',
																isFormField: true,
																inputValue: '5',
																cbaInputValue: '5',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA12'
															},
															{
																html: '6',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento', 
																isFormField: true,
																inputValue: '6',
																cbaInputValue: '6',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA13'
															},
															{
																html: '7',
																margin: '0 0 9 0',
																cls: 'choice-round-unchecked-css-border2', 
																checkedClsPerson: 'choice-checked-css',
																name: 'miglioramento', 
																isFormField: true,
																inputValue: '7',
																cbaInputValue: '7',
																layout: {
																	type: 'vbox',
																	align: 'center'
																},
																label: 'CGI_RISPOSTA14'
															}
														],
														titoloLabel: 'CGI_DOMANDA1',
														esclusivo: true  
													 }
												}	
											]
										},
										{

											xtype:'container',
											layout:{
												type:'hbox',
											},
											cls: 'headerFormSchede',
											width:Ext.is.Phone ? 300 : 600,
											padding: '3px',
											items:[
												{	
													xtype:'label',
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
													},
													cbahtml: 'CGI_TITOLO3'
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											width: '95%',
											items: [
												{
													xtype: 'label',
													cbahtml: 'CGI_EFFICACIA5',
													cls: 'labelStrong',
													margin: '5 0 0 5'
												},
													{
														  xtype: 'cbaMultipleChoice',
														  layout: {
															  type: 'vbox',
															  align: 'stretch'
														  },
														  style: 'border: none !important;',
														  margin: '0 10 5 0',
														  padding: '0 0 0 10',
														  cbaConfig: {
															   itemsCfg: [
																	{
																		html: '4',
																		margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																		cls: 'choice-round-unchecked-css-border2', 
																		checkedClsPerson: 'choice-checked-css',
																		name: 'efficacia4', 
																		isFormField: true,
																		inputValue: '4',
																		cbaInputValue: '4',
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		label: 'CGI_EFFICACIA1'
																	},
																	{    
																		html: '2',
																		margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: 'efficacia4',
																		isFormField: true,
																		inputValue: 2,
																		cbaInputValue: 2,
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		label: 'CGI_EFFICACIA2'
																		  
																	},
																	{    
																		html: '1,33',
																		margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		width: 50,
																		style: 'font-size: 18px !important;padding-left: 5px !important;',
																		name: 'efficacia4',
																		isFormField: true,
																		inputValue: 1.33,
																		cbaInputValue: 1.33,
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		label: 'CGI_EFFICACIA3'
																	},
																	{    
																		html: '1',
																		margin: '0 0 0 0',
																		checkedClsPerson: 'choice-checked-css', 
																		cls: 'choice-round-unchecked-css-border2',
																		name: 'efficacia4',
																		isFormField: true,
																		inputValue: 1,
																		cbaInputValue: 1,
																		layout: {
																			type: 'vbox',
																			align: 'center'
																		},
																		label: 'CGI_EFFICACIA4'
																	},
																],
																esclusivo: true,
																titoloLabel: 'CGI_EFFICACIA5'
														 }
													
													}
											]
										},
										{

											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											width: '95%',
											items: [
												{
													xtype: 'label',
													cbahtml: 'CGI_EFFICACIA6',
													cls: 'labelStrong',
													margin: '5 0 0 5'
												},
												{
													  xtype: 'cbaMultipleChoice',
													  layout: {
														  type: 'vbox',
														  align: 'stretch'
													  },
													  style: 'border: none !important;',
													  margin: '0 10 5 0',
													  padding: '0 0 0 10',
													  cbaConfig: {
														   itemsCfg: [
															   {
																	html: '3',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	cls: 'choice-round-unchecked-css-border2', 
																	checkedClsPerson: 'choice-checked-css',
																	name: 'efficacia3',
																	isFormField: true,
																	inputValue: '3',
																	cbaInputValue: '3',
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA1'
																},
																{    
																	html: '1,50',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia3',
																	isFormField: true,
																	inputValue: 1.50,
																	cbaInputValue: 1.50,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA2'
																	  
																},
																{    
																	html: '1',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	name: 'efficacia3',
																	isFormField: true,
																	inputValue: 1,
																	cbaInputValue: 1,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA3'
																},
																{    
																	html: '0,75',
																	margin: '0 0 0 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia3',
																	isFormField: true,
																	inputValue: 0.75,
																	cbaInputValue: 0.75,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA4'
																},
															],
															esclusivo: true,
															titoloLabel: 'CGI_EFFICACIA6'
													 }
												
												}	
											]
										
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											width: '95%',
											items: [
												{
													xtype: 'label',
													cbahtml: 'CGI_EFFICACIA7',
													cls: 'labelStrong',
													margin: '5 0 0 5'
												},
												{
													  xtype: 'cbaMultipleChoice',
													  layout: {
														  type: 'vbox',
														  align: 'stretch'
													  },
													  style: 'border: none !important;',
													  margin: '0 10 5 0',
													  padding: '0 0 0 10',
													  cbaConfig: {
														   itemsCfg: [
															   {
																	html: '2',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	cls: 'choice-round-unchecked-css-border2', 
																	checkedClsPerson: 'choice-checked-css',
																	name: 'efficacia2',
																	isFormField: true,
																	inputValue: '2',
																	cbaInputValue: '2',
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA1'
																},
																{    
																	html: '1',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	name: 'efficacia2',
																	isFormField: true,
																	inputValue: 1,
																	cbaInputValue: 1,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA2'
																	  
																},
																{    
																	html: '0,67',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia2',
																	isFormField: true,
																	inputValue: 0.67,
																	cbaInputValue: 0.67,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA3'
																},
																{    
																	html: '0,50',
																	margin: '0 0 0 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia2',
																	isFormField: true,
																	inputValue: 0.50,
																	cbaInputValue: 0.50,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA4'
																},
															],
															esclusivo: true,
															titoloLabel: 'CGI_EFFICACIA7'
													 }
												
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											width: '95%',
											items: [
												{
													xtype: 'label',
													cbahtml: 'CGI_EFFICACIA8',
													cls: 'labelStrong',
													margin: '5 0 0 5'
												},
												{
													  xtype: 'cbaMultipleChoice',
													  layout: {
														  type: 'vbox',
														  align: 'stretch'
													  },
													  style: 'border: none !important;',
													  margin: '0 10 5 0',
													  padding: '0 0 0 10',
													  cbaConfig: {
														   itemsCfg: [
															   {
																	html: '1',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	cls: 'choice-round-unchecked-css-border2', 
																	checkedClsPerson: 'choice-checked-css',
																	name: 'efficacia1', 
																	isFormField: true,
																	inputValue: '1',
																	cbaInputValue: '1',
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA1'
																},
																{    
																	html: '0,50',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia1',
																	isFormField: true,
																	inputValue: 0.50,
																	cbaInputValue: 0.50,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA2'
																	  
																},
																{    
																	html: '0,33',
																	margin: Ext.is.Phone ? '0 0 30 0' : '0 0 10 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia1',
																	isFormField: true,
																	inputValue: 0.33,
																	cbaInputValue: 0.33,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA3'
																},
																{    
																	html: '0,25',
																	margin: '0 0 0 0',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	width: 50,
																	style: 'font-size: 18px !important;padding-left: 5px !important;',
																	name: 'efficacia1',
																	isFormField: true,
																	inputValue: 0.25,
																	cbaInputValue: 0.25,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	label: 'CGI_EFFICACIA4'
																},
															],
															esclusivo: true,
															titoloLabel: 'CGI_EFFICACIA8'
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
		}
	]
});
