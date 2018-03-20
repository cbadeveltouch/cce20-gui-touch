
Ext.define('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegne',{
    extend: 'Ext.Container',

    requires: [
        'CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegneController',
        'CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltri',
        'CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriMain'
    ],

    controller: 'cartella-cruscottooperatore-calendarioconsegne-calendarioconsegne',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},	
	flex: 1,
	scrollable: true,
	items:[
		{
 			xtype: 'toolbar',
 			itemId: 'Toolbar', reference: 'Toolbar',
 			dock: 'top',
 			items: [
 				{
 		        	xtype: 'spacer'
 		        },
 		        {
 		        	xtype: 'button',
 					itemId: 'BtnLetteTutte', reference: 'BtnLetteTutte',
 					text: 'SEGNA_TUTTE_COME_LETTE',
 					cls: 'cbaCssBtnFunzione-special',
 					maxWidth: 170,
 					listeners:{
 						tap: 'tapBtnLetteTutte'
 					}
 		        }
 			]
	     },
	     {
	    	xtype: 'panel',
			itemId: 'ContainerConsegne', reference: 'ContainerConsegne',
			layout: {
				type:'vbox',
				align:'stretch'
			},
			flex: 1,
			scrollable: true,
			items:[
				{
					xtype: 'panel',
					itemId: 'ContainerDe', reference: 'ContainerDe',
					layout: {
						type:'vbox',
						align:'stretch'
					}
				 }
			]
	     }
     ]
});
