Ext.define('CS.schede.schede.Tinetti.dettaglio.DettaglioController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-schede-tinetti-dettaglio-dettaglio',

	
	aggiornaPunteggio:function(punteggio,tab){
		var me=this;
		var ctrl = me.cbaConfig.controllerMain;
		if(tab == 1){
			if(ctrl.punteggioAndatura)
				ctrl.punteggioAndatura = ctrl.punteggioAndatura - (Ext.isEmpty(me.punteggioDomanda)? 0 : me.punteggioDomanda) + (Ext.isEmpty(punteggio)? 0 : punteggio);
			else
				ctrl.punteggioAndatura = Ext.isEmpty(punteggio) ? 0 : punteggio;
		}else{
			if(ctrl.punteggioEquilibrio)
				
				ctrl.punteggioEquilibrio = ctrl.punteggioEquilibrio - (Ext.isEmpty(me.punteggioDomanda)? 0 : me.punteggioDomanda) + (Ext.isEmpty(punteggio)? 0 : punteggio);
			else
				ctrl.punteggioEquilibrio = Ext.isEmpty(punteggio) ? 0 : punteggio;
		}
		ctrl.punteggioTotale = ctrl.punteggioAndatura + ctrl.punteggioEquilibrio;
		me.punteggioDomanda = punteggio;
		if(ctrl)
			ctrl.aggiornaLabelPunteggio(ctrl,tab);
	},
	
	tapRisposta: function(e){
		e.preventDefault();
		var container = Ext.fly(e.currentTarget).component;
		var cntMain = this.cbaConfig.controllerMain;
		
		Ext.create('CS.schede.schedeModulari.domande.insert.DomandeInsert', {
			cbaConfig: {
				controllerMain: this.cbaConfig.controllerMain,
				dati: this.cbaConfig.dati.data,
				cntDomanda: container
			}
		}).show();
	},

	init : function(){
		var me = this;
		this.callParent(arguments);
		me.apriPanel = false;
		me.punteggioDomanda = 0; 
		me.lookupReference('TextfiedIdDomanda').setName(me.cbaConfig.dati.data.name);
		me.lookupReference('LabelDescrDomanda').setHtml(StdCba.traduci(me.cbaConfig.dati.data.descrDomanda));
		
		if(Ext.isEmpty(me.cbaConfig.dati.data.risposta)){
			var cntRisposte = Ext.create('Ext.Container', {
				cls: 'cbaCssRispostaSelezionata',
				padding:6,
				layout:{
					type:'hbox',
					align:'stretch'
				},
				flex:1,
				margin:'0 5 8 0',
				listeners:{	
					 element: 'element',
					 tap: 'tapRisposta'
				},
				items:[
					{
						xtype:'label',
						name:'descrizione',
						html: 'Selezionare per visualizzare risposte',
						flex: 1
					},
					{
						xtype:'container',
						 layout : {
							type : 'hbox',
							align:'center'
						},
						width:70,
						margin: '0 10 0 0',
						items:[
							{											
								xtype:'container',
								width:50,
								height:30,
								margin: '0 5 0 0',
								cls:'cbaCssPunteggioRisposta',
								html:'<p style="text-align:center;">'+ '0'+'</p>',
							}									
						]
					}
					
				]
			});
			
			me.lookupReference('PanelRisposte').add(cntRisposte);
			
		}else{
			let item = me.cbaConfig.dati.data.risposte[me.cbaConfig.dati.data.risposta]
				/*Aggiungo valore al textfield per avere le risposte nella getValues per dirtyForm*/
				
				let textfield = me.lookupReference('TextfiedIdDomanda');
				item.punteggio == me.cbaConfig.dati.data.risposta ? textfield.setValue(item.punteggio) : null;
				var cntRisposte = Ext.create('Ext.Container', {
					punteggio: item.punteggio,
					tab: me.cbaConfig.dati.data.tab,
					cls: 'cbaCssRispostaSelezionata' ,
					padding:6,
					layout:{
						type:'hbox',
						align:'center'
					},
					flex:1,
					margin:'0 0 8 0',
					items:[
						{
							xtype:'label',
							html: StdCba.traduci(item.testoRisp),
							value: item.punteggio,
							flex:1
						},
						{
							xtype:'container',
							 layout : {
								type : 'hbox',
								align:'center'
							},
							width:60,
							items:[
								{											
									xtype:'container',
									width:50,
									height:30,
									cls:'cbaCssPunteggioRisposta',
									html:'<p style="text-align:center;">'+ item.punteggio+'</p>',
								}									
							]
						}
					]
				});
				if(item.punteggio == me.cbaConfig.dati.data.risposta){
					if(me.cbaConfig.dati.data.tab == 1){
						me.aggiornaPunteggio(item.punteggio,me.cbaConfig.dati.data.tab);
					}else 
						me.aggiornaPunteggio(item.punteggio,me.cbaConfig.dati.data.tab);
				}
				me.lookupReference('PanelRisposte').add(cntRisposte);	
		
		}
		
	},
	destroy: function(){
//		eliminaStore(this.storeX);
	    this.callParent();
	}	

});
