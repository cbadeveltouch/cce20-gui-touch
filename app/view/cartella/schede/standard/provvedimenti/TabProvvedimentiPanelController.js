Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiPanelController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-standard-provvedimenti-tabprovvedimentipanel',
    
	
	tapBtnMenu: function(th, e){
		var me = this;
		let image = th,
			panelClick = me.lookupReference('CntProvv');
		
		var recrodId = me.lookupReference('TextfieldID').getValue();
		
		me.menu =  Ext.create('Ext.menu.Menu', {
			hideOnMaskTap: true,
			width: 200,
			plain: true,
			items: [
				{
					text: StdCba.traduci('Annulla'),
					itemId: 'Elimina',
					handler: function(th){
						me.tapMenuElimina(me.menu.record);
						
		        	}
				}
	        ]
		});
		var compilatoreAttuale = CBA.moduli.modulo49.operatore.descr;
		
		if(me.annullato || me.compilatore !=  compilatoreAttuale)
			me.menu.down('#Elimina').setDisabled(true);
    	 me.menu.record = me.cbaConfig.record; 
    	 me.menu.showAt(e.getX()-me.menu.getWidth(), e.getY());
    	 
    	//Distruggo il menu se mi sposto con la scrollbar
 		var scroller = me.cbaConfig.controllerMain.getView().down('panel').getScrollable();
  		if(scroller){
  			scroller.on('scroll', function(th){
  				if(me.menu)
  					me.menu.destroy();
  			});
  		}
    	 
	},
	
	tapMenuElimina: function(record){
		var me = this;
		var rec= record;
		ControllerStd.eliminaRecord(me.cbaConfig.controllerMain.store,{
			id: rec? rec.get('id') : ''
		},
		function(){
			let controllerMain = me.cbaConfig.controllerMain;
			me.cbaConfig.controllerMain.lookupReference('CntMain').removeAll();
			controllerMain.aggiornaStore();
		}, false, 'MSG_ANNULLA_RECORD', 'ANNULLA');
	},
	
	aggiornaStore: function(record){
		var me = this,
			cntProv = me.lookupReference('CntProvv'),
			store= me.storeForm = me.cbaConfig.controllerMain.storeProvvedimenti,
			idRecord = me.cbaConfig.record.id;
		
		me.annullato = record.get('tipoBlocco')[0].valore == 'A';
		me.compilatore = record.get('compilatoreNominativo');
		
		if(record.get('deletedData')){
			me.lookupReference('DataCompilatore').addCls('testataAnnullata');
			me.lookupReference('LabelCompilatore').addCls('testataAnnullata');
			me.lookupReference('HeaderPannello').down('container').insert(1, Ext.create('Ext.Img',{
				src: 'resources/images/btnFunzione/bin.svg',
				height: 20,
				width: 20,
				cls: 'css-rosso'
			}));
		}
		
		me.lookupReference('CompilatoreID').setValue(record.get('compilatore'));
		me.lookupReference('DataCompilatore').setHtml(StdCba.FormattaData(record.get('data'), 'd/m/Y' +' '+ StdCba.FormattaData(record.get('ora'), 'H:i')));
		me.lookupReference('LabelNote').setHtml(record.get('note'));
		
		if(record.get('descrProvvedimenti')){
			var tmp=[];
			var split = record.data.descrProvvedimenti.split("\n");
			Ext.each(split,function(item){
				tmp += '<div><img style="margin-right:4px; float:left;height:16px" src="resources/images/spunta.png"><div style="white-space:normal !important; word-break: break-word; margin-left:20px; text-align:left">'+item+'</div></div><br>';
			});
			me.lookupReference('Provvedimenti').setHtml(tmp);
		}
		
		
		
		var labelCompilatore = me.compilatore.toUpperCase();

		me.lookupReference('LabelCompilatore').setHtml(labelCompilatore);
		
	},

	init: function(){
		var me = this;
		me.callParent(arguments);
		var cntProvv = me.lookupReference('CntProvv');

		cntProvv.controller = me;
		
		me.cbaConfig.controllerMain.storeListaConsegne = Ext.create('CS.schede.standard.provvedimenti.Prov');
		me.cbaConfig.controllerMain.controllerPannello = me;
		me.aggiornaStore(me.cbaConfig.record);
		
		var cc = me.cbaConfig.controllerMain.cbaConfig;
		cc.childCount = Ext.isNumber(cc.childCount) ?  cc.childCount + 1 : 1;
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
		var cc = this.cbaConfig.controllerMain.cbaConfig;
		if (Ext.isNumber(cc.childCount)) {
			cc.childCount--;
		}
		var re = cc.riaggiornaStore;
		if ( re && re === true && cc.childCount == 0 ) {
			delete cc.riaggiornaStore;
			this.cbaConfig.controllerMain.aggiornaStore(null, true);
		}
	    this.callParent();
	}
});
