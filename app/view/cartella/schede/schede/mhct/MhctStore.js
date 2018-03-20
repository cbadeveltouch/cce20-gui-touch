Ext.define('CS.schede.schede.mhct.MhctStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'data', type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/mhct/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/mhct/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mhct/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mhct/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mhct/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});