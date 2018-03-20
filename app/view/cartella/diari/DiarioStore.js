Ext.define('CS.diari.DiarioStore', {
	extend: 'Ext.data.Store',
	model: 'CS.diari.DiarioModel',
	fields:[
		{name:'eventoEvidenzia', type: 'string'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/diari/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/diari/get',
            create: `${CbaRootServer}`+'/cba/css/cs/ws/diari/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/diari/update',
            destroy: `${CbaRootServer}`+'/cba/css/cs/ws/diari/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	  
	autoDestroy: true	
});