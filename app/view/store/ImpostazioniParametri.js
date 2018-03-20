Ext.define('CbaCssView.store.ImpostazioniParametri', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'idProfilo'},
		{name: 'ggPrecedenti'},
		{name: 'skMews'},
		{name: 'skMust'},
		{name: 'visualizzaAvanzatePeso'},
		{name: 'visualizzaAvanzateAltezza'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/impostazioni/getbyprofilo',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/impostazioni/getbyprofilo',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/impostazioni/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/impostazioni/update',
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true
});