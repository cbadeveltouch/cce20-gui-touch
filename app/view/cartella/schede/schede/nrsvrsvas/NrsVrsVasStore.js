Ext.define('CS.schede.schede.nrsvrsvas.NrsVrsVasStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'nonSomministrabile'},
		{name:'percentuale'},
		{name:'mesiScadenza'},
		{name:'valore'},
		{name:'valoreAnalogico'},
		{name:'tipo'},
		{name:'note'},
		{name:'progVisita'},
		{name:'idRicovero'},
		{name:'scadenza'},
		{name:'agenda'},
		{name:'punteggioMassimo'},
		{name:'slider'},
		{name:'fattoreCorrezione'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf'},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/dolore/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/dolore/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/dolore/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/dolore/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/dolore/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});