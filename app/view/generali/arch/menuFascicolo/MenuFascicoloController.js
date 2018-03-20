
Ext.define('Generali.arch.menuFascicolo.MenuFascicoloController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.menufascicolo.menufascicolo',
    
    tapBtnHome : function(th){
		var me = this;
		let	mainLevels =  me.cbaConfig.controllerMainApp.lookupReference('MainLevels');
		me.getView().destroy();
		//Distruggo la lista altrimenti mi da problemi lo store sede e reparti che utilizzo in calendarioConsegne
		Ext.Viewport.lista ? Ext.Viewport.lista.destroy() : null;
		Ext.Viewport.lista = null;
		mainLevels.setActiveItem('#Level0');
	},
	
	tapBtnListaUtenti : function(){
		var me = this;
		
		var lista = Ext.Viewport.lista;
		
		if(lista == null){
			let	lista = Ext.create('Generali.arch.listaUtenti.ListaUtentiFloat', {});
			Ext.Viewport.lista = lista;
			Ext.Viewport.add(lista);
		}
		lista.setHidden(false);
		lista.lookupReference('Panel').show();
	},
	
	activeitemchangeMenuCards ( th, newActiveItem, oldActiveItem, eOpts ) {
		var me = this;
		if(newActiveItem != 0 && newActiveItem.getItemId() == 'Level2')
			me.getMenuToolbar().setHidden(true);
		
	},
	
	changeRicercaFunzione:Ext.Function.createBuffered( function(th, newValue){
		var me = this;
		me.store = JSON.parse(sessionStorage.menuVideate1).children;
		
		let storeMenuFilter = [];
		
		Ext.Array.each(me.store, (btn, index, items) => {
			var mostra = true;
			if (!Ext.isEmpty(th.getValue())) {
				mostra = StdCba.traduci(btn.descrizione).toUpperCase().indexOf(th.getValue().toUpperCase()) != -1;				
			}	
			if(mostra)
				storeMenuFilter.push(btn);
			
		});
		me.lookupReference('MainContainer').removeAll();
		StdCba.createMenu(me, storeMenuFilter, me.heightMenu, me.widthMenu, true);
	},200),
	
	tapContainer: function(e){
		var me = this;
		let containerMenu = Ext.fly(e.currentTarget).component;
		e.preventDefault();
		
		if(Ext.isEmpty(CBA.moduli.modulo49.storeAnagraficaSel.getAt(0))){
			Ext.toast(StdCba.traduci('SELEZIONARE_OSPITE'), 2000);
			me.tapBtnListaUtenti();
			return false;
		}
		StdCba.inizioAttesa();
		/*Defer per far visualizzare prima l'attesa e poi lancio il resto*/
		Ext.defer(()=>{
			
			if(me.click === 0){
				
				me.click += 1;
				let menuCard = me.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
					form = containerMenu.cbaConfig.form,
					trovato = false;
				
				/*Caso del portelt*/
				if(Ext.isEmpty(form)){
					let panel = Ext.create('Generali.arch.panelPortlet.PanelPortlet',{
									cbaConfig:{
										idPortlet: containerMenu.cbaConfig.id,
										tipo: me.tipo,
										controllerMainApp : me.cbaConfig.controllerMainApp,
										controllerMenu: me
									}
								});
					menuCard.add(panel);
					panel.show();
					StdCba.fineAttesa();
					return false;
				}

				
				Ext.each(CBA.parametriGenerali.videate, (videata)=>{
					if(videata == form.replace('view.', ''))
						trovato = true;
				});
				
				if(trovato){
					me.cbaConfig.controllerMainApp.lookupReference('Level1').add(Ext.create('Generali.arch.pageStd.PageStd', {
						cbaConfig:{
							percorsoVideata: form.replace('view.', ''),//filePath,
							tipo: me.tipo,
							nomeVideata: containerMenu.cbaConfig.descrizione, 
							permesso: containerMenu.cbaConfig.tipoPermesso,
							controllerMainApp : me.cbaConfig.controllerMainApp,
							click: me.click
						}
					}));
					menuCard.setActiveItem('#Level1');
					StdCba.fineAttesa();
				}else{
					me.click = 0;
					Ext.toast('Videata non gestita');
					StdCba.fineAttesa();
				}
			}

		},60)
				
	},
	

	
	aggiornaStore: function(){
		var me = this;
		this.store = Ext.create('Generali.arch.menuFascicolo.MenuFascicoloStore');
		this.store.load({
			params: {
				idProfiloPwdDe: CBA.parametriGenerali.idProfiloPwdDe,
				idBottone: me.cbaConfig.idBottone
			},
			callback: (records,operation,success)=>{
				if(success){
					var rec = records[0];
					if(!Ext.isEmpty(rec)){
						let store = 'menuVideate' + this.cbaConfig.idBottone;
						sessionStorage.setItem(store ,operation.getResponse().responseText);
						StdCba.createMenu(this, sessionStorage.getItem(store), this.heightMenu, this.widthMenu, true);
					}
				}
			}
		});
	},
	
	init: function(){
		this.callParent(arguments);
		this.lookupReference('ContainerMain').controller = this;
		this.tipo = this.cbaConfig.tipo;
		this.click = 0;
		this.heightMenu = 130;
		this.widthMenu = 110;
		
		let storeSession = 'menuVideate' + this.cbaConfig.idBottone
		if(! sessionStorage.getItem(storeSession)){
			this.aggiornaStore();
		}else{
			StdCba.createMenu(this, sessionStorage.getItem(storeSession), this.heightMenu, this.widthMenu, true);
		}
			
		let lista = Ext.Viewport.lista ? Ext.Viewport.lista.cbaConfig.controllerList.lookupReference('ListUtenti') : null,
			recordSelect = lista ? lista.getSelection() : null;
		 
		!Ext.isEmpty(recordSelect) ? this.lookupReference('LabelOspite').setHtml(recordSelect.get('nominativo')) : null; 
	},

	destroy: function(){
	    this.callParent();
	}

});
