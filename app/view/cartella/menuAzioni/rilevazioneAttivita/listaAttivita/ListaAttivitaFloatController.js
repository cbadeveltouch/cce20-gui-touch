Ext.define('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaFloatController', {
    extend: 'CBAViewController',
    alias: 'controller.cs.menuzioni.rilevazioneAttivita.listaattivita.listaattivitafloatfloat',
	
	init: function(){
		var me = this;
		this.callParent(arguments);

		this.lookupReference('Panel').add(Ext.create('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivita',{
			cbaConfig:{
				controllerMainApp: me.cbaConfig.controllerMainApp,
				controllerPanelFloat: this
			}
		}));
		
		me.lookupReference('Panel').on('hide', function(){
			me.getView().setHidden(true);
		});
		
		me.lookupReference('Panel').on('show', function(){
			me.getView().setHidden(false);
		});
	},

	destroy: function(){
	    this.callParent();
	}

});
