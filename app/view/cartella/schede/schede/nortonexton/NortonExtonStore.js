Ext.define('CS.schede.schede.nortonexton.store.NortonExton', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'condGenerali'},
		{name:'statoMentale'},
		{name:'capCamminare'},
		{name:'capMuoversi'},
		{name:'incontinenza'},
		{name:'diabete'},
		{name:'ipertensione'},
		{name:'albuminetemia'},
		{name:'tempCorporea'},
		{name:'uso5Farmaci'},
		{name:'modStatoMentale'},
		{name:'ematocritoMaschi'},
		{name:'ematocritoFemmine'},
		{name:'nonSomministrabile'},
		{name:'note'},
		{name:'nonSomministrabile'},
		{name:'mesiScadenza'},
		{name:'rischioDec'},
		{name:'punteggioMassimo'},
		{name:'idRicovero'},
		{name:'scadenza'},
		{name:'agenda'},
		{name:'punteggioMassimo'},
		{name:'slider'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf'},
		
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/norton/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/norton/get',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/skval/norton/new',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/skval/norton/update',
			destroy: `${CbaRootServer}`+'/cba/css/cs/ws/skval/norton/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});