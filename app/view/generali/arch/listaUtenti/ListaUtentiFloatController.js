Ext.define('Generali.arch.listaUtenti.ListaUtentiFloatController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.listautenti.listautentifloat',
	
    showView(){
    	this.getView().setHidden(false);
    },
    
    hideView(){
    	this.getView().setHidden(true);
    },
    
	init: function(){
		var me = this;
		this.callParent(arguments);
		
		this.lookupReference('Panel').controller = this;
		
		this.lookupReference('Panel').add(Ext.create('Generali.arch.listaUtenti.ListaUtenti',{
			cbaConfig:{
				controllerMainApp: me.cbaConfig.controllerMainApp,
				controllerPanelFloat: this
			}
		}));
	},

	destroy: function(){
	    this.callParent();
	}

});
