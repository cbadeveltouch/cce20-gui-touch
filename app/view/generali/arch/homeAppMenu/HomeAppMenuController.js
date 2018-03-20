Ext.define('Generali.arch.homeAppMenu.HomeAppMenuController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.homeappmenu.homeappmenu',
    	
	tapBtnLogout: function(){
		var me = this;
		Ext.Msg.confirm("ATTENZIONE", StdCba.traduci("MSG_LOGOUT"),
				function(id, value) {
					if(id === 'yes'){
						Ext.Ajax.request( {
				            url: `${CbaRootServer}`+'/cba/gen/auth/logout',
				            async: false,
				            success: function(response){
				            	localStorage.clear();
				                localStorage.setItem('cbaLogoutEseguito','T');
				                //ricarico il login
				                sessionStorage.clear()
				                window.location.reload();
				            }
				        });
					}
				}
		);
	},
	
	changeTabpanelHome:function(sender, value, oldValue){
		var me = this;
		
		if (value.getItemId() === 'TabConsegne' )
			me.lookupReference('TabConsegne').add(Ext.create('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegne', {
				cbaConfig:{
					controllerTabPanel : me
				}
			}));
		if (oldValue.getItemId() === 'TabConsegne' )
			me.cbaConfig.controllerConsegne.getView().destroy();
	},
	
	tapAzioni: function(){
		var me = this;
		let mainLevel = me.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
			levelAzioni = me.cbaConfig.controllerMainApp.lookupReference('LevelMenuAzioni');
		
		levelAzioni.add(Ext.create('Generali.arch.menuAzioni.MenuAzioni', {
			cbaConfig:{
				tipo:2,
				controllerMainApp: me.cbaConfig.controllerMainApp
			}
		}));
		mainLevel.setActiveItem('#LevelMenuAzioni');
	},
	
	tapFascicolo:function(th){
		var me = this;
		
		let mainLevel = me.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
			levelFascicolo = me.cbaConfig.controllerMainApp.lookupReference('LevelMenuFascicolo');
		
		Ext.suspendLayouts(true);
		
		if(Ext.isEmpty(Ext.Viewport.lista)){
			let lista = Ext.create('Generali.arch.listaUtenti.ListaUtentiFloat', {
				cbaConfig:{
					controllerMainApp: me.cbaConfig.controllerMainApp
				}
			});
			Ext.Viewport.lista = lista;
			Ext.Viewport.add(lista);
			lista.lookupReference('Panel').show();	
		}
		
		if(levelFascicolo && Ext.isEmpty(levelFascicolo.items.items))
			levelFascicolo.add(Ext.create('Generali.arch.menuFascicolo.MenuFascicolo', {
				cbaConfig:{
					tipo: 1,
					idBottone: th.idBottone,
					controllerMainApp: me.cbaConfig.controllerMainApp
				}
			}));
		mainLevel.setActiveItem('#LevelMenuFascicolo');
		Ext.resumeLayouts(true);
	},
	
	aggiornaStore(){
		var me = this;
		
		var store = Ext.create('Generali.arch.homeAppMenu.ListaMenuButton');
		var idProfiloPwdDe = CBA.parametriGenerali.idProfiloPwdDe;
		var count = 0;
		
		store.load({
			params: {
				idProfiloPwdDe: idProfiloPwdDe
			},
			callback: (records,operation,success)=>{
				if(success){
					var rec = records[0];
					
					if(!Ext.isEmpty(rec)){
						Ext.each(store.getData().items, (i)=>{
							count += 1;
							me.lookupReference('ContainerBtn').add(Ext.create('Ext.Container',{
								itemId: 'Container' + count, reference: 'Container' + count,
								layout: {
									type: 'vbox',
									align: 'middle',
									pack: 'center'
								},
								margin: '0 20 0 20',
								items:[
									{
										xtype: 'img',
										itemId: 'Btn'+ i.get('extra'), reference: 'Btn' + i.get('extra'),
										idBottone: i.get('codice'),
										cls: i.get('valore'),
										width: 80,
										height: 80,
										padding: '10px',
										listeners:{
											tap: (th)=>{
												i.get('tipo') === '1' ? this.tapFascicolo(th) : this.tapAzioni(th);
												
											}
										}
									},
									{
										xtype:'label',
										html: i.get('extra'),
										cls: 'buttonHomeLabel'
									}
								]
							}));

						});
						//TODO_PLS integrare in chiamata ?? menu azioni
//						count += 1;
//						me.lookupReference('ContainerBtn').add(Ext.create('Ext.Container',{
//							itemId: 'Container' + count, reference: 'Container' + count, 
//							layout: {
//								type: 'vbox',
//								align: 'middle',
//								pack: 'center'
//							},
//							margin: '0 20 0 20',
//							items:[
//								{
//									xtype: 'img',
//									itemId: 'Btn'+ 'Azioni', reference: 'Btn' + 'Azioni',
//									src: 'resources/images/azioni.svg',
//									width: 80,
//									height: 80,
//									padding: '10px'
//								},
//								{
//									xtype:'label',
//									html: StdCba.traduci('AZIONI'),
//									cls: 'buttonHomeLabel'
//								}
//							]
//						}));
//						var container = me.lookupReference('ContainerBtn').down('#Container'+count);
//						container.down('img').on('tap', function(){
//							let controller = this.up('#MainContainer').controller;
//							controller.tapAzioni();
//						});
						}
					}
				}
		});
	},
	
	init: function(){
		this.callParent(arguments);
		this.aggiornaStore();
	},

	destroy: function(){
	    this.callParent();
	}

});
