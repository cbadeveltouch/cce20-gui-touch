Ext.define('CS.personalizzazioni.personConsegne.permessi.PermessiConsegneDett', {
	extend: 'generaleStore',
	fields: [
		{name:'id'},
		{name:'permesso'},
	],
	proxy: {
		type: 'ajax',
		method:'GET',
		url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/permessi/listByFigProf',
		api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/permessi/listByFigProf',
			create: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/permessi/save',
			update: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/permessi/save'
        },
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	sorters: [
		{
			property: 'permesso',
			direction: 'DESC'
		},
		{
			property: 'descrizione',
			direction: 'ASC'
		}
		
	],
	autoDestroy: true	
});


