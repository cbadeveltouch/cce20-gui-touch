Ext.define('CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapieController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-somministrazioneterapie-somministrazioneterapie',
    
	isValidCompilatore: function(record) {
		return (record.get('idCompilatore') == null) || (CBA.moduli.modulo49.operatore.id == record.get('idCompilatore'));
	},
	
	addTerapia: function(record) {//TODO_PLS
		
		if(Ext.is.Phone){
			let btnBack = this.cbaConfig.controllerListAlBisogno.cbaConfig.controllerPageStd.lookupReference('BtnBack');
			btnBack.fireEvent('tap', (btnBack));
		}else{
			this.pnlAb.destroy(); 
		}
		
		record.set({
			desViaDiSomm: StdCba.traduci('TERAPIE_TERAPIA_AL_BISOGNO'), 			
			esito: 0,
			tipoBlocco: [{
				codice: 1,
				valore: "S",
				extra: null
			}]
		});
		
		this.storeSomm.add(record.getData());
	},
	
	
	
	aggiornaGrid: function() {		
		StdCba.svuotaStore(this.storeSomm)
		this.storeSomm.load({
    		params: {
    			idRicovero: this.idRicovero,
    			dataInizio: this.dataInizio,
    			dataFine: this.dataFine,
    			includiAB: this.includiAB
    		}, 
    		callback:(records,operation,success)=> {
        		if(success){
				} else {	
					StdCba.msgShowError('', operation.getError());
				}
    		}	
    	})		
	},
	
	tapRipristina: function() {
		this.storeSomm.rejectChanges();
		
		let form = this.lookupReference('Form');
		if(Ext.isDefined(form.createFabs.btnAb))
			form.createFabs.btnAb.setBottom(50);
	},
		
	tapConferma: function() {						
		let recModificati= this.storeSomm.getModifiedRecords(),
			lista= [],
			dataDal= this.cntCerca.down('#DataDal').getValue();				
				
		recModificati.forEach((rec)=> {
			let dataTmp,
				oraTerapia= Ext.Date.clone(dataDal),
				dataNow= new Date();
			
			if(rec.get('data'))
				dataTmp= Ext.Date.clone(rec.get('data'))
			else dataTmp= Ext.Date.clone(this.dataInizio); //terapia al bisogno: non ha data, prendo quindi la data inizio
		
			oraTerapia.setHours(dataTmp.getHours());
			oraTerapia.setMinutes(dataTmp.getMinutes());							
			
			lista.push({
				id: rec.get('idSomm') ? rec.get('idSomm') : null,
				idRicovero: rec.get('idRicovero'),
				idTerapia: rec.get('idTerapie'),
				qtaSomm: rec.get('dose'),
				compilatore: CBA.moduli.modulo49.operatore.id,
				dataSomm: dataNow,
				insertData: dataNow,
				oraTerapia: oraTerapia,
				idTerapia: rec.get('idTerapia'),
				esito: rec.get('esito')				
			});
		});		 
					
		Ext.Ajax.request({
			method: 'POST',
			url:`${CbaRootServer}`+ '/cba/css/cs/ws/somm/insert',
			jsonData: lista,
			success: (response) => {
				let risposta = Ext.JSON.decode(response.responseText);
				
				if(risposta.success){
					this.storeSomm.rejectChanges();
					this.aggiornaGrid();
					let form = this.lookupReference('Form');
					
					if(Ext.isDefined(form.createFabs.btnAb))
						form.createFabs.btnAb.setBottom(50);
				} else {	
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
	},
	
	tapSomministra: function(th, l, eOpts) {
		if(this.puoiSomministrare && this.isValidCompilatore(l.record)) {
			if(l.record.get('esito') === null)
				l.record.set('esito', 0);
			else{
				this.menu.record= l.record;
				
				let widthBody = Ext.getBody().dom.clientWidth,
					heightBody = Ext.getBody().dom.clientHeight,
					width =Ext.is.Phone ? ( widthBody - widthBody * this.widthMenu )/2 :  ( widthBody -  this.widthMenu )/2 ,
					height  = ( heightBody - this.heightMenu )/2;
				this.menu.showAt(width, height);
			}
		}
		
		l.event.preventDefault();
		l.event.stopPropagation();
	},
	
	changeFiltro: function(th, value) {
		let txt= '',
			lbSlider= th.up('container').down('#LbSlider');
		
		switch (value) {
			case 0:
				txt= this._FILTRO1;
			break;
			
			case 1:
				txt= this._FILTRO2;
			break;
		}
		
		lbSlider.setHtml(txt);
		this.cerca();
	},
	
	changeCboxSede: function(combo, newValue, oldValue){
		let reparto= combo.up().down('#Reparto');
		
		this.idSede= newValue;
				
        SvuotaCombo(reparto);
        
        if (combo.value > 0){
        	reparto.getStore().getProxy().extraParams = {
                sede: combo.value
            };
        	
        	reparto.getStore().load({
				callback:function(records,operation,success){
				}
			});
        }
        
		if(!Ext.isEmpty(combo.getSelection())){			
			Ext.apply(combo.cbaConfig, {
				valore: newValue,
				descrizione: combo.getSelection().data.valore,
				name: 'sede',
				combo: true
			});
		}
		
		this.cerca();
	},
	
	changeCboxReparto: function(combo, newValue, oldValue){		
		let sede= combo.up().down('#Sede');
		
		this.idReparto= newValue;
		
		//cerco solo se ho avvalorata la sede, altrimente il cerca viene scatenato due volte
		if(sede.getValue())
			this.cerca();
	},
	
	changeTurno: function(combo, value) {
		//imposto il titolo destro della window
		let win= this.view.up('window'),
			rec= {
				cognome: value ? this._TERAPIE_TURNO_DELLE_ORE + ': ' + combo.getRawValue() : '',
				nome: ''
			};
		
		win.titolo= this._PORTLET_SOMMINISTRAZIONE; 
		initToolbarCbaCss(win, rec);
		
		this.cerca();
	},
	
	setComponentiCerca: function(pnlCerca) {
        let cnt= pnlCerca.down('#CntFiltri'); 
                
        cnt.add([
        	{
				xtype: 'datepickerfield',
				itemId:'DataDal', reference: 'DataDal',
				label: StdCba.traduci('DATA_DAL'),
				dateFormat : 'd/m/Y',
                width: 105,
                height: 47,
                margin: '0 5 0 0',
                triggers: false,
                value: new Date(),
                listeners:{
                	change: 'changeData'
                }
			},
	        {
				xtype: 'selectfield',
				itemId: 'CbTurno',
				queryMode: 'local',
				store: Ext.create('CS.menuAzioni.somministrazioneTerapie.CboxTrn').load({
					params: {
						idProfilo: CBA.parametriGenerali.idProfiloCss
					}
				}),
				labelClsExtra: 'cbaCssLabel',
				label: StdCba.traduci('TURNO'),
				labelAlign: 'left',
				labelWidth: 80,
				minChars: 0,
				displayField: 'descrizione',
				valueField: 'id',
				listeners: {
					change: Ext.bind(this.changeTurno, this)
				}
		    },
		    {
		    	xtype: 'container',
		    	itemId: 'CntFiltro',
		    	layout: {
		    		type: 'hbox',
		    		align: 'center'
		    	},		
	    		items: [	
				    {
						xtype: 'sliderfield',
						width: 40,
						useTips: false,
						itemId:'Filtro',
						increment: 1,
						minValue: 0,
						maxValue: 1,
						name: 'filtro',
						labelSeparator: '', 
						listeners: {
							change: Ext.bind(this.changeFiltro, this)
						}
					},
					{
						xtype: 'label',
						itemId: 'LbSlider',
						html: StdCba.traduci('TERAPIE_SOMM_FILTRO1'),
						margin: '0 0 0 3'
					}
				]
		    }
		]); 
        
        pnlCerca.down('#CntCognome').hide();
        
        let maxDate= StdCba.creaData(1,1,3000);
        
        let dataDal= pnlCerca.down('#DataDal');
        dataDal.setMargin(0);
        dataDal.labelClsExtra= 'cbaCssLabel';
        dataDal.labelWidth= 40;
        dataDal.setMaxWidth(200);        
        dataDal.setWidth(155);
        //dataDal.setMaxValue(new Date()); //posso somministrare fino alla data odierna
//        dataDal.setMaxValue(maxDate);
                        
        let dataAl= pnlCerca.down('#DataAl'),
        	dataFine= new Date();        

//        dataAl.setMaxValue(maxDate);
        
        dataDal.on('change', (th) => {
       		this.cerca();
        });
                       
	}, 
	
	creaMenu: function() {
		let me= this;
		this.widthMenu = Ext.is.Phone ? 90/100 : 350;
		this.heightMenu = 250;
		me.storeMenu= Ext.create('CS.menuAzioni.somministrazioneTerapie.CboxCondizioniSomm');
		
		me.menu= Ext.create('Ext.menu.Menu', {
			listeners: {
				beforeshow: () => {
					let blocchi= StdCba.cssGetBlocchi(me.menu.record.get('tipoBlocco'));
					
					if(blocchi[0] == 'SOME' || blocchi[0] == 'WR' || me.menu.record.phantom) { 
						me.menu.down('#Somministrato').setDisabled(!(me.menu.record.get('esito') > 0));
					} else {
						return false;
					}	
				},
			},
			items: []
		});
				
		me.menu.add([
			{
				xtype: 'menuitem',
	      		text: StdCba.traduci('TERAPIE_SOMMINISTRATO'),
	      		itemId: 'Somministrato',
	      		disabled: true,
	      		iconCls: 'icon-check',
				handler: (th) => {
					me.menu.record.set('desEsito', null);	
					me.menu.record.set('esito', 0);	
//					th.up('panel').hide();
	      		}
		    }
	    ]);  	
				
		me.storeMenu.load({
			params: {
				codArea: 9,
				codDomanda: 10,
				idProfilo: CBA.parametriGenerali.idProfiloCss
			},
			callback:(records,operation,success)=> {
				if(success){
					if(records) {
						records.forEach((item) => {
							me.menu.add({
								xtype: 'menuitem',
				           		text: item.get('descrizione'),				           		
				           		handler: (th) => {
			           				me.menu.record.set('desEsito', th.config.text);
			           				me.menu.record.set('esito', item.get('id'));	
				          		}
				           	});
						});	
					}
				} else {	
					StdCba.msgShowError('', operation.getError());
				}
			}
		});					
	},
	
	cerca: function() {
		StdCba.svuotaStore(this.storeSomm);
//		StdCba.svuotaStore(this.storeCerca);
//		this.emptyDetails();
		
		let cmpDataDal= this.cntCerca.down('#DataDal');
		
		if(!StdCba.isValidDate(cmpDataDal)) {
			return;
		}
				
		let pnlCerca= this.cntCerca,
			slider= this.cntCerca.down('slider'),
			valueSlider= slider.getValue() == 0 ? 'F' : 'T',			
			dataDal= cmpDataDal.getValue(),
			dataInizio= Ext.Date.clone(dataDal),
			dataFine= Ext.Date.clone(dataDal),
			cbTurno= this.cntCerca.down('#CbTurno');							
	
		Ext.Date.clearTime(dataInizio);
		Ext.Date.clearTime(dataFine);
		
		if(Ext.isEmpty(cbTurno.getValue())) {
			dataInizio.setHours(0);
			dataInizio.setMinutes(0);
			
			dataFine.setHours(23);
			dataFine.setMinutes(59);
		} else {
			let selRec= cbTurno.getSelectedRecord(),
				dataInizioTurno= selRec.get('dataInizio'),
				dataFineTurno= selRec.get('dataFine');
			                		
			dataInizio.setHours(dataInizioTurno.getHours());
			dataInizio.setMinutes(dataInizioTurno.getMinutes());
			
			dataFine.setHours(dataFineTurno.getHours());
			dataFine.setMinutes(dataFineTurno.getMinutes());
			
			//se turno notturno aumento di un giorno la data fine
			/*if(dataFine < dataInizio)
				dataFine= Ext.Date.add(dataFine, Ext.Date.DAY, 1);*/
		}
		
		let dataFineOggi= new Date();
		dataFineOggi.setHours(23);
		dataFineOggi.setMinutes(59);
		
		//memorizzo gli ultimi parametri nel controller per averli disponibili nella funzione cerca
		this.dataInizio= dataInizio; 
		this.dataFine= dataFine;		
		this.includiAB= valueSlider;
		this.puoiSomministrare= (this.dataInizio <= dataFineOggi) /*&& (this.cbaConfig.permesso == 'S')*/; //TODO_PLS 
						
		//sovrascrivo i parametri standard del cerca
		pnlCerca.controller.cbaConfig.myParams= {
			dataInizio: this.dataInizio,
			dataFine: this.dataFine,
			includiAB: this.includiAB,
			sedi: this.idSede,
			reparti: this.idReparto
		}
		
		//se ho passato come parametro l'anagrafica alla videata, mi posiziono su di essa
//		if(this.cbaConfig.controllerPageStd.cbaConfig.controllerTestata.cbaConfig.anagraficaSel) {
//			Ext.apply(pnlCerca.controller.cbaConfig.myParams, {
//				idAna: this.cbaConfig.controllerTestata.cbaConfig.anagraficaSel.get('codOspite'),
//				idRicovero: this.cbaConfig.controllerTestata.cbaConfig.anagraficaSel.get('idRicovero')
//			});	
//		}
		
		pnlCerca.controller.aggiornaStore();								
	},
	
	emptyDetails: function() {//TODO_PLS
		
		let	cntButtons= this.getCntButtons(),			
			cntAlBisogno= this.getCntAlBisogno();			
		
		cntAlBisogno.down('#AvAb').hide();
		cntButtons.down('#BtnSomministra').setDisabled(true);
		
		this.getLbAssistito().setValue('');
		this.getLbDataNascita().setValue('');
		this.getLbResidenziale().setValue('');
		this.getLbCodFisc().setValue('');
	},
	
	gestioneButtonAb: function() {//TODO_PLS
					
		let form = this.lookupReference('Form');
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/somm/showAB',
			params: {
    			idRicovero: this.idRicovero,
    			dataInizio: this.dataInizio,
    			dataFine: this.dataFine
    		}, 
			success: (response) => {
				let risposta = Ext.JSON.decode(response.responseText);
				
				if(risposta.success){
					form.createFabs.btnAb.setHidden(!risposta.data);
				} else {	
					StdCba.msgShowError('',risposta.message);
				}
			}
		});		
	},
	
	creaButtonAB: function() {//TODO_PLS
		
		let form = this.lookupReference('Form');
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnAb', reference: 'BtnAb',
			bottom: 50,
			right: 20,
			height: 50,
			width: 50,
			hidden: true,
			menuButtonDefault: {
				text: 'AB',
			},
		});
		btnAb = form.createFabs.btnAb = Ext.Viewport.down('#BtnAb');
		btnAb.setCls('cbaButtonVerde');
		
		btnAb.on('tap', (th, e)=>{
			e.preventDefault();
			if(this.puoiSomministrare) {					
				let dataInizio= Ext.Date.clearTime(Ext.Date.clone(this.dataInizio)),
					dataNow= Ext.Date.clearTime(new Date());
				
				//non posso modificare le somministrazioni precedenti ad oggi
				/*if(dataInizio < dataNow)
					return;*/
				if(Ext.is.Phone){
			    	var menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels'),
			   			level = this.cbaConfig.controllerMainApp.lookupReference('Level2');
					
					level.add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni', {
						cbaConfig:{
							percorsoVideata: 'CS.menuAzioni.somministrazioneTerapie.ListAlBisogno',
							nomeVideata: StdCba.traduci('TERAPIE_AL_BISOGNO'),
							tipo: this.cbaConfig.tipo,
							controllerMainApp: this.cbaConfig.controllerMainApp,
							livelloPrec: this.cbaConfig.controllerMainApp.lookupReference('MainLevels').getActiveItem().getItemId(),
							controllerForm: this
						}
					}));
					menuCard.setActiveItem('#Level2');
				}else{
					let left = Ext._bodyEl.el.dom.offsetWidth/2 + (Ext._bodyEl.el.dom.offsetWidth/2 -350) / 2
					this.pnlAb = Ext.create('Ext.Panel', {
						itemId: 'PanelAB', reference: 'PanelAb',
						layout: {
							type:'vbox',
							align: 'stretch'
						},
						top: '10%',//TODO_PLS automatizzare per tablet
						left: left,
						width:  350,
					    height: '80%',
					    floated: true,
					    modal: true,
					    hideOnMaskTap: true,
					    flex: 1,
					    items:[
					    	
					    ]
					});
					this.pnlAb.add(Ext.create('CS.menuAzioni.somministrazioneTerapie.ListAlBisogno', {
						cbaConfig:{
							controllerForm: this
						}
					}));
					this.pnlAb.show();
				}
				
			}	
		});

	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnRipristina = form.createFabs.btnRipristina;
		btnRipristina.setHidden(true);
		btnConferma.setHidden(true);
		me.creaButtonAB();
		btnConferma.on('tap', ()=>{
			Ext.is.Phone ? Ext.Viewport.down('#PanelUtenti').setHidden(false) : null;
			this.tapConferma();//TODO_PLS fare anche sul buon finedel conferma
		});
		
		btnRipristina.on('tap', ()=>{
			form.createFabs.btnAb.setBottom(50);
			this.tapRipristina();
		});
	},
			
	init: function() {
		this.callParent(arguments);
		let me= this,
			cntButtons= me.lookupReference('CntButtons'),
			level = this.cbaConfig.controllerPageStd.cbaConfig.controllerMainApp.lookupReference('Level1'),
			urlLista;
		
		this.cbaConfig.controllerPageStd.cbaConfig.controller = this;
		this.lookupReference('Form').controller = this; //per pulsanti
		StdCba.createButton(me.cbaConfig.controllerPageStd);
	//	if(this.cbaConfig.controllerTestata.cbaConfig.isFromTerapie)
	//		this.cbaConfig.permesso= this.cbaConfig.controllerTestata.cbaConfig.permesso; 
		
		me.storeSomm= this.lookupReference('Grid').getStore();
		me.storeSomm.cbaConfig.list = true; //TODO_PLS testa
		me.storeAnagraficaSel = Ext.create('CbaCssView.store.AnagraficaUtSelezionato');
		me.creaMenu();					
		
		me.storeSomm.cbaConfig.list = true;
		me.idProfilo = CBA.parametriGenerali.idProfiloCss;
		
		/*GESTISCO LISTA OSPITI*/
		let ospitiFascicolo = Ext.Viewport.lista;
		if(!Ext.isEmpty(ospitiFascicolo))
			ospitiFascicolo.controller.getView().destroy();
		
	    Ext.is.Phone ? urlLista = 'Generali.arch.listaUtenti.ListaUtentiFloat' : urlLista = 'Generali.arch.listaUtenti.ListaUtenti';
		me.cntCerca= Ext.create(urlLista,{
	        cbaConfig: {  
	        	terapie: true, //lo utilizzo per non lanciare l'aggiornaStore sull'init della lista
	        	changeDataDal: false,
	        	myUrl: `${CbaRootServer}`+'/cba/css/cs/ws/somm/utenti/list',
	        	controllerMainApp: this.cbaConfig.controllerPageStd.cbaConfig.controllerMainApp,
	        	callbackExtraCerca: (record) => {
	        		me.storeAnagraficaSel.load({
	        			params: {
	        				id: record.get('codOspite')
	        			},
	        			callback: (records, operation, success) => {
	        				if (success) {            		
	        					let record =  records[0];
	        					
	        					this.recordOspite = record;
	        					this.imageInfo.setHidden(false);
	        					
	        					this.idRicovero= record.get('idRicovero'); 
	        					
	        					this.gestioneButtonAb(); 
	        	            	this.aggiornaGrid();	
	        				} else {
	        					StdCba.msgShowError('',operation.getError())
	        				}
	        			}
	        		});
	        	},
//	        	listeners:{
//	        		select: (th, record) => {              	
//		            	this.idRicovero= record.get('idRicovero'); 
//		            	this.gestioneButtonAb(); 
//		            	this.aggiornaGrid();	
//		            }
//	        	}
	            	
	        }
	    });
				
		me.storeCerca= me.cntCerca.down('#ListUtenti').getStore();
		me.storeCerca.getProxy().setUrl(`${CbaRootServer}`+'/cba/css/cs/ws/somm/utenti/list');
						
		if(!Ext.is.Phone){
			level.insert(0, this.cntCerca);
		}else{
			 Ext.Viewport.add(this.cntCerca); 
			 this.cntCerca.show();
		     this.panelFloatOspiti = this.cntCerca;
		     this.cntCerca = this.cntCerca.cbaConfig.controllerList.lookupReference('PanelUtenti');
		}
		
	    me.setComponentiCerca(me.cntCerca);                 
	    
	    this.cerca();
	    /*FINE GESTIONE LISTA OSPITI*/
	    //inserisco pulsante info ospite selezionato
	    let header = this.cbaConfig.controllerPageStd.lookupReference('PanelOspite');
		
	    this.imageInfo = Ext.create('Ext.Img', {
							src: 'resources/images/info.svg',
							width: 30,
							height: 30,
							hidden: true,
							listeners:{
								tap: (th) =>{
									let dettOspite = (Ext.create('CS.menuAzioni.somministrazioneTerapie.DettaglioOspite', {
										cbaConfig:{
											record : me.recordOspite
										}
									}));
									Ext.Viewport.add(dettOspite);
									dettOspite.show();
								}
							}
						});
	    
		header.insert(2, this.imageInfo);
	    
		
		me.storeSomm.on({
			'remove': function(th, record) {
	        	me.updateAddRemove(th, cntButtons, me.cntCerca);
	        },  
	        'update': function(th, record) {
	        	me.updateAddRemove(th, cntButtons, me.cntCerca);
	        },            
	        'add': function(th, record) {
	        	me.updateAddRemove(th, cntButtons, me.cntCerca, record);
	        },
	        'load': function(th, records, success, operation) {
	        	if(success){
//	        		me.abilitaButtonSomministra();
				} else {	
					StdCba.msgShowError('', operation.getError());
				}
	        }           
		});
	//	
	//	if(me.cbaConfig.controllerTestata.cbaConfig.anagraficaSel) {
	//		me.storeSomm.setGroupField(null);
	//		me.cntCerca.down('#Sede').setReadOnly(true);
	//		me.cntCerca.down('#Reparto').setReadOnly(true);
	//	} else {
	//		getColGrid(me.getGrid(), 'desViaDiSomm').hide();
	//	}		
	},		
	
	updateAddRemove: function(th, cntButtons, cntUtenti, record){
		//caso terapie al bisogno
		let terapiaAB = false;
		if(!Ext.isEmpty(record))
			terapiaAB = record[0].get('tipoTerapia') === 'B';
				
		let recModificati= !terapiaAB ? th.getModifiedRecords().length > 0 : true,
			form = this.lookupReference('Form'),
			btnEsci = this.cbaConfig.controllerPageStd.lookupReference('BtnBack'),
			btnOspiti = this.cbaConfig.controllerPageStd.lookupReference('BtnListaUtenti')
    	
    	form.createFabs.btnConferma.setHidden(!recModificati || !this.puoiSomministrare);
    	form.createFabs.btnRipristina.setHidden(!recModificati || !this.puoiSomministrare);
    	StdCba.abilitaDisabilita(btnEsci, recModificati || !this.puoiSomministrare);
    	StdCba.abilitaDisabilita(btnOspiti, recModificati);
    	btnOspiti.setDisabled(recModificati);
    	
    	if(recModificati || this.puoiSomministrare)
    		form.createFabs.btnAb.setBottom(160);
    	else
    		form.createFabs.btnAb.setBottom(50);
//    	this.abilitaButtonSomministra();
    	
    	!Ext.is.Phone ? cntUtenti.setDisabled(recModificati) : null;    	    	
	},
	
	abilitaButtonSomministra: function() {
		let somministra= false;
		
		this.storeSomm.each((rec) => {
			if(rec.get('esito') === null && this.isValidCompilatore(rec)) {
				somministra= true;
				return;
			}
		});
		
//		let	cntButtons= this.getCntButtons();
//		cntButtons.down('#BtnSomministra').setDisabled(!somministra || !this.puoiSomministrare);
	},
	
	destroy: function() {
		StdCba.eliminaStore(this.storeMenu);
		StdCba.eliminaStore(this.storeAnagraficaSel);
		StdCba.eliminaStore(this.storeSomm);
		this.cntCerca.lookupController().getView().destroy();
		Ext.Viewport.lista = null;
	    this.callParent();
	}

});
