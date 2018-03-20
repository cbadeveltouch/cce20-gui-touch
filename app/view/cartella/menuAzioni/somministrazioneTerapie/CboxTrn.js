Ext.define('CS.menuAzioni.somministrazioneTerapie.CboxTrn', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'descrizione'},
		{name: 'dataInizio', type: 'date'},
		{name: 'dataFine', type: 'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url:  `${CbaRootServer}`+'/cba/css/cs/ws/somm/cboxTrn',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	sorters: [{
		property: 'dataInizio',
		direction: 'ASC'
	}],
	autoDestroy: true,
	autoLoad: false
});