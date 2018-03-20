Ext.define('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.ListaConsegneMobile', {
	extend: 'Ext.data.Store',
	model: Ext.create('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegneModel'),

	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/list',
		api: {
          read: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/listM',
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