Ext.define('Ext.layout.Fluid', {
    extend: 'Ext.layout.Box',
    alias: 'layout.fluid',
    setContainer: function(container) {
        this.callSuper(arguments);
        container.innerElement.replaceCls('x-horizontal', 'x-horizontal-fluid');
    }
});

Ext.define('CS.menuAzioni.parametriDiariMenu.ParametriDiariMenu',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.parametriDiariMenu.ParametriDiariMenuController',
        'CS.menuAzioni.parametriInsert.ParametriInsert'
    ],

    controller: 'cartella.menuazioni.parametridiarimenu.parametridiarimenu',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
    items: [
    	{
			xtype: 'container',
			itemId: 'ContainerMain', reference: 'ContainerMain',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items:[
				{
					xtype: 'container',
					itemId: 'MenuToolbar', reference:'MenuToolbar',
					layout:{
						type: 'hbox',
						align:'stretch'
					},
					height: 50,
					margin: '0 0 10 0',
					items:[
						{
							xtype: 'searchfield',
							itemId: 'RicercaFunzione', reference: 'RicercaFunzione',
							placeholder:'RICERCA_FUNZIONE',
							docked: 'right',
							width: 250,
							padding: '5px',
							listeners:{
								change: 'changeRicercaFunzione'
							}
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'MainContainer', reference: 'MainContainer',
					layout: {
						type: 'vbox',
						pack: 'center'
					},
					flex: 1,
				}	
			]
    	}
	]
    
});
