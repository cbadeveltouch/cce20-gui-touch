Ext.define('CbaCssView.store.PersonRetrodatazione', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'idProfilo'},
		{name: 'tipo'},
		{name: 'nOre'},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		urlGen: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/retrodatazione/getbyidprofilo',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/retrodatazione/getbyidprofilo',
		api: {
			update: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/retrodatazione/update'
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true
});