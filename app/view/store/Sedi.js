Ext.define('CbaCssView.store.Sedi', {
	extend: 'Ext.data.Store',
	alias: 'store.sede',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'}		
	],	
	proxy: {
		type: 'ajax',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genOsp/sedi/search',
		urlGen: `${CbaRootServer}`+'/ws/genOsp/sedi/search',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}	
	},	
	autoDestroy: true,
//	autoLoad: true
});