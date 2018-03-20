Ext.define('CS.schede.schede.cgi.CgiStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'data', type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/cgi/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/cgi/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgi/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgi/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgi/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});