
Ext.define('CS.schede.schede.morse.Morse',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.morse.MorseController',
        'CbaCssView.store.schede.Frequenze'
    ],

    controller: 'cartella-schede-schede-morse-morse',
    
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
					margin:'8 0 0 0',
					itemId:'TabPanel', reference:'TabPanel',
					cls: 'cbaTabParam',
					tabBarPosition: 'top',
					width: '100%',
					scrollable: false,
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
							items: [
								{
									xtype:'CbaForm',
									itemId:'Form',reference:'Form',
									cls:'cbaCssForm',
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
											hidden:true	
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
													itemId:'TotTest',reference:'TotTest',
													cls:'cbaCssLabel',
													html: 'PUNTEGGIO:',
													style:'font-weight:bold',
													maxWidth:400
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
										    xtype: 'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											flex:1,
											scrollable: true,
											margin:'10 0 10 0',
											items: [
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px', 
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html:'MORSE_TITOLO1'				
														},
														//TODO_PLS spostare info punteggi a fianco del punteggio ? 
//														{
//															xtype: 'image',
//															src: 'resources/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																painted: function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; text-align: left;'>"+
//																	Stdtraduci('MORSE_DESC1.1')+"<br><br>"+traduci('MORSE_DESC1.2')+"<br><br>"+
//																	traduci('MORSE_DESC1.3')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('MORSE_TITOLO1')+'</strong>',
													cls: 'cbaCssLabel',
													info: true,
													indexCmp: 0,
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													padding: '2 10 10 10',
													margin: '0 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															margin: '0 0 0 565',
															items: [
																{
																	xtype: 'label',
																	html: 'SI',
																	cls: 'cbaCssLabel'
																},
																{
																	xtype: 'label',
																	html: 'NO',
																	margin: '0 0 0 80',
																	cls: 'cbaCssLabel'
																}
															]
														},
														{
															xtype: 'container',
															layout: {	
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA1',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'grid',
																			flex: 1,
																			emptyhtml: 'NESSUN_DATO_PRESENTE',
																			itemId: 'GridCadute', reference: 'GridCadute',
																			title: 'CADUTE_3_MESI',
																			store: Ext.create('CS.schede.schede.morse.CaduteStore'),
																			maxHeight: 180,
																			flex: 1,
																			columns: [
																				{
																					xtype: 'gridcolumn',
																					dataIndex: 'id',
																					hidden: true
																				},
																		        { 
																		        	xtype: 'datecolumn', 
																		        	text: 'DATA_CADUTA',
																		        	dataIndex: 'data',
																		        	flex: 1,
																		        	sortable:false,
																		        	renderer: function(value, record, rowIndex,colIndex, store) {
																		        		if(value) {
																		        			return StdCba.FormattaData(value);
																		        		}
																		        	} 
																		        },
																		        { 
																		        	xtype: 'gridcolumn', 
																		        	text: 'DESCRIZIONE_CADUTA',
																		        	dataIndex: 'descrizioneCaduta',
																		        	flex: 1,
																		        	sortable:false
																		        }
																			],
																			viewConfig: {
																				loadMask: false
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
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioCadute', reference: 'RadioCadute',
																			layout: {
																				type: 'hbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '25',
																						margin: '0 0 0 0',
																						style: 'font-size: 18px !important;padding-left: 5px !important;',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'cadute', 
																						isFormField: true,
																						inputValue: '25'
																					},
																					{    
																						html: '0',
																						margin: '0 0 0 60',
																						checkedClsPerson: 'choice-checked-css', 
																						cls: 'choice-round-unchecked-css-border2',
																						name: 'cadute',
																						isFormField: true,
																						inputValue: '0'
																						
																					}
																				],
																				titoloLabel: 'MORSE_TITOLO1',
																				esclusivo: true  
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html: 'DIAGNOSI'			
														},
//														{
//															xtype: 'image',
//															src: '/cba/css/generali/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																'afterrender': function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; html-align: left;'>"+traduci('MORSE_DESC2')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('DIAGNOSI')+'</strong>',
													cls: 'cbaCssLabel',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													info: true,
													indexCmp: 1,
													padding: '2 10 10 10',
													margin: '0 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															margin: '0 0 0 565',
															items: [
																{
																	xtype: 'label',
																	html: 'SI',
																	cls: 'cbaCssLabel'
																},
																{
																	xtype: 'label',
																	html: 'NO',
																	margin: '0 0 0 80',
																	cls: 'cbaCssLabel'
																}
															]
														},
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA2',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'grid',
																			itemId: 'GridPatologie', reference: 'GridPatologie',
																			title: 'PROB_PAT_AL',
																			store:Ext.create('CS.schede.schede.morse.PatologieStore'),
																			maxHeight: 180,
																			flex: 1,
																			emptyhtml: 'NESSUN_DATO_PRESENTE',
																			columns: [
																				{
																					xtype: 'gridcolumn',
																					dataIndex: 'id',
																					hidden: true
																				},
																				{
																					xtype: 'gridcolumn',
																					text: 'DESCRIZIONE',
																					dataIndex: 'descrizionePatologia',
																					width: 350,
																					sortable: false,
																					renderer:function(value, record, rowIndex,colIndex, store) {
																		        		if(record.get('tipo') === 'B') {
																	          				return '<span style="white-space: nowrap; color:#5FA2DD !important;">'+ value +'</span>';
																		        		} else {
																		        			return '<span style="white-space: nowrap">'+ value +'</span>';
																		        		}
																		        	}
																				},
																				{
																					xtype: 'gridcolumn',
																					text: 'STATO',
																					dataIndex: 'stato',
																					flex: 1,
																					sortable: true,
																		        	renderer:function(value, record, rowIndex,colIndex, store) {
																		        		var colore;
																		        		if(value == 1) {
																		        			colore = '#cd9832';
																		        			return '<span style=" color:'+ colore +'"> Attivo </span>';
																		        		} else if(value == 3) {
																		        			colore = '#cc3636';
															                              	return '<span style=" color:'+ colore +'"> Cronico </span>';
																		        		}
																		        	}
																				}
																			],
																			viewConfig: {
																				loadMask: false
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
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioDiagnosi', reference: 'RadioDiagnosi',
																			layout: {
																				type: 'hbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '15',
																						margin: '0 0 0 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 18px !important;padding-left: 4px !important;',
																						name: 'diagnosi', 
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						inputValue: '15',
																						value: '15',
																						cbaInputValue: '15'
																					},
																					{    
																						html: '0',
																						margin: '0 0 0 60',
																						checkedClsPerson: 'choice-checked-css', 
																						cls: 'choice-round-unchecked-css-border2',
																						name: 'diagnosi',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						inputValue: '0',
																						value: '0',
																						cbaInputValue: '0'
																						
																					}
																				],
																				titoloLabel: 'DIAGNOSI',
																				esclusivo: true ,
																				fakeCheckbox: true
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html: 'MOBILITA',
														},
