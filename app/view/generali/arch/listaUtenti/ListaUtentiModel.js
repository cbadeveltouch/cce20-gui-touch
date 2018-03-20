Ext.define('Generali.arch.listaUtenti.ListaUtentiModel', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'codOspite'},
		{name: 'sesso'},
		{name: 'idRicovero'},
		{name: 'idProfilo'},
		{name: 'id'},
		{name: 'dataNascitaFormatted'},
		{name: 'nominativo'},
		{name: 'attivo'},
    ]
});