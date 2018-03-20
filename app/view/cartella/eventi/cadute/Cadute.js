
Ext.define('CS.eventi.cadute.Cadute',{
    extend: 'Ext.Container',

    requires: [
        'CS.eventi.cadute.CaduteController',
        'CbaCssView.store.Sedi',
        'CbaCssView.store.Reparti',
        'CS.personalizzazioni.risposte.store.RisposteCbox',
        'CbaCssView.store.Stanze'
    ],

    controller: 'cartella-eventi-cadute-cadute',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items:[
		{
			xtype: 'CbaForm',
			cls:'cbaCssForm',
			itemId: 'Form', reference: 'Form',
			scrollable: true,
			flex:1,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			height: '80%',
			listeners:{
				painted: 'afterrenderForm'
			},
			items:[
				{
					xtype: 'textfield',
					name: 'id',
					hidden: true
				},
				//solo cadute
				{
					xtype:'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align:'stretch'
					},
					items:[
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
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
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'DESCRIZIONE_CADUTA_NOTE',
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
									xtype:'textareafield',
									itemId:'NoteDescCadute',reference:'NoteDescCadute',
									width: '95%',
									cls: 'cbaTextArea',
									flex:1,
									padding: '5px',
									modificaTerzi: true,
									name:'descrizioneCaduta',
									cbaConfig:{
										campo:'Descrizione Caduta'
									}
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							modificaTerzi: true,
							margin: '20 0 0 0',
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									padding: '3px',
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											valore:0,
											cbahtml: 'LUOGO_DELLA_CADUTA',
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
									xtype: 'container',
									layout:{
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									items:[
										{
											xtype: 'container',
											layout:{
												type: 'vbox',
												align:'stretch'
											},
											margin: Ext.is.Phone ? '0' : '0 10 0 0' ,
											items:[
												{
													xtype:'selectfield',
													itemId:'RadioLuogoCaduta',reference:'RadioLuogoCaduta',
													label:'LUOGO',
													name:'luogoCaduta',
													labelWidth: 130,
													width: 250,
													displayField: 'descrizione',
													queryMode: 'local',
													valueField: 'id',
													autoSelect: false,
													store:{
														type: 'risposteCbox'
													},
													cbaConfig: {
														campo:'Luogo della caduta'
													}
												},
												{
													xtype: 'selectfield',
													itemId: 'Sede', reference: 'Sede',
													label:'SEDE',
													labelWidth:130,
													width: 250,
													labelClsExtra: 'cbaCssLabel',
													name: 'codSede',
													//emptyText: 'SEDE',
													displayField: 'valore',
													queryMode: 'local',
													store: {
														type: 'sede'
													},
													valueField: 'codice',
													autoSelect: false,
													listeners:{
														change: 'changeCboxSede'
													},
													tpl: Ext.create('Ext.XTemplate',
														'<tpl for=".">',
															'<tpl if="extra==\'T\'">',
																'<div class="x-boundlist-item"><i>{valore}</i></div>',
															'<tpl else>',
																'<div class="x-boundlist-item">{valore}</div>',
															'</tpl>',
														'</tpl>'
													)
													
												},
											]
											
										},
										{
											xtype: 'container',
											layout:{
												type: 'vbox',
												align:'stretch'
											},
											items:[
												{
													xtype: 'selectfield',
													label:'REPARTO',
													labelClsExtra: 'cbaCssLabel',
													itemId: 'Reparto', reference: 'Reparto',
													width: '90%',
													labelWidth: 130,
													width: 250,
													name: 'codReparto',
													//emptyText: 'REPARTO',
													displayField: 'valore',
													queryMode: 'local',
													store: {
														type: 'reparti'
													},
													valueField: 'codice',
													autoSelect: false,
													listeners:{
														change: 'changeCboxReparto'
													},
													tpl: Ext.create('Ext.XTemplate',
														'<tpl for=".">',
															'<tpl if="extra==\'T\'">',
																'<div class="x-boundlist-item"><i>{valore}</i></div>',
															'<tpl else>',
																'<div class="x-boundlist-item">{valore}</div>',
															'</tpl>',
														'</tpl>'
													)
												},
												{
													xtype: 'selectfield',
													label:'STANZA',
													labelClsExtra: 'cbaCssLabel',
													itemId: 'Stanza', reference: 'Stanza',
													width: '90%',
													labelWidth:130,
													width: 250,
													name: 'codStanza',
													//emptyText: 'STANZA',
													displayField: 'valore',
													queryMode: 'local',
													store: {
														type: 'stanza'
													},
													valueField: 'codice',
													autoSelect: false,
													tpl: Ext.create('Ext.XTemplate',
														'<tpl for=".">',
															'<tpl if="extra==\'T\'">',
																'<div class="x-boundlist-item"><i>{valore}</i></div>',
															'<tpl else>',
																'<div class="x-boundlist-item">{valore}</div>',
															'</tpl>',
														'</tpl>'
													)
												}
											]
										}
									]
								}
								
								
							]
						}
						
					]
				},
				//secondo blocco
				{
					xtype:'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align:'stretch'
					},
					margin: '20 0 0 0',
					items:[
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							flex:1,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									width: Ext.is.Phone? '80%' : 300,
									cls: 'headerFormSchede',
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'CONSEGUENZE_RIPORTATE',
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
									xtype:'selectfield',
									itemId:'RadioConseguenzeRipo',reference:'RadioConseguenzeRipo',
									name:'conseguenze',
									width: '90%',
									labelWidth: 130,
									width: 180,
									displayField: 'descrizione',
									queryMode: 'local',
									valueField: 'id',
									autoSelect: false,
									store:{
										type: 'risposteCbox'
									},
									cbaConfig: {
										campo:'Conseguenze Riportate'
									}
								},
								{
									xtype:'textareafield',
									label: 'NOTE',
									cls: 'cbaTextArea',
									labelAlign: 'top',
									itemId:'NoteConseguenzeRipo',reference:'NoteConseguenzeRipo',
									height: 200,
									width: '95%',
									modificaTerzi: true,
									name:'conseguenzeCaduta',
									cbaConfig:{
										campo:'Note - Conseguenze Riportate'
									}
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							flex:1,
							margin: '20 0 0 0',
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'ATT_SVOLTA_DUR_CADUTA',
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
									xtype:'selectfield',
									itemId:'RadioAttSvolta',reference:'RadioAttSvolta',
									name:'attivitaSvolta',
									width: '90%',
									labelWidth: 130,
									width: 180,
									displayField: 'descrizione',
									queryMode: 'local',
									valueField: 'id',
									autoSelect: false,
									store:{
										type: 'risposteCbox'
									},
									cbaConfig: {
										campo:'Attività svolta durante la caduta'
									}
								}
							]
						}
						
					]
				},
				//terzo blocco
				{
					xtype:'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align:'stretch'
					},
					margin: '20 0 0 0',
					items:[
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
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
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'USO_AUSILI',
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
									xtype:'selectfield',
									itemId:'RadioUsoAusili',reference:'RadioUsoAusili',
									name:'ausili',
									width: '90%',
									labelWidth: 130,
									width: 180,
									displayField: 'descrizione',
									queryMode: 'local',
									valueField: 'id',
									autoSelect: false,
									store:{
										type: 'risposteCbox'
									},
									cbaConfig: {
										campo:'Uso Ausili'
									}
								},
								{
									xtype:'textfield',
									width: '95%',
									label:'ALTRO',
									labelWidth: 60,
//									labelAlign:'top',
									labelClsExtra:'cbaCssLabel',
									name:'ausiliAltro',
									maxLength:50,
									enforceMaxLength:true
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							flex:1,
							margin: '20 0 0 0',
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'CONTENZIONI_IN_USO',
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
									xtype:'container',
									layout:{
										type:'hbox',
										align: 'stretch'
									},
									items:[
										{
											xtype: 'cbaMultipleChoice',
											margin: '5 30 0 0',
											width: 90,
											itemId: 'RadioContenzioni', reference: 'RadioContenzioni',
											layout: {
												type: 'hbox',
												align: 'center'
											},
											style: 'border: none !important',
											border: false,
											listeners:{
												choicechange: 'changeRadioContenzioni'
											},
											cbaConfig: {
												itemsCfg: [
														{
															html: 'SI',
															style: 'font-size: 12px !important;padding-left: 6px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'contenzione', 
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: true,
															value: true,
															cbaInputValue: true
														},
														{    
															html: 'NO',
															style: 'padding-left: 3px !important;font-size: 12px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'contenzione',
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: false,
															value: false,
															cbaInputValue: false
														},
														
													],
													esclusivo: true  
											}
										
										},
										{
											xtype: 'img',
											itemId: 'ImgContenzioni', reference: 'ImgContenzioni',
											margin:'10 0 0 0',
											src: 'resources/images/generali/pencil.svg',
											hidden: true,
											width: 30,
											height: 30,
											listeners:{
												tap: 'btnContenzioni'
											}
										}
									]
								},
								{
									xtype: 'container',
									layout:{
										type:'hbox',
										align: 'stretch'
									},
									items:[
										{
											xtype: 'container',
											itemId: 'CntContUso',reference:'CntContUso',
											layout:{
												type:'vbox',
												align: 'stretch'
											},
											flex: 1,
											modificaTerzi: true,
											hidden:true,
											items:[
												{
													xtype:'container',
													itemId:'CheckContenzioni',reference:'CheckContenzioni',
													scrollable:true,
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													height:120,
													items:[],
													cbaConfig:{
														campo:'Quali contenzioni utilizzava'
													}
												}
											]
										},
										{
											xtype: 'container',
											layout: {
												type:'vbox',
												align: 'stretch'
											},
											flex: 1,
											modificaTerzi: true,
											hidden: true,
											items:[
												{
													xtype: 'label',
													html: 'CONTENZIONI_PRESCRITTE',
													cls: 'cbaLabelStrong'
												},
												{
													xtype: 'container',
													itemId: 'FieldConsRiportate',reference:'FieldConsRiportate',
													scrollable: true,
													layout: {
														type:'vbox',
														align: 'stretch'
													},
													height:120,
													flex: 1,
													items:[]
												}
											]
										}
									]
								}
								
							]
						}
						
					]
				
				},
				//quarto contenitore
				{
					xtype:'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align:'stretch'
					},
					margin: '20 0 0 0',
					items:[
						{
							xtype:'container',
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
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'UTENTE_NON_PORTATORE',
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

									xtype:'container',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									margin: '20 0 0 0',
									items:[
										{
											xtype:'container',
											layout:{
												type:'hbox',
												align:'center'
											},
											items:[
												{
													xtype:'spacer'
												},
												{
													xtype:'label',
													cbahtml:'IN_USO_MOM_CAD',
													width:'45%',
													hieght: 48
												}
											]
										},
										{
											xtype:'container',
											layout:{
												type:'hbox',
												align:'stretch'
											},
											margin: '0 5 20 0',
											items:[
												{
													xtype:'label',
													cbahtml:'APPAR_ACUSTICO',
													width: Ext.is.Phone ? 80 : 150,
													margin:'35 0 0 0'
												},
												{
													xtype:'container',
													cbaConfig:{
														campo:'Apparecchio Acustico'
													},
													margin:'0 0 0 10',
													itemId:'RadioAppAcustico',reference:'RadioAppAcustico',
													items:[
														{
															xtype:'checkboxfield',
															label:'SI',
															labelAlign:'top',
															name:'apparecchioAcustico',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: true,
															labelClsExtra:'cbaCssLabel',
															listeners:{
																change: 'changeRadioAppAcustico'
															}
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align: 'stretch'
													},
													margin:'0 0 0 50',
													cbaConfig:{
														campo:'Apparecchio Acustico in uso al momento della caduta'
													},
													itemId:'RadioAppAcDurante',reference:'RadioAppAcDurante',
													items:[
														{
															xtype:'radiofield',
															label:'SI',
															labelAlign:'top',
															name:'apparecchioAcusticoInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue:true,
															labelClsExtra:'cbaCssLabel',
															margin: '0 5 0 0'
														},
														{
															xtype:'radiofield',
															label:'NO',
															labelAlign:'top',
															name:'apparecchioAcusticoInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue:false,
															labelClsExtra:'cbaCssLabel'
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
											margin: '0 5 20 0',
											items:[
												{
													xtype:'label',
													html:'OCCHIALI',
													width: Ext.is.Phone ? 80 : 150,
												},
												{
													xtype:'container',
													cbaConfig:{
														campo:'Occhiali'
													},
													margin:'0 0 0 10',
													itemId:'RadioOcchiali',reference:'RadioOcchiali',
													items:[
														{
															xtype:'checkboxfield',
															name:'occhiali',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: true,
															labelClsExtra:'cbaCssLabel',
															listeners:{
																change: 'changeRadioOcchiali'
															}
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align: 'stretch'
													},
													margin:'0 0 0 53',
													cbaConfig:{
														campo:'Utilizzo di occhiali al momento della caduta'
													},
													itemId:'RadioOcchialiDurante',reference:'RadioOcchialiDurante',
													items:[
														{
															xtype:'radiofield',
															name:'occhialiInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: true,
															labelClsExtra:'cbaCssLabel',
															margin: '0 5 0 0',
															listeners:{
																change :'changeRadioOcchialiDurante'
															}
														},
														{
															xtype:'radiofield',
															name:'occhialiInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue:false,
															labelClsExtra:'cbaCssLabel'
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
											items:[
												{
													xtype:'label',
													html:'ALTRA_PROTESI',
													width: Ext.is.Phone ? 80 : 150,
												},
												{
													xtype:'container',
													margin:'0 0 0 10',
													cbaConfig:{
														campo:'Altro Protesi'
													},
													itemId:'RadioAltraProtesi',reference:'RadioAltraProtesi',
													items:[
														{
															xtype:'checkboxfield',
															name:'altraProtesi',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: true,
															labelClsExtra:'cbaCssLabel',
															listeners:{
																change: 'changeRadioAltraProtesi'
															}
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align: 'stretch'
													},
													margin:'0 0 0 53',
													cbaConfig:{
														campo:'Utilizzo altra protesi al momento della caduta'
													},
													itemId:'RadioAltraProtesiDurante',reference:'RadioAltraProtesiDurante',
													items:[
														{
															xtype:'radiofield',
															name:'altraProtesiInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: true,
															labelClsExtra:'cbaCssLabel',
															margin: '0 5 0 0',
															listeneres:{
																change: 'changeRadioAltraProtesiDurante'
															}
														},
														{
															xtype:'radiofield',
															name:'altraProtesiInUso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue: false,
															labelClsExtra:'cbaCssLabel'
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
							xtype:'textfield',
							name:'altraProtesiDescr',
							maxHeight:20,
							width: 120,
							cbaConfig:{
								campo:'Descrizione altra protesi'
							},
							itemId:'TxtAltraProtesi',reference:'TxtAltraProtesi',
							disabled:true,
							maxLength:50,
							enforceMaxLength:true
						},
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							margin: '20 0 0 0',
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											html: 'DEAMB_UTENTE',
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
									xtype:'container',
									layout: {
										type:'vbox',
										align: 'stretch'
									},
									cbaConfig:{
										campo:'Deambulazione Utente'
									},
									items:[
										{
											xtype:'selectfield',
											name:'deambulante',
											label: 'DEAMBULANTE',
											labelWidth: 130,
											width: 180,
											autoSelect: false,
											cbaConfig: {
												campo:'Deambulazione Utente'
											},
											options: [
												{
									                text: 'NON_DEAMBULANTE',
									                value: 'F'
									            }, 
									            {
									                text: 'DEAMBULANTE',
									                value: 'T'
									            }
								            ]
										}
//										{
//											xtype:'radiofield',
//											boxLabel:'DEAMBULANTE',
//											name:'deambulante',
//											cbaConfig: {
//										        deselezionabile: true
//										    },
//											inputValue:true,
//											labelClsExtra:'cbaCssLabel'
//										},
//										{
//											xtype:'radiofield',
//											boxLabel:'NON_DEAMBULANTE',
//											name:'deambulante',
//											cbaConfig: {
//										        deselezionabile: true
//										    },
//											inputValue:false,
//											labelClsExtra:'cbaCssLabel'
//										}
									]
								}
							]
						}
						
					]
				},
				//quinto blocco
				{
					xtype:'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align:'stretch'
					},
					margin: '20 0 0 0',
					items:[
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
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
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											html: 'FATTORI_AMBIENTALI',
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
									xtype:'selectfield',
									name:'illuminazione',
									label: 'ILLUMINAZIONE',
									labelWidth: 130,
									width: 180,
									autoSelect: false,
									cbaConfig: {
										campo:'Fattori ambientali  - Illuminazione'
									},
									options: [
										{
							                text: 'ABBAGLIANTE',
							                value: '1'
							            }, 
							            {
							                text: 'ADEGUATA',
							                value: '2'
							            }, 
							            {
							                text: 'SCARSA',
							                value: '3'
							            }, 
							            {
							                text: 'ASSENTE',
							                value: '4'
							            }
						            ]
								},
								{
									xtype:'container',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									items:[
										{
											xtype: 'cbaMultipleChoice',
											margin: '5 30 0 0',
											width: 90,
											itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
											layout: {
												type: 'hbox',
												align: 'center'
											},
											style: 'border: none !important',
											border: false,
											listeners:{
												choicechange: 'changeRadioContenzioni'
											},
											cbaConfig: {
												campo:'Fattori ambientali - Presenza ostacoli',
												itemsCfg: [
														{
															html: 'SI',
															style: 'font-size: 12px !important;padding-left: 6px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'ostacoli', 
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: true,
															value: true,
															cbaInputValue: true,
															label: 'PRESENZA_OSTACOLI',
															labelAlign: 'left',
														},
														{    
															html: 'NO',
															style: 'padding-left: 3px !important;font-size: 12px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'ostacoli',
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: false,
															value: false,
															cbaInputValue: false
														},
														
													],
													esclusivo: true  
											}
										
										},
//										{
//											xtype: 'container',
//											layout:{
//												type: 'hbox',
//												align: 'stretch'
//											},
//								            cbaConfig:{
//												campo:'Fattori ambientali - Presenza ostacoli'
//											},
//											itemId:'RadioPresOstacoli',reference:'RadioPresOstacoli',
//								            items: [
//								            	{
//								            		xtype: 'label',
//								            		html: 'PRESENZA_OSTACOLI',
//								            		margin: '13 10 0 0'
//								            	},
//												{
//													xtype: 'radiofield',
//													boxLabel: 'SI',
//													margin: '0 5 0 0',
//													inputValue: 'T',
//													name:'ostacoli',
//													cbaConfig: {
//														deselezionabile: true
//													},
//													listeners:{
//														change: 'changeRadioPresOstacoli'
//													}
//												},
//												{
//													xtype: 'radiofield',
//													boxLabel: 'NO',
//													inputValue: 'F',
//													name:'ostacoli',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												}
//											]
//										},
										{
											xtype:'selectfield',
											itemId:'RadioOstacolo',reference:'RadioOstacolo',
											name:'ostacoliTipo',
											labelWidth: 130,
											width: 180,
											hidden: true,
											autoSelect: false,
											cbaConfig: {
												ccampo:'Fattori ambientali - Tipo ostacolo'
											},
											options: [
												{
									                text: 'OGGETTI',
									                value: 'true'
									            }, 
									            {
									                text: 'PERSONE',
									                value: 'false'
									            }
								            ]
										}
									]
								},
								{
									xtype:'selectfield',
									name:'tipoPavimento',
									label: 'PAVIMENTO',
									labelWidth: 130,
									width: 180,
									autoSelect: false,
									cbaConfig: {
										campo:'Fattori ambientali - Tipo Pavimento'
									},
									options: [
										{
							                text: 'ADEGUATO',
							                value: '1'
							            }, 
							            {
							                text: 'BAGNATO',
							                value: '2'
							            }, 
							            {
							                text: 'SCIVOLOSO',
							                value: '3'
							            }, 
							            {
							                text: 'SCONNESSO',
							                value: '4'
							            }
						            ]
								},
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									height:40,
									items:[
										{
											xtype: 'checkboxfield',
											label: 'ALTRO',
											inputValue: true,
											cls: 'cbaCssOptionField',
											labelClsExtra:'cbaCssLabel',
											name:'fattoreAmbientaleAltro',
											itemId:'CheckAltroFattAmb',reference:'CheckAltroFattAmb',
											cbaConfig: {
												deselezionabile: true,
												campo:'Fattori Ambientali - Altro'
											},
											listeners:{
												change: 'changeCheckAltroFattAmb'
											}
										},
										{
											xtype:'textfield',
											margin:'0 0 0 10',
											name:'fattoreAmbientaleAltroDescr',
											itemId:'TxtAltroFattAmb',reference:'TxtAltroFattAmb',
											maxHeight:20,
											maxLength:100,
											enforceMaxLength:true,
											hidden:true,
											cbaConfig:{
												campo:'Fattori Ambientali - Altro Descrizione'
											}
										}
									]
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type: 'vbox',
								align:'stretch'
							},
							flex:1,
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									padding: '3px',
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											valore:0,
											margin:'0 0 0 8',
											html: 'CALZATURA'				
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
									items:[
										{
											xtype:'selectfield',
											itemId:'SelectCalzatura',reference:'SelectCalzatura',
											name:'calzatura',
											labelWidth: 130,
											width: 180,
											displayField: 'descrizione',
											queryMode: 'local',
											valueField: 'id',
											autoSelect: false,
											store:{
												type: 'risposteCbox'
											},
											cbaConfig: {
												campo:'CALZATURA'
											},
											listeners:{
												change: 'changeSelectCalzatura'
											}
										},
										{//TODO_PLS nascondi
											xtype: 'container',
											layout:{
												type: 'hbox',
												align: 'stretch'
											},
								            cbaConfig:{
												campo:'Calzatura - Allacciata/Slacciata'
											},
											hidden: true,
											itemId:'RadioCalzaturaCome',reference:'RadioCalzaturaCome',
											items: [
												{
													xtype: 'radiofield',
													boxLabel: 'ALLACCIATA',
													margin: '0 5 0 0',
													inputValue: true,
													name:'calzaturaAllacciata',
													cbaConfig: {
														deselezionabile: true
													}
												},
												{
													xtype: 'radiofield',
													boxLabel: 'SLACCIATA',
													inputValue: false,
													name:'calzaturaAllacciata',
													cbaConfig: {
														deselezionabile: true
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
							layout:{
								type:'vbox',
								align:'stretch'
							},
							flex:1,
							minHeight:90,
							margin:'5 0 0 0',
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '80%' : 300,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											cbahtml: 'QUANDO_UT_ERA_CADUTO',
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
									xtype:'container',
									itemId:'RadioTestimoni',reference:'RadioTestimoni',
									layout:{
										type:'hbox',
										align: 'center'
									},
									marign: '10 0 0 0',
									cbaConfig:{
										campo:'Presenza di testimoni'
									},
									items:[
										{
											xtype:'radiofield',
											boxLabel:'SOLO',
											margin: '0 5 0 0',
											name:'presenzaTestimoni',
											cbaConfig: {
										        deselezionabile: true
										    },
											inputValue:'F',
											labelClsExtra:'cbaCssLabel'
										},
										{
											xtype:'radiofield',
											boxLabel:'IN_PRES_TESTIMONI',
											name:'presenzaTestimoni',
											cbaConfig: {
										        deselezionabile: true
										    },
											inputValue:'T',
											labelClsExtra:'cbaCssLabel',
											listeners:{
												change: 'changeRadioTestimoni'
											}
										},
										{
											xtype: 'image',
											itemId:'ImgTestimoni',reference:'ImgTestimoni',
											src: 'resources/images/generali/addUser.svg',
											margin: '0 0 0 20',
											hidden: true,
											width: 30,
											height: 30
										}
									]
								},
								{
									xtype:'textfield',
									name:'testimonidiff',
									hidden:true,
									cbaConfig:{
										campo:'Presenza di testimoni'
									}
								},
										//TODO_PLS vedere se e come inserirla
//										{
//											xtype:'gridpanel',
//											flex:1,
//											itemId:'GridTestimoni', reference:'GridTestimoni',
//											store:Ext.create('CS.eventi.cadute.store.Testimoni'),
//											minHeight:200,
//											disabled:true,
//											border:'1px solid',
//											columns: [
//												{
//													xtype: 'gridcolumn',
//													dataIndex: 'id',
//													hidden: true
//												},
//												{ 
//										        	xtype: 'gridcolumn', 
//										        	text: 'COGNOME_NOME',
//										        	dataIndex:'nome',
//										        	width:250,
//										        	sortable:false,
//										        	editor: {
//														xtype: 'textfield',
//														allowBlank: false,
//														maxLength:80,
//														enforceMaxLength:true
//													}
//										        },
//										        { 
//										        	xtype: 'gridcolumn', 
//										        	text: 'QUALIFICA_GRADO',
//										        	dataIndex:'qualifica',
//										        	flex:1,
//										        	sortable:false,
//										        	editor: {
//														xtype: 'combobox',
//														store: Ext.create('CS.eventi.cadute.store.ComboTestimoni'),
//														queryMode: 'local',
//														displayField: 'valore',
//														valueField: 'valore',
//														allowBlank: false,
//														forceSelection: false,
//														itemId:'ComboQualificaTestimoni',reference:'ComboQualificaTestimoni'
//													}
//										        },
//										        { 
//										        	xtype: 'gridcolumn', 
//										        	text: 'OPERATORE',
//										        	dataIndex:'operatore',
//										        	width:130,
//										        	itemId:'CheckOperatori',reference:'CheckOperatori',
//										        	sortable:false,
//										        	inputValue: 'T',
//													uncheckedValue: 'F',
//										        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//														renderCheckColumn(metaData,value);
//													},
//													editor: {
//														xtype: 'checkbox',
//														labelWidth: 80,
//														checked: false,
//														inputValue: 'T',
//														uncheckedValue: 'F',
//														readOnly: true,
//														itemId:'CheckOperatore', reference:'CheckOperatore'
//													}
//										        }
//										     ],
//										     viewConfig: {
//												loadMask: false,
//												plugins: {
//													ptype: 'gridviewdragdrop'
//												}
//											},
//											plugins: [
//												Ext.create('Ext.grid.plugin.RowEditing', {
//													autoCancel: false,
//													errorSummary: false									
//												})												
//											],
//											dockedItems: [
//												{
//													xtype: 'toolbar',
//													dock: 'bottom',
//													items: 
//													[
//														{
//															xtype:'tbfill',
//															flex:1
//														},
//														{
//															xtype:'tbfill',
//															flex:1
//														},
//														{
//															xtype: 'button',
//															itemId: 'BtnNuovoGridTestimoni', reference: 'BtnNuovoGridTestimoni',
//															text: 'NUOVO',
//															cls: 'cbaCssBtnFunzione',
//															margin:'0 0 0 1'
//														},
//														{
//															xtype: 'button',
//															itemId: 'BtnEliminaGridTestimoni', reference: 'BtnEliminaGridTestimoni',
//															margin:'0 0 0 1',
//															cls: 'cbaCssBtnFunzione',
//															text: 'ELIMINA'
//														}
//													]
//												}
//											]
//										}
										
									]
								}
							]
						
						},
						//quinto
						{
							xtype:'container',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							margin:'20 0 0 0',
							modificaTerzi: true,
							items:[
								{
									xtype: 'cbaMultipleChoice',
									margin: '5 30 0 0',
									width: 90,
									itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
									layout: {
										type: 'hbox',
										align: 'center'
									},
									style: 'border: none !important',
									border: false,
									listeners:{
										choicechange: 'changeRadioContenzioni'
									},
									cbaConfig: {
										campo:'Patologia Acuta',
										itemsCfg: [
												{
													html: 'SI',
													style: 'font-size: 12px !important;padding-left: 6px !important;',
													cls: 'choice-round-unchecked-css-border2', 
													checkedClsPerson: 'choice-checked-css',
													name: 'patologiaAcuta', 
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: true,
													value: true,
													cbaInputValue: true,
													label: 'PATOLOGIA_ACUTA',
													labelAlign: 'left',
												},
												{    
													html: 'NO',
													style: 'padding-left: 3px !important;font-size: 12px !important;',
													checkedClsPerson: 'choice-checked-css', 
													cls: 'choice-round-unchecked-css-border2',
													name: 'patologiaAcuta',
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: false,
													value: false,
													cbaInputValue: false
												},
												
											],
											esclusivo: true  
									}
								
								},
//								{
//									xtype:'container',
//									layout:{
//										type:'hbox',
//										align:'stretch'
//									},
//									padding: 5,
//									margin: '0 0 20 0',
//									items:[
//										{
//											xtype:'label',
//											html: 'PATOLOGIA_ACUTA',
//											cls: 'labelStrong',
//											width: 116
//										},
//										{
//											xtype: 'container',
//											layout:{
//												type:'hbox',
//												align: 'stretch'
//											},
//								            cbaConfig:{
//												campo:'Patologia Acuta'
//											},
//								           	items: [
//												{
//													xtype: 'radiofield',
//													boxLabel: 'SI',
//													height: 20,
//													margin: '0 5 0 0',
//													inputValue: 'T',
//													name:'patologiaAcuta',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												},
//												{
//													xtype: 'radiofield',
//													boxLabel: 'NO',
//													height: 20,
//													inputValue: 'F',
//													name:'patologiaAcuta',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												}
//											]		
//										},
//									]
//									
//								},
								{
									xtype: 'cbaMultipleChoice',
									margin: '5 30 0 0',
									width: 90,
									itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
									layout: {
										type: 'hbox',
										align: 'center'
									},
									style: 'border: none !important',
									border: false,
									listeners:{
										choicechange: 'changeRadioContenzioni'
									},
									cbaConfig: {
										campo:'Demenza',
										itemsCfg: [
												{
													html: 'SI',
													style: 'font-size: 12px !important;padding-left: 6px !important;',
													cls: 'choice-round-unchecked-css-border2', 
													checkedClsPerson: 'choice-checked-css',
													name: 'demenza', 
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: true,
													value: true,
													cbaInputValue: true,
													label: 'DEMENZA',
													labelAlign: 'left',
												},
												{    
													html: 'NO',
													style: 'padding-left: 3px !important;font-size: 12px !important;',
													checkedClsPerson: 'choice-checked-css', 
													cls: 'choice-round-unchecked-css-border2',
													name: 'demenza',
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: false,
													value: false,
													cbaInputValue: false
												},
												
											],
											esclusivo: true  
									}
								
								},
//								{
//									xtype: 'container',
//									layout:{
//										type:'hbox',
//										align: 'stretch'
//									},
//									padding: 5,
//									margin: '0 0 20 0',
//									modificaTerzi: true,
//									items:[
//										{
//											xtype:'label',
//											html: 'DEMENZA',
//											cls: 'labelStrong',
//											width: 116
//										},
//										{
//											xtype: 'container',
//											layout:{
//												type:'hbox',
//												align: 'stretch'
//											},
//								            cbaConfig:{
//												campo:'Demenza'
//											},
//								           	items: [
//												{
//													xtype: 'radiofield',
//													boxLabel: 'SI',
//													height: 20,
//													margin: '0 5 0 0',
//													inputValue: 'T',
//													name:'demenza',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												},
//												{
//													xtype: 'radiofield',
//													boxLabel: 'NO',
//													height: 20,
//													inputValue: 'F',
//													name:'demenza',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												}
//											]		
//										}
//									]
//								},
								{
									xtype: 'cbaMultipleChoice',
									margin: '5 30 0 0',
									width: 90,
									itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
									layout: {
										type: 'hbox',
										align: 'center'
									},
									style: 'border: none !important',
									border: false,
									listeners:{
										choicechange: 'changeRadioContenzioni'
									},
									cbaConfig: {
										campo:'Demenza',
										itemsCfg: [
												{
													html: 'SI',
													style: 'font-size: 12px !important;padding-left: 6px !important;',
													cls: 'choice-round-unchecked-css-border2', 
													checkedClsPerson: 'choice-checked-css',
													name: 'sedazione', 
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: true,
													value: true,
													cbaInputValue: true,
													label: 'SEDAZIONE',
													labelAlign: 'left',
												},
												{    
													html: 'NO',
													style: 'padding-left: 3px !important;font-size: 12px !important;',
													checkedClsPerson: 'choice-checked-css', 
													cls: 'choice-round-unchecked-css-border2',
													name: 'sedazione',
													isFormField: true,
													layout: {
														type: 'vbox',
														align: 'center'
													},
													inputValue: false,
													value: false,
													cbaInputValue: false
												},
												
											],
											esclusivo: true  
									}
								
								},
//								{
//									xtype:'container',
//									layout:{
//										type:'hbox',
//										align:'stretch'
//									},
//									padding: 5,
//									margin: '0 0 20 0',
//									modificaTerzi: true,
//									items:[
//										{
//											xtype:'label',
//											html: 'SEDAZIONE',
//											cls: 'labelStrong',
//											width: 116
//										},
//										{
//											xtype: 'container',
//								            layout:{
//								            	type: 'hbox',
//								            	align: 'stretch'
//								            },
//								            cbaConfig:{
//												campo:'Sedazione'
//											},
//								           	items: [
//												{
//													xtype: 'radiofield',
//													boxLabel: 'SI',
//													height: 20,
//													margin: '0 5 0 0',
//													inputValue: 'T',
//													name:'sedazione',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												},
//												{
//													xtype: 'radiofield',
//													boxLabel: 'NO',
//													height: 20,
//													inputValue: 'F',
//													name:'sedazione',
//													cbaConfig: {
//														deselezionabile: true
//													}
//												}
//											]		
//										}
//									]
//								},
								{
									xtype:'container',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									padding: 5,
									modificaTerzi: true,
									items:[
										{
											xtype: 'cbaMultipleChoice',
											margin: '5 30 0 0',
											width: 90,
											itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
											layout: {
												type: 'hbox',
												align: 'center'
											},
											style: 'border: none !important',
											border: false,
											listeners:{
												choicechange: 'changeRadioContenzioni'
											},
											cbaConfig: {
												campo:'Demenza',
												itemsCfg: [
														{
															html: 'SI',
															style: 'font-size: 12px !important;padding-left: 6px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'cadutePrecedenti', 
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: true,
															value: true,
															cbaInputValue: true,
															label: 'CADUTE_PRECEDENTI',
															labelAlign: 'left',
														},
														{    
															html: 'NO',
															style: 'padding-left: 3px !important;font-size: 12px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'cadutePrecedenti',
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: false,
															value: false,
															cbaInputValue: false
														},
														
													],
													esclusivo: true  
											}
										
										},
//											{
//												xtype:'container',
//												layout:{
//													type:'hbox',
//													align:'stretch'
//												},
//												items:[
//													{
//														xtype:'label',
//														html: 'CADUTE_PRECEDENTI',
//														cls: 'labelStrong',
//														width: 116
//													},
//													{
//														xtype: 'container',
//											            layout:{
//											            	type: 'hbox',
//											            	align: 'stretch'
//											            },
//											            cbaConfig:{
//															campo:'Cadute Precedenti'
//														},
//														itemId:'RadioCadutePrec',reference:'RadioCadutePrec',
//											           	items: [
//															{
//																xtype: 'radiofield',
//																boxLabel: 'SI',
//																height: 20,
//																margin: '0 5 0 0',
//																inputValue: 'T',
//																name:'cadutePrecedenti',
//																cbaConfig: {
//																	deselezionabile: true
//																},
//																listeners:{
//																	change: 'changeRadioCadutePrec'
//																}
//															},
//															{
//																xtype: 'radiofield',
//																boxLabel: 'NO',
//																height: 20,
//																inputValue: 'F',
//																name:'cadutePrecedenti',
//																cbaConfig: {
//																	deselezionabile: true
//																},
//																listeners:{
//																	change: 'changeRadioCadutePrec'
//																}
//															}
//														]		
//													},
//												]
//											},
											{
												xtype:'label',
												itemId:'DataUltimaCaduta',reference:'DataUltimaCaduta',
												margin:'5 0 0 0',
												hidden:true,
												
											}
										]
									},	
									{
										xtype:'textfield',
										name:'cadutePrecedentiQuando',
										maxHeight:20,
										width: '90%',
										label:'NOTE',
										margin:'0 0 0 10',
										maxLength:100,
										enforceMaxLength:true
									}
								]
							},//TODO_PLS schede di valutazione
							//sesto
							{
								xtype:'container',
								layout:{
									type: 'vbox',
									align:'stretch'
								},
								flex:1,
								margin: '20 0 0 0',
								minHeight:170,
								items:[
									{
										xtype:'container',
										layout:{
											type:'hbox',
											align:'stretch'
										},
										cls: 'headerFormSchede',
										width: Ext.is.Phone? '80%' : 300,
										items:[
											{	
												xtype:'label',
												cls:'cbaCssLabelTitolo',
												html: 'FARMACI_ASSUNTI',
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
										xtype:'container',
										itemId:'CheckFarmaciAssunti',reference:'CheckFarmaciAssunti',
										layout:{
											type: 'vbox',
											align: 'stretch'
										},
//										scrollable:true,
//										maxHeight:170,
										flex:1,
										items:[],
										cbaConfig:{
											campo:'Farmaci Assunti'
										}
									}
								]
							},
							//settimo
							{
								xtype:'container',
								layout:{
									type:'vbox',
									align:'stretch'
								},
								flex:1,
								margin: '20 0 0 0',
								minHeight: 150,
								maxHeight:240,
								items:[
									{
										xtype:'container',
										layout:{
											type:'hbox',
											align:'stretch'
										},
										cls: 'headerFormSchede',
										width: Ext.is.Phone? '80%' : 300,
										items:[
											{	
												xtype:'label',
												cls:'cbaCssLabelTitolo',
												html: 'PROVVEDIMENTI_ADOTTATI',
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
										xtype:'container',
										itemId:'CheckProvvedimenti',reference:'CheckProvvedimenti',
										scrollable:true,
										maxHeight:163,
										columns:1,
										items:[],
										cbaConfig:{
											campo:'Provvedimenti Adottati'
										}
									}
								]
							},
							//ottavo
							{
								xtype:'container',
								layout:{
									type:'vbox',
									align:'stretch'
								},
								margin: '20 0 0 0',
								flex:1,
								minHeight:240,
								items:[
									{
										xtype:'container',
										layout:{
											type:'hbox',
											align:'stretch'
										},
										cls: 'headerFormSchede',
										width: Ext.is.Phone? '80%' : 300,
										items:[
											{	
												xtype:'label',
												cls:'cbaCssLabelTitolo',
												html: 'NOTE'				
											}
										
										]
									},
									{
										xtype:'textareafield',
										title:'NOTE',
										itemId:'Note',reference:'Note',
										flex:1,
										cls: 'cbaTextArea',
										name:'provvedimenti',
										cbaConfig:{
											
											campo:'Note - Provvedimenti adottati'
										}
									}
							]
						},
						//nono
						{
							xtype: 'cbaMultipleChoice',
							margin: '5 30 0 0',
							width: 90,
							itemId: 'RadioPresOstacoli', reference: 'RadioPresOstacoli',
							layout: {
								type: 'hbox',
								align: 'center'
							},
							style: 'border: none !important',
							border: false,
							listeners:{
								choicechange: 'changeRadioContenzioni'
							},
							cbaConfig: {
								campo:'Invio Pronto Soccorso',
								itemsCfg: [
										{
											html: 'SI',
											style: 'font-size: 12px !important;padding-left: 6px !important;',
											cls: 'choice-round-unchecked-css-border2', 
											checkedClsPerson: 'choice-checked-css',
											name: 'prontoSoccorso', 
											isFormField: true,
											layout: {
												type: 'vbox',
												align: 'center'
											},
											inputValue: true,
											value: true,
											cbaInputValue: true,
											label: 'INVIO_PRONTO_SOCC',
											labelAlign: 'left',
										},
										{    
											html: 'NO',
											style: 'padding-left: 3px !important;font-size: 12px !important;',
											checkedClsPerson: 'choice-checked-css', 
											cls: 'choice-round-unchecked-css-border2',
											name: 'prontoSoccorso',
											isFormField: true,
											layout: {
												type: 'vbox',
												align: 'center'
											},
											inputValue: false,
											value: false,
											cbaInputValue: false
										},
										
									],
									esclusivo: true  
							}
						
						},
//						{
//							xtype: 'container',
//				            layout:{
//				            	type: 'hbox',
//				            	align: 'center'
//				            },
//				            cbaConfig:{
//								campo:'Invio Pronto Soccorso'
//							},
//				           	items: [
//				           		{
//				           			xtype: 'label',
//				           			html: 'INVIO_PRONTO_SOCC'
//				           		},
//								{
//									xtype: 'radiofield',
//									boxLabel: 'SI',
//									margin: '0 5 0 0',
//									inputValue: 'T',
//									name:'prontoSoccorso',
//									cbaConfig: {
//										deselezionabile: true
//									}
//								},
//								{
//									xtype: 'radiofield',
//									boxLabel: 'NO',
//									inputValue: 'F',
//									name:'prontoSoccorso',
//									cbaConfig: {
//										deselezionabile: true
//									}
//								}
//							]		
//						
//						},
						{
							xtype:'container',
							layout:{
								type:'hbox',
								align:'center'
							},
							margin: '20 0 20 0',
							modificaTerzi: true,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align:'stretch'
									},
									cls: 'headerFormSchede',
									width: Ext.is.Phone? '65%' : 300,
									height: 20,
									items:[
										{	
											xtype:'label',
											cls:'cbaCssLabelTitolo',
											html: 'OPERATORI_INTERVENUTI'				
										}
									
									]
								},
								{
									xtype: 'image',
									src: 'resources/images/generali/addOperator.svg',
									width: 40,
									height: 40
								}
							]
						}
					]
				}
			]
});
