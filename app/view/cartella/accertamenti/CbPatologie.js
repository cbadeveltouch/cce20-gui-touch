Ext.define('CS.accertamenti.CbPatologie', {
	extend: 'Ext.data.Store',
	alias: 'store.patologie',
	fields: [
		{name: 'codice'},
		{name: 'valore'},
		{name: 'extra'},
		{name: 'tmpExtra', convert: function(v, record){
			var stato = '';
			if(record.get('extra') == 1)
				stato = StdCba.traduci('STATO_ATTIVO');
			else if(record.get('extra')  == 2){
				stato = StdCba.traduci('STATO_RISOLTO');
			}
			else {
				stato = StdCba.traduci('STATO_CRONICO');
			}
			return stato;
		}},
	],
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/cbox',		
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}		
	},
	autoDestroy: true
});