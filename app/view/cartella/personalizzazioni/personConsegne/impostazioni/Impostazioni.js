Ext.define('CS.personalizzazioni.personConsegne.impostazioni.Impostazioni', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'idProfilo'},
		{name:'ggAddietro'},
		{name:'ggSuccessivi'},
		{name:'ggPreavvisoTerapie'},
		{name:'ggRivalContenzione'},
		{name:'ggPrenotazioneAcc'},
		{name:'voci'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/impostazioni/getByProfilo',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/impostazioni/getByProfilo',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/impostazioni/new',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/impostazioni/update',
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});