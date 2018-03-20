Ext.define('Generali.arch.pageStdAzioni.PageStdAzioni',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.pageStdAzioni.PageStdAzioniController',
        'Generali.arch.listaUtenti.ListaUtentiFloat'
    ],

    controller: 'generali.arch.pagestdazioni.pagestdazioni',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items: [
		{
			xtype:'panel',
			itemId: 'Container', reference: 'Container',
			layout:{
				type:'vbox',
				align:'stretch'						
			},
			flex: 1,
			items:[
				{			
					xtype:'container',
					itemId:'PnlHeader',reference:'PnlHeader',
					layout: {
						type: 'hbox',
						align: 'middle',
						pack: 'start'
					},
					style:{
						'border-bottom': '2px solid #e1e1e1'
					},
					height: 60,
					margin: '0 0 5 0',
					items:[
						{
							xtype: 'img',
							itemId: 'BtnBack', reference: 'BtnBack',
							src: 'resources/images/left-arrow.svg',
							width: 35,
							height: 35,
							margin: '0 10 0 5',
							listeners:{
								tap: 'tapBtnBack'
							}
						},
						{			
							xtype:'container',
							layout: {
								type: 'hbox',
								align: 'center',
								pack: 'center'
							},
							flex: 1,
							items:[
								{
									xtype: 'label',
									itemId: 'LabelSchermata', reference: 'LabelSchermata',
									cls: 'cbaLabelTitolo',
									width: '90%'
								}
							]
						}
					]
				},
				{
					xtype:'panel',
					itemId: 'PanelOspite', reference: 'PanelOspite',
					layout: {
						type: 'hbox',
						align: 'middle',
						pack: 'start'
					},
					height: 60,
					margin: '0 0 5 10',
					style:{
						'border-bottom': '2px solid #e1e1e1'
					},
					hidden: true,
					items:[
						{
							xtype:'img',
							itemId: 'BtnListaUtenti', reference: 'BtnListaUtenti',
							src:'resources/images/otherUser.svg',
							margin: '0 10 0 5',
							width: 40,
							height: 40,
							listeners:{
								tap: 'tapBtnListaUtenti'
							}
						},
						{
							xtype:'label',
							itemId: 'LabelOspite', reference: 'LabelOspite',
							margin: '0 10 0 10',
							cls: 'cbaLabelStrong'
								
						}
					]
				},
				{			
					xtype:'container',
					itemId:'PnlBody',reference:'PnlBody',
					padding: '10px',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1
				}
			]
		}
	]
});
