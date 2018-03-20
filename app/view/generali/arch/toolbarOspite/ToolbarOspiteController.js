Ext.define('Generali.arch.toolbarOspite.ToolbarOspiteController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-arch-toolbarospite-toolbarospite',
    
    tapBtnListaUtenti: function(th, e){
		
		var lista = Ext.Viewport.lista;
	
		if(lista == null){
			lista = Ext.create('Generali.arch.listaUtenti.ListaUtentiFloat', {});
			Ext.Viewport.add(lista);
		}
		lista.setHidden(false);
		lista.lookupReference('Panel').show();
		e.preventDefault();
	},
	
	tapBtnMenu: function(th, e){

		let mainLevels =  this.cbaConfig.controllerMainApp.lookupReference('MainLevels');;
		this.getView().destroy();
		mainLevels.getActiveItem().removeAll(true);
		mainLevels.setActiveItem('#' + this.livelloPrecedente);
		e.preventDefault();
	},

	init: function(){
		this.callParent(arguments);
		let mainLevels =  this.cbaConfig.controllerMainApp.lookupReference('MainLevels');
		this.livelloPrecedente = mainLevels.getActiveItem().getItemId();
		
		let lista = Ext.Viewport.down('#ListUtenti');
		let recordSelect;
		
		if(lista){
			recordSelect = lista.getSelection();
		}else{
			lista = Ext.create('Generali.arch.listaUtenti.ListaUtentiFloat', {
				cbaConfig:{
					controllerMainApp: this.cbaConfig.controllerMainApp
				}
			});
			Ext.Viewport.lista = lista;
			Ext.Viewport.add(lista);
			lista.lookupReference('Panel').show();
		}
		this.lookupReference('LabelNomeVideata').setHtml(this.cbaConfig.nomeVideata);
		!Ext.isEmpty(recordSelect) ? this.lookupReference('LabelOspite').setHtml(recordSelect.get('nominativo')) : null; 
			
		
	},

	destroy: function(){
	    this.callParent();
	}

});
