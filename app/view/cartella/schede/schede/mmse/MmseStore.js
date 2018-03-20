Ext.define('CS.schede.schede.mmse.MmseStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'orientamento'},
		{name:'spazio'},
		{name:'memoria'},
		{name:'memoriaTent'},
		{name:'attenzione'},
		{name:'richiamo'},
		{name:'linguaggio'},
		{name:'ripetizione'},
		{name:'compito'},
		{name:'ordine'},
		{name:'frase'},
		{name:'copiaDisegno'},
		{name:'note'},
		{name:'nonSomministrabile'},
		{name:'idRicovero'},
		{name:'scadenza'},
		{name:'agenda'},
		{name:'convertito'},
		{name:'punteggioMassimo'},
		{name:'slider'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf'}
		
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/mmse/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/mmse/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mmse/registra',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mmse/registra',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/mmse/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});