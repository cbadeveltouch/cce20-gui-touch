
Ext.define('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaFloat',{
    extend: 'Ext.Panel',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaFloatController',
        'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivita'
    ],

    controller: 'cs.menuzioni.rilevazioneAttivita.listaattivita.listaattivitafloat',
    
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
    	}
	]
});
