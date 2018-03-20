
Ext.define('CS.schede.schede.mhct.dettaglio.Dettaglio',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.schede.mhct.dettaglio.DettaglioController',
        'CbaUtils.componenti.all.CbaMultipleChoice'
    ],

    controller: 'cartella-schede-schede-mhct-dettaglio-dettaglio',
    
    layout:{
    	type: 'vbox',
    	align: 'stretch'
    },
    items:[
		{
			xtype: 'container',
			itemId: 'CntCorpoDomanda', reference: 'CntCorpoDomanda',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'container',
					layout: {
						type:'hbox',
						align: 'center',
					},
					width: Ext.is.Phone ? '95%' : 600,
					items: [
						{
							xtype: 'textfield',
							itemId: 'TextfieldDomanda', reference: 'TextfieldDomanda',
							width: 50,
//							name: this.cbaConfig.dati.data.name, // IDDOMANDA
//							isFormField: this.cbaConfig.dati.data.name === 'domanda8Risposta' ? false : true,
							hidden: true
						},
						{
							xtype:'container',
							layout:{
								type:'hbox',
								align: 'stretch'
							},
							cls: 'headerFormSchede', 
							width:Ext.is.Phone ? '95%' : 600,
							padding:2,
							items:[
								{
									xtype:'label',
									itemId: 'LabelDescrizione', reference:'LabelDescrizione',
									height:20,
									width: '100%',
									cls:'cbaCssLabelTitolo',
									margin:'0 2 0 8',
									width: '95%',
									listeners:{
										painted: function(th){
											/*Identifico quando la string va a capo*/
											if(th.innerHtmlElement.dom.clientHeight > 30)
												th.setHeight(60)
										}
									}
								}	
							]
						}
					]
				},
				{
					xtype: 'panel',
					itemId: 'PanelRisposte', reference: 'PanelRisposte',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					margin: '8 0 0 0'
				}
				
			]
		}
		
	]
});
