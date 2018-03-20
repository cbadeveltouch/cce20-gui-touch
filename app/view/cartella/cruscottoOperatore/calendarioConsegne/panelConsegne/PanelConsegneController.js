Ext.define('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.PanelConsegneController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-cruscottooperatore-calendarioconsegne-panelconsegne',
    
	tapContainerAllegato: function(th){
		var me = this;
		
//		Ext.define('CSS_winWidgetCBA', {
//			extend: 'CSS_winCBA',
//			alias: 'widget.CSS_winWidgetCBA',
//			larghezzaWin: Ext.getBody().getViewSize().width - 20,
//			visualizzaAnagrafica: false,
//			minWidth: false,
//			minHeight: false,
//			widgetMode: true,
//			initComponent: function() {
//				this.callParent(arguments);
//			}
//		});
//		var win = Ext.create('CSS_winWidgetCBA',{
//			name: 'CS.cruscottoOperatore.calendarioConsegne.view.AllegatiConsegneMobile',
//			titolo: traduci('ALLEGATI_CONSEGNE'),
//            configItem: {
//            	controller: me,
//	        	record: me.cbaConfig.record
//            }
//        });		
//		win.cssDefaultShow();
	},
	
	tapBtnMenu: function(th, e){
		var me = this;
		let image = th,
			container = me.lookupReference('ContainerTipoConsegna'),
			panelClick = me.lookupReference('Form');
		
		var recrodId = me.lookupReference('TextfieldID').getValue();
		
		me.menu =  Ext.create('Ext.menu.Menu', {
			width: 200,
			plain: true,
			items: [
				{
					text: StdCba.traduci('PROMEMORIA'),
					itemId: 'Promemoria',
					icon: 'resources/images/generali/cyrcle.svg',
					iconCls: 'css-arancio',
					handler: function(th){
						me.tapMenuPromemoria(me.menu.record);
						
		        	}
				},
		        {
		        	text: StdCba.traduci('PRENDI_IN_CARICO'),
		        	itemId: 'PrendiInCarico',
		        	icon: 'resources/images/generali/confirm.svg',
		        	iconCls: 'css-verde',
		        	handler: function(th){
		        		var object = {
		        			idConsegna: me.menu.record,
		        			figProfDest: CBA.moduli.modulo49.operatore.tipo,
		        			idOperatore: CBA.moduli.modulo49.operatore.id,
		        			data: StdCba.FormattaData(new Date(), 'c')
		        		};

		        		Ext.Ajax.request({
		        			method: 'GET',
		        			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/dest/prendiInCarico', 
		        			params: object,
		        			success: function (response) {
		        				var risposta = Ext.JSON.decode(response.responseText);
		        				if(risposta.success){
		        					me.cbaConfig.controller.cbaConfig.riaggiornaStore = true;
		        					
		        					me.cbaConfig.controller.lookupReference('ContainerDe').removeAll(true);
		        				}else{
		        					msgShowError('',risposta.message);
		        				}
		        			}
		        		});
		        	}	
                },
	        ]
		});
		var figProfAttuale = CBA.moduli.modulo49.operatore.tipo;
		var compilatoreAttuale = CBA.moduli.modulo49.operatore.descr;
		//disabilito se è già stata presa in carico da una figura avente la stessa figura professionale e se l'operatore è il compilatore
		if((me.presaInCarico || me.figProfDest == figProfAttuale)|| me.compilatore ==  compilatoreAttuale || me.annullato || !me.trovatoDestinatario){
			me.menu.down('#PrendiInCarico').setDisabled(true);
		}
		if(me.annullato)
			me.menu.down('#Promemoria').setDisabled(true);
    	 me.menu.record = me.cbaConfig.record.id; 
    	 me.menu.showAt(e.getX()-me.menu.getWidth(), e.getY());
    	 

		//Distruggo il menu se mi sposto con la scrollbar
		var scroller = me.cbaConfig.controller.getView().getScrollable();
 		if(scroller){
 			scroller.on('scroll', function(th){
 				if(me.menu)
 					me.menu.destroy();
 			});
 		}
	},
	
	tapMenuPromemoria: function(record){
		var me = this;
		if(me.cbaConfig.record.promemoria == false){
			var object = {
				idConsegna: record,
				idOperatore: CBA.moduli.modulo49.operatore.id,
			};

			Ext.Ajax.request({
				method: 'POST',
				url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/promemoria/new', 
				jsonData: Ext.JSON.encode(object),
				success: function (response) {
					var risposta = Ext.JSON.decode(response.responseText);
					if(risposta.success){
						me.cbaConfig.record.promemoria = true;
						me.lookupReference('ImagePromemoria').removeCls('css-grigio');
						me.lookupReference('ImagePromemoria').addCls('css-arancio');
						if(me.cbaConfig.record.letta === false)
							me.letturaConsegna(me.cbaConfig.record, true);
					}else{
						msgShowError('',risposta.message);
					}
				}
			});
		}else{
			var object = {
					idConsegna: record,
					idOperatore: CBA.moduli.modulo49.operatore.id,
				};

				Ext.Ajax.request({
					method: 'GET',
					url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/promemoria/delete', 
					params: object,
					success: function (response) {
						var risposta = Ext.JSON.decode(response.responseText);
						if(risposta.success){
							me.cbaConfig.record.promemoria = false;
							me.lookupReference('ImagePromemoria').addCls('css-grigio');
							me.lookupReference('ImagePromemoria').removeCls('css-arancio');
						}else{
							msgShowError('',risposta.message);
						}
					}
				});
		}
		
	},
	
	tapContainerTipoConsegna: function(e){
		var me = this;
		if(me.cbaConfig.record.letta == false){
			me.letturaConsegna(me.cbaConfig.record, true);
		}
	},
	
	letturaConsegna: function(record, fromPanel){
		var me = this;
		var object = {
				idConsegna: record.id,
				idLettore: CBA.moduli.modulo49.operatore.id,
				dataOra: StdCba.FormattaData(new Date(), 'c')
		};
		Ext.Ajax.request({
			method: 'POST',
			async: true,
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/lette/new', 
			jsonData: Ext.JSON.encode(object),
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				if(risposta.success){
					record.letta = true;
//					me.getImageNonLetta().setHidden(true);
					me.lookupReference('ContainerBusta').setHidden(true);
					me.lookupReference('ContainerTipoConsegna').removeCls('icon-busta');
					me.lookupReference('ContainerTipoConsegna').removeCls('cbaConsegneNonLette');
					me.lookupReference('ContainerTipoConsegna').removeCls('cbaConsegneNonLette-over');
					me.cbaConfig.controller.count = me.cbaConfig.controller.count -1;
					if(Ext.isDefined(fromPanel))
						me.aggiornaStore(record);
				}else{
					msgShowError('',risposta.message);
				}
			}
		});
	},

	creaPannelloAnnulla: function(rec){
		var me = this;
		me.annullato = true;
		var panelAnnulla = Ext.create('Ext.Panel', {
			itemId: 'PanelRecordAnnullato', reference: 'PanelRecordAnnullato',
			hidden: true,
			layout: {
				type:'hbox',
				align:'stretch'
			},
			plugins: 'responsive',
	        responsiveConfig:{
	        	 'width < 800': {
	                     layout: {
	                         type: 'vbox'
	                     }
	             },
	             'width >= 800': {
		            	 layout: {
	                         type: 'hbox'
	                     }
	             }
	        },
			items: [
				{
					xtype:'label',
					cls: 'cbaCssLabelWhite',
					text: 'CS_RECORD_ANNULLATO_DA',
					margin: '5 0 5 10'
				},
				{
					xtype:'label',
					itemId: 'LabelAnnullatoCompilatore', reference: 'LabelAnnullatoCompilatore',
					cls: 'cbaCssLabelWhite',
					margin: '5 0 5 10'
				},
				{
					xtype:'label',
					itemId: 'LabelAnnullatoData', reference: 'LabelAnnullatoData',
					cls: 'cbaCssLabelWhite',
					margin: '5 0 5 10'
				}
			]
		});
		me.lookupReference('HeaderPannello').up('panel').insert(1, panelAnnulla);
		var pnlCompilatore = me.lookupReference('HeaderPannello');
		
		if(Ext.isEmpty(rec.statoRecord)){		
			if( Ext.isDefined( pnlCompilatore ) ) {
				panelAnnulla.hide();
				panelAnnulla.down('#LabelAnnullatoData').setText('');
			}
		}else{
			var textAnnullatoData = ' ' + StdCba.traduci('IL_GIORNO');
			var dataDeleted = rec.deletedData;
			var compilatore = rec.compilatoreNominativo;
			textAnnullatoData += ' ' + Ext.Date.format(Ext.Date.parse(dataDeleted, 'c'), 'd/m/Y');
			textAnnullatoData += ' ' + StdCba.traduci('ALLE').toLowerCase() + ' ' + Ext.Date.format(Ext.Date.parse(dataDeleted, 'c'), 'H:i');
			panelAnnulla.down('#LabelAnnullatoData').setHtml(textAnnullatoData);
			panelAnnulla.down('#LabelAnnullatoCompilatore').setHtml(compilatore);
			panelAnnulla.on('afterrender', function(){
				panelAnnulla.body.component.body.setStyle('background', '#c31317'); 
				panelAnnulla.body.component.body.setStyle('border', '1px solid #6f0003'); 
			});
			panelAnnulla.show();
		}
		
	},
	
	aggiornaStore: function(record){
		var me = this,
			form = me.lookupReference('Form'),
			store= me.storeForm = me.cbaConfig.controller.storeListaConsegne,
			idRecord = me.cbaConfig.record.id;
		
		
		var recTipoConsegna = StdCba.trovaRecord(me.cbaConfig.controller.storeTipoConsegna, 'abbreviazione', record.tipoConsegna);
		
		me.compilatore = record.compilatoreNominativo;
		
		me.lookupReference('CompilatoreID').setValue(record.compilatore);
		me.lookupReference('DataCompilatore').setHtml(StdCba.FormattaData(record.dataOra, 'd/m/Y H:i'));
		me.lookupReference('Note').setHtml(record.note);
		
	    if (recTipoConsegna) {
	        if (!Ext.isEmpty(recTipoConsegna.get('classe'))) {
	            me.lookupReference('ImageTipoConsegna').addCls(recTipoConsegna.get('classe'));
	            if(record.diario){
	            	me.lookupReference('LabelTipoConsegna').setHtml(record.descrDiario);
	            }else{
	            	 me.lookupReference('LabelTipoConsegna').setHtml(StdCba.traduci(recTipoConsegna.get('tipoConsegna')));
	            }
	        }
	    }
		
		if(record.letta){
			me.lookupReference('ContainerTipoConsegna').removeCls('cbaConsegneNonLette');
			me.lookupReference('ContainerTipoConsegna').addCls('css-grigio');
		}else{
			me.cbaConfig.controller.count = me.cbaConfig.controller.count + 1;//controllo per pulsante lette tutte
			me.lookupReference('ContainerBusta').setHidden(false);
		}
		
		if(record.deletedData)
			me.creaPannelloAnnulla(record);
	
		if(record.allegati == true){
			me.lookupReference('ContainerAllegato').setHidden(false);
		}
		
		var labelCompilatore = record.compilatoreNominativo.toUpperCase();
		labelCompilatore += ' ' + '(' +record.compilatoreFigProf +')';
		me.lookupReference('LabelCompilatore').setHtml(labelCompilatore);
		
		me.lookupReference('LabelUtente').setHtml(record.ospiteNominativo);
//		me.lookupReference('Id').setValue(record.id);
				
		if(record.promemoria == true){
			me.lookupReference('ImagePromemoria').removeCls('css-grigio');
			me.lookupReference('ImagePromemoria').addCls('css-arancio');
		}
		
		if(record.presaInCarico){
			me.figProfDest = record.visionatoreFigProf;
			me.presaInCarico = me.cbaConfig.record.presaInCarico;
			
			var data = StdCba.FormattaData(record.dataOraVisto, 'd/m/Y H:i');
			var visionatore = record.visionatore;
			var figProfVisionatore = record.visionatoreFigProf;
			var presaInCarico = StdCba.traduci('PRESA_IN_CARICO_IL');
			presaInCarico += ' ' + data;
			presaInCarico += ' ' + StdCba.traduci('DA');
			presaInCarico += ' ' + visionatore;
			presaInCarico += ' ('+ figProfVisionatore +')';
			me.lookupReference('LabelPresaInCarico').setHtml(presaInCarico);
			me.lookupReference('ContainerPresaInCarico').setHidden(false);
		}
		
		//setto colore header pannello
		var cnt = me.lookupReference('HeaderPannello');
		if(record.colore){
			cnt.setStyle('background', record.colore);
			if(record.coloreLabel){
				var c = Ext.create('Ext.draw.Color', {});
				c.setFromString(record.colore);
				var factor = 0.3,
					darker = c.createDarker(factor),
					lighter = 'white'; 
				Ext.each( cnt.query('label'), function(i) {
					i.setStyle('color' , ( (record.coloreLabel ==2) ? lighter.toString() : darker.toString())+'!important');					
				});
			}				
		}else{
			cnt.setStyle('background', 'white');
			Ext.each( cnt.query('label'), function(i) {
				i.setStyle('color','#5fa2dd !important');
			});
		}
		
		me.caricaDestConsegna(idRecord);
	},
	
	caricaDestConsegna: function(idConsegna) {
		var me = this;
		me.arrayDestinatari = [];
		//se io compilatore loggato sono all'interno delle fig prof di destinazione delle consegne posso prenderla in carico altrimenti no!
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/consegne/dest/listByConsegna',
			params: {
				idConsegna: idConsegna
			},
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var records = risposta.data;
				if (risposta.success){
					var miaFigProf = CBA.moduli.modulo49.operatore.tipo;
					me.trovatoDestinatario = false;
					var modelRec;

					records.forEach(
						function(rec) {
							modelRec = Ext.create('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.ConsegnaDestModel', rec);
							me.arrayDestinatari.push(modelRec);
							if (rec.figProfDest == miaFigProf) {
								me.trovatoDestinatario = true;
								return;
							}
						}
					);

				} else {
					msgShowError('',risposta.message);
				}
			}
		});
	},

	init: function(){
		var me = this;
		me.callParent(arguments);
		var form = me.lookupReference('Form');

		form.controller = me;
		form.tipoConsegna = 'cba' + this.cbaConfig.record.tipoConsegna;
		
		me.cbaConfig.controller.storeListaConsegne = Ext.create('CS.cruscottoOperatore.calendarioConsegne.calendarioConsegne.ListaConsegneMobile');
		me.cbaConfig.controller.controllerPannello = me;
		me.aggiornaStore(me.cbaConfig.record);
		
		var cc = me.cbaConfig.controller.cbaConfig;
		cc.childCount = Ext.isNumber(cc.childCount) ?  cc.childCount + 1 : 1;
	},
	destroy: function(){
		StdCba.eliminaStore(this.storeForm);
		var cc = this.cbaConfig.controller.cbaConfig;
		if (Ext.isNumber(cc.childCount)) {
			cc.childCount--;
		}
		var re = cc.riaggiornaStore;
		if ( re && re === true && cc.childCount == 0 ) {
			delete cc.riaggiornaStore;
			this.cbaConfig.controller.aggiornaStore(null, true);
		}
	    this.callParent();
	}

});
