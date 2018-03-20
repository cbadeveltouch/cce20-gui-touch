Ext.define('CS.menuAzioni.parametriInsert.ParametriInsertController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-parametriinsert-parametriinsert',
    
    salvaForm: function(esci){
		var me = this;
		var form = me.lookupReference('Form');
		
//		if(me.verificaCampiForm())
//			return false;
		
		var newRecord = form.getValues(),
			fields = form.getFields();

		newRecord = StdCba.convertiBool(newRecord, fields);
		
		delete newRecord.tmpNote;
		delete newRecord.dataRegAppo;
		delete newRecord.oraRegAppo;
		delete newRecord.campoDirty;
		
		StdCba.eliminaCampiTmp(newRecord);
		
		Ext.apply(newRecord,{
			idRicovero: me.idRicovero,
			compilatore: CBA.moduli.modulo49.operatore.id,
			data: CBA.parametriGenerali.serverDate,//TODO_PLS modificare
			notePeso: me.cbaConfig.notePeso,
			mews: me.inserisciSchedaMews ? '-999' : null
		});

		StdCba.cssFiltriStdOff(me);
		
		me.salvataggioRecord = true;
		me.dataRecord = newRecord.data;
		if(ControllerStd.salvaRecord(form,newRecord,esci, false, true)){	
			if(esci && me.callbackEsci){
				me.callbackEsci();
			}	
		}
		
	},
	
	aggiornaStore: function(){
		StdCba.clearForm(this.lookupReference('Form'));
	},
	
	gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnRipristina = form.createFabs.btnRipristina;
		
		btnConferma.on('tap', ()=>{
			Ext.is.Phone ? Ext.Viewport.down('#Panel').setHidden(false) : null;
		});
		
		btnRipristina.on('tap', ()=>{
			StdCba.clearForm(form);
		});
	},
	
    gestioneForm: function(){
		var me = this;
		var form = me.lookupReference('Form');
		form.permesso = 'S'; //TODO_PLS da modificare??
		me.storeForm = form.store= Ext.create('CS.parametri.ParametriStore');
		
		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		me.cbaConfig.controllerPageStd.nuovo = true; // solo conferma e ripristina
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		
		me.idRicovero = CBA.moduli.modulo49.storeAnagraficaSel ? CBA.moduli.modulo49.storeAnagraficaSel.getAt(0) : null;
		
		StdCba.bloccaFormCss(this.lookupReference('Form'), false);//TODO_PLS da modificare??
//		me.storeForm.load({
//			params: {
//				idProfiloPwdDe: CBA.parametriGenerali.idProfiloPwdDe
//			}
//		});

	},
	
	loadRisposte: function(){
		var me = this;
		me.loadCbox(me.lookupReference('SelectTipoRespiratoria').getStore(), 3, 20);
		me.loadCbox(me.lookupReference('SelectTipoCardiaca').getStore(), 3, 30);
		me.loadCbox(me.lookupReference('SelectAlvo').getStore(), 3, 10);
		me.loadCbox(me.lookupReference('SelectMobilita').getStore(), 3, 40);
		me.loadCbox(me.lookupReference('SelectSonno').getStore(), 3, 70);
	},
	
	loadCbox: function(store, codArea, codDomanda){
		var me = this;
		var params = {
			codArea: codArea,
			codDomanda: codDomanda,
			idProfilo: CBA.parametriGenerali.idProfiloCss
		};
		store.load({
			params: params
		});
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
				});
			}			
		});
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
					//TODO_PLS focus sull elemnto
				}else{
					elemento.cbaConfig.forzaControllo = true;
					elemento.cbaConfig.originalValue  = elemento.getValue();
				}
			});
		}
	},
	
	getConfrontaCon: function(campo1, campo2, operatore) {
		var me = this;
		var uscita = false;
		var valore1 = campo1.getValue(),
			valore2 = campo2.getValue();

		if (Ext.isEmpty(valore1) || Ext.isEmpty(valore2)) {
			uscita = true;
			return;
		}

		var operators = {
			'>':  valore1 > valore2,
			'<':  valore1 < valore2
		};

		if (operators[operatore]) {

			StdCba.Messaggio('ATTENZIONE',StdCba.traduci('MSG_CAMPI_W_RANGE4')+ ' ' + StdCba.traduci(campo1.cbaConfig.nomeCampo) + ':<br>\t' + StdCba.traduci('MSG_CAMPI_W_RANGE5'), 'OK', 'ERROR',
				function(){
					campo1.setValue(campo1.cbaConfig.originalValue);
				}
			);
			uscita = true;
		}
		return uscita;
	},
	
	verificaCampiForm: function(){
		var me = this;
		var messaggi= [];
		var form= this.lookupReference('Form');
		
		if (Ext.isEmpty(this.idRicovero)){
			StdCba.msgAddError(messaggi,'MSG_OSPITE_OBBLIGATORIO');
		}

		return StdCba.msgShow('',messaggi); 

	},
	
	init: function(){
		var me = this;
		me.lookupReference('Form').controller = me;
		this.callParent(arguments);
		
		
		let lista = Ext.Viewport.list;
		if(Ext.isEmpty(lista) && Ext.is.Phone) {
			this.cbaConfig.controllerPageStd.openLista();
		}
		
		// mostro i campi relativi al parametro selezionato
		let campo = this.cbaConfig.controllerPageStd.cbaConfig.parametro
		if(campo==='Tutti') {
			this.lookupReference('Form').query('container').forEach(i => i.setHidden(false))
		} else {
			let parametro = this.lookupReference('Form').query('[parametro=' + campo +']');
			parametro.forEach( i => i.setHidden(false));
			
			Ext.each( me.lookupReference('Form').query('container'), (container)=> {
				if(!Ext.isEmpty(me.cbaConfig.parametro) && container.getItemId() != 'Cnt' + me.cbaConfig.parametro)	
					container.setHidden(true);
			});
		}
		
		me.loadRisposte();
		
		me.gestioneForm(); 
		
		me.cntParametri = [
			{
				parametro: me.lookupReference('PressioneMin_orto'),
				attivaControlli: true,
				valoreMin: 40,
				valoreMax: 150,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'PRESSIONE_DIASTOLICA',
				name: 'pressioneMinOrto',
				fnConfronta: [me.getConfrontaCon, me.lookupReference('PressioneMax_orto'), '>'],
				tabRif: 'V',
				getValoreCampo: me.getValoreCampo,
				unitaMisura: 'UNITA_MISURA_PRESSIONE'
			},
			{
				parametro: me.lookupReference('PressioneMax_orto'),
				attivaControlli: true,
				valoreMin: 60,
				valoreMax: 250,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'PRESSIONE_SISTOLICA',
				name: 'pressioneMaxOrto',
				fnConfronta: [me.getConfrontaCon, me.lookupReference('PressioneMin_orto'), '<'],  //confronta con presisoneMinima condizione è che deve essere  maggiore in questo caso gestiamo l'errore  '<'  quando è minore 
				tabRif: 'V',
				noGrafico: true,
				getValoreCampo: me.getValoreCampo,
				unitaMisura: 'UNITA_MISURA_PRESSIONE'
			},
			{
				parametro: me.lookupReference('PressioneMin_clino'),
				attivaControlli: true,
				valoreMin: 40,
				valoreMax: 150,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'PRESSIONE_DIASTOLICA',
				name: 'pressioneMinClino',
				fnConfronta: [me.getConfrontaCon, me.lookupReference('PressioneMax_clino'), '>'],
				tabRif: 'V',
				getValoreCampo: me.getValoreCampo,
				unitaMisura: 'UNITA_MISURA_PRESSIONE'
			},
			{
				parametro: me.lookupReference('PressioneMax_clino'),
				attivaControlli: true,
				valoreMin: 60,
				valoreMax: 250,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'PRESSIONE_SISTOLICA',
				name: 'pressioneMaxClino',
				fnConfronta: [me.getConfrontaCon, me.lookupReference('PressioneMin_clino'), '<'],  //confronta con presisoneMinima condizione è che deve essere  maggiore in questo caso gestiamo l'errore  '<'  quando è minore 
				tabRif: 'V',
				noGrafico: true,
				getValoreCampo: me.getValoreCampo,
				unitaMisura: 'UNITA_MISURA_PRESSIONE'
			},
			{
				parametro: me.lookupReference('SpO2'),
				attivaControlli: true,
				valoreMin: 65,
				valoreMax: 100,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'SPO2_ARIA_AMBIENTE',
				name: 'spo2',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_SPO2'
				
			},
			{
				parametro: me.lookupReference('FreqCaridaca'),
				attivaControlli: true,
				valoreMin: 30,
				valoreMax: 200,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'FREQUENZA_CARDIACA',
				name: 'frequenza',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_FREQUENZACARD'
				
			},
			{
				parametro: me.lookupReference('SelectTipoCardiaca'),
				nomeCampo: 'TIPO_FREQUNZACARDIACA',
				name: 'tipoFreqCardiaca',
				tabRif: 'V'
			},
			{
				parametro: me.lookupReference('TemperaturaCorporea'),
				attivaControlli: true,
				valoreMin: 30,
				valoreMax: 50,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'TEMPERATURA',
				name: 'temperatura',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_TEMPERATURA'
					
			},
			{
				parametro: me.lookupReference('FreqRespiratoria'),
				attivaControlli: true,
				nomeCampo: 'FREQUENZA_RESPIRATORIA',
				name: 'freqRespiratoria',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_FREQUENZARESPIRATORIA'
				
			},
			{
				parametro: me.lookupReference('SelectTipoRespiratoria'),
				nomeCampo: 'TIPO_RESPIRAZIONE',
				name: 'tipoRespirazione',
				tabRif: 'V'
			},
			{
				parametro: me.lookupReference('Diuresi'),
				attivaControlli: true,
				valoreMin: 0,
				valoreMax: 9999,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'DIURESI',
				name: 'diuresi',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_DIURESI'
			},
			{
				parametro: me.lookupReference('Glicemia'),
				attivaControlli: true,
				valoreMin: 0,
				valoreMax: 1000,
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'GLICEMIA',
				name: 'curvaGli',
				tabRif: 'V',
				unitaMisura: 'UNITA_MISURA_GLICEMIA'

			},
//			{
//				parametro: me.lookupReference('SelectAvpu'), //escluso da tutti i controlli
//				name: 'avpu',
//				tabRif: 'V',
//				nomeCampo: 'AVPU',
//				escludiDaParametri: true
//			},
			{
				parametro: me.lookupReference('Peso'),
				abilitaFocus: true,
				abilitaBlur: true,
				nomeCampo: 'PESO',
				name: 'peso',
				tabRif: 'V',
				unitaMisura: 'KG'
				
			},
			{
				parametro: me.lookupReference('Altezza'),
				abilitaBlur: true,
				abilitaFocus: true,
				nomeCampo: 'ALTEZZA',
				name: 'altezza',
				tabRif: 'V',
				unitaMisura: 'CM'
				
			},
			{
				parametro: me.lookupReference('SelectMobilita'),
				nomeCampo: 'MOBILITA',
				name: 'mobilita',
				tabRif: 'C',
			},
			{
				parametro: me.lookupReference('SelectSonno'),
				nomeCampo: 'SONNO',
				name: 'sonno',
				tabRif: 'C'
			},
			{
				parametro: me.lookupReference('SelectAlvo'),
				nomeCampo: 'ALVO',
				name: 'alvo',
				tabRif: 'C'
			}
			
		];
		me.inizzializzaParametri();	
	},
	destroy: function(){
	    this.callParent();
	}

});
