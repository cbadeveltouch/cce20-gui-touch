
Ext.define('CS.schede.schedeModulari.domande.insert.DomandeInsert',{
    extend: 'Ext.Container',

    requires: [
    	'CS.schede.schedeModulari.domande.insert.DomandeInsertController'
    ],

    controller: 'cartella-schede-schedemodulari-domande-insert-domandeinsert',
    
    layout: {
		type:'vbox',
		align: 'stretch'
	},
	top: '10%',
	left: Ext.is.Phone ? '5%' : '30%', //TODO_PLS cambia con l'altezza
	width: Ext.is.Phone ? '90%' : 500,
    maxHeight: '80%',
    floated: true,
    modal: true,
    hideOnMaskTap: true,
    flex: 1,
    listeners:{
    	painted: function(th){
    		let height = th.el.dom.clientHeight;
    		let hb =Ext._bodyEl.dom.clientHeight;
    		
    		th.setTop((hb-height)/2);
    	}
    },
    items:[
    	{
	    	xtype: 'panel',
			layout: {
				type:'vbox',
				align:'stretch'
			},
			flex:1,
			scrollable: true,
			padding: 10,
			items:[ 
				{
					xtype: 'container',
			    	itemId: 'CntMain', reference:'CntMain',
					layout: {
						type:'vbox',
						align:'stretch'
					},
					scrollable: true
				}
			]
	     },
	     
    ]
});
