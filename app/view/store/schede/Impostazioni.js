Ext.define('CbaCssView.store.schede.Impostazioni', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'idProfilo'},
		{name: 'scadenza'},
		{name: 'ggControlloIngresso'},
		{name: 'scadenzaSis'},
		{name: 'segnalazioneScadenza'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/impostazioni/getbyprofilo',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/impostazioni/getbyprofilo',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/genCss/skval/impostazioni/update',
          },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true
});