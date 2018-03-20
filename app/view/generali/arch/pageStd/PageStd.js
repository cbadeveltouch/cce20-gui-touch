
Ext.define('Generali.arch.pageStd.PageStd',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.pageStd.PageStdController'
    ],

    controller: 'generali-arch-pagestd-pagestd',
    
    itemId: 'Container',
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	padding: '10px',
	flex: 1,
	items: [
			{			
				xtype:'container',
				itemId:'PnlHeader',reference:'PnlHeader',
				layout: {
					type: Ext.is.Phone ? 'vbox' : 'hbox',
					align: 'stretch'
				},
				height: Ext.is.Phone ? 130 : 60
			},
			{			
				xtype:'container',
				itemId:'PnlBody',reference:'PnlBody',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				flex: 1
			},
			{
				xtype:'container',
				itemId: 'CntPnlCompilatore', reference: 'CntPnlCompilatore',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				style:{
					borderTop: '0.6px solid #5fa2dd'
				},
				items:[
					{
						xtype: 'pnlCompilatore',
						itemId: 'PnlCompilatore', reference: 'PnlCompilatore',
					}
				]
			}
	]
});
