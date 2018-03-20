
Ext.define('CS.schede.schede.mhct.domanda8.Domanda8',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.mhct.domanda8.Domanda8Controller'
    ],

    controller: 'cartella-schede-schede-mhct-domanda8-domanda8',
    
    items: [
		{
			xtype: 'selectfield',
			itemId: 'SelecteDom8', reference: 'SelecteDom8',
//			name:this.cbaConfig.risposta.subName,
			width: 50,
            triggers: false,
			autoSelect: false,
			listeners:{
				change: 'selectDom8'
			},
			options: [
				{
					 text: '1',
		             value: 1
				},
				{
					 text: '2',
		             value: 2
				},
				{
					 text:'3',
		             value: 3
				},
				{
					 text: '4',
		             value: 4
				},
				{
					 text: '5',
		             value: 5
				}
			]
		}
	]
});
