Ext.define('CbaCssView.store.Reparti', {
	extend: 'Ext.data.Store',
	alias: 'store.reparti',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'}		
	],	
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genOsp/reparti/search',
		urlGen: `${CbaRootServer}`+'/ws/genOsp/reparti/search',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}	
	},	
	autoDestroy: true,
//	autoLoad: true TODO_PLS 
});