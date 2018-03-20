
Ext.define('CS.schede.schedeModulari.domande.Domande',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schedeModulari.domande.DomandeController'
    ],

    controller: 'cartella-schede-schedemodulari-domande-domande',
    
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
					xtype:'tabpanel',
					margin:'8 0 0 0',
					cls: 'cbaTabParam',
					itemId:'TabPanel', reference:'TabPanel',
					listeners:{
						beforeactiveItemchange: 'beforetabchangeTabPanel'
					},
					flex: 1,
					items:[
						{
							title:'TEST',
							itemId:'TabDatiDomande', reference:'TabDatiDomande',
							layout:{
								type:'vbox',
								align:'stretch'
							},
//							flex: 1,
							padding:5,
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
									layout:{
										type:'vbox',
										align:'stretch'
									},
									autoScroll: false,
									flex:1,
									border:false,
									items:[
										{
											xtype: 'textfield',
											name:'id',
											hidden: true,	
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
													xtype: 'label',
													itemId:'TotPunteggio',reference:'TotPunteggio',
													cls:'cbaCssLabel',
													style:'font-weight:bold'
												},
												{
													xtype: 'label',
													itemId:'OreAssistenza',reference:'OreAssistenza',
													cls:'cbaCssLabel',
													style:'font-weight:bold'
												},
												{
													xtype:'label',
													cls:'cbaCssLabel',
													itemId:'DescrizionePunteggio',reference:'DescrizionePunteggio',
													style:'font-weight:bold'
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
											autoScroll: true,
											layout:{
												type: 'vbox',
												align: 'stretch'
											},
											padding: '5',
											items:[
												{
													xtype:'container',
													itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
													margin:'5 0 0 0'
												},
												{
													xtype:'container',
													itemId:'CntNote',reference:'CntNote',
													height: '90%',
													items:[
														{
															xtype:'textareafield',
															cls: 'cbaTextArea',
															label:'NOTE',
															height:'90%',
															labelAlign:'top',
															itemId:'Note',reference:'Note',
//															height:200,
															name:'note',
															hidden:true
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
