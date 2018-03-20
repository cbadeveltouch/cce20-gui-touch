Ext.define('Generali.arch.panelPortlet.PanelPortletController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-arch-panelportlet-panelportlet',
    
    tapBtnSearch: function(th){
    	this.lookupReference('CntImgSearch').setHidden(true);
    	this.lookupReference('Search').setHidden(false);
    	
    	//defer altrimenti imposta il focus e lo toglie subito, nacondendo il campo
    	Ext.defer(() => {
    		this.lookupReference('Search').down('searchfield').focus();
    	},60);
    	
    },
    
    focusLeaveSearch: function(th){
    	this.lookupReference('Search').setHidden(true);
    	this.lookupReference('CntImgSearch').setHidden(false);
    },
    
	changeRicercaFunzione:Ext.Function.createBuffered( function(th, newValue){
		var me = this;
		//TODO_PLS VEDERE COME FARE FLASH
		me.store = JSON.parse(me.portletDiari ? sessionStorage.menuDiari : sessionStorage.menuSchede).children;
		
		let storeMenuFilter = [];
		
		Ext.Array.each(me.store, function(btn, index, items) {
			var mostra = true;
			if (!Ext.isEmpty(th.getValue())) {
				mostra = StdCba.traduci(btn.descrizione).toUpperCase().indexOf(th.getValue().toUpperCase()) != -1;				
			}	
			if(mostra)
				storeMenuFilter.push(btn);
			
		});
		me.lookupReference('MainContainer').removeAll();
		StdCba.createMenu(me, storeMenuFilter, me.heightMenu, me.widthMenu);
	},200),
    
    tapContainer: function(e){
		var me = this;
		let container = Ext.fly(e.target).component,
			controllerMainApp = me.cbaConfig.controllerMainApp,
			portlet = container.lookupController().view,
			menuCard = me.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
			trovato = false,
			tipo =  me.cbaConfig.tipo,
			click = me.click;
		
		//altrmenti l'attesa è sotto al pannello
		portlet.setMasked(true);
		StdCba.inizioAttesa();
		Ext.defer(()=>{
			let menuCard = controllerMainApp.lookupReference('MainLevels'),
				trovato = false;

			Ext.each(CBA.parametriGenerali.portlet, function(portlet){
				if(portlet == container.cbaConfig.form.replace('view.', ''))
					trovato = true;
			});
	
			if(trovato){
				me.click += 1;
				controllerMainApp.lookupReference('Level1').add(Ext.create('Generali.arch.pageStd.PageStd', {
		 			cbaConfig:{
		 				percorsoVideata: container.cbaConfig.form.replace('view.', ''),//filePath,
		 				tipo: tipo,
		 				nomeVideata: container.cbaConfig.descrizione, 
		 				permesso: container.cbaConfig.tipoPermesso,
		 				idModuloPrg: container.cbaConfig.idModuloPrg,
		 				controllerMainApp : controllerMainApp,
		 				idVideata: container.cbaConfig.id,
		 				codVideata: container.cbaConfig.codVideata,
		 				click: click 
		 			}
		 		}));
				portlet.setMasked(false);
				portlet.destroy();
		 		menuCard.setActiveItem('#Level1');
		 		StdCba.fineAttesa();
			}else{
				me.click = 0;
				Ext.toast('Videata non gestita');
				StdCba.fineAttesa();
			}
		},60)
		
	},	
	
	aggiornaStore: function(){
		var me = this;
		me.store = Ext.create('Generali.arch.panelPortlet.PortletStore');
		
		me.store.load({
			params: {
				idProfiloPwdDe: me.idProfiloPwdDe,
				idProfilo: me.idProfilo,
				idPortlet: me.cbaConfig.idPortlet
			},
			callback: function(records,operation,success){
				if(success){
					var rec = records[0];
					if(!Ext.isEmpty(rec)){
						if(me.portletDiari){//caso dei diari
							sessionStorage.setItem('menuDiari',operation.getResponse().responseText);
							me.sessionStorage = sessionStorage.menuDiari;
						}else if(me.portletSchede){
							sessionStorage.setItem('menuSchede',operation.getResponse().responseText);
							me.sessionStorage = sessionStorage.menuSchede;
						}else{
							sessionStorage.setItem('menuAlimentazione',operation.getResponse().responseText);
							me.sessionStorage = sessionStorage.menuAlimentazione;
						}
						StdCba.createMenu(me, me.sessionStorage, me.heightMenu, me.widthMenu);
					}
				}
			}
		});
		
		Ext.resumeLayouts();
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		let mainContainer = me.lookupReference('MainContainer');
		mainContainer.controller = me;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idProfiloPwdDe = CBA.parametriGenerali.idProfiloPwdDe;
		me.click = 0;
		
		me.heightMenu = 110;
		me.widthMenu = 90;
		me.portletDiari = me.cbaConfig.idPortlet === 49011;
		me.portletSchede = me.cbaConfig.idPortlet === 49002;
		
		if(me.portletDiari && sessionStorage.menuDiari || me.portletSchede && sessionStorage.menuSchede){
			let sessionStore = me.portletDiari ? sessionStorage.menuDiari : sessionStorage.menuSchede;
			StdCba.createMenu(me, sessionStore, me.heightMenu, me.widthMenu);
		}else{
			me.aggiornaStore();
		}
		
		me.getView().on('hide', (th)=>{
			th.destroy();
		});
		
	},

	destroy: function(){
		this.cbaConfig.controllerMenu.click = 0;
	    this.callParent();
	}

});
