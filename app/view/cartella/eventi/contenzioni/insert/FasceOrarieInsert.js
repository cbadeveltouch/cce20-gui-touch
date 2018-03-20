
Ext.define('CS.eventi.contenzioni.insert.FasceOrarieInsert',{
    extend: 'Ext.Container',

    requires: [
    	'CS.eventi.contenzioni.insert.FasceOrarieInsertController'
    ],

    controller: 'cartella-eventi-contenzioni-insert-fasceorarieinsert',
    
    layout: {
		type:'vbox',
		align: 'stretch'
	},
	top: '30%',
	left: Ext.is.Phone ? '10%' : '40%',
	width: Ext.is.Phone ? '75%' : 350,
    height: '50%',
    floated: true,
    modal: true,
    hideOnMaskTap: true,
    flex: 1,
    items:[
    	{
	    	xtype: 'CbaForm',
	    	itemId: 'Form', reference:'Form',
			layout: {
				type:'vbox',
				align:'center',
				pack: 'center'
			},
			flex: 1,
//			listeners:{
//				painted: 'creaPulsanti'
//			},
			padding: 20,
			items:[ 
				{
					xtype: 'datepickerfield',
					itemId: 'OraDalle', reference: 'OraDalle',
					label: 'DALLE',
			        increment: 15,
			        labelWidth: 100,
                    width: 200,
			        anchor: '100%',
					dateFormat : 'H:i',
                    inputType: 'time',
                    triggers: false,
                    picker: null,
                    edgePicker: null,
				},
				{
					xtype: 'datepickerfield',
					itemId: 'OraAlle', reference: 'OraAlle',
//			        name: 'fine',
					label: 'ALLE',
			        increment: 15,
			        labelWidth: 100,
                    width: 200,
			        anchor: '100%',
					dateFormat : 'H:i',
                    inputType: 'time',
                    triggers: false,
                    picker: null,
                    edgePicker: null,
				}
			]
	     },
	     {
				xtype: 'toolbar',
				docked: 'bottom',
				layout:{
					type:'hbox',
					align: 'stretch'
				},
				height: 70,
				flex:1,
				items:[
					{
						xtype:'button',
						text:'Esci',
						width: '50%',
						listeners:{
							tap: 'tapBtnAnnulla'
						}
					},
					{
						xtype:'button',
						text:'SALVA',
						width: '50%',
						listeners:{
							tap: 'tapBtnSalva'
						}
					}
				]
			}
    ]
});
