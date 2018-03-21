Ext.define('Generali.arch.homeAppMenu.HomeAppMenu',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.homeAppMenu.HomeAppMenuController',
		'CbaUtils.componenti.all.FluidLayout'
    ],

    controller: 'generali.arch.homeappmenu.homeappmenu',
    
    itemId: 'MainContainer', reference: 'MainContainer',
	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	flex:1, 
	items: [
		{
			xtype: 'toolbar',
			itemId: 'MenuToolbar', reference: 'MenuToolbar',
			docked: 'top',
			layout:{
				type: 'hbox',
				align: 'stretch'
			},
			height: 50,
			padding: '5px',
			flex: 1,
			items:[
				{
					xtype: 'img',
					itemId: 'BtnMenuNotifica', reference: 'BtnMenuNotifica',
					src: 'resources/images/notification.svg',
					width: 40,
					height: 40
				},
				{
					xtype: 'spacer',
				},
				{
					xtype: 'img',
					itemId: 'BtnLogout', reference: 'BtnLogout',
					src:'resources/images/logout.svg',
					width: 40,
					height: 40,
					margin: '0 10 0 0',
					listeners:{
						tap: 'tapBtnLogout'
					}
				},
				{
					xtype: 'img',
					itemId: 'BtnImpostazioni', reference: 'BtnImpostazioni',
					src: 'resources/images/generali/cog-weel.svg',
					width: 40,
					height: 40
				}
			]
		},
		{
			xtype: 'tabpanel',
			itemId: 'TabpanelHome', reference: 'TabpanelHome',
			tabBar: {
		        docked: 'bottom',
		        padding: '5px 0 0 0',
		    },
		    defaults: {
		        scrollable: true,
		        layout: 'center'
		    },
			flex: 1,
			listeners:{
				activeItemchange: 'changeTabpanelHome'
			},
			items:[
				{
					title:	'HOME',
					itemId: 'TabHome', reference: 'TabHome',
		            iconCls: 'cbaHomeIcon',
		            iconAlign: 'top',
		            layout:{
		            	type:'vbox',
		            	align: 'stretch'
		            },
		            flex: 1,
		            items:[
		            	{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'middle',
								pack: 'center'
							},
							margin: '40 0 5 0',
							items:[
								{
									xtype: 'label',
									html: 'Cartella 2.0',
									style: {
									    'font-size': '30px',
									    'font-style': 'Osvald'
									}
								}
							]
						},
						{
							xtype: 'container',
							itemId: 'ContainerBtn', reference: 'ContainerBtn',
							layout: {
								type: 'fluid',
								align:'middle',
								pack: 'center'
							},
							flex: 1,
							padding: '10px',
							items:[
							]
						}
		            ]
				},
				{
					title: 'CONSEGNE',
		            iconCls: 'cbaConsegneIcon',
		            iconAlign: 'top',
		            itemId: 'TabConsegne', reference: 'TabConsegne',
		            layout:{
		            	type:'vbox',
		            	align: 'stretch'
		            },
		            scrollable: true,
		            flex: 1
				},
				{
					title: 'AGENDA',
		            iconCls: 'cbaAgendaIcon',
		            iconAlign: 'top',
		            itemId: 'TabAgenda', reference: 'TabAgenda',
		            badgeText :'3'
				},
				{
					title: 'WARNING',
					iconAlign: 'top',
		            iconCls: 'cbaWarningIcon',
		            itemId: 'TabWarning', reference: 'TabWarning'
				}
			]
		}
	]
});
