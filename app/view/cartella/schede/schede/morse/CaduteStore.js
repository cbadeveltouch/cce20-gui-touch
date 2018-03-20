Ext.define('CS.schede.schede.morse.CaduteStore', {
	extend: 'Ext.data.Store',
	fields: [
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/caduteLight/list',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/caduteLight/list',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/eventi/caduteLight/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/eventi/caduteLight/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/eventi/caduteLight/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});