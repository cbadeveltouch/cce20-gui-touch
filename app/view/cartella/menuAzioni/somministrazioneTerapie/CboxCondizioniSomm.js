Ext.define('CS.menuAzioni.somministrazioneTerapie.CboxCondizioniSomm', {
	extend: 'Ext.data.Store',
	alias: 'store.cboxCondizioniSomm',
	fields: [
		{name: 'id'},
		{name: 'descrizione'},
		{name: 'abilitato'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/listrispostepers',
		api:{
			read: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/listrispostepers'
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true
});