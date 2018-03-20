Ext.define('Ext.layout.fluid', {
    extend: 'Ext.layout.Box',
    alias: 'layout.fluid',
    setContainer: function(container) {
        this.callSuper(arguments);
        container.innerElement.replaceCls('x-horizontal', 'x-horizontal-fluid');
    }
});
Ext.define('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriMain',{
    extend: 'Ext.Panel',

    requires: [
        'CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriMainController',
        'CS.personalizzazioni.personConsegne.impostazioni.Impostazioni'
    ],

    controller: 'cartella-cruscottooperatore-calendarioconsegne-winfiltri-winfiltrimain',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
    	{
    		xtype: 'container',
            itemId: 'ContainerMain', reference: 'ContainerMain',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            flex:1,
            scrollable: true,
            items: [
            	{
            		xtype: 'container',
                    itemId: 'ContainerFiltri', reference: 'ContainerFiltri',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                    },
                    items:[
                    	{
                            xtype: 'fieldset',
                            margin: '0 0 0 0',
                            title: 'PERIODO',
                            plugins: 'responsive',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                            },
                            width: 250,
                            cls: 'no-border',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'DataDal', reference: 'DataDal',
                                            margin: '0 0 0 4',
                                            width: 110,
                                            labelWidth: 34,
                                            label: 'DAL',
                                            triggers: false,
                                            dateFormat: 'd/m/Y',
                                            name: 'dal'
                                        },
                                        {
                                         	xtype: 'datepickerfield',
        									itemId: 'OraDal', reference: 'OraDal',
                                            margin: '0 0 0 4',
                                            width: 90,
                                            value: '00:00',
        									dateFormat : 'H:i',
        				                    name: 'oraDal',
        				                    inputType: 'time',
        				                    triggers: false,
        				                    picker: null,
        				                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'middle',
                                        //pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'DataAl', reference: 'DataAl',
                                            dateFormat : 'd/m/Y',
                                            width: 110,
                                            labelWidth: 34,
                                            margin: '0 0 0 4',
                                            label: 'AL',
                                            triggers: false,
                                            dateFormat: 'd/m/Y',
                                            name: 'al'
                                        },
                                        {
                                            xtype: 'datepickerfield',
                                            itemId: 'OraAl', reference: 'OraAl',
                                            margin: '0 0 0 4',
                                            width: 90,
                                            value: '23:59',
                                            dateFormat: 'H:i',
                                            name: 'oraAl',
                                            inputType: 'time',
        				                    triggers: false,
        				                    picker: null,
        				                    edgePicker: null
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            margin: '0 0 0 3',
                            title: 'ORDINAMENTO',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            flex: 0.5,
                            cls: 'no-border',
                            items: [
                                {
                                	xtype: 'radiofield',
                                	label: 'DATA_ORA',
                                    name: 'ordinamento',
                                    labelAlign: 'right',
                                    checked: true,
                                    value: '0',
                                },
                                {
                                	xtype: 'radiofield',
                                	label: 'NOME_UTENTE',
                                    margin: '0 0 0 0',
                                    name: 'ordinamento',
                                    labelAlign: 'right',
                                    value: 1,
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'FieldFiltri', reference: 'FieldFiltri',
                            margin: '0 0 0 3',
                            title: 'FILTRI',
                            layout: {
                                type: 'fluid',
                                align: 'stretch'
                            },
                            flex: 1,
                            width: '95%',
                            cls: 'no-border',
                            items: [
                    			 {
                                 	 xtype: 'checkboxfield',
                                 	 labelAlign: 'right',
                                     label: 'IMPORTANTI',
                                     name: 'importanti',
                                     inputValue: 'T',
                                     uncheckedValue: 'F',
                                     width: 150,
                                     labelWidth: 130
                                 },
                                 {
                                     xtype: 'checkboxfield',
                                     itemId: 'CheckAnnullate', reference: 'CheckAnnullate',
                                     labelAlign: 'right',
                                     inputValue: 'T',
                                     name: 'ancheAnnullate',
                                     uncheckedValue: 'F',
                                     label: 'CS_CONSEGNE_ANNULLATE',
                                     width: 150,
                                     labelWidth: 130
                                 },
                                 {
                                 	xtype: 'checkboxfield',
                                 	labelAlign: 'right',
                                    label: 'PROMEMORIA',
                                    itemId: 'CheckPromemoria', reference: 'CheckPromemoria',
                                    name: 'promemoria',
                                    inputValue: 'T',
                                    uncheckedValue: 'F',
                                    width: 150,
                                    labelWidth: 130
                                 },
                    			 {
                                     xtype: 'checkboxfield',
                                     labelAlign: 'right',
                                     inputValue: 'T',
                                     name: 'presaInCarico',
                                     uncheckedValue: 'F',
                                     label: 'CONSEGNE_PRESEINCARICO',
                                     width: 150,
                                     labelWidth: 130
                                 },
                                 {
                                 	xtype: 'checkboxfield',
                                 	labelAlign: 'right',
                                    label: 'VISUALIZZA_SOLO_NON_LETTE',
                                    itemId: 'CheckSoloNonLette', reference: 'CheckSoloNonLette',
                                    name: 'soloNonLette',
                                    inputValue: 'T',
                                    uncheckedValue: 'F',
                                    width: 150,
                                    labelWidth: 130
                                 },
                                 {
                                     xtype: 'checkboxfield',
                                     labelAlign: 'right',
                                     itemId: 'CheckEscludiMie', reference: 'CheckEscludiMie',
                                     inputValue: 'T',
                                     name: 'escludiMie',
                                     uncheckedValue: 'F',
                                     label: 'CS_NASCONDI_CREATE_DA_ME',
                                     width: 150,
                                     labelWidth: 130
                                 }
                            		
                            ]
                        } 
                    ]
            	},
            	{
            		xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'middle',
                    },
                    flex:1,
                    items:[
                    	{
                			xtype:'button',
                			itemId: 'BtnMostraAltri', reference: 'BtnMostraAltri',
                			text: 'MOSTRA_DI_PIU',
                			width: 150,
                			margin: '5px',
                			listeners:{
                				tap: 'mostraFiltri'
                			}
                		}
                    ]
            	}
            ]
        }
    ]
        
});
