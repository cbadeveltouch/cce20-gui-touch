
Ext.define('CS.eventi.contenzioni.note.TabNote',{
    extend: 'Ext.Container',

    requires: [
        'CS.eventi.contenzioni.note.TabNoteController',
        'Ext.grid.plugin.Editable',
        'CS.eventi.contenzioni.note.Note',
        'CS.eventi.contenzioni.note.insert.TabNoteInsert'
    ],

    controller: 'cartella-eventi-contenzioni-note-tabnote',
    
    flex:1,
    items:[
		{
			xtype: 'container',
			itemId: 'CntMain', reference: 'CntMain',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			height: '100%',
//			flex: 1,
			items:[
				{
					xtype: 'CBAGridAnnullabile',
					scrollable:true,
					itemId: 'GridNoteAgg', reference: 'GridNoteAgg',
					store: {
						type: 'note'
					},
					variableHeights: true,
					listeners:{
						select: 'selectChange'
					},
					height: Ext.is.Phone ? 350 : 500,
				    itemConfig: {
				        collapsed: false,
				        body: {
				            tpl: '<div><strong>Osservazioni</strong>: {osservazioni}</div>' +
				                 '<div><strong>Reazioni</strong>: {reazioni}</div>' +
				                 '<div><strong>Danni</strong>: {danni}</div>',
			                editable: true,
					        editor:{
								xtype: 'textaerafield',
								anchor: '100%',
								maxRows: 4
							}
				        },
				        editable: true,
				        editor:{
							xtype: 'textaerafield',
							maxRows: 4
						}
				    },
					columns:
					[
						{
							xtype: 'gridcolumn',
							dataIndex: 'id',
							hidden: true
						},
						{
							xtype: 'gridcolumn',
							text: 'COMPILATORE',
							dataIndex: 'compilatore',
							maxWidth: 120,
							hidden: true
						},
						{
							xtype: 'gridcolumn',
							itemId:'DataOra',reference:'DataOra',
							text: 'DATA',
							dataIndex: 'data',
//							format: 'd/m/Y',
							width:135,
							align: 'center',
							cell: {
						            encodeHtml: false
					        },
							renderer: function(value, record) {
								return StdCba.FormattaData(record.get('data'))+'<br>'+StdCba.FormattaData(record.get('ora'), 'H:i');
							},
							editable: true,
							editor:{
								xtype: 'datefield',
						        minValue: '00:00',
						        maxValue: '23:59',
						        increment: 15,
						        anchor: '100%',
								dateFormat : 'd/m/Y H:i',
//			                    inputType: 'time',
			                    triggers: false,
			                    picker: null,
			                    edgePicker: null
							}
						},
						{
							xtype: 'gridcolumn',
							text: 'COMPILATORE',
							width:180,
							dataIndex: 'compilatoreNominativo',
							itemId:'CompilatoreFigProf',reference:'CompilatoreFigProf',
							cell: {
					            encodeHtml: false
							},
//							renderer: cell_renderer_stringa,
							renderer: function(value, record) {
								return record.get('compilatoreNominativo')+'<br>'+record.get('compilatoreFigProf');
							}
						},
					],
//					 plugins: {
//                         grideditable: {
//                         toolbarConfig: {
//                             xtype: 'titlebar',
//                             docked: 'top',
//                             items: [{
//                                 xtype: 'button',
//                                 text: 'Annulla',
//                                 align: 'left',
//                                 action: 'cancel'
//                             }, {
//                                 xtype: 'button',
//                                 text: 'Conferma',
//                                 align: 'right',
//                                 action: 'submit',
//                                 listeners:{
//                                 	tap: 'editGrid'
//                                 }
//                             }]
//                         }}
//                     },
					items: [
						{
							docked: 'bottom',
                            xtype: 'toolbar',
                            defaults: {
                                 margin: '0 10 0 0'
                            },
							items: 
							[
							 	{
							 		xtype:'spacer'
							 	},
							 	{
									xtype: 'image',
									itemId: 'BtnNuovoNote', reference: 'BtnNuovoNote',
//									text: 'NUOVO',
									cls: 'icon-piu',
									width: 25,
									height: 25,
									margin:'0 5 0 1',
									listeners:{
										tap: 'tapBtnNuovoNote'
									}
								},
								{
									xtype: 'image',
									itemId: 'Elimina', reference: 'Elimina',
//									text: 'NUOVO',
									cls: 'icon-elimina',
									width: 25,
									height: 25,
									margin:'0 5 0 1',
									listeners:{
										tap: 'tapBtnElimina'
									}
								}
							]
						}
					],
					viewConfig: {
						loadMask: false,
//						getRowClass: function(record, rowIndex, rowParams, store){
//						
//							 if (parseInt(rowIndex) % 2 == 0) 
//								return 'cbaCssRigaAlta40 x-grid-row-alt';
//							 else  
//								return 'cbaCssRigaAlta40';
//						}
					},
//					plugins: [
//						Ext.create('Ext.grid.plugin.RowEditing', {
//							autoCancel: false,
//							errorSummary: false									
//						})
//					]
				}
			]
		}
	
    ]
});