//														{
//															xtype: 'image',
//															src: '/cba/css/generali/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																'afterrender': function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; html-align: left;'>"+
//																	traduci('MORSE_DESC3.1')+"<br><br>"+traduci('MORSE_DESC3.2')+"<br><br>"+
//																	traduci('MORSE_DESC3.3')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('MOBILITA')+'</strong>',
													cls: 'cbaCssLabel',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													padding: 10,
													info: true,
													indexCmp: 2,
													margin: '10 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'numberfield',
																			name: 'mobilitaAppo',
																			hidden: true
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA3',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA4',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA5',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA6',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA7',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'grid',
																			itemId: 'GridAusili', reference: 'GridAusili',
																			title: 'AUSILI_UTENTE',
	//																			store:Ext.create('CS.personalizzazioni.personCartella.personalizzazioni.store.StoreLabelPerson'),
																			maxHeight: 100,
																			flex: 1,
																			columns: [
																				{
																					xtype: 'gridcolumn',
																					dataIndex: 'id',
																					hidden: true
																				}
																			]
																		}
																	]
																},
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioMobilita', reference: 'RadioMobilita',
																			layout: {
																				type: 'vbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '0',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'mobilita',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '1',
																						cbaInputValue: '1',
																						inputValue: '1'
																					},
																					{
																						html: '0',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'mobilita',
																						isFormField: true,
																						inputValue: '2',
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '2',
																						cbaInputValue: '2'
																					},
																					{
																						html: '0',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'mobilita',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '3',
																						cbaInputValue: '3',
																						inputValue: '3'
																					},
																					{
																						html: '15',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 18px !important;padding-left: 4px !important;',
																						name: 'mobilita',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						inputValue: '15',
																						value: '15',
																						cbaInputValue: '15'
																					},
																					{
																						html: '30',
																						margin: '0 0 0 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 17px !important;padding-left: 5px !important;',
																						name: 'mobilita', 
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '30',
																						cbaInputValue: '30',
																						inputValue: '30'
																					}
																				],
																				titoloLabel: 'MOBILITA',
																				esclusivo: true  
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html: 'TERAPIA'				
														},
