
Ext.define('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivita',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaController',
        'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaStore',
        'CS.menuAzioni.rilevazioneAttivita.sommAttivitaMain.SommAttivitaMain'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-listaattivita-listaattivita',
    
    layout:{
    	type:'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
		{
			xtype: 'panel',
			itemId: 'PanelUtenti', reference: 'PanelUtenti',
			layout: {
            	type: 'vbox',
            	align: 'stretch'
            },
            flex: 1,
            items: [
            	{
					xtype: 'container',
					itemId: 'CntFiltro', reference: 'CntFiltro',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					hidden: true
				},
				{
					xtype:'dataview',
					itemId: 'ListAttivita', reference: 'ListAttivita',
					cls: 'cbaDataView',
					flex: 1,
					itemTpl: '<div class="img" style="background-image: url({photo});"></div>' +
				            '<div class="content">' +
				                '<div class = "cbaDataViewText">{valore}</div>' +
				            '</div>',
					store: {
						type: 'listaAttivita',
					},
					listeners:{
						select: 'selectListAttivita'
					}
				}
            ]
		}
	]
});
