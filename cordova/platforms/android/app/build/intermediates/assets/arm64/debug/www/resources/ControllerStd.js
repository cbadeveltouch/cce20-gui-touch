class ControllerStd{
	constructor() {
	}
	
	/**
	 * 
	 * @param form
	 * @param campoFocus: campo su cui mettere il focus
	 * @param gestioneFocus: boolean
	 * @returns
	 */
	static nuovoRecord(form, campoFocus, gestioneFocus = true) {
		form.dirty_original = null;
		StdCba.clearForm(form);
		form.setRecord_cba(); //risetto il valori del dirty
		form.getFields().id.setValue(-9999);

		StdCba.validaForm(form);

		gestioneFocus= Ext.isDefined(gestioneFocus) ? gestioneFocus : true;
		if(gestioneFocus) {
			if(campoFocus){
				setTimeout(function() {
					campoFocus.focus();
				}, 500);
			}else{
				//mi posiziono sul primo field visibile
				var firstField= form.query('field[hidden=false]')[0];
				if(firstField){
					setTimeout(function() {
						firstField.focus();
					}, 500);
				}
			}
		}	
	}

	static nuovoRecordGrid(newRecord, grid, posizione, clearFilter = true) {
		posizione= Ext.isDefined(posizione)? posizione : 0;

		var newRecords= grid.getStore().insert(posizione, newRecord);

		if(clearFilter)
			grid.getStore().clearFilter();
		
		grid.getSelectionModel().select(newRecords);
		
		//ovvia problema di ridimensionamento del rowEditor (su chrome)
		setTimeout(function() {
			grid.getPlugin().startEdit(newRecords[0], 0);
		}, 100);	
	}

	static salvaRecord(container, recordDati, isUscitaForm, parametriStore, visualizzaMessaggio, callbackEsci, idField, forceStore){
		if(Ext.isEmpty(idField))
			idField = 'id';
		
		var SalvataggioOK=false;
		var myUrl;			
		var id= recordDati[idField];
		var parametri='';
		var store= container.store;
		var recordRisultante = {};

		//visualizzaMessaggio: utilizzata nel Fascicolo per evitare di avere messaggi sovrapposti di conferma utente/errore indirizzo
		if(Ext.isEmpty(visualizzaMessaggio)){
			visualizzaMessaggio= true;
		}
		
		//controllo se il record esiste in tabella, in caso di griglie controllo il campo phantom (per evitare problemi con id a -9999)
		let rec= StdCba.trovaRecord(store, idField, id); 
		let isNewRecord= !rec || rec && rec.phantom;
		
		if (isNewRecord)
			myUrl= store.getProxy().api.create;
		else myUrl= store.getProxy().api.update;

		if(parametriStore){
			parametri= parametriStore;
		}

		if (forceStore) {
			if (parametri == '')
				parametri = {forceStore: true};
			else {
				if (parametri.forzaRegistrazione)
					parametri.forzaRegistrazione = 'T'		// forzatura per CP ** SPD 25/02/2015
				else 
					Ext.apply(parametri, {forceStore: true});
			}
		}

		Ext.Ajax.request({
			url: myUrl,
			method: 'POST',
			jsonData: recordDati,
			params: parametri,
			async: false, //e' sincrona per poter abilitare o no i bottoni in caso di errore!!
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				var titolo = "";
				if (risposta.success){
					recordRisultante = risposta.data;

					if (isUscitaForm){
						if(callbackEsci){
							callbackEsci(risposta);
						}

						//chiudo la window dopo aver salvato
						container.up('window').close();
					}else{
						//se inserimento leggo il nuovo id per riposizionarmi nello store
						if (isNewRecord){
							if (risposta.data) {
								id = risposta.data[idField];
							}
						}
						
						if(container.controller){
							//nuova gestione
							container.controller.aggiornaStore(id,risposta);
						}else{
							//utilizzata nella personStampe (da rifare)
							container.aggiornaStore(id);
						}
					}
					if(visualizzaMessaggio){
						if((risposta.message) && (risposta.message[0] == '$')){//se il primo carattere del messaggio � "$" visualizzo un alert, altrimenti il popup a scomparsa
							risposta.message = risposta.message.substring(1); //tolgo il carattere "$";
							StdCba.msgAddWarning(messaggi, risposta.message);
						}else{
							titolo='MSG_SALVATAGGIO_DATI';
							StdCba.msgAdd(messaggi, risposta.message);
						}
					}
				}else{
					// Se il primo carattere è "?" devo chiedere all'utente se intende proseguire
					if(	(risposta.message) && ((risposta.message[0] == '?') || (risposta.message[0].testo && risposta.message[0].testo[0] == '?')) ) {
						StdCba.Messaggio('ATTENZIONE', risposta.message[0].testo.slice(1), 'YESNO', 'QUESTION', false,
							function () {
								controller_salvaRecord(container, recordDati, isUscitaForm, parametriStore, visualizzaMessaggio, callbackEsci, idField, true);
							}
						);
						return;
					}else if((risposta.message)&&(risposta.message[0]=='$')){//se il primo carattere del messaggio � "$" visualizzo un alert, altrimenti il popup a scomparsa
							risposta.message= risposta.message.substring(1); //tolgo il carattere "$";
					}else	StdCba.msgAddError(messaggi, risposta.message);

					if(callbackEsci){
						callbackEsci(risposta);
					}
				}
				StdCba.msgShow(titolo,messaggi);

				SalvataggioOK = risposta.success;
			},
			failure: function (response) {
			}
		});

		//Se ho un errore (ed esiste il pannello dei Bottoni), nelle form standard richiamo la funzione abilita bottoni che rimette i bottoni conferma/ripristina abilitati..
		if (SalvataggioOK){
			StdCba.resettaForm(container);
		}

		if (!SalvataggioOK)
			return false;
			else return recordRisultante;
	}
	
