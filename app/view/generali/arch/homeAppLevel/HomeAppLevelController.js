Ext.define('Generali.arch.homeAppLevel.HomeAppLevelController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.homeapplevel.homeapplevel',

    createApp: function(){
    	this.lookupReference('ContainerMenuApp').add(Ext.create('Generali.arch.homeAppMenu.HomeAppMenu', {	
			cbaConfig:{
				controllerMainApp: this.cbaConfig.controllerMainApp
			}
		}))
    },
    
	init: function(){
		this.callParent(arguments);
		
		this.lookupReference('ContainerMenuApp').add(Ext.create(`Generali.arch.login.Login`, {
			cbaConfig:{
				controllerMenuApp: this
			}
		}));

	},
	destroy: function(){
	    this.callParent();
	}
});
