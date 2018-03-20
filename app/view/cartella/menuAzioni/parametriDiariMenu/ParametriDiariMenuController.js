Ext.define('CS.menuAzioni.parametriDiariMenu.ParametriDiariMenuController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella.menuazioni.parametridiarimenu.parametridiarimenu',
    
    tapContainer: function(e){
		var me = this;
		e.preventDefault();		
		var containerMenu = Ext.fly(e.currentTarget).component,
			menuCard = containerMenu.up('#MainLevels'),
			level = menuCard.down('#Level2');
		
		level.add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni', {
			cbaConfig:{
				percorsoVideata: 'CS.menuAzioni.parametriInsert.ParametriInsert',
				parametro: containerMenu.cbaConfig.cnt,//nome del parametro selezionato
				nomeVideata: containerMenu.cbaConfig.descrizione,
				tipo: this.cbaConfig.tipo,
				controllerMainApp: this.cbaConfig.controllerMainApp,
				livelloPrec: this.cbaConfig.controllerMainApp.lookupReference('MainLevels').getActiveItem().getItemId(),
				panelOspite: Ext.is.Phone ? true : false
			}
		}));
		
		if(!Ext.is.Phone){
			level.insert(0, Ext.create('Generali.arch.listaUtenti.ListaUtenti', {
				cbaConfig:{
					controllerMainApp : this.cbaConfig.controllerPageStd.cbaConfig.controllerMainApp
				}
			}))
		}
		menuCard.setActiveItem('#Level2');
			
	},	
	
	changeRicercaFunzione:Ext.Function.createBuffered( function(th, newValue){
		var me = this;
		
		let storeMenuFilter = [];
		
		Ext.Array.each(me.store.data.items, function(item, index, array) {
			var mostra = true;
			if (!Ext.isEmpty(th.getValue())) {
				mostra = StdCba.traduci(item.get('descrizione')).toUpperCase().indexOf(th.getValue().toUpperCase()) != -1;				
			}	
			if(mostra)
				storeMenuFilter.push(item);
			
		});
		me.lookupReference('MainContainer').removeAll();
		StdCba.createMenu(me, storeMenuFilter, me.heightMenu, me.widthMenu, true);
	},200),

	
	init: function(){
		var me = this;
		this.callParent(arguments);
		me.heightMenu = 110;
		me.widthMenu = 100;
		me.store = Ext.create('CS.menuAzioni.parametriDiariMenu.ParametriDiariMenuStore');
		
		StdCba.createMenu(me, me.store, me.heightMenu, me.widthMenu, true);
	},
	destroy: function(){
	    this.callParent();
	}

});
