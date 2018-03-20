Ext.define('Generali.arch.homeAppMenu.ListaMenuButton', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'},
		{name: 'tipo'}
	],
	 proxy: {
	        type: 'ajax',
	        method:'GET',
	        url: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getButtonFromProfile',
	        api: {
	            read: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getButtonFromProfile'
	        },
	        reader: {
	            type: 'json',
	            messageProperty: 'message',
	            rootProperty: 'children'
	        }
	    },

	    autoDestroy: true   
});
