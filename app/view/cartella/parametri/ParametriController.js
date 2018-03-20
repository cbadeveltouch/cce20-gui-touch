Ext.define('CS.parametri.ParametriController', {
    extend: 'CS.parametri.ParametriStdController',
    alias: 'controller.cartella-parametri-parametri',
    
    salvaForm: function(esci){
		var me = this;
		var form = me.lookupReference('Form');
		
		var newRecord = form.getValues();
		
		let fields = form.getFields();
		
		newRecord = StdCba.convertiBool(newRecord, fields);
		
		delete newRecord.tmpNote;
		delete newRecord.dataRegAppo;
		delete newRecord.oraRegAppo;
		delete newRecord.campoDirty;
		
		StdCba.eliminaCampiTmp(newRecord);
		
		Ext.apply(newRecord,{
			idRicovero: me.idRicovero,
			compilatore: CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			notePeso: null,
			mews:  null
		});
		
		me.aggiornamentoTestata = true;
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		me.dataRecord = newRecord.data;
		if(ControllerStd.salvaRecord(form,newRecord,esci, false, true)){	
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
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
		
		btnConsegna.on('tap', function(){
			StdCba.tapBtnConsegna(me);
		});
		
		btnNuovo.on('tap', function(){
			ControllerStd.nuovoRecord(form);
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
			me.resetControlli();
			me.bloccaControlli = false;
			//entro nella tab che ha permessi di scrittura nel caso in cui sono su una tab che ha solo L 
			me.ingressoTabScrittura();
			me.rimuoviWarning();
		});
		
		btnRipristina.on('tap', function(){
			me.aggiornamentoTestata = true;
			me.aggiornaStore(me.testataSelezionata ? me.testataSelezionata : null, function(){
				me.resetControlli();
			});
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			//controllo che ci sia l'id compilato	
			if(!Ext.isEmpty(id)){
				let messaggio = StdCba.setMsgOnDeleteRecWithConsegna(me);
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.aggiornaStore();
					},false, messaggio
				);
			}else	StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
	
	gestioneForm: function(){
		var me = this;
		var form = me.lookupReference('Form');

		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		/*INSERISCO L'AGENDA COME PULSANTE AGGIUNTIVO*/
		
		form.createFabs.btnConsegna ? form.createFabs.btnConsegna.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnConsegna');
		
        form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';
		me.storeForm = form.store= Ext.create('CS.parametri.ParametriStore');
		form.controller = me;
		
		
		 form.on('dirtychange', function(th, isDirty) {
			 if(isDirty)
	        		StdCba.retrodatazione(th);
			StdCba.btnNascondiMostra(isDirty, th);
	     	me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			StdCba.abilitaDisabilitaDataPicker(isDirty, me.cbaConfig.controllerPageStd);
	 		
	         //si imposta nuovo record quando si hanno azioni di nuovo record
			var id = form.getFields().id.getValue();
			
			//si imposta nuovo record quando si hanno azioni di nuovo record
			if(isDirty && !StdCba.cbaValidId(id) ) {
				var controllerPageStd = me.cbaConfig.controllerPageStd,
		 			pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
				pnlCompilatore.setNuovoRecord();
				
			}
	     });
		 
		 StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniParametri', (controller, rec)=>{
				if(!Ext.isEmpty(rec)) {
					this.vitaliController.lookupReference('CntAlcolDroghe').setHidden( !(rec.get('visualizzaTestAlcool') === 'T' || rec.get('visualizzaTestDroghe') === 'T') );
					this.vitaliController.lookupReference('CntAlcol').setHidden(rec.get('visualizzaTestAlcool') != 'T');
					this.vitaliController.lookupReference('CntDroghe').setHidden(rec.get('visualizzaTestDroghe') != 'T');
					/*  oltre a questa condizione bisogna verificare che la scheda sia presente in personalizzazioni */
				}
			});
		
	},
	
	caricaWarning: function(record){
		var me = this;
		
		/*chiamata per generazione warning*/
		Ext.Ajax.request({
            method:'GET',
            url:`${CbaRootServer}`+'/cba/css/cs/ws/warning/check',
            params:{
				progVisita: me.testataSelezionata,
				dataVisita: record.get('data'),
				idRicovero: me.idRicovero,
				idProfilo: me.idProfilo
            },
            success: function (response){
                var risposta = Ext.JSON.decode(response.responseText);
                var messaggi = [];
                if(risposta.success){
                    if(!Ext.isEmpty(risposta.data)){
						var records = risposta.data;
						Ext.each(records, function(rec){
							
							var cntWarning = me.lookupReference('Form').queryById( 'CntIconWarning_' + rec.codice );
							
							if(cntWarning) {
								cntWarning.cbaConfig.warning = true;
								cntWarning.removeAll();
								var image = Ext.create('Ext.Img', {
									src: 'resources/images/warning/alert.svg',
									width: 16,
									margin: '0 0 0 3',
									height: 16,
									cls: 'css-arancio'
								});
								cntWarning.add(image);
							}
						});
                    }
                }
            }
        });	
	},
	
	rimuoviWarning: function(){
		var me = this;
		var cntWarning, fieldset, image;
		/*rimuovo tutti i warning */
		Ext.each(me.cntParametri, function(rec){
			if(!rec.escludiDaParametri){
				if(rec.parametro && rec.tabRif == 'V'){
					cntWarning = me.lookupReference('Form').queryById('CntIconWarning_' + rec.parametro.getName().toUpperCase());
					cntWarning ? cntWarning.removeAll() : null;
				}else {
					fieldset = rec.parametro.up('fieldset');
					//cntWarning ? cntWarning = fieldset.legend: null;
					image = cntWarning ? cntWarning.down('image'): null;
					if(image)
						image.destroy();
				}
				cntWarning ? cntWarning.cbaConfig.warning = false : null;
			}
		});
	},
	
	caricaPermessiTabPanel: function(tabPanel, codVideata, codModulo, idProfiloPwdDe, callBackFn){
		var me = this;

		Ext.Ajax.request({
            method:'GET',
            async: false, //caso eccezionale dobbiamo fare una chiamata asicrona in modo da evitare problemi di render
            url:`${CbaRootServer}`+'/cba/css/cs/ws/pwd/videatepwd/getbycodvideata',
            params:{
            	codVideata: codVideata,
            	codModulo: codModulo,
            	idProfiloPwdDe: idProfiloPwdDe
            },
            success: function (response){
                var risposta = Ext.JSON.decode(response.responseText);
                var messaggi = [];
                if(risposta.success){
                	
                	tabPanel.cbaConfig.permesso = risposta.data.tipoPermesso;
                	if(risposta.data.tipoPermesso == 'N'){
                		tabPanel.tab.hide();
                		/* in caso di permesso videata == N la tab viene nascosta e seleziono l'altra  */
                		if(tabPanel.getItemId().indexOf('TabVitali') == 0) me.lookupReference('TabPanel').setActiveTab(me.lookupReference('TabClinici'));
                		else me.lookupReference('TabPanel').setActiveTab(me.lookupReference('TabVitali'));
                		
                	}else if(risposta.data.tipoPermesso == 'L'){
                		me.cbaConfig.controllerPageStd.cbaConfig.permesso = 'L';
                		tabPanel.tab.setIconCls('cbaCssLockPng') 		 //in questo caso  � tutto in sola lettura 
                		StdCba.containerSolaLettura(tabPanel, true);
                		
                	}
                }
            }
        });	
	},
	
	aggiornaStore: function(idRecord, callbackFn){		
		var me = this;
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);			
		}else{
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
						idProfiloPwdDe: CBA.parametriGenerali.idProfiloPwdDe
					},
					callback: function(records,operation,success){
						if(success){
							me.bloccaEvento = true;
							var rec = records[0];

							if(!Ext.isEmpty(rec)){
								
								/*Sospendo dirty sulla form*/
								form.dirty_suspendDirtyChange = true;
								form.setRecord_cba(rec);
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
//								StdCba.cercaCbaMultipleChoice(form, rec);
								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data'),
									
								});
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								if (me.lookupReference('TabPanel').getActiveItem().cbaConfig.permesso == 'L')
									StdCba.containerSolaLettura(me.lookupReference('TabPanel').getActiveItem(), true);
								
								
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								me.bloccaControlli = blocco;
								me.dataRegistrazione = rec.get('data');
								StdCba.bloccaFormCss(form, blocco);		
								
								me.rimuoviWarning();
								me.caricaWarning(rec);	
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								me.calcolaBMI(rec.get('peso'), rec.get('altezza'), rec.get('bmi'), me);
								
								me.setTabSelezionata();
								StdCba.cssGestioneConsegna(rec, me);
								/* funzione eseguita sul pulsante ripristina in modo che tutti i controlli sui valori vengano 
								 * nuovamente riazzerati*/
								if(callbackFn)
									callbackFn();
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				let form = me.lookupReference('Form');
				StdCba.bloccaFormCss(form, form.permesso != 'S'); //non posso metterlo sulla testata perche nella clearform sblocco i check e quindi devo ribloccarli
				me.ingressoTabScrittura();
				me.resetControlli();
			}
		}
	},
	
	ingressoTabScrittura: function() {
		var me = this;

		var tabPanelAttivo = me.lookupReference('TabPanel').getActiveItem();
		var nextTab = tabPanelAttivo.getItemId() == 'TabVitali' ? me.lookupReference('TabClinici') : tabPanelAttivo;
		if (tabPanelAttivo.cbaConfig.permesso == 'L') {
			if (nextTab.cbaConfig.permesso == 'S'){
				me.lookupReference('TabPanel').setActiveItem(nextTab);
			}
		}	
	},
	
	resetControlli: function(){
		var me = this;
		Ext.each(me.cntParametri, function(rec){
			if(!rec.escludiDaParametri){
				if(rec.parametro && rec.tabRif == 'V'){
					if(rec.parametro.cbaConfig.forzaControllo){
						delete rec.parametro.cbaConfig.forzaControllo;
					}
				}
			}
		});
	},
	
	setTabSelezionata: function(){
		var me = this;
		
		let tabVitali = me.lookupReference('TabVitali'),
			tabClinici = me.lookupReference('TabClinici');
			
		if(tabVitali.cbaConfig.permesso == 'N' || tabClinici.cbaConfig.permesso == 'N') //questo caso qui � gia stato gestito sull' onLaunch blocco lo spostamento della tab
			return false;
		
		/* ritorna true se la tab e vuota altrimenti se false  la tab compilata */
		var tabVitaliVuota = me.tabPanelDefault(me.cntParametri, 'V'),
			tabCliniciVuota = me.tabPanelDefault(me.cntParametri, 'C');
		
		/* serie di controlli per decidere su quale tab posizionarmi in base alla loro compilazione */

		if (tabVitaliVuota && tabCliniciVuota || !tabVitaliVuota && !tabCliniciVuota) {
			me.lookupReference('TabPanel').setActiveItem(me.lookupReference('TabPanel').getActiveItem());
			return false;
		}

		if(!tabVitaliVuota)
			me.lookupReference('TabPanel').setActiveItem(tabVitali);
		else if(!tabCliniciVuota) {
			me.lookupReference('TabPanel').setActiveItem(tabClinici);
		}
		
	},
	
	tabPanelDefault: function(campi, key){
		var me = this;
		let parametro, campoCompilato,  tmp_array = new Array(), result = true; 
		
		tmp_array = me.cercaObjSinArray( campi, key, 'tabRif' ); //filtro il mio vettore di obj per tab di riferimento
		if(tmp_array.length > 0) {
			Ext.each(tmp_array, function(i){
				if(i.parametro.xtype == 'cbaMultipleChoice'){
					//i.parametro.getChecked() == 'T'; //TODO_PLSverificare che funzioni
				}else{
					campoCompilato = !Ext.isEmpty(i.parametro.getValue());
				}

				if (campoCompilato){
					result = false;
					return false;
				}
			});
		}
		return result;	
	},
	
	cercaObjSinArray: function(array, value, property) {
		var tmpArray = new Array();
		Ext.Array.findBy(array, function(i, idx){
			if(i[property] == value) tmpArray.push(i);
		});
		return tmpArray;
	},
	
	controllaValori: function(elemento, nomeParametro, valoreMin, valoreMax, fn){
		var me = this;
		//elemento.setFieldStyle('background: none');

		if(me.bloccaControlli || elemento.cbaConfig.forzaControllo)
			 return false;
		
		if(( !Ext.isEmpty(elemento.getValue()) && elemento.getValue() < valoreMin || elemento.getValue() > valoreMax )){
			let textMsg = StdCba.traduci('MSG_CAMPI_W_RANGE') +' '+ StdCba.traduci(nomeParametro) + StdCba.traduci('MSG_CAMPI_W_RANGE2') + valoreMin + ' e ' + 	valoreMax + StdCba.traduci('MSG_CAMPI_W_RANGE3')
			Ext.Msg.confirm('ATTENZIONE' ,textMsg, function(buttonId){
				if(buttonId == 'no'){
					elemento.setValue(elemento.cbaConfig.originalValue);
					elemento.focus();
				}else{
					elemento.cbaConfig.forzaControllo = true;
					elemento.cbaConfig.originalValue  = elemento.getValue();
				}
			});
		}
	},
	
	inizzializzaParametri: function(){
		var me = this,
			form = me.lookupReference('Form'),
			component;
		
		Ext.each(me.cntParametri, function(rec, index){
			component = form.queryById(rec.parametro.getItemId());
			if (component) {
				component.cbaConfig.tabRif = rec.tabRif;
				component.cbaConfig.nomeCampo = rec.nomeCampo;
			}
			if (rec.abilitaBlur) {
				rec.parametro.on('blur', function(th) {
				
					if (rec.attivaControlli) {
						var errori = false;
						if (rec.fnConfronta) {
							errori = rec.fnConfronta[0](th, rec.fnConfronta[1], rec.fnConfronta[2]);
							if (errori) {
								return;
							}
						}
						me.controllaValori(th, rec.nomeCampo, rec.valoreMin, rec.valoreMax);
					}

					if (rec.fnExtraBlur) {
						rec.fnExtraBlur(th, me);
					}
				});
			}
			if (rec.abilitaFocus) {
				rec.parametro.on('focus', function(th) {
					me.salvaDati(th);
				});
			}			
		});
	},
	
	salvaDati: function(th){
		var me = this;
		th.cbaConfig.originalValue = th.getValue();
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form = this.lookupReference('Form'), 
			result = false,
			schedaVuota = true;
			
		//controlli su data TODO_PLS insert date in insert
//		var dataF = me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert');
//		var dataValidator = dataF.validator(dataF);
		
		var id= form.getFields().id.getValue();
		
//		if(dataValidator && Ext.isString(dataValidator))
//			StdCba.msgAddError(messaggi, dataValidator);
//		
		
		let array_method_getValue = [
			['CbaUtils.componenti.all.CbaMultipleChoice', 'getValueExclusive']
		];
		
		me.cntParametri.forEach(rec => {
			
			if(rec.parametro.$className === 'CbaUtils.componenti.all.CbaMultipleChoice'){
				if (!Ext.Object.isEmpty(rec.parametro.getValueExclusive())) {
					schedaVuota = false;
				}
			}else{
				if (!Ext.isEmpty(rec.parametro.getValue())) {
					schedaVuota = false;
				}
			}
		});	
				
		if (schedaVuota) {
			StdCba.msgAddError(messaggi, StdCba.traduci('MSG_SCHEDA_PARAMETRI_VUOTA'));
		}
		
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}
		
		if(!Ext.isEmpty(messaggi)){
			return StdCba.msgShow('',messaggi);
		}else{
			return true;
		}
			

	},
	
	compilaNoteConsegna: function(th) {
		var me = this;		
		//recupero il controller  dalla view delle consegne  e mi prendo il campo testoConsegna
		var ctrlConsegna = th.up('#CntOpzioni').controller,/* th.up('fieldset').controller,*/
			campoNoteConfermato = ctrlConsegna.lookupReference('TestoConfermato'),
			campoNote = ctrlConsegna.lookupReference('TestoConsegna'),
			noteConsegna = '',
			valCampo = null,
			table = '',
			fieldCkGroup = th.up(),
			checkNote = fieldCkGroup.down('#CheckNote'),
			checkParametri = fieldCkGroup.down('#CheckParametri');
		
		campoNote.setHtml(null);
		
		//costruzione tabella
		table += '<table class="tableBorder" style="width: 90%;">';
	
		table += '<caption style="font-weight: bold; margin-bottom: 8px;">' 
					+ StdCba.traduci('SITUAZIONE_PARAMETRI')
				+ '</caption>';
		
		//titolo delle colonne
		table += '<tr>' 
					+ '<th style="text-align: left;">Parametro</th>'
			     	+ '<th style="text-align: left; width: 20%;">Valore</th>'
			     	+ '<th style="text-align: left; width: 20%;">U.M</th>'
			    +'</tr>';
		
		if (checkParametri.getChecked() === true && checkParametri.getName() == 'parametri') {
			
			me.cntParametri.forEach(
				function(rec) {
					if (rec.getValoreCampo) { 
						valCampo = rec.getValoreCampo();
						if (!Ext.isEmpty(valCampo)) {
							var unitaMisura =  !Ext.isEmpty(rec.unitaMisura) ? '(' + StdCba.traduci(rec.unitaMisura) + ')' : '';
							table += '<tr><td>' + StdCba.traduci(rec.nomeCampo) + '</td><td width="45%";>' + valCampo + '</td><td width="20%">' + unitaMisura + '</td></tr>';
						}
					}
				}
			);
			
			//recupero il paziente lamenta dolori si/no 
			
			var valore = StdCba.traduci(me.vitaliController.lookupReference('RadioMalattiaAcuta').getValueExclusive() == 'T' ? 'SI': 'NO');
			table +='<tr><td>' + StdCba.traduci('LAMENTA_DOLORI') + '</td><td>' + valore  + '</td></tr>';
		}
		//verifico campo note
		if (checkNote.getChecked() == true) {
			table += '<tr><td colspan="3">'+  me.vitaliController.lookupReference('Note').getValue() + '</td></tr>';
		}
		//chiudo tabella
		table += '</table>';
		
		if (!Ext.isEmpty(table)) {
			noteConsegna = table;
		}
		if (ctrlConsegna.annullaConsegna) {
			noteConsegna =  campoNote.cbaConfig.deleteText + '<br><br>'  +  noteConsegna;
		}
		
		campoNote.cbaConfig.testoHtml = true; //per stampare html utilizzo un container
		
		campoNote.setHtml(noteConsegna);
		campoNote.cbaConfig.extraTesto = noteConsegna;
			
	},
	
	filtriPerson: function() {
		var me = this;
		var items =  [
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
							labelAlign: 'right',
							itemId: 'CheckParametri', reference: 'CheckParametri',
				            name : 'parametri',
				            label: StdCba.traduci('PARAMETRI'),
				            width: 100,
				            labelWidth: 80,
				            margin: '0 3 0 15',
							inputValue: true,
							listeners: {
								change: function(th, newValue, oldValue) {
									me.compilaNoteConsegna(th);
								}
							}
						},
						{
							xtype: 'checkboxfield',
							labelAlign: 'right',
							width: 80,
							labelWidth: 60,
							margin: '0 3 0 0',
							itemId: 'CheckNote', reference: 'CheckNote',
				            label: StdCba.traduci('NOTE'),
							name: 'noteCheck',
							inputValue: true,
							listeners: {
								change: function(th, newValue, oldValue) {
									me.compilaNoteConsegna(th);
								}
							}
						}
					]
				}

		];
		return items;
	},

	fnInizializzaFiltri: function(ctrl) {
		/* inizilizzo i filtri   */
		var me = this.controllerForm;
		let formConsegne = ctrl.lookupReference('Form');
		formConsegne.setRecord_cba(formConsegne.getValues());
		if (ctrl.nuovaConsegna) {
			ctrl.lookupReference('CntOpzioni').down('#CheckParametri').setChecked(true);
			if(!Ext.isEmpty(me.vitaliController.lookupReference('Note').getValue()) )
				ctrl.lookupReference('CntOpzioni').down('#CheckNote').setChecked(true);
		}
			
	},
	
	isWarning: function(campo) {
		var name = campo.name.toUpperCase(),
			cntWarning = campo.parametro.up('#Form').down('#CntIconWarning_' + name);
		return (cntWarning ? cntWarning.cbaConfig.warning : false);
	},
	
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		
		let form = me.lookupReference('Form');
		form.controller = me;
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.aggiornaDaTestata = true;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.cbaConfig.tipoTestata = 'Visite';
		me.idRicovero =  me.cbaConfig.anagraficaCorrente ? me.cbaConfig.anagraficaCorrente.idRicovero : null;
		me.cbaConfig.tipoConsegna = 'V';
		
		this.lookupReference('TabVitali').add(Ext.create('CS.parametri.TabVitali',{
			cbaConfig:{
				parametriController: this
			}
		}));
		this.lookupReference('TabClinici').add(Ext.create('CS.parametri.TabClinici',{
			cbaConfig:{
				parametriController: this
			}
		}));
		
		me.caricaPermessiTabPanel(me.lookupReference('TabClinici'), 'Parametri Clinici', 49, CBA.parametriGenerali.idProfiloPwdDe);
		me.caricaPermessiTabPanel(me.lookupReference('TabVitali'), 'Parametri Vitali', 49, CBA.parametriGenerali.idProfiloPwdDe);
		me.gestioneForm();
		
		StdCba.cssCreaConsegna(me, me.cbaConfig.permesso, false, me.filtriPerson(), me.fnInizializzaFiltri);
		
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.storeForm.controller = me;
		
		this.inizzializzaParametri();

	},
	destroy: function(){
	    this.callParent();
	}

});
