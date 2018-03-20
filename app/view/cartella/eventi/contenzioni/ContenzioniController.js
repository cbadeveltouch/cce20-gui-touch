Ext.define('CS.eventi.contenzioni.ContenzioniController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-eventi-contenzioni-contenzioni',
    
    
    tapBtnAllegati: function(th, e) {
		let larghezzaWin = 800,
			win = Ext.create('winCBA',{
				titolo: traduci('ALLEGATI') + '&nbsp;' + traduci('CONTENZIONE'),
		        name: 'GeneraliCS.standard.allegati.view.Allegati',
		        maximizable: false,
		        larghezzaWin: larghezzaWin,
		        altezzaWin: 700,
		        clsWin:'cbaCssBordoPopup',
		        configItem: {
		        	controllerTe: this,
		        	idTestata: this.testataSelezionata,
		        	solaLettura: this.cbaConfig.permesso == 'L' ? true : false,
		        	tipoBlocco: this.recordTestata.get('tipoBlocco'),
		        	tipo: '2C'
		        }
			});
		
		var x = th.getPosition()[0] + th.getWidth() - larghezzaWin,
			y = th.getPosition()[1] + th.getHeight();
		win.showAt(x,y);
		
		e.preventDefault();
	},
	
	updateNotification: function(countAttachmentsFromDe) {
		//se non ho ancora il record non ci sono ancora dettagli quindi esco
		if (!StdCba.cbaValidId(this.lookupReference('Form').getFields().id.getValue())) {
			return false;
		}
		let countNotifications;
		countNotifications = countAttachmentsFromDe;
//		StdCba.setBadgeText(this.lookupReference('BtnAllegati'), countNotifications, 'bottomright', 'lightgreen');
	},
	
	changeDataInizioCont: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(newValue) {
			me.lookupReference('DataRevisione').setHtml(StdCba.traduci('REVISIONE_IL')+':<strong>'+StdCba.FormattaData(newValue)+'</strong>');
//			me.lookupReference('DataFineCont').setMinDate(newValue);
		} else {
			me.lookupReference('DataFineCont').setMinValue(StdCba.cssCheckDataOraRegistrazione(this, this.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), this.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')));
		}
	},
	
	changeRadioConsenso: function(th, newValue, oldValue, eOpts){
		if(newValue == true) {
			this.lookupReference('BtnAllegati').up().setHidden(false);
			this.lookupReference('FieldStatoNec').setHidden(true);
		} else {
			this.lookupReference('BtnAllegati').up().setHidden(true);
			this.lookupReference('FieldStatoNec').setHidden(false);
		}
	},
	
	gestioneAgenda : function(){
		var me  = this;
		if(!me.slider || me.slider == 0 ){
			me.lookupReference('ImgCalendario').removeCls('agenda-si');
			me.lookupReference('ImgCalendario').addCls('agenda-no');
		}else {
			me.lookupReference('ImgCalendario').removeCls('agenda-no');
			me.lookupReference('ImgCalendario').addCls('agenda-si');
		}						
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
	
	changeCheckMonitoraggio: function(th, newValue, oldValue, eOpts){
		if(this.lookupReference('Form'). permesso == 'S'){
			if(newValue == true){
				this.lookupReference('NoteMonitoraggio').setHidden(false);
				this.lookupReference('BtnAttivita').setHidden(false);
			}else{
				this.lookupReference('NoteMonitoraggio').setHidden(true);
				this.lookupReference('BtnAttivita').setHidden(true);
			}
		}
		
		
	},
	
	changeCheckUltimoGGMese: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!me.onLoad){
			me.aggiornaDataProssimaRev();
		}
	},
	
	changeNbfRevisione: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!me.onLoad){
			me.aggiornaDataProssimaRev();
		}
		if(newValue == null) {
			me.lookupReference('CheckUltimoGGMese').setHidden(true);
			me.lookupReference('DataRevisione').setHidden(true);
		}else{
			let radio = me.lookupReference('RadioRevGiorniMesi').query('radiofield')
			if(radio[1].getChecked()){
				me.lookupReference('CheckUltimoGGMese').setHidden(false);
			}else{
				me.lookupReference('CheckUltimoGGMese').setHidden(true);
			}
			me.lookupReference('DataRevisione').setHidden(false);
		}
	},
	
	aggiornaDataProssimaRev: function(){
		var me = this;
		if(me.lookupReference('NbfRevisione').getValue()){
			var numGG = me.lookupReference('NbfRevisione').getValue();
			var tipoRev =  me.lookupReference('RadioRevGiorniMesi').query('radiofield')[1].getChecked();
			var ggReg = me.lookupReference('DataInizioCont').getValue();
			var checkUltimoGGMese = tipoRev == false ? false : me.lookupReference('CheckUltimoGGMese').getChecked();
			var ggDaConfrontare = checkUltimoGGMese ? Ext.Date.getLastDateOfMonth(ggReg) : ggReg;
			var ris;
			if(tipoRev == false){
				ris = Ext.Date.add(ggDaConfrontare,Ext.Date.DAY,numGG);
			}else if(tipoRev){
				ris = Ext.Date.add(ggDaConfrontare,Ext.Date.MONTH,numGG);
			}
			me.lookupReference('DataRevisione').setHtml(StdCba.traduci('REVISIONE_IL')+':<strong>'+StdCba.FormattaData(ris)+'</strong>');
		}
	},
	
	changeRadioRevGiorniMesi: function(th, newValue, oldValue, eOpts){
		var me = this;
		var campo = me.lookupReference('CheckUltimoGGMese');
		if(newValue != true)
			return false;
		
		if(th.getValue() == '1'){
			campo.setHidden(false);
		}else{
			campo.setHidden(true);
			campo.setValue(false);
			campo.getChecked(false);
		}
		if(!me.onLoad){
			me.aggiornaDataProssimaRev();
		}
	},
	
	changeRadioTutorInfo: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!Ext.isEmpty(newValue) && newValue == false){
			me.visualizzaField(me.lookupReference('TxtTutorInfo'),false);		
		}else{
			me.visualizzaField(me.lookupReference('TxtTutorInfo'),true);
		}
	},
	
	changeRadioOspiteInfo: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!Ext.isEmpty(newValue) && newValue == false){
			me.visualizzaField(me.lookupReference('TxtPercheOspiteInfo'),false);		
		}else{
			me.visualizzaField(me.lookupReference('TxtPercheOspiteInfo'),true);
		}
	},
	
	changeRadioFamInformato: function(th, newValue, oldValue, eOpts){
		var me = this;
		if(!Ext.isEmpty(newValue) && newValue == false){
			me.visualizzaField(me.lookupReference('TxtFamInformato'),false);		
		}else{
			me.visualizzaField(me.lookupReference('TxtFamInformato'),true);
		}
	},
	
	visualizzaField: function(field,value){
		var me = this;
		field.setHidden(value);
		//field.reset();
	},
	
