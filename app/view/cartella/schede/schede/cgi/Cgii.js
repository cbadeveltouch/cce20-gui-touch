
Ext.define('CS.schede.schede.cgi.Cgii',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.cgi.CgiiController'
    ],

    controller: 'cartella-schede-schede-cgi-cgii',
    
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
							hidden:true
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
							items: [
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
											xtype: 'label',
											margin: '0 5 0 10',
											cbahtml: 'CGII_DOMANDA1'
										},
										{
											xtype: 'cbaMultipleChoice',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											style: 'border: none !important;',
											margin: '5 0 0 0',
											cbaConfig: {
												itemsCfg: [
													{
														html: '1',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1',
														isFormField: true,
														inputValue: '1',
														cbaInputValue: '1',
														label: 'CGII_RISPOSTA1'
													},
													{
														html: '2',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1',
														isFormField: true,
														inputValue: '2',
														cbaInputValue: '2',
														label: 'CGII_RISPOSTA2'
													},
													{
														html: '3',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1',
														isFormField: true,
														inputValue: '3',
														cbaInputValue: '3',
														label: 'CGII_RISPOSTA3'
													},
													{
														html: '4',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1',
														isFormField: true,
														inputValue: '4',
														cbaInputValue: '4',
														label: 'CGII_RISPOSTA4'
													},
													{
														html: '5',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1', 
														isFormField: true,
														inputValue: '5',
														cbaInputValue: '5',
														label: 'CGII_RISPOSTA5'
													},
													{
														html: '6',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1',
														isFormField: true,
														inputValue: '6',
														cbaInputValue: '6',
														label: 'CGII_RISPOSTA6'
													},
													{
														html: '7',
														layout: {
															type: 'vbox',
															align: 'center'
														},
														cls: 'choice-round-unchecked-css-border2', 
														checkedClsPerson: 'choice-checked-css',
														name: 'domanda1', 
														isFormField: true,
														inputValue: '7',
														cbaInputValue: '7',
														label: 'CGII_RISPOSTA7'
													}
												],
												titoloLabel: 'CGII_DOMANDA1',
												esclusivo: true  
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

});
