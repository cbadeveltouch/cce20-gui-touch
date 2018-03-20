Ext.define('CS.parametri.ParametriStore', {
	extend: 'Ext.data.Store',
	fields: [
	
		{name: 'id'},
		{name: 'data' ,type: 'date'},
		{name: 'compilatore'},
		{name: 'pressioneMax'},
		{name: 'pressioneMin'},
		{name: 'frequenza'},
		{name: 'temperatura'},
		{name: 'curvaGli'},
		{name: 'peso'},
		{name: 'diuresi'},
		{name: 'ossigeno'},
		{name: 'spo2'},
		{name: 'tipoRespirazione'},
		{name: 'tipoFreqCardiaca'},
		{name: 'note'},
		{name: 'sonno'},
		{name: 'alimentazione'},
		{name: 'mobilita'},
		{name: 'dolore'},
		{name: 'freqRespiratoria'},
		{name: 'spo2ot'},
		{name: 'oSpo2ot'},
		{name: 'comportamento'},
		{name: 'comportamentoAttivita'},
		{name: 'avpu'},
		{name: 'altezza'},
		{name: 'malattiaAcuta'},
		{name: 'idRicovero'},
		{name: 'alvo'},
		{name: 'dataAl'},
		{name: 'dataDal'},
		{name: 'bmi'},
		{name:'compilatoreNominativo'},
		{name:'compilatoreFigProf'}		
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/getMobile',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/getMobile',
			destroy:`${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/delete',
			create:`${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/new',
			update:`${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/update'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});