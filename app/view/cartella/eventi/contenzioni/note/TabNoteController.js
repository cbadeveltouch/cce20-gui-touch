Ext.define('CS.eventi.contenzioni.note.TabNoteController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-eventi-contenzioni-note-tabnote',
    
    controllaModifica:function(th,selected) {
		if(me.lookupReference('GridNoteAgg').permesso === 'S') {
			this.lookupReference('BtnNuovoNote').setDisabled(selected.get('tipoBlocco') ? selected.get('tipoBlocco')[0].valore === 'C' : true );
//			me.getBoxBottoni().queryById('btnElimina').setDisabled(selected.get('tipoBlocco') ? selected.get('tipoBlocco')[0].valore === 'A' : true );
		}
	},
	
	tapBtnNuovoNote:function(th, e){
		e.preventDefault();
		var pnl = Ext.create('CS.eventi.contenzioni.note.insert.TabNoteInsert', {
			cbaConfig: {
				controllerMain: this
			}
		});
		pnl.show();
	},
	
	canceleditGridNoteAgg: function(editor, context, eOpts){
		this.abilitaBottoniGridNoteAgg(true);
		this.aggiornaStore(context.record.get('id'));
	},
	abilitaBottoniGridNoteAgg:function(abilita){
		//TODO_PLS segui gestione per tabProvvedimenti
//		StdCba.IsolaCmp(this.lookupReference('GridNoteAgg'),!abilita);
		this.lookupReference('BtnNuovoNote').setDisabled(!abilita);
//		me.getBoxBottoni().queryById('btnElimina').setDisabled(!abilita);
	},
	
	selectChange: function(th, record){
		
		if(record[0].get('compilatore') != CBA.moduli.modulo49.operatore.id)
			this.lookupReference('Elimina').setHidden(true);
	},
	
	tapBtnElimina:function(th){
		var me= this;
		var grid= me.lookupReference('GridNoteAgg');
		var model = grid._selectable._selection._selectionModel; 
		var rec = model._selectedRecord;
		ControllerStd.eliminaRecord(grid.getStore(),{
			id: rec? rec.get('id') : ''
		},
		function(){
			me.aggiornaStore();
		}, false, 'MSG_ANNULLA_RECORD', 'ANNULLA_RECORD');
		
	},
	
	gestioneForm: function(){		
		var me= this;
		var grid = me.lookupReference('GridNoteAgg');
		grid.permesso = me.cbaConfig.controllerContenzioni.permesso ? me.cbaConfig.controllerContenzioni.permesso : 'L';
       // grid.boxBottoni= me.getBoxBottoni();
		me.storeForm = grid.getStore();
		
		if(grid.permesso == 'L'){
			this.lookupReference('BtnNuovoNote').setDisabled(true);
//			grid.boxBottoni.queryById('btnElimina').setDisabled(true);
		}

		
		if(StdCba.cssGetBlocchi(me.cbaConfig.controllerContenzioni.recordTestata.data.tipoBlocco)[0] == 'DEL'){
			this.lookupReference('BtnNuovoNote').setDisabled(true);
		}else{
			this.lookupReference('BtnNuovoNote').setDisabled(false);
		}
		
	},
	
	aggiornaStore: function(idRecord){
		var me = this;
		var grid = me.lookupReference('GridNoteAgg');
		var store= grid.getStore();
		store.load({
			params:{
				idTe:me.cbaConfig.controllerContenzioni.idTestata
			},
			callback: (records,operation,success)=>{
				if(success){
					Ext.each(this.lookupReference('GridNoteAgg').items.items, item =>{
						var deletedData = item._record ? item._record.get('deletedData') : null;
						if(!Ext.isEmpty(deletedData))
							item.addCls('cbaCssLockTestata-annullata-testo');
						else
							item.removeCls('cbaCssLockTestata-annullata-testo');
					});
					
					if(me.cbaConfig.controllerContenzioni.permesso!=='S') {
						this.lookupReference('Elimina').setHidden(true);
						this.lookupReference('BtnNuovoNote').setHidden(true);
					} else {
						this.lookupReference('Elimina').setHidden(Ext.isEmpty(records));
					}
					var record = null;                        
					if(idRecord){
						record= trovaRecord(store,'id',idRecord);
					}
					
					//se la testata è annullata allora blocco i pulsanti
					if(StdCba.cssGetBlocchi(this.cbaConfig.controllerContenzioni.tipoBlocco)[0] == 'DEL'){
						this.lookupReference('Elimina').setHidden(true);
						this.lookupReference('BtnNuovoNote').setHidden(true);
					}
					
					var model = grid._selectable._selection._selectionModel;      
					model.deselectAll();
					record ? model.select([record]) : null
				}else{
					StdCba.msgShowError('',operation.getError());	
				}				
			}
		});	
	},
	
	init : function(){
		var me=this;
		this.callParent(arguments);
		me.lookupReference('GridNoteAgg').controller = me;
		this.cbaConfig.controllerContenzioni.cbaConfig.controllerInsert = this;
		me.gestioneForm();
		me.aggiornaStore();
	},
	destroy: function(){
		StdCba.eliminaStore(this.store);
	    this.callParent();
	}

});
