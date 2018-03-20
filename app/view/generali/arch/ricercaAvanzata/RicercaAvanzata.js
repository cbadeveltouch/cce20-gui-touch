
Ext.define('Generali.arch.ricercaAvanzata.RicercaAvanzata',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.ricercaAvanzata.RicercaAvanzataController'
    ],

    controller: 'generali-arch-ricercaavanzata-ricercaavanzata',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    flex:1, 
    height: '100%',
    items: [
		{
            xtype: 'container',
			itemId: 'Container', reference: 'Container',
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            flex: 1,
            items: [
                {
                	xtype: 'formpanel',
                	itemId: 'FormFiltri',	reference: 'FormFiltri',
                	layout: {
                		type: 'vbox',
                		align: 'stretch'
                	},
                	flex: 1,
                	border: 0,
                	items: [
						{
							xtype: 'checkboxfield',	//campo che viene passato al server per capire che si è in ricerca avanzata
							name: 'avanzate',
							checked: true,
							hidden: true
						},
						{
							xtype: 'fieldset',
							title: 'Intervallo date',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							margin: '5px',
							cls: 'no-border',
							flex: 1,
							items: [
								{
									xtype: 'datepickerfield',
									itemId: 'DataDal', reference: 'DataDal',
									name: 'dal',
									label: 'DAL',
									dateFormat: 'd/m/Y',
									labelWidth:110,
									cbaConfig: {
										filtroBase: true
									},
									listeners:{
										change: 'changeDataDal'
									}
								},
								{
									xtype: 'datepickerfield',
									itemId: 'DataAl', reference: 'DataAl',
									name: 'al',
									label: 'AL',
									dateFormat: 'd/m/Y',
									labelWidth:110,
									cbaConfig: {
										filtroBase: true
									},
									listeners:{
										change: 'changeDataAl'
									}
								}
							]
						},
						{
							xtype: 'checkboxfield',
							itemId: 'SoloOperatoreLog', reference: 'SoloOperatoreLog',
							name : 'me',
				            label: 'CS_SOLO_OPERATORE_LOG',
				            checked: false,
							inputValue: 'T',
							uncheckedValue: 'F',
				            margin: '0 0 0 15',
				            labelAlign: 'right',
				            labelWidth: 130,
				            width: 160,
				            cbaConfig: {
								filtroBase: true
							}
						}
                	]
                },
                {
                	xtype: 'container',
                	layout: {
                		type: 'hbox',
                		align: 'middle',
                	},
                	items: [
                		{
							xtype: 'cbaMultipleChoice',
							itemId: 'FiltriAttiviMobile', reference: 'FiltriAttiviMobile',
							width: 90,
							height: 50,
							style: 'border: none !important;',
							listeners:{
								choiceChange: 'changeFiltriAttiviMobile'
							},
							cbaConfig: {
								itemsCfg: [
									{
//										html: 'CS_SPENTO',
										cls: 'choice-round-unchecked-css',
										checkedClsPerson: 'choice-checked-verde',
										style: {
											'font-size': '13px',
											'padding-left': '6px',
										},
										width: 60,
										isFormField: true,
										inputValue: 'T',
									},
								],
								deselezionabile: true,
								esclusivo: true
							}
						},
                		{
                			xtype: 'spacer'
                		},
						{
							xtype:'button',
							itemId: 'BtnCerca', reference: 'BtnCerca',
							iconCls:'box-confirm-css',
							cls: 'cbaBtnFunzione-mini',
							listeners:{
								tap: 'applicaFiltri'
							}
						},
						{
							xtype:'button',
							itemId: 'BtnCancella', reference: 'BtnCancella',
							iconCls:'box-annulla-css',
							cls: 'cbaBtnFunzione-mini',
							listeners:{
								tap: 'clearFiltri'
							}
						}
            	    ]
                }
            ]
		}			
    ]
});
