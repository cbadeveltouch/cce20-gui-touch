Ext.define('Generali.arch.testataStd.TestataStdStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'id'},
		{name: 'data', type:'date'},
		{name: 'compilatore'}
		
	],
	proxy: {
		type: 'ajax',
		method:'GET',		
		url: `${CbaRootServer}`+'/cba/css/cs/ws/testate/get',
		urlGen: '/ws/genCss/testate/get',
		reader: {
			type: 'json',
			messageProperty: 'message',
			rootProperty: 'data'
		}
	},	
	autoDestroy: true	
});