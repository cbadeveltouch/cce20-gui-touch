/*PARAMETRI DA PASSARE
 * nomeVideata
 * percorsoVideata
 * permesso
 * tipo
 */

/*Pagina standar con intestazione: toolbarOspite(tasto menu e schelta ospite)
 * body: se fascicolo: carousel con testata
 * pulsanti
 * pnlCompilatore
 * */

Ext.define('Generali.arch.pageStd.PageStdController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-arch-pagestd-pagestd',
    
    tapInfoBlocco: function(th){
    	Ext.toast({message: th.cbaConfig.txt, timeout: 3000, closable: true});
    },
    
    activeItemChangeCarousel: function(sender, value, oldValue){
    	//Blocco slide se la form è sporca oppure se non ho nessuna testata
    	let form = Ext.isDefined(this.cbaConfig.controller) ? this.cbaConfig.controller.lookupReference('Form') : null;
    	if(sender.destroying != true){
    		if(this.cbaConfig.controller && (form && form.dirty_isDirty() || Ext.isEmpty(this.cbaConfig.controller.testataSelezionata))){
        		this.lookupReference('Carousel').setActiveItem(this.lookupReference('CntPageStd'));
        		return false;
        	}
        		
    		/*
    		 * sender.destroying serve a non farlo entrare quando si torna alla home
    		 */
    		
    		if((value.getItemId() == 'CntPageStdNext' || value.getItemId() == 'CntPageStdPrev')){
    			
    			let direzione,
    				controllerTestata = this.cbaConfig.controller.cbaConfig.controllerTestata;
    		
    			value.getItemId() == 'CntPageStdNext' ? direzione = 'sinistra' : direzione = 'destra';
    			
    			controllerTestata.naviga(direzione);
    			
    			this.lookupReference('Carousel').setActiveItem(this.lookupReference('CntPageStd'));
    			
    		}
    	}
    	
	},
	
	init: function(){
		var me = this; 
		this.callParent(arguments);
		
		Ext.suspendLayouts(true);
		
		this.getView().controller = this;
		this.nuovo = Ext.Viewport.editMode = false; //controllo per mostrare nascondere puslanti floating
		//TODO_PLS controllo se la testata ci deve essere
		
		this.tipo = this.cbaConfig.tipo;
		this.nomeVideata = this.cbaConfig.nomeVideata;
		this.permesso = this.cbaConfig.permesso;
		this.percorsoVideata = this.cbaConfig.percorsoVideata;
		this.portrait = Ext.Viewport.getOrientation() == 'portrait';
		
		this.cbaConfig.buttonToShow = [];
		this.cbaConfig.button = true; //se apro un secondo livello, quando ritorno mi ricreo i pulsanti
		
		if(Ext.is.Phone || this.cbaConfig.tipo === 1)
			this.lookupReference('PnlHeader').add(Ext.create('Generali.arch.toolbarOspite.ToolbarOspite', {
				cbaConfig:{
					nomeVideata: this.nomeVideata,
					controllerMainApp: this.cbaConfig.controllerMainApp
				}
			}));
		
		if(this.cbaConfig.tipo === 1){//tipo fascicolo
			
			this.lookupReference('PnlBody').add(Ext.create('Ext.carousel.Carousel', {
				itemId: 'Carousel', reference: 'Carousel',
				layout: {
					type: 'hbox',
					align: 'stretch',
				},
				border: false,
				padding: '5px',
				flex:1,
				listeners:{
					activeItemChange: 'activeItemChangeCarousel'
				},
				items:[
					{
						xtype: 'container',
						itemId: 'CntPageStdNext', reference: 'CntPageStdNext',
						layout: {
							type: 'vbox',
							align:'center',
							pack: 'middle'
						},
						flex: 1,
						html: '<body>' +
								'<div class="ball"></div>'+
								'<div class="ball1"></div>'+
							  '</body>'
					},
					{
						xtype: 'container',
						itemId: 'CntPageStd', reference: 'CntPageStd',
						layout: {
							type: 'vbox',
							align:'stretch'
						},
						flex: 1
					},
					{
						xtype: 'container',
						itemId: 'CntPageStdPrev', reference: 'CntPageStdPrev',
						layout: {
							type: 'vbox',
							align:'center',
							pack: 'middle'
						},
						flex: 1,
						html: '<body>' +
								'<div class="ball"></div>'+
								'<div class="ball1"></div>'+
							  '</body>'
					}
				]
				}
			));
			this.lookupReference('Carousel').getItems().items[0].setHidden(true);
			this.lookupReference('Carousel').setActiveItem(this.lookupReference('CntPageStd'));
			
			this.lookupReference('PnlHeader').add(Ext.create('Generali.arch.testataStd.TestataStd', {
				cbaConfig:{
					controllerPageStd: this
				}
			}));
		}else{
			this.lookupReference('PnlCompilatore').setHidden(true);
			this.lookupReference('PnlHeader').add(Ext.create('Ext.Container', {
				layout: {
					type: 'hbox',
					align: Ext.is.Phone ? 'center' : 'stretch',
					pack: Ext.is.Phone ? 'center' : null
				},
				flex: 1,
				items:[
					{
						xtype:'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						width: '50%',
						flex: 1,
						hidden: Ext.is.Phone,
						items:[
							{
								xtype: 'img',
								itemId: 'BtnMenu', reference: 'BtnMenu',
								src: 'resources/images/backMenu.svg',
								margin: '0 10 0 0',
								width: 40,
								height: 40,
								listeners:{
									tap: ()=>{
										let mainLevels =  this.cbaConfig.controllerMainApp.lookupReference('MainLevels');
										let livelloPrec = this.cbaConfig.livelloPrec;
										
										this.getView().destroy();
										mainLevels.getActiveItem().removeAll(true);
										mainLevels.setActiveItem('#' + livelloPrec);
									}
								}
							}
						]
					},
					{
						xtype: 'label',
						width: !Ext.is.Phone ? '50%' : null,
						itemId: 'LabelSchermata', reference: 'LabelSchermata',
						html: this.nomeVideata ? StdCba.traduci(me.nomeVideata) : null,
						cls: 'cbaLabelTitolo'
						
					}
				]
			}));
			this.lookupReference('CntPnlCompilatore').setHidden(true);
			this.lookupReference('PnlBody').add(Ext.create(me.percorsoVideata, {
				cbaConfig:{
					parametro: this.cbaConfig.parametro ? this.cbaConfig.parametro : null,
					controllerPageStd: this
				}
			}));
		}
		Ext.resumeLayouts(true);
	},
	destroy: function(){
		this.cbaConfig.click = 0;
	    this.callParent();
	}

});
