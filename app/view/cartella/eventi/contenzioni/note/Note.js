Ext.define('CS.eventi.contenzioni.note.Note', {
	extend: 'Ext.data.Store',
	alias: 'store.note',
	fields: [
		{name:'data',type:'date'},
		{name:'ora',type:'date',
			convert:function(v,record){
				return record.get('data');
		}}
	],
	
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/list',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/list',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/update',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/new',
			destroy: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});