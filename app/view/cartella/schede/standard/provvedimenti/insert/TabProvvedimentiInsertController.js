Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiInsertController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-schede-standard-provvedimenti-tabprovvedimentiinsert',

    
    tapBtnAnnulla: function(th){
    	var me = this;
    	me.getView().destroy();
    },
    
    tapBtnSalva: function(th){
    	var me = this;
    	var operatore = CBA.moduli.modulo49.operatore;
		var nome = operatore.descr;
		var professione = operatore.figuraProfessionale;
		
		let form = me.lookupReference('Form');
		let campoData = me.lookupReference('DataInsert');
		let campoOra = me.lookupReference('OraInsert');
		
		let record = form.getValues();
		
		me.newDate = new Date();
		var idRisp = '';
		if(form.getValues().provvedimentiList){
			
			Ext.each(form.getValues().provvedimentiList,function(rec){
				idRisp +=";"+rec+";";
			});
		}
		
		record.data = StdCba.cssCheckDataOraRegistrazione(form, campoData, campoOra);
			
		Ext.apply(record,{
			id: record.id,
			provvedimenti:idRisp,
			compilatoreFigProf:professione,
			compilatoreNominativo: nome,
			compilatore: operatore.id,
			codiceModulo: me.cbaConfig.controllerMain.codiceModulo,
			idTest: me.cbaConfig.controllerMain.idTest
		});
		delete record.provvedimentiList;
		delete record.ora;
		delete record.tipoBlocco;
		delete record.idRicovero;
		
		Ext.Ajax.request({
			url: `${CbaRootServer}`+'/cba/css/cs/ws/skval/provvedimenti/new', 
			method: 'POST',
			jsonData: record, 
			params: '',
			async: false, //e' sincrona per poter abilitare o no i bottoni in caso di errore!!
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				var titolo = "";

				if (risposta.success){
					
					me.cbaConfig.controllerMain.lookupReference('CntMain').removeAll(true);
					me.cbaConfig.controllerMain.aggiornaStore();
					me.getView().destroy();
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
    },
    
    blurOra: function(){
    	var dataReg = me.lookupReference('DataInsert');
		
		var futuro = false;
		var dataAttuale = new Date();
		var data = dataReg.getValue();
		
		if(data && th.getValue()){
			if(dmyIsEqual(data)){
				if(th.getValue().getHours() > dataAttuale.getHours()){
					futuro = true;
				}else if(th.getValue().getHours() == dataAttuale.getHours() && 
						th.getValue().getMinutes() > dataAttuale.getMinutes()){
					futuro = true;
				}
			}
			if(futuro)
				StdCba.Messaggio('ATTENZIONE', 'CS_DATA_FUTURO', 'OK', 'WARNING', function(){
					th.setValue(new Date());
				});
		}
    },
    
    init: function(){
    	this.callParent(arguments);
    	var me = this;
    	this.lookupReference('Form').controller = this;
    	this.cbaConfig.controllerInsert = this;
    	
    	//me.codiceModulo = me.cbaConfig.controllerDettaglio.cbaConfig.sottoTipoTestata || me.cbaConfig.controllerDettaglio.sottoTipoTestata || me.cbaConfig.controllerDettaglio.codiceModulo;
		
		var storeDomande = Ext.create('CS.personalizzazioni.risposte.store.RisposteDe');
		storeDomande.load({
			params:{
				idProfilo:me.cbaConfig.controllerMain.cbaConfig.idProfilo,
				codArea:me.cbaConfig.controllerMain.cbaConfig.codArea,
				codDomanda:me.cbaConfig.controllerMain.cbaConfig.codDomanda
			},
			callback:function(records,operation,success){
				if(success){
					
					 Ext.each(records,function(rec){
						 me.lookupReference('Provvedimenti').add(Ext.create('Ext.field.Checkbox',{
							 	boxLabel: rec.data.descrizione ,
								inputValue: rec.data.id,
								cls:'cbaCassGridEditor ',
								boxLabelCls:'cbaCssGridEditorLabel',
								name:'provvedimentiList',
								width:220,
								value: rec.data.id
						 }));
					 });
				}else{
					StdCba.msgShowError('',operation.getError());	
				}
			}
		});
//		me.lookupReference('DataInsert').setMaxDate(CBA.moduli.modulo49.serverDate); TODO_PLS trovare soluzione
		me.lookupReference('DataInsert').setDateFormat('d/m/Y'); //per buildata
		me.lookupReference('DataInsert').setValue(new Date());
		
		//inputValue serve a visualizzare il campo ora da app buildata
		me.lookupReference('OraInsert').setInputValue(StdCba.FormattaData(new Date(), 'H:i'));
    },

	destroy: function(){
		
		this.callParent();
	}
});
