
Ext.define('CS.menuAzioni.somministrazioneTerapie.DettaglioOspite',{
    extend: 'Ext.Panel',

    requires: [
        'CS.menuAzioni.somministrazioneTerapie.DettaglioOspiteController',
    ],

    controller: 'cartella-menuazioni-somministrazioneterapie-dettaglioospite',
    
    layout: {
		type:'vbox',
		align: 'stretch'
	},
	top: '20%',
	left: Ext.is.Phone ? '10%' : '25%',
	width: Ext.is.Phone ? '80%' : '50%',
    height: '60%',
    floated: true,
    modal: true,
    hideOnMaskTap: true,
    flex: 1,
    items:[
    	{
	    	xtype: 'panel',
	    	layout: {
	    		type:'vbox',
	    		align:'stretch'
	    	},
	    	paddin: 10,
	    	margin: '0 10 0 10',
	    	items: [     
				{
					xtype: 'displayfield',
					labelCls: 'cbaCssLabelTitolo',
					labelAlign: 'top',
					label: 'TERAPIE_ASSISTITO',
					itemId: 'LbAssistito', reference: 'LbAssistito',
					labelWidth: 100,
					fieldStyle: {
						'font-size' : '18px',
						'font-weight': 'bold',
						'color' : '#3E5C8D'
					}
				},
				{
					xtype: 'displayfield',
					labelCls: 'cbaCssLabelTitolo',
					labelAlign: 'top',
					labelWidth: 100,
					label: 'CS_DATA_NASCITA',
					itemId: 'LbDataNascita', reference: 'LbDataNascita'
				},
				{
					xtype: 'displayfield',
					labelCls: 'cbaCssLabelTitolo',
					labelAlign: 'top',
					labelWidth: 100,
					label: 'COD_FISC',
					itemId: 'LbCodFisc', reference: 'LbCodFisc',
				},
				{
					xtype: 'displayfield',
					labelCls: 'cbaCssLabelTitolo',
					label: 'RESIDENZIALE',
					labelWidth: 100,
					labelAlign: 'top',
					itemId: 'LbResidenziale', reference: 'LbResidenziale',
					height: 40
				}
			]
	    }
    ]
});
