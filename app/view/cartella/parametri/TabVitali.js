Ext.define('CS.parametri.TabVitali',{
    extend: 'Ext.Container',
    
    requires: [
    	'CS.parametri.TabVitaliController'
    ],

    controller: 'cartella-parametri-tabvitali',
    

	items: [
		{
			xtype: 'container',
			layout:{
				type: 'vbox',
				align: 'stretch'
			},
			width: Ext.is.Phone ? '100%' : 640,
			items:[
				{
					xtype: 'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align: 'center'
					},
					margin: '10 0 10 0',
					items:[
						{
							xtype: 'container',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 20 10 0',
							width: Ext.isPhone ? '100%' : 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '95%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/pressione.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_PRESSIONE_ORTO',
											cls: 'cbaLabelStrong',
											width: '90%'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
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
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_PRESSIONEMAXORTO', reference: 'CntIconWarning_PRESSIONEMAXORTO',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
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
										},
										{
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_PRESSIONEMINORTO', reference: 'CntIconWarning_PRESSIONEMINORTO'
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
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							width: Ext.isPhone ? '100%' : 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 5 0',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/pressione.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_PRESSIONE_CLINO',
											cls: 'cbaLabelStrong',
											width: '90%'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
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
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_PRESSIONEMAXCLINO', reference: 'CntIconWarning_PRESSIONEMAXCLINO',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
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
										},
										{
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_PRESSIONEMINCLINO', reference: 'CntIconWarning_PRESSIONEMINCLINO'
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align: 'center'
					},
					margin: '10 0 10 0',
					width: '100%',
					items:[
						{
							xtype: 'container',
							itemId: 'CntFreqCardiaca', references: 'CntFreqCardiaca',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 20 10 0',
							width: 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 5 0',
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/freqCard.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_FREQUENZACARD_TIPO',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'FreqCardiaca', reference: 'FreqCardiaca',
											labelWidth: 110,
											width: '80%',
											label: 'FREQUENZA',
											name: 'frequenza',
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
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_FREQUENZA', reference: 'CntIconWarning_FREQUENZA',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'selectfield',
											itemId: 'SelectTipoCardiaca', reference: 'SelectTipoCardiaca',
											labelWidth: 110,
											width: '80%',
											label: 'TIPO',
											store:{
												type: 'risposteDe'
											},
											displayField: 'descrizione',
											queryMode: 'local',
											valueField: 'id',
											name: 'tipoFreqCardiaca',
											editable: false,
											autoSelect: false
										},
										{
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_TIPOFREQCARDIACA', reference: 'CntIconWarning_TIPOFREQCARDIACA',
										}
									]
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
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							width: 300,
							height: Ext.is.Phone  ? null : 200,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/temp.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_TEMPERATURA',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'Temperatura', reference: 'Temperatura',
											name: 'temperatura',
											width: '80%',
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
											xtype: 'container',
											margin: '0 0 6 0',
											itemId: 'CntIconWarning_TEMPERATURA', reference: 'CntIconWarning_TEMPERATURA',
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align: 'center'
					},
					margin: '10 0 10 0',
					items:[
						{
							xtype: 'container',
							itemId: 'CntFreqRespiratoria', references: 'CntFreqRespiratoria',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 20 10 0',
							width: 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									margin: '0 0 5 0',
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/respiro.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											html: 'UNITA_PARAMETRO_FREQUENZARESP_TIPO',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'FreqRespiratoria', reference: 'FreqRespiratoria',
											labelWidth: 110,
											width: '80%',
											label: 'FREQUENZA',
											name: 'freqRespiratoria',
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
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_FREQRESPIRATORIA', reference: 'CntIconWarning_FREQRESPIRATORIA',
										}	
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'selectfield',
											itemId: 'SelectTipoRespiratoria', reference: 'SelectTipoRespiratoria',
											label: 'TIPO',
											labelWidth: 110,
											width: '80%',
											store:{
												type: 'risposteDe'
											},
											displayField: 'descrizione',
											queryMode: 'local',
											valueField: 'id',
											name: 'tipoRespirazione',
											editable: false,
											autoSelect: false
										},
										{
											xtype: 'container',
											margin: '60 15 6 10',
											itemId: 'CntIconWarning_TIPORESPIRAZIONE', reference: 'CntIconWarning_TIPORESPIRAZIONE',
										}
									]
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
							width: 300,
							height: Ext.is.Phone  ? null : 200,
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/diuresi.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_DIURESI',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'numberfield',
											ItemId: 'Diuresi', reference: 'Diuresi',
											name: 'diuresi',
											labelWidth: 110,
											width: '80%',
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
											xtype: 'container',
											margin: '0 0 0 0',
											itemId: 'CntIconWarning_DIURESI', reference: 'CntIconWarning_DIURESI',
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
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							width: 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/peso.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'PARAMETRI_ANTROPOMETRICI',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											width: '80%',
											allowDecimals: true,
											hideTrigger : true,
											maxLength: 6,
											decimalPrecision: 2,
											itemId: 'Peso', reference: 'Peso',
											labelWidth: 100,
											name: 'peso',
											minValue: 0,
											maxValue: 999.99,
											label: 'PESO_PARAMETRI',
											validators: function (val) {
								                var errMsg = StdCba.traduci("ERR_POSITIVO");  
								                return (val <0) ? errMsg : true;
								            },
								            errorTarget: 'under',
								            listeners:{
								            	painted: function(th){
								            		th.errorIconElement.dom.className = ''
								            	},
								            	blur: 'blurPeso'
								            }
										},
										{
											xtype: 'container',
											margin: '0 15 6 0',
											itemId: 'CntIconWarning_PESO', reference: 'CntIconWarning_PESO',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											width: '80%',
											allowDecimals: true,
											hideTrigger : true,
											maxLength: 3,
											itemId: 'Altezza', reference: 'Altezza',
											decimalPrecision: 1,
											name: 'altezza',
											labelWidth: 100,
											label: 'ALTEZZA_PARAMETRI',
											validators: function (val) {
								                var errMsg = StdCba.traduci("ERR_POSITIVO");  
								                return (val <0) ? errMsg : true;
								            },
								            errorTarget: 'under',
								            listeners:{
								            	painted: function(th){
								            		th.errorIconElement.dom.className = ''
								            	},
								            	blur: 'blurAltezza'
								            }
										},
										{
											xtype: 'container',
											margin: '0 15 6 0',
											itemId: 'CntIconWarning_ALTEZZA', reference: 'CntIconWarning_ALTEZZA',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'Bmi', reference: 'Bmi',
											label: 'BMI',
											width: '80%',
											labelWidth:100,
//																	editable: false,
											maxLength: 5,
											decimals: 2,
											autoCorrect: false,
											name: 'bmi',
											stepValue: 0.1,
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
											xtype: 'container',
											margin: '0 15 6 0',
											itemId: 'CntIconWarning_BMI', reference: 'CntIconWarning_BMI',
										}
									]
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
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							width: 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/glicemia.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_GLICEMIA',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'Glicemia', reference: 'Glicemia',
											name: 'curvaGli',
											width: '80%',
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
											xtype: 'container',
											margin: '0 0 6 0',
											itemId: 'CntIconWarning_CURVAGLI', reference: 'CntIconWarning_CURVAGLI',
										}
									]
								}
								
							]
						}
					]
				},
				{
					xtype: 'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align: 'center'
					},
					margin: '10 0 10 0',
					items:[
						{
							xtype: 'container',
							itemId: 'CntO2', references: 'CntO2',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 20 10 0',
							width: 300,
							items:[
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									width: '90%',
									items:[
										{
											xtype: 'image',
											src: 'resources/images/warning/o2.svg',
											margin: '0 10 0 0',
											width: 25,
											height: 25
										},
										{
											xtype: 'label',
											cbahtml: 'UNITA_PARAMETRO_SPO2',
											cls: 'cbaLabelStrong'
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'OssigenoAriaAmbiente', reference: 'OssigenoAriaAmbiente',
											labelWidth: 110,
											width: '80%',
											label: 'ARIA_AMBIENTE',
											labelWrap: true,
											name: 'spo2',
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
											xtype: 'container',
											margin: '0 0 6 0',
											itemId: 'CntIconWarning_SPO2', reference: 'CntIconWarning_SPO2',
										}
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
											xtype: 'numberfield',
											itemId: 'OssigenoTerapia', reference: 'OssigenoTerapia',
											labelWidth: 110,
											width: '80%',
											label: 'OSSIGENO',
											name: 'spo2ot',
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
											xtype: 'container',
											margin: '0 0 0 0',
											itemId: 'CntIconWarning_SPO2OT', reference: 'CntIconWarning_SPO2OT',
										}
									]
								}
								
							]
						},
						{
							xtype: 'container',
							itemId: 'Avpu', references: 'Avpu',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							width: 300,
							height: Ext.is.Phone  ? null : 200,
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 0 10 20',
							items:[
								{
									xtype: 'label',
									html: 'AVPU',
									cls: 'cbaLabelStrong'
								},
								{
									xtype: 'selectfield',
									itemId: 'SelectAvpu', reference: 'SelectAvpu',
									store:{
										type: 'avpu'
									},
									labelClsExtra: 'cbaCssLabel',
									fieldLabel: 'AVPU',
									displayField: 'valore',
									queryMode: 'local',
									valueField: 'codice',
									name: 'avpu',
									autoSelect: false
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					layout:{
						type: Ext.is.Phone ? 'vbox' : 'hbox',
						align: 'center'
					},
					margin: '10 0 10 0',
					items:[
						{
							xtype: 'container',
							layout:{
								type: Ext.is.Phone ? 'vbox' : 'hbox',
								align: Ext.is.Phone ? 'stretch' : 'center',
								pack: Ext.is.Phone ? null : 'start'
							},
							margin: Ext.is.Phone  ? '10 0 10 0' : '10 20 10 0',
							width: 300,
							items:[
								{
									xtype: 'label',
									html: 'MALATTIA_ACUTA',
									cls: 'cbaLabelStrong',
									margin: '6 0 0 0'
								},
								{
									xtype: 'container',
									layout:{
										type: 'hbox',
										align: 'center'
									},
//																	width: 300,
									items:[
								        {
											xtype: 'cbaMultipleChoice',
											margin: '-5 30 0 0',
											width: 90,
											itemId: 'RadioMalattiaAcuta', reference: 'RadioMalattiaAcuta',
											layout: {
												type: 'hbox'
												
											},
											style: 'border: none !important',
											border: false,
											cbaConfig: {
												itemsCfg: [
														{
															html: 'SI',
															style: 'font-size: 12px !important;padding-left: 6px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'malattiaAcuta', 
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: 'T',
															cbaInputValue: 'T'
														},
														{    
															html: 'NO',
															style: 'padding-left: 3px !important;font-size: 12px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'malattiaAcuta',
															isFormField: true,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															inputValue: 'F',
															cbaInputValue: 'F'
														},
														
													],
													esclusivo: true  
											}
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							itemId: 'CntAlcolDroghe', reference: 'CntAlcolDroghe',
							layout:{
								type: 'vbox',
								align: 'stretch'
							},
							width: 300,
							margin: '5 0 5 0',
							items:[
								{
									xtype: 'container',
									itemId: 'CntAlcol', reference: 'CntAlcol',
									layout: {
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											html: 'ALCOOL',
											cls: 'cbaLabelStrong',
											margin: '6 5 0 0'
										},
										{
											xtype: 'cbaMultipleChoice',
											itemId: 'RadioAlcol', reference: 'RadioAlcol',
											layout: {
												type: 'hbox'
											},
											margin: '-5 30 0 0',
											style: 'border: none !important',
											border: false,
											width: 230,
											cbaConfig: {
												itemsCfg: [
														{
															html:'POSITIVO',
															style: 'font-size: 14px !important; padding-left: 4px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'testAlcool', 
															isFormField: true,
															inputValue: 1,
															cbaInputValue: 1,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															width: 90
														},
														{    
															html: 'NEGATIVO',
															margin: '5 0 0 5',
															style: 'font-size: 14px !important; padding-left: 4px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'testAlcool',
															isFormField: true,
															inputValue: 0,
															cbaInputValue: 0,
															layout: {
																type: 'vbox',
																align: 'center'
															},
															width: 100
														}
													],
													esclusivo: true  
											}
										}
									]
								},
								{
									xtype: 'container',
									itemId: 'CntDroghe', reference: 'CntDroghe',
									layout: {
										type: Ext.is.Phone ? 'vbox' : 'hbox',
										align: 'stretch'
									},
									items: [
										{
											xtype: 'label',
											html: 'DROGHE',
											cls: 'cbaLabelStrong',
											margin: '6 0 0 0'
										},
										{
											xtype: 'cbaMultipleChoice',
											itemId: 'RadioDroghe', reference: 'RadioDroghe',
											layout: {
												type: 'hbox'
											},
											width: 230,
											margin: '-5 0 0 0',
											style: 'border: none !important',
											border: false,
											cbaConfig: {
												itemsCfg: [
														{
															html: 'POSITIVO',
															style: 'font-size: 14px !important; padding-left: 4px !important;',
															cls: 'choice-round-unchecked-css-border2', 
															checkedClsPerson: 'choice-checked-css',
															name: 'testDroghe', 
															layout: {
																type: 'vbox',
																align: 'center'
															},
															isFormField: true,
															inputValue: 1,
															cbaInputValue: 1,
															width: 90
														},
														{
															html: 'NEGATIVO',
															margin: '5 0 0 5',
															style: 'font-size: 14px !important; padding-left: 4px !important;',
															checkedClsPerson: 'choice-checked-css', 
															cls: 'choice-round-unchecked-css-border2',
															name: 'testDroghe',
															layout: {
																type: 'vbox',
																align: 'center'
															},
															isFormField: true,
															inputValue: 0,
															cbaInputValue: 0,
															width: 100
														}
													],
													esclusivo: true  
											}
										},
										{
											xtype: 'textfield',
											itemId: 'DescrDroghe', reference: 'DescrDroghe',
											name: 'testDrogheDescr',
											fieldLabel: 'DESCRIZIONE',
											width: 400,
											labelWidth: 80,
											labelClsExtra: 'cbaCssLabel',
											margin: '0 0 0 10',
											hidden: true
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'CntDiario', references: 'CntDiario',
					layout:{
						type: 'vbox',
						align: 'center'
					},
					margin: '5 0 10 0',
					width: Ext.is.Phone ? 300 : 640,
					items:[
						{
							xtype: 'textareafield',
							itemId: 'Note', reference: 'Note',
							cls: 'cbaTextArea',
							name:'note',
							label: 'NOTE',
							labelAlign: 'top',
							width: Ext.is.Phone ? 300 : 640,
							maxRow: 8
						}
					]
				}
			]
		}
	]
});
