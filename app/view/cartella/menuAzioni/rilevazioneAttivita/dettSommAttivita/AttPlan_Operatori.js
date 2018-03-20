
Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_Operatori',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_OperatoriController',
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_OperatoriStore'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-dettsommattivita-attplan_operatori',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items:[
		{
			xtype: 'container',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'fieldset',
					itemId: 'FieldsetOperatori', reference: 'FieldsetOperatori',
					title: 'OPERATORI',
					scrollable: true,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
//					flex: 1,
					items: [
						{
							xtype:'textfield',
							hidden: true,
							name: 'campoDirty',
							itemId: 'CampoDirty', reference: 'CampoDirty',
						},
						{
							xtype: 'searchfield',
							placeholder: 'CERCA',
							width: 250,
							isFormField: false, 
							itemId: 'TxtRicerca', reference: 'TxtRicerca',
							listeners:{
								change: 'changeTxtRicerca'
							}
						},
						{
							xtype: 'grid',
							hideHeaders: true,
							rootVisible: false,
							columnMenu: null,
							itemId: 'ListaOperatori', reference: 'ListaOperatori',
							store:{
								type: 'figProfCbox'
							},
							height: 200,
							width: '85%',
							columns: [
								{
									xtype: 'gridcolumn',
									dataIndex: 'id',
									hidden: true
								},
					         	{
						        	xtype: 'gridcolumn',
						        	dataIndex: 'text',
						        	flex: 1,
						        	sortable: false,
						        	renderer: function(value, record, metadata, gridcell, gridcol, store)  {
						        		gridcell.setEncodeHtml(false);
						        		let icon = record.get('checked') ? 'checked' : 'check-disabled-gray',
					        				valore = record.get('valore'),
						        			styleSelected = icon === 'checked' ? `font-weight:bold;` : ``,
					        				descr = `<span style="margin-right: 30px; ${styleSelected}">${valore}</span>`,
					        				img = `<img style="display:block;float:right; width: 24px; height: 24px;" 
					        						src="resources/images/generali/${icon}.svg"></img>`
						        		return `${descr} ${img}`
									}
						        }
					        ],
					        listeners:{
					        	childtap: 'childTapFigProf'
					        },
							viewConfig: {
								loadMask: false,
								getRowClass: function (record, rowIndex, rp, store) {
									let selected = record.get('selected') ? 'row-grid-background-lightgreen' : ''
									return `cbaCssRigaAlta35 ${selected}`;
								}
							}
						}
					]
				}
			]
		
		}
	]
});
