Ext.define('CS.schede.standard.provvedimenti.Prov', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'idTest'},
		{name:'compilatore'},
		{name:'data',type:'date'},
		{name:'ora',type:'date',
			convert:function(v,record){
				return record.get('data');
		}},
		{name:'descrProvvedimenti'},
		{name:'provvedimenti'},
		{name:'note'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf',
			convert:function(v,record){
				return '('+record.get('compilatoreFigProf')+')';
		}},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/provvedimenti/listbytest',
		api: {
            read:`${CbaRootServer}`+ '/cba/css/cs/ws/skval/provvedimenti/listbytest',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/skval/provvedimenti/update',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/skval/provvedimenti/new',
			destroy: `${CbaRootServer}`+'/cba/css/cs/ws/skval/provvedimenti/delete',
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});