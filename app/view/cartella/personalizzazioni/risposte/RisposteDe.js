Ext.define('CS.personalizzazioni.risposte.store.RisposteDe', {
	extend: 'Ext.data.Store',
	alias: 'store.risposteDe',
	
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
	grouper: {
        groupFn: function(record) {
            return record.get('codifica');
        }
    },
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/listrispostepers',
		api: {
            read:`${CbaRootServer}`+'/cba/css/cs/ws/risposte/listrispostepers',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/risposte/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/risposte/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/risposte/delete'
           
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});