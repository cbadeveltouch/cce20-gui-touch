Ext.define('Generali.arch.panelPortlet.PortletStore', {
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
	        url: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getVideate',
	        api: {
	            read: `${CbaRootServer}`+'/cba/css/cs/ws/menuprofilibottoni/getVideate'
	        },
	        reader: {
	            type: 'json',
	            messageProperty: 'message',
	            rootProperty: 'children'
	        }
	    },

	    autoDestroy: true   
});
