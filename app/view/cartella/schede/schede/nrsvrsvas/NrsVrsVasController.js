Ext.define('CS.schede.schede.nrsvrsvas.NrsVrsVasController', {
    extend: 'ControllerGenSchedeVal',
    alias: 'controller.cartella-schede-schede-nrsvrsvas-nrsvrsvas',
    
    beforetabchangeTabPanel: function(th, newTab, oldTab){
		var me = this;
		var form = me.lookupReference('Form');
		
		if(newTab.getItemId().indexOf('TabProvvedimenti') != -1){
			
			newTab.controller.idTest = me.recordTestata.get('id');
			StdCba.tapTabAndamento(form, true);
			newTab.down('#CntMain').controller.aggiornaStore();
		}else if(oldTab.getItemId().indexOf('TabProvvedimenti') != -1){
			
			if(oldTab.down('#CntMain').controller.btnNuovo)
				oldTab.down('#CntMain').controller.btnNuovo.destroy();
			oldTab.down('#CntMain').removeAll();
		}
		
		if(newTab.getItemId().indexOf('TabAndamento') != -1){
			
			if(form.dirty_oldIsDirty || !me.recordTestata){
				StdCba.msgShow('ATTENZIONE','COMPILARE_IL_TEST');
				return false;
			}
			StdCba.tapTabAndamento(form, true);
			newTab.down('#PnlFiltroGrafico').controller.generaGrafico();
			
		}else if(newTab.getItemId().indexOf('TabTest') != -1){
			StdCba.tapTabAndamento(form, false);
		}
		
	},
	
	changeSlider: function(th, newValue, oldValue){
		if(oldValue == newValue)
			return false;
		this.lookupReference('ValoreApprossimato').setValue(newValue);
	},
	
	changeSpinnerValore:function(th,newValue,oldValue){
		var me = this;
		if(me.stoppaEvento)
			return false;
		var image = me.lookupReference('ImageLine').el.dom;
		var x = (newValue * 600) / 10;
		image.style.left = x + 'px';
		this.punteggio = newValue;
		this.percentuale = Math.round((x / 600) * 100);
		this.aggiornaLabelPunteggio();		
	},
	
	changeSpinnerValoreSlider:function(th,newValue,oldValue){
		if(oldValue == newValue)
			return false;
		this.lookupReference('Sliderfield').setValue(newValue);
		this.punteggio = th.getValue();
		var x = (newValue * 600) / 10;
		this.percentuale = Math.round((x / 600) * 100);
		this.aggiornaLabelPunteggio();	
	},
	
	afterrenderCntImmagine:function(th){
		var me = this;
		var image = me.lookupReference('ImageLine').el.dom;
		var cnt = th.el.dom;
		me.click = false;
		cnt.addEventListener('touchstart',function(e){
			me.click = true;
			me.calcolaCoordinateDolore(e,'touchmove');
		},false);
		cnt.addEventListener('touchend',function(e){
			me.calcolaCoordinateDolore(e,'touchend');
		},false);
		cnt.addEventListener('touchmove',function(e){
			
			me.calcolaCoordinateDolore(e,'touchmove');
		},false);
		cnt.addEventListener('touchend',function(e){
			me.calcolaCoordinateDolore(e,'touchend');
		},false);
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
			me.nuovo = true;
			me.isCopia = false;
			ControllerStd.nuovoRecord(form);
//			if(me.nonSomministrabile)
//				me.getFieldInfoPunteggio().legend.removeAll();
			
			StdCba.bloccaFormCss(me.lookupReference('Form'), false);
			me.bloccaForm = false;
			me.punteggio = 0;
//			me.getFiltroAgenda().setValue(0);
			
			if(me.cbaConfig.sottoTipoTestata == 36 && Ext.is.Phone){
				me.punteggio = 0;
				me.percentuale = 0;
			}else{
				me.clickLivelloDolore()
				
			}   
		});
		
		btnRipristina.on('tap', function(){
			me.nuovo = false;
			if(me.soloUnaTestata){
				//TODO_PLS
				//form.up('window').close();
				return false;
			}
			if(!me.testataSelezionata)	//caso del ripristina sul "nuovo"
				me.aggiornamentoTestata = true;
			me.aggiornaStore();
		});
		
		btnCopia.on('tap', function(){
			me.nuovo = true;
		});
		
		btnAnnulla.on('tap', function(){//TODO_PLS VEDERE COME MOSTRARE CAMPO ANNULLATO
			var id= form.getFields().id.getValue();
			//controllo che ci sia l'id compilato	
			me.nuovo = false;
			if(!Ext.isEmpty(id)){
				ControllerStd.eliminaRecord(form.store,{
						id: id
						},function(){
							if(me.soloUnaTestata){
								//TODO_PLS
								//form.up('window').close();
								return false;
							}
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
		form.createFabs.btnCopia ? form.createFabs.btnCopia.setHidden(form.permesso == 'L'? true : false) : null;
		form.createFabs.btnAgenda ? form.createFabs.btnAgenda.setHidden(false) : null;
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('BtnAgenda');
		me.cbaConfig.controllerPageStd.cbaConfig.buttonToShow.push('btnCopia');
		
		me.storeForm = form.store= Ext.create('CS.schede.schede.nrsvrsvas.NrsVrsVasStore');

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
        	me.lookupReference('CntEdit').setHidden(!isDirty);
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
		var uscita = false;
		var form = me.lookupReference('Form');
		var risposte=form.getValues();
		delete risposte.dataRegAppo;
		delete risposte.oraRegAppo;
		delete risposte.punteggioVas;
		delete risposte.valoreApprossimato;
		delete risposte.tmp_punteggio;
		me.aggiornamentoTestata = true;
		
		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		
		
//		if(me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita)
//			risposte.progVisita = me.cbaConfig.controllerTestata.cbaConfig.controllerTestata.cbaConfig.progVisita;
		
		Ext.apply(risposte,{
			compilatore:CBA.moduli.modulo49.operatore.id,
			data: StdCba.cssCheckDataOraRegistrazione(this, me.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'), me.cbaConfig.controllerTestata.lookupReference('OraTestataInsert')),
			idRicovero: me.idRicovero,
			tipo: me.cbaConfig.sottoTipoTestata,
			valore:me.punteggio,
			agenda:risposte.slider ? 'T' : 'F',
			nonSomministrabile:me.nonSomministrabile ?  'T' : 'F',
			percentuale: me.percentuale ? me.percentuale : '',
		});
		me.dataRecord = risposte.data;
		
		delete risposte.slider;
		
		if(ControllerStd.salvaRecord(form,risposte,false,false,true)){
			me.nuovo = false;
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
//			StdCba.msgAddError(messaggi, dataValidator);
		
		if(me.cbaConfig.sottoTipoTestata == 37 || me.cbaConfig.sottoTipoTestata == 38)
			if(Ext.isEmpty(me.lookupReference('LabelPunteggio').getValue()))
				StdCba.msgAddError(messaggi,'MSG_VALORE_SELEZIOANTO');
		
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
			me.stoppaEvento = true;
			StdCba.clearForm(me.lookupReference('Form'));
			me.stoppaEvento = false;
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
							
							if(!Ext.isEmpty(rec)){
								form.dirty_suspendDirtyChange = true
								form.setRecord_cba(rec);
								form.setValues({
									dataRegAppo: rec.get('data'),
									oraRegAppo: rec.get('data')
								});
								if(rec.get('scadenza') == null) 
									me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
								//permessi scrittura
								var blocco = form.permesso == 'L' ? true : StdCba.cssHasBloccoModifica(me.recordTestata.get('tipoBlocco'));
								me.bloccaForm = blocco;
								StdCba.bloccaFormCss(form, blocco);
								
								let	compilatore = rec.get('compilatoreNominativo') + ' (' + rec.get('compilatoreFigProf') + ')';
								pnlCompilatore.setLabelCompilatore(compilatore, form);
								if(me.cbaConfig.sottoTipoTestata == 36)
									!Ext.is.Phone ? me.caricaDati(rec) : me.lookupReference('ValoreApprossimato').setValue(rec.get('valore'));
								else
									 me.caricaDati(rec);
								me.punteggio = rec.get('valore');
								
								if(me.callbackFnPortlet && !me.callbackFnPortlet_disattiva){
									me.callbackFnPortlet[0](me.callbackFnPortlet[1], me);
								}
								if(me.soloUnaTestata)
									me.disabilitaNuovoCopia();
								
								form.dirty_suspendDirtyChange = false;
								form.dirty_resetOriginal();
								
								let iconAgenda = rec.get('agenda') == 'T' ? 'resources/images/btnFunzione/agenda-si.svg' : 'resources/images/btnFunzione/agenda-no.svg'
								form.createFabs.btnAgenda.setIcon(iconAgenda);
							}
						}else{
							StdCba.msgShowError('',operation.getError());	
						}			
					}
				});
			}else{
				var  container=me.lookupReference('CntCorpoDomande').down('[modulo=' + me.cbaConfig.sottoTipoTestata + ']');
				var  btn=container.query('button');
				for(var i=1;i<=btn.length;i++){
					
					btn[i-1].innerElement.removeCls(me.clsSelezione);
				}
				this.punteggio = 0;
				me.aggiornaLabelPunteggio();
				StdCba.bloccaFormCss(form, false, false/*, [me.getPnlFunzioni()]*/);
				StdCba.calcolaDataDiScadenza(false,false,me.cbaConfig.controllerTestata.lookupReference('InfoScadenza'));
				me.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				
			}
		}	
	},
	
	caricaDati:function(record){
		var me = this;
		var form = me.lookupReference('Form');
		if(me.cbaConfig.sottoTipoTestata == 37 || me.cbaConfig.sottoTipoTestata == 38){
			var selectItems = 0;
			var  container=me.lookupReference('CntCorpoDomande').down('[modulo=' + me.cbaConfig.sottoTipoTestata + ']');
			var  btn=container.query('button');
			for(var i=1;i<=btn.length;i++){
				
				btn[i-1].innerElement.removeCls(me.clsSelezione);
			}
			selectItems = record.get('valore');
			if(me.cbaConfig.sottoTipoTestata == 37){
				btn[selectItems].innerElement.addCls(me.clsSelezione);
				me.punteggio = btn[selectItems].punteggio;
				
			}else if(me.cbaConfig.sottoTipoTestata == 38){
			
				btn[selectItems-1].innerElement.addCls(me.clsSelezione);
				me.punteggio = btn[selectItems-1].punteggio;
			}
		}else{
			var scala = ((record.get('percentuale') / 100 ) * 600); //Trasformo il valore in percentuale in px
			var valore  = record.get('valore');  
			var image = me.lookupReference('ImageLine').el.dom;
			image.style.left = scala + 'px';
			me.stoppaEvento = true;
			form.setValues({
				valoreApprossimato:valore,
			});
			me.stoppaEvento = false;
			me.punteggio = valore;
		}
		me.aggiornaLabelPunteggio();
		
	},
	
	aggiornaLabelPunteggio: function() {
		var me = this;
		var descrizione = "";
		me.lookupReference('TotTest').setHtml('Tot. Punteggio: '+ me.punteggio+ '/'+me.punteggioMassimo);
	},

	clickLivelloDolore:function(th){
		var me = this;
		/*per Vas richiamo la stessa funzione di NRS VRS per lo sbiancamento del punteggio */
		if(me.cbaConfig.sottoTipoTestata == 36){
			me.punteggio = 0;
			me.stoppaEvento = true;
			me.lookupReference('ValoreApprossimato').setValue(me.punteggio);
			me.stoppaEvento = false;
			me.lookupReference('ImageLine').el.dom.style.left = '0px';
		}else{
			
			var  btn=Ext.ComponentQuery.query('[modulo='+ me.cbaConfig.sottoTipoTestata +'] button');
			for(var i=1;i<=btn.length;i++){
				btn[i-1].innerElement.removeCls(me.clsSelezione);
			}
			if(th){
				th.innerElement.addCls(me.clsSelezione);
				me.punteggio = th.punteggio;
				me.lookupReference('LabelPunteggio').setValue(me.punteggio);
			}
		}
		me.aggiornaLabelPunteggio();
	},
	
	calcolaCoordinateDolore:function(event,action){
		var me = this;
		if(me.bloccaForm)
			return false;
		var image = me.lookupReference('ImageLine').el.dom;
		var cnt = me.lookupReference('CntImmagine').el.dom;
		var rect =cnt.getBoundingClientRect();
		var x = 0;
		if(action == 'touchstart'){
			
			me.click = true;
		}
		if(action == 'touchend'){
			me.click = false;
		}
		if(action == 'touchend'){
			if(event.clientX > rect.right || event.clientX < rect.left || event.clientY < rect.top ||   event.clientY > rect.bottom ){
				me.click = false; 
				return false;
			}
		}
		if(action == 'touchmove'){
			if(me.click == true){
				if(event.clientX > rect.right - 5){
					me.click = false; 
					return false;
				}
				
				image.style.left = event.changedTouches[0].clientX- rect.left + 'px';
				var nuovaPosizione = event.changedTouches[0].clientX - rect.left;
				me.percentuale = Math.round((nuovaPosizione / 600) *100);
				x = (nuovaPosizione / 600 ) * 10;		
				me.stoppaEvento = true;
				me.lookupReference('ValoreApprossimato').setValue(x);
				me.stoppaEvento= false;
				me.punteggio = Math.round(me.lookupReference('ValoreApprossimato').getValue());
				me.lookupReference('Form').getFields().tmp_punteggio.setValue(x);
				me.aggiornaLabelPunteggio();
				
			}
		}
	},
	
	dragSlider: function(th){
		if(th.getReadOnly())
			th.setValue(this.lookupReference('ValoreApprossimato').getValue());
	},
	
	createVrs(){
		let vrs = Ext.create('Ext.Container',{
				itemId:'CntVrs',reference:'CntVrs',
				layout:{
					type: Ext.is.Phone ? 'vbox' : 'hbox',
					align: 'stretch'
				},
				modulo: 38,
				items:[
					{
						xtype:'button',
						margin:'10 10 0 10',
						punteggio:1,
						text: StdCba.traduci('NESSUN_DOLORE'),
						height:90,
						width:160,
						onRender: function(){
							this.innerElement.dom.style.background = '#A2BD3C'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:90,
						punteggio:2,
						width:160,
						text: StdCba.traduci('DOLORE_LIEVE'),
						margin:'10 10 0 10',
						onRender: function(){
							this.innerElement.dom.style.background = '#B4B930'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:90,
						punteggio:3,
						width:160,
						text: StdCba.traduci('DOLORE_MODERATO'),
						margin:'10 10 0 10',
						onRender: function(){
							this.innerElement.dom.style.background = '#C6A426'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:90,
						punteggio:4,
						width:160,
						text: StdCba.traduci('DOLORE_FORTE'),
						margin:'10 10 0 10',
						onRender: function(){
							this.innerElement.dom.style.background = '#EC6F23'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						punteggio:5,
						height:90,
						width:160,
						text: StdCba.traduci('DOLORE_ATROCE'),
						margin:'10 10 0 10',
						onRender: function(){
							this.innerElement.dom.style.background = '#EF3D22'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					}
				]
			});
		return vrs;
	},
	
	createNrs(){
		let nrs = Ext.create('Ext.Container',{
				itemId:'CntNrs',reference:'CntNrs',
				layout:{
					type: Ext.is.Phone ? 'vbox' : 'hbox',
					align: 'stretch'
				},
				modulo: 37,
				items:[
					{
						xtype:'button',
						margin:'10 10 0 0',
						punteggio:0,
						text:'<span style="color:#000000;font-size:20px;">0</span>',
						height:50,
						width:60,
						onRender: function(){
							this.innerElement.dom.style.background = '#ECF8E0'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						margin:'10 10 0 0',
						punteggio:1,
						text:'<span style="color:#000000;font-size:20px;">1</span>',
						height:50,
						width:60,
						onRender: function(){
							this.innerElement.dom.style.background = '#A2BD3C'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					}
					,
					{
						xtype:'button',
						height:50,
						punteggio:2,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">2</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#B4BA31'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:3,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">3</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#B4B930'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:4,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">4</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#BCB02B'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:5,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">5</span>',
						margin:'10 10 0 0',
						style:'background:#C6A426;',
						onRender: function(){
							this.innerElement.dom.style.background = '#C6A426'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:6,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">6</span>',
						margin:'10 10 0 0',
						style:'background:#DC8E25;',
						onRender: function(){
							this.innerElement.dom.style.background = '#DC8E25'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:7,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">7</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#EC6F23'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:8,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">8</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#F05E22'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:9,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">9</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#EF3D22'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					},
					{
						xtype:'button',
						height:50,
						punteggio:10,
						width:60,
						text:'<span style="color:#000000;font-size:20px;">10</span>',
						margin:'10 10 0 0',
						onRender: function(){
							this.innerElement.dom.style.background = '#EE3222'
						},
						listeners:{
							tap: 'clickLivelloDolore'
						}
					}
				]
			});
		return nrs;
	},
	
	init : function(){
		var me =this;
		this.callParent(arguments);
		
		var form= me.lookupReference('Form');
		form.controller=me;
		
		let tabTest = this.lookupReference('TabPanel')._tabBar.items.items[0];
		tabTest.setFlex(null);
		tabTest.setWidth(100);
		
		me.nuovo = false;
		me.punteggio = 0;
		me.punteggioMassimo = 0;
		me.percentuale = 0;
		me.cbaConfig.tipoTestata = 'SkValDolore';
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;		//profilo_css_sostituire
		me.cbaConfig.sottoTipoTestata= me.cbaConfig.controllerTestata.cbaConfig.codVideata;
		me.lookupReference('ComboValidita').getStore().load({ params:{ altro:'T'}});
		
		
		/*abilito pulsante annulla*/
		me.annullabile = true;
		me.modeAnnullabile = true; //cssSetAnnullabile con dirty
		
		me.cbaConfig.sottoTipoTestata = me.cbaConfig.controllerTestata.cbaConfig.controllerPageStd.cbaConfig.codVideata;
		me.aggiornaDaTestata = true;
		me.idRicovero = me.cbaConfig.anagraficaCorrente.idRicovero;
		
		if(me.cbaConfig.sottoTipoTestata == 37 ){
			me.punteggioMassimo = 10;
			me.clsSelezione = 'cbaCssDoloreSelezioneNRS';
			this.lookupReference('Cnt').add(this.createNrs());
			
		}else if (me.cbaConfig.sottoTipoTestata == 38){
			me.clsSelezione = 'cbaCssDoloreSelezioneVRS';
			me.punteggioMassimo = 5;
			this.lookupReference('Cnt').add(this.createVrs());
		}else if (me.cbaConfig.sottoTipoTestata == 36){
			me.punteggioMassimo = 10;
			if(Ext.is.Phone){
				me.lookupReference('Cnt').add(Ext.create('Ext.Container',{
					modulo: 36,
					itemId:'CntVas',reference:'CntVas',
					layout:{
						type:'vbox',
						align: 'stretch',
						pack: 'center'
					},
					width: '100%',
					flex:1,
					items:[
						{
							xtype: 'container',
							margin:'20 0 0 0',
							layout:{
								type:'hbox',
								align: 'stretch'
							},
							items:[
								{
									xtype:'label',
									margin:'0 8 0 0',
									html: StdCba.traduci('NO_DOLORE')
								},
								{
									xtype:'spacer'
								},
								{
									xtype:'label',
									margin:'0 8 0 0',
									html: StdCba.traduci('DOLORE_ESTREMO')
								}
							]
						},
						{
							xtype: 'sliderfield',
							itemId: 'Sliderfield', reference: 'Sliderfield',
				            minValue: 0,
				            maxValue: 10,
				            increment: 1,
				            cls: 'custom-slider',
//				            flex: 1,
				            html: '<table width="100%">'
				            		+'<tr>'
					            		+'<td style="width:10%; text-align:left;">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%">|</td>'
					            		+'<td style="width:10%;text-align:right; ">&nbsp;|</td>'
				            		+'</tr>'
				            		+'</table>'
				            		+'<table width="100%">'
				            			+'<tr>'
				            				+'<td style="width:10%; text-align:left;">0</td>'
				            				+'<td style="width:10%;">1</td>'
				            				+'<td style="width:10%">2</td>'
				            				+'<td style="width:10%">3</td><td style="width:10%">4</td>'
				            				+'<td style="width:10%">5</td><td style="width:10%">6</td>'
				            				+'<td style="width:10%">7</td><td style="width:10%">8</td>'
				            				+'<td style="width:10%">9</td><td style="width:10%;text-align:right; ">10</td>'
			            				+'</tr>'
		            				+'</table>',
				            listeners:{
				            	change: 'changeSlider',
				            	dragend : 'dragSlider' // TODO_PLS trovare soluzione perche scatta il change e c'è uno sfarfallio
				            }
						},
						{
							xtype: 'numberfield',
							labelWidth: 180,
							width: 280,
							hideTrigger: false,
							decimalPrecision:0,
							itemId: 'ValoreApprossimato', reference: 'ValoreApprossimato',
							label: StdCba.traduci('VALORE_APPROSSIMATO'),
							name: 'valoreApprossimato',
							labelAlign: 'left',
							labelClsExtra: 'cbaCssLabel',
							maxValue: 10,
							minValue:0,
							allowBlank: true,
							margin: '20 0 0 0',
							listeners:{
								change: 'changeSpinnerValoreSlider'
							}
						},
						{
							xtype:'textfield',
							name:'tmp_punteggio',
							hidden:true
						}
					 ]
				}));
			}else{
				me.lookupReference('Cnt').add(Ext.create('Ext.Container',{
					modulo: 36,
					itemId:'CntVas',reference:'CntVas',
					layout:{
						type:'hbox',
						align: 'center',
						pack: 'center'
					},
					flex:1,
					items:[
						{
							xtype:'container',
							layout:{
								type:'hbox',
								align: 'stretch',
								pack: 'end'
							},
							items:[
								{
									xtype:'label',
									margin:'100 8 0 0',
									html: StdCba.traduci('NO_DOLORE')
								},	
							]
						},
						{
							xtype:'container',
							margin:'10 0 0 0',
							layout:{
								type:'vbox',
								align:'center'
							},
							items:[
								{
									xtype:'image',
									height: 24,
									width: 600,
									src:'resources/images/skval/righello.png',
								},
								{
									xtype:'container',
									itemId:'CntImmagine',reference:'CntImmagine',
									width:600,
									height:300,
									style:'background :url("resources/images/skval/vas.png") no-repeat',
									margin:'0 0 0 0',
									listeners:{
										painted: 'afterrenderCntImmagine'
									},
									items:[
										{
									
											xtype:'image',
											renderTo: Ext.getBody(), // altrimenti non viene inizzializzato l'elemento DOM 
											height:300,
											width:5,
											style:'position:absolute;top:0px;',
											itemId:'ImageLine',reference:'ImageLine',
											src:'resources/images/skval/linea.png'
										},
												
									]
								},
								{
									xtype:'image',
									height:24,
									width:600,
									src:'resources/images/skval/righello.png'
								},
								{
									xtype: 'numberfield',
									labelWidth: '180',
									hideTrigger: false,
									decimalPrecision:0,
									itemId: 'ValoreApprossimato', reference: 'ValoreApprossimato',
									label: StdCba.traduci('VALORE_APPROSSIMATO'),
									name: 'valoreApprossimato',
									labelAlign: 'left',
									labelClsExtra: 'cbaCssLabel',
									maxValue: 10,
									minValue:0,
									allowBlank: true,
									margin: '20 0 0 0',
									listeners:{
										change: 'changeSpinnerValore'
									}
								},
								{
									xtype:'textfield',
									name:'tmp_punteggio',
									hidden:true
								}
							]
						},
						{
							xtype:'container',
							layout:{
								type:'hbox',
								align: 'stretch',
								pack: 'start'
							},
							items:[
								{
									xtype:'label',
									margin:'100 8 0 30',
									html: StdCba.traduci('DOLORE_ESTREMO')
								}
							]
						}
					]
				}));
			}
		}
		me.gestioneForm();
		me.aggiornaLabelPunteggio();
		
		//funzioni standard per schede di valutazione vedere in controllerGenSkval
//		me.getImgCalendario().addCls('agenda-no'); 
		me.caricaValidita();
		me.caricaStoreExtraDati();
		

	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
	    this.callParent();
	}

});
