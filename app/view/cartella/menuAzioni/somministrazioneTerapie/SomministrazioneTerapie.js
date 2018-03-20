
Ext.define('CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapie',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapieController',
        'Generali.arch.listaUtenti.ListaUtentiFloat',
        'Generali.arch.listaUtenti.ListaUtenti',
        'CbaCssView.store.AnagraficaUtSelezionato',
        'CS.menuAzioni.somministrazioneTerapie.CboxTrn',
        'CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapieStore',
        'CS.menuAzioni.somministrazioneTerapie.DettaglioOspite',
        'Ext.grid.plugin.RowExpander',
        'CS.menuAzioni.somministrazioneTerapie.ListAlBisogno',
        'CS.menuAzioni.somministrazioneTerapie.StdComponentiTerapie'
    ],

    controller: 'cartella-menuazioni-somministrazioneterapie-somministrazioneterapie',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    height: '100%',
    flex: 1,
    items:[
    	{
			xtype: 'panel',
			layout:{
				type:'hbox',
				align:'stretch'
			},
			height: '100%',
			flex: 1,
			items: [
			    {
			    	xtype: 'CbaForm',//per pulsanti
			    	itemId: 'Form', reference: 'Form',
			    	margin: '0 0 0 5',
//		            height: '100%',
		            flex: 1,
		            layout: {
		            	type: 'vbox',
		            	align: 'stretch'
		            },
		            scrollable: false,
		            items: [
		            	{
							xtype: 'grid',
							scrollable:true,
							itemId: 'Grid', reference: 'Grid',
							store: {
	    						type: 'somministrazioneTerapie'
	    					},
	    					viewConfig:{
	    			        	hideHeaders:true
	    			        },
	    					hideHeaders: true,
	    					height: '100%',
	    					grouped: true,
							variableHeights: true,
							InnerCls : 'cbagridRow',
							flex:1,
							loadingText: '',
						    itemConfig: {
						        body: {//TODO_PLS traduzioni anche su note contenzioni
						            tpl:Ext.create('Ext.XTemplate',
							            		'<div style= "font-size: 16px; margin-left: 45px"><strong>Qta</strong>: {dose}</div>',
								                 '<div style= "font-size: 16px; margin-left: 45px"><strong>Um</strong>: {desUnimis}</div>',
								                 '<div style= "margin-left: 45px"><strong>Orario</strong>: {[this.data(values.data)]}</div>',
		                                    {
		                            			data: function(v){
		                            				return StdCba.FormattaData(v, 'H:i')
		                            			}
		                                    }
					            	) 
						        }
						    },
							columns:
							[
								{
	    							xtype: 'gridcolumn',
	    							width: 48,
	    							sortable: false,
	    							dataIndex: 'esito',
	    							align: 'center',
	    							cell: {
							            encodeHtml: false
	    							},
	    							renderer: function(value, record, metadata, gridcell, gridcol, store) {
	    								gridcell.setEncodeHtml(false);
	    								let icon= '',
	    									esito= record.get('esito');
	    							
	    								if(esito === 0)
	    									icon= 'resources/images/terapie/smiley.svg';
	    								else if(esito > 0)
	    									icon= 'resources/images/terapie/frown-face.svg';
	    								else
	    									icon= 'resources/images/terapie/tap.svg';
	    								
	    								return !Ext.isEmpty(icon) ?  `<img  src="${icon}" height=32 width=32/>` : null;
	    							}
	    						},
								{
	    							xtype: 'gridcolumn',
	    							text: 'FARMACO',
	    							sortable: false,
	    							cell: {
							            encodeHtml: false
	    							},
	    							flex:1,
	    							dataIndex: 'desFarmaco',
	    							renderer: function(value, record) {
	    								if(!Ext.isEmpty(record.get('desFarmaco'))) {																										    												    											                                    	
	                                    	let tmp= StdComponentiTerapie.renderCellFarmaco(value, record, false), 
	                                    		esito= '',
	                                    		compilatore= '',
	                                    		compilatoreFigProf= record.get('compilatoreFigProf') ?  `( ${record.get('compilatoreFigProf')} )` : '',
                                				data_reg = StdCba.traduci('DATA_REG'),
                                				compilatore_reg= StdCba.traduci('COMPILATORE'),
                                				ora = StdCba.traduci('ORA')
	                                    			                                    	
                                    		let giorno= Ext.Date.parse(record.get('dataSomm'), 'c');
                                    		
                                    		if(record.get('esito') > 0)
                                    			esito= `<div style="margin-top: 10px;white-space: normal; display: block-inline; width:90%; word-wrap: break-word;">${record.get('desEsito')}</div>`;
                                    	
                                    		if(giorno) {
	                                    		compilatore=
	                                    			`<div style="margin-top: 10px;">
					    								<span class="cbaCssLabel">${data_reg}:</span>
					    								${Ext.Date.format(giorno, 'd/m/Y')}						    								 
					    								<span class="cbaCssLabel" style="margin-left: 20px;">${ora}:</span>
					    								${Ext.Date.format(giorno, 'H:i')}							    								
					    								<div style="margin-top: 5px;">
					    									<span class="cbaCssLabel">${compilatore_reg}:</span>
					    									${record.get('compilatore')}
					    									<span style="margin-left: 7px;  white-space: normal">${compilatoreFigProf}</span>
					    								</div>							    								
					    							</div>`
                                    		}	
	                                    	
	                                    	return `${tmp} ${esito} ${compilatore}`;		                                    																					
	    								}			    								 
	    							}	
	    						
								}
							],
							listeners:{
					        	childtap: 'tapSomministra'
					        }
						
		            	}
		            ]
			    }
			]		
    	}
    ]
});
