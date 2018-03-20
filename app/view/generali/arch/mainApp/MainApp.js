Ext.define('CbaCssTouch.view.generali.arch.mainApp.MainApp',{
    extend: 'Ext.Container',

    requires: [
        'CbaCssTouch.view.generali.arch.mainApp.MainAppController'
    ],

    controller: 'generali.arch.mainapp.mainapp',

//    xtype: 'navigationview',
	itemId: 'ContainerMainApp',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items:[
		{
			xtype: 'container',
			itemId: 'MainLevels', reference: 'MainLevels',
			layout: {
				type: 'card',
				animation: {
	                duration: 300,
	                easing: 'ease-out',
	                type: 'slide',
	                direction: 'left'
	            }
			},
			listeners:{
            	beforeactiveItemchange: 'mainLevelsBeforeChange',
            	activeitemchange: 'mainLevelsChange'
            },
			flex: 1,
			items: [
				{	//others
					xtype: 'container',
					itemId: 'LevelOthers', reference: 'LevelOthers',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Level Others'
					}
				},
				{	//login/mainPage
					xtype: 'container',
					itemId: 'Level0', reference: 'Level0',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Home Cba Css Touch 2.0'
					}
				},
				{	//menuFascicolo
					xtype: 'container',
					itemId: 'LevelMenuFascicolo', reference: 'LevelMenuFascicolo',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Menu Cba Css Touch 2.0'
					}
				},
				{	//menuAzioni
					xtype: 'container',
					itemId: 'LevelMenuAzioni', reference: 'LevelMenuAzioni',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Menu Cba Css Touch 2.0'
					}
				},
				{
					xtype: 'container',
					itemId: 'Level1', reference: 'Level1',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					cbaConfig: {
						title: 'Livello 1'
					}
				},
				{
					xtype: 'container',
					itemId: 'Level2', reference: 'Level2',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Livello 2'
					}
				},
				{
					xtype: 'container',
					itemId: 'Level3', reference: 'Level3',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Livello 3'
					}
				},
				{
					xtype: 'container',
					itemId: 'Level4', reference: 'Level4',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					cbaConfig: {
						title: 'Livello 4'
					}
				}
			]
		}
	]

});
