Ext.define('CS.schede.schede.noppain.NoppainController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-noppain-noppain',
    
	beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var form = me.lookupReference('Form');
		if(form.dirty_oldIsDirty || !me.recordTestata){
			StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
			return false;
		}
		
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, true);
			newTab.down('#PnlFiltroGrafico').controller.generaGrafico();
			
		}else if(newTab.getItemId().indexOf('TabTest') != -1){
			StdCba.tapTabAndamento(form, false);
		}
	},
	
	changeStimaDolore:function(th,newValue,oldValue){
		var me = this;
		if(newValue > oldValue)
			me.punteggio = me.punteggio + (newValue - oldValue);
		else
			me.punteggio = (me.punteggio !=0 ? me.punteggio : 0) - (oldValue - newValue);

		me.aggiornaLabelPunteggio();
	},
	
	generaMenuFunzioni:function(th,e,menu){
		var me = this;
		if(me.bloccaForm){
			return false;
		}
		menu.showAt(e.getX(),e.getY());
	},
	
	disegnaDoloreLesione:function(imageName,xy){
		var me = this;
		var posx= 0;
		var posy = 0;
		var posxy = [];
		if(!Ext.isEmpty(xy)){
			me.XY = false;
			posx = (xy[0]);
			posy = (xy[1]);
			posxy.push(posx,posy);
		}
		if(imageName){
			var posizioneXY = me.XY ? me.XY : posxy;
			posx = posizioneXY[0];
			posy = posizioneXY[1];
			var lesione = Ext.getCmp('lesione');
			var dolore = Ext.getCmp('dolore');
			if(lesione && imageName == 'circle'){
				lesione.getEl().dom.style.left = (posx - 12)+ 'px';
				lesione.getEl().dom.style.top = (posy - 12)+ 'px';
				me.getPosLesioneL().setValue(posx);
				me.getPosLesioneT().setValue(posy);
				return false;
			}
			if(dolore && imageName =='x'){
				dolore.getEl().dom.style.left = (posx - 12)+ 'px';
				dolore.getEl().dom.style.top = (posy - 12)+ 'px';
				me.getPosDoloreL().setValue(posx);
				me.getPosDoloreT().setValue(posy);
				return false;
			}
			var img = Ext.create('Ext.Img',{
			   src:'/cba/css/generali/images/skval/'+imageName+'.png',
			   width:24,
			   style:'position:absolute',
			   id:imageName == 'circle' ? 'lesione' : 'dolore',
			   height:24,
			});
			me.getCntFiguraLesioneDolore().add(img);
			img.getEl().dom.style.left = (posx - 12) + 'px';
			img.getEl().dom.style.top = (posy- 12) + 'px';
			if(imageName == 'circle'){
				me.getPosLesioneL().setValue(posx);
				me.getPosLesioneT().setValue(posy);
				
			}else{
				me.getPosDoloreL().setValue(posx);
				me.getPosDoloreT().setValue(posy);
			}
		}
	},
	
	afterCntFiguraLesioneDolore:function(th){
		var me = this;
		var menu = Ext.create('Ext.menu.Menu', {
			items: [
				{
				   text: traduci('LESIONE'),
				   itemId:'BtnLesione',reference:'BtnLesione',
				   handler: function() {
					  me.disegnaDoloreLesione('circle',[]);											
				   }
				},
				{
					text: traduci('DOLORE'),
					itemId:'BtnDolore',reference:'BtnDolore',
					handler: function() {
						me.disegnaDoloreLesione('x',[]);	
					
					}
				},
				{
					text: traduci('ELIMINA'),
					itemId:'BtnEliminaTarget',reference:'BtnEliminaTarget',
					hidden:true,
					handler: function() {
						if(me.target == 'lesione'){
							me.getCntFiguraLesioneDolore().remove(Ext.getCmp('lesione'));
							me.getPosLesioneL().setValue('');
							me.getPosLesioneT().setValue('');
						}
						if(me.target == 'dolore'){
							me.getCntFiguraLesioneDolore().remove(Ext.getCmp('dolore'));
							me.getPosDoloreL().setValue('');
							me.getPosDoloreT().setValue('');
						}
					}
				}
			]
		});
		th.getEl().on('click',function(e){
			/*calcola le coordinare di click del mouse nel mio contenitore 
			recupero anche i targer per vedere se ho cliccato su un immagine*/
			me.XY = [];
			var posX = e.event.offsetX;
			var posY = e.event.offsetY;
			me.XY.push(posX,posY);
			if(e.target.id == 'lesione'){
				me.target = 'lesione';
			}
			if(e.target.id == 'dolore'){
				me.target = 'dolore';
			}
			menu.down('[itemId=BtnDolore]').setHidden(e.target.id == 'lesione' || e.target.id == 'dolore'  ? true :false );
			menu.down('[itemId=BtnLesione]').setHidden(e.target.id == 'lesione' || e.target.id == 'dolore'  ? true :false );
			menu.down('[itemId=BtnEliminaTarget]').setHidden(e.target.id == 'lesione' || e.target.id == 'dolore' ? false : true);
	    	me.generaMenuFunzioni(th,e,menu);
		});
	},
	
	calcolaPunteggioRadioSlider:function(th,newValue,oldValue){
		/*Funzione unica legate ai change di radiogroup e slider nel se è un radio mi prendo il suo name e ne verifico il valore 
		in caso contrario prendo il valore dello slider */
		var me = this;
		var key ='',
			incr = 0, decr;
			
		me.tmp_punteggio = me.punteggio;
		if(newValue == 'T' || (Ext.isNumber(newValue) &&  newValue > oldValue)){
			incr = Ext.isNumber(newValue) ? newValue - oldValue : 1;
			me.punteggio = me.tmp_punteggio + incr;
		}else if((newValue == 'F' && oldValue == 'T' )|| newValue < oldValue){
			
			decr = Ext.isNumber(newValue) ? oldValue - newValue : 1;
			me.punteggio = (me.tmp_punteggio != 0 ? me.tmp_punteggio - decr : me.tmp_punteggio);
		}
		me.aggiornaLabelPunteggio();
	},
	
	changeIndSlider:function(th,newValue,oldValue){
		var me = this;
		var radioG = th.up('container').up('container').down('cbaMultipleChoice');
		
		if (!me.onLoad) {
			if(newValue!=0){
				radioG.setValueExclusive('T');
			}else{
				radioG.setValueExclusive('F');
			}
		}
		me.calcolaPunteggioRadioSlider(th,newValue,oldValue);
	},
	
	changeInd:function(th,newValue,oldValue){
		var me = this;
		var slider = th.up('cbaMultipleChoice').up('container').down('slider');
		
		if(newValue == 'F'){
			slider.setValue(0);
			slider.setDisabled(true);
		}else
			slider.setDisabled(false);
		me.calcolaPunteggioRadioSlider(th,newValue,oldValue);
	},
	
	gestisciDolore:function(th,newValue,oldValue){
		var me = this;
		if(Ext.isEmpty(newValue)) 
			return false;
		var itemId, itemIdDolore, radioDolore, valoreDolore, valoreSvolgimento, itemIdSvolgimento, radioSvolgimento;
		itemId = th.up('cbaMultipleChoice').getItemId();
		itemIdSvolgimento = itemId.substr(0,itemId.length - 1) + 'S';
		radioSvolgimento = me.getCntCorpoDomande().queryById(itemIdSvolgimento);
		valoreSvolgimento = radioSvolgimento.getValueExclusive();

		if (!me.onLoad)
			radioSvolgimento.setValueExclusive('T');

		if(newValue == 'T')
			me.punteggio = me.punteggio + 1;
		else
			if(valoreSvolgimento == 'T' && oldValue == 'T')
				me.punteggio = me.punteggio != 0 ? me.punteggio - 1 : 0;
			
		me.aggiornaLabelPunteggio();  
	},
	
	gestisciSvolgimento:function(th,newValue,oldValue){
		var me = this;

		var itemId, itemIdDolore, radioDolore, valoreDolore, valoreSvolgimento;
		itemId = th.up('cbaMultipleChoice').getItemId();
		itemIdDolore = itemId.replace(/S/g, "R");
		radioDolore = me.getCntCorpoDomande().queryById(itemIdDolore);
		valoreDolore = radioDolore.getValueExclusive();
		
		if(newValue == 'F'){
			me.punteggio = (me.punteggio != 0 ? (valoreDolore == 'T' ? me.punteggio - 1 : me.punteggio) : 0);
			if (!me.onLoad) {
				radioDolore.setValueExclusive(false);
			}
		}

		me.aggiornaLabelPunteggio(); 
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina,
			btnCopia = form.createFabs.btnCopia,
			btnAnnulla = form.createFabs.btnAnnulla;
		
		btnNuovo.on('tap', function(){
			me.isCopia = false;
			me.nuovo = true;
			ControllerStd.nuovoRecord(form);
			StdCba.bloccaFormCss(form, false);
			me.bloccaForm = false;
			me.punteggio = 0;
//			me.getCntFiguraLesioneDolore().removeAll();
			me.aggiornaLabelPunteggio();
//			me.getFiltroAgenda().setValue(0);
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
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
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.noppain.NoppainStore');

		StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniSchede', function(controller, rec){
			if(!Ext.isEmpty(rec)) {
				controller.scadenzaDaImpoTest = rec.get('scadenza');
				controller.stopInterval = Ext.isEmpty(rec.get('scadenza'));
			}
		});
		
		form.on('dirtychange', function(th, isDirty) {
			if(isDirty)
        		StdCba.retrodatazione(th);
        	StdCba.btnNascondiMostra(isDirty, th);
        	me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(isDirty)
        	me.lookupReference('ComboValidita').setHidden(!isDirty);
			me.lookupReference('Totali').setHidden(isDirty);
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
	
	salvaForm:function(esci){
		var me = this;
		var obj = {};
		var form = me.lookupReference('Form');
		var risposte= form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		delete risposte.posDoloreL;
		delete risposte.posLesioneL;
		delete risposte.posLesioneT;
		delete risposte.posDoloreT;
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;

		var obj = {};
		
//		if(me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita)
//			risposte.progVisita = me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita;
		
		Ext.apply(risposte,{
			//id:risposte.id,
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: me.idRicovero,
			punteggioMassimo:me.punteggio,
			agenda:risposte.slider ? 'T' : 'F',
			posLesioneL:parseInt(me.getPosLesioneL().getValue()),
			posLesioneT:parseInt(me.getPosLesioneT().getValue()),
			posDoloreT:parseInt(me.getPosDoloreT().getValue()),
			posDoloreL:parseInt(me.getPosDoloreL().getValue())
		});
		
		
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},

	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		/*controllo campi obbligatori*/
		me.trovaErroriA = true;
		me.trovaErroriB = true;
		var containerRadio = [me.getRadioAS_AR(),me.getRadioBS_BR(),me.getRadioCS_CR(),me.getRadioDS_DR(),me.getRadioES_ER(),me.getRadioFS_FR(),me.getRadioGS_GR(),me.getRadioHS_HR(),me.getRadioIS_IR()];

		Ext.each(containerRadio, function(rec){
			
			var itemIdSvolgimento = rec.getItemId().substr(0,rec.getItemId().length - 3);
			var itemIdDolore = rec.getItemId().substr(0,rec.getItemId().length - 4) + 'R';
			
			var radioSvolgimento = me.getCntCorpoDomande().queryById(itemIdSvolgimento);
			var radioDolore = me.getCntCorpoDomande().queryById(itemIdDolore);

			if(me.trovaErroriA){
				if(Ext.isEmpty(radioSvolgimento.getValueExclusive()) || (radioSvolgimento.getValueExclusive() == 'T' && Ext.isEmpty(radioDolore.getValueExclusive()))){
					me.trovaErroriA = false;
					StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI_SEZIONE1');
				}
			}
		});
		/*Controlloer su campi dolore*/
		var rispostaDolore = me.getCntRispostaDolore().query('cbaMultipleChoice');
		Ext.each(rispostaDolore,function(rec){
			if(me.trovaErroriB){
				if(Ext.isEmpty(rec.getValueExclusive())){
					me.trovaErroriB = false;
					StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI_SEZIONE2');
				}
			}
		});
		if (messaggi.length == 0 && !form.isValid()){
			StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
		}
		return StdCba.msgShow('',messaggi); 	
	},
	
	aggiornaStore: function(idRecord){		
		var me= this;
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabTest'));
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			me.lookupReference('TotTest').hide();			
			StdCba.clearForm(me.lookupReference('Form'));
			me.lookupReference('DataRegistrazione').setValue(me.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			var controllerPageStd = me.cbaConfig.controllerPageStd,
				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
			pnlCompilatore.setLabelCompilatore('');
			if(idRecord || me.testataSelezionata){
				var form = me.lookupReference('Form');
				var store = me.storeForm;											
				store.load({
					params: {
						id: idRecord ? idRecord : me.testataSelezionata
					},
					callback: function(records,operation,success){
						if(success){
							var rec= records[0];
							me.onLoad = true;
							if(!Ext.isEmpty(rec)){								
								me.punteggio = 0;
								
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								/*TRASFORMO T A TRUE E F A FALSE E CHECKO CHECKBOX A TRUE*/
								var fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);

//								StdCba.cercaCbaMultipleChoice(form, rec);
							
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								me.bloccaForm = blocco;
								StdCba.bloccaFormCss(form, blocco);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
//								me.getCntFiguraLesioneDolore().removeAll();
//								var imageLesioneX = rec.get('posLesioneL');
//								var imageLesioneY = rec.get('posLesioneT');
//								var imageDoloreX = rec.get('posDoloreL');
//								var imageDoloreY = rec.get('posDoloreT');
								
//								var lesioneXY = [imageLesioneX,imageLesioneY];
//								var doloreXY = [imageDoloreX,imageDoloreY];
//								if(imageLesioneX && imageLesioneY){
//									me.disegnaDoloreLesione('circle',lesioneXY);
//								}
//								if(imageDoloreX && imageDoloreY){
//									me.disegnaDoloreLesione('x',doloreXY);
//								}						
//								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
//									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
//								}
//								if(me.soloUnaTestata)
//									me.disabilitaNuovoCopia();
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								me.lookupReference('TotTest').show();

								me.onLoad = false;

							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				me.lookupReference('TotTest').show();
				me.lookupReference('Form').setRecord_cba(); //risetto il valori del dirty
				me.punteggio = 0;
				me.aggiornaLabelPunteggio(false);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);

//				me.lookupReference('CntFiguraLesioneDolore').removeAll();
			}
			me.lookupReference('Form').createFabs.btnCopia.setHidden(!this.testataSelezionata);
		}	
	},
	
	aggiornaLabelPunteggio: function() {
		var me = this;	
		var descrizione = "";
		me.lookupReference('TotTest').setHtml('Tot. Punteggio: '+ me.punteggio+ '/50');
		//me.getDescrizionePunteggio().setHtml(descrizione);
	},
    
	init : function(){
		var me =this;
		this.callParent(arguments);
		me.punteggio = 0;
		var form= me.lookupReference('Form');
		form.controller=me;
		me.cbaConfig.tipoTestata = 'NopPain';
		me.cbaConfig.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  me.cbaConfig.anagraficaCorrente.idRicovero,
		me.gestioneForm();
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		me.caricaValidita();
		me.caricaStoreExtraDati();
//		me.setInfoPunteggio(me.getFieldInfoPunteggio(), 'NOTE_BIBLIOGRAFICHE', 'INFO_NOPPAIN');
//		me.getImgCalendario().addCls('agenda-no'); 
		
		//se ingresso da visiste
//		me.ingressoDaVisite();
		
		
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
