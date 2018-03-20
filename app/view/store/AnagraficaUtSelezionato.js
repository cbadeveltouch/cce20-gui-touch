Ext.define('CbaCssView.store.AnagraficaUtSelezionato', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'}
	],	
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/getMobile',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	autoDestroy: true
});