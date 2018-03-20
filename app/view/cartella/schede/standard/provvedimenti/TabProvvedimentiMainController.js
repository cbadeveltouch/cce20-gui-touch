Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiMainController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-standard-provvedimenti-tabprovvedimentimain',
    
    aggiornaStore: function(idRecord, nuovo){
		var me = this;
		me.store = Ext.create('CS.schede.standard.provvedimenti.Prov');
		me.store.load({
			params:{
				idTest:me.idTest,
				codiceModulo: me.codiceModulo
			},
			callback: function(records,operation,success){
				if(success){
					
					if(!Ext.isEmpty(records)){
						
						var container = me.lookupReference('CntMain');
						records.forEach( function(rec) {
							var pnl = Ext.create('CS.schede.standard.provvedimenti.TabProvvedimentiPanel',{
								cbaConfig:{
									controllerMain: me.cbaConfig.controller,
									record: rec
								}
							});
							container.add(pnl);
							
						});
							
					} else{
						me.lookupReference('CntMain').add({
								xtype: 'container',
								flex: 1,
								layout: {
									type: 'hbox',
									align: 'middel',
									pack: 'center'
								},
								flex: 1,
								items : [
									{
										xtype: 'label',
										cls: 'cbaCssLabel',
										html: StdCba.traduci('NESSUN_DATO_PRESENTE')
									}
								]});
					}
				}else{
					StdCba.msgShowError('',operation.getError());	
				}				
			}
		});	
	},
	creaPulsante: function(){
		var me = this;
		//TODO_PLS su desktop non ce il controllo permesso lasciare ?? 
		var tipoBlocco = StdCba.cssGetBlocchi(me.cbaConfig.controllerDettaglio.recordTestata.get('tipoBlocco'));
		if(!Ext.isEmpty(tipoBlocco) && tipoBlocco[1] == 'A' || this.cbaConfig.controllerDettaglio.cbaConfig.permesso == 'L')
			return false;
		
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnNuovoFake', reference: 'BtnNuovoFake',
			bottom: 50,
			right: 20,
			height: 50,
			width: 50,
			menuButtonDefault: {
				icon: 'resources/images/buttonFloating/add.svg',
			},
			//hidden: !permessoScrittura
		});
		
		me.btnNuovo = Ext.Viewport.down('#BtnNuovoFake');
		me.btnNuovo.on('tap', (th, e)=>{
			e.preventDefault();
			var pnl = Ext.create('CS.schede.standard.provvedimenti.TabProvvedimentiInsert', {
							cbaConfig: {
								controllerMain: me
							}
						});
			pnl.show();
		});
	},
    
    init: function(){
    	this.callParent(arguments);
    	var me = this;
    	this.lookupReference('CntMain').controller = this;
    	this.cbaConfig.controller = this;
    	me.codiceModulo = me.cbaConfig.controllerDettaglio.cbaConfig.sottoTipoTestata || me.cbaConfig.controllerDettaglio.sottoTipoTestata || me.cbaConfig.controllerDettaglio.codiceModulo;
    	var storeDomande = Ext.create('CS.personalizzazioni.risposte.store.RisposteDe');
    	
//		storeDomande.load({
//			params:{
//				idProfilo:me.cbaConfig.idProfilo,
//				codArea:me.cbaConfig.codArea,
//				codDomanda:me.cbaConfig.codDomanda
//			},
//			callback:function(records,operation,success){
//				if(success){
//					
//					me.checkboxGroupRisp = Ext.create('Ext.form.FieldContainer',{
//						layout:'column',
//						defaultType: 'checkboxfield'				
//					});
//					 Ext.each(records,function(rec){
//						me.checkboxGroupRisp.add({
//							boxLabel: rec.data.descrizione ,
//							inputValue: rec.data.id,
//							cls:'cbaCassGridEditor ',
//							boxLabelCls:'cbaCssGridEditorLabel',
//							name:'provvedimentiList',
//							width:220,
//			
//						});
//					 });
//					 me.getColProvv().editor=me.checkboxGroupRisp;
//				}else{
//					msgShowError('',operation.getError());	
//				}
//			}
//		});
   	
    },

	destroy: function(){
		this.callParent();
	}
});
