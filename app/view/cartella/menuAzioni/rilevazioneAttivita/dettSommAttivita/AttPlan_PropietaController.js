Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_ProprietaController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-dettsommattivita-attplan_proprieta',
    
    genId: function(controller) {
		Ext.applyIf(controller.cbaConfig, {
			genId: -9999
		});
		
		return controller.cbaConfig.genId++;
	},
	
	itemTapListaProprieta: function( th, record, item, index, e ) {
		let selected = record.get('selected')
		record.set('selected', !selected)
		
		this.dirtyFormMain(this.verifyChanges(this.lookupReference('ListaProprieta').getStore()))
	},
	
	dirtyFormMain: function(dirty) {
		this.lookupReference('CampoDirty').setValue(dirty ? 'dirty' : null)
	},
	
	verifyChanges: function(store) {
		let dirty = false
		
		/**
		 * controllo di modifiche su records (update su id validi)
		 */
		if(Ext.isEmpty(this.keepOriginals)){
			this.keepOriginals = [];
			var records = this.lookupReference('ListaOperatori').getStore().getData().items;
			if(!Ext.isEmpty(records)) {
				records.forEach(figProf =>{
					this.keepOriginals.push(Ext.clone(figProf.data));
				})
			}
		}
		this.keepOriginals.forEach( i => {
			let recReal = Ext.clone(StdCba.trovaRecord( store, 'codProprieta', i.codProprieta ).data),
				realSelected = !Ext.isDefined(recReal.checked) ? false : recReal.checked,
				origSelected = !Ext.isDefined(i.checked) ? false : i.checked
			
			if ( origSelected !== realSelected ) {
				dirty = true
			}
		})
		
		return dirty
	},
	
	/**
	 * restituisce lista di codProprieta in base al @params: idFascia
	 * saranno restituiti solo i codProprieta delle proprieta' flaggate.
	 * se parametro idFascia e' assente vuol dire che e' un'attivita non legata ad orario
	 * noOrario, e quindi la lista delle proprieta' non andrà filtrata ma si prendono TUTTE
	 * quelle flaggate.
	 */
	getDataForSave: function(idFascia) {
		this.store.clearFilter()
		if (idFascia) {
			this.store.filterBy( rec => rec.get('idFascia') === idFascia)
		}
		
		let arr = []
		this.store.each( rec => {
			if (rec.get('selected')) {
				arr.push(rec.get('codProprieta'))
			}
		})
		
		this.store.clearFilter()
		return arr
	},
	
	/**
	 * questa funzione viene lanciata ogni qualvolta ci siano dei cambiamenti nella
	 * lista delle fasce orarie, in quel caso la griglia delle proprieta' si deve ricalcolare
	 * in base alle fasce in lista.
	 * N.B. prima di svuotare lo store proprieta' si tengono da parte gli eventuali record
	 * presenti, serviranno una volta ricalcolati in base alla fasce, a popolare con le
	 * proprieta' eventuali compilate in precedenza.
	 */
	recalcFasce: function(fasce, keepOriginals) {
		/**
		 * prendo da parte i records contenuti nello store proprieta', per poi successivamente
		 * ripristinare le proprieta' compilate (questo accade quando si modifica una fascia
		 * oraria, quindi non nel caso di eliminazione e creazione)
		 */
		let proprietaAppo = []
		this.store.each( rec => {
			proprietaAppo.push({
				idFascia: rec.get('idFascia'),
				codProprieta: rec.get('codProprieta'),
				selected: rec.get('selected')
			})
		})
		
		Ext.suspendLayouts()
		StdCba.svuotaStore(this.store)
		let ordine = 0
		fasce.forEach( rec => {
			ordine++
			//scorre le proprietà e per ognuna si genera il record della fascia
			proprietaAttivita.forEach( proprieta => {
				this.store.insert( 0, {
					id: this.genId(this),
					idFascia: parseInt(rec.get('id')),
					inizio: rec.get('inizio'),
					fine: rec.get('fine'),
					selected: proprieta.pianDefault === 'T',
					descrizione: proprieta.descrizione,
					codProprieta: parseInt(proprieta.codProprieta),
					ordine: ordine
				})
			})
		})
		
		//riavvaloro le proprieta' in base ai records tenuti da parte in precedenza
		this.store.clearFilter()
		proprietaAppo.forEach( i => {
			this.store.filterBy( rec => (rec.get('idFascia') === i.idFascia) &&
					(rec.get('codProprieta') === i.codProprieta) )
			if (this.store.getCount() > 0) {
				this.store.getData().items[0].set('selected', i.selected)
			}
			this.store.clearFilter()
		})
		
		/**
		 * nel caso in cui la videata sia in editMode
		 * (quindi abbiamo solo una fascia (compresa la fascia fake "noOrario"))
		 * si ordina lo store delle proprietà in base al selezionato
		 */
		if (this.cbaConfig.controllerUlteriori.cbaConfig.controllerMain.editModeTe) {
			this.getListaProprieta().getStore().sort('selected', 'DESC')
		}
		
		Ext.resumeLayouts()
	},
	
	init: function(){
		this.callParent(arguments);
		this.store = this.lookupReference('ListaProprieta').getStore()
		this.cbaConfig.controllerUlteriori.cbaConfig.controllerProprieta = this;
		
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		this.cbaConfig.permesso = 'S';	
		
//		this.recalcFasce(null, true)
	},
	
	destroy: function() {
		StdCba.eliminaStore(this.store)
        this.callParent();
    }

});
