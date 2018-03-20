Ext.define('CS.diari.DiarioController', {
    extend: 'CBAViewController',
    alias: 'controller.cs-diari-diario',
    
    salvaForm: function(esci){
		var me = this;
		var form = me.lookupReference('Form');
		
		var fields = form.getFields();
		var newRecord = form.getValues();
		newRecord = StdCba.convertiBool(newRecord, fields);

		delete newRecord.dataRegAppo;
		delete newRecord.oraRegAppo;
		delete newRecord.campoDirty;
		
		StdCba.eliminaCampiTmp(newRecord);
		
		me.aggiornamentoTestata = true;
				
		Ext.apply(newRecord,{
			
			idRicovero: me.idRicovero,
			idTipoDiario: me.cbaConfig.sottoTipoTestata,
			compilatore: CBA.moduli.modulo49.operatore.id,
			note: me.lookupReference('Diario').getValue(),
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			//agenda: me.getFiltroAgenda() ? getBoolValue(me.getFiltroAgenda().getValue() == 1) : 'F'
		});	
		
		StdCba.cssFiltriStdOff(me);
		
		/*Parametro per conversione caratteri mobile*/
		var params = {
				mobile: true
		};
		
		me.salvataggioRecord = true;
		me.dataRecord = newRecord.data;
		if(ControllerStd.salvaRecord(form,newRecord,false, params, true)){
			if(esci && me.callbackEsci){
					me.callbackEsci();
			} 
		};
	},
	
	changeFiltroAgenda: function(th, newValue,oldValue){
		var me = this; 
		if(me.stoppaEvento)
			return false;
		if(newValue == 0){
			me.lookupReference('ImgCalendario').removeCls('agenda-si');
			me.lookupReference('ImgCalendario').addCls('agenda-no');
		}else{
			me.lookupReference('ImgCalendario').removeCls('agenda-no');
			me.lookupReference('ImgCalendario').addCls('agenda-si');
		}	
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnConsegna = form.createFabs.btnConsegna,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnNuovo.on('tap', function(){
			ControllerStd.nuovoRecord(form);
			me.visualizzaNascondiCampi(true);
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
		});
		
		btnConsegna.on('tap', function(){
			StdCba.tapBtnConsegna(me);
		});
		
		btnRipristina.on('tap', function(){
			me.aggiornamentoTestata = true;
			me.aggiornaStore();
		});
		
		btnAnnulla.on('tap', function(){
			var id= form.getFields().id.getValue();
			
			if(!Ext.isEmpty(id)){
				let messaggio = StdCba.setMsgOnDeleteRecWithConsegna(me);
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.aggiornaStore(id);
				},false, messaggio
				);
			}else StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
	
	gestioneForm: function(){
		var me = this;
		var form = me.lookupReference('Form');
		
		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		form.createFabs.btnConsegna ? form.createFabs.btnConsegna.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnConsegna');
		
        form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';
		me.storeForm = form.store= Ext.create('CS.diari.DiarioStore');
		me.storeForm.controller = me;
		form.controller = me;
		
        form.on('dirtychange', function(th, isDirty) {
        	if(isDirty)
        		StdCba.retrodatazione(th);
        	StdCba.btnNascondiMostra(isDirty ,th);
        	me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			StdCba.abilitaDisabilitaDataPicker(isDirty, me.cbaConfig.controllerPageStd);
			
			var id = form.getFields().id.getValue();
			
			//si imposta nuovo record quando si hanno azioni di nuovo record
			if(isDirty && !StdCba.cbaValidId(id) ) {
				var controllerPageStd = me.cbaConfig.controllerPageStd,
    	 			pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
				pnlCompilatore.setNuovoRecord();
				
			}
        });
	},
	
	aggiornaStore: function(idRecord, callbackFn){		
		var me = this;
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);			
		}else{
			me.lookupReference('FieldCheck').setCollapsed(true);
			//svuoto form
			StdCba.clearForm(me.lookupReference('Form'));
			var controllerPageStd = me.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			
			if(idRecord || me.testataSelezionata){
				var form = me.lookupReference('Form');
				var store = me.storeForm;				
						
				store.load({
					params: {
						id: idRecord ? idRecord : me.testataSelezionata,
						mobile: true
					},
					callback: function(records,operation,success){
						if (success){
							
							var rec = records[0];
								
							if (!Ext.isEmpty(rec)){
								
								me.lookupReference('FieldCheck').setHidden(false);

								/*
								 *  il campo è nascosto inizialmente  se è vuoto o non compilato vedere fn: visualizzaNascondiCampi
								 */
								for(var i in me.campiNascosti){
									let property = i;
									me.campiNascosti[property] = Ext.isEmpty(rec.get(property)) || rec.get(property) == 'F';
								}
								me.visualizzaNascondiCampi();
								
								/*Modifico campi al volo quindi sospendo il dirty*/
								
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
								StdCba.cssGestioneConsegna(rec, me, function() {
									//se ho consegna il campo info riserevata non è piu editabile 
									if (!StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'))) {
										me.lookupReference('Riservato').setReadOnly(!Ext.isEmpty(me.cbaConfig.consegna.idConsegna));
									}
									//con info riserata true il btn crea consegna si nasconde vedi track
									
									var btnConsegna = me.lookupReference('Form').createFabs.btnConsegna;
									if (btnConsegna && !btnConsegna.isHidden())
										btnConsegna.setHidden(rec.get('riservato') == true);
								});
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
								if(form.permesso != 'L'){
									form.createFabs.btnCopia.setHidden(me.recordTestata.get('tipoBlocco')[0].valore!=='A');
									form.createFabs.btnAnnulla.setHidden(me.recordTestata.get('tipoBlocco')[0].valore =='A');
								}
								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								form.dirty_suspendDirtyChange = false
								form.dirty_resetOriginal();
								
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco')),
									tipoBlocco = StdCba.cssGetBlocchi(me.recordTestata.get('tipoBlocco'))[0];
								StdCba.bloccaFormCss(form, blocco);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				let form = me.lookupReference('Form');
				form.setRecord_cba(); //risetto il valori del dirty
				me.visualizzaNascondiCampi(true);
				StdCba.bloccaFormCss(form, form.permesso != 'S');
			}
		}
		
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');
		
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);		
		var id = me.lookupReference('Form').getFields().id;
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}

		if (Ext.isEmpty(me.lookupReference('Diario').getValue())){
			StdCba.msgAddError(messaggi,'MSG_CAMPO_TESTO_DIARIO');
		}
		//TODO_PLS CONSEGNE
		if (Ext.isDefined(me.cbaConfig.consegna) && me.cbaConfig.idConsegna && cbaValidId(id.getValue())) {
			StdCba.Messaggio('ATTENZIONE','MSG_MODIFICADIARIO', 'OK', 'QUESTION', function(){
				me.salvaForm(false);
			}); 
			return false;
		}

		return StdCba.msgShow('',messaggi); 

	},
	

	collapseCboxPatologie: function(th){
		var me = this;
		th.getStore().clearFilter();
	},

	expandCboxPatologie: function(th){
		var me = this;
		var sorters = [  
			{
            	property: 'extra',
            	direction: 'ASC'
            },
		];
		th.getStore().setSorters(sorters);

		th.getStore().filterBy(function(record) {
			 if (record.get('extra') == 1 || record.get('extra') == 3){
				 return record;
			 }
		});

	},
	
	caricaPersonalizzazioni: function() {
		var me = this;
		Ext.Ajax.request({
            method:'GET',
            async: false,
            url:`${CbaRootServer}`+'/cba/css/cs/ws/diari/person/get',
            params:{
               id: me.cbaConfig.sottoTipoTestata
            },
            success: function (response){
                var risposta = Ext.JSON.decode(response.responseText);
                var messaggi = [];
                if(risposta.success){
                	var rec = risposta.data,
						colore = rec.coloreS2,
						coloreLabel = rec.coloreLabel;

					/* decido quali campi abilitare in base alle personalizzazioni  */
					me.campiAbilitati = {
						eventoAcuto: rec.eventoAcuto === 'T',
						eventoEvidenzia: rec.evidenziare === 'T',
						riservato: rec.riservato === 'T',
						agenda: rec.agenda === 'T',
						indicazioniAss: rec.indicazioniAssistenziali === 'T',
						codPatologia: rec.patologieProblemi === 'T'
					};
					
					me.cbaConfig.tipoConsegna = rec.codDiario;
					me.lookupReference('DescrDiario').setStyle({color: colore});
					
					/*carico store patologie problemi e mi scarico inizialmente  tutti gli stati */
					me.lookupReference('CboxPatologie').getStore().load({
						params:{
							idRicovero: me.idRicovero
						}
					});
                }
            }
        });
	},
	
	caricaImpoPai: function() {
		var me = this;
		Ext.Ajax.request({
            method:'GET',
            async: false,
            url: `${CbaRootServer}`+'/cba/css/cs/ws/pai/impostazioni/get',
            params:{
			   idProfilo: CBA.parametriGenerali.idProfiloCss
            },
            success: function (response){
				var risposta = Ext.JSON.decode(response.responseText);
				var rec = risposta.data;
				me.campiAbilitati.alimentaPrePai = rec.analisi === 'T';
			}   
        });
	},
	
	caricaImpoPri: function() {
		var me = this;
		Ext.Ajax.request({
            method:'GET',
            async: false,
            url: `${CbaRootServer}`+'/cba/css/cs/ws/pri/impostazioni/get',
            params:{
			   idProfilo: CBA.parametriGenerali.idProfiloCss
            },
            success: function (response){
				var risposta = Ext.JSON.decode(response.responseText);
				var rec = risposta.data;
				me.campiAbilitati.alimentaPrePri = rec.analisi === 'T';
			}   
        });
	},
	
	caricaTeAnaPers: function() {
		var me = this;
		
		//scarico le informazioni per l'analisi progetti pai pri pti
		Ext.Ajax.request({
            method:'GET',
            async: false,
            url: `${CbaRootServer}`+'/cba/css/cs/ws/teanapers/tipologie/getbyteanapers',
            params:{
               progr: CBA.moduli.modulo49.operatore.id,
			   idProfilo: CBA.parametriGenerali.idProfiloCss
            },
            success: function (response){
				var risposta = Ext.JSON.decode(response.responseText);
				var rec = risposta.data[0];
				me.campiAbilitati.alimentaPrePai = me.campiAbilitati.alimentaPrePai && !Ext.isEmpty(rec.codAreaAnalisiPAI); 
				me.campiAbilitati.alimentaPrePri = me.campiAbilitati.alimentaPrePri && !Ext.isEmpty(rec.codAreaAnalisiPRI);
				me.campiAbilitati.alimentaPrePti = rec.codAreaAnalisiPTI === 'T';
			}   
        });

	},
	
	generaFiltriConsegne: function(){
		var me = this;
		var items =  [
			{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [
					{
						xtype: 'container',
						itemId: 'CheckGroupOpzioni', reference: 'CheckGroupOpzioni',
						width: '100%',
						layout:{
							type: 'hbox'
						},
						padding: 3,
						items: [
							{
								xtype: 'checkboxfield',
								margin: '0 0 0 0',
								name: 'diario',
								itemId: 'CheckDiario', reference: 'CheckDiario',
								width: 75,
								inputValue: true,
								boxLabel: StdCba.traduci('DIARIO'),
								cbaConfig: {
									fnContenuto: me.fnContenuto
								},
								listeners: {
									change: function(th, newValue) {
										me.compilaNoteConsegna(th);
									}
								}
							},
							{
								xtype: 'checkboxfield',
								width: 200,
								name: 'indicazioniAss',
								itemId: 'CheckIndicazioniAss', reference: 'CheckIndicazioniAss',
								margin: '0 0 0 0',
								boxLabel: StdCba.traduci('INDICAZIONI_ASSISTENZIALI'),
								inputValue: true,
								listeners: {
									change: function(th, newValue) {
										me.compilaNoteConsegna(th);
									}
								}
							}
						]
					}
				]
			}
		];
		StdCba.cssCreaConsegna(me, me.cbaConfig.permesso, false, items, me.fnInizializzaFiltri, false, false, true);
	},
	
	generaFiltriRicerca: function() {
		var me = this;
		
		me.filtriAggiuntivi = [
			{
				xtype: 'textfield',
				style: 'float:left;',
				labelClsExtra: 'cbaCssLabel',
				labelWidth: 150,
				fieldLabel: 'Ricerca parole chiave',
				margin: '5 0 0 0',
				name: 'parolaChiave'
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('EVENTO_ACUTO'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'eventoAcuto',
				cbaConfig: {
					name: 'eventoAcuto'
				}
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('EVENTO_DA_EVIDENZIARE'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'infoEvidenziare',
				cbaConfig: {
					name: 'eventoEvidenzia'
				}
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('INFO_RISERVATA'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'infoRiservata',
				cbaConfig: {
					name: 'riservato'
				}
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('ALIMENTAPREPAI'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'alimentaPai',
				cbaConfig: {
					name: 'alimentaPrePai'
				}
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('ALIMENTAPREPRI'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'alimentaPri',
				cbaConfig: {
					name: 'alimentaPrePri'
				}
			},
			{
				xtype: 'checkboxfield',
				style: 'float:left;width: 148px;',
				boxLabel: StdCba.traduci('ALIMENTAPREPTI'),
				cls: 'cbaCssLabel',
				inputValue: true,
				uncheckedValue: false,
				margin: '5 0 0 0',
				name: 'alimentaPti',
				cbaConfig: {
					name: 'alimentaPrePti'
				}
			}	
		];
		//anche i filtri devono sotto stare alle regole delle personalizzazioni
		for (var i = 0, len = me.filtriAggiuntivi.length; i < len; i++) {
			if (me.filtriAggiuntivi[i].xtype === 'checkboxfield') {
				let check = me.filtriAggiuntivi[i];
				check.hidden = !me.campiAbilitati[check.cbaConfig.name]; 
			}
		}

		me.lookupReference('Form').on('afterrender', function() {
			me.winFiltri = me.cbaConfig.controllerTestata.winRicerca;
			me.winFiltri.height = 317;
			me.winFiltri.layout = 'fit';
			var formFiltri = me.winFiltri.down("#FormFiltri");
			formFiltri.add({
				xtype: 'container',
				style: 'float:left; width: 100%',
				autoScroll: true,
				flex: 1,
				items: me.filtriAggiuntivi
			});
		});	

	},
	
	visualizzaNascondiCampi: function(nuovo, destroy){
		var me = this;
		//funzione per nascondere e visualizzare i campi personalizzabili nelle impostaz dei diari 
		var form = me.lookupReference('Form'),
			nascondiFieldset = true,
			cmp = null,
			nascondi = false;

		for (var i in me.campiNascosti) {
			
			 if (i.includes('indicazioniAss') || i.includes('agenda')) {
				 cmp = i.includes('indicazioniAss') ? me.lookupReference('IndicazioniAssistenziali') : me.lookupReference('CntAgenda');
			} else { 
				cmp = form.getFields(i)
				//cmp = form.getValues().findField(i);
			}
			
			if (nuovo) {
				cmp.setHidden(!me.campiAbilitati[i]);
				
				if (destroy && !me.campiAbilitati[i]) {
					cmp.destroy();
				}
				//modifico l'oggetto me.campiNascosti
				if(me.campiAbilitati[i]) {
					me.campiNascosti[i] = false;
				} else {
					nascondiFieldset = false;
				}
				
			} else { 
				/*
				 *  se il campo risulta non abilitato da personalizzazioni e nascosto (non compilato) viene definitivamente nascosto
				 */
				 const nascondiCampo =  !me.campiAbilitati[i] && me.campiNascosti[i];
				 me.campiNascosti[i] = nascondiCampo;
				 
				cmp.setHidden(nascondiCampo);
				if (!nascondiCampo) {
					 nascondiFieldset = false;
				}
			}
		}
		me.lookupReference('FieldCheck').setHidden(nascondiFieldset);
	},
	
	fnInizializzaFiltri: function(ctrl, callbackFn) {
		/* inizilizzo i filtri   */
		var me = this.controllerForm;
		/*
		 * Setto i valori originali prima di cambiare i check
		 * sospendo per non fare scattare il change prima che la pagina sia renderizzata
		 * il change scatterà con l'id
		 * */
		let formConsegne = ctrl.lookupReference('Form');
		formConsegne.setRecord_cba(formConsegne.getValues());
		formConsegne.dirty_suspendDirtyChange = true;
//		//valori che avranno i campi check  nelle consegne 
		var valCheckConsegna = {
			eventoEvidenzia: false,
			indicazioniAss: false
		};
		//ciclo l'ogggetto per vedere quali filtri ho attivi '
		for (var i  in  valCheckConsegna) {

			//verifico se il campo è presente nella view delle consegne
			var campoCheckDiario = ctrl.lookupReference('Form').query('[name='+ i +']')[0],
				campoCheckConsegna = ctrl.lookupReference('CntOpzioni').query('[name='+ i +']')[0];

			campoCheckConsegna.setHidden(me.campiNascosti[i]);//nascondo se solo se è nascosto nella view diari
			
			if (!me.campiNascosti[i]) { 
				if (campoCheckDiario.getChecked() && !Ext.isEmpty(campoCheckDiario.getChecked())) {
					valCheckConsegna[i] = true; //se il campo nella view  dei diari è avvalorato lo metto a true nella view delle consegne
				} 
			}
		}

		if (ctrl.nuovaConsegna) {
			valCheckConsegna.diario = true;
			ctrl.lookupReference('CheckGroupOpzioni').query('[xtype=checkboxfield]').forEach( field => {
				field.name == 'diario' ? field.setChecked(true) : null;
				field.name == 'indicazioniAss' ? field.setChecked(true) : null;
			});
			ctrl.lookupReference('CntOpzioni').query('[name=eventoEvidenzia]')[0].setChecked(valCheckConsegna.eventoEvidenzia);
		}
		formConsegne.dirty_suspendDirtyChange = false;
	},
	
	fnContenuto: function(property) {
		var me = this;
		var campoNote = property == 'diario' ? me.lookupReference('Diario') : me.lookupReference('IndicazioniAssistenziali');
		return campoNote.getValue();

	},
	
	compilaNoteConsegna: function(th) {
		var me = this;		
		//recupero il controller  dalla view delle consegne  e mi prendo il campo testoConsegna
		var ctrlConsegna = th.up('#CntOpzioni').controller, 
			campoNote = ctrlConsegna.lookupReference('TestoConsegna'),
			noteConsegna = '',
			valCampo = null,
			table = '',
			ckContainer = th.up(),
			checkDiario = ckContainer.down('#CheckDiario'),
			checkIndicazioniAss = ckContainer.down('#CheckIndicazioniAss');
		
		if (ctrlConsegna.onLoad)
			return false;
		
		var divInfoProgetti;
		if (me.lookupReference('AlimentaPrepai') && me.lookupReference('AlimentaPrepai').getChecked()) {
			divInfoProgetti = '- ' + StdCba.traduci('ALIMENTAPREPAI') +'\n';
		}

		if (me.lookupReference('AlimentaPrepri') && me.lookupReference('AlimentaPrepri').getChecked()) {
			divInfoProgetti += '- ' + StdCba.traduci('ALIMENTAPREPRI')+'\n';
		}

		if (me.lookupReference('AlimentaPrepti') && me.lookupReference('AlimentaPrepti').getChecked()) {
			divInfoProgetti += '- ' + StdCba.traduci('ALIMENTAPREPTI')+'\n';
		}

		note = Ext.isEmpty(divInfoProgetti) ? '' : divInfoProgetti+ '\n'; 

		if (checkDiario.getChecked() == true) {
			note += me.fnContenuto('diario') + '\n';
		}

		if (checkIndicazioniAss.getChecked() == true) {
			note += me.fnContenuto('indicazioniAss') + '\n';
		}

		if (ctrlConsegna.annullaConsegna) {
			note =  campoNote.cbaConfig.deleteText + '\n'  +  note;
		}
		
		campoNote.cbaConfig.testoHtml = false;
		
		if (campoNote.rendered) {
			campoNote.setValue(note);
		} else {
			campoNote.cbaConfig.extraTesto = note;
		}
	},
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		
		me.lookupReference('Form').controller = me;
		/*abilito pulsante annulla*/
		me.annullabile = true;
		
		me.cbaConfig.tipoTestata = 'Diari';		
		me.aggiornaDaTestata = true;
		var ctrlTestata = me.cbaConfig.controllerTestata;
		
		me.cbaConfig.sottoTipoTestata = ctrlTestata ? ctrlTestata.cbaConfig.controllerPageStd.cbaConfig.idModuloPrg : me.cbaConfig.sottoTipoTestata;
		me.filtriAggiuntivi = [];
		me.winFiltri = null;

		me.lookupReference('DescrDiario').setHtml(me.cbaConfig.controllerTestata.cbaConfig.controllerPageStd.nomeVideata);
		
		me.campiNascosti = {
			eventoAcuto: false,
			eventoEvidenzia: false,
			codPatologia: false,
			riservato: false,
			agenda: false, 
			indicazioniAss: false,
			alimentaPrePai: false,
			alimentaPrePri: false,
			alimentaPrePti: false		
		};
		//popolato dalle personalizzazioni
		me.campiAbilitati = {};

		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  me.cbaConfig.anagraficaCorrente.idRicovero;
		
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.gestioneForm();
		/*
		 *  NB: sono 4 chiamate async false, la prima scarica le personalizzazioni dei diari, 
		 *  la seconda chiamata si scarica le impostazioni del PAI, e la terza del PRI e l'utlima le informazioni relative all' utente password 
		 *  il campo abilitaPrePai: dipende se il flag presente in impo PAI è a TRUE e se il codAreaAnalisiPAI è true  allora il check è visibile
		 *  il campo abilitaPrePri: dipende se il flag presente in impo PAI è a TRUE e se il codAreaAnalisiPRI è true  allora il check è visibile
		 *  il campo abilitaPrePti: dipende se il flag presente in impo PAI è a TRUE e se il codAreaAnalisiPTI è true  allora il check è visibile
		 */
//		me.storeCbox = Ext.create('CS.accertamenti.CbPatologie',{ autoLoad: false });
//		me.lookupReference('CboxPatologie').setStore(me.storeCbox);
		
		me.caricaPersonalizzazioni();
		me.caricaImpoPai();
		me.caricaImpoPri();
		me.caricaTeAnaPers();
		
		me.generaFiltriRicerca();
		
		me.generaFiltriConsegne();
		
	},
	
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}


});
