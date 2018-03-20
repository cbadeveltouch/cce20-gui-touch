Ext.define('CS.consegne.ConsegneController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-consegne-consegne',
    
    tapIconaCollapse: function(th){
    	th.apriPanel = !th.apriPanel;
    	th.setSrc('resources/images/generali/'+ (th.apriPanel == true ? 'portlet-collapse.svg' : 'portlet-expand.svg'));
    	
    	let containerMain = this.lookupReference(th.cbaConfig.cntMain);
    	if(!th.apriPanel){
    		th.cbaConfig === 'CntMainInoltra' ? containerMain.setHeight(null) : containerMain.setFlex(null);
    		this.lookupReference(th.cbaConfig.cnt).hide();
    	}else{
    		th.cbaConfig.cntMain === 'CntMainInoltra' ? containerMain.setHeight('80%') :containerMain.setFlex(1);
    		this.lookupReference(th.cbaConfig.cnt).show();
    	}
    },
    
    apriChiudiPanel: function(cntName, apri){
    	
    	let cnt= this.lookupReference('Cnt' + `${cntName}`),
    		cntMain = this.lookupReference('CntMain'+ `${cntName}`),
    		icona = this.lookupReference('CntIcona'+ `${cntName}`);
    	icona.apriPanel = apri;
    	apri ? cnt.show() : cnt.hide();
    	apri ? cntMain.setFlex(1) : cnt.setFlex(null);
    	icona.setSrc('resources/images/generali/'+ (apri ? 'portlet-collapse.svg' : 'portlet-expand.svg'));
    },
    
    showOpzioni: function(){
    	this.apriChiudiPanel('Inoltra', false);
    },
    
    FieldsetInoltraCollapse:function(th){
    	this.lookupReference('CntMainInoltra').setHeight(null);
    	this.apriChiudiPanel('Testo', true);
    },
    
    FieldsetInoltraExpand: function(th){
    	this.lookupReference('GridFigProf').getHeaderContainer().setHidden(true);
    	
    	this.apriChiudiPanel('Testo',false);
    	this.apriChiudiPanel('Opzioni', false);
    },
    
    childTapFigProf: function( th, position, item, index, e ) {
    	if(this.consegnaLetta || this.recordConsegna.isRegAnnullata)
    		return false;
    	
    	let record = position.cell._record,
			selected = record.get('checked')
		record.set('checked', !selected)
		
		this.dirtyFormMain(this.verifyChanges(this.lookupReference('GridFigProf').getStore()))
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
			var records = this.lookupReference('GridFigProf').getStore().getData().items;
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

	//TODO_PLS data e ora??

//
//	controllaDataOra: function(th) {
//		var me = this;
//		var oraReg = th.up('container').down('timefield');
//		var dataReg = th.up('container').down('datefield');										
//		if(!dataReg.getValue() && oraReg.getValue())
//			dataReg.setValue(new Date());
//		var passato = false;
//		var id = me.lookupReference('Form').getFields().id;
//		var data = dataReg.getValue();
//		var dataAttuale =  me.cbaConfig.dataOraConsegna;
//	
//		if (data && oraReg.getValue()) {
//			if (dmyIsEqual(data)){
//				if (oraReg.getValue().getHours() < dataAttuale.getHours()){
//					passato = true;
//				}else if (oraReg.getValue().getHours() == dataAttuale.getHours() && 
//					oraReg.getValue().getMinutes() < dataAttuale.getMinutes()){
//						passato = true;
//				}
//			}
//			
//			if (passato)
//				StdCba.Messaggio('ATTENZIONE', 'CS_DATA_FUTURO', 'OK', 'WARNING', function(){
//					oraReg.setValue(dataAttuale);
//				});
//		}
//	},
//
//	afterrenderPnlCompilatore: function(th) {
//		var me = this;
//		var id= me.getForm().getForm().findField('id');
//		//setto valore minimo sull' eqpand del datefield 
//	
//		th.down('datefield').on('expand', function(th) {
//			var dataOraConsegna = Ext.clone( me.cbaConfig.dataOraConsegna ); 			// uso il clone perchè il setMinValue mi resetta le ore 
//			th.setMinValue(!me.consegnaLetta ? new Date() : dataOraConsegna);
//		});
//
//		th.down('datefield').on('blur', function(th) {
//			me.controllaDataOra(th);
//		});
//		th.down('timefield').on('blur', function(th) {	
//			me.controllaDataOra(th);
//		});
//	},

	/*data ora*/
	
	
	filterStore: function(value) {
		var me = this,
			store = me.lookupReference('GridFigProf').getStore(),
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

	changeTxtRicerca: Ext.Function.createBuffered(function(th, newValue){
		
		if(th.isDestroyed)
			return false;
		this.filterStore(newValue);
	}, 200),
	
	gestisciSelezionaTutto: function(th, newValue){
		let grid = th.up('#CntInoltra').down('#GridFigProf');
		
		grid.getStore().getData().items.forEach(function(record){
			record.set('checked', newValue);
		});
		
		this.dirtyFormMain(this.verifyChanges(this.lookupReference('GridFigProf').getStore()))
	},

	changeSelTutto: function(th, newValue) {
		var me = this;
		me.gestisciSelezionaTutto(th, newValue);
	},
	
	gestionePulsanti: function(){
		var me = this;
		let form = this.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnMore = form.createFabs.btnMore,
			btnRipristina = form.createFabs.btnRipristina,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnNuovo.setHidden(true);
		btnMore.setHidden(true);
		
		btnConferma.on('tap', function(){
		});
		
		btnRipristina.on('tap', function(tap){
			me.gestisciSelezionaTutto(me.lookupReference('SelTutto'), false);
			let btn = form.createFabs.btnDelete;
			if (btn && btn.cbaConfig.modAnnulla) {
				btn.setHidden(false);
				me.lookupReference('CntBoxInfoConsegna').setHidden(false);
				me.annullaConsegna = false; 
				btn.cbaConfig.modAnnulla = false;
				form.createFabs.btnConferma.setHidden(true);
				form.createFabs.btnAnnulla.setHidden(true);
				this.cbaConfig.controllerPageStd.lookupReference('LabelSchermata').setHtml(StdCba.traduci('CS_GESTISCI_CONSEGNA'));
				this.mostraNascondiDataInsert(false);
			}
			
			if (!me.nuovaConsegna){
				me.aggiornaStore();
			}else {
				StdCba.clearForm(form);
				form.setRecord_cba();
				me.lookupReference('TestoConsegna').cbaConfig.extraTesto = '';
				me.lookupReference('TestoConfermato').setHtml('');
				me.lookupReference('TestoConsegna').setHtml('');
				me.lookupReference('TestoConfermato').setHidden(true);
				me.lookupReference('TestoConsegna').setHidden(false);
				StdCba.setStatoConsegna(false, me.lookupReference('LblStatoConsegna'));
				me.lookupReference('PnlCompilatore').setLabelCompilatore('');
			}
		});
		//TODO_PLS trovare soluzione per elimina
		
		if(!this.nuovaConsegna){
			Ext.create('CbaCssTouch.resources.ButtonFloating',{
				itemId: 'BtnDelete', reference: 'BtnDelete',
				bottom: 50,
				right: 20,
				height: 50,
				width: 50,
				menuButtonDefault: {
					icon: 'resources/images/buttonFloating/x.svg',
				},
				hidden: !form.permesso && this.nuovaConsegna
			});
			
			let btnElimina = form.createFabs.btnEliminaConsegna = Ext.Viewport.down('#BtnDelete');
			btnElimina.setCls('cbaButtonElimina');
			if (!me.consegnaLetta) {
				btnElimina.on('tap', (th)=>{
					var id= form.getFields().id.getValue();

					//controllo che ci sia l'id compilato
					if(!Ext.isEmpty(id)){
						//se la consegna non è letta è possibile eliminare fisicamente il dato dal db
						ControllerStd.eliminaRecord(form.store,{
							id: id
							},function(){
								if(me.cbaConfig.controllerStatoConsegne) {
									me.cbaConfig.controllerStatoConsegne.aggiornaDati();
								} else {
									me.controllerForm.aggiornaStore();
								}
								me.cbaConfig.controllerPageStd.lookupReference('BtnBack').fireEvent('tap');
						});
												
					}else	
						StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
				});
			}else { //annulla e sostituisci
				btnElimina.on('tap', (th)=>{
					StdCba.Messaggio('ATTENZIONE', StdCba.traduci('CS_ANNULLA_SOSTITUISCI'), 'YESNO', 'QUESTION', false,
							function () {
								me.lookupReference('CntBoxInfoConsegna').setHidden(true);
								th.cbaConfig.modAnnulla = true;
								me.annullaConsegna = true;
								
								th.setHidden(true);
								//pulisco label stato consegna 
								StdCba.setStatoConsegna(false, me.lookupReference('LblStatoConsegna'));
								me.setAnnullamentoConsegna();
							}
						);
					
				});
			}
			
			form.createFabs.btnEliminaConsegna.setHidden(me.recordConsegna.isRegAnnullata || me.cbaConfig.fromCalendarioConsegne || me.consegnaLetta || me.nuovaConsegna);
			
		}

	},

	gestioneForm: function(){
		var me = this;
		var form= me.lookupReference('Form');

        form.permesso = 'S';
        
        me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
        
        me.storeForm = form.store= Ext.create('CS.consegne.ConsegneStore');
		form.controller = me;
		
		form.on('dirtychange', function(th, isDirty) {
			Ext.isDefined(form.createFabs.btnEliminaConsegna) ? form.createFabs.btnEliminaConsegna.setHidden(isDirty) : null;
			StdCba.btnNascondiMostra(isDirty, th);
			me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
		});

	},

	insertButtonElimina: function() {
		
//		var me = this;
//		var form = me.getForm(),
//			letta = me.consegnaLetta, 
//			boxBottoni = me.getPnlSpecialBtn(),
//			posizione =  posiz;
//
//		//verifico stato consegna se consegna letta aggiungo bottone speciale altrimenti bottone di eliminazione con la X invece del bidoncino (standard)
//		boxBottoni.insert(posizione, {
//			xtype: 'button',
//			nonDisabilitare: true,
//			disabled: me.recordConsegna.isRegAnnullata || false,
//			width: 135,
//			itemId: 'SpecialBtnDelete', reference: 'SpecialBtnDelete',
//			text: traduci('CS_ANNULLA_SOSTITUISCI'),
//			cls: 'cbaCssBtnFunzione-special',
//			handler: function(th) {
//				me.getCntBoxInfoConsegna().setHidden(true);
//				th.cbaConfig.modAnnulla = true;
//				me.annullaConsegna = true;
//				
//				me.bloccaFormConsegna(false);
//				th.setDisabled(true);
//				//pulisco label stato consegna 
//				StdCba.setStatoConsegna(false, me.getLblStatoConsegna());
//				me.setAnnullamentoConsegna();
//			}
//		});
	},

	setAnnullamentoConsegna: function() {
		let form = this.lookupReference('Form'), 
			dataInsert = this.lookupReference('DataTestataInsert'),
			oraInsert = this.lookupReference('OraTestataInsert'),
			dataLabel = this.lookupReference('DataTestata'),
			oraLabel = this.lookupReference('OraTestata'),
			dataConsegnaPrec = dataLabel.getHtml() + ' ' + oraLabel.getHtml();	//data consegna precedente da annullare
		
		this.cbaConfig.controllerPageStd.lookupReference('LabelSchermata').setHtml(StdCba.traduci('CS_INSERIMENTO_CONSEGNA'));
		form.getFields().id.setValue('');

		//riformatto il pannello compilatore con le date
		//setto le nuove date con la data di oggi
		this.mostraNascondiDataInsert(true);
		dataInsert.setValue(new Date());
		oraInsert.setValue(StdCba.FormattaData(new Date(), 'H:i'));

		this.cbaConfig.dataOraConsegna = StdCba.cssCheckDataOraRegistrazione(this, this.lookupReference('DataTestataInsert'), this.lookupReference('OraTestataInsert'));
		
		this.lookupReference('TestoConsegna').cbaConfig.deleteText = '<span style="font-weight: bold; color: red;">' + 
		StdCba.traduci('CS_ANNULLAMENTO_CONSEGNA') + ' ' + dataConsegnaPrec + '</span>';
		//costruisco il testo della consegna con il testo di annullamento + quello che c'era precedentemente inserito
		this.lookupReference('TestoConfermato').setHtml(this.lookupReference('TestoConsegna').cbaConfig.deleteText + '<br>' + this.lookupReference('TestoConfermato').getHtml());
		
	},
	
	mostraNascondiDataInsert: function(mostra){
		let dataInsert = this.lookupReference('DataTestataInsert'),
			oraInsert = this.lookupReference('OraTestataInsert'),
			dataLabel = this.lookupReference('DataTestata'),
			oraLabel = this.lookupReference('OraTestata');
		
		dataLabel.setHidden(mostra);
		oraLabel.setHidden(mostra);
		dataInsert.setHidden(!mostra);
		oraInsert.setHidden(!mostra);
		this.lookupReference('CntBoxInfoConsegna').setHidden(!mostra);
	},
	

	salvaForm: function(uscita) {
		var me = this;
		var form = me.lookupReference('Form');
		var newRecord = form.getValues();
		var stringCampi = '';
		var obj = {};
		
		me.lookupReference('GridFigProf').getStore().getData().items.forEach(figProf =>{
			if(figProf.get('checked') == true){
				stringCampi += ';';
				stringCampi += figProf.data.codFigProf+',';
				stringCampi += figProf.data.id + ';'; 
			}
					
		});

		var data = StdCba.cssCheckDataOraRegistrazione(this, me.lookupReference('DataTestataInsert'), me.lookupReference('OraTestataInsert'));
		//controllo l'esistenza di una form se presente una form con il campo id nascosto vado a recuperare il valore altrimenti lo prendo dall
		var idRif = me.recordConsegna.idRiferimento;

		delete newRecord.dataRegAppo;
		delete newRecord.oraRegAppo;
		delete newRecord.campoDirty;
		delete newRecord.selTutto;
		delete newRecord.noteCheck;
		delete newRecord.parametri;
		
		var fields = form.getFields();
		newRecord = StdCba.convertiBool(newRecord, fields);
		
		let idRicovero = null;
		if (Ext.isDefined(me.controllerForm) && me.controllerForm.cbaConfig.anagraficaCorrente){
			idRicovero =  me.controllerForm.cbaConfig.anagraficaCorrente.idRicovero;
		} else if (Ext.isDefined(me.cbaConfig.idRicovero))  {
			idRicovero = me.cbaConfig.idRicovero;
		}
		
		let testo = me.lookupReference('TestoConsegna').getValue();
		
		Ext.apply(newRecord, {
			idRicovero: idRicovero,
			compilatore: CBA.moduli.modulo49.operatore.id,
			data: StdCba.FormattaData(data, 'c'),
			idRiferimento: parseInt(idRif),
			tipoConsegna: Ext.isDefined(me.controllerForm) ? me.controllerForm.cbaConfig.tipoConsegna : me.cbaConfig.tipoConsegna,
			idProfilo: CBA.parametriGenerali.idProfiloCss,
			note: Ext.isEmpty(testo) ? me.lookupReference('TestoConfermato').getHtml() : testo
		});

		if (me.annullaConsegna) {
			me.annullaConsegna = false;
		}

		Ext.apply(obj, {
			consegna: newRecord,
			destinatari: Ext.isEmpty(stringCampi) ? null: stringCampi
		});
		
		/*Parametro per conversione caratteri mobile*/
		var params = {
				mobile: true
		};
		
		if (ControllerStd.salvaRecord(form, obj, false, params, true)){
			// se sono nello stato consegne aggiorno la pagina
			if(me.cbaConfig.controllerStatoConsegne) {
				me.cbaConfig.controllerStatoConsegne.aggiornaDati();
			}
			if(me.callbackEsci){
				me.callbackEsci(true);
			}
		}

	},

	callbackEsci: function(operationAfterConfirm) {
		var me = this;
		me.cbaConfig.controllerForm.lookupReference('Form').dirty_original = null;
		me.cbaConfig.controllerForm.aggiornaStore();
		let livelloPrec=  me.cbaConfig.controllerPageStd.livelloPrecedente;
		let	mainLevels =  me.cbaConfig.controllerMainApp.lookupReference('MainLevels');
		me.cbaConfig.controllerPageStd.getView().destroy();
		mainLevels.getActiveItem().removeAll(true);
		mainLevels.setActiveItem('#' + livelloPrec);
	},

	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form = me.lookupReference('Form');
		var figProfSelect = false;
//		var dataF = form.down('datefield'),
//			oraF = form.down('timefield');
//		var dataValidator = dataF.validator(dataF);		
//		
//		//controllo su date
//		if(dataValidator && Ext.isString(dataValidator))
//			StdCba.msgAddError(messaggi, dataValidator);


//		if (Ext.isEmpty(oraF.getValue())) {
//			StdCba.msgAddError(messaggi,'MSG_CAMPO_ORA');
//		}
//
//		if (Ext.isEmpty(dataF.getValue())) {
//			StdCba.msgAddError(messaggi,'MSG_CAMPO_DATA');
//		}
		
		//se presente funzione di verifica campiConsegne viene eseguita  possibiltà di aggiungere e gestire piu errori vedi es: diari filtri interni sulla view principale
		if (me.cbaConfig.fnVerifiCampiConsegne) {
			me.cbaConfig.fnVerifiCampiConsegne(form, messaggi);
		}

		if (Ext.isEmpty(me.lookupReference('TestoConsegna').getValue())  ) {
			StdCba.msgAddError(messaggi,'MS_CAMPO_TESTO_CONSEGNA_OBBLIGATORIO');
		}
		
		me.lookupReference('GridFigProf').getStore().getData().items.forEach(figProf =>{
			if(figProf.get('checked') == true){
				figProfSelect = true;
				return false;
			}
		});
		if(figProfSelect == false)
			StdCba.msgAddError(messaggi,'MSG_SELEZIONA_DEST');
		
		return StdCba.msgShow('',messaggi);
	},

	caricaFigProf: function(idConsegna){
		var me = this;
		var params = {};
		Ext.suspendLayouts();
		
		if (idConsegna) {
			params.idConsegna = idConsegna;
		}
		
		me.lookupReference('GridFigProf').getStore().load({
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

	aggiornaStore: function(idRecord, fnUpdateAnnullate){
		var me= this;
		var form = me.lookupReference('Form');
		var store = me.storeForm;
		
		StdCba.clearForm(form);
		me.onLoad = true;
		store.load({
			params:{
				id: idRecord ? idRecord : me.recordConsegna.idConsegna,
				mobile: true		
			},
			callback:function(records,operation,success){
				if(success){
					var rec= records[0];				
					//se consegna è letta la consegna non è piu modificabile
					form.dirty_suspendDirtyChange = true
					form.setRecord_cba(rec);
					
					/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
					var fields = form.getFields();
					let newRecord = StdCba.convertiStringinBool(rec, fields);
					form.setValues({
						dataRegAppo: rec.get('data'),
						oraRegAppo: rec.get('data')
					});
					me.idNext = rec.get('next_Id');
					me.idPrev = rec.get('prev_Id');
					
					me.getStatoConsenga( rec )
					
					me.tipoBlocco = rec.get('tipoBlocco');
					
					let valLblText = !Ext.isEmpty(me.lookupReference('LblText').text) ? me.lookupReference('LblText').text: '';

					valLblText = valLblText + '<br>' + (!Ext.isEmpty(rec.get('deletedData')) ? '<span style="color: red;">' +  StdCba.traduci('CS_CONSEGNA_ANNULLATA') + '</span>' : '');
					me.lookupReference('LblText').setHtml(valLblText);

					if (fnUpdateAnnullate) {
						fnUpdateAnnullate();
					} 
					
					if (Ext.isDefined(me.controllerForm) && me.arrayBlockEditConsegna.includes(me.controllerForm.cbaConfig.tipoConsegna)) {
						me.lookupReference('TestoConsegna').setHidden(true);
						me.lookupReference('TestoConfermato').setHidden(false);
						me.lookupReference('TestoConfermato').setHtml(rec.get('note'));
					}
					
					me.lookupReference('TestoConsegna').cbaConfig.text = rec.get('note');
					
					me.mostraNascondiData(false);
					me.lookupReference('DataTestata').setHtml(StdCba.FormattaData(rec.get('data'), 'd/m/Y'));
					me.lookupReference('OraTestata').setHtml(StdCba.FormattaData(rec.get('data'), 'H:i'));
					
					StdCba.bloccaFormCss(form, me.consegnaLetta || me.recordConsegna.isRegAnnullata);
					
					var pnlCompilatore = me.lookupReference('PnlCompilatore'),
						compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
					pnlCompilatore.setLabelCompilatore(compilatore, form);
					me.caricaFigProf(rec.get('id'));
					
					me.onLoad = false;
					
					StdCba.btnNascondiMostra(false, form);
					form.dirty_suspendDirtyChange = false
					form.dirty_resetOriginal();

				}else{
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
	},
	
	mostraNascondiData: function(insert){
		var me = this;
		
		me.lookupReference('DataTestataInsert').setHidden(!insert);
		me.lookupReference('OraTestataInsert').setHidden(!insert);
		me.lookupReference('DataTestata').setHidden(insert);
		me.lookupReference('OraTestata').setHidden(insert);
	},

	getStatoConsenga: function( record ) {
		var me = this;
		Ext.Ajax.request({
			method: 'GET',
			async: false,
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/getStatoConsegna', 
			params: {
				id: record.get('id'),
			},
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var record = risposta.data;
				if (risposta.success) {

					Ext.apply( me.recordConsegna, record); //per non perdere l'idRiferimento
					me.consegnaLetta = record.letta;

					StdCba.setStatoConsegna( record, me.lookupReference('LblStatoConsegna') );
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
		
	},

	init: function() {
		var me = this;
		this.callParent(arguments);
		
		this.apriPanel = false;
		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		me.tmpEliminati = {};
		me.count = 0;
		me.controllerForm = me.cbaConfig.controllerForm;
		me.contaNodiPadre = 0;
		me.recordConsegna = me.cbaConfig.consegna;
		me.consegnaLetta =  !Ext.isEmpty(me.cbaConfig.consegna) ? me.cbaConfig.consegna.letta : null; 
		me.annullaConsegna = false;
		me.nuovaConsegna = !Ext.isEmpty(me.cbaConfig.consegna)  ? Ext.isEmpty(me.cbaConfig.consegna.idConsegna) : true;
		me.nuovo = true; /*uso per fare entrare nel painted solo la prima volta*/
		me.arrayBlockEditConsegna = ['V'];    //TODO_BES: se ci saranno altre videata che prevedono il campo testo consegna bloccato è  da cambiare
		
		//aggancio il controller al fieldset di questa videata
		me.lookupReference('CntOpzioni').controller = me;
		me.gestioneForm();
		

		if (!me.cbaConfig.hideFiltriDefault) {			
			StdCba.initFiltriConsegna(me.lookupReference('CntOpzioni'), me, me.cbaConfig.filtriPerson, me.cbaConfig.hideFiltriBase, me.cbaConfig.showAllegati);		
		}
		
		//se presente funzione viene eseguita  
		if (me.cbaConfig.fnInizializzaFiltri){
			me.cbaConfig.fnInizializzaFiltri(me);
		}
		
		//se è gia presente una consegna procedo con l'aggiornaStore' 
		if (!me.nuovaConsegna) {
			me.aggiornaStore();
			return false;
		}
		
		/*
		 * CASO IN CUI NON CI SONO CONSEGNE
		 * 
		 * */
		
		me.mostraNascondiData(true);
		me.lookupReference('OraTestataInsert').setInputValue(StdCba.FormattaData(new Date, 'H:i'));
		//carico le figure professionali  se nuova consegna
		me.caricaFigProf();
		me.lookupReference('PnlCompilatore').setNuovoRecord();
		
		/*Lascio renderizzare pulsanti*/
		me.lookupReference('Form').on('painted',(th)=>{
			this.lookupReference('Form').dirty_resetOriginal();
			th.getFields().id.setValue('-9999'); //sporco la form
		});
		
		//testo consegna 
		me.lookupReference('TestoConsegna').on('painted' , function(th) {
			if(me.nuovo == false)
				return false;
			me.nuovo = false;
			var campoTesto = '';
			//se avete piu campi note da inserire viene passato un array altrimenti il singolo campo
			if (me.cbaConfig.campoNote) {
				if (Ext.isArray(me.cbaConfig.campoNote)) {
					
					me.cbaConfig.campoNote.forEach( function(note) {
						campoTesto += note.getValue();
					});

				}else campoTesto = me.cbaConfig.campoNote.getValue();
			}
			if (Ext.isDefined(th.cbaConfig.extraTesto) || !Ext.isEmpty(campoTesto)){
				me.lookupReference('TestoConsegna').setHidden(th.cbaConfig.testoHtml);
				me.lookupReference('TestoConfermato').setHidden(!th.cbaConfig.testoHtml);
				
				//serve per il salvataggio
				th.setValue(( Ext.isDefined(th.cbaConfig.extraTesto) ?  th.cbaConfig.extraTesto : '' ) + '\n' + campoTesto);
				
				if(th.cbaConfig.testoHtml)
					me.lookupReference('TestoConfermato').setHtml(th.cbaConfig.extraTesto);
				
			}
		});
		
	},

	destroy: function() {
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
