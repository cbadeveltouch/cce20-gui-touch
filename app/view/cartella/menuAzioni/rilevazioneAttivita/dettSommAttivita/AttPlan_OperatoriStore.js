Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_OperatoriStore', {
	extend: 'Ext.data.Store',
	alias: 'store.figProfCbox',
	fields: [
		{name:'selected'}
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cboxCodFigProf',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/cboxCodFigProf'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},
	sorters: 'valore',
	autoDestroy: true
});