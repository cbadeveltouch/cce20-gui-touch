Ext.define('CbaCssView.store.Stanze', {
	extend: 'Ext.data.Store',
	alias: 'store.stanza',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'}		
	],	
	proxy: {
		type: 'ajax',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genOsp/stanze/search',
		urlGen: `${CbaRootServer}`+'/ws/genOsp/stanze/search',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}	
	},	
	autoDestroy: true
});