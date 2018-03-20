Ext.define('CS.schede.schedeModulari.domande.StoreDati', {
	extend: 'Ext.data.Store',
	fields: [
	
		{name: 'tab'},
		{name: 'descrDomanda'},
		{name: 'name'},
		{name: 'risposte'},
		{name: 'sottoDomanda'},
	],	
	data: [],
	autoLoad: true,
	autoDestroy: true
});