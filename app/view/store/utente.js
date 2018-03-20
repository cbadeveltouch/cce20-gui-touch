Ext.define('CbaCssView.store.utente', {
    extend: 'Ext.data.Store', 
               
	fields: [
		{
			name: 'codUtente'
		},
		{
			name: 'codProfilo'
		},
		{
			name: 'dataAttivazionePwd'
		},
		{
			name: 'nomeUtente'
		},
		{
			name: 'pwd'
		},
		{
			name: 'amministratore'
		},
		{
			name: 'loginAutomatico'
		},
		{
			name: 'abilitato'
		},
		{
			name: 'utenteDb'
		},
		{
			name: 'passwordUtenteDb'
		},
		{
			name: 'autorizzatore'
		},
		{
			name: 'lingua'
		},
		{
			name: 'codPenna'
		}
	],
	
	
	proxy: {
		type: 'ajax',		
		url: `${CbaRootServer}`+'/cba/gen/auth/login',
		api: {
            read: `${CbaRootServer}`+'/cba/gen/auth/login',
        },
        actionMethods: {
            read: 'POST'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	
	autoDestroy: true
});