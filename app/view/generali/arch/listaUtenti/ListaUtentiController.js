Ext.define('Generali.arch.listaUtenti.ListaUtentiController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.listautenti.listautenti',
    
    changeCboxReparto: function(combo, newValue, oldValue){		
		let sede= this.lookupReference('Sede');
		
		this.idReparto= newValue;
		
		//cerco solo se ho avvalorata la sede, altrimente il cerca viene scatenato due volte
		if(sede.getValue())
			this.aggiornaStore();
	},
	
	changeCboxSede: function(combo, newValue, oldValue){
		let reparto= this.lookupReference('Reparto');
		
		this.idSede= newValue;
				
		StdCba.svuotaSelect(reparto);
        
        if (combo._value > 0){
        	reparto.getStore().getProxy().extraParams = {
                sede: combo._value
            };
        	
        	reparto.getStore().load({
				callback:(records,operation,success)=>{
				}
			});
        }
        
		if(!Ext.isEmpty(combo.getSelection())){			
			Ext.apply(combo.cbaConfig, {
				valore: newValue,
				descrizione: combo.getSelection().data.valore,
				name: 'sede',
				combo: true
			});
		}
		
		this.aggiornaStore();
	},
    
	selectListUtenti: function(th, record){
		var me = this;
		
		if ( this.cbaConfig.callbackExtraCerca ) //usato in somministrazione terapie
			this.cbaConfig.callbackExtraCerca( record );
		
		let controllerMainApp = me.cbaConfig.controllerMainApp,
			main = controllerMainApp.lookupReference('MainLevels'),
			levelActive = main.getActiveItem(),
			labelOspite = levelActive.down('#LabelOspite'),//TODO_PLS LIVELLO
			btnInfo = levelActive.down('#BtnInfo'),
			form = levelActive.down('#Form'),
			testata = levelActive.down('#CntRegistrazioni');	
		
		CBA.moduli.modulo49.storeAnagraficaSel.load({
			params: {
				id: record.get('codOspite'),
				idRicovero: record.get('idRicovero')
			},
			callback: (records, operation, success) => {
				if(success){
					var record = records[0];
					var recStore = StdCba.trovaRecord( me.lookupReference('ListUtenti').getStore(), 'codOspite', record.get('codOspite'));
					
					var fields = [],
						x;
					for ( x in recStore.data ){
						fields.push(x);
					}
					Ext.each( fields, (f) => {
						if( recStore.get(f) && record.get(f))
							recStore.set( f, record.get(f));
					});
					//TODO_PLS idRicovero su menuAzioni parametri che è senza testata?
					if(form){
						form.controller.aggiornamentoTestata = true;
						if(testata){//se c'è la testata modifico l'anagrafica corrente
							testata.controller.anagraficaCorrente = form.controller.cbaConfig.anagraficaCorrente = CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data;
							form.controller.idRicovero =  testata.controller.anagraficaCorrente.idRicovero;
							/*blocco dirtyChange*/
							form.dirty_original = null;
						}else{
							form.controller.cbaConfig.anagraficaCorrente = CBA.moduli.modulo49.storeAnagraficaSel.getAt(0);
							form.controller.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).get('idRicovero');
						}
						if(form.controller.aggiornaStore)
							form.controller.aggiornaStore()
						
					}
					
					if(labelOspite)
						labelOspite.setHtml(record.get('nominativo'));
					
					if(btnInfo && !Ext.isEmpty(record))
						btnInfo.setHidden(false);
					
					if(Ext.isDefined(me.cbaConfig.controllerPanelFloat))
						me.cbaConfig.controllerPanelFloat.lookupReference('Panel').close()
					else if(form)//caso azioni parametri
						StdCba.clearForm(form)
				}
			}
		});
		
	},
	
	changeRicercaUtente: Ext.Function.createBuffered(function(th, newValue){
		
		this.lookupReference('ListUtenti').getStore().removeAll();
		this.aggiornaStore();
	}, 200),
	
	aggiornaStore: function(){
		var me = this;
		
		var store = me.lookupReference('ListUtenti').getStore();

		if(!store.cbaConfig.parametri)
			store.cbaConfig.parametri = {};
		
		
		var params = {
			idProfilo: CBA.parametriGenerali.idProfiloCss,
			nome: me.lookupReference('Cognome').getValue(), 
//			contiene: getBoolValue(!me.getNomeContiene().getValue()),
			maxResults: me.maxResult,
		};
		//caso di somministrazione terapie
		// aggiungo i parametri passati nell'oggetto myParams
		let gestioneMsgUtenteNonTrovato= true;
		
		if(me.cbaConfig.myParams) {
			Ext.apply(params, me.cbaConfig.myParams); 
			parametri= me.cbaConfig.myParams; //riutilizzo il campo idAna per il posizionamento nella grid
			gestioneMsgUtenteNonTrovato= false;
		}
		
		Ext.apply(store.cbaConfig.parametri, params);
		
		let myUrl;
		
		Ext.isDefined(this.cbaConfig.myUrl) ? myUrl = this.cbaConfig.myUrl :	myUrl = `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/listMobile';
		
		Ext.Ajax.request({
			method: 'GET',
			url: myUrl,
			params : store.cbaConfig.parametri,
			success: (response)  => {
				var risposta = Ext.JSON.decode(response.responseText);
				var records = risposta.data;
				if(risposta.success){
					if(!Ext.isEmpty(records)){	

						Ext.each(records, (rec) => {
							modelAppo = Ext.create('Generali.arch.listaUtenti.ListaUtentiModel', rec);
							store.add(modelAppo);
						});
						
						var scroller = me.lookupReference('ListUtenti').getScrollable();
						if(me.posy)//per riposizionare la scroll dove era
							scroller.scrollTo(0, me.posy);
						
						if(store.data.length >= me.maxResult && scroller.getMaxPosition().y == 0){//controllo che non ci sia la scroll
							me.aggiornaStore();
						}
					}
				}
			}
		});
	},
	
	cbaScrollList: function(){
		var me = this;
		var params = {};
		var store = me.lookupReference('ListUtenti').getStore(),
			count = store.getCount(),
			filterCount = store.data.getSource() ? store.data.getSource().length : null;
		var parametri = ( store.cbaConfig && store.cbaConfig.parametri ) ? store.cbaConfig.parametri : null;
		var maxResults = parametri && parametri.maxResults ? parametri.maxResults : me.cbaConfig.paged.maxResults;
//		var descrizione = me.cbaConfig.paged.descrizione || null; 
		var listaFine;
		if(filterCount){//esiste solo se ho filtri sullo store
			listaFine = filterCount / maxResults;
		}else{
			listaFine = count / maxResults;
		}
		
		if(me.cbaLocalFilter){
			//Trovo il numero di record mancanti (count) per arrivare al maxResults preimpostato, in seguito alla rimozione dei record tramite filtro
			var totalCount = count/maxResults;
			while(totalCount > 1){
				count = count - maxResults; 
				totalCount = count/maxResults;
			}
			
			if(maxResults - count != 0){
				//Riporto la lista alla situazione iniziale, prima di rimuovere i record. Quindi carico record per arrivare a 
				//maxResults per poi riprendere la funzione normalmente al caricamento successivo.
				me.scrollDaFiltro(maxResults, count);
				return false;
			}
		}
		
		var params = {
		   firstResult: store.getCount(),
//		   descrizione: descrizione,
		   maxResults: maxResults
		};
		
		if(!store.cbaConfig.parametri)
			store.cbaConfig.parametri = {};
		
		Ext.apply(store.cbaConfig.parametri, params);
		
		if(listaFine.toString().indexOf('.' || ',') == -1){
			me.aggiornaStore();
		}
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		me.maxResult = 15;
		
		if(this.cbaConfig.controllerPanelFloat)
			Ext.apply(this.cbaConfig, this.cbaConfig.controllerPanelFloat.cbaConfig)
			 
			
		if(!this.cbaConfig.terapie)
			this.aggiornaStore();
		
		this.lookupReference('PanelUtenti').controller = this;
		
		Ext.isDefined(this.cbaConfig.controllerPanelFloat) ? this.cbaConfig.controllerPanelFloat.cbaConfig.controllerList = this : null; 
		
		var scroller = me.lookupReference('ListUtenti').getScrollable();
		scroller.on('scrollend', (th) =>{
			if(th.getPosition().y > Math.abs(th.getMaxPosition().y - 20)){ // è per dare una tolleranza	
				me.posy = th.getPosition().y; //bug lista
				me.cbaScrollList();
           }
		});
		
		Ext.apply(CBA.moduli.modulo49, {
			storeAnagraficaSel: Ext.create('CbaCssView.store.AnagraficaUtSelezionato')
		});
		
		this.lookupReference('Sede').getStore().load({
			params:{},
			callback: (records,operation,success)=>{
                if(success){
                    if(records.length == 1){
                    	this.lookupReference('Sede').setValue(records[0]);
                    	this.lookupReference('Sede').setDisabled(true);
                    } else {
                    	this.lookupReference('Sede').setDisabled(false);
                    }
                }else{
                    StdCba.msgShowError('',operation.getError());  
                }
            }
		});
	},

	destroy: function(){
	    this.callParent();
	}

});
