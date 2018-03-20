Ext.define('CS.schede.schede.kane.KaneStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'lettura'},
		{name:'lavoriAMano'},
		{name:'animazione'},
		{name:'telefonate'},
		{name:'giochiSocieta'},
		{name:'segueLaTelevisione'},
		{name:'visiteFamiliari'},
		{name:'visiteAmici'},
		{name:'conversa'},
		{name:'qualcunoIstitutoLegato'},
		{name:'qualcunoFuoriLegato'},
		{name:'eUscito'},
		{name:'ospitatoDormire'},
		{name:'note'},
		{name:'nonSomministrabile'},
		{name:'idRicovero'},
		{name:'scadenza'},
		{name:'agenda'},
		{name:'convertito'},
		{name:'punteggioMassimo'},
		{name:'slider'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf'},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url:  `${CbaRootServer}`+'/cba/css/cs/ws/skval/kane/get',
		api: {
            read:  `${CbaRootServer}`+'/cba/css/cs/ws/skval/kane/get',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/skval/kane/new',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/skval/kane/update',
			destroy: `${CbaRootServer}`+'/cba/css/cs/ws/skval/kane/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});