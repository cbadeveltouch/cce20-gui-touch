
Ext.define('Generali.schede.grafico.TabAndamento',{
    extend: 'Ext.Container',

    uses:[
    	'Ext.chart.CartesianChart'
    ],
    requires: [
        'Generali.schede.grafico.TabAndamentoController',
        'Generali.schede.grafico.store.Andamento',
        'Ext.chart.*'
    ],

    controller: 'generali-schede-grafico-tabandamento',
    
    layout:{
		type:'vbox',
		align:'stretch',			
	},
	flex:1,
    items:[
		{
			xtype:'panel',
			layout:{
				type:'vbox',
				align:'stretch'		
			},
			flex:1,
			items:[
				{
					xtype:'fieldset',
					itemId:'PnlFiltroGrafico',reference:'PnlFiltroGrafico',
					layout:{
						type:'hbox',
						align:'center',
						pack:'center'
					},
					height:70,
					margin:'6 6 0 6',
					items:[
						{
							xtype: 'datepickerfield',
							margin:'0 15 0 0',
							dateFormat: 'd/m/Y',
							labelCls :'cbaCssLabel',
							itemId:'DataDal', reference:'DataDal',
							label: 'PERIODO_DAL',
							name:'graficoDataDal',
							labelAlign :'top',
							isFormField :false
							//value: new Date()
						}, 
						{
							xtype: 'datepickerfield',
							labelCls :'cbaCssLabel',
							dateFormat: 'd/m/Y',
							itemId:'DataAl',reference:'DataAl',
							label: 'AL',
							name:'graficoDataAl',
							labelAlign :'top',
							isFormField:false
							//value: new Date()
							
						},
						{
							xtype:'container',
							flex:1,
							layout:{
								type : 'hbox',
								align: 'stretch',
								pack : 'end'
							},
							items:[
								{
									xtype: 'button',
									iconCls:'icon-edit',
									margin:'20 0 0 0',
									text:'MOSTRA_ANDAMENTO',
									itemId:'BtnAndamento',reference:'BtnAndamento',
									listeners:{
										tap: 'calcolaAndamento'
									}
								}	
							]
						}
					]
				},
				{
					xtype: 'cartesian',
					nonDisabilitare: true,
					flex:1,
					itemId:'Grafico',reference:'Grafico',
					store: {
						type: 'andamento'
					},
					innerPadding:{top: 10, left: 5, right: 25, bottom: 10},
					legend: {
						docked: 'bottom' 
					},
					axes: [
						{
							type: 'numeric',
							fields: ['punteggio','punteggioComplessivo','punteggioCorretto','andatura','equilibrio','totale'],
							position: 'left',
							grid: true
							//maximum:this.cbaConfig.punteggioMax,	
						},				
						{
							type: 'category',
							fields: 'data',
							position: 'bottom',
							grid: true,
							renderer:function(axes, value){
								return StdCba.FormattaData(value, 'd/m/Y');
							}
						}
					],
					series: [
						{
							type: 'line',	
							hidden: true,
							showInLegend: false,							
							// stacked: true,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: 'red',
								fill :'rgba(100, 149, 237, 0.2)',
								'stroke-width': 1
								
							},
							colors : [ '#ff8809' ],
							xField: 'data',
							yField: 'punteggio',
							title: StdCba.traduci('PUNTEGGIO'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						},
						{
							type: 'line',	
							hidden: true,
							showInLegend: false,							
							// stacked: true,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: '#299a0b',
								'stroke-width': 1
							},
							colors : [ '#299a0b' ],
							xField: 'data',
							yField: 'punteggioComplessivo',
							title: StdCba.traduci('PUNTEGGIO_COMPLESSIVO'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						},
						{
							type: 'line',
							hidden: true,
							showInLegend: false,
							// stacked: true,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: '#E5128A',
								'stroke-width': 1
							},
							colors : [ '#E5128A' ],
							xField: 'data',
							yField: 'punteggioCorretto',
							title: StdCba.traduci('PUNTEGGIO_CORRETTO'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						},
						{
							type: 'line',
							hidden: true,
							showInLegend: false,
							// stacked: true,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: '#0B9191',
								'stroke-width': 1
							},
							colors : [ '#0B9191' ],
							xField: 'data',
							yField: 'andatura',
							title: StdCba.traduci('ANDATURA'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						},
						{
							type: 'line',
							hidden: true,
							showInLegend: false,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: '#F75013',									
								'stroke-width': 1
							},
							colors : [ '#F75013' ],
							xField: 'data',
							yField: 'equilibrio',
							title: StdCba.traduci('EQUILIBRIO'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						},
						{
							type: 'line',
							hidden: true,
							showInLegend: false,
							// stacked: true,
							axis: 'left',
							color:'#fff',
							style: {
								stroke: '#7C0936',
								'stroke-width': 1,
							},
							colors : [ '#7C0936' ],
							xField: 'data',
							yField: 'totale',
							title: StdCba.traduci('TOTALE'),
							marker: {
								type: 'square',
								fill :'#ff8809',
								opacity:1,
								fx: {
									duration: 200,
									easing: 'backOut'
								}
							},
							highlightCfg: {
								scaling: 2
							}
						}
						
					] 
				}
			]
		}
		
	]
});
