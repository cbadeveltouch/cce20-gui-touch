Ext.define('Generali.arch.menuFascicolo.MenuFascicoloStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'icona'},
		{name: 'descrizione'},
		{name: 'form'},
		{name: 'tipoPermesso'}
	],
	 proxy: {
	        type: 'ajax',
	        method:'GET',
	        url: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getVideatePortlet',
	        api: {
	            read: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getVideatePortlet'
	        },
	        reader: {
	            type: 'json',
	            messageProperty: 'message',
	            rootProperty: 'children'
	        }
	    },

	    autoDestroy: true   
});
