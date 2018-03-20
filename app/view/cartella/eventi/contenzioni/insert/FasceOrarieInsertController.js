Ext.define('CS.eventi.contenzioni.insert.FasceOrarieInsertController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-eventi-contenzioni-insert-fasceorarieinsert',

    
    tapBtnAnnulla: function(th){
    	var me = this;
    	me.getView().destroy();
    },
    
    tapBtnSalva: function(th,e){
    	var me = this;
    	
    	var grid = me.cbaConfig.controllerMain.lookupReference('GridFasceOrarie');
    	var model = grid._selectable._selection._selectionModel;
		var store= grid.getStore();
		
		
		let form = me.lookupReference('Form');
		
		//Utilizzo l'input value in quando da buildata non esiste il value
		let campoDalle = me.lookupReference('OraDalle').getInputValue();
		let campoAlle = me.lookupReference('OraAlle').getInputValue();
		let rec;
		
		
		if(!Ext.isEmpty(this.cbaConfig.recordSelected)){ //caso del modifica
			rec = this.cbaConfig.recordSelected;
		}else{
			rec = StdCba.trovaRecord(store, 'id', model.getSelectedRecord().get('id'));
		}
		
		let oraDalle = StdCba.sommaDataOra(new Date(), campoDalle);
		let oraAlle = StdCba.sommaDataOra(new Date(), campoAlle);
		rec.set('inizio', oraDalle);
		rec.set('fine', oraAlle);
//		store.insert(0,{
//			inizio: campoDalle.getValue(),
//			fine: campoAlle.getValue()
//		});	
		model.select(0);
		me.getView().destroy();
    },
    
    init: function(){
    	this.callParent(arguments);
    	var me = this;
    	this.lookupReference('Form').controller = this;
    	this.cbaConfig.controllerInsert = this;
    	
    	if(!Ext.isEmpty(this.cbaConfig.recordSelected)){
    		this.lookupReference('OraDalle').setValue(this.cbaConfig.recordSelected.getData().inizio);
    		this.lookupReference('OraAlle').setValue(this.cbaConfig.recordSelected.getData().fine);
    	}
    },

	destroy: function(){
		
		this.callParent();
	}
});
