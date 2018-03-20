Ext.define('CS.eventi.contenzioni.ComboMedico', {
	extend: 'Ext.data.Store',
	alias: 'store.medico',
	fields: [
		{name:'codice'},
		{name:'valore'},
		{name:'extra'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cbox?tipo=M',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cbox?tipo=M'
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});