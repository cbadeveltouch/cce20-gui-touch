Ext.define('CS.parametri.Avpu', {
	extend: 'Ext.data.Store',
	alias: 'store.avpu',
	
	fields: [
		{name:'codice'},
		{name:'valore', convert: v => StdCba.traduci(v)}
	],
	data: [
		[0, 'VIGILE'],
		[1, 'REAGISCE_ALLA_VOCE'],
		[2, 'REAGISCE_AL_DOLORE'],
		[3, 'NON_RISPONDE']
	],
	autoDestroy: true	
});