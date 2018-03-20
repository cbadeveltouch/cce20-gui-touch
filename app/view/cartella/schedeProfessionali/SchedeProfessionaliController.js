Ext.define('CS.schedeProfessionali.SchedeProfessionaliController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schedeprofessionali-schedeprofessionali',
    
	buttonsEditMode: function(edit) {
		this.getBtnConferma().setDisabled(!edit);
		this.getBtnAnnulla().setDisabled(!edit);
		this.getBtnEdit().setDisabled(edit);
		this.getBtnEsci().setDisabled(edit);
		IsolaCmp(this.getNomeScheda().up().up().up(), edit);
	},
	
	buttonsEmptyMode: function() {
		this.getBtnConferma().setDisabled(true);
		this.getBtnAnnulla().setDisabled(true);
		this.getBtnEdit().setDisabled(true);
		this.getBtnEsci().setDisabled(false);
		IsolaCmp(this.getNomeScheda().up().up().up(), false);
	},
	
	clickBtnEdit: function(th) {
		
		let lista = [];
		Ext.each(this.records, i => {
			let tipoAutomatismo = i.get('impostazSkProf').tipoAutomatismo;
			if(tipoAutomatismo === 2 || tipoAutomatismo === 4 || tipoAutomatismo === 5) {
				let	obj = {
					id: i.get('id'),
					idImpostaz: i.get('idImpostaz'),
					compilatore: CBA.moduli.modulo49.operatore.id,
					idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
					data: new Date(),
					valore: i.get('valore'),
					note: i.get('note'),
					dettaglio: i.get('dettaglio'),
					variazione: null,
					idTestata: null
				};
				lista.push(obj);
			}
		});
		
		Ext.Ajax.request({
			method: 'POST',
			url: '/cba/css/cs/ws/schedaprofessionale/updateAutomatismi',
			jsonData: Ext.JSON.encode(lista),
			success: (response) => {
				let	risposta = Ext.JSON.decode(response.responseText),
					messaggi = [];
				if (risposta.success) {
					this.aggiornaStore(true);
				} else { 
					msgShowError('',risposta.message); 
				}
			}
		});
		
	},
	
	clickBtnAnnulla: function(th) {
		this.aggiornaStore();
	},
	
	saveArgomenti: function(i) {
		let id = i.query('#Id')[0].getValue(),
			idImpostaz = i.query('#IdImpostaz')[0].getValue(),
			valoreOld = i.query('#Valore')[0].getValue(),
			siNo = i.query('[siNo]')[0] ? i.query('[siNo]')[0].getValueExclusive() : null,
			autonomo = i.query('[autonomo]')[0] ? i.query('[autonomo]')[0].getValueExclusive() : null,
			doveMangia = i.query('[doveMangia]')[0] ? i.query('[doveMangia]')[0] : null,
			pannolone = i.query('[pannolone]')[0] ? i.query('[pannolone]')[0] : null,
			note = i.query('[note]')[0] ? i.query('[note]')[0].getValue() : null,
			dettaglio = i.query('[dettaglio]')[0] ? i.query('[dettaglio]')[0].config.html : null,
			valore = null;
			
		if(autonomo) { // caso AUT/NON AUT/PARZ AUT
			valore = autonomo;
		} else if(doveMangia) { // caso DOVE MANGIA
			dettaglio = i.query('#Colazione')[0].getValue() + ';' + i.query('#Pranzo')[0].getValue() + ';' + i.query('#Cena')[0].getValue();
		} else if(pannolone) { // caso PANNOLONE
			valore = siNo;
			dettaglio = i.query('#ColorSet')[0].getValue() + ';' + i.query('#MisuraPannolone')[0].getValue();
		} else if(siNo) { // caso SI/NO
			valore = siNo;
		} else {
			valore = valoreOld;
		}
		
		let	obj = {
			id: id,
			idImpostaz: idImpostaz,
			compilatore: CBA.moduli.modulo49.operatore.id,
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			data: new Date(),
			valore: valore,
			note: note,
			dettaglio: dettaglio,
			variazione: null,
			idTestata: null
		};
		this.listaFinale.push(obj);
		
	},
	
	/*
	 * Salva i dati e crea/aggiorna la scheda professionale
	 */
	
	clickBtnConferma: function(th) {
		this.listaFinale = [];
		let argomenti = this.getCntAree().query('[argomento]');
		
		Ext.each(argomenti, i => {
			if(this.nuovaScheda) {
				this.saveArgomenti(i);
			} else {
				let tipoAutomatismo =  i.query('#TipoAutomatismo')[0].getValue();
				if(i.query('#CampoDirty')[0].value === 1 || tipoAutomatismo === 1 || tipoAutomatismo === 2 || tipoAutomatismo === 4 || tipoAutomatismo === 5) {
					this.saveArgomenti(i);
				}
			}
		});
		
		Ext.Ajax.request({
			method: 'POST',
			url: '/cba/css/cs/ws/schedaprofessionale/update',
			jsonData: Ext.JSON.encode(this.listaFinale),
			success: (response) => {
				let	risposta = Ext.JSON.decode(response.responseText),
					messaggi = [];
				if (risposta.success) {
					this.aggiornaStore();
				} else { 
					msgShowError('',risposta.message); 
				}
			}
		});
	},
	
	clickBtnEsci: function(th) {
		th.up('window').close();
	},
	
	aggiornaStore: function(edit) {
		let storeEdit = Ext.create('CS.personalizzazioni.personSchedeProf.personalizzazioni.store.DomandeSkProf');
		storeEdit.load({
			params: {
				codArea: 45,
				idProfilo: this.idProfilo
			},
			callback: (records,operation,success) => {
				if(success) {
					if(!Ext.isEmpty(records)) {
						Ext.each(records, rec => {
							if(rec.get('descTipologia') === this.desVideata) {
								this.idScheda = rec.get('id');
								this.codDomanda = rec.get('codDomanda');
								// controllo se ho già creato la scheda e visualizzo i dati. in caso contario vado in edit mode
								this.store = Ext.create('CS.schedeProfessionali.store.SchedeProfessionali');
								this.store.load({
									params: {
										idScheda: this.idScheda,
										idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero
									},
									callback: (records,operation,success) => {
										if(success) {
											if(!Ext.isEmpty(records)) {
												this.records = records;
												this.buttonsEditMode(edit);
												this.creazioneAree(records, edit);
											} else {
												this.creazioneAree();
											}
										} else {
											msgShowError('',operation.getError());	
										}
									}
								});
							}
						})
					}
				} else {
					msgShowError('',operation.getError());	
				}				
			}
		});
	},
	
	/*
	 * Funzione che crea le aree passando la scheda professionale di appartenenza
	 */
	creazioneAree: function (recordScheda, edit) {
		let store = Ext.create('CS.personalizzazioni.risposte.store.RisposteDe');
		store.load({
			params:{
				codArea: 45,
				idProfilo: this.idProfilo,
				codDomanda: this.codDomanda
			},
			callback: (records,operation,success) => {
				if(success) {
					this.init = true;
					Ext.suspendLayouts();
					this.getCntAree().removeAll();

					if(!Ext.isEmpty(records)) {
						Ext.each(records, (i) => {
							if(i.get('abilitata') === 'T') {
								this.getCntAree().add(Ext.create('CS.schedeProfessionali.view.Area',{
									cbaConfig: {
										controllerScheda: this,
										idProfilo: this.idProfilo,
										idScheda: this.idScheda,
										idArea: i.get('id'),
										nomeArea: i.get('descrizione'),
										codDomanda: i.get('codDomanda'),
										record: recordScheda,
										edit: edit===true ? true : false
									}
								}));
							}
						});
					} else { // se non sono presenti aree visualizzo un messaggio
						this.buttonsEmptyMode();
						this.getCntAree().add(Ext.create('Ext.container.Container',{
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							flex: 1,
							margin: '15 0 0 10',
							items: [
								{
									xtype: 'label',
									text: traduci('NO_SCHEDA_PROF'),
									cls:'cbaCssLabel'
								}
							]
						}));
					}
					Ext.resumeLayouts(true);
					
					this.init = false;
					
				} else {
					msgShowError('',operation.getError());	
				}				
			}
		});
	},
	
	init: function() {
		this.callParent(arguments);
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		
		let idVideata = this.cbaConfig.idVideata;
		Ext.each(this.cbaConfig.controllerTestata.cbaConfig.elencoVideate, i => {
			if(i.idVideata===idVideata) this.desVideata = i.desVideata;
		});
		this.getNomeScheda().setHtml('<strong>'+this.desVideata+'</strong>');
		
		this.aggiornaStore();
	},
	
	destroy: function() {
		this.callParent();
	}
});
