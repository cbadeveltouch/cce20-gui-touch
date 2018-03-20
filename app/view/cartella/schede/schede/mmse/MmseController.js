Ext.define('CS.schede.schede.mmse.MmseController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-mmse-mmse',
    
    beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var form = me.lookupReference('Form');
		if(form.dirty_oldIsDirty || !me.recordTestata){
			StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
			return false;
		}
		
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, true);
			
			newTab.down('panel').lookupController().generaGrafico();
			
		}else if(oldTab.getItemId().indexOf('TabAndamento') != -1){
			StdCba.tapTabAndamento(form, false);
		}
	},
	
    changeNonSomministrabile:function(th,newValue, oldValue){
		var me = this;
		me.nonSomministrabile = newValue;
		if(me.nonSomministrabile){
			me.annullaTest = true;
		}else{
			me.annullaTest = false;
		}
		me.aggiornaLabelPunteggio();		
	},
	
	calcolaIdAllegato: function(th){
		var me = this;
		var id= me.lookupReference('Form').getFields().id.getValue();
		if(!id || id < 0 )
			me.creaDisegno();
		else{
			Ext.Ajax.request({
				method:'GET',
				url:`${CbaRootServer}`+'/cba/css/cs/ws/allegati/listByTipo',
				params:{
					 idTestata: id,
					 compilatore: CBA.moduli.modulo49.operatore.id,
					 tipo: '3A'
				},
				success: (response) =>{
					var	risposta = Ext.JSON.decode(response.responseText);
					var messaggi = [];
					if(risposta.success){
						if(!Ext.isEmpty(risposta.data)){
							var r = risposta.data;
							Ext.each(r,(i)=>{
								StdCba.openAttachment(i.id);
							});
						}else
							StdCba.Messaggio('ATTENZIONE','NESSUN_DISEGNO','OK','WARNING');
					}
				}
			}); 
		}	
	},
	
	creaDisegno:function(){
		var me = this;
		var pnl = Ext.create('Ext.Panel', {
			itemId: 'PnlWindow', reference:'PnlWindow',
			cbaConfig:{
				controllerForm:me,
			},
			header:false,
			layout: {
				type:'vbox',
				align: 'stretch'
			},
			width: '100%',
		    height: '100%',
		    floated: true,
		    modal: true,
		    hideOnMaskTap: true,
		    flex: 1
		});
		var main = Ext.create('Ext.Panel', {
			layout:{
				type:'vbox',
				align:'stretch'
			},
			flex:1,
			items:[
				{
					xtype:'container',
					layout:{
						type:'hbox',
						align: 'start'
					},
					items:[
						{
							xtype:'image',
							height:100,
							width:200,
							src:'resources/images/skval/MMSE.png',
						},	
						{
							xtype:'container',
							margin:'0 0 0 15',
							height:100,
							style: 'border-bottom:1px solid #C3DAF9',
							layout:{
								 type: 'hbox', 
								 align: 'bottom'
							},
							pack:'bottom',
							flex:1,
							items:[
								{
									xtype:'image',
									id:'IconGomma',
									src:'resources/images/skval/gomma.png',
									width:32,
									height:32
								},
								{
									xtype:'image',
									id:'IconPenna',
									src:'resources/images/skval/pencil.png',
									width:32,
									height:32
								}	
							]
						}
					]	
				},
				{
					xtype:'container',
					layout:{
						type:'vbox',
						align:'stretch'
					},
					flex:1,
					width: '100%',
					border:2,
					html: '<canvas id="mycanvas" width="'+ screen.width +'" height="'+ ( screen.height - 216) + '" style=""></canvas>',
				},
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{
							text: 'Esci',
							cls:'cbaCssBtnFunzione',
							handler: function() {
								this.up('panel').up('panel').close();
							}
						},
						{
							text: 'Salva',
							itemId: 'Salva', reference: 'Salva',
							id:'salva',
							cls:'cbaCssBtnFunzione',
							handler: function() {
								var me = this;
								var canvas = document.getElementById('mycanvas');
								var idRicovero = CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero;
								var descrizione = '';
								var nominativo = CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.nominativo;
								var nomeFiel = nominativo+'_'+ Ext.Date.format(new Date(), 'd-m-Y')+'.png';
								var myConfig = me.up('#PnlWindow');
								var id = myConfig.cbaConfig.controllerForm.lookupReference('Form').getFields().id.getValue();
								if(!id || id < 0){
									if(!myConfig.cbaConfig.controllerForm.disegnoCreato){
										myConfig.cbaConfig.controllerForm.allegato  = {};
										myConfig.cbaConfig.controllerForm.disegnoCreato = true;
									}
								}
								StdCba.Messaggio('ATTENZIONE', 'CONFERMA_CREA_DISEGNO', 'YESNO', 'QUESTION', false, 
								function(){	
									
									myConfig.cbaConfig.controllerForm.src = canvas.toDataURL('image/png');
									var base64 = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/,'');
									Ext.apply(myConfig.cbaConfig.controllerForm.allegato,{
										id:-9999,
										compilatore: CBA.moduli.modulo49.operatore.id,
										idRicovero:idRicovero,
										nomeFile:nomeFiel,
										idTestata:id,
										tipo:'3A',
										base64:base64
									});
									pnl.close();
									
								},function(){
									myConfig.cbaConfig.controllerForm.disegnoCreato = false;
									
								});	
								myConfig.cbaConfig.controllerForm.lookupReference('BtnDisegna').setDisabled(myConfig.cbaConfig.controllerForm.disegnoCreato);
								myConfig.cbaConfig.controllerForm.lookupReference('BtnVisualizzaDisegno').setDisabled(!myConfig.cbaConfig.controllerForm.disegnoCreato);
							}
						}
					]
				}
			]
					
		});
		
		main.on('painted', function(th){
			var btnSalva = Ext.getCmp('salva');
			btnSalva.setDisabled(pnl.cbaConfig.controllerForm.disegnoCreato);
			
			if(pnl.cbaConfig.controllerForm.disegnoCreato){
				main.insert(1,Ext.create('Ext.Img',{
					src:pnl.cbaConfig.controllerForm.src,
					width: '80%',
					height: ( screen.height - 216)
				}));
				return false;
			}	
			var canvas = document.getElementById('mycanvas'),
				ctx = canvas.getContext("2d"),
				flag = false,
				prevX = 0,
				currX = 0,
				prevY = 0,
				currY = 0,
				dot_flag = false,
				x = "black",
				y = 2;
			var toolGomma = th.queryById('IconGomma');
			var toolPenna = th.queryById('IconPenna');
			toolGomma.on('tap', function(){
				x = 'white';
				y=20;
				canvas.style.cursor ='url(resources/images/skval/gomma.png),auto';
			});
			toolPenna.on('tap', function(){
				x = 'black';
				y=2;
				canvas.style.cursor ='url(resources/images/skval/pencil.png),auto';
			});
			canvas.addEventListener("touchmove", function (e) {
				findxy('move', e);
			}, false);
			canvas.addEventListener("touchstart", function (e) {
				findxy('down', e);
			}, false);
			canvas.addEventListener("touchend", function (e) {
				findxy('up', e);
			}, false);
			canvas.addEventListener("touchout", function (e) {
				findxy('out', e);
			}, false);
			var findxy = function(res,e){
				if (res == 'down') {
					prevX = currX;
					prevY = currY;
					currX =e.changedTouches[0].clientX// e.offsetX;
					currY =e.changedTouches[0].clientY - 90//e.offsetY +30; //per icona pencil 

					flag = true;
					dot_flag = true;
					if (dot_flag) {
						ctx.beginPath();
						ctx.fillStyle = x;
						ctx.fillRect(currX, currY, 2, 2);
						ctx.closePath();
						dot_flag = false;
					}
				}
				if (res == 'up' || res == "out") {
					flag = false;
				}
				if (res == 'move') {
					if (flag) {
						prevX = currX;
						prevY = currY;
						currX =e.changedTouches[0].clientX// e.offsetX;
						currY =e.changedTouches[0].clientY - 90//e.offsetY +30; //per icona pencil 
						draw();
					}
				}
			};
			var draw = function(){
				ctx.beginPath();
				ctx.moveTo(prevX, prevY);
				ctx.lineTo(currX, currY);
				ctx.strokeStyle = x;
				ctx.lineWidth = y;
				ctx.stroke();
				ctx.closePath();
			};
			canvas.style.cursor ='url(resources/images/skval/pencil.png),auto';
			
		});
		
		pnl.add(main);		
		pnl.show();
	},
	
	disegna:function(th){
		var me =this;
		var id= me.lookupReference('Form').getFields().id.getValue();
		Ext.Ajax.request({
			method:'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/allegati/listByTipo',
			params:{
				 idTestata: id,
				 tipo: '3A'
			},
			success: function (response){
				var	risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				if(risposta.success){
					if(!Ext.isEmpty(risposta.data)){
						StdCba.Messaggio('ATTENZIONE','DISEGNO_GIA_CREATO','OK','WARNING');
					}
						
				}else me.creaDisegno();	
					
			}
		}); 
	},
	
	fullScreen:function(){
		var me = this;
		var pnl= Ext.create('Ext.Panel',{
			layout: {
				type:'vbox',
				align: 'stretch'
			},
			width: '100%',
		    height: '100%',
		    floated: true,
		    modal: true,
		    hideOnMaskTap: true,
		    flex: 1,
			items:[
				{
					xtype:'container',
					flex:1,
					layout:{
						type:'vbox',
						align:'stretch',
					},
					items:[
						{
							
							xtype:'container',
							layout:{
								type:'vbox',
								align:'center',
								pack:'center'
							},
							flex:1,
							items:[
								{
									xtype:'label',
									html:'<span style="font-size:90px;font-style:bold;">CHIUDA GLI OCCHI<span>'
								}
							]	
						}
					]
				}
			]
			
		});
		pnl.show();
		
		pnl.on('painted', function(th){
			var cnt = th;
			cnt.el.on('tap',function(){
				pnl.close();
			});
		})
	},

	calcolaPunteggio:function(th,newValue,oldValue){
		var me = this;
		var radioGroup = th.up('cbaMultipleChoice');
		if(newValue){
			var valGroup = Ext.isEmpty(oldValue) ? '' : oldValue;
			var valore = parseInt(newValue);
			me.punteggio = me.punteggio - (Ext.isEmpty(valGroup) ? 0 : valGroup) + (Ext.isEmpty(valore) ? 0 : valore);
		}else
			me.punteggio = 0;
		
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
			if(me.nonSomministrabile){ 
				me.getFieldInfoPunteggio().legend.removeAll();
			}
			me.disegnoCreato = false;
			StdCba.bloccaFormCss(me.lookupReference('Form'), false, true);
			me.lookupReference('BtnVisualizzaDisegno').setDisabled(true);
			me.lookupReference('CheckNonSomministrabile').setChecked(false);
			me.lookupReference('FiltroAgenda').setValue(0);
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			me.nuovo = false;
			//controllo che ci sia l'id compilato
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							me.aggiornamentoTestata = true;
							me.aggiornaStore(id);
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
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.mmse.MmseStore');
		form.controller= me; //associo il controller alla form
		
		if(form.permesso == 'S'){
            form.on('dirtychange', function(th, isDirty) {
            	if(isDirty)
            		StdCba.retrodatazione(th);
            	StdCba.btnNascondiMostra(isDirty, th);
            	me.cbaConfig.controllerPageStd.nuovo = isDirty;
    			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
    			StdCba.abilitaDisabilitaDataPicker(isDirty, me.cbaConfig.controllerPageStd);
    			me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(isDirty)
            	me.lookupReference('CntEdit').setHidden(!isDirty);
    			me.lookupReference('Totali').setHidden(isDirty);
                //si imposta nuovo record quando si hanno azioni di nuovo record
    			var id = form.getFields().id.getValue();
                if(isDirty && !StdCba.cbaValidId(id) ) {
                	var controllerPageStd = me.cbaConfig.controllerPageStd,
    	 				pnlCompilatore = controllerPageStd.lookupReference('PnlCompilatore');
                	pnlCompilatore.setNuovoRecord();
                }
            });
        }
		StdCba.cssCaricaImpoVideata(me, 'CbaCssView.store.ImpostazioniSchede', function(controller, rec){
			if(!Ext.isEmpty(rec)) {
				controller.scadenzaDaImpoTest = rec.get('scadenza');
				controller.stopInterval = Ext.isEmpty(rec.get('scadenza'));
			}
		});
		
	},
	
	salvaForm:function(esci){
		var me = this;
		var obj = {};
		var form = me.lookupReference('Form');
		var risposte = form.getValues();
		
		let fields = form.getFields();
		risposte = StdCba.convertiBool(risposte, fields);
		
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.graficoDataAl;
		delete risposte.graficoDataDal;
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		var obj = {};
		Ext.apply(risposte,{
			//id:risposte.id,
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
			punteggioMassimo: me.punteggio,
			agenda: risposte.slider ? 'T' : 'F',
			nonSomministrabile:(me.lookupReference('CheckNonSomministrabile').getChecked() == true) ? 'T':'F'  
		});
		
		delete risposte.slider;
		
		Ext.apply(obj,{
			mmse:risposte,
			allegato:me.allegato
		});
		if(ControllerStd.salvaRecord(form,obj,false,false,true)){
			me.nuovo = false;
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}	
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= me.lookupReference('Form');
//		var dataF = form.down('datefield');
//		var dataValidator = dataF.validator(dataF);
//		if(dataValidator && Ext.isString(dataValidator))
//			msgAddError(messaggi, dataValidator);
		
		if(!me.nonSomministrabile){
			var spazio  = me.lookupReference('ComboSpazio').getValue();
			var orientamento  = me.lookupReference('ComboOrientamento').getValue();
			if(Ext.isEmpty(spazio) || Ext.isEmpty(orientamento))
				StdCba.msgAddError(messaggi,'MSG_CAMPI_ORIENTAMENTO');

			var memoria  = me.lookupReference('ComboMemoria').getValue();
			var tentativi = me.lookupReference('NumberTentativi').getValue();
			
			if(Ext.isEmpty(memoria) || Ext.isEmpty(tentativi))
				StdCba.msgAddError(messaggi,'MSG_CAMPI_MEMORIA');
			
			var attenzione  = me.lookupReference('ComboAttenzione').getValue();
			if(Ext.isEmpty(attenzione))
				StdCba.msgAddError(messaggi,'MSG_CAMPI_ATTENZIONE');

			var linguaggio  = me.lookupReference('ComboLinguaggio').getValue();
			var ripetizione  = me.lookupReference('ComboRipetizione').getValue();
			var compito  = me.lookupReference('ComboCompito').getValue();
			var ordine  = me.lookupReference('ComboOrdine').getValue();
			var frase  = me.lookupReference('ComboFrase').getValue();
			var disegno  = me.lookupReference('ComboCopiaDisegno').getValue();
			
			if(Ext.isEmpty(linguaggio) || Ext.isEmpty(ripetizione) || Ext.isEmpty(compito) || Ext.isEmpty(ordine) || Ext.isEmpty(frase) || Ext.isEmpty(disegno) )
				StdCba.msgAddError(messaggi,'MSG_CAMPI_LINGUA');
			
			
			if (messaggi.length == 0 && !form.isValid()){
				StdCba.msgAddError(messaggi,'MSG_CAMPI_OBBLIGATORI');
			}
		}
		return StdCba.msgShow('',messaggi); 

	},
	
	aggiornaStore: function(idRecord){		
		var me= this;
		
		var messaggi= [];
		var cbox = me.lookupReference('ComboValidita');
		var cboxStore = cbox.getStore();
		var form = me.lookupReference('Form');
		
		var tabSelect = this.lookupReference('TabPanel')._activeItem.title;
		
		if(tabSelect != 'TEST')
			this.lookupReference('TabPanel').setActiveItem(this.lookupReference('TabDatiDomande'));
		
		if(me.aggiornamentoTestata){
			me.aggiornamentoTestata = false;
			me.cbaConfig.controllerTestata.aggiornaStore(idRecord);
		}else{
			me.lookupReference('TotTest').hide();
			me.lookupReference('TotCorretto').hide();
			
			StdCba.clearForm(me.lookupReference('Form'));
			me.lookupReference('DataRegistrazione').setValue(me.cbaConfig.controllerTestata.cbaConfig.dataRegistrazione);
			me.lookupReference('DescrizionePunteggio').hide();
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
							if(!Ext.isEmpty(rec)){
								/*Converto e checko Booleani*/
								let fields = form.getFields();
								let newRecord = StdCba.convertiStringinBool(rec, fields);
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
									
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								StdCba.bloccaFormCss(form, blocco, false);

								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);

								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								} 
								
								me.lookupReference('TotTest').show();
								me.lookupReference('TotCorretto').show();
								me.lookupReference('DescrizionePunteggio').show();
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				me.lookupReference('TotTest').show();
				me.lookupReference('TotCorretto').show();
				me.punteggio = 0;
				me.fattoreCorrezione= false;
				me.punteggioCorretto = false;
				me.disegnoCreato = false;
				me.caricaPunteggio(function(){
					me.aggiornaLabelPunteggio();
				});
				me.caricaFattoreCorrezione();
				StdCba.bloccaFormCss(form, form.permesso != 'S', false);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
			}
		}	
	},

	aggiornaLabelPunteggio: function() {
		var me = this;	
		var nuovoPuneggio;
		var descrizione = "";
		if(Ext.isNumber(me.fattoreCorrezione)){
			me.punteggioCorretto = (me.fattoreCorrezione + me.punteggio);
			if(me.fattoreCorrezione != 0)
				nuovoPuneggio = Math.ceil(me.punteggioCorretto);
			else
				nuovoPuneggio = me.punteggio;
		}else me.punteggioCorretto = me.fattoreCorrezione;	
		if(!me.nonSomministrabile){
			if(me.vettorePunteggi){
				Ext.each(me.vettorePunteggi,function(rec){
					if(nuovoPuneggio <= rec.data.punteggioMax && nuovoPuneggio >= rec.data.punteggioMin)
						descrizione=rec.data.descrizione;			
				});	
			}
		}else
			me.punteggioCorretto = 0;
		me.lookupReference('TotTest').setHtml(me.punteggio + '/30');
		if(me.annullaTest)
			me.punteggioCorretto = 0;

		me.lookupReference('TotCorretto').setHtml(StdCba.traduci('PUNTEGGIO_CORRETTO') + ':' + me.punteggioCorretto );
		me.lookupReference('DescrizionePunteggio').setHtml(descrizione);
		me.lookupReference('DescrizionePunteggio').setHidden(me.nonSomministrabile);
	},
	
	init : function(){
		var me =this;
		me.callParent(arguments);
		me.punteggio = 0;
		me.fattoreCorrezione= false;
		me.punteggioCorretto = false;
		me.disegnoCreato = false;
		me.nuovo = false;
		
		let form= me.lookupReference('Form');
		form.controller=me; 
		
		me.cbaConfig.tipoTestata = 'MiniMental';
		me.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		me.idRicovero =  CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero;
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		me.gestioneForm();
		
		me.aggiornaDaTestata = true;
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
		me.caricaStoreExtraDati();

		me.caricaValidita();
		me.caricaPunteggio(function(){
			me.aggiornaLabelPunteggio();
		});
		me.caricaFattoreCorrezione();
	
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
