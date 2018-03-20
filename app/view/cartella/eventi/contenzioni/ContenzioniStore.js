Ext.define('CS.eventi.contenzioni.ContenzioniStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'dataFine',type:'date'},
		{name:'dataInizio',type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/get',
            create: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/update',
            destroy: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});