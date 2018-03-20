
Ext.define('CS.schede.schede.Tinetti.Tinetti',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.Tinetti.TinettiController',
        'CbaCssView.store.schede.Frequenze',
        'CbaUtils.componenti.all.ControllerGenSchedeVal',
        'CS.schede.schede.Tinetti.dettaglio.Dettaglio',
        'CS.schede.schede.Tinetti.StoreDati',
        'CbaCssView.store.ImpostazioniSchede'
    ],

    controller: 'cartella-schede-schede-tinetti-tinetti',
    
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
					trackResetOnLoad: true,
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
							hidden:true	
						},
						{
							xtype: 'radiofield',
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
									xtype: 'label',
									html: 'Tot:',
									style:'font-weight:bold',
									cls:'cbaCssLabel'
								},
								{
									xtype:'container',
									layout:{
										type: 'vbox',
										align: 'center'
									},
									width: '30%',
									padding: '5px',
									marigin: '0 5 0 5',
									items:[
										{
											xtype: 'label',
											html: 'Andatura',
											cls:'cbaCssLabel',
											style:'font-weight:bold'
										},
										{
											xtype: 'label',
											itemId:'TotAndatura',reference:'TotAndatura',
											cls:'cbaCssLabel',
											style:'font-weight:bold'
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: 'vbox',
										align: 'center'
									},
									width: '30%',
									padding: '5px',
									marigin: '0 5 0 5',
									items:[
										{
											xtype: 'label',
											html: 'Equilibrio',
											cls:'cbaCssLabel',
											style:'font-weight:bold'
										},
										{
											xtype: 'label',
											cls:'cbaCssLabel',
											itemId:'TotEquilibrio',reference:'TotEquilibrio',
											style:'font-weight:bold'
										}
									]
								},
								{
									xtype:'container',
									layout:{
										type: 'vbox',
										align: 'center'
									},
									width: '30%',
									padding: '5px',
									marigin: '0 5 0 5',
									items:[
										{
											xtype: 'label',
											html: 'Punteggio',
											cls:'cbaCssLabel',
											style:'font-weight:bold'
										},
										{
											xtype: 'label',
											itemId:'TotTest',reference:'TotTest',
											cls:'cbaCssLabel',
											style:'font-weight:bold'
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							itemId:'CntEdit',reference:'CntEdit',
							layout:{
								type:'hbox',
								align:'center'
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
									}
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
							margin:'8 0 0 0',
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
								    title: 'ANDATURA',
									itemId:'TabAndatura', reference:'TabAndatura',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true
								},
								{
									title: 'EQUILIBRIO',
									itemId:'TabEquilibrio', reference:'TabEquilibrio',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true
								},
								{
									title: 'TOTALI',
									itemId:'TabTotali', reference:'TabTotali',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									scrollable: true,
									items:[
										{
											xtype:'container',
											flex:1,
											itemId:'CntNote',reference:'CntNote',
											margin:'20 0 0  0',
											padding:10,
											items:[
												{
													xtype:'textareafield',
													cls: 'cbaTextArea',
//													height:'90%',
													height: Ext.is.Phone ? 250 : 450,
													label:'NOTE',
													labelAlign: 'top',
													itemId:'Note',reference:'Note',
													name: 'note'
													
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
