Ext.define('CS.schede.schedeModulari.domande.insert.DomandeInsertController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-schedemodulari-domande-insert-domandeinsert',
   
    gestioneSelezione:function(container,punteggio){debugger
		var me = this;
		let controllerDomanda = this.cbaConfig.cntDomanda.lookupController()
		var labelRisposta = controllerDomanda.lookupReference('CntCorpoDomanda').down('textfield');
		Ext.suspendLayouts();
		if(me.cbaConfig.dati.risposta != container.punteggio){
			let risposta = controllerDomanda.lookupReference('PanelRisposte').items.items[0];
			risposta.query('[cls=cbaCssPunteggioRisposta]')[0].setHtml('<p style="text-align:center;">'+ punteggio +'</p>');
			risposta.down('label').setHtml(container.down('label').getHtml());
			
			
			labelRisposta.setValue(punteggio);
			
			me.cbaConfig.dati.risposta = punteggio;
		}
		this.cbaConfig.cntDomanda.up().up().removeCls('cbaCssBordoErrore');
		Ext.resumeLayouts(true);
		controllerDomanda.aggiornaPunteggio(punteggio,this.cbaConfig.cntDomanda.tab);
		
		this.getView().destroy()
	},
	
	tapRispostaSel: function(e){
		e.preventDefault();
		let container = Ext.fly(e.currentTarget).component,
			cntMain = this.cbaConfig.controllerMain,
			recTe = cntMain.recordTestata;
		
		if(cntMain.lookupReference('Form').permesso == 'S' && ( !recTe || (recTe && !StdCba.cssHasBloccoModifica(recTe.get('tipoBlocco'))
				|| cntMain.lookupReference('Form').getFields().id.getValue() < 0) ) )
			this.gestioneSelezione(container, container.cbaConfig.punteggio);
	},
    
    init: function(){
    	this.callParent(arguments);
    	
    	this.lookupReference('CntMain').controller = this;
    	
    	
    	Ext.each(this.cbaConfig.dati.risposte, (item)=>{
			
				var cntRisposte = Ext.create('Ext.Container', {
					punteggio: item.punteggio,
					itemId: 'Risposta' + item.id,
					padding:6,
					layout:{
						type:'hbox',
						align:'stretch'
					},
					flex:1,
					margin:'0 5 8 0',
					cbaConfig:{
						punteggio: item.punteggio
					},
					listeners:{	
						 element: 'element',
						 tap: 'tapRispostaSel'
					},
					items:[
						{
							xtype:'label',
							name:'descrizione',
							html: Ext.isEmpty(item.descrizione) ? StdCba.traduci(item.testoRisp) : item.descrizione,
							flex: 1
						},
						{
							xtype:'container',
							 layout : {
								type : 'hbox',
								align:'center'
							},
							margin: '5 0 0 0',
							width:60,
							cbaConfig:{
								punteggio: item.punteggio
							},
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
				this.lookupReference('CntMain').add(cntRisposte);
			
		});
    },

	destroy: function(){
		this.callParent();
	}
});
