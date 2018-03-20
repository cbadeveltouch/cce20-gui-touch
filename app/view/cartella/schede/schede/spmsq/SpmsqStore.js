Ext.define('CS.schede.schede.spmsq.SpmsqStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name:'id'},
		{name:'data',type:'date'},
		{name:'compilatore'},
		{name:'mms1'},
		{name:'mms2'},
		{name:'mms3'},
		{name:'mms4'},
		{name:'mms5'},
		{name:'mms6'},
		{name:'mms7'},
		{name:'mms8'},
		{name:'mms9'},
		{name:'mms10'},
		{name:'note'},
		{name:'codUtente'},
		{name:'nonSomministrabile'},
		{name:'mesiScadenza'},
		{name:'desc1'},
		{name:'desc2'},
		{name:'desc3'},
		{name:'vCog1'},
		{name:'certificatoProblComp'},
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
		url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/spmsq/get',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/skval/spmsq/get',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/skval/spmsq/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/skval/spmsq/update',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/skval/spmsq/delete'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});