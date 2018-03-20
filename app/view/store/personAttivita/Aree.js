Ext.define('CbaCssView.stroe.personAttivita.Aree', {
	extend: 'Ext.data.Store',
	alias: 'store.aree',
	fields: [
		{name: 'id'},
		{name: 'descrizione'},
		{name: 'idProfilo'},
		{name: 'coloreCodificaS2'},
		{name: 'iconaS2'},	
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url:  `${CbaRootServer}`+'/cba/css/cs/ws/attivita/aree/listByProfilo',
		api:{
			read:  `${CbaRootServer}`+'/cba/css/cs/ws/attivita/aree/listByProfilo',
            create:  `${CbaRootServer}`+'/cba/css/cs/ws/attivita/aree/new',
            update:  `${CbaRootServer}`+'/cba/css/cs/ws/attivita/aree/update',
            destroy:  `${CbaRootServer}`+'/cba/css/cs/ws/attivita/aree/delete'			
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	
	autoDestroy: true
});