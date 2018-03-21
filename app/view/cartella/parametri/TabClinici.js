
Ext.define('CS.parametri.TabClinici',{
    extend: 'Ext.Container',
    xtype: 'parametritabclinici',

    requires: [
        'CS.parametri.TabCliniciController',
    ],

    controller: 'cartella-parametri-tabclinici',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items:[
    	{
    		xtype: 'container',
    		layout:{
    			type: Ext.is.Phone ? 'vbox' : 'hbox',
    			align: 'stretch'
    		},
    		margin: Ext.is.Phone ? null : '0 0 5 0',
    		maxHeight: Ext.is.Phone ? null : 250,
    	//	flex: 1,
    		items:[
    			{
    				xtype: 'container',
    				layout:{
    					type: 'vbox',
    					align: 'stretch'
    				},
    				margin: !Ext.is.Phone ? '30 20 0 0' : null,
    				items:[
    					{
    						xtype: 'selectfield',
    						ItemId: 'SelectAlvo', reference: 'SelectAlvo',
    						label: 'ALVO',
    						margin: '10 0 5 0',
    						width: 305,
    						store:{
    							type: 'risposteCbox'
    						},
    						labelAlign: 'placeholder',
    						labelWidth: 60,
    						displayField: 'descrizione',
    						queryMode: 'local',
    						valueField: 'id',
    						name: 'alvo',
    						editable: false,
    						autoSelect: false
    					},
    					{
    						xtype: 'selectfield',
    						itemId: 'SelectMobilita', reference: 'SelectMobilita',
    						label: 'MOBILITA',
    						margin: '10 0 5 0',
    						width: 305,
    						store:{
    							type: 'risposteCbox'
    						},
    						labelAlign: 'placeholder',
    						labelWidth: 60,
    						displayField: 'descrizione',
    						queryMode: 'local',
    						valueField: 'id',
    						name: 'mobilita',
    						editable: false,
    						autoSelect: false
    					},
    					{
    						xtype: 'selectfield',
    						itemId: 'SelectSonno', reference: 'SelectSonno',
    						label: 'SONNO',
    						labelAlign: 'placeholder',
    						margin: '10 0 5 0',
    						width: 305,
    						store:{
    							type: 'risposteCbox'
    						},
    						labelWidth: 60,
    						displayField: 'descrizione',
    						queryMode: 'local',
    						valueField: 'id',
    						name: 'sonno',
    						editable: false,
    						autoSelect: false
    					}
    				]
    			},
    			{
    				xtype: 'container',
    				margin: '10 0 0 0',
    				layout: {
    					type: 'vbox',
    					align: 'stretch'
    				},
    				items: [
    					{
    						xtype: 'label',
    						cbahtml: 'VALUTAZIONE_COMPORTAMENTO',
    						margin: '0 0 5 0'
    					},
    					{
    						xtype: 'selectfield',
    						itemId: 'SelectComportamento', reference: 'SelectComportamento',
    						label: 'COMPORTAMENTO',
    						margin: '10 0 5 0',
    						width: 305,
    						store:{
    							type: 'risposteCbox'
    						},
    						labelWidth: 60,
    						labelAlign: 'placeholder',
    						displayField: 'descrizione',
    						queryMode: 'local',
    						valueField: 'id',
    						name: 'comportamento',
    						editable: false,
    						autoSelect: false
    					},
    					{
    						xtype: 'selectfield',
    						itemId: 'SelectAttivita', reference: 'SelectAttivita',
    						label: 'ATTIVITA_SVOLTA',
    						margin: '10 0 5 0',
    						width: 305,
    						store:{
    							type: 'risposteCbox'
    						},
    						labelWidth: 60,
    						labelAlign: 'placeholder',
    						displayField: 'descrizione',
    						queryMode: 'local',
    						valueField: 'id',
    						name: 'comportamentoAttivita',
    						editable: false,
    						autoSelect: false
    					}
    				]
    				
    			}
    		]
    	},
    	{
    		xtype: 'container',
    		layout:{
    			type: 'vbox',
    			align: 'stretch'
    		},
    		margin: '5 0 10 0',
    		width: Ext.is.Phone ? 300 : 640,
    		items:[
    			{
    				xtype: 'textareafield',
    				itemId: 'NoteClinici', reference: 'NoteClinici',
    				cls: 'cbaTextArea',
    				name:'tmpNote',
    				label: 'NOTE',
    				labelAlign: 'top',
    				maxRow: 8
    			}
    		]
    	}
    ]
});
