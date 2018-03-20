
Ext.define('CS.schede.schedeModulari.domande.CntDomandeDe',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schedeModulari.domande.CntDomandeDeController'
    ],

    controller: 'cartella-schede-schedemodulari-domande-cntdomandede',
    
    items:[
		{
			xtype:'container',
			itemId:'CntCorpoDomanda',reference:'CntCorpoDomanda',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			flex:1,
			margin:'5 0 5 0',
			listeners:{
				painted: 'afterenderCntDomandeDe'
			},
			items:[
				{
					xtype: 'container',
					layout:{
						type:'hbox',
						align: 'center',       
						
					},
					width:Ext.is.Phone ? 405 : 500,
					items: [
						{
							xtype: 'textfield',
							itemId: 'TextIdDomanda', reference:'TextIdDomanda',
							width:50,
							//name: 'idDomanda', //IDDOMANDA 
							hidden: true
						},
						{
							xtype: 'textfield',
							itemId: 'TextIdTest', reference:'TextIdTest',
							width:50,
							//name: 'idTest', 
							hidden: true
						},
						{
							xtype: 'textfield',
							itemId: 'TextIdRisposta', reference:'TextIdRisposta',
							width:50,
							//name: 'idRisposta', 
							hidden: true
						},
						{
							xtype: 'textfield',
							itemId: 'TextIdTestRisposta', reference:'TextIdTestRisposta',
							width:50,
							//name: 'idTestRisposta', //IDRISPOSTA 
							hidden: true
						},
						{
							xtype:'container',
							layout:{
								type:'hbox',
								align: 'stretch'
							},
							cls: 'headerFormSchede', 
							width: Ext.is.Phone ? 300 : 500,
							padding:2,
							items:[
								{
									xtype:'container',
									layout:{
										type:'hbox',
										align: 'begin ',
										pack: 'center'
									},
									width: '90%',
									items:[
										{
											xtype:'label',
											itemId: 'LabelDescrizione', reference:'LabelDescrizione',
											height:20,
											width: '100%',
			//								name:'descrizione',
											cls:'cbaCssLabelTitolo',
											margin:'0 2 0 8',
											listeners:{
												painted: function(th){
													/*Identifico quando la string va a capo*/
													if(th.innerHtmlElement.dom.clientHeight > 30)
														th.setHeight(40)
												}
											}
										}		
									]
								},
								{
									xtype:'container',
									itemId:'CntIcona',reference:'CntIcona',
									layout:{
										type:'hbox',
										align:'center',
										pack:'end'
									},
									flex:1
								}
								
							]
						}
						
					]
				},
				{
					xtype:'container',
					padding:5,
					items:[
						{
							xtype:'panel',
							flex:1,
							margin:'5 0 0 0',
							items:[
								{
									xtype:'panel',
									layout:{
										type:'vbox',
										align:'stretch'
									},
									flex:1,
									itemId: 'PanelRisposte', reference: 'PanelRisposte',
									margin:'8 0 0 0',
								}
							
							]
						}
					
					]
				}
				
			]
		}
		
	]
});
