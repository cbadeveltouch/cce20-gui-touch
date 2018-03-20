Ext.define('Generali.arch.menuAzioni.MenuAzioniController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.menuazioni.menuazioni',
    
    
    searchTerapie: function(th){
    	var menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
   			level = menuCard.lookupController().lookupReference('Level1');
		
		level.add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni', {
			cbaConfig:{
				percorsoVideata: 'CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapie',
				nomeVideata: 'TERAPIE_SOMMINISTRAZIONE_TITOLO',
				tipo: this.cbaConfig.tipo,
				controllerMainApp: this.cbaConfig.controllerMainApp,
				livelloPrec: this.cbaConfig.controllerMainApp.lookupReference('MainLevels').getActiveItem().getItemId(),
				panelOspite: Ext.is.Phone ? true : false
			}
		}));
		menuCard.setActiveItem('#Level1');
    },
    
    searchDiario: function(th) {
	 	var menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
       		level = menuCard.lookupController().lookupReference('Level1');

	 	level.add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni', {
			cbaConfig:{
				nomeVideata: StdCba.traduci('DIARI_PARAMETRI'),
				percorsoVideata: 'CS.menuAzioni.parametriDiariMenu.ParametriDiariMenu',
				tipo : this.cbaConfig.tipo,
				controllerMainApp: this.cbaConfig.controllerMainApp
			}
		}));
		menuCard.setActiveItem('#Level1');
    },
    
    searchAttivita: function(th) {

	 	var menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
       		level = menuCard.lookupController().lookupReference('Level1')

		level.add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni', {
			cbaConfig:{
				nomeVideata: StdCba.traduci('ATTIVITA'),
				percorsoVideata: 'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivita',
				tipo : this.cbaConfig.tipo,
				controllerMainApp: this.cbaConfig.controllerMainApp
			}
		}));
		menuCard.setActiveItem('#Level1');
    },
    
	tapBtnHome: function(th){
		let	mainLevels =  this.cbaConfig.controllerMainApp.lookupReference('MainLevels');

		this.getView().destroy();
		mainLevels.getActiveItem().removeAll();
		mainLevels.setActiveItem('#Level0');
	},
	init: function() {
		this.callParent(arguments);
	},

	destroy: function(){
	    this.callParent();
	}
});
