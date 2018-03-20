Ext.define('CbaCssView.store.schede.Frequenze', {
	extend: 'Ext.data.Store',
	alias: 'store.frequenze',
	fields: [
		{name:'codEnte'},
		{name:'id'},
		{name:'idRicovero'},
		{name:'descFreq'},
		{name:'tipo'},
		{name:'numero'},
		{name:'terapie'},
		{name:'altro'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/tgen/frequenze/list',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/tgen/frequenze/list',
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});
