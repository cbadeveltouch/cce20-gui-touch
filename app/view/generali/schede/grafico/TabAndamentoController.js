Ext.define('Generali.schede.grafico.TabAndamentoController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-schede-grafico-tabandamento',

	calcolaAndamento:function(th){
		this.generaGrafico(this.lookupReference('DataDal').getValue(),this.lookupReference('DataAl').getValue());
	},

	calcolaAndamentoCompleto:function(th){
		this.generaGrafico(null,null,1);
	},

	controllaSerie:function(record){
		var me = this;
//		var max = 0, min = null ,tmpPunteggio = [];
//		if(me.maxPunteggio){
//			 max = me.maxPunteggio;
//		}
//		if(me.minPunteggio && me.minPunteggio != 0){
//			 min = me.minPunteggio;
//		}else
//			min = 0;
//		if(min < 0){
//			Ext.each(record,function(rec){
//				if(rec.get('punteggio') < 0){
//					min = rec.punteggio;
//					tmpPunteggio.push(min);
//				}
//			});
//			if(!Ext.isEmpty(tmpPunteggio)){
//				min = Math.max.apply(Math,tmpPunteggio);
//			}
//		}

		if(!Ext.isEmpty(record[0].data.punteggio)){
			me.lookupReference('Grafico')._series[0].setShowInLegend(true);
			me.lookupReference('Grafico')._series[0].setHidden(false);
		}
		if(!Ext.isEmpty(record[0].data.punteggioComplessivo)){
			me.lookupReference('Grafico')._series[1].setTitle(record[0].data.lblPunteggioComplessivo);
			me.lookupReference('Grafico')._series[1].setHidden(false);
			me.lookupReference('Grafico')._series[1].setShowInLegend(true);
		}
		if(!Ext.isEmpty(record[0].data.punteggioCorretto)){
			
			me.lookupReference('Grafico')._series[2].setTitle(record[0].data.lblPunteggioCorretto);
			me.lookupReference('Grafico')._series[2].setHidden(false);
			me.lookupReference('Grafico')._series[2].setShowInLegend(true);
		}
		if(!Ext.isEmpty(record[0].data.andatura)){
			me.lookupReference('Grafico')._series[3].setHidden(false);
			me.lookupReference('Grafico')._series[3].setShowInLegend(true);
		}
		if(!Ext.isEmpty(record[0].data.equilibrio)){
			me.lookupReference('Grafico')._series[4].setHidden(false);
			me.lookupReference('Grafico')._series[4].setShowInLegend(true);
		}
		if(!Ext.isEmpty(record[0].data.totale)){
			me.lookupReference('Grafico')._series[5].setHidden(false);
			me.lookupReference('Grafico')._series[5].setShowInLegend(true);
		}
		me.lookupReference('Grafico').getAxes()[0].setMaximum(me.cbaConfig.punteggioMax);
		me.lookupReference('Grafico').getAxes()[0].setMinimum(me.cbaConfig.punteggioMin ?  me.cbaConfig.punteggioMin : 0);

		me.lookupReference('Grafico').refreshLegendStore();		
	},
	
	generaGrafico:function(dataDal,dataAl,visualizzaTutto){
		var me=this;
		var grafico = me.lookupReference('Grafico');
		var store= grafico.getStore();

		var parametri = {

			idRicovero: me.cbaConfig.idRicovero,
			dal:dataDal ? dataDal : null,
			al:dataAl ? dataAl : null,
			tutto: visualizzaTutto ? visualizzaTutto : 0,
			codiceModulo: me.cbaConfig.codiceModulo
		};

		if (me.cbaConfig.idRicoveroCu){

			if (!me.idRicovero) {
				delete parametri.idRicovero;
			}

			Ext.apply(parametri, {
				idRicoveroCu: me.cbaConfig.idRicoveroCu
			}); 

		}

		if (me.cbaConfig.testataGen) {
			StdCba.ImpostaUrl([store]);
		}

		store.load({
			params:parametri,
			callback: function(records,operation,success){
				if(success){
						if(!Ext.isEmpty(records)){
							
							var rec = records[0];
							var recData = me.lookupReference('Grafico').getStore().getAt(0);
							var recDataAl = me.lookupReference('Grafico').getStore().getAt(store.getCount()-1);
							if(recData && recDataAl){
								me.lookupReference('DataDal').setValue(recData.get('data'));
								me.lookupReference('DataAl').setValue(recDataAl.get('data'));
							}
							if(visualizzaTutto)
								me.lookupReference('DataDal').setValue(rec.get('data'));
							me.controllaSerie(records); 
							store.removeAll();
							store.loadData(records);
						}else
							StdCba.Messaggio('RICERCA','RISULTATO_VUOTO','OK','INFORMATION');
					
				}else{
					StdCba.msgShowError('',operation.getError());	
				}				
			}
		});
		
									
	},
	init : function(){
		this.callParent(arguments);
		this.lookupReference('PnlFiltroGrafico').controller = this;
		
	},
	
	destroy: function(){
		this.callParent();
	}

});
