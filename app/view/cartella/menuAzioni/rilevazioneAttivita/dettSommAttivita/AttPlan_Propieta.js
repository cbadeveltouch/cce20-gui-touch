
Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_Proprieta',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_ProprietaController',
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_ProprietaStore'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-dettsommattivita-attplan_proprieta',
    
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
					itemId: 'FieldsetProprieta', reference: 'FieldsetProprieta',
					title: 'PROPRIETA',
					scrollable: true,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					items: [
						{
							xtype: 'grid',
							itemId: 'ListaProprieta', reference:'ListaProprieta',
							store:{
								type: 'proprietaAttivita'
							},
							height: 150,
							hideHeaders: true,
							rootVisible: false,
							columnMenu: null,
							cls: 'no-cell-focused-border',	
							listeners:{
								itemtap: 'itemTapListaProprieta'
							},
							columns: [
								{
									xtype: 'gridcolumn',
									dataIndex: 'id',
									hidden: true
								},
					         	{
						        	xtype: 'gridcolumn',
						        	dataIndex: 'descrizione',
						        	flex: 1,
						        	sortable: false,
						        	renderer: function(value, metadata, record, rowIndex,colIndex, store)  {
						        		let valore = record.get('descrizione'),
						        			icon = record.get('selected') ? 'checked' : 'check-disabled-gray',
						        			styleSelected = icon === 'checked' ? `font-weight:bold;` : ``,
					        				descr = `<span style="margin-right: 50px; ${styleSelected}">${valore}</span>`,
					        				img = `<img style="display:block;float:right; height: 24px;" 
					        						src="/cba/generali/images/svg/others/${icon}.svg"></img>`
						        		return `${descr} ${img}`
									}
						        }
					        ],
							viewConfig: {
								loadMask: false,
								getRowClass: function (record, rowIndex, rp, store) {
									let selected = record.get('selected') ? 'row-grid-background-lightgreen' : ''
									return `cbaCssRigaAlta35 ${selected}`;
								}
							},
//							features: [{
//						      	ftype: 'grouping',
//						      	collapsible: false,
//						      	groupHeaderTpl: [
//						      		'{name:this.formatText}',
//						      		{
//						      			formatText: valore => valore.substr( valore.indexOf('$$') + 2 )
//						      		}
//								]
//							}]
						}
					]
				}
			]
		
		}
	]
});
