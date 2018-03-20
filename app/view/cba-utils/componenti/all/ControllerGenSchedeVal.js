Ext.define('CbaUtils.componenti.all.ControllerGenSchedeVal', {
    extend: 'CBAViewController',
    alias: 'widget.ControllerGenSchedeVal',
	alternateClassName: 'ControllerGenSchedeVal',
	
	init: function(){
		var me = this;
		this.callParent(arguments);
		me.lookupReference('DataRegistrazione').on('change', function(th, newValue){
			StdCba.calcolaDataDiScadenza(me.lookupReference('DataRegistrazione').getValue(),me.lookupReference('ComboValidita').selection,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
		})
	},
	//spostato su generali
//	tapTabAndamento: function(form, disabilita){
//		let btnMore = form.createFabs.btnMore;
//		btnMore._scope.__proto__.open(btnMore);
//		btnMore._scope.__proto__.close(btnMore);
//		btnMore.setHidden(disabilita);
//		form.createFabs.btnNuovo.setHidden(disabilita);
//		
//		let controllerPageStd = form.controller.cbaConfig.controllerPageStd;
//		controllerPageStd.nuovo = disabilita; 
//		StdCba.abilitaDisabilitaBtn(controllerPageStd);
//	},
	
	caricaFattoreCorrezione:function(dataRegistazione){
		var me = this;
		/*Chiamata per fattore correzione*/
		Ext.Ajax.request({
			method:'GET',
			url:`${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/fattorecorrezione',
			params:{
				idRicovero:CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).data.idRicovero,
				data:dataRegistazione ? dataRegistazione : new Date(),
			},
			success: function (response){
				var	risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				if(risposta.success){
					var r = risposta.data;
					if(r != -999){
						me.fattoreCorrezione = r;
					}else{ 
						me.fattoreCorrezione = StdCba.traduci('MESSAGGIO_PUNTEGGIO_COMPLESSIVO');
					}
					me.aggiornaLabelPunteggio();
				}else{
					StdCba.msgAddError(messaggi,risposta.message);	
				}
			}
		});
	},
	
	caricaStoreExtraDati:function(schedeModulari){
		var me = this;
		
		me.storeExtra = Ext.create('CbaCssView.store.schede.ExtraStore');
		
		me.storeExtra.load({
			params: {
				id: me.cbaConfig.controllerTestata.cbaConfig.controllerPageStd.cbaConfig.codVideata
			},
			callback:function(records,operation,success){
				if(success){
					var rec= records[0];
					if(!Ext.isEmpty(rec)){
						/* Abilito le tab  Grafico  e se e presente il paramentro provveidmenti a T creo la tab*/						
						if(rec.get('provvedimenti') =='T'){
							me.lookupReference('TabPanel').insert(1, Ext.create('CS.schede.standard.provvedimenti.TabProvvedimentiMain',{
								itemId:'TabProvvedimenti', reference: 'TabProvvedimenti',
								title:StdCba.traduci('PROVVEDIMENTI_ADOTTATI'),
								layout: {
									type: 'vbox',
									align: 'stretch'
								},
								flex:1,
								autoScroll: true,
								nonDisabilitare: true,
								cbaConfig:{
									codDomanda:rec.get('domandaRisp'),
									codArea:rec.get('areaRisp'),
									idProfilo:me.idProfilo,
									controllerDettaglio: me							
								}
							}));
						}
						me.punteggioMax = me.cbaConfig.punteggioMax || rec.data.totale;
						!Ext.is.Phone ? me.generaTabGrafico(): null;
					}
					
				}else{
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
	},
	
	setInfoPunteggio: function(componente, titolo, testo, altezza, lunghezza){
		var me = this;
		if(!componente) return false;
		
		componente.legend.add(Ext.create('Ext.Img',{
			src:'resources/images/skval/bibliografia.svg',
			id:'IconaInfo' + Ext.id(),
			width:16,
			height:16,
			listeners:{
				'painted': function(th){
					Ext.Toast(StdCba.traduci(testo));
				}
			}					
		}));
		
	},

	generaTabGrafico: function(){
		var me = this;
		var card = me.lookupReference('TabPanel').items.items;
		var leng = card.length;
		/* la tab andamento viene posizionata in fondo alla tabBar */
		me.lookupReference('TabPanel').insert(leng + 1, Ext.create('Ext.Panel',{
			title: StdCba.traduci('Andamento'),
			itemId: 'TabAndamento', reference: 'TabAndamento',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			flex: 1,
			scrollable: true,
			padding: 5,
			nonDisabilitare: true,
			
		}));
		let tabAndamento;
		Ext.each(me.lookupReference('TabPanel').items.items, function(tab){
			if(tab._itemId == 'TabAndamento'){
				tabAndamento = tab;
				return false;
			}
		});
		Ext.require('Generali.schede.grafico.TabAndamento');
		tabAndamento.add(Ext.create('Generali.schede.grafico.TabAndamento',{
			cbaConfig:{
				codiceModulo: me.cbaConfig.controllerPageStd.cbaConfig.codVideata,
				idRicovero: me.idRicovero,
				testataGen: me.cbaConfig.testataGen,
				idRicoveroCu: Ext.isDefined(me.cbaConfig.anagraficaCorrente.idRicoveroCu) ? me.cbaConfig.anagraficaCorrente.idRicoveroCu : null,
				punteggioMax: me.punteggioMax,
				punteggioMin: me.cbaConfig.controllerPageStd.cbaConfig.codVideata == 7 ? -12 : 0 
			}
		}));
		
	},
	
	caricaValidita: function(){
		var me = this;
		//server per scheda bina 
		if (me.cbaConfig.testataGen) {
			StdCba.ImpostaUrl(me.lookupReference('ComboValidita').getStore());
		}
		
		me.lookupReference('ComboValidita').getStore().load({ params:{ altro:'T'}});
	},
	
	changeScadenza:function(th,newValue,oldValue){
		
		var me = this;
		var form = me.lookupReference('Form');
//		if(Ext.isEmpty(th.getValue())){
//			me.getFiltroAgenda().setValue(0);
//			me.getCntAgenda().setDisabled(true);
//		}
//		else{
//			me.getCntAgenda().setDisabled(false);
//		}
		if(me.lookupReference('DataRegistrazione').getValue() && me.nuovo === false)//serve me.nuovo su ogni scheda di valutazione
			StdCba.calcolaDataDiScadenza(me.lookupReference('DataRegistrazione').getValue(),th._selection,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
	},
	
	changeFiltroAgenda: function(th, newValue,oldValue){
		var me = this; 
		if(newValue == 0){
			me.lookupReference('ImgCalendario').removeCls('agenda-si');
			me.lookupReference('ImgCalendario').addCls('agenda-no');
		}else{
			me.lookupReference('ImgCalendario').removeCls('agenda-no');
			me.lookupReference('ImgCalendario').addCls('agenda-si');
		}	
	},
	
	caricaPunteggio:function(callbackFn){
		var me=this;
		me.vettorePunteggi = null;
		me.storePunteggi = Ext.create('CbaCssView.store.schede.Punteggio');

		if (me.cbaConfig.testataGen) {
			StdCba.ImpostaUrl([me.storePunteggi]);
		}

		me.storePunteggi.load({
			params: {
				codiceModulo: me.cbaConfig.controllerTestata.cbaConfig.controllerPageStd.cbaConfig.codVideata,
			},
			callback:function(records,operation,success){
				if(success){
					if(!Ext.isEmpty(records.length)){
						me.vettorePunteggi = records;
						if(callbackFn) //aggiorno il punteggio se passato nella funzione
							callbackFn(records);
					}else 
						me.vettorePunteggi = null;
				}else{
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
	},
	
	/* servono quando entro nella scheda di valutazione pero passando prima dalla videata dei Parametri e avendo il parametro soloUnaTestata = true  */
//	disabilitaNuovoCopia: function(){
//		var me = this;
//		var myForm = me.getForm();
//		var btnNuovo = myForm.boxBottoni.queryById('btnNuovo');
//		var btnCopia = myForm.boxBottoni.queryById('btnCopia');
//		btnNuovo.setDisabled(true);
//		btnCopia.setDisabled(true);
//	},

//	clickCopia: function(controller){
//		var me = controller;
//		var s = me.storeForm;
//		if(s.getCount() > 0){
//			me.testataSelezionata = false;
//			controller.isCopia = true;
//			me.lookupReference('Form').getFields().id.setValue(-9999);
//			StdCba.bloccaFormCss(me.lookupReference('Form'), false, true);
//			
//		}else StdCba.Messaggio('ATTENZIONE', 'NESSUNA_REGISTRAZIONE_SELEZIONATA', 'OK', 'QUESTION');
//	}
});