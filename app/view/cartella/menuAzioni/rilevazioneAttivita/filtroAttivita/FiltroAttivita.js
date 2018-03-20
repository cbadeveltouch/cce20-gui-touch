
Ext.define('CS.menuAzioni.rilevazioneAttivita.filtroAttivita.FiltroAttivita',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.filtroAttivita.FiltroAttivitaController',
        'CbaCssView.store.Sedi',
        'CbaCssView.store.Reparti',
        'CbaCssView.stroe.personAttivita.Aree'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-filtroattivita-filtroattivita',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    padding: '0 10 0 10',
    flex: 1,
    items:[
			{
				xtype: 'selectfield',
				itemId: 'Sede', reference: 'Sede',
				placeholder: 'SEDE',
				flex: 1,
				name: 'sede',
				displayField: 'valore',
				queryMode: 'local',
				store:{
					type: 'sede'
				},
				valueField: 'codice',
				tpl: Ext.create('Ext.XTemplate',
					'<tpl for=".">',
						'<tpl if="extra==\'T\'">',
							'<div class="x-boundlist-item"><i>{valore}</i></div>',
						'<tpl else>',
							'<div class="x-boundlist-item">{valore}</div>',
						'</tpl>',
					'</tpl>'
				),
				autoSelect: false,
				listeners: {
					change: 'changeSelectSede'
				}
			},
			{
				xtype: 'selectfield',
				flex: 1,
				itemId: 'Reparto', reference: 'Reparto',
				name: 'reparto',
				placeholder: 'REPARTO',
				displayField: 'valore',
				queryMode: 'local',
				store:{
					type: 'reparti'
				},
				valueField: 'codice',
				tpl: Ext.create('Ext.XTemplate',
					'<tpl for=".">',
						'<tpl if="extra==\'T\'">',
							'<div class="x-boundlist-item"><i>{valore}</i></div>',
						'<tpl else>',
							'<div class="x-boundlist-item">{valore}</div>',
						'</tpl>',
					'</tpl>'
				),
				autoSelect: false,
				listeners: {
					change: 'changeSelectReparto'
				}
			},
			{
				xtype: 'selectfield',
				itemId: 'SelectAree', reference: 'SelectAree',
				store: {
					type: 'aree'
				},
				placeholder: 'FILTRO_AREA',
//				name: 'codArea',
				displayField: 'descrizione',
				queryMode: 'local',
				valueField: 'id',
				autoSelect: false,
				flex: 1
			},	
			{
				xtype: 'container',
				layout:{
					type:'hbox',
					align:'stretch'
				},
				flex:1,
				items:[
					{
						xtype: 'datepickerfield',
						itemId:'Data', reference: 'Data',
						label: 'DATA',
//						name: 'data',
						dateFormat : 'd/m/Y',
		                width: 105,
		                height: 47,
		                triggers: false,
		                listeners:{
//		                	change: 'changeData'
		                },
		                margin: '0 10 0 0 0'
					},
					{
						xtype: 'datepickerfield',
						itemId:'OraDalle', reference: 'OraDalle',
						label: 'DALLE',
						dateFormat : 'H:i',
	                    width: 90,
	                    height: 47,
	                    inputType: 'time',
	                    triggers: false,
	                    picker: null,
	                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
		                margin: '0 10 0 0 0'
					},
					{
						xtype: 'datepickerfield',
						itemId:'OraAlle', reference: 'OraAlle',
						label: 'ALLE',
						dateFormat : 'H:i',
	                    width: 90,
	                    height: 47,
	                    inputType: 'time',
	                    triggers: false,
	                    picker: null,
	                    edgePicker: null//TODO_PLS da sistemare per non vedere picker
					}
				]
			}
    ]
});
