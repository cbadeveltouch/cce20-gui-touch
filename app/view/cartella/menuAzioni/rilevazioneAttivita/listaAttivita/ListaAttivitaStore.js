Ext.define('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaStore', {
	extend: 'Ext.data.Store',
	model: 'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaModel',
	alias: 'store.listaAttivita',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'}
	],
	proxy: {
        type: 'ajax',
        method:'GET',
        url: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/anagrafica/cbox',
        api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/anagrafica/cbox'
        },
        reader: {
            type: 'json',
            messageProperty: 'message',
            rootProperty: 'data'
        }
    },

    autoDestroy: true
});
