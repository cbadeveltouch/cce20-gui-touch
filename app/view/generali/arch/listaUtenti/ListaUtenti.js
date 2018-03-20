
Ext.define('Generali.arch.listaUtenti.ListaUtenti',{
    extend: 'Ext.Panel',

    requires: [
        'Generali.arch.listaUtenti.ListaUtentiController',
        'CbaUtils.componenti.all.CbaForm',
        'CbaCssView.store.AnagraficaUtSelezionato',
        'Generali.arch.listaUtenti.ListaUtentiModel',
        'Generali.arch.listaUtenti.ListaUtentiStore',
        'CbaCssView.store.Sedi',
        'CbaCssView.store.Reparti'
    ],

    controller: 'generali.arch.listautenti.listautenti',
    
    layout:{
    	type:'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
		{
			xtype: 'panel',
			itemId: 'PanelUtenti', reference: 'PanelUtenti',
			layout: {
            	type: 'vbox',
            	align: 'stretch'
            },
            flex: 1,
            items: [
            	{
					xtype: 'container',
					itemId: 'CntFiltri', reference: 'CntFiltri',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					padding: '10px',
//					height: 170,
					items:[
						{
							xtype: 'selectfield',
							itemId: 'Sede', reference: 'Sede',
							placeholder: 'SEDE',
							flex: 1,
							//name: 'sede',
							labelClsExtra: 'cbaCssLabel',
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
								change: 'changeCboxSede'
							}
						},
						{
							xtype: 'selectfield',
							flex: 1,
							itemId: 'Reparto', reference: 'Reparto',
							//name: 'reparto',
							placeholder: 'REPARTO',
							labelClsExtra: 'cbaCssLabel',
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
							margin: '0 0 10 0',
							listeners: {
								change: 'changeCboxReparto'
							}
						},
						{
							xtype: 'container',
							itemId: 'CntCognome', reference: 'CntCognome',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items:[
								{
									xtype: 'searchfield',
									itemId: 'Cognome', reference: 'Cognome',
									flex: 1,
									placeholder: 'FILTRO_RICERCA',
									listeners:{
										change: 'changeRicercaUtente'
									}
								},
								{
									xtype:'img', 
									itemId: 'BtnFiltro', reference: 'BtnFiltro',
									src: 'resources/images/menu.svg',
									width: 40,
									height: 40,
									margin: '0 0 5 0',
									padding: '5px'
								}
							]
						},
					]
				},
				{
					xtype:'list',
					itemId: 'ListUtenti', reference: 'ListUtenti',
					flex: 1,
					itemTpl: '<div style="display:inline-block; vertical-align:middle; align-items: center;">'+
							 '<image width = "40px"; src = "resources/images/default_user_pic.png"></image>'+
							 '<span style="display:inline-block; vertical-align:middle; align-items: center; height:40px ; margin-left:5px">{nominativo}</span>'+
							 '</div>',
//						new Ext.XTemplate('<tpl for=".">',
//								'<div style="display:inline-block; vertical-align:middle; align-items: center;">',
//			    			    	'<tpl if="sesso == \'F\'">',
//							          '<img width = "40px" src="/CbaCssTouch/app/mainApp/css/generali/images/userWoman.svg"/>',
//							        '<tpl else>',
//							        	'<img width = "40px" src="/CbaCssTouch/app/mainApp/generali/images/default_user_pic.png"/>',
//						        	'</tpl>',	
//					        	'<span style="display:inline-block; vertical-align:middle; align-items: center; height:45px ; margin: 5px" >{nominativo}</span>',
//					        	'</div>',
//						    '</tpl>' ),
					
					store: {
						type: 'listaUtenti',
					},
					listeners:{
						select: 'selectListUtenti'
					}
				}
            ]
		}
	]
});
