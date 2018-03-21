Ext.define('Generali.arch.menuFascicolo.MenuFascicolo',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.menuFascicolo.MenuFascicoloController',
        'Ext.plugin.Responsive',
        'CS.diari.Diario',
        'CS.parametri.Parametri',
        'CS.eventi.cadute.Cadute',
        'CS.eventi.contenzioni.Contenzioni',
		'CbaUtils.componenti.all.FluidLayout'
    ],

    controller: 'generali.arch.menufascicolo.menufascicolo',
    
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
					itemId: 'MenuToolbar', reference: 'MenuToolbar',
					docked: 'top',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					height: 110,
					padding: '5px',
					margin: '10 0 0 0',
					plugins: 'responsive',
					
			        responsiveConfig: {
			             phone: {
			            	 layout:{
									type: 'vbox'
							 }
			             },
			             tablet: {
			            	 layout:{
									type: 'hbox'
							 },
							 maxHeight: 50
			             }
			        },
					flex:1,
					items: [
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
								align:'stretch'
							},
							flex:1,
							items:[
								{
									xtype:'img',
									itemId: 'BtnHome', reference: 'BtnHome',
									cls: 'cbaBackHomeIcon',
									width: 40,
									height: 40,
									margin: '0 10 0 10',
					                listeners:{
					                	tap: 'tapBtnHome'
					                }
								},
								{
									xtype:'img',
									itemId: 'BtnListaUtenti', reference: 'BtnListaUtenti',
									src:'resources/images/otherUser.svg',
									width: 40,
									height: 40,
									listeners:{
					                	tap: 'tapBtnListaUtenti'
					                }
								},
								{
									xtype: 'container',
									layout:{
										type:'hbox',
										align: 'center',
										pack: 'middle'
									},
									flex: 1,
									items:[
										{
											xtype:'label',
											itemId: 'LabelOspite', reference: 'LabelOspite',
											margin: '0 10 0 10',
											maxWidth: '90%'//permette di andare a capo con il testo
												
										}
									]
								},
								{
									xtype:'img',
									itemId: 'BtnInfo', reference: 'BtnInfo',
									src:'resources/images/info.svg',
									width: 35,
									height: 35,
									hidden: true
								}
							]
						},
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
								align:'stretch'
							},
							flex:1,
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
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'MainContainer', reference: 'MainContainer',
					layout: {
						type: 'vbox',
						align: 'stretch',
						pack: 'center'
					},
					flex: 1
				},
				{
					xtype: 'container',
					itemId: 'ContainerBottom', reference: 'ContainerBottom'
				}
			]
		}
		
	]
});
