Ext.define('CS.schede.schede.mhct.domanda8.Domanda8Controller', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-schede-mhct-domanda8-domanda8',
	
    selectDom8: function(th, newValue) {
		let ctrl = this.cbaConfig.controllerMain;
		
		if(newValue)
			ctrl.aggiornaPunteggio(parseInt(newValue), 3);
		else
			ctrl.aggiornaPunteggio(0, 3);
	},
	
	init: function(){
		this.callParent(arguments);
		this.lookupReference('SelecteDom8').setName(this.cbaConfig.risposta.subName);
	},
	
	destroy: function() {
	    this.callParent();
	}

});
