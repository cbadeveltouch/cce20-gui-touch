class StdCba{

	constructor() {
		  this.numChiamateInizioAttesa;
		  this.attesa;
	}

	static initLaunchApp() {
		this.numChiamateInizioAttesa = 0;
		Ext.Loader.loadScript({
			url: 'app/generali/StdSipcar.js',
			onLoad: () =>{
				Ext.Loader.loadScript({
					url: 'app/generali/StdLoginSipcar.js',
					onLoad: () =>{
						this.stdLoginSipcar = new StdLoginSipcar();
						
						Ext.define('CBA.parametriGenerali',{});	
						
						/*Elenco scheramte gestite*/
						CBA.parametriGenerali.portlet = [
								'CS.diari.Diario',
								'CS.schede.schede.Tinetti.Tinetti',
								'CS.schede.schede.mmse.Mmse',
								'CS.schede.schedeModulari.domande.Domande',
								'CS.schede.schede.nortonexton.NortonExton',
								'CS.schede.schede.spmsq.Spmsq',
								'CS.schede.schede.cgi.Cgii',
								'CS.schede.schede.mhct.Mhct',
								'CS.schede.schede.nrsvrsvas.NrsVrsVas',
								'CS.schede.schede.kane.Kane',
								'CS.schede.schede.gds.Gds',
								'CS.schede.schede.cgi.Cgi',
								'CS.schede.schede.noppain.Noppain',
								'CS.schede.schede.morse.Morse'
						];
						CBA.parametriGenerali.videate = [
							'CS.parametri.Parametri',
							'CS.eventi.cadute.Cadute',
							'CS.eventi.contenzioni.Contenzioni'
						]
						Ext.CbaCssTouch.ContainerMain.add(Ext.create('CbaCssTouch.view.generali.arch.mainApp.MainApp', {}));
//									
					}
				})
			}
		});
	}
	
	static resettaForm(form){
		/*Resetto il dirtyChange*/
		form.dirty_original = null;
		form.dirty_oldIsDirty = false;
		form.fireEvent('dirtychange', form, false);
	}
	
	//CHECKBOX MULTIPLO STRINGA ('a;b;c')
	//Funzione che, passata una STRINGA di valori (restituita dal server)
	//va a cercare in base al NAME passato a parametro i campi da flaggare
	static caricaFieldString(form, stringaValori, name){
		if(Ext.isEmpty(stringaValori))
			return false;
		
		var me = this;
		var objKeyValues = {};
		
		var stringa = stringaValori;
		if(Ext.String.endsWith(stringaValori, ';'))
			stringa = stringaValori.substring(0, stringaValori.length-1); //Stringa alimentazioni dal server senza ";"
		
		var arr = stringa.split(';');
		var key;
		arr.forEach(function(i){    		//ciclo array alimentazioni DB e setto il check a true
			if(i != ''){
				key = '_tmp_' + name + '_' + i;
				form.lookupName(key)[0].setReadOnly(false);/*TODO_PLS verificare perche non si resetta prima*/
				form.lookupName(key)[0].setValue(true);
				objKeyValues[key] = true;
			}
		});
		
		
		form.setValues(objKeyValues);
	}
	
	/* Creo pulsanti floating
	 * il controller è quello della pagina Standard
	 * 
	 * */
	
	/*
	 * Nascondo il BtnMore se non vi sono pulsanti all'interno, si scatena all'hiddenChange dei pulsanti floating
	 * 
	 * */
	static hiddenButton(th, value){
		let btnMore = Ext.Viewport.down('#BtnMore'),
			trovato = false,
			fakeButton,
			itemId = th.getItemId();
		if(value === false && btnMore.getHidden() === false)
			return false;
		
		
		Ext.each( Ext.Viewport.items.items, function(items) {
			if(!Ext.isEmpty(items)){
				if(!Ext.isEmpty(items.config.itemId) && items.config.itemId === 'BtnFake')
					fakeButton = items;
				else if(!Ext.isEmpty(items.config.itemId) && items.pathButtonType === 'menuitem' && !Ext.isEmpty(items._hidden) && items._hidden == false)
						trovato = true;
				if(trovato)
					return false;
			}
		});
		fakeButton ? fakeButton.setHidden(!trovato) : null;
		btnMore.setHidden(!trovato);
		
		btnMore.cbaConfig.visible = trovato; 
	}
	
	static createButton(controller){//controller della paginaStd
		var me = controller;
		if(!me.cbaConfig.controller)
			return false;
		
		let permessoScrittura = controller.cbaConfig.permesso === 'S';
		
		/*Creo pulsanti floating sul Viewport*/
		//BTN NUOVO
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnNuovo', reference: 'BtnNuovo',
			bottom: 50,
			right: 20,
			height: 50,
			width: 50,
			menuButtonDefault: {
				icon: 'resources/images/buttonFloating/add.svg',
			},
			hidden: !permessoScrittura
		});
		
		//BTN MORE
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnMore', reference: 'BtnMore',
			bottom: permessoScrittura ? 110 : 50,
			right: 22.5,
			height: 45,
			width: 45,
			menuButtonDefault: {
				icon: 'resources/images/buttonFloating/more.svg',
			},
			menuItemGap:10,
			hidden: !permessoScrittura,
			items: [
				{
					//stupid place holder
					itemId: 'BtnFake', reference: 'BtnFake',
				},
				{
					icon:'resources/images/btnFunzione/clipboard2.svg',
					itemId: 'BtnCopia', reference: 'BtnCopia',
					listeners:{
						hiddenchange: StdCba.hiddenButton
					}
				},
				{
					icon:'resources/images/btnFunzione/bin.svg',
					itemId: 'BtnAnnulla', reference: 'BtnAnnulla',
					hidden: !permessoScrittura, //TODO_PLS o se gia annullata
					listeners:{
						hiddenchange: StdCba.hiddenButton
					}
				},
				{
					icon:'resources/images/btnFunzione/email.svg',
					itemId: 'BtnConsegna', reference: 'BtnConsegna',
					listeners:{
						hiddenchange: StdCba.hiddenButton
					}
				},
				{
					icon:'resources/images/btnFunzione/agenda-no.svg',
					itemId: 'BtnAgenda', reference: 'BtnAgenda',
					hidden: true,
					listeners:{
						hiddenchange: StdCba.hiddenButton
					}
				}
			]
		});
		
		//BTN CONFERMA
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnConferma', reference: 'BtnConferma',
			bottom: 50,
			right: 20,
			height: 50,
			width: 50,
			menuButtonDefault: {
				icon: 'resources/images/buttonFloating/conferma.svg',
			},
			hidden: true
		});
		
		//BTN RIPRISTINA
		Ext.create('CbaCssTouch.resources.ButtonFloating',{
			itemId: 'BtnRipristina', reference: 'BtnRipristina',
			bottom: 110,
			right: 22.5,
			height: 45,
			width: 45,
			menuButtonDefault: {
				icon: 'resources/images/buttonFloating/annulla.svg',
			},
			hidden: true
		});
		
		let form = me.cbaConfig.controller.lookupReference('Form');
		form.createFabs = {};
		
		if(!permessoScrittura)
			StdCba.bloccaFormCss(form, true);
		
		//TODO_PLS GESTIONE PULSANTI STANDARD
		let btnNuovo = form.createFabs.btnNuovo = Ext.Viewport.down('#BtnNuovo'),
			btnFake = form.createFabs.btnFake = Ext.Viewport.down('#BtnFake'),
			btnMore = form.createFabs.btnMore = Ext.Viewport.down('#BtnMore'),
			btnRipristina = form.createFabs.btnRipristina = Ext.Viewport.down('#BtnRipristina'),
			btnConferma = form.createFabs.btnConferma = Ext.Viewport.down('#BtnConferma'),
			btnCopia = form.createFabs.btnCopia = Ext.Viewport.down('#BtnCopia'),
			btnAgenda = form.createFabs.btnAgenda = Ext.Viewport.down('#BtnAgenda'),
			btnConsegna = form.createFabs.btnConsegna= Ext.Viewport.down('#BtnConsegna'),
			btnAnnulla = form.createFabs.btnAnnulla = Ext.Viewport.down('#BtnAnnulla');
		
		//nascondi faccio scattare l'hiddenchange
		form.createFabs.btnCopia.setHidden(true);
		form.createFabs.btnConsegna.setHidden(true);
		
		//nel caso di inserimento da azioni
		me.tipo === 2 ? me.nuovo = Ext.Viewport.editMode = true : null;
		me.tipo === 2 ? StdCba.btnNascondiMostra(me.nuovo, controller.cbaConfig.controller.lookupReference('Form')) : null;
		
		/*VISUALIZZO BUTTON OPZIONALI*/
		
		if(permessoScrittura){
			if(!Ext.isEmpty(controller.cbaConfig.buttonToShow)){
				Ext.each(controller.cbaConfig.buttonToShow, function(button, index){
					var button = button;
					Ext.Object.each(form.createFabs, function(key, record){
						if(record.getItemId() == button)
							record.setHidden(false);
						
					});
				});
			}
		}
		
		btnAnnulla.on('tap', function(){
			/*blocco dirtyChange*/
			me.cbaConfig.controller.lookupReference('Form').dirty_original = null;
		});

		btnNuovo.on('tap', (th, e)=>{
			e.preventDefault();
			let btnMore = Ext.Viewport.down('#BtnMore');
			btnMore._scope.__proto__.close(btnMore);
			me.nuovo = Ext.Viewport.editMode = true;
			me.lookupReference('PnlCompilatore').setNuovoRecord();
			let	controllerTestata = me.cbaConfig.controller.cbaConfig.controllerTestata,
				dataTestataInsert = controllerTestata.lookupReference('DataTestataInsert'),
				oraTestataInsert = controllerTestata.lookupReference('OraTestataInsert'),
				dataTestata = controllerTestata.lookupReference('DataTestata'),
				oraTestata = controllerTestata.lookupReference('OraTestata'),
				idProfilo = CBA.parametriGenerali.idProfiloCss;
			
			dataTestata.removeCls('testataAnnullata');
			oraTestata.removeCls('testataAnnullata');
			
			//nascondo frecce di navigazione
			controllerTestata.lookupReference('BtnLeft').setHidden(true);
			controllerTestata.lookupReference('BtnRight').setHidden(true);
			
			StdCba.cssGetPolicyRetrodatazione(th, dataTestata, oraTestata, dataTestataInsert, oraTestataInsert, idProfilo);
		});
		
		btnConferma.on('tap',(th, e)=>{
			e.preventDefault();
			if(me.cbaConfig.controller && Ext.isDefined(me.cbaConfig.controller.verificaCampiForm)){
				//TODO_PLS RICORDATI DI ATTACCARE CONTROLLER FORM AL CONTROLLER PAGESTD ANCHE SE NON HO TESTATA
				var continua = me.cbaConfig.controller.verificaCampiForm();
				if(continua){
					me.cbaConfig.controller.salvaForm(false);
					
				}
			}
		});
		
		btnRipristina.on('tap',(th, e)=>{
			e.preventDefault();
			/*Resetto il dirtyChange*/
			StdCba.resettaForm(form);
			me.nuovo = Ext.Viewport.editMode = false;
			me.tipo === 1 ? StdCba.btnNascondiMostra(me.nuovo, form) : null; 
		});
		
		btnCopia.on('tap', (th, e)=>{
			e.preventDefault();
			if(me.cbaConfig.nomeVideata != 'Contenzioni'){
				me.nuovo = Ext.Viewport.editMode = true;
				me.cbaConfig.controller.cbaConfig.controllerTestata.lookupReference('InfoScadenza').setHidden(true);
				me.lookupReference('PnlCompilatore').setNuovoRecord();
				let	dataTestataInsert = me.cbaConfig.controller.cbaConfig.controllerTestata.lookupReference('DataTestataInsert'),
					oraTestataInsert = me.cbaConfig.controller.cbaConfig.controllerTestata.lookupReference('OraTestataInsert'),
					dataTestata = me.cbaConfig.controller.cbaConfig.controllerTestata.lookupReference('DataTestata'),
					oraTestata = me.cbaConfig.controller.cbaConfig.controllerTestata.lookupReference('OraTestata'),
					idProfilo = CBA.parametriGenerali.idProfiloCss;
				
				StdCba.cssGetPolicyRetrodatazione(th, dataTestata, oraTestata, dataTestataInsert, oraTestataInsert, idProfilo);
				
				me.cbaConfig.controller.testataSelezionata = false;
				me.cbaConfig.controller.lookupReference('Form').getFields().id.setValue(-9999);
				StdCba.bloccaFormCss(me.cbaConfig.controller.lookupReference('Form'), false, true);
			}
			
		});
		
		//Permette di nascondere i pulsanti durante lo scroll
		me.lookupReference('PnlBody').on('painted', function(){
			me.delay = 100;
			me.timeout = null;
			let pnlBody = this.el.component,
				form = pnlBody.down('#Form'),
				scroller = form.config.scrollable;
		
			if (scroller === false){
				Ext.each( form.query('container'), function(container) {//nel caso in cui non sia sulla form 
					if(container.getScrollable()){
						scroller = container.getScrollable();
						//Nel caso del TabPanel ho piu container con lo scrollable
						scroller.on('scroll', function(th){
							StdCba.scroll(controller);
						});
					} 
				})
			}else{
				scroller = form.getScrollable();
			}
			
			if(scroller){
				scroller.on('scroll', function(th){
					StdCba.scroll(controller);
				});
			}
		});
		
		me.cbaConfig.controller.gestionePulsanti();
	}
	
	
	static abilitaDisabilitaDataPicker(abilita, controller){
		var me = controller;
		let	controllerTestata = me.cbaConfig.controller.cbaConfig.controllerTestata,
			dataTestata = controllerTestata.lookupReference('DataTestata'),
			oraTestata = controllerTestata.lookupReference('OraTestata'),
			dataTestataInsert = controllerTestata.lookupReference('DataTestataInsert'),
			oraTestataInsert = controllerTestata.lookupReference('OraTestataInsert');
		
		if(abilita === true){
			dataTestataInsert.cbaConfig.originValue = dataTestataInsert.getValue();
			oraTestataInsert.cbaConfig.originValue = oraTestataInsert.getValue();
			if(Ext.isEmpty(dataTestataInsert.getValue()))
				dataTestataInsert.setValue(new Date());
			
			if(Ext.isEmpty(oraTestataInsert.getValue()))
				oraTestataInsert.setInputValue(StdCba.FormattaData(new Date(), 'H:i'));
		}else{
			dataTestataInsert.setValue(dataTestataInsert.cbaConfig.originValue);
			oraTestataInsert.setValue(oraTestataInsert.cbaConfig.originValue);
		}
		
		dataTestata.setHidden(abilita);
		oraTestata.setHidden(abilita);
		dataTestataInsert.setHidden(!abilita);
		oraTestataInsert.setHidden(!abilita);
		
	}
	
	static abilitaDisabilitaBtn(controller){
		var me = controller;
		Ext.each( me.lookupReference('PnlHeader').query('image'), function(image){
			me.nuovo ? image.addCls('css-grigio') : image.removeCls('css-grigio');
			me.nuovo ? image.suspendEvent('tap') : image.resumeEvent('tap');
		});
	}
	
	static btnNascondiMostra(nuovo, form){
		
		let btnRipristina = Ext.isDefined(form.createFabs) ? form.createFabs.btnRipristina : null,
			btnConferma = Ext.isDefined(form.createFabs) ? form.createFabs.btnConferma : null,
			btnMore = Ext.isDefined(form.createFabs) ? form.createFabs.btnMore: null,
			btnNuovo = Ext.isDefined(form.createFabs) ? form.createFabs.btnNuovo : null,
			tipo = form.controller.cbaConfig.controllerPageStd.tipo == 2 || 
						form.controller.cbaConfig.percorsoVideata === 'CS.consegne.Consegne';
		
		/*Altrimenti sulle consegne rimane il pulsante annulla*/
		if(!Ext.isEmpty(btnMore)){
			btnMore._scope.__proto__.open(btnMore);
			btnMore._scope.__proto__.close(btnMore);
			if(btnMore.cbaConfig.visible) 
				btnMore.setHidden(tipo ? true : (nuovo ? true :  !btnMore.cbaConfig.visible));
		}
		
		!Ext.isEmpty(btnRipristina) ? btnRipristina.setHidden(!nuovo) : null;
		!Ext.isEmpty(btnConferma) ? btnConferma.setHidden(!nuovo) : null;
		!Ext.isEmpty(btnNuovo) ? btnNuovo.setHidden(tipo ? true : (form.permesso != 'S') ? true : nuovo) : null;
		
		
	}
	//dopo lo scroll
	static btnFloatMostra(form){
		Ext.each(form.btnVisible, (btn)=>{
			btn.setHidden(false);
		});
		form.btnVisible =[]; //TODO_PLS da ottimizzare e da verificare quando viene usata la funzione btnNascondiMostra
	}
	
	static salvaStatoBtn(controllerPageStd){
		let form = controllerPageStd.cbaConfig.controller.lookupReference('Form');
		form.btnVisible =[];
		Ext.Object.each(form.createFabs, (key, btn)=>{
			if(!btn.getHidden())
				form.btnVisible.push(btn);
		});
	}
	
	static scroll(controllerPageStd){
		
		let form = controllerPageStd.cbaConfig.controller.lookupReference('Form');
		if(!Ext.isDefined(form.btnVisible) || Ext.isEmpty(form.btnVisible))
			this.salvaStatoBtn(controllerPageStd);
		
		//altrimenti non nasconde tutti i figli
		let btnMore = form.createFabs.btnMore;
		btnMore._scope.__proto__.open(btnMore); 
		btnMore._scope.__proto__.close(btnMore); //TODO_PLS TROVARE ALTERNATIVA PER RICHIAMARE CHIUDI
		
		Ext.Object.each(form.createFabs, function(key, items) {
			if(items.pathButtonType === 'menu')
				items ? items.setHidden(true) : null
		});
		var containerNomeVideata = controllerPageStd.lookupReference('PnlHeader').down('#ContainerNomeVideata');
		!Ext.isEmpty(containerNomeVideata) ? containerNomeVideata.setHidden(false) : null;
	    clearTimeout(controllerPageStd.timeout);
	    controllerPageStd.timeout = setTimeout(()=>{
	    	StdCba.btnFloatMostra(form);
			!Ext.isEmpty(containerNomeVideata) ? containerNomeVideata.setHidden(true) : null;
	    },controllerPageStd.delay);
	}
	
	static destroyFloatingButton(form){
		var me = this;
		let item = [],
			c = 0;
		
		if(form){//sul change del livello per evitare che mi distruggo i pulsanti del livello nuovo elimino i pulsanti legati alla form precedente
			Ext.Object.each(form.createFabs, (key, record)=>{
					record.destroy();
			});
		}else{
			//elimino pulsanti presenti 
			Ext.each( Ext.Viewport.items.items, function(items) {
				c += 1;
				if(!Ext.isEmpty(items)){
					if(items.xtype === 'button')
						item.push(c);
				} 
			});
			item.reverse();
			
			Ext.each(item, function(index) {
				Ext.Viewport.items.items[index-1].destroy();
			});
		}
		
	}
	/*FINE GESTIONE PULSANTI FLOATING*/
	
	/*Abilita disabilita singolo pulsante passato a parametro*/
	static abilitaDisabilita(btn, disabilita){
		disabilita ? btn.addCls('css-grigio') : btn.removeCls('css-grigio');
		disabilita? btn.suspendEvent('tap') : btn.resumeEvent('tap')
	}
	
	/*Creo menu dinamicamente all'interno di un carousel, che si autoAdatta alla dimensione dello schermo*/
	//colore indica quando devo togliere il colore dal css
	//bordo delle icone se a true noBorderIcon 
	static createMenu(controller, sessionStorage, height, width, colore, noBorderIcon){
		var me = controller;
		
		let countRecord = 0,
			menu = me.lookupReference('MainContainer'),
			countPageCarousel = 1,
			limit,
			countRecordForPage = 0,
			isArray = Ext.isArray(sessionStorage),
			store = Ext.isObject(sessionStorage),
			storeSession,
			headerHeight = me.lookupReference('MenuToolbar') ? me.lookupReference('MenuToolbar').getHeight() : 80,
			headPageStd = (me.cbaConfig.controllerPageStd && me.cbaConfig.controllerPageStd.lookupReference('PnlHeader')) ? me.cbaConfig.controllerPageStd.lookupReference('PnlHeader').getHeight() : null,
			bodyWidth = me.getView().getWidth() ? (Ext.getBody().getViewSize().width * parseInt(me.getView().getWidth())/100)  : Ext.getBody().getViewSize().width ,
			bodyHeight = me.getView().getHeight() ? (Ext.getBody().getViewSize().height * parseInt(me.getView().getHeight())/100): Ext.getBody().getViewSize().height;
		
		headerHeight += headPageStd;
			
		if(isArray)
			storeSession = sessionStorage
		else{
			storeSession = store ? sessionStorage.getData().items : JSON.parse(sessionStorage).children
		}
		me.storeLenght = storeSession.length;
		menu.add(Ext.create('Ext.carousel.Carousel', {
			itemId: 'CarouselMenu', reference: 'CarouselMenu',
			layout: {
				align: 'stretch',
				type: 'hbox'
			},
			flex:1,
			items:[
				{
					xtype: 'container',
					layout: {
						type: 'fluid',
						align:'stretch',
						pack: 'center'
					},
					flex: 1,
					items:[
					]
				}
			]
		}));

		let corouselNavigation = me.lookupReference('CarouselMenu').getItems().items[0],
			borderCarousel = corouselNavigation.el.getRight();
		
		//pagina non ancora reinderezzata quindi calcolo io l'altezza per capire quando cambiare pagina
		let	heightTot = height,
			widthTot = 0,
			widthRow = 0,
			numberRow = 0;
		
		for(var i=0; i< storeSession.length; i++){
			
			let item = storeSession[i];
			var config = store ? item.getData() : item;
			countRecord += 1;
			countRecordForPage += 1;
			
			if(store){
				item.icona = item.get('icona');
				item.descrizione = item.get('descrizione');
			}
		
			//icone dello stesso colore
			if(!Ext.isEmpty(item.icona) && colore){
				var pos = item.icona.lastIndexOf('css'),
					icona = pos != -1 ? item.icona.slice(0,pos) : item.icona;
			}
			
			let portelt = Ext.isEmpty(item.form) && !store;
			
			let container =	 Ext.create('Ext.Container', {
								 itemId: 'ContainerMenu'+ Ext.id(), reference: 'ContainerMenu'+ Ext.id(),
								 pathMenu: true,
								 layout: {
									 	type: 'vbox',
										align: 'middle',
										pack: 'center'
								 },
								 maxHeight: height,
								 width: width,
								 margin: '0 5 5 5',
								 listeners:{
									 element: 'element',
									 tap: 'tapContainer'
								 },
								 cbaConfig: config,
								 items:[
									{
										xtype: 'container',
										layout:{
											type: 'hbox',
											align: portelt ? 'start' : 'center',
											pack: portelt ? 'start' : 'middle'
										},
										padding: '5px',
										width: noBorderIcon ? height - 40 : height-46,
										height: noBorderIcon ? height - 40 : height-46,
										cls: noBorderIcon ? 'noEvent' : 'cbaMenuIcon' + ' noEvent',
										items:[
											{
												 xtype: 'image',
												 width: portelt ? 40 : (noBorderIcon ? height - 50: height-70),
												 height: portelt ? 40 : (noBorderIcon ? height - 50: height-70),
												 cls: Ext.isEmpty(icona) ? item.icona + ' noEvent' : icona + ' noEvent'
											 }
										]
									},
									{
										 xtype: 'label',
										 html: StdCba.traduci(item.descrizione),
										 style:{
											'text-align':'center'
										 },
										 height: 36
									}
								 ],
			 				});
			
			if(!limit){ //viene impostato una volta creata la prima pagina, indica il numero di tessere che ci stanno in una pagina
				widthTot += width + 10; //margini 10
				widthRow += width + 10;
				
				if(widthRow > bodyWidth){
					heightTot += height ;
					widthRow = width + 10;
				}
				
			}
			
			var containerMain = me.lookupReference('CarouselMenu').getItems().items[countPageCarousel];
			containerMain.add(container);
			
			//verifico se il container si trova sopra al carousel e se non cè sufficiente spazio per aggiungere un altro container a destra
			//creata la prima pagina tengo in memoria gli elementi che possono stare in un pagina e poi verifico tramite quello
			
			var end = Ext.isEmpty(limit) ? true : limit != countRecordForPage
			
			if(widthRow + width > bodyWidth)
				numberRow +=1 ;		
					
			if((limit == countRecordForPage && me.storeLenght != countRecord) || heightTot + height > bodyHeight - headerHeight-3/*per azioni*/ && widthRow + width > bodyWidth){
							
				widthTot = 0;
				heightTot = 0;
				widthRow = 0;
				limit = countRecordForPage;
				countRecordForPage = 0;
				borderCarousel += corouselNavigation.el.getRight();
				//aggiungo container in fondo per strecciare meglio menu
				containerMain.add(Ext.create('Ext.Container', {
									layout:{
										type: 'vbox',
										align: 'stretch'
									},
									minWidth: 200,
				}));
				countPageCarousel = countPageCarousel +1;
				me.lookupReference('CarouselMenu').add(Ext.create('Ext.Container', {
					layout: {
						type: 'fluid',
						align:'stretch',
						pack: 'center'
					},
					margin: '5 5 10 5'
				}));
				var containerMain = me.lookupReference('CarouselMenu').getItems().items[countPageCarousel];				
			}else if(end && me.storeLenght == countRecord){//se ho gia riempito la pagina non serve il container vuoto
				numberRow +=2;
				containerMain.add(Ext.create('Ext.Container', {
									layout:{
										type: 'vbox',
										align: 'stretch'
									},
									width: bodyWidth,//in modo che vada a capo anche su tablet
									height: bodyHeight - headerHeight-3 -(numberRow * width) - (numberRow * 10) 
									//TODO_PLS modificare in modo automatico e non dimensione fissa
				}));
			}
		};
		
		me.lookupReference('CarouselMenu').getItems().items[0].setHidden(countPageCarousel === 1);//se ho solo una pagina nascondo il pallino di navigazione
		
	}
	
	/* funzione che data la data di ingresso con la relativa frequenza (uso di combobox)  ne calcola la scadenza
	per usare questa funzione è necessario usare  combo.selection e passarglielo alla funzione   */ 
	static calcolaDataDiScadenza(data,record,th){
		
		if(!record || !data){
			th.messageDataScadenza ='NESSUNA_FREQUENZA_INSERITA';
			return false;
		}
		var scadenza=null;	
		var rec=record.data;
		var numero= rec.numero;
		switch (rec.tipo) {
			case "G":
				scadenza = new Date(new Date(data).setDate(data.getDate() +	numero));
				break;
			case "M": 
				 scadenza = new Date(new Date(data).setMonth(data.getMonth()+numero));
				break;
			case "S":
				numero  = numero * 7; 
				scadenza = new Date(new Date(data).setDate(data.getDate()+numero));
				break;
		}
		th.messageDataScadenza = StdCba.traduci('SCADENZA_PREVISTA') + ' ' + Ext.Date.format(scadenza,'d/m/Y');
		th.setHidden(false);
		
		th.on('tap', function(th) {
			Ext.toast(th.messageDataScadenza);		
		})
			
	}
	
	static cssCaricaImpoVideata(controller, store, callbackFnOnSuccess, urlPerson){
		if( !Ext.isEmpty(store) ) {
			controller.storeImpostazioni = Ext.create(store);
			
			if(urlPerson)
				controller.storeImpostazioni.getProxy().url = urlPerson;

			controller.storeImpostazioni.load({
				params: {
					idProfilo: controller.idProfilo
				},
				callback: function(records,operation,success){
					if(success){					
						if(callbackFnOnSuccess)
							callbackFnOnSuccess(controller, records[0]);
					}else{
						StdCba.msgShowError('',operation.getError());	
					}
				}
			});
		}
	}
	
	static eliminaStore(store){
		if(store) {	// laddove questa funzione viene scatenata da un automatismo
					// potrebbe non esserci lo store
			var s;
			if(store.isStore){ // se il parametro nomeStore e' lo store...
				s= store;
			}else{
				s= Ext.getStore(store);
			}

			// rimuovo lo store solo se lo trovo
			if(s){
				s.destroy();
			}
		}
	}
	
	static cssGetWarningHours(arrayTipoBlocco = []) {
		/*
		 *  controllo se nell'arrayTipoBlocco che viene giu dal ws / è presento il blocco con codice 13 che fa scattarare 
		 *  il warning sul numero di ore di retrodatazione 
		 */
		if (!arrayTipoBlocco || arrayTipoBlocco.length === 0) {
			return false;
		}
		return arrayTipoBlocco.find(rec => rec.valore.includes("W")) 
	}
	
	static Messaggio(titolo,testo,bottoni,icona, callback_ok, callback_yes, callback_no, callback_cancel, primoPiano){
	    titolo= Localizer.getLocalizedString(titolo);
	    testo= Localizer.getLocalizedString(testo);
	    
	    // se il parametro testo contiene piu di un carattere "\n" suddivido la
		// stringa in vari msg
	    var s= testo,
	    	ris_icona;
	    s= s.split("\n");
	    if(s.length > 1){
	        // s.splice(0, 1); //cancello il primo elemento
	        testo= '';
	        for(var i = 0;i < s.length; i++){
	            /* Se il primo carattere e' "£" non creo l'elemento della lista */
	            if (s[i][0] == "£")
	                testo = testo + StdCba.traduci(s[i].slice(1));
	                else if (s[i][0] == "?")
	                    testo = testo + '<li>' + StdCba.traduci(s[i].slice(1)) + '</li>';
	                    else testo = testo + '<li>' + StdCba.traduci(s[i]) + '</li>';
	        }
	    }

	    // N.B il chiamata e' asincrona !! se uso la chiamata messaggio l'istruzione
		// successiva viene eseguita senza attendere l'input utente !

	    // YESNOCANCEL - OK
	    // INFO - QUESTION - WARNING - ERROR
	    if (icona=='')
	        ris_icona= '';
	    else ris_icona= Ext.MessageBox[icona];

	    var cls;
	    if (primoPiano){
	        cls= 'msg_floating'; // per rendere la finestra sempre in primo piano
									// nel caso di errore del server
	    }

	    var defBtn = 1;
	    if ((bottoni == 'YESNOCANCEL') || (bottoni == 'YESNO'))
	    	defBtn = 2;

	    // se non passo cancel non visualizzo bottone annulla - VEE per css 2.0
	    if(bottoni == 'YESNOCANCEL' && typeof(callback_cancel) != 'function' )
	    	bottoni = 'YESNO';

	    function showResult(btn){
	        if (btn=='ok' && Ext.isDefined(callback_ok)){
	            if(typeof(callback_ok)=='function'){
	                callback_ok();
	            }else{
	            	Ext.log.warn('*********** Messaggio : utilizzo di eval ***********');
//	                eval(callback_ok);
	            }
	        } else if (btn=='yes' && Ext.isDefined(callback_yes)){
	            if(typeof(callback_yes)=='function'){
	                callback_yes();
	            }else{
	            	Ext.log.warn('*********** Messaggio : utilizzo di eval ***********');
	            }
	        } else if (btn=='no' && Ext.isDefined(callback_no)){
	            if(typeof(callback_no)=='function'){
	                callback_no();
	            }else{
	            	Ext.log.warn('*********** Messaggio : utilizzo di eval ***********');
	            }
	        } else if (btn=='cancel' && Ext.isDefined(callback_cancel)){
	            if(typeof(callback_cancel)=='function'){
	                callback_cancel();
	            }else{
	            	Ext.log.warn('*********** Messaggio : utilizzo di eval ***********');
	            }
	        }
	    };
	    Ext.Msg.config.standardButtons.yes = {text: 'Si'};
	    return Ext.Msg.show({
	    	width: !Ext.is.Phone ? 300 : null,
	        title: titolo,
	        message : testo,
	        buttons: Ext.MessageBox[bottoni],
	        fn: showResult,
	        modal: true,
	        cls: cls
	    });
	}
	
	//si scorre tutto l'obj passato a parametro, elimina i campi temporanei ('_tmp')
	//la FN ritorna l'obj (record)
	static eliminaCampiTmp(newRecord){
		var newRecordEl = newRecord;
		var daEliminare = [];
		
		for(var x in newRecord){
			//temgo da parte tutti i campi temporanei
			if(x.indexOf('_tmp') != -1){
				daEliminare.push(x);
			}
		}	
		//scorro i campi da rimuovere e li elimino dall'oggetto newRecord
		daEliminare.forEach(function(i){
			delete newRecordEl[i];
		});
		
		return newRecordEl;
	}
	
	static isValidDate(cmpData){
		return ((cmpData.getValue())&&(cmpData.isValid())/*&&(cmpData.getRawValue().length==10)*/);
	}
	
	//funzione legata alla ricerca avanzata standard
	static cssFiltriStdOff(controller) {
		if( controller &&
				controller.cbaConfig.controllerTestata &&
					controller.cbaConfig.controllerTestata.filtriAttivi ) {
			var filtriAttivi = controller.cbaConfig.controllerTestata.filtriAttivi;
			filtriAttivi.cbaConfig.aggiornaDati = false;
			filtriAttivi.setValue(0);
			filtriAttivi.cbaConfig.aggiornaDati = true;
		}
	}
	
	//scorre tutto l'obj passato a parametro, converte tutti i booleani in formato 'T'/'F'
	//return un obj formattato
	static convertiBool(newRecord, fields){
		var obj = newRecord;
		var field = fields;
		var keys = [];
		var key;
		
		keys = Ext.Object.getKeys(obj);
		
		var valore;
		keys.forEach(function(i, index){
		    valore = obj[i];
		    if(typeof(valore) == 'boolean'){
		    	obj[i] = StdCba.getBoolValue(valore);	      
		    }
		    
		    if(valore === null && !Ext.isEmpty(field[i]) && field[i].xtype === 'checkbox')
		    	obj[i] = 'F';
		    
		});
		
		return obj;		
	}
	
	/*Avvalora CbaMultipleChoice*/
	static cercaCbaMultipleChoice(form, records){
		Ext.each(form.query('[xtype=cbaMultipleChoice]'), function(group){
			let name = group.down('textfield').getName();
			group.setValueExclusive(records.get(name));
		})
	}
	
	//si scorre tutto l'obj passato a parametro, elimina i campi temporanei ('_tmp') e si ricava dei name univoci
	//costruendo le singole proprietà contenenti la stringa dei valori checkati splittati dal separatore passato , o dal ;
	//la FN ritorna l'obj (record) formattato
	static campiTempInString(newRecord, separatore){
		var newRecordEl = newRecord;
		var daEliminare = [];
		var temporanei = [];
		for(var x in newRecord){
			//temgo da parte tutti i campi temporanei
			if(x.indexOf('_tmp') != -1){
				daEliminare.push(x);
				//metto da parte solo quelli con valore TRUE
				if(!Ext.isEmpty(newRecord[x]))
					temporanei.push(x.substr(5));
			}
		}
		
		//scorro i campi da rimuovere e li elimino dall'oggetto newRecord
		daEliminare.forEach(function(i){
			delete newRecordEl[i];
		});
		
		var campiString = {},
			arrAppo = [],
			sep = !separatore ? ';' : separatore,
			name;
		var item;
		temporanei.forEach(function(i){
			arrAppo = i.split('_');
			name = arrAppo[0];
			item = newRecordEl[name];
			if(item){
				newRecordEl[name] = item + sep + arrAppo[1]+sep;	//concateno con valore precedente
			}else{
				newRecordEl[name] = sep+arrAppo[1]+sep;	//inizializzo proprietà in oggetto
			}
		});
		
		return newRecordEl;
	}
	
	static convertiStringinBool(newRecord, fields){
		var obj = newRecord;
		var field = fields;
		var keys = [];
		var key;
		
		keys = Ext.Object.getKeys(obj.getData());
		Ext.Object.each(field, (index, f) =>{
			var length = f.length > 1;
			Ext.each(f, field =>{
				if(field.xtype == 'checkboxfield' || field.xtype == 'radiofield' || field.xtype == 'checkbox'){
					var valore = obj.get(field.name);
				 	if(valore === 'T'){
				    	obj.set(field.name, true)	
				    	if(length > 1 && i.config.value === true)
		    				i.setChecked(true)
				    	else
				    		field.setChecked(true)
				    }else if (valore === 'F'){
				    	obj.set(field.name, false)
				    }else{
				    	//se è un cbaMultipleChoice (cbaInputValue) non faccio nulla ho la funzione cercaCbaMultipleChoice
				    	if(!Ext.isDefined(field.cbaInputValue) && valore == field._inputValue)
				    		field.setChecked(true)
				    }
				}
			});
			
		});
		return obj;		
	}
	
	static getBoolValue(boolvalue,valtrue,valfalse) {
		if(!valtrue){
			valtrue= 'T';
		}

		if(!valfalse){
			valfalse= 'F';
		}

		if (boolvalue==true) {
			return valtrue;
		}else{
			return valfalse;
		}
	}
	
	static FormattaOra(data,formato){
		if (data==null)
	    	return "";

		if (!Ext.isDate(data))
			data = Ext.Date.parse(data,'c');

		if(Ext.Date.isEqual(data, new Date(1899, 11, 31, 0, 0, 0)))
			return "24:00";
		else return Ext.util.Format.date(new Date(data),'H:i');
	}
	
	static getGiorno(giorno){
		if(giorno==7){
			giorno=0;
		}
		return Ext.Date.dayNames[giorno];
	}
	
	static FormattaData(data, formato){
		if (data==null)
			return '';

		if (Ext.isString(data)) {
			var ndata = Ext.Date.parse(data, 'c');
			if(!Ext.isDefined(ndata)) {
				ndata = new Date(Date.parse(data));
			}
			data = ndata;
		}

		if (formato==undefined)
			formato= 'd/m/Y';

		return Ext.util.Format.date(data, formato);
	}
	
	static traduci(key,arraySubStrings){
		return Localizer.getLocalizedString(key,arraySubStrings);
	}
	
	// -------------------------------------------- GESTIONE MESSAGGI
	// ---------------------------------------

	static msgAddError(listaMsg,testo){
		if(Ext.isArray(testo)){
			Ext.each(testo,function(item){
				listaMsg.push(item);
			});
		}else{
			listaMsg.push({testo: testo,tipo: 2});
		}
	}

	static msgAddWarning(listaMsg,testo){
		if(Ext.isArray(testo)){
			Ext.each(testo,function(item){
				listaMsg.push(item);
			});
		}else{
			listaMsg.push({testo: testo,tipo: 1});
		}
	}

	static msgAdd(listaMsg,testo){
		if(Ext.isArray(testo)){
			Ext.each(testo,function(item){
				listaMsg.push(item);
			});
		}else{
			listaMsg.push({testo: testo,tipo: 0});
		}
	}

	static msgShowText(titolo,messaggio)	{
		var messaggi= [];
		StdCba.msgAdd(messaggi,messaggio);
		StdCba.msgShow(titolo,messaggi);
	}

	static msgShowError(titolo,messaggio, callback_ok)	{
		var messaggi= [];
		StdCba.msgAddError(messaggi,messaggio);
		StdCba.msgShow(titolo,messaggi, null, callback_ok);
	}

	static msgShowWarning(titolo,messaggio)	{
		var messaggi= [];
		StdCba.msgAddWarning(messaggi,messaggio);
		StdCba.msgShow(titolo,messaggi);
	}

	static msgShow(titolo, messaggi, bottoni, callback_ok, callback_yes, callback_no, callback_cancel, hideNumeroAvvisi){
		// NB: messaggi puo essere un array o una stringa
		// tipo: 0= nessuno, 1= warning, 2= errore

		// se non ho messaggi esco
		if(Ext.isEmpty(messaggi)){
			return true;
		}

		// esco in caso di messaggio con codice 666 (in questo caso il testo e' un
		// oggetto), per evitare errori di localize
		if(messaggi.length==1 && Ext.isObject(messaggi[0].testo)){
			return true;
		}

		//titolo= traduci(titolo);

		var numErrori = 0;
		var numWarning= 0;
		var listaErrori= '';
		var listaWarning= '';
		var listaAltro='';
		var listaAppo = '';
		var lista= '';

		// se messaggi e' una stringa, la trasformo in array
		// if(!Ext.isArray(messaggi)){
		// var txt= messaggi;
		// messaggi= new Array({testo: txt,tipo: 0});
		// }



		// ciclo l'array dei messaggi e creo l'html da visualizzare
		if (Ext.isArray(messaggi)) {
			Ext.each(messaggi,function(item){
				var classeMsg = '';
				listaAppo = '';
				switch(item.tipo) {
					case 1:
						classeMsg = 'class="li-warning"';
						break;
					case 2:
						classeMsg = 'class="li-errore"';
						break;
					default:
						classeMsg = "";
				}

				if(item.testo){
					var messaggiAppo = item.testo.split("\n");
					for(var i = 0; i<messaggiAppo.length; i++){
						if (i == 0)
							listaAppo= listaAppo + '<p ' + classeMsg + '>'+StdCba.traduci(messaggiAppo[i])+'</p>';
						else
							listaAppo= listaAppo + '<p>' + StdCba.traduci(messaggiAppo[i]) + '</p>';
					}
				}

				switch(item.tipo) {
					case 1:
						listaWarning = listaWarning + listaAppo;
						numWarning++;
						break;
					case 2:
						listaErrori = listaErrori + listaAppo;
						numErrori++;
						break;
					default:
						listaAltro = listaAltro + listaAppo;
				}

			});
			lista = '<p class="ulMsg">' + listaErrori + listaWarning + listaAltro + '</p>';
		}else{
		    // se il parametro s e' una sola stringa controllo se contiene piu di un
			// carattere "\n".
			// In caso affermativo suddivido la stringa in vari errori tranne la
			// prima riga che rappresenta il titolo
				messaggi = messaggi.split("\n");
				if(messaggi.length>1){
					messaggi.splice(0, 1); // cancello il primo elemento per
											// togliere una scritta del server
			}
			var app='';
			for(var i=0;i<messaggi.length;i++){
				app= app + '<li>'+StdCba.traduci(messaggi[i])+'</li>';
			}
			lista=app;
		}

		// se non ho errori mostro il pannello a scomparsa
		if((numErrori+numWarning)==0){
			StdCba.msgShowPopup().msg(titolo,lista);
		}else{
			// visualizzo la window di errore
			if(!titolo){
				titolo= '';
			}else{
				titolo= titolo+'<br>';
			}

			// visualizza il numero di avvisi nella barra del titolo
			if(!hideNumeroAvvisi){
				if (numErrori>0){
					titolo = titolo + StdCba.traduci('MSG_ERRORI_TROVATI') + ': ' + numErrori;
				}

				if (numWarning>0){
					if(numErrori>0){
						titolo= titolo + ' - ';
					}
					titolo = titolo + StdCba.traduci('MSG_WARNING_TROVATI') + ': ' + numWarning;
				}
			}

			if(!bottoni){
				bottoni= 'OK';
			}
			Ext.Msg.config.yes = {text: 'Si'};
			Ext.Msg.show({
				title:'<span class="cbaLabel labelErrore">'+titolo+'</span>',
//				cls: 'msgError msg_floating',
				message: lista,
				buttons: Ext.MessageBox[bottoni],
				closable: false,
				modal: true,
				width: '90%',
				fn:function(btn) {
					if(btn=='ok' && callback_ok){
						callback_ok();
					}else if(btn=='yes' && callback_yes){
						callback_yes();
					}else if(btn=='no' && callback_no){
						callback_no();
					}else if(btn=='cancel' && callback_cancel){
						callback_cancel();
					}
				}
			});
		}

		return numErrori==0; // se ho almeno un errore restituisco false per
								// bloccare l'inserimento dati
	}

	static msgShowPopup(){
		var msgCt;
		
	    return {
	        msg : function(titolo,messaggio){
	        	Ext.toast(messaggio, 2000);
	        }
	    };
	}

	// -------------------------------------------- FINE GESTIONE MESSAGGI
	// ---------------------------------------
	
	static cssHasBloccoModifica( tipoBlocco ) {
		return StdCba.cssGetBlocchi(tipoBlocco)[0] != 'WR';
	}
	
	static cssGetBlocchi( tipoBlocco ) {
		var blocco = [];
		if( tipoBlocco
				&& tipoBlocco.length > 0
					&& Ext.isDefined(tipoBlocco[0].codice)
						&& tipoBlocco[0].codice != -1 ) {	//nel caso in cui non e' gestito lato WS il codice e' -1
			var codice = tipoBlocco[0].codice,
				valore = tipoBlocco[0].valore,
				descrizione = tipoBlocco[0].extra;
			switch ( valore ) {
				case 'S':
					blocco.push('WR', valore, '');		//tutto sbloccato (scrittura)
					break;
				case 'A':
					blocco.push('DEL', valore, descrizione);	//record annullato (cycle bin)
					break;
				case 'P':
					blocco.push('SOME', valore, descrizione);	//modifica parziale (lucchetto aperto)
					break;
				case 'C':
				case 'M':
				case 'L':
					blocco.push('LOCK', valore, descrizione);	//record bloccato (lucchetto chiuso)
					break;
				
				default:
					blocco.push('SCONOSCIUTO', valore, descrizione);
					if(!CBA.parametriGenerali.produzione)
						alert('Info Sviluppo: tipoBlocco non riconosciuto in fn cssGetBlocchi!');
					break;
			}
		} else {
			if(!CBA.parametriGenerali.produzione)
				alert('Info Sviluppo WS: campo tipoBlocco deve restituire almeno un elemento valido!');
		}
		
		return blocco;
	}
	
	static trovaRecord(store,chiave,valore,ricercaParziale){
		var exactMatch= true;
		if(ricercaParziale){
			exactMatch= false;
		}

		if( (valore) || (!isNaN(valore)) ){ // se ho un valore o se il valore e' un numero(caso valore = 0)
			if(store.tree){
				return store.getRootNode().findChild(chiave,valore,true);
			}else{
				return (
					(store.findRecord(chiave,valore,0,false,false,exactMatch)) ||
					(Ext.isString(valore)&&(store.findRecord(chiave,valore.toString(),0,false,false,exactMatch))) // caso combo con valore di tipo stringa
				);
			}
		}else{
			return false;
		}
	}
	
	static initRicercaAvanzataMobile( box, controllerMain, hideFiltriBase, filtriPerson, callbackFn ) {
		var cmp = Ext.create('Ext.Container', {
			layout: {
	    		type: 'hbox',
				align: 'stretch',
				pack: 'end'
	    	},
	    	margin: '5 0 0 0',
	    	nonDisabilitare: true,
	    	items: [
		        {
		        	xtype: 'image',
					cls: 'icon-filter-off',
		        	itemId:'BtnAvanzate', reference:'BtnAvanzate',
		        	width: 35,
					scale: 'medium',
		            height: 35,
		            listeners:{
		            	tap: 'showPnlRicerca'//su testataStdController
		            }
		        }
			]
		});
		box.add(cmp);
		
		controllerMain.pnlRicerca = Ext.create('Ext.Panel', {
			itemId: 'PanelFiltro',
			layout: {
				type:'vbox',
				align: 'stretch'
			},
			flex: 1,
			width: Ext.is.Phone ? '80%' : 350,
			height: controllerMain.calendarioConsegne ? '100%': null,
		    floated: true,
		    modal: true,
		    right: controllerMain.calendarioConsegne ? 64 : null,
		    hideOnMaskTap: true,
		    closable: true,
		    closeAction: 'hide'
		});
		controllerMain.pnlRicerca.add(Ext.create('Generali.arch.ricercaAvanzata.RicercaAvanzata', {
			 cbaConfig: {
					controllerTestata: controllerMain,
					hideFiltriBase: hideFiltriBase,
					filtriPerson: filtriPerson,
					callbackFn: callbackFn
				}
		}));
	}
	
	//TODO_PLS vedere se funziona
	static validaForm(nomeCmp){
	    var me=Ext.getCmp(nomeCmp);

		if(!me){// se nomeCmp e' direttamente il componente allora me= nomeCmp
			me= nomeCmp;
		}

		function ciclaElementi(item){
			item.items.each(function(item){
				if (item) {
					if ((item.xtype=='panel')||(item.xtype=='fieldset')||(item.xtype=='gridpanel')||(item.xtype=='CBAShortcutGrid')||(item.xtype=='tabpanel')||(item.xtype=='container')||(item.xtype=='form')){
						ciclaElementi(item);
					}else {
						if(item.validateValue){
							item.validateValue(item.getValue());
						}
					}
				}
			});
		}

		ciclaElementi(me);
	}
	
	static loadScript(url,onLoad,onError) {
		Ext.Loader.loadScript({
			url: url,// +noCache(),
			onLoad: function(){
				if(onLoad){
					onLoad();
				}
			},
			onError: function(){
				if(onError){
					onError();
				}
			}
		});
	}
	
	static svuotaStore(storeName){
		if(!storeName){
			Ext.log.warn('Funzione SvuotaStore chiamata con parametro a null in ' + getCallerFunction());
			return;
		}
		if(storeName.isStore){ // se il parametro nomeStore e' lo store...
			storeName.loadData([],false);
			storeName.totalCount= 0;
		}else{
			var s= Ext.getStore(storeName);
			s.loadData([],false);
			s.totalCount= 0;
		}
	}
	
	//funzione che SULLE FORM STANDARD restituisce il record della testata selezionata
	static cssTrovaRecordTestata(form) {
		if( form.controller && form.controller.cbaConfig.controllerTestata ) {
			var stTestate = form.controller.cbaConfig.controllerTestata.storeRegistrazioni,
				teSel = form.controller.testataSelezionata,
				recTestata;
			//converto testata stringa in intero per ricerca nello store
			if( Ext.isString(teSel) && teSel != '' )
				teSel = parseInt(teSel);
			return stTestate.getAt(stTestate.findExact('id', teSel));
		} else {
			alert('Info Sviluppo: Passare il controller alla form!');
		}
	}

	static bloccaFormCss( form, lock) {
		let typeLock;
		lock = lock === true ? true : false;
		
		if(form){
			StdCba.containerSolaLettura(form, lock);		
			form.cbaConfig.lock = lock;
			var controller = form.controller;
			let controllerPageStd = controller.cbaConfig.controllerPageStd,
				pnlCompilatore= controllerPageStd.lookupReference('PnlCompilatore'),
				btnBlocco = controllerPageStd.lookupReference('ImgBlocco');
			
			
			//vedo se la videata è del tipo SCHEDA APERTA A PIU' COMPILATORI
			var recTestata = false,
				tipoBlocco;
			if( form.controller &&
					form.controller.cbaConfig.controllerTestata &&
						form.controller.cbaConfig.controllerTestata.storeRegistrazioni ) {			
				recTestata = StdCba.cssTrovaRecordTestata(form);
				tipoBlocco = recTestata ? recTestata.get('tipoBlocco') : null;
			} else {	//TODO_VEE BloccaFormCSS: else gestione form senza timeline testate
				//fai qualcosa
			}
			
			if( form.permesso == 'S' &&	lock && tipoBlocco && StdCba.cssGetBlocchi(tipoBlocco)[0] == 'SOME' ) {
				StdCba.cssAbilitaModificaTerzi(form, true);
				typeLock = 'unlocked';
			} else	StdCba.cssAbilitaModificaTerzi(form, false);
			
			
			var secForm = form.cbaConfig.secondaryForm;
			if ( secForm && secForm.cbaConfig.secondaryFormLock ) {
				secForm.cbaConfig.secondaryFormLock(tipoBlocco, lock, typeLock);
			}
		}
	}
	
	static cssAbilitaModificaTerzi(form, unlocked) {
		var areeTerzi = form.query('[modificaTerzi]');
		Ext.each(areeTerzi, function(area) {
			if( unlocked ) {
				containerSolaLettura(area, !unlocked);
			}
			if(unlocked)
				area.addCls('css-area-modificabile');
			else	area.removeCls('css-area-modificabile');
		});
	}

	static clearForm(nomeForm){
	    var me= Ext.getCmp(nomeForm);

		if(!me){// se nomeForm e' direttamente la form allora me= nomeForm
			me= nomeForm;
		}

		var data={};
		
		function ciclaElementi(item) {
			var containers = [
				'panel', 'fieldset', 'gridpanel', 'tabpanel', 'container', 'formpanel', 'cda', 'cbaMultipleChoice'
			];
			//Nel cbaMultipleChoice non esiste item.items
			var item = Ext.isDefined(item._items) ? item._items : item.items

			item.each(function(item){
				if (item) {
					if ( item.xtype && containers.indexOf(item.xtype) != -1 ) {
						ciclaElementi(item);
						if(item.lastValue) {
							item.lastValue = null;
						}
					} else {
						if (item.xtype=='radiofield'){
							item.setReadOnly(false); /*Sblocco il change nell'override*/
							item.setChecked(false);
							item._checked = false;
						}else if (item.xtype=='selectfield'){
							// cancello i filtri del combobox
							if(item.queryFilter) {
								item.lastquery = "";
								item.queryFilter.setDisabled(true);
								item.store.filter();
							}
							item.setValue(null);
						}else if (item.xtype=='textareafield'){
							item.setInputValue(null);
						}else if (item.xtype=='checkboxfield'){
							item.setReadOnly(false); /*Sblocco il change nell'override*/
							item.setChecked(null);
						}else{
							if(item.setValue)
								item.setValue(null);
						}

						if(item.config.name)
							data[item.config.name]=null;
					}
				}
			});

		}

		Ext.suspendLayouts();
		ciclaElementi(me);
		me.setValues(data);
		me.reset();
		Ext.resumeLayouts(true);
	}

	static containerSolaLettura(nomeCmp,solaLettura){
	    var me=Ext.getCmp(nomeCmp);
		if(!me){// se nomeCmp ? direttamente il componente allora me= nomeCmp
			me= nomeCmp;
		}

		if(solaLettura==undefined){
			solaLettura= true;
		}

		function ciclaElementi(item){
			let item_tmp;
		
			!Ext.isEmpty(item.items) ? item_tmp = item.items : item_tmp = item._items; // cbaMultipleChoice non ha item.items
			item_tmp.each(function(item){
				if ( item && Ext.isDefined(item.getXTypes) ) {	
					var xtype= item.xtype,
						nonDisabilitare,
						isGrid= xtype == 'gridpanel' || xtype == 'grid' || xtype == 'CBAShortcutGrid' || xtype == 'treepanel';
					if(xtype == 'tabbar')//TODO_PLS
						return false;
					if (isGrid) {
						item.solaLettura= solaLettura;

						// se ho una toolbar disabilito tutti i bottoni tranne
						// quelli con icona esci o che hanno nella config del button
						// il parametro disabled=false
						var toolbarGrid= item.query('toolbar')[0];
						if(toolbarGrid){
							toolbarGrid.items.each(
								function(item){
									nonDisabilitare= item.iconCls=='icon-esciGriglia' || item.nonDisabilitare===true;
									if((item.xtype=='button')&&(!nonDisabilitare)){
										item.setDisabled(solaLettura);
									}
								}
							);
						}
					}else{
						if(item.items) {
							nonDisabilitare= item.nonDisabilitare===true;

							// se l'item non e' da disabilitare non disabilito
							// neppure i suoi figli
							if(!nonDisabilitare){
								ciclaElementi(item);
							}
						} else {
							if(item.setReadOnly){
								if( !item.nonDisabilitare )
									item.setReadOnly(solaLettura)
							}else if(item.setDisabled){
								nonDisabilitare= item.nonDisabilitare===true;

								if(!nonDisabilitare){
									item.setDisabled(solaLettura);
								}
							}
						}
					}
				}
			});
		}

		ciclaElementi(me);
	}

	/*
	 * Gestione chiusura e riapertura browser/pagina
	 *
	 * function myUnload(event) { if (window.localStorage) { // flag the page as
	 * behing unloading window.localStorage['myUnloadEventFlag']=new
	 * Date().getTime(); }
	 *  // notify the server that we want to disconnect the used in a few seconds (I
	 * used 5 seconds) askServerToDisconnectUserInAFewSeconds(); // synchronous AJAX
	 * call }
	 *
	 * function myLoad(event) { if (window.localStorage) { var t0 =
	 * Number(window.localStorage['myUnloadEventFlag']); if (isNaN(t0)) t0=0; var
	 * t1=new Date().getTime(); var duration=t1-t0; if (duration<10*1000) { // less
	 * than 10 seconds since the previous Unload event => it's a browser reload (so
	 * cancel the disconnection request) askServerToCancelDisconnectionRequest(); //
	 * asynchronous AJAX call } else { // last unload event was for a tab/window
	 * close => do whatever you want (I do nothing here) } } }
	 */
	static requestexception(){
		Ext.Ajax.on('beforerequest',function( conn, options, eOpts){
			/*
			 * if(localStorage.getItem('cbaLogoutEseguito')=='T'){
			 *  }
			 */

			var opt = options.url.toUpperCase();

			var escludi= ['STATOELAB/NEWID','STATOELAB/GET']; // parti dell'url da
																// analizzare

			var trovato= false;
			Ext.each(escludi,function(item){
				if(opt.indexOf(item)!=-1){
					trovato= true;
				}
			});
			
			if ( options && options.params && options.params.hideInizioAttesa) {
				options.hideInizioAttesa = true;
				trovato = true;
				delete options.params.hideInizioAttesa;
			}

			// se non ho la lingua oppure l'url contiene una delle chiavi dell'array
			// escludi non visualizzo il messaggio
			if((!trovato)&&(Ext.ClassManager.isCreated('CBA.parametriGenerali.lingua'))){
				inizioAttesa();
				Ext.getBody().setStyle('cursor','wait');
			}
			
		}, Ext.getBody());
	}

	static requestexception(){
		Ext.Ajax.on('requestexception', function(conn,response,options,eOpts){

			var err = localStorage.getItem('cbaErroreConnessione');
			var pathLogin= "http://localhost:8090/CbaCssTouch/";

			//fineAttesa(true);

			if (response.status==0 && response.timedout){

				// e' il timeout della singola chiamata! es stampa/elenco o altro...
				if(!err || err=="F")
					localStorage.setItem('cbaErroreConnessione','T');
				alert(Localizer.getLocalizedString('MSG_TIMEOUT'));
			}else if (response.status==503 || response.status==412 || response.status==404){
				if(!err || err=="F"){
					StdCba.Messaggio('MSG_ERRORE_SERVER_GENERICO',response.responseText,'OK','ERROR');
				}
			}else if (response.status==666){
					if (options.url==`${CbaRootServer}`+'/cba/gen/auth/session/isAlive'){
							if (localStorage.getItem('cbaLogoutEseguito')=='F')
								localStorage.setItem('cbaLogoutEseguito','T');
						} else {
						// intercetto sacdenza sessione x timeout
							alert(Localizer.getLocalizedString("MSG_SESSIONE_TERMINATA"));
							window.location.reload();
							localStorage.setItem('cbaLogoutEseguito','T');
							localStorage.setItem('cbaLogoutCaller',options.url);	// per intercettare la chiamata che causa l'errore di sessione scaduta
//																				
//							parent.location.href= pathLogin;
						}
				// }
			}else{
				if(!err || err=="F"){
					localStorage.setItem('cbaErroreConnessione','T');

					// se e' gia' andato in timeout non visualizzo il secondo messaggio
					if(localStorage.getItem('cbaLogoutEseguito')=='T'){
						return;
					}

					var statusText= response.statusText;
					if(response.status==0){
						statusText= Localizer.getLocalizedString('MSG_SERVER_UNAVAILABLE')+'\n'+response.statusText;
					}
					if (response.status !=-1)
						alert(Localizer.getLocalizedString('MSG_ERRORE_SERVER')+' ['+response.status+']:'+'\n'+statusText);
					// parent.location.href= pathLogin;
				}
			}
		})
	}
	
	static loadStorePromise(store = null, params = {}, callBackFn = null) {
		
		if (store) {
			return new Promise((resolve, reject) => { 
				store.load({
					params: params,
					callback: (records,operation,success) => {
						if(success && callBackFn) {
							callBackFn(records);
						}	
						if (success) {					
							resolve(records);
						} else {
							reject(operation.getError());
						}
					}
				})
			});
		}
	}
	
	static sommaDataOra(data,ora){	
		var dataRegistrazione = false;
		var dataFormattata = Ext.Date.clearTime(data);
		if(data) {
			dataRegistrazione = Ext.Date.add(dataFormattata, Ext.Date.HOUR, ora ? parseInt(ora.substr(0,2)) : 0);
			if(ora)
				dataRegistrazione = Ext.Date.add(dataRegistrazione, Ext.Date.MINUTE, parseInt(ora.substr(3,5)));
		} else dataRegistrazione = new Date();
		
		return dataRegistrazione;
	}
	
	
	
	static descNomeProfUser(){
		var operatore = CBA.moduli.modulo49.operatore;
		var nome = operatore.descr;
		var professione = operatore.figuraProfessionale;
		return nome + ' (' + professione + ')';
	}
	
	static dmyIsEqual(d1, d2){
		var df = d2 ? d2 : new Date();
		return d1.getDate() == df.getDate() && d1.getMonth() == df.getMonth() && d1.getFullYear() == df.getFullYear();
	}
	
	static getServerTime(){
		return new Promise((resolve, reject) => { 
			
			Ext.Ajax.request({
				method: 'GET',		
				url: `${CbaRootServer}`+'/cba/gen/config/serverDateTime',
				success: (response) => {
					let risposta = Ext.JSON.decode(response.responseText);
					if (risposta.success){	
						resolve(risposta.data);
					} else {
						reject(risposta.message[0].testo)
					}
				}
			});
		});
	}
	
	static retrodatazione(th){
		let	me = th.lookupController(),
			controllerTestata = me.cbaConfig.controllerTestata,
			dataTestataInsert = controllerTestata.lookupReference('DataTestataInsert'),
			oraTestataInsert = controllerTestata.lookupReference('OraTestataInsert'),
			dataTestata = controllerTestata.lookupReference('DataTestata'),
			oraTestata = controllerTestata.lookupReference('OraTestata'),
			idProfilo = CBA.parametriGenerali.idProfiloCss;
		
		dataTestata.removeCls('testataAnnullata');
		oraTestata.removeCls('testataAnnullata');
		
		StdCba.cssGetPolicyRetrodatazione(me, dataTestata, oraTestata, dataTestataInsert, oraTestataInsert, idProfilo);
	}
	
	static cssGetPolicyRetrodatazione(componente = null, campoData = null, campoOra = null, campoDataInsert = null, campoOraInsert = null) {
		
		let idProfilo = CBA.parametriGenerali.idProfiloCss;
		let store = Ext.create('CbaCssView.store.PersonRetrodatazione');
	
		//ImpostaUrl([store]);
		/*
		 *  chiamata per ora del server  e settagio dei parametri nei rispettivi campi 
		 */
		StdCba.cssSetDataOraRegistrazione(componente, campoData, campoOra, campoDataInsert, campoOraInsert);
		
		StdCba.loadStorePromise(store, {idProfilo}, null)
			.then(response => {
			
			/*
			 *  se ho il campo consenti a  TRUE : vengono impostate delle politiche di retrodatazione del dato in modalità di inserimento che posso essere di due tipi
			 * 
			 *  	1 - modifiche entro la giornata  (entro le 23.59) (campo data bloccato campo ora libero)
			 *   	2 - senza limiti il dato può essere retrodatata fino a n giorni/ore indietro (campo data sbloccato campo ora sbloccato)
			 * 
			 * se ho il campo consenti a FALSE: non viene concessa per nessun motivo la retrodatazione / retroorazione del dato 
			 * 	
	 		 */	
			let {consenti, tipo} = response[0].data,
				lockCampi = consenti === 'F';
			
			componente.cbaConfig.consentiRetrodatazione = !lockCampi;
		
			if (!lockCampi) {
				let lockData = tipo === 1; //modifiche in giornata
				
				campoDataInsert.setHidden(lockData);
				campoData.setHidden(!lockData);
				
				if (lockData) {
					campoOraInsert.setHidden(!lockData)
					campoOra.setHidden(lockData);
				} else { //modifiche senza limiti
					campoOraInsert.setHidden(false)
					campoOra.setHidden(true);
				}
			} else {
				campoOraInsert.setHidden(true)
				campoOra.setHidden(false);
				campoDataInsert.setHidden(true);
				campoData.setHidden(false);
			}
		})
		.catch(msg =>  StdCba.msgShowError('', msg));
	}
	/*
	 *  fn x nuove policy di retrodatazione
	 */
	static cssSetDataOraRegistrazione(componente = null, campoData = null, campoOra = null, campoDataInsert = null, campoOraInsert = null) {
		
		if (componente && campoData && campoOra) {
			StdCba.getServerTime().then(rec => {
				let data = new Date(rec);
				campoDataInsert.setValue(data);
				campoDataInsert.setDateFormat('d/m/Y'); // per dare formattazione quando buildata altrimenti non la prende
				campoOraInsert.setValue(StdCba.FormattaData(data, 'H:i'));
				componente.cbaConfig.serverDate = data;
			});
		}
	}
	/*
	 *  fn x nuove policy di retrodatazione
	 */
	static cssCheckDataOraRegistrazione(componente = null, campoData = null, campoOra = null) {
		
		let data = null;
		if (componente && campoData && campoOra) {
			if (Ext.isDefined(componente.cbaConfig.consentiRetrodatazione) &&
					!componente.cbaConfig.consentiRetrodatazione &&
						!componente.cbaConfig.disableRetrodatazione) {
				
				data = componente.cbaConfig.serverDate;
			} else {
				data = StdCba.sommaDataOra(campoData.getValue(), campoOra.getInputValue());
			}
		}
		return data;
	}
	
	static cbaValidId(id) {
		var intId = parseInt(id),
			isNumber = Ext.isNumber(intId);
		return isNumber && intId >= 0;
	}
	
	static setStatoConsegna( record, label ) {

		var testoConsegna = '';

		if (!Ext.isEmpty(record) && !Ext.isEmpty(record.idConsegna)) {
			if (record.letta) { 

				var countLettori = '<strong>' + record.numeroLettori + '</strong>';
				testoConsegna = '<span style="color: #86C567;">' + StdCba.traduci('CS_CONSEGNA_LETTA') + '</span>';
			
			} else {
				
				testoConsegna = '<span style="color: #EE3442;">' + StdCba.traduci('CS_CONSEGNA_NON_LETTA') + '</span>';
				
			}
			
			label.setHtml('<span><strong>' + testoConsegna + '</strong><span>');
			label.setStyle('cursor', (record.letta ? 'pointer' : 'default'));

		}else {
			//se sto inserendo una nuova consegna sbianco lo stato della label
			label.setHtml('');
		}
	}


	//funzione per la gestione della consegna / dato l'id della form viene fatta una chiamata per verificare se è presente una consegna
	static cssGestioneConsegna( rec, controller, callbackFn ) {
	
		Ext.suspendLayouts();	
		var form = controller.lookupReference('Form'),
			btnConsegna = form.createFabs.btnConsegna,
			isRegAnnullata = false;
		
		if (StdCba.cssHasBloccoModifica(controller.recordTestata.get('tipoBlocco'))) {
			isRegAnnullata = StdCba.cssGetBlocchi(controller.recordTestata.get('tipoBlocco'))[0] == 'DEL'; 
		}
		
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/getStatoConsegnaByRiferimento', 
			params: {
				idRiferimento: rec.get('id'),
				tipoConsegna: controller.cbaConfig.tipoConsegna,
			},
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var record = risposta.data;
				if(risposta.success){
	
					controller.cbaConfig.consegna = record; 
					controller.consegnaLetta = StdCba.cbaValidId(record.idConsegna) && record.letta; 
					controller.nuovaConsegna = !StdCba.cbaValidId(record.idConsegna); 
					
					/*Se la consegna non esiste cambio il titolo della schermata*/
					if(Ext.isEmpty(controller.cbaConfig.consegna.idConsegna)){
						controller.cbaConfig.parametri.nomeVideata= StdCba.traduci('CS_INSERIMENTO_CONSEGNA');
					}else{
						controller.cbaConfig.parametri.nomeVideata= StdCba.traduci('CS_GESTISCI_CONSEGNA');
					}
						
					Ext.apply( controller.cbaConfig.consegna ,{
						idRiferimento: rec.get('id'), 						//per collegare la consegna alla testata o all'id di un record dove prevista consegna
						compilatoreReg: rec.get('compilatore'), 			//compilatore registrazione 
						isRegAnnullata: isRegAnnullata,						//per bloccare la form della consegna
						compilatoreConsegna: record.compilatoreConsegna 	//compilatore consegna 
					});
					//TODO_PLS label nel panel bottone
					//StdCba.setStatoConsegna(record, controller.lookupReference('LblStatoConsegna'));
					let permesso = controller.lookupReference('Form').permesso
					btnConsegna.setHidden(permesso == 'L' || (record.idConsegna && CBA.moduli.modulo49.operatore.id != record.compilatoreConsegna)
							|| (CBA.moduli.modulo49.operatore.id != rec.get('compilatore') || (isRegAnnullata && controller.nuovaConsegna)));
					
					//btnConsegna.setText(StdCba.traduci(!controller.nuovaConsegna ? StdCba.traduci('CS_GESTISCI_CONSEGNA'): StdCba.traduci('CS_CREA_CONSEGNA')));
					
					if (callbackFn) {
						callbackFn();
					}
	
					
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
		Ext.resumeLayouts(true);
	
	}
	
	// hideFiltriBase: possibilità di nascondere compltamente il set di filtri gia preimpostati  vedi (evento evidenzia/ allegati)
	// showAllegati: possibilità di abilitare il check allegati se la vidata principale gli prevede
	// filtri person: filtri personalizzati vedere view Diario.js 

	static initFiltriConsegna(box, me, filtriPerson, hideFiltriBase, showAllegati) {
		
		showAllegati = showAllegati || false;
		filtriPerson = filtriPerson || false;
		hideFiltriBase = hideFiltriBase || false;

		if (hideFiltriBase && !filtriPerson) {
			box.setHidden(true);
			return false;
		}
		
		//filtri personalizzati
		if (filtriPerson) {
			box.add(filtriPerson);
		}
		
		if (!hideFiltriBase) {
			//filtri di base 
			var items = [
				{
					xtype: 'container',
					layout: {
						type: 'hbox'
					},
					padding: 3,
					items: [
						{
							xtype: 'checkbox',
							hidden: !showAllegati,
							margin: '0 0 0 0',
							boxLabel: StdCba.traduci('ALLEGATI'),
							name: 'allegati',
							inputValue: 'T',
							uncheckedValue: 'F'
						},
						{
							xtype: 'checkbox',
							margin: '0 0 0 15',
							boxLabel: StdCba.traduci('DA_EVIDENZIARE'),
							name: 'eventoEvidenzia',
							inputValue: 'T',
							uncheckedValue: 'F'
						}
					]
				}
			];
			box.add(items); //aggiungo in coda
		}
	}
	
	static cssImpostazioniConsegne() {
		var store = Ext.create('CbaCssView.store.PersonConsegne',{autoLoad:false});
		if (!Ext.isEmpty(store)) {
			store.load({
				params:{
					idProfilo: CBA.parametriGenerali.idProfiloCss
				},
				callback: function(records,operation,success){
					if(success){					
						if (Ext.isDefined(CBA.moduli.modulo49)) {
							if (!Ext.isEmpty(records)) {
								CBA.moduli.modulo49.impostazioniConsegne = records[0];
							}
						}
					}else{
						StdCba.msgShowError('',operation.getError());	
					}
				}
			});
		}
	}

	
	/* 
	PARAM: controllerMain - passate il controller dalla view principale 
   	PARAM: campiOpzioniCons - array di componenti per eventuali opzioni 
   	PARAM: fnInizializzaFiltri - funzione che viene eseguita sull' onLaunch della view di consegne es: se avete dei filtri da impostare vedi videata diario.js'
   	PARAM: vettCmpNote - array o singolo campo note presente nella videata principale   
	*/
	static cssCreaConsegna(controller, permesso, campoNote, filtriPerson, fnInizializzaFiltri, fnVerifiCampiConsegne, hideFiltriBase, showAllegati){
		var tipoConsegna,
			recordImpostaz = CBA.moduli.modulo49.impostazioniConsegne, 	// recupero le impostazioniConsegne 
			consegnaAbilitata = false,
			arrayTipoTestata = ['Diari$D'] 							    // Nome della Tesata con la lettera della consegna
		
		if (recordImpostaz) {	
			tipoConsegna = controller.cbaConfig.tipoConsegna; 			// recupero tipo Consegna
			if (tipoConsegna) {
				if (controller.cbaConfig.tipoTestata) {
					arrayTipoTestata.forEach(
						function(testata){
							if (testata.includes(controller.cbaConfig.tipoTestata)) {
								tipoConsegna = testata.split('$')[1];
							}
						});
				}
				//verifico se la consegna è abilitata nella tabella di personalizzazioni delle consegne nell funzioni di servizio
				var storeConsegne = Ext.create('CS.consegne.TipoConsegna'),
					record = StdCba.trovaRecord(storeConsegne, 'abbreviazione', tipoConsegna); //cerco il record nello store consegne 
				
				if (record) {
					consegnaAbilitata = recordImpostaz.data[record.get('columnTblPersonConsegne')] == 'T'; 
				}
			}
		}
		var form = controller.lookupReference('Form'),
			btnConsegna = form.createFabs.btnConsegna;
		
		btnConsegna.setHidden(form.permesso == 'L' || !consegnaAbilitata)
		btnConsegna.cbaConfig = {
			consegnaAbilitata: consegnaAbilitata,					
		};
		
		let controllerMainApp = controller.cbaConfig.controllerPageStd.cbaConfig.controllerMainApp,
		menuCard = controllerMainApp.lookupReference('MainLevels'); 
		controller.cbaConfig.parametri = {
					nomeVideata: StdCba.traduci('CS_GESTISCI_CONSEGNA'),
					percorsoVideata: 'CS.consegne.Consegne',
					tipo: 2,
					controllerMainApp: controllerMainApp,
					controllerForm: controller,
					consegna: controller.cbaConfig.consegna,
					filtriPerson: filtriPerson,
					fnInizializzaFiltri: fnInizializzaFiltri,
					fnVerifiCampiConsegne: fnVerifiCampiConsegne,
					campoNote: campoNote,
					permesso: permesso,
					hideFiltriBase: hideFiltriBase,
					showAllegati: showAllegati
		};
	
	}
	
	static setMsgOnDeleteRecWithConsegna(ctrl = null) {
		
		if (!ctrl) 
			return;
		
		let msg = `MSG_ANNULLA_RECORD`;
		if (Ext.isDefined(ctrl.cbaConfig.consegna) && 
				!Ext.isEmpty(ctrl.cbaConfig.consegna.idConsegna)) {
			msg = `ANNULLAMENTO_RECORD_CONSEGNA_MOVIMENTATA`;
		} 
		return msg;
	}
	
	static tapBtnConsegna(controller){
		if (!controller.cbaConfig.consegna  || !StdCba.cbaValidId(controller.cbaConfig.consegna.idRiferimento)) {
			StdCba.Messaggio(StdCba.traduci('ATTENZIONE'), StdCba.traduci('CS_COMPILARE_PRIMA'), 'OK', 'QUESTION');
			return false;
		}
		//blocco il dirtyChange finche sono in consegna
		controller.lookupReference('Form').dirty_suspendDirtyChange = true
		let controllerMainApp = controller.cbaConfig.controllerPageStd.cbaConfig.controllerMainApp,
			menuCard = controllerMainApp.lookupReference('MainLevels'); 
	        
		let paramConsegna = controller.cbaConfig.consegna;
		controller.cbaConfig.parametri.consegna = paramConsegna;
		controller.cbaConfig.parametri.livelloPrec = menuCard.getActiveItem().getItemId()
		controller.cbaConfig.parametri.tipo = 1;
		
		//attivo il livello prima per far scattare il change, dove sono gestiti i pulsanti, ma facendolo scattare prima della creazione
		//della videata devo pasare come parametro il livelloPrec
		menuCard.setActiveItem('#Level2');
		controllerMainApp.lookupReference('Level2').add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni',{
			cbaConfig:	controller.cbaConfig.parametri
			
		}));
	}
	
	/**
	 * restituisce un boolean che indica se gli oggetti passati a parametro
	 * non sono identici
	 */
	static objNotEquals( x, y ) {
		var diff = new Object(),
			count = 0;
		
		for ( var c in x ) {
			if(y[c] === "")
				 y[c] = null;
			if(x[c] === "")
				 x[c] = null;
			if ( y[c] != x[c] ) {
				if (Ext.isDate(x[c]) && Ext.isDate(y[c]) ) {
					if (x[c].toString() != y[c].toString()) {
						diff[c] = true;
						count++;
					}					
				} else {
					//Caso delle schede modulari da TESTARE
					if(Ext.isArray(y[c]) && Ext.isArray(x[c])){
						let i = y[c],
							i2 = x[c];
						for ( var n in i) {
							if(i[n] === "")
								 i[n] = null;
							if(i2[n] === "")
								 i2[n] = null;
							if ( i[n] != i2[n] ) {
								if (Ext.isDate(i2[n]) && Ext.isDate(i[n]) ) {
									if (i2[n].toString() != i[n].toString()) {
										diff[n] = true;
										count++;
									}					
								} else {
									diff[n] = true;
									count++;
								}				
							}
						}
					}else{
						diff[c] = true;
						count++;
					}
					
				}				
			}
		}
		
		return count != 0 ? true : false;
	}
	
	//abilita la videata (struttura testata/form) alla convalida manuale (aggiunge bottone con relativo handler)
	static cssAbilitaConvalida( controller ) {
		controller.convalidaManuale = true;
		
		var api = controller.storeForm.getProxy().api,
			readUrl = api.read,
			urlConvalidaManuale;
		if( readUrl && readUrl != '' )
			urlConvalidaManuale = readUrl.replace('get', 'convalida');
		else if(!CBA.parametriGenerali.produzione)	alert('Info Sviluppo: url create non trovato! Inserire nello store form.');
		
		//TODO_PLS gestione simil consegne
		controller.getBoxBottoniSpecial().insert( controller.getBoxBottoniSpecial().items.items.length, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch',
				pack: 'end'
			},
			flex: 1,
			items: [
				{
					xtype: 'button',
					itemId: 'btnConvalidaManuale', reference: 'btnConvalidaManuale',
					textHint: traduci('CONVALIDA'),
					iconCls: 'box-convalida-css',
					cls: 'cbaBtnFunzione-mini',
					margin: '1 2 0 0',
					width: 30,
					hidden: true,
					handler: function() {
						 // nel caso di pai/pri convertiti devo prima verificare i campi obbligatori (il campo validità non era obbligatorio e devo compilarlo prima di convalidare)
						if(controller.progetti && controller.schedaConvertita) {
							if (!controller.verificaCampiForm())
								controller.getTabPanel().setActiveTab(0);
								return false;
						}
						Ext.Ajax.request({
							method: 'GET',
							url: urlConvalidaManuale,
							params: {
								id: controller.testataSelezionata
							},
							success: function (response) {
								var risposta = Ext.JSON.decode(response.responseText);
								var records = risposta.data;
								if(risposta.success){
									controller.aggiornamentoTestata = true;
									controller.aggiornaStore( risposta.data.id || controller.testataSelezionata, risposta );
								}else{
									msgShowError('',risposta.message);
								}
							}
						});
					},
				    listeners: {
				    	afterrender: function(btn) {
							btn.on('mouseover', (th) => {
								if (!th.isDisabled()) {
									if (!th.cbaTip) {
										th.cbaTip = Ext.create('CbaIconBtnTip', {
											html: th.textHint,
											cls: 'cba-tip-button',
											listeners: {
												show: th => {
													Ext.defer( () => {
														if (Ext.isDefined(th)) {
															if (!th.destroyed) th.hide();
														}
													}, 2000);
												}
											}
										});
									}
									th.cbaTip.setStyle('opacity', 0.1);
									var pos = th.getPosition();
									//visualizzo componente trasparente per ottenere la larghezza
									th.cbaTip.showAt(pos[0], pos[1] + th.getHeight());
									//traslo il componente nella guista posizione
									th.cbaTip.showAt(pos[0] - (th.cbaTip.getWidth() / 2) + (th.getWidth() / 2), pos[1] + th.getHeight());
									th.cbaTip.setStyle('opacity', 1);
								}
							});
							btn.on('mouseout', th => {
								if (!th.isDisabled()) {
									th.cbaTip.hide();
								}
							});
							btn.on('destroy', th => {
								if(th.cbaTip)
									th.cbaTip.destroy();
							});
						}
				    }
				}
			]
		});
		
		var btnConvalida = controller.getBoxBottoniSpecial().queryById('btnConvalidaManuale'),	
			form = cssTrovaFormStd(controller);	
		if( form ) {
			form.getForm().on('dirtychange', function(th, isDirty) {
				// btnConvalida.setHidden( isDirty || !btnConvalida.cbaConfig.recordConvalidabile );
				btnConvalida.setHidden( isDirty );
			});
		}
	}
	
	static inizioAttesa(){
		this.attesa = true;
		this.numChiamateInizioAttesa++;
		/*
		 * attesa caricata sull'override store
		 * evito di far caricare l'attesa se non dura piu di 10
		 * */
		
		if(this.attesa == true && this.numChiamateInizioAttesa==1)
			Ext.Viewport.setMasked({
	            xtype: 'loadmask',
//	            message: 'Attendere...',
	            message: '',
	            indicator: false,
            	html:'<body>' +
						'<div class="ball"></div>'+
						'<div class="ball1"></div>'+
					  '</body>'
					  
	        });
	}

	static fineAttesa(forzaFineAttesa){
		this.numChiamateInizioAttesa--;
		this.attesa = false;
		if (forzaFineAttesa || (this.numChiamateInizioAttesa < 0)){
			this.numChiamateInizioAttesa = 0;
		}

		if (this.numChiamateInizioAttesa == 0){
			Ext.Viewport.unmask();
		}
	}
	
	//FUNZIONE GENERA CAMPI DINAMICI PASSATI DAL SERVER
	//PARAMETRO groupField: contenitore dove vengono inseriti i campi dinamici
	//PARAMETRO tipoCampo: chiave che identifica il tipo nello switch
	//PARAMETRO url: path server
	//PARAMETRO parametri: parametri chiamata server
	//PARAMETRO nameTemp: avvalorato solo se i campi enerati devono essere identificati come temporanei
	//PARAMETRO listeners: eventuali eventi da attaccare ai componenti generati
	//PARAMETRO callbackFn: eventuale funzione di callback da eseguire
	//PARAMETRO change: se c'è uso la funzione change
	static genFieldsDinamiciCss(groupField, tipoCampo, url, parametri, nameTemp, listeners, callbackFn, change){
		var me = this,
			rispostaChiamata = null;
		
		Ext.Ajax.request({
			method: 'GET',		
			url: url,
			params: parametri,
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var messaggi= [];

				if (risposta.success){		
					var option;						
					if(risposta.data.length>0){
						//controllo interno CBA
						if(!risposta.data[0].label)
							StdCba.msgAdd(messaggi, 'Problema server: campi entity non ancora standardizzata');
						
						risposta.data.forEach(function(rec){  
							switch( tipoCampo ){
								case 'checkbox':
									option = {
										xtype: 'checkboxfield',
										labelWidth: 80,
										boxLabel: StdCba.traduci(rec.label),
										checked: false,
										name: rec.inputValueStr,	//inputValueStr equivale al NAME
										inputValue: true,
										value: true,
										cls: 'cbaCssOptionField'
									};
								break;
								
								case 'radio':
									option = {
										xtype: 'radiofield',
										name: groupField.cbaConfig.name,
										boxLabel: StdCba.traduci(rec.label),
										inputValue: Ext.isNumber(rec.inputValueInt)? rec.inputValueInt : rec.inputValueStr,
										value: Ext.isNumber(rec.inputValueInt)? rec.inputValueInt : rec.inputValueStr,
										cls: 'cbaCssOptionField',
										cbaConfig: {
											deselezionabile: true
										}
									};
								break;
								
								case 'checkboxstring':
									option = {
										xtype: 'checkboxfield',
										name: nameTemp ? nameTemp +  ( Ext.isNumber(rec.inputValueInt)? rec.inputValueInt + '' : rec.inputValueStr ) : false,
					                    boxLabel  : StdCba.traduci(rec.label),
					                  	inputValue: Ext.isNumber(rec.inputValueInt)? rec.inputValueInt + '' : rec.inputValueStr,
					                  	value: Ext.isNumber(rec.inputValueInt)? rec.inputValueInt + '' : rec.inputValueStr,
										cls: 'cbaCssOptionField'
					                  	//isFormField: false
									};
								break;
								
								default:
									break;
							}
							//si aggingono eventuali listeners passati A parametro
							if(listeners)
								option.listeners = listeners;
							//aggiungo il campo
							groupField.add(option);
							groupField.cbaConfig.dati = risposta.data;
						});
						
						rispostaChiamata = risposta.data;
					}						
					
				}else{
					StdCba.msgAddError(messaggi,risposta.message);	
				}
				StdCba.msgShow('',messaggi);
			},
			callback: function(){
				if(callbackFn)
					callbackFn(rispostaChiamata);
			}
		});
	}
	
	static tapTabAndamento(form, disabilita){
		let btnMore = form.createFabs.btnMore;
		btnMore._scope.__proto__.open(btnMore);
		btnMore._scope.__proto__.close(btnMore);
		
		let controllerPageStd = form.controller.cbaConfig.controllerPageStd,
			arrayButton = controllerPageStd.cbaConfig.buttonToShow;
		
		if(form.permesso != 'L'){
			if(!Ext.isEmpty(arrayButton)){
				Ext.each(arrayButton, (button, index)=>{
					var button = button;
					Ext.Object.each(form.createFabs, (key, record)=>{
						if(record.getItemId() == button)
							record.setHidden(disabilita);
						
					});
				});
			}
		}
		form.createFabs.btnMore.setHidden(disabilita);
		controllerPageStd.nuovo = disabilita; 
		StdCba.abilitaDisabilitaBtn(controllerPageStd);
	}
	
	static svuotaSelect(select){
		select.clearValue();
		select._store.removeAll();
		select.setValue('');

		// sbianco eventuali filtri
		select.lastquery = "";
		if(select.queryFilter) {
			select.queryFilter.disabled = true;
		}
		select._store.filter();
	}
	
	static creaData(giorno,mese,anno){
		return new Date(anno,mese-1,giorno);
	}
	
}