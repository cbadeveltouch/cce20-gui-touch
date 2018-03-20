Ext.define('CS.schede.schede.morse.MorseStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'idRicovero'},
		{name:'codEnte'},
		{name:'codOspite'},
		{name:'data', type:'date'},
		{name:'compilatore'},
		{name:'note'},
		{name:'codUtente'},
		{name:'nonSomministrabile'},
		{name:'scadenza'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/morse/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/morse/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/morse/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/morse/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/morse/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});