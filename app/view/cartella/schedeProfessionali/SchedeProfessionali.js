
Ext.define('CS.schedeProfessionali.SchedeProfessionali',{
    extend: 'Ext.Container',

    requires: [
        'CS.schedeProfessionali.SchedeProfessionaliController'
    ],

    controller: 'cartella-schedeprofessionali-schedeprofessionali',
    
    items:[
		{
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					height: 50,
					margin: '8 0 0 8',
					items: [
						{
							xtype:'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							style: {
								'background-color': '#5FA2DD'
							},
							flex: 1,
							padding: 10,
							margin: '0 10 0 0',
							items:[
								{	
									xtype:'label',
									itemId: 'NomeScheda', reference: 'NomeScheda',
									cls:'cbaCssLabelTitolo',
									margin:'5 5 0 0'		
								}
							]
						},
//						{
//							xtype: 'CSSButtonsPanel',
//							layout: {
//								type: 'hbox',
//								align: 'center',
//								pack: 'end'
//							},
//							items: [
//								{
//									xtype: 'button',
//									itemId: 'BtnEdit', reference: 'BtnEdit',
//									cls: 'cbaBtnFunzione-mini',
//									iconCls: 'box-edit-css',
//									width: 30,
//									padding: 5,
//									margin: '0 1 0 0',
//									textHint: traduci('MODIFICA'),
//									disabled: true
//								},
//								{
//									xtype: 'button',
//									itemId: 'btnConferma', reference: 'btnConferma'
//								},
//								{
//									xtype: 'button',
//									itemId: 'btnAnnulla', reference: 'btnAnnulla'
//								},
//								{
//									xtype: 'button',
//									itemId: 'BtnEsci', reference: 'BtnEsci',
//									nonDisabilitare: true
//								}
//							]
//						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntAree', reference: 'CntAree',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					padding: 3,
					scrollable: true,
					items: []
				}
			]
		}
	]
});
