Ext.define('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegneModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'dataOra', type: 'date'},
		{name: 'tipoConsegna'},
        {name: 'note'},
        {name: 'diario'},
		{name: 'note'},
        {name: 'allegati'},
		{name: 'compilatoreNominativo'},
		{name: 'compilatoreFigProf'},
		{name: 'data', type: 'date'},
		{name: 'compilatore'},
		{name: 'idRicovero'},
		{name: 'ospiteNominativo'},
		{name: 'letta'},
		{name: 'presaInCarico'},
		{name: 'compilatore'},
		{name: 'colore'},
		{name: 'coloreLabel'},
		{name: 'tipoDiario'}
    ]    
});