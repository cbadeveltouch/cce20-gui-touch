
Ext.define('CS.eventi.contenzioni.Contenzioni',{
    extend: 'Ext.Container',

    requires: [
        'CS.eventi.contenzioni.ContenzioniController',
        'Ext.grid.plugin.Editable',
        'CS.eventi.contenzioni.ComboMedico',
        'CS.eventi.contenzioni.FasceOrarie'
    ],

    controller: 'cartella-eventi-contenzioni-contenzioni',
    
    items:[
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
					title:'CONTENZIONI',
					itemId:'TabContenzioni', reference:'TabContenzioni',
					layout:{
						type:'vbox',
						align:'stretch'
					},
					scrollable: true,
					listeners:{
						activeItemchange: 'beforetabchangeTabPanel'
					},
					items:[
						{
							xtype:'CbaForm',
							itemId:'Form',reference:'Form',
							cls:'cbaCssForm',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							scrollable: true,
							border:false,
							items:[
								{
									xtype: 'textfield',
									name:'id',
									hidden: true	
								},
								{
									xtype: 'numberfield',
									name: 'codOspite',
									hidden: true
								},
								{
									xtype: 'numberfield',
									name: 'compilatore',
									hidden: true
								},
								{
									xtype: 'textfield',
									itemId:'CampoDirty',reference:'CampoDirty',
									name:'campoDirty',
									hidden: true
								},
								{
									xtype:'container',
									layout:{
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									minHeight:230,
									items:[
										{
											xtype:'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											flex:1,
//											maxWidth:430,
//											minWidth:430,
											margin: Ext.is.Phone ? null : '0 15 0 0',
											items:[
												{
													xtype: 'label',
													cbahtml: 'CHI_INFORMATO',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'container',
													layout:{
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align:'stretch'
													},
													margin: '5 0 0 0',
													items:[
														{
															xtype:'container',
															layout:{
																type:'hbox',
																align:'stretch'
															},
															width: 340,
															margin: '5 0 0 0',
															items:[
																 {
																	xtype: 'cbaMultipleChoice',
																	margin: '-5 0 0 0',
																	width: 90,
																	itemId: 'RadioOspiteInfo', reference: 'RadioOspiteInfo',
																	layout: {
																		type: 'hbox',
																		align: 'center',
																		pack: 'center'
																		
																	},
																	style: 'border: none !important',
																	border: false,
																	listeners:{
																		choicechange: 'changeRadioOspiteInfo'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: 'SI',
																					style: 'font-size: 12px !important;padding-left: 6px !important;',
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'ospiteInformato', 
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'T',
																					cbaInputValue: 'T',
																					label: 'UTENTE',
																					labelAlign: 'left'
																				},
																				{    
																					html: 'NO',
																					style: 'padding-left: 3px !important;font-size: 12px !important;',
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'ospiteInformato',
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'F',
																					cbaInputValue: 'F'
																				},
																				
																			],
																			esclusivo: true  
																	}
																}
															]
														},
														{
															xtype:'textfield',
															label: 'PERCHE',
															labelAlign: Ext.is.Phone ? 'left': 'top',
															hidden:true,
															minWidth:162,
															maxLength:100,
															maxHeight:20,
															enforceMaxLength:true,
															margin:'10 0 0 0',
															maxWidth: 255,
															flex:1,
															itemId:'TxtPercheOspiteInfo',reference:'TxtPercheOspiteInfo',
															name:'ospiteAffettoDa'
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align:'stretch'
													},
													margin: '5 0 0 0',
													items:[
														{
															xtype:'container',
															layout:{
																type:'hbox',
																align:'stretch'
															},
															margin: '17 0 0 0',
															width: 340,
															items:[
																{
																	xtype: 'cbaMultipleChoice',
																	margin: '-5 0 0 0',
																	width: 90,
																	itemId: 'RadioFamInformato', reference: 'RadioFamInformato',
																	layout: {
																		type: 'hbox',
																		align: 'center',
																		pack: 'center'
																		
																	},
																	style: 'border: none !important',
																	border: false,
																	listeners:{
																		choicechange: 'changeRadioFamInformato'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: 'SI',
																					style: 'font-size: 12px !important;padding-left: 6px !important;',
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'familiareInformato', 
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'T',
																					cbaInputValue: 'T',
																					label: 'FAMILIARE',
																					labelAlign: 'left'
																				},
																				{    
																					html: 'NO',
																					style: 'padding-left: 3px !important;font-size: 12px !important;',
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'familiareInformato',
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'F',
																					cbaInputValue: 'F'
																				},
																				
																			],
																			esclusivo: true  
																	}
																}
															]
														},
														{
															xtype:'textfield',
															name:'familiareNonInf',
															label: 'PERCHE',
															labelAlign: Ext.is.Phone ? 'left': 'top',
															hidden:true,
															itemId:'TxtFamInformato',reference:'TxtFamInformato',
															margin:' 0 0 0 5',
															flex:1,
															minWidth:162,
															maxWidth: 255,
															maxLength:100,
															enforceMaxLength:true
														}
														
													]
												},
												{
													xtype:'container',
													layout:{
														type: Ext.is.Phone ? 'vbox' : 'hbox',
														align:'stretch'
													},
													margin: '5 0 0 0',
													items:[
														{
															xtype:'container',
															layout:{
																type:'hbox',
																align:'stretch'
															},
															margin: '10 0 0 0',
															width: 340,
															items:[
																{
																	xtype: 'cbaMultipleChoice',
																	margin: '-5 0 0 0',
																	width: 90,
																	itemId: 'RadioTutorInfo', reference: 'RadioTutorInfo',
																	layout: {
																		type: 'hbox',
																		align: 'center',
																		pack: 'center'
																		
																	},
																	style: 'border: none !important',
																	border: false,
																	listeners:{
																		choicechange : 'changeRadioTutorInfo'
																	},
																	cbaConfig: {
																		itemsCfg: [
																				{
																					html: 'SI',
																					style: 'font-size: 12px !important;padding-left: 6px !important;',
																					cls: 'choice-round-unchecked-css-border2', 
																					checkedClsPerson: 'choice-checked-css',
																					name: 'tutorInformato', 
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'T',
																					cbaInputValue: 'T',
																					label: 'TUTOR',
																					labelAlign: 'left'
																				},
																				{    
																					html: 'NO',
																					style: 'padding-left: 3px !important;font-size: 12px !important;',
																					checkedClsPerson: 'choice-checked-css', 
																					cls: 'choice-round-unchecked-css-border2',
																					name: 'tutorInformato',
																					isFormField: true,
																					layout: {
																						type: 'vbox',
																						align: 'center'
																					},
																					inputValue: 'F',
																					cbaInputValue: 'F'
																				},
																				
																			],
																			esclusivo: true  
																	}
																
																}
															]
														},
														{
															xtype:'textfield',
															name:'tutorNonInformato',
															label: 'PERCHE',
															labelAlign: Ext.is.Phone ? 'left': 'top',
															hidden:true,
															itemId:'TxtTutorInfo',reference:'TxtTutorInfo',
															margin:' 0 0 0 5',
															maxWidth: 255,
															flex:1,
															minWidth:162,
															maxLength:100,
															enforceMaxLength:true
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
											margin:'20 0 0 5',
//											minHeight:240,
											items:[
												{
													xtype: 'label',
													html: 'CONSENSO_INFORMATO',
													cls:'cbaCssLabelTitolo'
												},
												{
													xtype: 'cbaMultipleChoice',
													margin: '0 0 0 0',
													width: 90,
													itemId: 'RadioConsenso', reference: 'RadioConsenso',
													layout: {
														type: 'hbox',
														align: 'center',
														pack: 'center'
														
													},
													style: 'border: none !important',
													border: false,
													listeners:{
														choicechange: 'changeRadioConsenso'
													},
													cbaConfig: {
														itemsCfg: [
																{
																	html: 'SI',
																	style: 'font-size: 12px !important;padding-left: 6px !important;',
																	cls: 'choice-round-unchecked-css-border2', 
																	checkedClsPerson: 'choice-checked-css',
																	name: 'consenso', 
																	isFormField: true,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	inputValue: 'T',
																	cbaInputValue: 'T'
																},
																{    
																	html: 'NO',
																	style: 'padding-left: 3px !important;font-size: 12px !important;',
																	checkedClsPerson: 'choice-checked-css', 
																	cls: 'choice-round-unchecked-css-border2',
																	name: 'consenso',
																	isFormField: true,
																	layout: {
																		type: 'vbox',
																		align: 'center'
																	},
																	inputValue: 'F',
																	cbaInputValue: 'F'
																},
																
															],
															esclusivo: true  
													}
												
												},
												{
													xtype: 'container',
													layout: {
														type: 'vbox',
														align: 'center',
														pack: 'center'
													},
													maxWidth: 140,
													margin: '15 5 5 5',
													hidden: true,
													items: [
														{
															xtype: 'button',
															itemId: 'BtnAllegati', reference: 'BtnAllegati',
															text: 'ALLEGATI',
															margin: '5 0 5 0',
															cls: 'cbaCssBtnFunzione',
//															maxWidth: 127,
															nonDisabilitare: true,
															listeners: {
																painted: function(th) {
																	var el = th.el,
																		innerSpan = el.query('span');
																	
																	Ext.each( innerSpan, function(cmp) {
																		if ( cmp.classList.contains('x-btn-inner') != -1 ) {
																			cmp.style.margin = '0px 5px 0px 0px';
																		}
																	});
																},
																tap: 'tapBtnAllegati'
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
													margin:'10 5 0 0',
													itemId:'FieldStatoNec',reference:'FieldStatoNec',
													hidden:true,
													items:[
														{
															xtype:'radiofield',
															cbahtml:'STATO_NECESSITA',
															labelAlign:'right',
															labelWidth:170,
															width: 200,
															name:'mancatoConsenso',
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue:'0',
															value: '0',
															labelClsExtra:'cbaCssLabel'
														},
														{
															xtype:'radiofield',
															cbahtml:'NON_ANCORA_INTERDETTO',
															labelAlign:'right',
															name:'mancatoConsenso',
															labelWrap: true,
															labelWidth:250,
															width: 280,
															cbaConfig: {
														        deselezionabile: true
														    },
															inputValue:'1',
															value: '1',
															labelClsExtra:'cbaCssLabel'
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
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									margin: '20 0 0 0',
									minHeight:170,
									items:[
										{
											xtype: 'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											margin: Ext.is.Phone ? null : '0 15 0 0',
											flex:1,
											items:[
												{
													xtype: 'label',
													html: 'ALTERNATIVE_RIC',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'textareafield',
													cls: 'cbaTextArea',
//													labelAlign: 'top',
//													label:'ALTERNATIVE_RIC',
//													labelCls: 'cbaCssLabelTitolo',
													flex:1,
													name:'alternative',
													margin:'0 5 0 0'
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
											margin:'20 5 0 0',
											items:[
												{
													xtype: 'label',
													html: 'MOTIVO_CONTENZIONE',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'container',
													itemId:'CheckMotivoCont',reference:'CheckMotivoCont',
													margin: '5 0 0 0',
													layout:{
														type:'vbox',
														align: 'stretch'
													},
													items:[]
												}
											]
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									minHeight:170,
									margin:'20 0 0 0',
									items:[
										{
											xtype:'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											margin: Ext.is.Phone ? null : '0 15 0 0',
											flex:1,
											items:[
												{
													xtype:'label',
													html: 'MEZZI_CONTENZIONE',
													cls:'cbaCssLabelTitolo'
												},
												{
													xtype:'container',
													itemId:'CheckMezziCont',reference:'CheckMezziCont',
													layout:{
														type:'vbox',
														align: 'stretch'
													},
													items:[]
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
											margin:'20 5 0 5',
											items:[
												{
													xtype:'label',
													html: 'MEDICO_PRESCRITTORE',
													cls:'cbaCssLabelTitolo'
												},
												{
													xtype: 'selectfield',
													store: {
														type: 'medico'
													},
													name:'medicoPrescr',
													itemId:'ComboMedico',reference:'ComboMedico',
													queryMode: 'local',
													displayField: 'valore',
													valueField: 'codice',
													autoselect: false,
													maxWidth: 400,
													margin: '0 0 0 5'
												}
											]
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: Ext.is.Phone? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									minHeight:170,
									margin:'20 0 0 0',
									items:[
										{
											xtype:'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											flex:1,
											margin: Ext.is.Phone ? '0 5 0 0' : '0 15 0 0',
											items:[
												{
													xtype: 'label',
													html: 'INIZIO_FINE_CONT',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'datepickerfield',
				                                    label:'INIZIO',
				                                    labelClsExtra: 'cbaCssLabel',
				                                    labelWidth:70,
				                                    maxHeight:20,
				                                    maxWidth:250,
				                                    name:'dataInizio',
				                                    margin:'10 5 0 0',
				                                    dateFormat: 'd/m/Y',
				                                    itemId:'DataInizioCont',reference:'DataInizioCont'
				                                },
												{
													xtype:'datepickerfield',
													label:'FINE',
				                                    labelClsExtra: 'cbaCssLabel',
				                                    maxHeight:20,
				                                    labelWidth:70,
				                                    maxWidth:250,
				                                    name:'dataFine',
				                                    itemId:'DataFineCont',reference:'DataFineCont',
				                                    margin:'20 5 0 0',
				                                    dateFormat: 'd/m/Y',
				                                    nonDisabilitare:true
												},
												{
													xtype:'label',
													itemId:'LabelCompilatoreData',reference:'LabelCompilatoreData',
													margin:'25 0 10 0'
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
											margin:'0 0 0 5',
											items:[
												{
													xtype: 'label',
													html: 'DET_FASCE_ORARIE',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'grid',
//						                            height:100,
						                            itemId:'GridFasceOrarie', reference:'GridFasceOrarie',
						                            margin:'5 0 0 0',
						                            deferRowRender: false,
						                            nonDisabilitare:true,
						                            width: '90%',
						                            //disabled:true,
						                            emptyText: StdCba.traduci('NESSUN_DATO_TROVATO_RICERCA'),
						                            store:{
						                            	type: 'fasceOrarie'
						                            },
						                            flex:1,
						                            listeners:{
						                            	childdoubletap: 'rowtap'
						                            },
						                            columns: [
						                                {
						                                    xtype: 'gridcolumn',
						                                    dataIndex: 'id',
						                                    hidden:true
						                                },
						                                {
						                                    xtype: 'gridcolumn',
						                                    dataIndex: 'idTe',
						                                    hidden:true
						                                },
						                                { 
						                                    xtype: 'datecolumn', 
						                                    text: 'DALLE',
						                                    dataIndex:'inizio',
						                                    sortable:false,
						                                    width:144,
						                                    format : 'H:i',
						                                    editable: true,
						                                    editor:{
						                                    	xtype: 'datefield',
//														        name: 'inizio',
														        minValue: '00:00',
														        maxValue: '23:59',
														        increment: 15,
														        anchor: '100%',
																dateFormat : 'H:i',
											                    inputType: 'time',
											                    triggers: false,
											                    picker: null,
											                    edgePicker: null,
						                                    }
						                                },
						                                {
						                                    xtype: 'datecolumn',
						                                    text: 'ALLE',
						                                    dataIndex: 'fine',
						                                    flex:1,
						                                    sortable:false,
						                                    format : 'H:i',
						                                    editable: true,
						                                    editor:{
						                                    	xtype: 'datefield',
//														        name: 'fine',
														        increment: 15,
														        anchor: '100%',
																dateFormat : 'H:i',
											                    inputType: 'time',
											                    triggers: false,
											                    picker: null,
											                    edgePicker: null,
						                                    }
						                                },
						                                {
						                                    xtype: 'column',
						                                    itemId: 'ColumnElimina', reference: 'ColumnElimina',
						                                    encodeHtml: false, 
						                                    width: 50,
						                                    cell:{
						                                    	encodeHtml: false, 
					                                    	   renderer: function (value, record) {
					                                    		   var grid = this.up('grid');
					                                    		   var id = Ext.id();
				                                    	   		   Ext.defer(function () {
				                                    	   			   Ext.widget('image', {
						                                                   renderTo: id,
						                                                   cls: 'icon-elimina',
						                                                   width: 20,
						                                                   height: 20,
						                                                   cbaConfig:{
						                                                	   grid: grid
						                                                   },
						                                                   listeners: { 
						                                                	  tap: function(th){
						                                                		  let form = th.cbaConfig.grid.up('#Form');
						                                                		  let me = form.controller
						                                                		  var grid= me.lookupReference('GridFasceOrarie');
						                                                			if(!me.lookupReference('Form').dirty_oldIsDirty){
						                                                				me.lookupReference('CampoDirty').setValue(new Date());
						                                                				me.formDirty = true;
						                                                			}
						                                                			
						                                                			var model = grid._selectable._selection._selectionModel; 
						                                                			var rec = model._selectedRecord;
						                                                			if(rec){
						                                                				StdCba.Messaggio('ATTENZIONE',StdCba.traduci('ELIMINA_RECORD')+'?','YESNO','QUESTION', false, 
						                                                					function(){	
						                                                						grid.getStore().remove(rec);
						                                                					},
						                                                					function(){
						                                                						return false;
						                                                					}
						                                                				);
						                                                			}
						                                                	  }
					                                                	   }
						                                               });   
				                                    	   		   },50);
					                                    		   
					                                    		   return Ext.String.format('<div id="{0}"></div>', id);
					                                    	   }
						                                    }
						                                }
						                             ],
						                             viewConfig: {                  
						                                loadMask: false
						                            },
						                            items: [{
						                                docked: 'bottom',
						                                xtype: 'toolbar',
						                                defaults: {
						                                    margin: '0 10 0 0'
						                                },
						                                items: [
						                                	{
																xtype:'spacer',
																flex:1
															},
															{
																xtype:'spacer',
																flex:1
															},
															{
																xtype: 'image',
																itemId: 'BtnNuovoGridFasceOr', reference: 'BtnNuovoGridFasceOr',
																cls: 'icon-piu',
																width: 30,
																height: 30,
																margin:'0 5 0 1',
																listeners:{
																	tap: 'clickBtnNuovoGridFasceOr'
																}
															}
					                                	]
						                            }]
												}
											]
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									minHeight:170,
									margin:'20 0 0 0',
									items:[
										{
											xtype:'container',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											flex:1,
											margin: Ext.is.Phone ? '0 5 0 0' : '0 15 0 0',
											items:[
												{
													xtype: 'label',
													html: 'QUANDO_UTENTE_CONTENZIONATO',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'container',
													itemId:'CheckQuandoUtConv',reference:'CheckQuandoUtConv',
													layout:{
														type: 'vbox',
														align: 'stretch'
													},
													items:[]
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
											margin:'0 0 0 5',
											items:[
												{
													xtype: 'label',
													html: 'REVISIONE_TRA',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align:'center'
													},
													flex:1,
													items:[
														{	
															xtype: 'numberfield',
															itemId: 'NbfRevisione', reference: 'NbfRevisione',
															name: 'nrevisioni',
															maxLength: 3,
															enforceMaxLength:true,
															labelClsExtra: 'cbaLabel',
															allowBlank: true,
															maxHeight:20,
															maxWidth:80,
															listeners:{
																change: 'changeNbfRevisione'
															}
														},
														{
															xtype:'container',
															layout:{
																type:'hbox',
																align: 'stretch'
															},
															margin:'0 0 0 20',
															itemId:'RadioRevGiorniMesi',reference:'RadioRevGiorniMesi',
															items:[
																{
																	xtype:'radiofield',
																	boxLabel:'GIORNI',
//																	labelWidth:45,
																	name:'tipoRevisioni',
																	cbaConfig: {
																        deselezionabile: true
																    },
																	inputValue:'0',
																	value: '0',
																	labelClsExtra:'cbaCssLabel',
																	listeners:{
																		change: 'changeRadioRevGiorniMesi'
																	}
																},
																{
																	xtype:'radiofield',
																	boxLabel:'MESI',
																	margin:'0 0 0 5', 
																	name:'tipoRevisioni',
//																	labelWidth:40,
																	cbaConfig: {
																        deselezionabile: true
																    },
																	inputValue:'1',
																	value: '1',
																	labelClsExtra:'cbaCssLabel',
																	listeners:{
																		change: 'changeRadioRevGiorniMesi'
																	}
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
													margin:'10 0 10 0',
													flex:1,
													items:[
														{
															xtype:'checkboxfield',
		        											boxLabel:'ULTIMO_GG_MESE',
		        											name:'fineMese',
												        	inputValue: true,
												        	value: true,
															labelClsExtra:'cbaCssLabel',
															itemId:'CheckUltimoGGMese',reference:'CheckUltimoGGMese',
															hidden:true,
															listeners:{
																change: 'changeCheckUltimoGGMese'
															}
														},
														{
															xtype:'label',
															itemId:'DataRevisione',reference:'DataRevisione',
															cls:'cbaCssLabel',
															margin:'5 0 0 5'
														}
													]
												},
												{
													xtype:'container',
													layout:{
														type:'hbox'
													},
													itemId:'CntAgenda',reference:'CntAgenda',
													margin:'0 0 0 5',
													items:[
														   
														{	
															xtype: 'image',
															margin:'0 5 0 0',
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
															//name:'slider',
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
												}
											]
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									flex:1,
									minHeight:210,
									margin:'5 0 0 0',
									items:[
										{
											xtype:'textareafield',
											cls: 'cbaTextArea',
											label:'NOTE',
											labelAlign: 'top',
											itemId:'Note',reference:'Note',
											flex:1,
											name:'motivazione',
											margin: Ext.is.Phone ? '0 5 0 0' : '10 15 0 0'
										},
										{
											xtype:'container',
											title:'MONITORAGGIO',
											layout:{
												type:'vbox',
												align:'stretch'
											},
											flex:1,
											margin:'10 0 0 5',
											items:[
												{
													xtype: 'label',
													html: 'MONITORAGGIO',
													cls: 'cbaCssLabelTitolo'
												},
												{
													xtype:'checkboxfield',
        											boxLabel:'SI',
        											name:'monitoraggio',
										        	inputValue: true,
										        	value: true,
													labelClsExtra:'cbaCssLabel',
													itemId:'CheckMonitoraggio',reference:'CheckMonitoraggio',
													listeners:{
														change: 'changeCheckMonitoraggio'
													}
													
												},
												{
													xtype:'textareafield',
													cls: 'cbaTextArea',
													flex:1,
													itemId:'NoteMonitoraggio',reference:'NoteMonitoraggio',
													cls: 'cbaTextArea',
													hidden:true,
													name:'monitoraggioNote'
												},
												{
													xtype: 'button',
													text: 'PROGR_ATTIVITA',
													margin:'0 0 0 1',
													cls: 'cbaCssBtnFunzione',
													hidden:true,
													itemId:'BtnAttivita',reference:'BtnAttivita',
													maxWidth:228
												}
											]
										}
									]
								},
								{
									xtype:'container',
//									title:'PERSON_ASSISTENTE',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									minHeight:70,
									margin:'20 0 25 0',
									items:[
										{
											xtype: 'label',
											html: 'PERSON_ASSISTENTE',
											cls: 'cbaCssLabelTitolo'
										},
										{
											xtype: 'textfield',
											name: 'controllo'
									    }
									]
								}
							]
						}
					]
				},
				{
					title:'NOTE',
					itemId:'TabNote', reference:'TabNote',
					layout:{
						type:'vbox',
						align:'stretch'
					},
					flex: 1,
					listeners:{
						activeItemchange: 'beforetabchangeTabPanel'
					},
					items:[
						{
							xtype:'container',
							layout:{
								type:'vbox',
								align:'stretch'
							},
							flex:1,
							itemId:'CntNote',reference:'CntNote',
							items:[]
						}
					]
				}
			]
		}
	
    ]
});
