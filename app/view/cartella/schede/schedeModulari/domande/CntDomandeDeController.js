Ext.define('CS.schede.schedeModulari.domande.CntDomandeDeController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-schedemodulari-domande-cntdomandede',

    afterenderCntDomandeDe:function(){
		var me=this;
		if((Ext.isEmpty(me.cbaConfig.dati.idRisposta)) && (Ext.isEmpty(me.cbaConfig.dati.idTest)) && (Ext.isEmpty(me.cbaConfig.dati.idTestRisposta))){
			me.apriPanel=true;
			return false;
		}else if(!me.cbaConfig.dati.idRisposta &&  me.cbaConfig.dati.domandaSkValColl && me.cbaConfig.dati.domandaSkValColl.valore){     // è possibile anche toglierli, questi due if dando per scontanto che i test di valutazione presenti siano sempre compilati
			
			me.apriPanel=false;
		}else if(!me.cbaConfig.dati.idRisposta){  
			
			me.lookupReference('PanelRisposte').up().addCls('cbaCssBordoErrore');
			me.apriPanel=true;
		}
		me.collassa();
	},
	aggiornaPunteggio:function(punteggio){
		var me=this;
		var ctrl = me.cbaConfig.controllerMain;
		if (ctrl.Punteggio){
			//* Aggiorno il punteggio del test, togliendo la risposta selezionata in precedenza ed aggiungendo la nuova risposta selezionata
			ctrl.Punteggio = ctrl.Punteggio - (Ext.isEmpty(me.punteggioDomanda)? 0 : me.punteggioDomanda) + (Ext.isEmpty(punteggio)? 0 : punteggio);
		}
		else ctrl.Punteggio = Ext.isEmpty(punteggio)? 0 : punteggio;
		me.punteggioDomanda = punteggio;
		
		if(ctrl && ctrl.lookupReference('TotPunteggio') && ctrl.aggiornaLabelPunteggio)
			ctrl.aggiornaLabelPunteggio(ctrl);
	},
	gestioneSelezione:function(th,id,punteggio){
		var me=this;
		Ext.suspendLayouts();
		var idRispostaSel = Ext.ComponentQuery.query('[itemId=TextIdRisposta]'); //tutte le label 
		if(me.cbaConfig.dati.idRisposta==id){		
			th.removeCls('cbaCssRispostaSelezionata');
			//se becco la risposta gia selezionata tolgo la classe e azzero il punteggio 
			punteggio=0;
		
			idRispostaSel[me.cbaConfig.dati.ordine-1].setValue('');
			me.cbaConfig.dati.idRisposta=null;
			var btn= me.lookupReference('CntCorpoDomanda').down('image');
			//controllo se il pannello e  aperto se  aperto non collasso
			if(!me.apriPanel){
				me.apriPanel=true;
				me.collassa(btn);
			}
		}else{
			for(var i=0;i<me.cbaConfig.dati.risposte.length;i++){
				me.lookupReference('PanelRisposte').down('#Risposta'+me.cbaConfig.dati.risposte[i].id).removeCls('cbaCssRispostaSelezionata');
			}
			
			/*Formo array per salvataggio*/
			me.idDomanda.push(me.lookupReference('TextIdDomanda').getValue());
			me.idRisposta.push(id);
			me.idTest.push(me.lookupReference('TextIdTest').getValue());
			me.idTestRisposta.push(me.lookupReference('TextIdTestRisposta').getValue());
			
			me.cbaConfig.dati.idRisposta=id; //aggiorno l'id della risposta
			idRispostaSel[me.cbaConfig.dati.ordine-1].setValue(id);
			th.addCls('cbaCssRispostaSelezionata');
			th.up().up().removeCls('cbaCssBordoErrore');
			var btn= me.lookupReference('CntCorpoDomanda').down('image');
			me.apriPanel=false;
			me.collassa(btn);
		}
		Ext.resumeLayouts(true);
		//se il test non prevede domande esclusive tra di loro esco dalla funzione 
		if(!me.cbaConfig.dati.domandaSkValColl){
				
				me.aggiornaPunteggio(punteggio);
				return false;	
		}
		me.sbiancaRisposta(punteggio);
		me.aggiornaPunteggio(punteggio);
		
	},
	sbiancaRisposta:function(punteggio){
		var me=this;
		Ext.suspendLayouts();
		var ctrl = me.cbaConfig.controllerMain;
		var domandaColl=ctrl.lookupReference('CntCorpoDomande').query('[idDomanda=' + me.cbaConfig.dati.domandaSkValColl.idDomandaColl+ ']');
		var idRispostaColl= domandaColl[0].query('[itemId=TextIdRisposta]');
		var ctrlDomandaSkval = domandaColl[0].up().controller;
		if(me.cbaConfig.dati.domandaSkValColl.valore != null){
			//verifico se è vuota 
			if(!ctrlDomandaSkval.cbaConfig.dati.idRisposta){
				domandaColl[0].down('#Risposta'+ me.cbaConfig.dati.domandaSkValColl.valore).addCls('cbaCssRispostaSelezionata');
				ctrlDomandaSkval.lookupReference('PanelRisposte').up().removeCls('cbaCssBordoErrore');
				if(!ctrlDomandaSkval.apriPanel){
					ctrlDomandaSkval.apriPanel=true;
					ctrlDomandaSkval.collassa(ctrlDomandaSkval.lookupReference('CntIcona').down('image'));
				}
				
			}else if(ctrlDomandaSkval.cbaConfig.dati.idRisposta != me.cbaConfig.dati.domandaSkValColl.valore){
				//tolgo la selezione precedente e aggiungo la nuova selezione
				
				domandaColl[0].down('#Risposta'+ ctrlDomandaSkval.cbaConfig.dati.idRisposta).removeCls('cbaCssRispostaSelezionata');
				domandaColl[0].down('#Risposta'+ me.cbaConfig.dati.domandaSkValColl.valore).addCls('cbaCssRispostaSelezionata');
				if(!ctrlDomandaSkval.apriPanel){
					ctrlDomandaSkval.apriPanel=true;
					ctrlDomandaSkval.collassa(ctrlDomandaSkval.lookupReference('CntIcona').down('image'));
				}
			}
			//aggiorno l'id della risposta
			ctrlDomandaSkval.cbaConfig.dati.idRisposta=me.cbaConfig.dati.domandaSkValColl.valore;
			idRispostaColl[0].setValue(me.cbaConfig.dati.domandaSkValColl.valore);
			//aggiorno il punteggio
			ctrlDomandaSkval.aggiornaPunteggio();		
		}else if(me.cbaConfig.dati.idRisposta && me.cbaConfig.dati.idRisposta != ctrlDomandaSkval.cbaConfig.dati.domandaSkValColl.valore){
			if(ctrlDomandaSkval.cbaConfig.dati.idRisposta && ctrlDomandaSkval.cbaConfig.dati.idRisposta != -1) /*aggiunto controllo per BARTHEL MOBILITA*/{	
				domandaColl[0].down('#Risposta'+ ctrlDomandaSkval.cbaConfig.dati.idRisposta).removeCls('cbaCssRispostaSelezionata');
				ctrlDomandaSkval.cbaConfig.dati.idRisposta = null;
				if(!ctrlDomandaSkval.apriPanel){
					ctrlDomandaSkval.apriPanel=true;	
					ctrlDomandaSkval.collassa(ctrlDomandaSkval.lookupReference('CntIcona').down('image'));
				}
			}
			idRispostaColl[0].setValue('-1');
			ctrlDomandaSkval.aggiornaPunteggio();			
		}else if(ctrlDomandaSkval.cbaConfig.dati.idRisposta && ctrlDomandaSkval.cbaConfig.dati.idRisposta != -1)/*aggiunto controllo per BARTHEL MOBILITA*/ {
			
			domandaColl[0].down('#Risposta'+ ctrlDomandaSkval.cbaConfig.dati.idRisposta).removeCls('cbaCssRispostaSelezionata');
			idRispostaColl[0].setValue('');
			ctrlDomandaSkval.cbaConfig.dati.idRisposta = null;
			ctrlDomandaSkval.aggiornaPunteggio();
			if(!ctrlDomandaSkval.apriPanel){
				ctrlDomandaSkval.apriPanel=true;
				ctrlDomandaSkval.collassa(ctrlDomandaSkval.lookupReference('CntIcona').down('image'));
			}
		}else{ 
		
			idRispostaColl[0].setValue('');
			if(!ctrlDomandaSkval.apriPanel){
				ctrlDomandaSkval.apriPanel=true;
				ctrlDomandaSkval.collassa(ctrlDomandaSkval.lookupReference('CntIcona').down('image'));
			}
		}
		Ext.resumeLayouts(true);
	},
	
	collassa:function(th){
		
//		var me = this;
//		if(th){
//			th.setSrc('resources/images/generali/'+ (me.apriPanel == true ? 'portlet-collapse.svg' : 'portlet-expand.svg'));
//		}
//		Ext.suspendLayouts();
//		for(var i = 0;i < me.cbaConfig.dati.risposte.length;i++){
//			var cntRisp=me.lookupReference('PanelRisposte').down('#Risposta'+me.cbaConfig.dati.risposte[i].id);
//			//entro quando voglio collassare e mostrare solo la risposta selezionata apriPanel è a false
//			if((!me.apriPanel) && (me.cbaConfig.dati.idRisposta != me.cbaConfig.dati.risposte[i].id)){
//				cntRisp.hide();	
//			}else if(me.apriPanel){
//				cntRisp.show();
//			}
//		}
//		Ext.resumeLayouts(true);
	},	
	init : function(){
		var me = this;
		me.callParent(arguments);
		
		me.cbaConfig.controllerMain.cbaConfig.arrayDomande;
		me.idDomanda = me.cbaConfig.controllerMain.cbaConfig.arrayDomande.idDomanda;
		me.idRisposta = me.cbaConfig.controllerMain.cbaConfig.arrayDomande.idRisposta;
		me.idTest = me.cbaConfig.controllerMain.cbaConfig.arrayDomande.idTest;
		me.idTestRisposta = me.cbaConfig.controllerMain.cbaConfig.arrayDomande.idTestRisposta;
		
		me.punteggioDomanda = 0;
		me.apriPanel=false;
		
		/*Campi sulla view*/
		var txtIdRisposta='';
		if(me.cbaConfig.idTest){
			if(me.cbaConfig.dati.idRisposta == null  &&  me.cbaConfig.dati.domandaSkValColl && me.cbaConfig.dati.domandaSkValColl.valore)
				txtIdRisposta='-1';
			else
				txtIdRisposta=me.cbaConfig.dati.idRisposta;
		}else
			txtIdRisposta = null; 
		
		me.cbaConfig.dati.id ? me.lookupReference('TextIdDomanda').setValue(me.cbaConfig.dati.id) : null;
		me.cbaConfig.dati.idTest ? me.lookupReference('TextIdTest').setValue(me.cbaConfig.dati.idTest) : null;
		txtIdRisposta ? me.lookupReference('TextIdRisposta').setValue(txtIdRisposta) : null;
		me.cbaConfig.dati.idTestRisposta ? me.lookupReference('TextIdTestRisposta').setValue(me.cbaConfig.dati.idTestRisposta) : null;
		me.cbaConfig.dati.descrizione ? me.lookupReference('LabelDescrizione').setHtml(me.cbaConfig.dati.descrizione) : null;
		/**/
		
		me.lookupReference('CntCorpoDomanda').idDomanda = me.cbaConfig.dati.id;
		if(me.cbaConfig.controllerMain.nuovoTestDom){
			var cntRisposte = Ext.create('Ext.Container', {
//				itemId: 'Risposta' + item.id,
				cls: 'cbaCssRispostaSelezionata',
				padding:6,
				layout:{
					type:'hbox',
					align:'stretch'
				},
				flex:1,
				margin:'0 5 8 0',
				items:[
				    {
						xtype:'container',
						flex:1,
						items:[
							{
								xtype:'label',
								name:'descrizione',
								html: 'Selezionare per visualizzare risposte'
							}
						]							
					}
				],
				listeners:{						
					painted:function(th){								
						th.el.on('tap',function(e){
							var container = Ext.fly(e.currentTarget).component;
							var cntMain = me.cbaConfig.controllerMain;
							
							var pnl = Ext.create('CS.schede.schedeModulari.domande.insert.DomandeInsert', {
								cbaConfig: {
									controllerMain: me,
									dati: me.cbaConfig.dati
								}
							});
							pnl.show();
						});
						
					}
				}
			});
			
//			if (item.id == me.cbaConfig.dati.idRisposta){
//				me.aggiornaPunteggio(item.punteggio);
//			}
			me.lookupReference('PanelRisposte').add(cntRisposte);
			
		}else{
		
			Ext.each(me.cbaConfig.dati.risposte, function(item){
				/*Formo array per salvataggio*/
				if(item.id == me.cbaConfig.dati.idRisposta){
					me.idDomanda.push(me.lookupReference('TextIdDomanda').getValue());
					me.idRisposta.push(me.cbaConfig.dati.idRisposta);
					me.idTest.push(me.lookupReference('TextIdTest').getValue());
					me.idTestRisposta.push(me.lookupReference('TextIdTestRisposta').getValue());
				
				
					var cntRisposte = Ext.create('Ext.Container', {
						itemId: 'Risposta' + item.id,
						cls: (item.id == me.cbaConfig.dati.idRisposta) ? 'cbaCssRispostaSelezionata' : '',
						padding:6,
						layout:{
							type:'hbox',
							align:'stretch'
						},
						flex:1,
						margin:'0 5 8 0',
						items:[
						    {
								xtype:'container',
								flex:1,
								items:[
									{
										xtype:'label',
										name:'descrizione',
										html: item.descrizione
									}
								]							
							},
							{
								xtype:'container',
								 layout : {
									type : 'hbox',
									align:'center'
								},
								margin: '5 0 0 0',
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
						],
						listeners:{						
							painted:function(th){								
								th.el.on('tap',function(e){
									var container = Ext.fly(e.currentTarget).component;
									var cntMain = me.cbaConfig.controllerMain;
									var recTe = cntMain.recordTestata;
									if(cntMain.lookupReference('Form').permesso == 'S'
										&& ( !recTe || (recTe && !StdCba.cssHasBloccoModifica(recTe.get('tipoBlocco'))
											|| cntMain.lookupReference('Form').getFields().id.getValue() < 0) ) )
										me.gestioneSelezione(container,item.id,item.punteggio);
								});
								
							}
						}
					});
					
					if (item.id == me.cbaConfig.dati.idRisposta){
						me.aggiornaPunteggio(item.punteggio);
					}
					me.lookupReference('PanelRisposte').add(cntRisposte);
				}
			});
		}
	},
	destroy: function(){
//		eliminaStore(this.storeX);
	    this.callParent();
	}
});