//	static btnNascondiMostra(nuovo){
//		var me = this;
//		
//		let btnRipristina = Ext.Viewport.down('#BtnRipristina'),
//			btnConferma = Ext.Viewport.down('#BtnConferma'),
//			btnMore = Ext.Viewport.down('#BtnMore'),
//			btnNuovo = Ext.Viewport.down('#BtnNuovo');
//		
//		//nascondo mostro sottomenu
//		Ext.each( Ext.Viewport.items.items, function(items) {
//			if(!Ext.isEmpty(items)){
//				if(items.pathButtonType === 'menuitem')
//					items.setHidden(nuovo);
//			} 
//		});
//		var nuovo = Ext.Viewport.editMode = nuovo;
//		btnRipristina.setHidden(!nuovo);
//		btnConferma.setHidden(!nuovo);
//		btnNuovo.setHidden(nuovo);
//		btnMore.setHidden(nuovo);
//	}

	static eliminaRecord(store,parametri,callback_aggiornaStore,callback_beforedelete,messaggio, titoloMessaggio, forceStore){
		function procediController_eliminaRecord() {
			if (callback_beforedelete){
				/* serve per effettuare delle operazioni primaq di effettuare la cancellazione !!
				   esempio doppia conferma eliminazione
				   deve restituire un boolean = true pre continuare*/
				if (!callback_beforedelete(parametri)){
					return;  //esco senza fare nulla
				}
			}
			
			Ext.Ajax.request({
				method: 'GET',
				url: store.getProxy().api.destroy,
				async: false,
				params: parametri,
				success: function (response) {
					var risposta = Ext.JSON.decode(response.responseText);
					var messaggi= [];

					if (risposta.success) {
						StdCba.msgAdd(messaggi, risposta.message);
						if(callback_aggiornaStore){
							callback_aggiornaStore(messaggi);
						}
					}	
					else {
						if(	(risposta.message) && ((risposta.message[0] == '?') || (risposta.message[0].testo && risposta.message[0].testo[0] == '?')) ) {
							StdCba.Messaggio('ATTENZIONE', risposta.message[0].testo.slice(1), 'YESNO', 'QUESTION', false,
								function () {
									controller_eliminaRecord(store,parametri,callback_aggiornaStore,callback_beforedelete,messaggio, titoloMessaggio, true);
								}
							);
						} else StdCba.msgAddError(messaggi,risposta.message);
					}
					StdCba.msgShow('MSG_ELIMINAZIONE_DATI',messaggi);
				},
				failure: function (response) {
				}
			});
		};
		if (!forceStore) {
			if ((!store.tree)&&(store.getTotalCount()===0)){//visualizzo il messaggio solo se lo store ? vuoto e non ? un albero
				return StdCba.Messaggio('Elimina','MSG_NORECORD','OK','WARNING');
			}else {
				var annullabile = store.controller && store.controller.modeAnnullabile,
					msg = messaggio ? messaggio : ( annullabile ? 'MSG_ANNULLA_RECORD' : 'MSG_ELIMINA' ),
					titoloMsg = titoloMessaggio ? titoloMessaggio : ( annullabile ? 'ANNULLA_RECORD' : 'Elimina' );

				return StdCba.Messaggio(titoloMsg, msg, 'YESNOCANCEL', 'QUESTION','',
					function(){
						procediController_eliminaRecord();
					}
				)
			}
		} else {
			parametri.forzaRegistrazione = 'T'		// forzatura per CP ** SPD 25/02/2015
			procediController_eliminaRecord();
		}

	}
}
