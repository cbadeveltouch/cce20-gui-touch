
Ext.define('CS.menuAzioni.somministrazioneTerapie.ListAlBisogno',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.somministrazioneTerapie.ListAlBisognoController'
    ],

    controller: 'cartella-menuazioni-somministrazioneterapie-listalbisogno',
    
    layout:{
    	type: 'vbox',
    	align:'stretch'
    },
    flex: 1,
    items:[
    	{
	    	xtype: 'panel',
			itemId: 'List', reference: 'List',
	    	layout: {
	    		type: 'vbox',
	    		align: 'stretch'
	    	},
	    	height: '100%',
	    	scrollable: true
    	}
    ]
});
