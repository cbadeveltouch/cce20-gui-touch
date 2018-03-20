
Ext.define('Generali.arch.toolbarOspite.ToolbarOspite',{
    extend: 'Ext.Panel',

    requires: [
        'Generali.arch.toolbarOspite.ToolbarOspiteController'
    ],

    controller: 'generali-arch-toolbarospite-toolbarospite',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items: [
		{
			xtype: 'container',
			itemId: 'ContainerUtente', reference: 'ContainerUtente',
			layout:{
				type:'hbox',
				align: 'stretch',
				pack: 'center'
			},
			padding: '3px',
			margin: '10 0 0 0',
			style:{
				'border-bottom': '1px solid #5fa2dd'
			},
			flex:1,
			items:[
				{
			    	xtype: 'container',
					itemId: 'ContainerNomeVideata', reference: 'ContainerNomeVideata',
					layout:{
						type: 'hbox',
						align: 'center',
						pack: 'center'
					},
					style:{
						background: '#fafafa',
						'z-index': '10  !important;' 
					},
					hidden: true,
					width: '100%',
					height: 55,
					top: 0,
					items:[
						{
							xtype: 'label',
							itemId: 'LabelNomeVideata', reference: 'LabelNomeVideata',
							cls: 'cbaLabelTitolo'
						}
					]
				},
				{
					xtype: 'img',
					itemId: 'BtnMenu', reference: 'BtnMenu',
					src: 'resources/images/backMenu.svg',
					margin: '0 10 0 10',
					width: 40,
					height: 40,
					listeners:{
						tap: 'tapBtnMenu'
					}
				},
				{
					xtype: 'img',
					itemId: 'BtnListaUtenti', reference: 'BtnListaUtenti',
					src: 'resources/images/otherUser.svg',
					width: 40,
					height: 40,
					listeners:{
						tap: 'tapBtnListaUtenti'
					}
				},
				{
					xtype: 'label',
					itemId: 'LabelOspite', reference: 'LabelOspite',
					flex:1,
					cls: 'cbaLabelStrong' ,
					margin: '5',
					style: 'align-text:middle'
				}
					
			]
		}	
	]
});
