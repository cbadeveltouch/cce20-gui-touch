Ext.define('CS.consegne.Consegne',{
    extend: 'Ext.Panel',

    requires: [
        'CS.consegne.ConsegneController',
        'CS.consegne.FigProfStore'
    ],

    controller: 'cartella-consegne-consegne',
    
    itemId:'PanelConsegne', reference: 'PanelConsegne',
    layout: {
		type:'vbox',
		align: 'stretch'
	},
    flex: 1,
    items:[
		{
			xtype: 'container',
			itemId: 'CntBoxInfoConsegna', reference: 'CntBoxInfoConsegna',
			layout: {
				type: 'hbox',
			},
			height: 35,
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					margin: '0 0 0 40',
					items:[
						{
							xtype: 'datepickerfield',
							itemId:'DataTestataInsert', reference: 'DataTestataInsert',
							margin: '0 10 0 0',
//							name: 'data',
							dateFormat : 'd/m/Y',
		                    width: 120,
		                    hidden:true,
		                    //triggers: false,
		                    value: new Date()
						},
						{
							xtype: 'label',
							itemId: 'DataTestata', reference: 'DataTestata',
							cls: 'cbaCssLabel', 
							margin: '0 5 0 5'
						},
						{
							xtype: 'datepickerfield',
							itemId:'OraTestataInsert', reference: 'OraTestataInsert',
							dateFormat : 'H:i',
		                    width: 90,
		                    inputType: 'time',
		                    hidden: true,
		                    triggers: false,
		                    picker: null,
		                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
		                    listeners:{
		                    	blur: function(th){

										var dataReg = th.up('container').down('#DataTestataInsert');
										
										if(!dataReg.getValue() && th.getImputValue())
											dataReg.setValue(new Date());
										var futuro = false;
										var dataAttuale = new Date();
										var data = dataReg.getValue();
										
										if(data && th.getInputValue()){
											if(StdCba.dmyIsEqual(data)){
												if(parseInt(th.getInputValue().substr(0,2)) > dataAttuale.getHours()){
													futuro = true;
												}else if(parseInt(th.getInputValue().substr(0,2)) == dataAttuale.getHours() && 
														parseInt(th.getInputValue().substr(3,5)) > dataAttuale.getMinutes()){
													futuro = true;
												}
											}
											
											if(futuro){
												StdCba.Messaggio('ATTENZIONE', 'CS_DATA_FUTURO', 'OK', 'WARNING', function(){
													th.setInputValue(StdCba.FormattaData(new Date(), 'H:i'));
												});
											}else{
												th.up('#CntRegistrazioni').down('#OraTestata').setHtml(th.getInputValue());
											}
												
										}
								}
		                    }
						},
						{
							xtype: 'label',
							itemId: 'OraTestata', reference: 'OraTestata',
							cls: 'cbaCssLabel' 
						}
					]
				},
				{
					xtype:'spacer'
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'label',
							cls: 'cbaCssLabel',
							itemId: 'LblStatoConsegna', reference: 'LblStatoConsegna'
						},
						{
							xtype: 'label',
							cls: 'cbaCssLabel',
							margin: '0 0 0 40',
							style: 'text-align: center;',
							itemId: 'LblText', reference: 'LblText'
						}
					]
				}
			]
		},		
    	{
			xtype:'CbaForm',
			trackResetOnLoad: true,
			itemId:'Form',reference:'Form',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			flex: 1,
			scrollable: false,
			listeners:{
				onRenderer: 'afterrenderForm'
			},
			items:[
				{
					xtype:'textfield',
					name: 'id',
					hidden: true,
				},
				{
					xtype:'panel',
					title: 'OPZIONI_CONSEGNA',
					itemId:'CntOpzioni',reference:'CntOpzioni',
					cls: 'cbaPanelCollapsed',
					collapsed: true,
					collapsible: true,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					margin:'0 2 0 5',
					padding: '0 0 0 10'
				},
				{
					xtype:'panel',
					itemId:'CntInoltra',reference:'CntInoltra',
					title:'INOLTRA_CONSEGNA_A',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},		
					cls: 'cbaPanelCollapsed',
					collapsed: true,
					collapsible: true,
					height: '85%',
					margin:'0 2 0 5',
					items:[
						{
							xtype:'checkbox',
							itemId: 'SelTutto', reference: 'SelTutto',
							boxLabel:'Seleziona Tutte le figure professionali',
							inputValue:'T',
							name: 'selTutto',
							uncheckedValue: 'F',
							margin:'5 0 0 20',
							listeners:{
								change: 'changeSelTutto'
							}
						},
						{
							xtype:'textfield',
							hidden: true,
							name: 'campoDirty',
							itemId: 'CampoDirty', reference: 'CampoDirty',
						},
						{
							xtype: 'searchfield',
							placeholder: 'CERCA',
							margin:'0 0 0 20',
							width: 250,
							isFormField: false, 
							itemId: 'TxtRicerca', reference: 'TxtRicerca',
							listeners:{
								change: 'changeTxtRicerca'
							}
						},
						{
							xtype: 'grid',
							margin:'5 0 0 20',
							flex: 1,
							width: '90%',
							hideHeaders: true,
							rootVisible: false,
							columnMenu: null,
							itemId: 'GridFigProf', reference: 'GridFigProf',
							store:{
								type: 'figProf',
								autoLoad: true
							},
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
						        			styleSelected = icon === 'checked' ? `font-weight:bold;` : ``,
					        				descr = `<span style="margin-right: 30px; ${styleSelected}">${value}</span>`,
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
				},
				{
					xtype:'panel',
					title: 'TESTO_CONSEGNA',
					itemId:'ContenutoConsegna',reference:'ContenutoConsegna',
					cls: 'cbaPanelCollapsed',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					scrollable: true,
					flex:1,
					items:[
						{
							xtype:'textareafield',
							cls: 'cbaTextArea',
							margin: '5 0 0 0',
							itemId: 'TestoConsegna', reference: 'TestoConsegna',
							width: '95%',
							title:'TESTO_CONSEGNA',
							style: 'padding: 2px;',
							name: 'note',
							height: '90%',
							listeners:{
								focusenter: 'focusEnter',
								focusleave: 'focusLeave'
							}
						},
						/*Mi serve per stampare l'HTML*/
						{
							xtype:'container',
							itemId: 'TestoConfermato', reference: 'TestoConfermato',
							margin: '0 0 0 8',
							layout:{
								type:'hbox',
								align:'stretch'
							},
							padding: '3px',
							hidden: true,
							width: '95%'
						}
					]
				},
				{
					xtype:'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					width: '100%',
					style:{
						borderTop: '0.6px solid #5fa2dd'
					},
					items:[
						{
							xtype: 'pnlCompilatore',
							itemId: 'PnlCompilatore', reference: 'PnlCompilatore',
						}
						
					]
				}
			]
		
    	}
    ]
});
