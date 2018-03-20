Ext.define('Generali.arch.listaUtenti.ListaUtentiStore', {
	extend: 'Ext.data.Store',
	model: 'Generali.arch.listaUtenti.ListaUtentiModel',
	alias: 'store.listaUtenti',
	fields: [
		{name: 'codOspite'},
		{name: 'sesso'},
		{name: 'idRicovero'},
		{name: 'idProfilo'},
		{name: 'id'},
		{name: 'dataNascitaFormatted'},
		{name: 'nominativo'},
		{name: 'attivo'},
	],
	proxy: {
        type: 'ajax',
        method:'GET',
        url: `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/listMobile',
        api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/listMobile'
        },
        reader: {
            type: 'json',
            messageProperty: 'message',
            rootProperty: 'data'
        }
    },

    autoDestroy: true
});
