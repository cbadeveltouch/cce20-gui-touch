Ext.define('CS.parametri.TabCliniciController', {
    extend: 'CS.parametri.ParametriStdController',
    alias: 'controller.cartella-parametri-tabclinici',
	
	loadRisposte: function(){
		var me = this;
		me.loadCbox(me.lookupReference('SelectAlvo').getStore(), 3, 10);
		me.loadCbox(me.lookupReference('SelectMobilita').getStore(), 3, 40);
		me.loadCbox(me.lookupReference('SelectSonno').getStore(), 3, 70);
		me.loadCbox(me.lookupReference('SelectComportamento').getStore(), 3, 60);
		me.loadCbox(me.lookupReference('SelectAttivita').getStore(), 5, 40);
	},

    setParametriController: function(parametriController) {
        this.cbaConfig.parametriController = parametriController;

        this.cbaConfig.parametriController.cliniciController = this;

        this.cbaConfig.parametriController.cntParametri.push(
            {
                parametro: this.lookupReference('SelectMobilita'),
                nomeCampo: 'MOBILITA',
                name: 'mobilita',
                tabRif: 'C',
                getValoreCampo: this.getValoreCampo
            },
            {
                parametro: this.lookupReference('SelectSonno'),
                nomeCampo: 'SONNO',
                name: 'sonno',
                tabRif: 'C',
                getValoreCampo: this.getValoreCampo
            },
            {
                parametro: this.lookupReference('SelectAlvo'),
                nomeCampo: 'ALVO',
                name: 'alvo',
                tabRif: 'C',
                getValoreCampo: this.getValoreCampo
            }
        )
    },
    
    init: function(){
    	this.callParent(arguments);

    	this.loadRisposte();
    },
    
    destroy: function(){
    	this.callParent();
    }

});
