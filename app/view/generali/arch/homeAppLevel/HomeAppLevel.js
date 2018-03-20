
Ext.define('Generali.arch.homeAppLevel.HomeAppLevel',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.homeAppLevel.HomeAppLevelController'
    ],

    controller: 'generali.arch.homeapplevel.homeapplevel',

    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items:[
		{
			xtype: 'container',
			itemId: 'ContainerMenuApp', reference: 'ContainerMenuApp',
			layout: {
				type: 'vbox',
				pack: 'center'
			},
			flex: 1,
			listeners:{
				remove: 'createApp'
			}
		}
	]
});