//														{
//															xtype: 'image',
//															src: '/cba/css/generali/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																'afterrender': function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; text-align: left;'>"+traduci('MORSE_DESC4')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('TERAPIA')+'</strong>',
													cls: 'cbaCssLabel',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													info: true,
													indexCmp: 3,
													padding: '2 10 10 10',
													margin: '0 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															margin: '0 0 0 565',
															items: [
																{
																	xtype: 'label',
																	html: 'SI',
																	cls: 'cbaCssLabel'
																},
																{
																	xtype: 'label',
																	html: 'NO',
																	margin: '0 0 0 80',
																	cls: 'cbaCssLabel'
																}
															]
														},
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA8',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'grid',
																			itemId: 'GridTerapie', reference: 'GridTerapie',
																			title: 'TERAPIE_ATTO',
	//																			store:Ext.create('CS.personalizzazioni.personCartella.personalizzazioni.store.StoreLabelPerson'),
																			maxHeight: 100,
																			flex: 1,
																			columns: [
																				{
																					xtype: 'gridcolumn',
																					dataIndex: 'id',
																					hidden: true
																				}
																			]
																		}
																	]
																},
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioTerapia', reference: 'RadioTerapia',
																			layout: {
																				type: 'hbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '20',
																						margin: '0 0 0 0',
																						style: 'font-size: 18px !important;padding-left: 5px !important;',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'terapia', 
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '20',
																						cbaInputValue: '20',
																						inputValue: '20'
																					},
																					{    
																						html: '0',
																						margin: '0 0 0 60',
																						checkedClsPerson: 'choice-checked-css', 
																						cls: 'choice-round-unchecked-css-border2',
																						name: 'terapia',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '0',
																						cbaInputValue: '0',
																						inputValue: '0'
																						
																					}
																				],
																				titoloLabel: 'TERAPIA',
																				esclusivo: true  
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html: 'ANDATURA'				
														},
