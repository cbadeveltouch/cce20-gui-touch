Ext.define('Generali.schede.grafico.store.Andamento', {
	extend: 'Ext.data.Store',
	alias: 'store.andamento',
	fields: [
		{name:'data', type:'date'},
		{name:'punteggio'},
		{name:'punteggioComplessivo'},
		{name:'punteggioCorretto'},
		{name:'andatura'},
		{name:'equilibrio'},
		{name:'totale'}
			
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		urlGen: `${CbaRootServer}`+'/ws/genCss/skval/graph/get',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/graph/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/graph/get'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});