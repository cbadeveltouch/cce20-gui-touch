
Ext.define('Generali.arch.listaUtenti.ListaUtentiFloat',{
    extend: 'Ext.Panel',

    requires: [
        'Generali.arch.listaUtenti.ListaUtentiFloatController',
        'Generali.arch.listaUtenti.ListaUtenti'
    ],

    controller: 'generali.arch.listautenti.listautentifloat',
    
    layout: {
		type:'vbox',
		align: 'stretch'
	},
	width: Ext.is.Phone ? '90%' : 350,
    height: '100%',
    floated: true,
    modal: true,
    hideOnMaskTap: true,
    flex: 1,
    items: [
    	{
    		xtype: 'panel',
			itemId: 'Panel', reference: 'Panel',
			layout: {
            	type: 'vbox',
            	align: 'stretch'
            },
            flex: 1,
            closable: true,
            closeAction: 'hide',
            hideOnMaskTap: true,
            tools:[
            	{
            		iconCls: 'filter-white',
            		handler: function(th) {
                        let controller = th.lookupController(),
                        	cnt = controller.lookupReference('Panel').down('#CntFiltri');
                        cnt.setHidden(!cnt.getHidden())
                    }
    			}
            ],
            listeners:{
            	show: 'showView',
            	hide: 'hideView'
            }
            
    	}
	]
});
