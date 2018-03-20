Ext.define('CS.schede.schede.Tinetti.TinettiStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'andInizioDeamb'},
		{name:'andLunghPassoDx'},
		{name:'andAltezzaPassoDx'},
		{name:'andLunghPassoSx'},
		{name:'andAltezzaPassoSx'},
		{name:'andSimmetria'},
		{name:'andContinuitaPasso'},
		{name:'andTraiettoria'},
		{name:'andTronco'},
		{name:'andCammino'},
		{name:'nonSomministrabile'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/tinetti/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/tinetti/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/tinetti/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/tinetti/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/tinetti/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});