//	clickBtnEliminaAllegato: function(th){
//		var me= this;
//		var grid= me.getGridAllegati();
//		var rec= grid.getSelectionModel().getSelection()[0];
//		if(rec){
//			controller_eliminaRecord(grid.getStore(),{
//					id: rec? rec.get('id') : ''
//				},
//				function(){
//					me.aggiornaStore();
//			});
//		}
//	},
	
//	selectItemGridAllegati: function(th, record){
//		var me = this;
//		if(me.tipoBlocco !== 'A' && me.tipoBlocco !== 'C' && this.getForm().permesso === 'S')
//			me.getBtnEliminaAllegato().setDisabled(false);
//	},
	
	rowtap: function(th){
		
		let recordSelected = th.getSelectable()._lastSelected;
		var pnl = Ext.create('CS.eventi.contenzioni.insert.FasceOrarieInsert', {
			cbaConfig: {
				recordSelected : recordSelected,
				controllerMain: this
			}
		});
		pnl.show();
	},
	
	beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var form= me.lookupReference('Form');
		
		if(newTab._itemId == 'TabNote'){
			if(form.dirty_oldIsDirty  || me.idTestataisEmpty){
				StdCba.msgShow('ATTENZIONE','COMPILARE_CONTENZIONI');
				return false;
			}else{
				StdCba.tapTabAndamento(form, true);
				
				if(this.cbaConfig.controllerInsert){
					this.cbaConfig.controllerInsert.aggiornaStore();
				}else{
					me.lookupReference('CntNote').removeAll();
					
					me.lookupReference('CntNote').add(Ext.create('CS.eventi.contenzioni.note.TabNote',{
						cbaConfig:{
							controllerContenzioni: me	
						}
					}));
				}
				
			}
		}else if(oldTab._itemId == 'TabNote'){
			StdCba.svuotaStore(oldTab.down('grid').getStore());
//			oldTab.down('#CntMain').removeAll();
			StdCba.tapTabAndamento(form, false);
		
		}else if(newTab.itemId == 'TabContenzioni'){
			
			
		}
	},
	
	clickBtnEliminaGridFasceOr: function(th, e){
		var me= this;
		var indexs;
		var grid= me.lookupReference('GridFasceOrarie');
		if(!me.lookupReference('Form').dirty_oldIsDirty){
			me.lookupReference('CampoDirty').setValue(new Date());
			me.formDirty = true;
		}
		
		var model = grid._selectable._selection._selectionModel; 
		var rec = model._selectedRecord;
		if(rec){
			StdCba.Messaggio('ATTENZIONE',StdCba.traduci('ELIMINA_RECORD')+'?','YESNO','QUESTION', false, 
				function(){	
					grid.getStore().remove(rec);
				},
				function(){
					return false;
				}
			);
		}
		e.preventDefault();
	},
	
	clickBtnNuovoGridFasceOr: function(th, e){
		var me= this;
		var grid = me.lookupReference('GridFasceOrarie');
		if(!me.lookupReference('Form').dirty_oldIsDirty){
			me.lookupReference('CampoDirty').setValue(new Date());
			me.formDirty = true;
		}
		
		var model = grid._selectable._selection._selectionModel;
		var store= grid.getStore();
		me.gestisciBottoniGrid(true);
		store.insert(0,{});
		model.select(0);
//		grid.getPlugin().startEdit(0,0);
		
		var pnl = Ext.create('CS.eventi.contenzioni.insert.FasceOrarieInsert', {
			cbaConfig: {
				controllerMain: me
			}
		});
		pnl.show();
		e.preventDefault();
		
	},
	
	gestisciBottoniGrid: function(valore){
		var me = this;	
//		me.lookupReference('BtnNuovoGridFasceOr').setDisabled(valore);
//		me.lookupReference('BtnEliminaGridFasceOr').setDisabled(valore);	
	},
	
	selectGrid:function(th,selected)
	{
		var me=this;
		var store=th.getStore();
		var index=store.indexOf(selected);
	},
	
	validateeditGrid: function(editor, context, eOpts){
		var messaggi= [];
		var record= context.newValues;
		
		return StdCba.msgShow('',messaggi);
	},
	
	canceleditGrid: function(editor, context, eOpts){
		var me =this;		
		me.gestisciBottoniGrid(false);
		if(me.formDirty){
			me.lookupReference('CampoDirty').reset();
			me.formDirty = false;
		}
		editor.grid.getStore().reload();
		Ext.each(editor.grid.getStore().data.items,function(i){
			if(Ext.Object.isEmpty(i.data)){
				editor.grid.getStore().remove(i);	
			}
		});
	},
	
	
	
	editGrid: function(editor, context, eOpts){
//		var me= this;
//		var record= context.record.getData(); //prendiamo record 
//		var form= editor.getEditor().lookupReference('Form');
//		form.controller= this;
//		form.store= context.view.getStore();
//		if(me.updateGrid){
//			context.grid.getStore().remove(context.record);
//			for(var i = 0;i < me.recGridFasceOrarie.length; i++){
//				if(me.recGridFasceOrarie[i] == context.record.data ){
//					me.recGridFasceOrarie.splice(i,1);
//				}
//			}
//			me.recGridFasceOrarie.push(context.newValues);
//			context.grid.getStore().insert(context.rowIdx,context.newValues);
//			return true;
//		}else{
//			context.grid.getStore().remove(context.record);
//			form.store.insert(0,context.newValues);
//			Ext.each(form.store.data.items,function(i){
//				if(Ext.Object.isEmpty(i.data)){
//					form.store.remove(i);	
//				}
//			});
//			me.recGridFasceOrarie.push(context.newValues);
//		}
//		me.gestisciBottoniGrid(false);
	},
	
	beforeeditGrid: function(editor, context, eOpts){
		var me = this;
		me.updateGrid = context.value ? true : false;
		me.lookupReference('CampoDirty').setValue(new Date());
		me.formDirty = true;
		if (editor.editing === true){ //mi dice se sono gia in edit 
			return false; //uscita
		}
		var f= editor.getEditor().getForm();		
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnCopia = form.createFabs.btnCopia,
			btnConsegna = form.createFabs.btnConsegna,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnConsegna.on('tap', function(){
			StdCba.tapBtnConsegna(me);
		});
		
		btnNuovo.on('tap', function(){
			me.lookupReference('GridFasceOrarie').getStore().clearFilter();
			StdCba.svuotaStore(me.lookupReference('GridFasceOrarie').getStore());
			ControllerStd.nuovoRecord(form);
			me.areaModificabile(false);
			StdCba.bloccaFormCss(form, false);
			me.recGridFasceOrarie = new Array();
			me.lookupReference('DataRevisione').setHidden(true);
			me.lookupReference('DataInizioCont').setValue(new Date());
			me.lookupReference('DataInizioCont').setReadOnly(false);
			me.lookupReference('DataFineCont').setReadOnly(false);

			me.lookupReference('RadioConsenso').setValueExclusive(true);
			me.lookupReference('BtnAllegati').setDisabled(true);
			
			me.lookupReference('LabelCompilatoreData').setHtml('');
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			me.aggiornaStore();
			
			me.lookupReference('CheckMotivoCont').setStyle('border','none');
			me.lookupReference('CheckMezziCont').setStyle('border','none');
		});
		
		btnCopia.on('tap', function(){
			me.clickCopia(me);
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			me.nuovo = false;
			//controllo che ci sia l'id compilato	
			me.nuovo = false;
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.recGridFasceOrarie = new Array();
							me.aggiornaStore();
					}
				);
			}else	StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		});
	},
	
	gestioneForm: function(){		
		var me= this;
		var form= me.lookupReference('Form');	
		
		form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';

		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L' ? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnCopia');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnConsegna');
		
		me.storeForm = form.store= Ext.create('CS.eventi.contenzioni.ContenzioniStore');
		
		form.on('dirtychange', function(th, isDirty) {
        	StdCba.btnNascondiMostra(isDirty, th);
        	if(isDirty){
        		StdCba.retrodatazione(th);
        		me.lookupReference('GridFasceOrarie').setHeight(200);
        		me.lookupReference('DataInizioCont').setValue(new Date());
        	}else{
        		me.lookupReference('GridFasceOrarie').setHeight(80);
        	}
        		
        	me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			StdCba.abilitaDisabilitaDataPicker(isDirty, me.cbaConfig.controllerPageStd);
			
			me.lookupReference('BtnNuovoGridFasceOr').setHidden(!isDirty);
			me.lookupReference('ColumnElimina').setHidden(!isDirty);
			me.lookupReference('RadioConsenso').setValueExclusive(isDirty);
			me.lookupReference('BtnAllegati').setDisabled(isDirty);
			
			var id = form.getFields().id.getValue();
			
			//si imposta nuovo record quando si hanno azioni di nuovo record
			if(isDirty && !StdCba.cbaValidId(id) ) {
				var controllerPageStd = me.cbaConfig.controllerPageStd,
    	 			pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
				pnlCompilatore.setNuovoRecord();
			}
		});
		
		if(form.permesso != 'S'){
			me.lookupReference('DataFineCont').setDisabled(true);
        	me.lookupReference('DataFineCont').setStyle('opacity', 1);
//        	form.boxBottoni.queryById('btnNuovo').setDisabled(true);
//        	form.boxBottoni.queryById('btnCopia').setDisabled(true);
		}
	},
	
	clickCopia: function(){
		var me = this;
		var s = me.storeForm;
		
		if(me.verificaCampiForm()){
			if(s.getCount() > 0){
				StdCba.Messaggio('ATTENZIONE', 'MSG_REV_CONT', 'YESNO', 'QUESTION', false, function(){
					Ext.Ajax.request({
						method:'GET',
						url:`${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/revisiona',
						params:{
							id:me.idTestata
						},
						success: function (response){
							var	risposta = Ext.JSON.decode(response.responseText);
							var messaggi = [];
							if(risposta.success){
								me.lookupReference('DataInizioCont').setReadOnly(false);
								me.lookupReference('DataInizioCont').setValue(new Date());
								me.lookupReference('LabelCompilatoreData').setHtml('');
								me.lookupReference('DataFineCont').setValue('');
//								me.cbaConfig.controllerTestata.getCntRegistrazioni().setDisabled(true);
//								me.getForm().boxBottoni.queryById('btnCopia').setDisabled(true);
								me.testataSelezionata = false;
//								me.getPnlCompilatore().setNuovoRecord();
								me.lookupReference('Form').getFields().id.setValue(-9999);
								StdCba.bloccaFormCss(me.lookupReference('Form'), false);
								
								me.revisione = true;
								me.verificaCampiForm();
								me.revisione = false;
								
								let controllerPageStd = me.cbaConfig.controllerPageStd;
								controllerPageStd.nuovo = Ext.Viewport.editMode = true;

								controllerPageStd.lookupReference('PnlCompilatore').setNuovoRecord();
								let	dataTestataInsert = me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'),
									oraTestataInsert = me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert'),
									dataTestata = me.cbaConfig.controllerTestata.lookupReference('DataTestata'),
									oraTestata = me.cbaConfig.controllerTestata.lookupReference('OraTestata'),
									idProfilo = CBA.parametriGenerali.idProfiloCss;
								
								StdCba.cssGetPolicyRetrodatazione(controllerPageStd, dataTestata, oraTestata, dataTestataInsert, oraTestataInsert, idProfilo);
								
								StdCba.msgAdd(messaggi, risposta.message);
							}else{
								StdCba.msgAddError(messaggi,risposta.message);	
							}	
							StdCba.msgShow(me.titolo,messaggi);
						}
					});
				},function(){
					return false;
				});
			}else StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
		}else{
			StdCba.Messaggio('ATTENZIONE', 'MSG_REG_CONV_SENZA_CAMPI', 'OK', 'QUESTION');
		}
		
	},
	
	salvaForm: function(esci){
		var me= this;
		var form= me.lookupReference('Form');
		var idTestata,
			fields = form.getFields();
		var newRecord= form.getValues();	
		newRecord = StdCba.convertiBool(newRecord, fields);
		newRecord = StdCba.campiTempInString(newRecord);	//genero i campi stringa, composti dai valori di più checkboxfield
		
		delete newRecord.dataRegAppo;
		delete newRecord.oraRegAppo;
		delete newRecord.campoDirty;
		delete newRecord.nomeFile;
		
		
		let mancatoConsenso;
		Ext.each(fields.mancatoConsenso, (field, i)=>{
			if(field.getChecked())
				mancatoConsenso = i
		});
		
		Ext.apply(newRecord,{
			compilatore: !Ext.isEmpty(newRecord.id) && parseInt(newRecord.id) > 0 ? newRecord.compilatore : CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: me.idRicovero,
			codEnte:CBA.parametriGenerali.codEnte,
			dataCompilazioneDataFine: !Ext.isEmpty(newRecord.id) && !Ext.isEmpty(newRecord.dataFine)? newRecord.dataFine : null,
			compilatoreDataFineFigProf: !Ext.isEmpty(newRecord.id) && !Ext.isEmpty(newRecord.dataFine)? CBA.moduli.modulo49.operatore.figuraProfessionale : null,
			compilatoreDataFineNominativo: !Ext.isEmpty(newRecord.id) && !Ext.isEmpty(newRecord.dataFine)? CBA.moduli.modulo49.operatore.descr : null,
			compilatoreDataFine: !Ext.isEmpty(newRecord.id) && !Ext.isEmpty(newRecord.dataFine)? CBA.moduli.modulo49.operatore.id : null,
			
			//TODO_PLS
			/*BUG non resetta il valore dei cbaMultipleChoice nella form al copia*/
			ospiteInformato: Ext.isEmpty(this.lookupReference('RadioOspiteInfo').getValueExclusive())? null : (this.lookupReference('RadioOspiteInfo').getValueExclusive() == true ? 'T' : 'F') ,
			familiareInformato: Ext.isEmpty(this.lookupReference('RadioFamInformato').getValueExclusive()) ? null: (this.lookupReference('RadioFamInformato').getValueExclusive() == true ? 'T' : 'F'),
			tutorInformato: Ext.isEmpty(this.lookupReference('RadioTutorInfo').getValueExclusive())? null : (this.lookupReference('RadioTutorInfo').getValueExclusive() == true ? 'T' : 'F'),
			consenso: Ext.isEmpty(this.lookupReference('RadioConsenso').getValueExclusive())? null :(this.lookupReference('RadioConsenso').getValueExclusive() == true ? 'T' : 'F'),
			mancatoConsenso: mancatoConsenso
		});	
		
		me.aggiornamentoTestata = true;
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;	//si cercano le testate in base alla data del record
		me.dataRecord = newRecord.data;
		delete newRecord.campoDirty;
		newRecord = StdCba.convertiBool(newRecord, fields);	//converto booleani
		Ext.apply(newRecord,{
					fasceOrarie:[],
					fasceDaCancellare:me.recDeleteArrayFasce
		});
		
		Ext.each(this.lookupReference('GridFasceOrarie').getStore().data.items, function(i){
			newRecord.fasceOrarie.push({
				id: /*(!Ext.isEmpty(i.get('id'))) ? i.id :*/ '-9999',
				idTe: /*(!Ext.isEmpty(form.getField().id.getValue())) ? form.getField().id.getValue() : */'-9999',
				inizio: i.get('inizio'),
				fine: i.get('fine')			
			});
		});
		if(ControllerStd.salvaRecord(form,newRecord)){
		}
	},
	
	dateSetMinValue: function(){
		var me = this;
		me.lookupReference('DataFineCont').clearInvalid();
	},
	
	areaModificabile: function(canEdit) {
		if(canEdit) {
			this.lookupReference('BtnAllegati').up().addCls('css-area-modificabile');
			this.lookupReference('BtnAllegati').up().setStyle('padding', '3px');
			this.lookupReference('DataFineCont').addCls('css-area-modificabile');
			this.lookupReference('DataFineCont').setStyle('padding', '3px');
		} else {
			this.lookupReference('BtnAllegati').up().removeCls('css-area-modificabile');
			this.lookupReference('BtnAllegati').up().setStyle('padding', '0px');
			this.lookupReference('DataFineCont').removeCls('css-area-modificabile');
			this.lookupReference('DataFineCont').setStyle('padding', '0px');
		}
	},
	
	aggiornaStore: function(idRecord){		
		var formFields = this.lookupReference('Form').getFields();
		this.testataAttuale = idRecord;
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'CONTENZIONI')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabContenzioni'));
		
		if(this.aggiornamentoTestata){
			this.aggiornamentoTestata = false;			
			this.cbaConfig.controllerTestata.aggiornaStore(idRecord);			
		}else{
			//svuoto form
			StdCba.clearForm(this.lookupReference('Form'));
			var controllerPageStd = this.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			
			if(idRecord || this.testataSelezionata){
				var form = this.lookupReference('Form');
				var store = this.storeForm;						
				store.load({
					params: {
						id: idRecord ? idRecord : this.testataSelezionata
					},
					callback: (records,operation,success)=>{
						if(success){
							var rec= records[0];
							if(!Ext.isEmpty(rec)){
								this.onLoad = true;
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								
//								StdCba.cercaCbaMultipleChoice(form, rec);
								
								//controllo stato bottone elimina = annullamento 
//								let btnElimina = me.lookupReference('Form').createFabs.btnElimina;
//								btnElimina.cbaConfig.disabled = btnElimina.isDisabled();
								
								this.sipcar1 = rec.get('schedaConvertita');
								
//								me.getBtnEliminaAllegato().setDisabled(true);
								
								//permessi scrittura
								let blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(this.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco);
								this.tipoBlocco = this.recordTestata.get('tipoBlocco');
								this.areaModificabile(this.tipoBlocco[0].valore === 'P');
								this.lookupReference('BtnAllegati').setDisabled(false);
								
								this.lookupReference('BtnNuovoGridFasceOr').setHidden(blocco);
								this.lookupReference('ColumnElimina').setHidden(blocco);	
								
								this.dateSetMinValue();
								
								var dataFine = this.lookupReference('DataFineCont');
								dataFine.setReadOnly( this.tipoBlocco[0].valore === 'C' );
								if(dataFine.readOnly == true) {
									dataFine.setMinValue();
									dataFine.clearInvalid();
								}
								
								this.idTestata = idRecord ? idRecord : this.testataSelezionata;
								this.idTestataisEmpty = false;
								
								form.setValues({
									dataRegAppo: new Date(rec.get('data')),
									oraRegAppo: new Date(rec.get('data'))
								});
								
								StdCba.caricaFieldString(this.lookupReference('Form'), rec.get('motivo'), 'motivo');
								StdCba.caricaFieldString(this.lookupReference('Form'), rec.get('mezzoContenzione'), 'mezzoContenzione');
								StdCba.caricaFieldString(this.lookupReference('Form'), rec.get('contenzioneQuando'), 'contenzioneQuando');
								this.lookupReference('GridFasceOrarie').getStore().clearFilter();
								StdCba.svuotaStore(this.lookupReference('GridFasceOrarie').getStore());
								
								Ext.each(rec.get('fasceOrarie'),(i,index)=>{
									this.lookupReference('GridFasceOrarie').getStore().add(i);
								});
								
								if(Ext.isEmpty(rec.get('fasceOrarie'))) 
									this.lookupReference('GridFasceOrarie').setHeight(80);
								
								//salvo il campi delle fasceOrarie ceh arrivano dal server
								this.recGridFasceOrarie = new Array();
								
								Ext.each(this.lookupReference('GridFasceOrarie').getStore().data.items,(i)=>{
									if(!Ext.isEmpty(i.data)){
										this.lookupReference('GridFasceOrarie').setHeight(200);
										this.recGridFasceOrarie.push(i.data);
									}
								});
								
								if( StdCba.cssHasBloccoModifica(this.recordTestata.get('tipoBlocco')) ) {
									this.lookupReference('DataInizioCont').setReadOnly(true);
//									me.lookupReference('BtnNuovoGridFasceOr').setDisabled(true);
//									me.lookupReference('BtnEliminaGridFasceOr').setDisabled(true);
								} else {
									this.lookupReference('DataFineCont').setReadOnly(false);
								}
								
								var dataRevisione = rec.get('dataCompilazioneDataFine');
								var dataCompilazione = rec.get('data');
								if((!Ext.isEmpty(dataRevisione)) && (!Ext.isEmpty(dataCompilazione))){
									if( (dataRevisione => dataCompilazione) && (this.tipoBlocco[0].valore === 'C' || this.tipoBlocco[0].valore === 'P') ){
										this.lookupReference('LabelCompilatoreData').setHtml(' <strong>'+StdCba.traduci('CHIUSO_DA')+': '+
															StdCba.FormattaData(rec.get('dataCompilazioneDataFine'))+'<br />'+
															StdCba.traduci('DA')+': '+rec.get('compilatoreDataFineNominativo')+'('+
															rec.get('compilatoreDataFineFigProf')+')</strong>');
									}else{
										this.lookupReference('LabelCompilatoreData').setHtml('');
									}
								}else{
									this.lookupReference('LabelCompilatoreData').setHtml('');
								}
								
								this.lookupReference('DataRevisione').setHtml(StdCba.traduci('REVISIONE_IL')+':<strong>'+StdCba.FormattaData(rec.get('dataRevisioneFormatted'))+'</strong>');
								
								//TODO_AMN gestione dell'agenda
								this.slider = 0;
								this.gestioneAgenda();
								
								let bloccoCopia = StdCba.cssGetBlocchi(this.recordTestata.data.tipoBlocco)[0];
								if(form.permesso == 'L' || bloccoCopia == 'DEL' || bloccoCopia == 'LOCK'){
									this.lookupReference('Form').createFabs.btnCopia.setHidden(true);
								}else{
									this.lookupReference('Form').createFabs.btnCopia.setHidden(false);
								}
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								StdCba.cssGestioneConsegna(rec, this);	
								this.onLoad = false;
								this.updateNotification( rec.get('numAllegati') );
								
								this.idTestataisEmpty = false;
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				let form = this.lookupReference('Form');
				this.areaModificabile(false);
				StdCba.svuotaStore(this.lookupReference('GridFasceOrarie').getStore());
				this.idTestataisEmpty = true;
				StdCba.bloccaFormCss(form, form.permesso != 'S');
				this.lookupReference('BtnAllegati').up().setHidden(true);
				form.createFabs.btnCopia.setHidden(true);
			}
		}
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');

		//controlli su data
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator)){
//			msgAddError(messaggi, dataValidator);
//		}
		if(Ext.isEmpty(me.sipcar1) || me.sipcar1 == 'F' || me.revisione){
			if (messaggi.length == 0 && !form.isValid()){
				StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
			}
			
			//CONTROLLO CHE I CHECK DEL GRUPPO MOTIVO CONTENIONE SIANO VALIDI
			/***********/
			var countItemMotivoContFalse = 0;
			var countItemsMotivoCont = me.lookupReference('CheckMotivoCont').items.items.length;
			var validMotivoCont = true;
			Ext.each(me.lookupReference('CheckMotivoCont').items.items, function(i,index){
				if(i.getChecked() == false){
					countItemMotivoContFalse++;
				}
			});
			
			if(countItemMotivoContFalse == countItemsMotivoCont){
				StdCba.msgAddError(messaggi,'CMP_MOTIVO_OBBLIGATORIO');
				validMotivoCont = false;
			}
			
			if(!validMotivoCont){
				me.lookupReference('CheckMotivoCont').setStyle('border','1px solid #CF4C35');
			}else{
				me.lookupReference('CheckMotivoCont').setStyle('border','none');
			}
			/***********/
			
			//CONTROLLO CHE I CHECK DEL GRUPPO MOTIVO CONTENIONE SIANO VALIDI
			/**********/
			var countItemMezzoContFalse = 0;
			var countItemsMezzoCont = me.lookupReference('CheckMezziCont').items.items.length;
			var validMezzoCont = true;
			Ext.each(me.lookupReference('CheckMezziCont').items.items, function(i,index){
				if(i.getChecked() == false){
					countItemMezzoContFalse++;
				}
			});
			
			if(countItemMezzoContFalse == countItemsMezzoCont){
				StdCba.msgAddError(messaggi,'CMP_MEZZO_OBBLIGATORIO');
				validMezzoCont = false;
			}
			/**********/
			
			//SETTO LO STYLE ROSSO DI ERRORE SUL CAMPO
			/**********/
			if(!validMezzoCont){
				me.lookupReference('CheckMezziCont').setStyle('border','1px solid #CF4C35');
			}else{
				me.lookupReference('CheckMezziCont').setStyle('border','none');
			}
			
			me.lookupReference('CheckMotivoCont').on('change',function(){
	       		me.lookupReference('CheckMotivoCont').setStyle('border','none');
	       	});
	       	
	       	me.lookupReference('CheckMezziCont').on('change',function(){
	       		me.lookupReference('CheckMezziCont').setStyle('border','none');
	       	});
	       	/**********/
		}
		return StdCba.msgShow('',messaggi);					
	},
	
	creaCampiDinamici: function(){
		var me = this;
		me.countCreazioneCampi = 0;
		var campiCnt = [me.lookupReference('CheckMotivoCont'), me.lookupReference('CheckMezziCont'), me.lookupReference('CheckQuandoUtConv')];
		var areaCampi = [6, 5, 6];
		var campiDom = [10, 50, 20];
		var nameCampi = ['motivo','mezzoContenzione','contenzioneQuando'];
		me.campiDinamici = [];
		
		Ext.each(campiCnt, function(i, index){
			me.campiDinamici.push({
				contenitore: i,
				tipoCampo: 'checkboxstring',
				url: `${CbaRootServer}`+'/cba/css/cs/ws/risposte/get',
				parametri: {
					codArea: areaCampi[index],
					codDomanda: campiDom[index],
					idProfilo: me.idProfilo
				},
				nameTemp: '_tmp_'+nameCampi[index]+'_'
			})
		});
		
		if(me.campiDinamici.length > 0){
			me.campiDinamici.forEach(function(i){
				StdCba.genFieldsDinamiciCss(i.contenitore, i.tipoCampo, i.url, i.parametri,i.nameTemp ? i.nameTemp : false, i.listeners ? i.listeners : false, function(){
					me.countCreazioneCampi++;
					if(me.countCreazioneCampi == me.campiDinamici.length){
						
//						if(callbackFn)	callbackFn();
//						me.lookupReference('Form').up('window').fireEvent('riposizionaWindow');
						me.aggiornamentoTestata = true;												
						me.aggiornaStore();
					}
				});
			});
		}
	},	
	
	init : function(){
		this.callParent(arguments);
		var me =this;
		var form= this.lookupReference('Form');
		
		this.cbaConfig.controllerTestata.lookupReference('DataTestataInsert').on('change', (th, newValue, oldValue) => {
//			this.lookupReference('DataFineCont').setMinDate(this.lookupReference('DataInizioCont').getValue() ? this.lookupReference('DataInizioCont').getValue() : newValue);
		});
		
		form.controller = this;
		//this.aggiornaDaTestata = true;
		this.idProfilo = CBA.parametriGenerali.idProfiloCss;
		this.idRicovero =  this.cbaConfig.anagraficaCorrente.idRicovero;
		this.permesso = this.cbaConfig.permesso ? this.cbaConfig.permesso : 'L';
		this.sipcar1 = '';
		this.countAllegati = 1;
		this.lookupReference('ComboMedico').getStore().load();
		this.cbaConfig.tipoTestata = 'Contenzione';
		this.recGridFasceOrarie = new Array();
		this.gestioneForm();

		/*abilito pulsante annulla*/
		this.annullabile = true;
		this.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		this.creaCampiDinamici();
		this.allegati = false;
		this.recDeleteArrayFasce =  new Array();
		this.idTestataisEmpty = false;
		this.cbaConfig.tipoConsegna =  'C';
		StdCba.cssCreaConsegna(this, this.cbaConfig.permesso);
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}
});
