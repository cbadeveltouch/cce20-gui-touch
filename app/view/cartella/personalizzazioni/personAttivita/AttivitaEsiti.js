Ext.define('CS.personalizzazioni.personAttivita.AttivitaEsiti', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'idAttivita'},
		{name: 'descrizione'},
		{name: 'esito'},
		{name: 'codEsitoGen'}
	],
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/esiti/listByAttivita',		
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		},
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/esiti/listByAttivita',
            create: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/esiti/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/esiti/update',
            destroy: `${CbaRootServer}`+ '/cba/css/cs/ws/attivita/esiti/delete'
        }
	},
	autoDestroy: true
});