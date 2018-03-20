Ext.define('CS.personalizzazioni.risposte.store.RisposteCbox', {
	extend: 'Ext.data.Store',
	alias: 'store.risposteCbox',
	
	fields: [
		{name:'id'},
		{name:'codDomanda'},
		{name:'codArea'},
		{name:'descrizione'},
		{name:'label'},
		{name:'coloreCodifica'},
		{name:'coloreCodificaS2'},
		{name:'codifica'},
		{name:'caduta'},
		{name:'classificazione'},
		{name:'ordinamento'},
		{name:'abilitata'},
		{name:'dataInizio', type:'date'},
		{name:'dataFine', type:'date'},
		{name:'readOnly'},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
		api: {
            read:`${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
           
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true,
	
	
});