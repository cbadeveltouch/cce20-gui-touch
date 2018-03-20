Ext.define('CbaCssView.store.CboxUtenti', {
	extend: 'Ext.data.Store',
    fields:[
        {name: 'codice'},
        {name: 'valore'},
        {name: 'extra'},
		{name: 'nome', convert: function(value, rec) {
			return rec.get('valore');
		}}
    ],
	proxy: {
		type: 'ajax',	
		url: `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/cbox',		
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	autoDestroy: true,
    autoLoad: false
});