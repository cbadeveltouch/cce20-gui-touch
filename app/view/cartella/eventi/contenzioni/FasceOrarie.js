Ext.define('CS.eventi.contenzioni.FasceOrarie', {
	extend: 'Ext.data.Store',
	alias: 'store.fasceOrarie',
	fields: [
		{name:'id'},
		{name:'idTe'},
		{name:'inizio',type:'date'},
		{name:'fine',type:'date'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/get'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true,
	remoteSort: true
});