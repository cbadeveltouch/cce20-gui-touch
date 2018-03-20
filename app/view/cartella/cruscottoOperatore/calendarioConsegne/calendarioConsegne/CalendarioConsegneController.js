Ext.define('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegneController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-cruscottooperatore-calendarioconsegne-calendarioconsegne',
    
    showPnlRicerca: function(th, e){
    		this.pnlRicerca.setRight(0);
    		this.pnlRicerca.setTop(0);
    		this.pnlRicerca.show();
    		e.preventDefault();
	},
	
    clickBtnConferma: function(){
		var me = this;
		me.dataDal = me.lookupReference('DataDal').getValue();
		me.dataAl = me.lookupReference('DataAl').getValue();
		me.lookupReference('ContainerDe').removeAll();
		
		me.aggiornaStore(true);
	},
	
	tapBtnLetteTutte: function(){
		var me = this;
		var trovato = false;
		
		
		Ext.Ajax.request({
			method: 'GET',		
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/lette/readAll',
			params:	me.cbaConfig.controller.valFormFiltri,
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);			
				var messaggi= [];
				if (risposta.success){
					var r = risposta.data;
					if(!Ext.isEmpty(r)){
						me.aggiornaStore(null, true);
					}
				}else{
					msgAddError(messaggi,risposta.message);	
				}
			}						
		});
	},
	
	scrollDaFiltro: function(count){
		var me = this;
		var params = {
				   firstResult: me.store.getCount(),
				   maxResults: me.maxResults - count
		};
		
		if(!me.store.cbaConfig.parametri)
			me.store.cbaConfig.parametri = {};
		
		Ext.apply(me.store.cbaConfig.parametri, params);
		me.aggiornaStore(); 
	},
	
	cbaScrollList: function(){
		var me = this;
		var params = {};
		var store = me.store,
			count = store.getCount(),
			maxResults = me.maxResults,
			filterCount = store.data.getSource() ? store.data.getSource().length : null;
		var listaFine;
		
		if(me.consegnaEliminata){
			var totalCount = count/maxResults;
			while(totalCount > 1){
				count = count - maxResults;
				totalCount = count/maxResults;
			}
			
			if(me.maxResults - count != 0){
				me.scrollDaFiltro(count);
				return false;
			}
		}
		
		if(filterCount){//esiste solo se ho filtri sullo store
			listaFine = filterCount / maxResults;
		}else{
			listaFine = count / maxResults;
		}
		
		params = {
		   firstResult: store.getCount(),
		   maxResults: maxResults
		};
		
		if(!store.cbaConfig.parametri)
			store.cbaConfig.parametri = {};
		
		store.cbaConfig.parametri = Ext.apply(store.cbaConfig.parametri, params)
		
		if(listaFine.toString().indexOf('.' || ',') == -1){
			me.scroll = true;
			me.aggiornaStore();
		}
	},
	
	scrollList: function(){
		var me = this;
		//var scroller = me.getView().getScrollable();
		var scroller =me.lookupReference('ContainerConsegne').getScrollable()
		scroller.on('scrollend', function(th){
			if(th.getPosition().y > Math.abs(th.getMaxPosition().y - 150)){ // è per dare una tolleranza					
				me.cbaScrollList();
	       }
		});
		//caso in cui la schermata viene ingrandita e scompare la scrollbar			
		me.getView().on('resize', Ext.Function.createBuffered(function(th , width , height , oldWidth , oldHeight){
			//cosi' evito che si scateni ad esempio sul launch dei portlet che si adattano piu' volte
			//th.getStore().getData().getSource().length cosi' si tiene conto anche dei record filtrati
			
			var st = me.store,
				data = st.getData();
			if (data && data.getSource() && data.getSource() == 0) {
				return false;
			} else if (st.getCount() == 0) {
				return false;
			}
			
			if (height > oldHeight) {//in caso contrario sto rimpicciolendo la grid
				if(scroller.getMaxPosition().y == 0)//verifico che non ci sia la scrollbar
					me.cbaScrollList();
			}
		}, 200, me));
		
		//gestisco il caso in cui i primi record caricati non ricoprano tutta la schermata e quindi non viene visualizzata la scroll
		me.store.on('datachanged', Ext.Function.createBuffered( function(){//evito venga lanciato al caricamento del singolo record
			
			var store = me.store;
			var parametri = ( store.cbaConfig && store.cbaConfig.parametri ) ? store.cbaConfig.parametri : null;
			var limite = parametri && parametri.maxResults ? parametri.maxResults : null;
			if(me.consegnaEliminata){
				if(store.data.length <= limite && scroller.getMaxPosition().y == 0){
					me.cbaScrollList();
				}						
			}
			if(store.data.length >= limite && scroller.getMaxPosition().y == 0){//controllo che non ci sia la scroll
				me.cbaScrollList();
			}
		}, 50, me));
	},
	

	aggiornaStore: function(idRecord, nuovo){
		var me = this;
		let btnFiltro = me.lookupReference('BtnAvanzate'),
			formFiltri = me.pnlRicerca.down('#FormFiltri');
		
		if(!me.scroll){
			StdCba.svuotaStore(me.store);
			if(me.store.cbaConfig.parametri){
				me.store.cbaConfig.parametri ={};
				me.store.cbaConfig.parametri = {
						maxResults: me.maxResults
				};
			}
			me.cbaConfig.controller.count = 0;
			me.lookupReference('ContainerDe').removeAll();
		}
		me.scroll = false;
		var newRecord = StdCba.convertiBool(formFiltri.getValues(), formFiltri.getFields());

		delete newRecord.avanzate;

		me.valFormFiltri = {}; //svuoto
		
		Ext.apply(newRecord, me.defaultConfig);

		//costruisco la data da mandare alla ws
		let oraDal = me.cbaConfig.controllerFiltri.lookupReference('OraDal').getInputValue(),
			oraAl =  me.cbaConfig.controllerFiltri.lookupReference('OraAl').getInputValue();
		Ext.apply(newRecord, {
			dal: StdCba.sommaDataOra(me.cbaConfig.controllerFiltri.lookupReference('DataDal').getValue(), oraDal), 
			al: StdCba.sommaDataOra(me.cbaConfig.controllerFiltri.lookupReference('DataAl').getValue(), oraAl),
		});

		delete newRecord.oraDal;
		delete newRecord.oraAl;
		
		/*GESTIONE FILTRI*/
		if(btnFiltro.cbaConfig.attivo){
			var comboConsegne = formFiltri.down('#CboxTipoConsegna'),
				cboxFigProf = formFiltri.down('#CboxFigProf');
			
			Ext.apply(newRecord, {
				figProfDest: cboxFigProf.cbaConfig.figProfAbilitate,
				consegneDa: comboConsegne.cbaConfig.tipoConsegne,
				mobile: 'T'
			});
		}
		
		if(!me.store.cbaConfig.parametri)
			me.store.cbaConfig.parametri = {};
		
		for (let i in newRecord) {
			if(!newRecord[i]) delete newRecord[i];
		}
		
		Ext.apply(me.store.cbaConfig.parametri, newRecord);
		
		me.valFormFiltri = newRecord;
		
		Ext.Ajax.request({
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/list',
			method : 'GET',
			params : me.store.cbaConfig.parametri,
			success : function(response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var records = risposta.data;
				
				if(!Ext.isEmpty(records)){
					var modelAppo;
					var container = me.lookupReference('ContainerDe');
					me.storeTipoConsegna = Ext.create('CS.consegne.TipoConsegna');
					records.forEach( function(rec) {
						var pnl = Ext.create('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.PanelConsegne',{
							cbaConfig:{
								controller: me.cbaConfig.controller,
								record: rec
							}
						});
						container.add(pnl);
						modelAppo = Ext.create('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.CalendarioConsegneModel', rec);
						me.store.add(modelAppo);
						
						me.consegnaEliminata = null;
						
					});
						
				} else{
					me.lookupReference('ContainerDe').add({
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'hbox',
								align: 'middel',
								pack: 'center'
							},
							flex: 1,
							items : [
								{
									xtype: 'label',
									cls: 'cbaCssLabel',
									html: StdCba.traduci('NESSUN_DATO_PRESENTE')
								}
							]});
				}
				
			}
		});
	},
	
	init: function(){
		var me = this;
		me.callParent(arguments);
		me.scroll = false;
		me.lookupReference('ContainerDe').controller = me;	
		me.cbaConfig.controller = me;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.cbaConfig.controllerTabPanel.cbaConfig.controllerConsegne = me;
		me.store = Ext.create('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.ListaConsegneMobile');
		me.calendarioConsegne = true;
		//paginazione
		
		Ext.is.Phone ? me.maxResults = 4 : me.maxResults = 10;
		me.store.cbaConfig.parametri = {
				maxResults: me.maxResults
		};
		
		StdCba.initRicercaAvanzataMobile(me.lookupReference('Toolbar'), me, true, [Ext.create('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriMain', {cbaConfig: {controllerMain :me.cbaConfig.controller}})], null );
		
		me.scrollList();
		me.cbaConfig.controller.count = 0;
		
	},
	destroy: function(){
		StdCba.eliminaStore(this.store);
	    this.callParent();
	}

});
