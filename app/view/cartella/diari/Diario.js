
Ext.define('CS.diari.Diario',{
    extend: 'Ext.Container',

    requires: [
        'CS.diari.DiarioController',
        'CS.accertamenti.CbPatologie',
        'Ext.panel.Collapser',
        'CbaUtils.componenti.all.CbaForm',
        'CS.diari.DiarioStore',
        'CS.consegne.Consegne'
    ],

    controller: 'cs-diari-diario',
    
    items: [
		{
			xtype: 'CbaForm',
			itemId: 'Form', reference: 'Form',
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			trackResetOnLoad: true,
			scrollable: false,
			flex: 1,
			items:[
				{
					xtype: 'textfield',
					name: 'id',
					hidden: true
				},
				{
					xtype: 'panel',
					itemId: 'FieldCheck', reference: 'FieldCheck',
					title: 'OPZIONI_DIARIO',
					cls: 'cbaPanelCollapsed',
					width: '100%',
					layout:{
						type: 'hbox',
						align: 'stretch'
					},
					margin: '0 0 5 0',
					collapsed: true,
					collapsible: true,
					items:[
						{
		    	        	xtype: 'container',
		    	        	layout: {
		    	        		type: 'vbox',
		    	        		align: 'stretch'
		    	        	},
		    	        	items:[
								{
									xtype: 'container',
									itemId: 'CntCheck', reference: 'CntCheck',
									layout: {
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align:'stretch'
									},
									items:[
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'EventoAcuto', reference: 'EventoAcuto',
											labelWidth: 120,
											width: 140,
											labelAlign: 'right',
											label: 'EVENTO_ACUTO',
											hidden: false,
											name: 'eventoAcuto',
											value: true,
											inputValue: true
										},
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'Evidenziare', reference: 'Evidenziare',
											labelWidth: 175,
											width: 195,
											labelAlign: 'right',
											label: 'EVENTO_DA_EVIDENZIARE',
											hidden: false,
											name: 'eventoEvidenzia',
											value: true
										},
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'Riservato', reference: 'Riservato',
											labelWidth: 160,
											width: 180,
											labelAlign: 'right',
											label: 'INFO_RISERVATA',
											hidden: true,
											name: 'riservato',
											value: true
										},
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'AlimentaPrepai', reference: 'AlimentaPrepai',
											labelWidth: 140,
											width: 160,
											labelAlign: 'right',
											label: 'ALIMENTAPREPAI',
											hidden: true,
											name: 'alimentaPrePai',
											value: true
										},
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'AlimentaPrepri', reference: 'AlimentaPrepri',
											labelWidth: 140,
											width: 160,
											labelAlign: 'right',
											label: 'ALIMENTAPREPRI',
											hidden: true,
											name: 'alimentaPrePri',
											value: true
										},
										{
											xtype: 'checkboxfield',
											margin: '0 8 0 0',
											itemId: 'AlimentaPrepti', reference: 'AlimentaPrepti',
											labelWidth: 140,
											width: 160,
											labelAlign: 'right',
											label: 'ALIMENTAPREPTI',
											hidden: true,
											name: 'alimentaPrePti',
											value: true
										}
									]
								},
								{
									xtype: 'container',
									items: [
										{
											xtype: 'selectfield',
											itemId: 'CboxPatologie', reference: 'CboxPatologie',
											hidden: true,
											labelWidth: 140,
											labelAlign: 'top',
											width: 300,
											queryMode: 'local',
											label: 'PORTLET_PATOLOGIE'/*'PORTLET_PATOLOGIE'*/,
											displayField: 'valore',
											valueField: 'codice',
											name: 'codPatologia',
											autoSelect: false,
											store: {
												type: 'patologie'
											},
											listConfig: {
												tpl: new Ext.XTemplate(
													'<tpl if="this.launch() == true">'+
													'<tpl for=".">'+
													'<tpl if="this.isGruppo(extra) == true">'+
													// '<hr style="background-color: blue; height: 5px; margin:2px 0 2px; 0">'+
													'<br/>'+
													'<span style="color:blue;margin-top:10px;"><strong>{tmpExtra}</strong><hr style="background-color: blue; height: 3px; margin:2px 0 2px; 0"></span>'+
													// '<hr style="background-color: blue; height: 5px; margin:2px 0 2px; 0">'+
													'<div class="x-boundlist-item">{valore}</div>'+
													'<tpl else>'+
													'<div class="x-boundlist-item">{valore}</div>'+
													'</tpl>'+
													'</tpl>'+
													'</tpl>',
													{
														// XTemplate configuration:
														compiled: true,
														gruppoOld: null,
														isGruppo: function(gruppo){
															var grpOld = this.gruppoOld;
															if(gruppo != null)
															this.gruppoOld = gruppo;
															this.countGruppo++;
															return (gruppo != null) && (gruppo != grpOld);
														},
														launch: function(){
															this.gruppoOld = null;
															this.countGruppo = 0;
															return true;
														}
													}
												)
											}
										}
								    ]
								},
								{
									xtype:'container',
									layout:{
										type:'hbox'
									},
									itemId:'CntAgenda',reference:'CntAgenda',
									margin:'10 0 0 5',
									hidden: true,
									items:[
										   
										{	
											xtype: 'image',
											margin:'0 5 0 0',
											itemId:'ImgCalendario',reference:'ImgCalendario',
											width:34,
											height:34
										},
										{
											xtype: 'sliderfield',
											useTips: false,
											itemId:'FiltroAgenda', reference:'FiltroAgenda',
											width: 40,
											increment: 1,
											minValue: 0,
											maxValue: 1,
											//name:'slider',
											margin: '0 5 0 5',
											fieldLabel: 'AGENDA',
											labelAlign: 'top',
											labelClsExtra: 'cbaCssLabel',
											labelSeparator: '',
											isFormField: false,
											listeners:{
												change: 'changeFiltroAgenda'
											}
										}
									]
								}
    	        	        ]
		    	        }
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					scrollable: true,
					flex:1,
					items: [
						{
							xtype: 'label',
							itemId: 'DescrDiario', reference: 'DescrDiario'
						},
						{
							xtype: 'textareafield',
							itemId: 'Diario', reference: 'Diario',
							cls: 'cbaTextArea',
							name: 'note',
							labelAlign: 'top',
							width: '95%',
							height: 200,
							padding: '5px'
						},
						{
							xtype: 'textareafield',
							itemId: 'IndicazioniAssistenziali', reference: 'IndicazioniAssistenziali',
							label: 'INDICAZIONI_ASSISTENZIALI',
							cls: 'cbaTextArea',
							hidden: true,
							name: 'indicazioniAss',
							labelAlign: 'top',
							width: '95%',
							height: 200,
							padding: '5px'
						}
					]
				}
				
			]
		}
	]
});
