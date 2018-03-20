Ext.define('CS.schede.schede.cgi.CgiiStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'data', type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/cgii/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/cgii/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgii/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgii/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/cgii/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});