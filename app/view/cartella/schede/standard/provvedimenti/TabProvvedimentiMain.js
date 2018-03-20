
Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiMain',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.standard.provvedimenti.TabProvvedimentiMainController'
    ],

    controller: 'cartella-schede-standard-provvedimenti-tabprovvedimentimain',
    
    items:[
    	{
	    	xtype: 'panel',
			layout: {
				type:'vbox',
				align:'stretch'
			},
			flex: 1,
			scrollable: true,
			items:[
				{
					xtype: 'panel',
					itemId: 'CntMain', reference: 'CntMain',
					layout: {
						type:'vbox',
						align:'stretch'
					},
					listeners:{
						painted: 'creaPulsante'
					}
				 }
			]
	     }
    ]
});
