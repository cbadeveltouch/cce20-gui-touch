
Ext.define('CS.schede.schede.mhct.Mhct',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.mhct.MhctController',
        'CS.schede.schede.mhct.dettaglio.Dettaglio',
        'CbaCssView.store.schede.Frequenze'
    ],

    controller: 'cartella-schede-schede-mhct-mhct',
    
    items: [
		{
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'datefield',
					itemId: 'DataRegistrazione', reference: 'DataRegistrazione',
					hidden:true
				},
				{
					xtype: 'CbaForm',
					itemId: 'Form', reference: 'Form',
					cls: 'cbaCssForm',
					border: false,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					scrollable: false,
					flex: 1,
					items: [
						{
							xtype: 'textfield',
							name: 'id',
							hidden: true
						},
						{
							xtype: 'textfield',
							itemId: 'Agenda', reference: 'Agenda',
							hidden:true
						},
						
						{
							xtype: 'panel',
							itemId: 'Totali', reference: 'Totali',
							title: 'Totali',
							cls: 'cbaPanelCollapsed',
							width: '100%',
							layout:{
								type: 'hbox',
								align: 'stretch'
							},
							margin: '0 0 5 0',
							collapsed: Ext.is.Phone ? true : false,
							collapsible: true,
							items:[
								{
									xtype: 'label',
									itemId: 'TotTest', reference: 'TotTest',
									cls: 'cbaCssLabel',
									style: 'font-weight:bold',
									maxWidth: 400
								}
							]
						},
						{
							xtype:'selectfield',
							itemId:'ComboValidita',reference:'ComboValidita',
							label:'VALIDITA',
							name:'scadenza',
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
								    title: Ext.is.Phone ? 'Comp.' + '<br>' + 'Menom.': 'Comportamentale/Menomazione',
									itemId: 'Test', reference: 'Test',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									scrollable: true,
									items: [
										{
											xtype: 'fieldset',
											title: 'MHCT_TITOLO1',
											cls: 'no-border',
											width: '100%',
											itemId: 'CntDomande1', reference: 'CntDomande1',
											margin: '0 3 20 0',
											hidden: true
										},
										{
											xtype: 'fieldset',
											itemId: 'CntDomande2', reference: 'CntDomande2',
											title: 'MHCT_TITOLO2',
											cls: 'no-border',
											width: '100%',
											margin: '0 3 20 0',
											hidden: true
										}
									]
								},
								{
								    title: Ext.is.Phone ? 'Psico...' : 'Psicopatologia',
									itemId: 'Test1', reference: 'Test1',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									scrollable: true,
									items:[
										{
											xtype: 'fieldset',
											title: 'MHCT_TITOLO3',
											itemId: 'CntDomande3', reference: 'CntDomande3',
											cls: 'no-border',
											width: '100%',
											margin: '0 3 20 0',
											hidden: true
										}
									]
								},
								{
								    title: 'Sociale',
									itemId: 'Sociale', reference: 'Sociale',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									scrollable: true,
									items:[
										{
											xtype: 'fieldset',
											title: 'MHCT_TITOLO4',
											itemId: 'CntDomande4', reference: 'CntDomande4',
											cls: 'no-border',
											width: '100%',
											margin: '0 3 20 0',
											hidden: true
										}
									]
								},
								{
								    title: 'STORICO',
									itemId: 'STORICO', reference: 'STORICO',
									layout: {
										type: 'vbox',
										align: 'stretch'
									},
									flex: 1,
									scrollable: true,
									items:[
										{
											xtype: 'fieldset',
											title: 'MHCT_TITOLO5',
											itemId: 'CntDomande5', reference: 'CntDomande5',
											cls: 'no-border',
											width: '100%',
											margin: '0 3 20 0',
											hidden: true
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
