/*PARAMETRI DA PASSARE
 * nomeVideata
 * percorso videata
 * controllerForm
 */

/*Pagina standar con intestazione: nomeScheramta e tasto back
 * Pulsanti se vi è una form
 * */

Ext.define('Generali.arch.pageStdAzioni.PageStdAzioniController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.pagestdazioni.pagestdazioni',
    
    tapBtnListaUtenti: function(th, e){
		this.openLista();
		
		e.preventDefault();
	},
	
	openLista: function() {
		var lista = Ext.Viewport.lista;
		
		if(lista == null){
			lista = Ext.create('Generali.arch.listaUtenti.ListaUtentiFloat', {
					cbaConfig:{
						controllerMainApp: this.cbaConfig.controllerMainApp
					}
			});
			Ext.Viewport.lista = lista;
			Ext.Viewport.add(lista);
		}
		
		lista.lookupReference('Panel').show();
	},
	
	tapBtnBack: function(th, e){
		let	mainLevels =  this.cbaConfig.controllerMainApp.lookupReference('MainLevels');
		this.getView().destroy();
		mainLevels.getActiveItem().removeAll(true);
		mainLevels.setActiveItem('#' + this.livelloPrecedente);
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		let	mainLevels =  me.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
			insert = me.cbaConfig.controllerForm ? me.cbaConfig.controllerForm.lookupReference('Form') : null,
			cbaConfig = me.cbaConfig;
		me.cbaConfig.controllerPageStd = me;
			
		me.lookupReference('Container').controller = me;
		
		me.livelloPrecedente = Ext.isDefined(me.cbaConfig.livelloPrec) ? me.cbaConfig.livelloPrec : mainLevels.getActiveItem().getItemId();
		me.tipo = me.cbaConfig.tipo;
		
		me.cbaConfig.panelOspite ? me.lookupReference('PanelOspite').setHidden(false) : null;
		
		me.cbaConfig.nomeVideata ? me.lookupReference('LabelSchermata').setHtml(StdCba.traduci(me.cbaConfig.nomeVideata)) : null;
		
		me.lookupReference('PnlBody').add(Ext.create(me.cbaConfig.percorsoVideata, {
			cbaConfig: cbaConfig
		}));
		me.cbaConfig.controller = me.lookupReference('PnlBody').down('#Form') ? me.lookupReference('PnlBody').down('#Form').controller : null;	
		//se sono in insert visualizzo i pulsanti
		
		/*Se i pulsanti sono gia presenti nel livello precendente setto una variabile che mi permette di sapere se devo crearli sul change dopo aver distrutto
		 * 	quelli del livello precedente*/
		if(me.cbaConfig.permesso != 'L' && !Ext.isEmpty(insert))
			me.cbaConfig.button = true;
	},
	
	destroy: function(){
	    this.callParent();
	}

});
