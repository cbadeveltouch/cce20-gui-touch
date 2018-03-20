
Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.DettSommAttivita',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.DettSommAttivitaController',
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_Operatori'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-dettsommattivita-dettsommattivita',
    
    layout:{
    	type: 'vbox',
    	align:'stretch'
    },
	flex:1,
	items:[
		{
			xtype: 'CbaForm',
			itemId: 'Form', reference: 'Form',
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			trackResetOnLoad: true,
			scrollable: true,
			flex: 1,
			items:[
				{
					xtype: 'container',
					layout:{
						type: 'hbox',
						align:'center'
					},
					items:[
						{
							xtype: 'datepickerfield',
							itemId:'Ora', reference: 'Ora',
							label: 'ORE',
							dateFormat : 'H:i',
		                    width: 90,
		                    inputType: 'time',
		                    triggers: false,
		                    picker: null,
		                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
			                margin: '0 10 0 0 0'
						},
						{
							xtype: 'label',
							itemId: 'Nome', reference: 'Nome',
							cls: 'cbaCssLabel'
						}
					]
				},
				{
					xtype: 'container',
					layout:{
						type: !Ext.is.Phone ? 'hbox' : 'vbox',
						align:'stretch'
					},
					items:[
						{
							xtype: 'selectfield',
							itemId: 'SelectEsito', reference: 'SelectEsito',
//							store: {
//								type: 'esiti'
//							},
							label: 'ESITI',
//							name: 'codArea',
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							autoSelect: false,
							width: 200,
							margin: Ext.is.Phone ? null : '0 10 0 0'
						},	
						{
							xtype: 'container',
							layout:{
								type: 'hbox',
								align:'stretch'
							},
							items:[
								{
									xtype: 'numberfield',
									label: 'OPERATORI',
									name: 'operatoriStd',
									width: 120,
									margin: '0 20 0 0'
								},
								{
									xtype: 'numberfield',
									label: 'CS_TEMPO',
									name: 'tempoStd',
									width: 80
								}
							]
						}
					]
				},
				{
					xtype: 'textareafield',
					itemId: 'Note', reference: 'Note',
					label:'NOTE',
					alignLabel: 'top',
					cls:'cbaTextArea'
				},
				{
					xtype: 'container',
					itemId: 'CntProp', reference: 'CntProp',
					label:'PROPRIETA',
					alignLabel: 'top'
				},
				{
					xtype: 'container',
					itemId: 'CntOperatori', reference: 'CntOperatori',
					label:'OPERATORI',
					alignLabel: 'top'
				}
			]
		}
	]
});
