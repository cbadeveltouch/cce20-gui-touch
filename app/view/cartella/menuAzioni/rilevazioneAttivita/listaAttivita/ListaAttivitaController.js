Ext.define('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-listaattivita-listaattivita',
    
	selectListAttivita: function(th, record){
		var me = this;
		var	menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels');
	
	 	let titolo = record.get('valore');
		let nomeVideata = titolo.charAt(0).toUpperCase() + titolo.slice(1).toLowerCase();
		
		let somministrazione = Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni',{
									cbaConfig:{
										nomeVideata: nomeVideata,
										percorsoVideata: 'CS.menuAzioni.rilevazioneAttivita.sommAttivitaMain.SommAttivitaMain',
										tipo : this.cbaConfig.tipo,
										controllerMainApp: this.cbaConfig.controllerMainApp,
										record: record
									}
								});
		if(Ext.is.Phone){
			this.cbaConfig.controllerMainApp.lookupReference('Level2').add(somministrazione);
			menuCard.setActiveItem('#Level2');
		}else{
			me = somministrazione.lookupController();
			me.getView().setStyle({'border-left':'3px solid #5fa2dd'});
			this.cbaConfig.controllerMainApp.lookupReference('Level1').insert(2, somministrazione)
		}
			
	},
    
	aggiornaStore: function(){
		
		let store = this.lookupReference('ListAttivita').getStore();
		
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/anagrafica/cbox',
			params : {
				idProfilo: CBA.parametriGenerali.idProfiloCss,
//				firstResult: store.getCount(),
//				maxResults: me.maxResult,
			},
			success: (response) => {
				var risposta = Ext.JSON.decode(response.responseText);
				var records = risposta.data;
				if(risposta.success){
					if(!Ext.isEmpty(records)){	

						Ext.each(records, function(rec) {
							modelAppo = Ext.create('CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivitaModel', rec);
							store.add(modelAppo);
						});
						
						let scroller = this.lookupReference('ListAttivita').getScrollable();
						if(this.posy)//per riposizionare la scroll dove era
							scroller.scrollTo(0, this.posy);
						
						if(store.data.length >= this.maxResult && scroller.getMaxPosition().y == 0){//controllo che non ci sia la scroll
							this.aggiornaStore();
						}
					}
				}
			}
		});
	},
    
	init: function(){
		this.callParent(arguments);
		this.maxResult = 15;
		this.aggiornaStore();
		
		Ext.is.Tablet ? this.cbaConfig.controllerPageStd.getView().setMaxWidth('40%') : null;
		
		var scroller = this.lookupReference('ListAttivita').getScrollable();
		scroller.on('scrollend', (th) =>{
			if(th.getPosition().y > Math.abs(th.getMaxPosition().y - 20)){ // è per dare una tolleranza	
				this.posy = th.getPosition().y; //bug lista
				this.aggiornaStore();
           }
		});
		
		this.lookupReference('CntFiltro').add(Ext.create('CS.menuAzioni.rilevazioneAttivita.filtroAttivita.FiltroAttivita',{
			cbaConfig:{
				controllerListAttivita: this
			}
		}));
		
		let header = this.cbaConfig.controllerPageStd.lookupReference('PnlHeader');
		
		let slider = Ext.create('Ext.field.Slider', {
						itemId:'FiltroSomm', reference:'FiltroSomm',
						width: 100,
						labelWidth: 50,
						labelWrap: true,
						increment: 1,
						minValue: 0,
						maxValue: 1,
						label: StdCba.traduci('SOLO_PROGR'),
						labelAlign: 'left',
						isFormField: false,
						margin: '0 10 0 0',
//						listeners:{
//							change: 'changeFiltroSomm'
//						}
						
					});
		
		let filtro = Ext.create('Ext.Img', {
							src: 'resources/images/btnFunzione/filter.svg',
							height: 30,
							width: 30,
							margin: '0 10 0 10',
							listeners:{
								tap: (th) =>{
									this.lookupReference('CntFiltro').setHidden(!this.lookupReference('CntFiltro').getHidden());
								}
							}
						});
		header.insert(2, slider);
		header.insert(3, filtro);
	},

	destroy: function(){
	    this.callParent();
	}

});
