Ext.define('CbaCssTouch.view.generali.arch.mainApp.MainAppController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.mainapp.mainapp',

	mainLevelsChange: function(th, newActiveItem, oldActiveItem){
		var me = this;
		
		let oldForm = oldActiveItem.down('#Form'),
			newForm = newActiveItem.down('#Form');
		
		if(oldForm && oldForm.createFabs){
			StdCba.destroyFloatingButton(oldForm);
			oldForm.createFabs = [];
		}
		/*Vecchia gestione*/
//		if(newActiveItem.items && newActiveItem.items.items[0] && newActiveItem.items.items[0].cbaConfig && newActiveItem.items.items[0].cbaConfig.button &&
//				Ext.isEmpty(newActiveItem.items.items[0].cbaConfig.arrayButton)){
		if(newForm && Ext.isEmpty(newForm.createFabs)){	
			let pageStd = newActiveItem.items.items[0];
			StdCba.createButton(pageStd._controller);
		}
		
		if(newActiveItem.getItemId() === 'LevelMenuFascicolo'){
			newActiveItem.getActiveItem().controller.click = 0;// per non permettere di cliccare due pulsanti nel menu fascicolo
			
			let lista = Ext.Viewport.lista.lookupController().cbaConfig.controllerList.lookupReference('ListUtenti'),
				recordSelect = lista ? lista.getSelection() : null;
			
			//nominativo utente selezionato
			!Ext.isEmpty(recordSelect) ? newActiveItem.down('#LabelOspite').setHtml(recordSelect.get('nominativo')) : null; 
		}
	},
	
	mainLevelsBeforeChange:function(th, newValue, oldValue){
		var me = this;
		
		//animazione sul cambio livello
		var indexOld,
			indexNew;
		
		Ext.each(th.items.items, function(items, index){
			
			items.getId() === oldValue.getId() ? indexOld = index : null;
			items.getId() === newValue.getId() ? indexNew = index : null;
		});
		var animation = me.lookupReference('MainLevels').getLayout().getAnimation();
		
		if (animation && animation.isAnimation) 
			animation.setReverse((indexOld>indexNew))
		
	},
	
	init: function(){
		this.callParent(arguments);
		this.lookupReference('MainLevels').setActiveItem('#Level0');
		this.lookupReference('Level0').add(Ext.create('Generali.arch.homeAppLevel.HomeAppLevel', {
			cbaConfig:{
				controllerMainApp: this
			}
		}));
	},

	destroy: function(){
	    this.callParent();
	}
});
