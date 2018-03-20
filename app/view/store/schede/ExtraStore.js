Ext.define('CbaCssView.store.schede.ExtraStore', {
	extend: 'Ext.data.Store',
	fields: [

		{name:'id'},
		{name:'descrModulo'},
		{name:'provvedimenti'},
		{name:'descrArea'},
		{name:'totale'},
		{name:'areaRisp'},
		{name:'domandaRisp'},
		
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/moduli/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/moduli/get',
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});