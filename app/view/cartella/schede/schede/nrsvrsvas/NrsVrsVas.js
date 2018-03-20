
Ext.define('CS.schede.schede.nrsvrsvas.NrsVrsVas',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.nrsvrsvas.NrsVrsVasController',
        'CbaCssView.store.schede.Frequenze',
        'CS.schede.standard.provvedimenti.TabProvvedimentiMain'
    ],

    controller: 'cartella-schede-schede-nrsvrsvas-nrsvrsvas',
    
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
							itemId:'TabTest', reference:'TabTest',
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
									autoScroll:true,
									trackResetOnLoad: true,
									border:false,
									padding: '10px',
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
													cls:'cbaCssLabel',
													
													itemId:'TotTest',reference:'TotTest',
													style:'font-weight:bold',
															
												},
												{
													xtype:'label',
													cls:'cbaCssLabel',
													
													itemId:'DescrizionePunteggio',reference:'DescrizionePunteggio',
													style:'font-weight:bold',
															
												},
												{
													xtype:'label',
													cls:'cbaCssLabel',
												
													itemId:'TotCorretto',reference:'TotCorretto',
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
											xtype:'container',
											itemId:'CntCorpoDomande',reference:'CntCorpoDomande',
											layout: {
												type:'vbox',
												align: 'stretch'
											},
											margin:'10 0 10 0',
											items:[	
												{
													xtype:'label',
													html:'LIVELLO_DOLORE'
												},
												{
													xtype:'textfield',
													hidden:true,
													name:'valore',
													itemId:'LabelPunteggio',reference:'LabelPunteggio',
												},
												{
													xtype:'container',
													layout:{
														type:'hbox',
														align: 'stretch',
													},
													flex:1,
													itemId:'Cnt',reference:'Cnt'
												}
											]
										},														
										{
											xtype:'container',
											itemId:'CntNote',reference:'CntNote',
											items:[
												{
													xtype:'textareafield',
													nonObbligatorio :true,
													cls: 'cbaTextArea',
													label:'NOTE',
													labelAlign: 'top',
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
