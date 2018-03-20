Ext.define('CbaCssView.store.enti', {
    extend: 'Ext.data.Store',	
    alias: 'store.enti',

	fields: [
		{
			name: 'codice'
		},
		{
			name: 'valore'
		},
		{
			name: 'extra'
		},
		{
			name: 'idProfiloCss'
		}
	],
	
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/gen/auth/enti/getbyprof',
		 actionMethods: {
            read: 'GET'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	
	autoDestroy: true
});