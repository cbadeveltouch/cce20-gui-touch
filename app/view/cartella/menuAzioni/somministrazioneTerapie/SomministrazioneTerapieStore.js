Ext.define('CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapieStore', {
	extend: 'Ext.data.Store',
	alias: 'store.somministrazioneTerapie',
	
	fields: [
		{name: 'id'},
		{name: 'idSomm'},
		{name: 'idTerapia'},
		{name: 'idRicovero'},
		{name: 'codArticolo'},
		{name: 'tipoTerapia'},
		{name: 'unimis'},
		{name: 'convenzionato'},
		{name: 'idTerapiaMadre'},
		{name: 'data', type: 'date'},
		{name: 'dose'},
		{name: 'aic'},
		{name: 'viaDiSomm'},
		{name: 'compilatore'},
		{name: 'idCompilatore'},
		{name: 'dataComp'},
		{name: 'note'},
		{name: 'desFarmaco'},
		{name: 'desViaDiSomm'},
		{name: 'desUnimis'},
		{name: 'esito'},
		{name: 'desEsito'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/somm/src',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/somm/src'            
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	groupField: 'desViaDiSomm',
	sorters: [{
		property: 'data',
		direction: 'ASC'}
	],
	autoDestroy: true,
	autoLoad: false
});