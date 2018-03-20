Ext.define('CbaCssView.store.schede.Punteggio', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'codiceModulo'},
		{name:'punteggioMin'},
		{name:'punteggioMax'},
		{name:'descrizione'},

	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/risultati/listbymodulo',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/risultati/listbymodulo',
			
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});