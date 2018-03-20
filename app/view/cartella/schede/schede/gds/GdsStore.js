Ext.define('CS.schede.schede.gds.GdsStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'data', type: 'date'},
		{name: 'valoriTest', convert: function(v, record) {
			if(record.get('valoriTest')) {
				for(var i=0; i<30; i++) {
					record.data['_valoriTest'+(i+1)] = v.charAt(i);
				}
			}
		}}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/gds/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/gds/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/gds/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/gds/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/gds/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});