Ext.define('CS.progetti.ComboNominativo', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cbox',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cbox'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});