//														{
//															xtype: 'image',
//															src: '/cba/css/generali/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																'afterrender': function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; html-align: left;'>"+
//																	traduci('MORSE_DESC5.1')+"<br><br>"+traduci('MORSE_DESC5.2')+
//																	"<br><br>"+traduci('MORSE_DESC5.3')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('ANDATURA')+'</strong>',
													cls: 'cbaCssLabel',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													padding: 10,
													info: true,
													indexCmp: 4,
													margin: '10 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA9',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA10',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA11',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		}
																	]
																},
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioAndatura', reference: 'RadioAndatura',
																			layout: {
																				type: 'vbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '0',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'andatura',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '0',
																						cbaInputValue: '0',
																						inputValue: '0'
																					},
																					{
																						html: '10',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 18px !important;padding-left: 4px !important;',
																						name: 'andatura',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '10',
																						cbaInputValue: '10',
																						inputValue: '10'
																					},
																					{
																						html: '20',
																						margin: '0 0 0 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 18px !important;padding-left: 5px !important;',
																						name: 'andatura', 
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '20',
																						cbaInputValue: '20',
																						inputValue: '20'
																					}
																				],
																				titoloLabel: 'ANDATURA',
																				esclusivo: true  
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													layout: {
														type: 'hbox'
													},
													cls: 'headerFormSchede',
													width:Ext.is.Phone ? 300 : 600,
													padding: '3px',
													items:[
														{	
															xtype:'label',
															height:20,
															name:'descrizione',
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
															html: 'MORSE_TITOLO6'				
														},
//														{
//															xtype: 'image',
//															src: '/cba/css/generali/images/btnFunzione/question-mark.svg',
//															width: 15,
//															height: 15,
//															listeners: {
//																'afterrender': function(th) {
//																	var testoLegenda = "<p style='color: #5FA2DD; html-align: left;'>"+
//																	traduci('MORSE_DESC6.1')+"<br><br>"+traduci('MORSE_DESC6.2')+"<br><br>"+
//																	traduci('MORSE_DESC6.3')+"</p>";
//																	var toolTip = creaToolTipBubble(th, testoLegenda);
//																}
//															}
//														}
													]
												},
												{
													xtype: 'container',
//													title: '<strong>'+traduci('MORSE_TITOLO6')+'</strong>',
													cls: 'cbaCssLabel',
													layout: {
														type: 'vbox',
														align: 'stretch'
													},
													padding: 10,
													info: true,
													indexCmp: 5,
													margin: '10 5 10 5',
													items: [
														{
															xtype: 'container',
															layout: {
																type: 'hbox',
																align: 'stretch'
															},
															flex: 1,
															items: [
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	minWidth: 500,
																	flex: 1,
																	items: [
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA12',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		},
																		{
																			xtype: 'label',
																			html: 'MORSE_DOMANDA13',
																			margin: '10 0 15 5',
																			cls: 'cbaCssLabel'
																		}
																	]
																},
																{
																	xtype: 'container',
																	layout: {
																		type: 'vbox',
																		align: 'stretch'
																	},
																	margin: '0 0 0 50',
																	flex: 1,
																	items: [
																		{
																			xtype: 'cbaMultipleChoice',
																			itemId: 'RadioStatoMentale', reference: 'RadioStatoMentale',
																			layout: {
																				type: 'vbox',
																				pack: 'start'
																			},
																			style: 'border: none !important;',
																			flex: 1,
																			margin: '5 10 20 0',
																			cbaConfig: {
																				itemsCfg: [
																					{
																						html: '0',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						name: 'statoMentale',
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '0',
																						cbaInputValue: '0',
																						inputValue: '0'
																					},
																					{
																						html: '15',
																						margin: '0 0 9 0',
																						cls: 'choice-round-unchecked-css-border2', 
																						checkedClsPerson: 'choice-checked-css',
																						style: 'font-size: 18px !important;padding-left: 4px !important;',
																						name: 'statoMentale',	
																						isFormField: true,
																						layout: {
																							type: 'vbox',
																							align: 'center'
																						},
																						value: '15',
																						cbaInputValue: '15',
																						inputValue: '15'
																					}
																				],
																				titoloLabel: 'MORSE_TITOLO6',
																				esclusivo: true  
																			 }
																		}
																	]
																}
															]
														}
													]
												},
												{
													xtype:'container',
													itemId:'CntNote',reference:'CntNote',
													margin:'20 0 0  0',
													padding:10,
													items:[
														{
															xtype:'textareafield',
															cls: 'cbaTextArea',
															height:250,
															title:'NOTE',
															itemId:'Note',reference:'Note',
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
		}						
	]
});
