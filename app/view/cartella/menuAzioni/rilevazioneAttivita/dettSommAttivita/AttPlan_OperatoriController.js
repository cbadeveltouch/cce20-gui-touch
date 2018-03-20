Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_OperatoriController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-dettsommattivita-attplan_operatori',
    
    
    changeTxtRicerca: Ext.Function.createBuffered(function(th, newValue){
		var me = this;
		me.filterStore(newValue);
	}, 200),
	
	childTapFigProf: function( th, position, item, index, e ) {
    	let record = position.cell._record,
			selected = record.get('checked')
		record.set('checked', !selected)
		
		this.dirtyFormMain(this.verifyChanges(this.lookupReference('ListaOperatori').getStore()))
	},
	
	filterStore: function(value) {
		var me = this,
			store = me.lookupReference('ListaOperatori').getStore(),
			searchString = value.toLowerCase();

		const filterFn = (node) => {		
			let children = node.childNodes,
				visible = node.get('text').toLowerCase().includes(searchString);
			
			if (!visible) {
				children.map((child) => {
						visible = child.get('visible');
					if (visible) {
						return;
					}
				});		
			} else { 
				children.map((child) => {
					child.set('visible', true);
				});
			}
			Ext.resumeLayouts(true);
			return visible;
		}
		store.clearFilter();
		if (Ext.isEmpty(searchString)) {
//			me.inizializzaNodiChecked()
		} else {
			store.setFilters(filterFn);
		}
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
			let recReal = Ext.clone(StdCba.trovaRecord( store, 'id', i.id ).data),
				realSelected = !Ext.isDefined(recReal.checked) ? false : recReal.checked,
				origSelected = !Ext.isDefined(i.checked) ? false : i.checked
			
			if ( origSelected !== realSelected ) {
				dirty = true
			}
		})
		
		return dirty
	},
	
	caricaFigProf: function(idConsegna){
		var me = this;
		var params = {};
		Ext.suspendLayouts();
	
		params.id = this.cbaConfig.controllerDett.cbaConfig.recordAttivita.get('codice')
		
		me.lookupReference('ListaOperatori').getStore().load({
			params: params,
			callback: ( records, operation, success ) => {
				/**
				 * (1 KEEPORIGINALS)
				 * se si proviene dal caricamento di una pianificazione in edit
				 * si mettono da parte i records originali per utilizzarli nel 
				 * confronto utile a captare il dirtyForm
				 */
				this.keepOriginals = []
				
				if(success) {
					if(!Ext.isEmpty(records)) {
						records.forEach(figProf =>{
							this.keepOriginals.push(Ext.clone(figProf.data))
						})
						
					}
				}else {
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
		Ext.resumeLayouts(true);
	},
	
	getDataForSave: function() {
		let str = ''
		this.store.each( rec => {
			if (rec.get('selected')) {
				str += rec.get('codice') + ';'
			}
		})
		return Ext.isEmpty(str) ? null : str
	},
	
	init: function(){
		this.callParent();
		this.store = this.lookupReference('ListaOperatori').getStore()
//		this.cbaConfig.controllerUlteriori.cbaConfig.controllerMain.cbaConfig.controllerOperatori = this;
		
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		this.cbaConfig.permesso = 'S';	
		
		//carico le figure professionali  se nuova consegna
		this.caricaFigProf();
	},
	
	destroy: function() {
		StdCba.eliminaStore(this.store)
        this.callParent();
    }

});
