Ext.define('CS.eventi.cadute.CaduteStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'data', type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/cadute/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/cadute/get',
            create:`${CbaRootServer}`+ '/cba/css/cs/ws/eventi/cadute/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/cadute/update',
            destroy: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/cadute/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});