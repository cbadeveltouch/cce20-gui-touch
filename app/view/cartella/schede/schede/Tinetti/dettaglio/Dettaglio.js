
Ext.define('CS.schede.schede.Tinetti.dettaglio.Dettaglio',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.Tinetti.dettaglio.DettaglioController'
    ],

    controller: 'cartella-schede-schede-tinetti-dettaglio-dettaglio',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    items:[
	    {
			xtype:'container',
			itemId:'CntCorpoDomanda',reference:'CntCorpoDomanda',
			layout:{
				type:'vbox',
				align:'stretch'
			},
			flex:1,
			margin:'10 0 10 0',
			items:[
				{
					xtype: 'container',
					layout:{
						type:'hbox',
						align: 'center',       
					},
					items: [
						{
							xtype: 'textfield',
							itemId: 'TextfiedIdDomanda', reference: 'TextfiedIdDomanda',
							width:100,
							hidden: true
						},
						{
							xtype:'container',
							layout:{
								type:'hbox'
							},
							cls: 'headerFormSchede',
							width:Ext.is.Phone ? '90%' : 600,
							padding: '3px',
							items:[
								{
									xtype:'label',
									itemId: 'LabelDescrDomanda', reference: 'LabelDescrDomanda',
									height:20,
									name:'descrizione',
									cls:'cbaCssLabelTitolo',
									margin:'0 0 0 8',
									width: '80%',
									listeners:{
										painted: function(th){
											/*Identifico quando la string va a capo*/
											if(th.innerHtmlElement.dom.clientHeight > 30)
												th.setHeight(45)
										}
									}
								}
							]
						}
					]
				},
				{
					xtype:'panel',
					itemId: 'PanelRisposte', reference: 'PanelRisposte',
					layout:{
						type:'vbox',
						align:'stretch'
					},
					flex:1,
					padding: 5,
					margin:'8 0 0 0',
				}
				
			]
		}
	 ]
});
