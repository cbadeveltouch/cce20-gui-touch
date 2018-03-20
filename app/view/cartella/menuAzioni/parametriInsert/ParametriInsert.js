
Ext.define('CS.menuAzioni.parametriInsert.ParametriInsert',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.parametriInsert.ParametriInsertController'
    ],

    controller: 'cartella-menuazioni-parametriinsert-parametriinsert',
    
    itemId: 'ContainerMain', reference: 'ContainerMain',
	layout: {
		type: Ext.is.Phone ? 'vbox' : 'hbox',
		align: 'stretch'
	},
	flex: 1,
	items: [
		{
			xtype: 'CbaForm',
			itemId: 'Form', reference: 'Form',
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			padding: '5px',
			margin: '0 0 0 10',
			flex: 1,
			items:[
				{
					xtype: 'container',
					itemId: 'CntPressioneOrto', references: 'CntPressioneOrto',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '0 0 10 0',
					parametro: 'PressioneOrto',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							decimalPrecision: 0,
							maxLength: 3,
							maxValue: 999,
							itemId: 'PressioneMax_orto', reference: 'PressioneMax_orto',
							labelWidth: 110,
							width: '80%',
							label: 'SISTOLICA',
							name: 'pressioneMaxOrto',
							validators: function (val) {
				                var errMsg = StdCba.traduci("ERR_POSITIVO");  
				                return (val <0) ? errMsg : true;
				            },
				            errorTarget: 'under',
				            listeners:{
				            	painted: function(th){
				            		th.errorIconElement.dom.className = ''
				            	}
				            }
						},
						{
							xtype: 'numberfield',
							decimalPrecision: 0,
							maxLength: 3,
							maxValue:999,
							itemId: 'PressioneMin_orto', reference: 'PressioneMin_orto',
							labelWidth: 110,
							width: '80%',
							label: 'DIASTOLICA',
							name: 'pressioneMinOrto',
							validators: function (val) {
				                var errMsg = StdCba.traduci("ERR_POSITIVO");  
				                return (val <0) ? errMsg : true;
				            },
				            errorTarget: 'under',
				            listeners:{
				            	painted: function(th){
				            		th.errorIconElement.dom.className = ''
				            	}
				            }
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntPressioneClino', references: 'CntPressioneOrto',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '0 0 10 0',
					parametro: 'PressioneClino',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							decimalPrecision: 0,
							maxLength: 3,
							maxValue: 999,
							itemId: 'PressioneMax_clino', reference: 'PressioneMax_clino',
							labelWidth: 110,
							width: '80%',
							label: 'SISTOLICA',
							name: 'pressioneMaxClino',
							validators: function (val) {
				                var errMsg = StdCba.traduci("ERR_POSITIVO");  
				                return (val <0) ? errMsg : true;
				            },
				            errorTarget: 'under',
				            listeners:{
				            	painted: function(th){
				            		th.errorIconElement.dom.className = ''
				            	}
				            }
						},
						{
							xtype: 'numberfield',
							decimalPrecision: 0,
							maxLength: 3,
							maxValue:999,
							itemId: 'PressioneMin_clino', reference: 'PressioneMin_clino',
							labelWidth: 110,
							width: '80%',
							label: 'DIASTOLICA',
							name: 'pressioneMinClino',
							validators: function (val) {
				                var errMsg = StdCba.traduci("ERR_POSITIVO");  
				                return (val <0) ? errMsg : true;
				            },
				            errorTarget: 'under',
				            listeners:{
				            	painted: function(th){
				            		th.errorIconElement.dom.className = ''
				            	}
				            }
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntFreqRespiratoria', references: 'CntFreqRespiratoria',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'FreqRespiratoria',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'FreqRespiratoria', reference: 'FreqRespiratoria',
							label: 'FREQUENZA_RESPIRATORIA',
							labelAlign: 'placeholder',
							width: 250,
							name: 'freqRespiratoria'
						},
						{
							xtype: 'selectfield',
							itemId: 'SelectTipoRespiratoria', reference: 'SelectTipoRespiratoria',
							label: 'TIPO',
							labelAlign: 'placeholder',
							store:{
								type: 'risposteDe'
							},
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							autoSelect: false,
							width: 250,
							name: 'tipoRespirazione',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntFreqCardiaca', references: 'CntFreqCardiaca',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'FreqCardiaca',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'FreqCaridaca', reference: 'FreqCaridaca',
							label: 'FREQUENZA_CARDIACA',
							labelAlign: 'placeholder',
							width: 250,
							name: 'frequenza'
						},
						{
							xtype: 'selectfield',
							itemId: 'SelectTipoCardiaca', reference: 'SelectTipoCardiaca',
							label: 'TIPO',
							labelAlign: 'placeholder',
							autoSelect: false,
							width: 250,
							store:{
								type: 'risposteDe'
							},
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							name: 'tipoFreqCardiaca',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntTemperatura', references: 'CntTemperatura',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Temperatura',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'TemperaturaCorporea', reference: 'TemperaturaCorporea',
							label: 'TEMPERATURA_CORPOREA',
							labelAlign: 'placeholder',
							width: 250,
							name: 'temperatura',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntGlicemia', references: 'CntGlicemia',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Glicemia',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'Glicemia', reference: 'Glicemia',
							label: 'UNITA_PARAMETRO_GLICEMIA',
							labelAlign: 'placeholder',
							width: 250,
							name: 'curvaGli',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntPeso', references: 'CntPeso',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Peso',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'Peso', reference: 'Peso',
							label: 'PESO_PARAMETRI',
							labelAlign: 'placeholder',
							width: 250,
							name: 'peso',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntAltezza', references: 'CntAltezza',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Altezza',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							itemId: 'Altezza', reference: 'Altezza',
							label: 'ALTEZZA_PARAMETRI',
							labelAlign: 'placeholder',
							width: 250,
							name: 'altezza',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntDiuresi', references: 'CntDiuresi',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Diuresi',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							ItemId: 'Diuresi', reference: 'Diuresi',
							label: 'UNITA_PARAMETRO_DIURESI',
							labelAlign: 'placeholder',
							width: 250,
							name: 'diuresi',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntO2', references: 'CntO2',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'O2',
					hidden: true,
					items:[
						{
							xtype: 'numberfield',
							ItemId: 'SpO2', reference: 'SpO2',
							label: 'SpO2(%)',//TODO_PLS TRADUZIONE
							labelAlign: 'placeholder',
							width: 250,
							name: 'spo2',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntAlvo', reference: 'CntAlvo',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Alvo',
					hidden: true,
					items:[
						{
							xtype: 'selectfield',
							ItemId: 'SelectAlvo', reference: 'SelectAlvo',
							label: 'ALVO',
							labelAlign: 'placeholder',
							autoSelect: false,
							width: 250,
							store:{
								type: 'risposteCbox'
							},
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							name: 'alvo',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntMobilita', references: 'CntMobilita',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Mobilita',
					hidden: true,
					items:[
						{
							xtype: 'selectfield',
							itemId: 'SelectMobilita', reference: 'SelectMobilita',
							label: 'MOBILITA',
							labelAlign: 'placeholder',
							autoSelect: false,
							width: 250,
							store:{
								type: 'risposteCbox'
							},
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							name: 'mobilita',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntSonno', references: 'CntSonno',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Sonno',
					hidden: true,
					items:[
						{
							xtype: 'selectfield',
							itemId: 'SelectSonno', reference: 'SelectSonno',
							label: 'SONNO',
							labelAlign: 'placeholder',
							autoSelect: false,
							width: 250,
							store:{
								type: 'risposteCbox'
							},
							displayField: 'descrizione',
							queryMode: 'local',
							valueField: 'id',
							name: 'sonno',
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntDiario', references: 'CntDiario',
					layout:{
						type: 'vbox',
						align: 'stretch'
					},
					margin: '5 0 10 0',
					parametro: 'Diario',
					hidden: true,
					items:[
						{
							xtype: 'textareafield',
							itemId: 'Diario', reference: 'Diario',
							cls: 'cbaTextArea',
							label: 'DIARIO',
							labelAlign: 'top',
							maxRow: 8,
							width: 250
						}
					]
				}
			]
		}
		
	]
});
