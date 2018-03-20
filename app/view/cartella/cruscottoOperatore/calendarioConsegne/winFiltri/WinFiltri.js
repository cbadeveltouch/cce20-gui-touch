
Ext.define('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltri',{
    extend: 'Ext.Container',

    requires: [
        'CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriController'
    ],

    controller: 'cartella-cruscottooperatore-calendarioconsegne-winfiltri-winfiltri',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,
    height: '95%',
    margin: '0 10 5 5',
    items: [                 
        {
            xtype: 'container',
            itemId: 'CntMain', reference: 'CntMain',
            plugins: 'responsive',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            hidden: true,
            items: [
                {
                    xtype: 'container',
                    plugins: 'responsive',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            plugins: 'responsive',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    minWidth: 250,
                                    plugins: 'responsive',
                                    margin: '0 5 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    cls: 'no-border',
                                    items: [
                                        {
                                            xtype: 'selectfield',
                                            placeholder: 'TUTTI_GLI_UTENTI',
                                            minChars: 3,
                                            labelAlign: 'top',
                                            displayField: 'valore',
                                            queryMode: 'remote',
                                            queryParam: 'nome',
                                            triggerAction: 'all',
                                            typeAhead: true,
                                            minChars: 3,
                                            forceSelection: true,
                                            valueField: 'codice',
                                            store: Ext.create('CbaCssView.store.CboxUtenti', {autoLoad: false}),
                                            name: 'idRicovero',
                                            itemId: 'CboxUtenti', reference: 'CboxUtenti',
                                            labelClsExtra: 'cbaCssLabel',
                                            autoSelect: false,
                                            label: 'UTENTI',
                                            tpl: Ext.create('Ext.XTemplate',
                                                '<tpl for=".">',
                                                    '<tpl if="codice==-1">',
                                                       '<div style="color:#878787;" class="x-boundlist-item"><i>{valore}</i></div>',
                                                    '<tpl else>',
                                                        '<div class="x-boundlist-item">{valore}</div>',
                                                    '</tpl>',
                                                '</tpl>'
                                            ),
                                            cbaConfig: {
                                                descrCampo: 'TUTTI_GLI_UTENTI',
                                                valueField: 'codice',
                                                displayField: 'valore'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'cbaCssLabel',
                                            text: 'MIN_3_CARATTERI_PER_RICERCARE', 
                                        }
                                    ],
                                    responsiveConfig: {
                                        bigdesktop: {
                                             width: 250
                                        }
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    minWidth: 250,
                                    plugins: 'responsive',
                                    margin: '0 5 0 0',
                                    title: 'MITTENTE_DESTINATARI',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    cls: 'no-border',
                                    items: [
                                        {
                                            xtype: 'selectfield',
                                            soloAmministratore: true, 
                                            itemId: 'CboxOperatore', reference: 'CboxOperatore',
                                            labelAlign: 'top',
                                            store: Ext.create('CS.progetti.ComboNominativo'),
                                            minChars: 0,
                                            displayField: 'valore',
                                            queryMode: 'local',
                                            valueField: 'codice',
                                            name: 'idMittente',
                                            labelClsExtra: 'cbaCssLabel',
                                            label: 'OPERATORE',
                                            autoSelect: false,
                                            cbaConfig: {
                                                valueField: 'codice',
                                                displayField: 'valore',
                                                labelInfo: 'MITTENTE'
                                            }
                                        },
                                        {
                                            xtype: 'selectfield',
                                            itemId: 'CboxFigProf', reference: 'CboxFigProf',
                                            labelAlign: 'top',
                                            placeholder: 'TUTTE_LE_FIGPROF_ABILITATE',
                                            name: 'figProfDest',
                                            queryMode: 'local',
                                            store: Ext.create('CS.personalizzazioni.personConsegne.permessi.PermessiConsegneDett', { autoLoad:false}),
                                            displayField: 'descrizione',
                                            valueField: 'codpermesso',
                                            minChars: 0,
                                            labelClsExtra: 'cbaCssLabel',
                                            label: 'DESTINATARI',
                                            autoSelect: false,
                                             tpl: Ext.create('Ext.XTemplate',
                                                '<tpl for=".">',
                                                    '<tpl if="codpermesso==-1">',
                                                       '<div style="color:#878787;" class="x-boundlist-item"><i>{descrizione}</i></div>',
                                                    '<tpl else>',
                                                        '<div class="x-boundlist-item">{descrizione}</div>',
                                                    '</tpl>',
                                                '</tpl>'
                                            ),
                                            cbaConfig: {
                                                displayField: 'descrizione',
                                                valueField: 'codpermesso',
                                                labelInfo: 'DESTINATARI'
                                            },
                                            listeners:{
                                            	select: 'changeCboxFigProf'
                                            }
                                        }
                                    ],
                                    responsiveConfig: {
                                        tablet: {
                                            flex: 1,
                                        }
                                       
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    minWidth: 250,
                                    plugins: 'responsive',
                                    margin: '0 5 0 0',
                                    title: 'SEDE_REPARTO',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    cls: 'no-border',
                                    items: [
                                        {
                                            xtype: 'selectfield',
                                            itemId: 'SelectSede', reference: 'SelectSede',
                                            name: 'sede',
                                            labelClsExtra: 'cbaCssLabel',
                                            labelAlign: 'top',
                                            displayField: 'valore',
                                            queryMode: 'local',
                                            label: 'SEDE',
                                            store: Ext.create('CbaCssView.store.Sedi'),
                                            valueField: 'codice',
                                            autoSelect: false,
                                            minChars: 0,
                                            tpl: Ext.create('Ext.XTemplate',
                                                '<tpl for=".">',
                                                    '<tpl if="extra==\'T\'">',
                                                        '<div class="x-boundlist-item"><i>{valore}</i></div>',
                                                    '<tpl else>',
                                                        '<div class="x-boundlist-item">{valore}</div>',
                                                    '</tpl>',
                                                '</tpl>'
                                            ),
                                            cbaConfig: {
                                                displayField: 'valore',
                                                valueField: 'codice',
                                                labelInfo: 'SEDE'
                                            },
                                            listeners:{
                                            	change: 'changeCboxSede'
                                            }
                                        },
                                        {
                                            xtype: 'selectfield',
                                            itemId: 'SelectReparto', reference: 'SelectReparto',
                                            name: 'reparto',
                                            labelClsExtra: 'cbaCssLabel',
                                            labelAlign: 'top',
                                            displayField: 'valore',
                                            queryMode: 'local',
                                            label: 'REPARTO',
                                            store: Ext.create('CbaCssView.store.Reparti'),
                                            valueField: 'codice',
                                            autoSelect: false,
                                            minChars: 0,
                                            tpl: Ext.create('Ext.XTemplate',
                                                '<tpl for=".">',
                                                    '<tpl if="extra==\'T\'">',
                                                        '<div class="x-boundlist-item"><i>{valore}</i></div>',
                                                    '<tpl else>',
                                                        '<div class="x-boundlist-item">{valore}</div>',
                                                    '</tpl>',
                                                '</tpl>'
                                            ),
                                            cbaConfig: {
                                                displayField: 'valore',
                                                valueField: 'codice',
                                                labelInfo: 'REPARTO'
                                            }
                                        }
                                    ],
                                    responsiveConfig: {
                                        tablet: {
                                            flex: 1,
                                        },
                                      
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    plugins: 'responsive',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            minWidth: 250,
                            plugins: 'responsive',
                            margin: '0 5 0 0',
                            title: 'AREA_GRUPPO',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            cls: 'no-border',
                            items: [
                                {
                                    xtype: 'selectfield',
                                    minChars: 0,
                                    labelAlign: 'top',
                                    labelClsExtra: 'cbaCssLabel',
                                    label: 'AREA',
                                    cbaConfig: {
                                        labelInfo: 'AREA'
                                    }
                                },
                                {
                                    xtype: 'selectfield',
                                    labelAlign: 'top',
                                    minChars: 0,
                                    labelClsExtra: 'cbaCssLabel',
                                    label: 'GRUPPO',
                                    cbaConfig: {
                                        labelInfo: 'GRUPPO'
                                    }
                                }
                            ],
                            responsiveConfig: {
                                tablet: {
                                    flex: 1,
                                }
                            }
                        },
                        {
                            xtype: 'selectfield',
                            itemId: 'CboxTipoConsegna', reference: 'CboxTipoConsegna',
                            labelAlign: 'top',
                            placeholder: 'CONSEGNE_DA',
                            name: 'consegneDa',
                            queryMode: 'local',
                            store: Ext.create('CS.consegne.TipoConsegna' , {autoLoad: false}),
                            displayField: 'tipoConsegna',
                            valueField: 'abbreviazione',
                            minChars: 0,
                            label: 'CONSEGNE_DA',
                            autoSelect: false,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                           '<div class="x-boundlist-item"><span style="">{[this.traduci(values.tipoConsegna)]}</span></div>',
                                    '</tpl>',
                                    {
                            			traduci: function(values){
                            				StdCba.traduci(values)
                            			}
                                    }
                            ),
                            listeners:{
                            	select: 'changeCboxTipoConsegna'
                            },
                        }
                    ],
                     responsiveConfig: {
                        bigdesktop: {
                            margin: '0 0 0 0'
                        },
                        tablet: {
                            flex: 1,
                            minHeight: 190
                        }
                    }
                }
            ]
        }
    ]
});
