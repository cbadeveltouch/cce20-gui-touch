
Ext.define('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.PanelConsegne',{
    extend: 'Ext.Container',

    requires: [
        'CS.cruscottoOperatore.calendarioConsegne.panelConsegne.PanelConsegneController'
    ],

    controller: 'cartella-cruscottooperatore-calendarioconsegne-panelconsegne',
    
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    flex: 1,
    items: [
		{
			xtype: 'formpanel',
			itemId: 'Form', reference: 'Form',
			layout: {
				type:'hbox',
				align:'stretch'
			},
			cls:'cbaBorderPanel',
			margin: '0 0 16 0',
			style:{
				border: 'solid 1px #5fa2dd'
			},
			flex:1,
			items:[
				{
					xtype: 'textfield',
					itemId: 'TextfieldID', reference: 'TextfieldID',
					name: 'id',
					hidden: true
			   },
		       {
				   xtype: 'container',
				   layout: {
					   type: 'vbox',
					   align: 'stretch'
				   },
				   flex: 1,
				   maxWidth: 60,
				   plugins: 'responsive',
				   responsiveConfig:{
				   	 	'phone': {
				   	 		maxWidth: 50
				   	 	},
				        'tablet': {
				        	maxWidth: 80
				         }
			       },
				   items:[
						{
							 xtype: 'container',
							 itemId: 'ContainerTipoConsegna', reference: 'ContainerTipoConsegna',
							 layout: {
								 type:'vbox',
								 align: 'stretch'
							 },
							 margin: '5 10 5 10',
							 plugins: 'responsive',
							 maxHeight: 60,
							 minWidth: 55,
							 responsiveConfig:{
								 'phone': {
									 margin: '10 2 5 2',
									 maxHeight: 55,
									 minWidth: 45
								 },
								 'tablet': {
									 margin: '5 10 5 10',
									 maxHeight: 65,
									 minWidth: 55
								 }
							 },
							 flex: 1,
							 cls: 'cbaConsegneNonLette',
							 items:[
							        {
							        	xtype: 'container',
							        	itemId: 'ImageTipoConsegna', reference: 'ImageTipoConsegna',
							        	layout:{
							        		type: 'vbox',
							        		align:'end',
							        		pack: 'right'
							        	},
							        	maxHeight: 50,
							        	maxWidth: 50,
							        	height: 50,
							        	width: 50,
							        	plugins: 'responsive',
										responsiveConfig:{
											'width < 800': {
												maxHeight: 45,
									        	maxWidth: 35,
									        	height: 50,
									        	width: 35
											},
											'width >= 800': {
												maxHeight: 55,
									        	maxWidth: 55,
									        	height: 55,
									        	width: 55
											}
										},
										listeners:{
											element: 'element',
											tap: 'tapContainerTipoConsegna'
										},
										items:[
										       {
										    	   xtype: 'spacer'
										       },
										       {
										    	   	xtype: 'image',
										        	itemId: 'ContainerBusta', reference: 'ContainerBusta',
										        	height: 20,
										        	width: 20,
										        	src:'resources/images/generali/busta.svg',
										        	hidden:true
										       }
										]
							        }
					         ]
						},
				   ]
				},
			    {
			    	 xtype:'container',
			    	 layout:{
			    		 type: 'vbox',
			    		 align: 'stretch'
			    	 },
			    	 flex:1,
			    	 border: false,
			    	 items:[
		    	        {
		    	        	xtype: 'container',
		    	        	itemId: 'HeaderPannello', reference: 'HeaderPannello',
		    	        	layout: {
		    	        		type: 'hbox',
		    	        		align: 'stretch'
		    	        	},
		    	        	cls: 'headerFormCosegne',
		    	        	width: '100%',
							items:[
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									padding: 5,
									flex:1,
									plugins: 'responsive',
								        responsiveConfig:{
								        	 'phone': {
								                     layout: {
								                         type: 'vbox',
								                         align: 'stretch'
								                     }
								             },
								             'tablet': {
									            	 layout: {
								                         type: 'hbox',
								                         align: 'stretch'
								                     }
								             }
								    },
									items:[
									    {
								        	xtype: 'container',
								        	layout: {
								        		type:'hbox',
								        		align: 'stretch'
								        	},
								        	items:[
												{
													xtype: 'image',
													itemId: 'ImagePromemoria', reference: 'ImagePromemoria',
													src: 'resources/images/generali/cyrcle.svg',
													cls: 'css-grigio',
													width: 15,
													height: 15,
													listeners:{
														tap: 'tapMenuPromemoria'
													}
												},
												{
													xtype: 'image',
													src: 'resources/images/generali/user.png',
													margin: '5 2 0 5',
													maxHeight: 18,
													width: 18,
													hidden: false
												},
												{
													xtype: 'label',
													itemId: 'LabelUtente', reference: 'LabelUtente',
													name: 'ospiteNominativo',
													width: '95%',
												    padding: '5px 5px',
													cls: 'cbaCssLabelTitolo'
												},  
								        	]
								        },
								        {
											xtype: 'container',
											layout: {
												type: 'hbox',
												align: 'stretch',
												pack: 'end'
											},
											plugins: 'responsive',
										    responsiveConfig:{
										   	 	'phone': {
											   	 	layout: {
														type: 'hbox',
														align: 'stretch',
														pack: 'start'
													},
										   	 	},
										        'tablet': {
											        	layout: {
															type: 'hbox',
															align: 'stretch',
															pack: 'end'
														}
										         }
										    },
										    items:[
										           {
										        	   	xtype: 'image',
										        	   	itemId: 'ContainerAllegato', reference: 'ContainerAllegato',
														src: 'resources/images/generali/allegato.svg',
														width: 20,
														height: 20,
														hidden: true,
														margin: '0 2 5 0'
										           },
										           {
														xtype: 'label',
														itemId: 'LabelTipoConsegna', reference: 'LabelTipoConsegna',
														name: 'tipoConsegna',
														cls: 'cbaCssLabelTitolo',
														margin: '5 0 0 5'
													} 
										    ]
										},
										   
							        ]
				    	        },
								{
						        	 xtype: 'image',
									 itemId: 'BtnMenu', reference: 'BtnMenu',
									 src: 'resources/images/generali/menuConsegne.svg',
									 cls: 'css-nero',
									 maxHeight: 35,
									 maxWidth: 35,
									 height: 35,
									 width: 35,
									 flex: 1,
									 listeners:{
										 tap: 'tapBtnMenu'
									 }
						        }, 
    	        	        ]
		    	        },
		    	        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            cls: 'headerFormCosegne',
                            padding: '2px',
                            plugins: 'responsive',
		                    responsiveConfig:{
		                    	 'phone': {
		                                 layout: {
		                                     type: 'vbox'
		                                 }
		                         },
		                         'tablet': {
			                        	 layout: {
		                                     type: 'hbox'
		                                 }
		                         }
		                    },
                            items: [
								{
									xtype: 'textfield',
									itemId: 'CompilatoreID', reference: 'CompilatoreID',
									name: 'compilatore',
									hidden: true
								},
                                {
                                    xtype: 'label',
                                    itemId: 'DataCompilatore', reference: 'DataCompilatore',
                                    margin: '0 0 0 5',
                                    cls: 'cbaCssLabel',
                                    name: 'dataOra'
                                },
                                {
                                	xtype: 'spacer'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'LabelCompilatore', reference: 'LabelCompilatore',
                                    margin: '0 0 0 5',
                                    cls: 'cbaCssLabel',
                                    name: 'compilatoreNominativo'
                                },
                            ]
                        },
                        {
                    	   xtype: 'label',
                    	   itemId: 'Note', reference: 'Note',
                    	   padding: '5',
                    	   name: 'note',
                    	   minHeight: 48
                        },
                        {
                        	xtype: 'container',
                        	itemId: 'ContainerPresaInCarico', reference: 'ContainerPresaInCarico',
                            layout: {
                            	type: 'hbox',
                            	align: 'stretch'
                            },
                            flex: 1,
                            minHeight: 20,
                            plugins: 'responsive',
		                    responsiveConfig:{
		                    	 'width < 800': {
		                    		 minHeight: 35
		                         },
		                         'width >= 800': {
		                        	 minHeight: 20
		                         }
		                    },
                            hidden: true,
                            items:[
					           {
									xtype: 'image',
									src: 'resources/images/generali/confirm.svg',
									cls: 'css-verde',
									width: 20,
									height: 20,
									margin: '0 2 5 0'
							    },
								{
								    xtype: 'label',
								    itemId: 'LabelPresaInCarico', reference: 'LabelPresaInCarico',
								    width: '90%'
								}
                            ]
                        }
                        
			    	 ]
			    }
			]
		}
	]
});
