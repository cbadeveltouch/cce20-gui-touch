
Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiInsert',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.standard.provvedimenti.TabProvvedimentiInsertController'
    ],

    controller: 'cartella-schede-standard-provvedimenti-tabprovvedimentiinsert',
    
    layout: {
		type:'vbox',
		align: 'stretch'
	},
	top: '10%',
	left: Ext.is.Phone ? '5%' : '40%',
	width: Ext.is.Phone ? '90%' : 350,
    height: '80%',
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
				align:'stretch'
			},
			flex: 1,
//			listeners:{
//				painted: 'creaPulsanti'
//			},
			padding: 20,
			items:[ 
				{
					xtype: 'datepickerfield',
					itemId:'DataInsert', reference: 'DataInsert',
					label: 'DATA',
					labelCls: 'labelStrong',
					labelWidth: 50,
					dateFormat : 'd/m/Y',
                    width: 200,
                    allowBlank:false,
					readOnly: true
				},
				{
					xtype: 'datepickerfield',
					itemId:'OraInsert', reference: 'OraInsert',
					label: 'ORA',
					labelCls: 'labelStrong',
					dateFormat : 'H:i',
					labelWidth: 50,
                    width: 200,
                    triggers: false,
                    inputType: 'time',
                    allowBlank:false,
                    picker: null,
                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
                    listeners:{
                    	blur: 'blurOra'
                    }
				},
				{
					xtype:'label',
					margin: '5 0 0 0',
					html: 'PROVVEDIMENTI',
					cls: 'labelStrong'
				},
				{
					   xtype: 'fieldcontainer',
					   layout:{
						   align:'stretch',
						   type: 'vbox'
					   },
					   margin: '5 0 0 0',
					   itemId: 'Provvedimenti', reference: 'Provvedimenti',
					   height: 100
			    },
				{
					xtype:'textareafield',
					itemId: 'Note', reference: 'Note',
					cls: 'cbaTextArea',
					label: 'NOTE',
					labelCls: 'labelStrong',
					labelAlign: 'top',
					height: 180,
					name: 'note'
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
