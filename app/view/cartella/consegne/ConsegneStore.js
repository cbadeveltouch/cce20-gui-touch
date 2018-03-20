Ext.define('CS.consegne.ConsegneStore', {
	extend: 'Ext.data.Store',
	fields: [

        {name: 'id'},
        {name: 'dataOra', type: 'date'},
		{name: 'tipoConsegna'},
        {name: 'note'},
        {name: 'diario'},
		{name: 'note'},
		{name: 'dataRif'},
        {name: 'indicazioniAss'},
        {name: 'allegati'},
        {name: 'alimentaPrePai'},
        {name: 'alimentaPrePri'},
		{name: 'alimentaPrePti'},
		{name: 'compilatoreNominativo'},
		{name: 'compilatoreFigProf'},
		{name: 'data', type: 'date'},
		{name: 'compilatore'},
		{name: 'idRicovero'},
		{name: 'messaggio'}

	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/get',
		api: {
          read: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/get',
		  create: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/new',
		 // update: '/cba/css/cs/ws/consegne/update',
		  destroy: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/delete'
		},
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	autoDestroy: true	
});