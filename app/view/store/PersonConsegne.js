Ext.define('CbaCssView.store.PersonConsegne', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'idProfilo'},
		{name:'cadute'},
		{name:'catetere'},
		{name:'contenzioni'},
		{name:'eventiAvversi'},
		{name:'lesioni'},
		{name:'nutrizioni'},
		{name:'skInfezioni'},
		{name:'skStomia'},
		{name:'diari'},
		{name:'parametri'},
		{name:'rivalutazione'},
		{name:'attivita'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/person/getByProfilo',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/person/getByProfilo',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/person/new',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/person/update',
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});