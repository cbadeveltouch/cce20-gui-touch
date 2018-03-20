Ext.define('CS.schede.schedeModulari.domande.store.DomandeStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'codiceModulo'},
		{name:'idRicovero'},
		{name: 'data', type:'date'},
		{name:'compilatore'},
		{name:'note'},
		{name:'nonSomministrabile'},
		{name:'scadenza'},
		{name:'domande'},
		{name:'agenda'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/test/getTest',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/test/getTest',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/test/delete',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/test/registra',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/test/registra'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});