Ext.define('CS.consegne.FigProfStore', {
	extend: 'Ext.data.TreeStore',
	alias: 'store.figProf',
	fields: [
		{name: 'text'},
        {name: 'id'},
        {name: 'checked'},
        {name: 'codFigProf'},
	],	
	autoLoad: false,		
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/tbgen/figprofmobile/tree',		
		api: {
			read: `${CbaRootServer}`+'/cba/css/cs/ws/tbgen/figprofmobile/tree'
        },
        reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true
});