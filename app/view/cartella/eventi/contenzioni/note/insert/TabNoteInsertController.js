Ext.define('CS.eventi.contenzioni.note.insert.TabNoteInsertController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-eventi-note-insert-tabnoteinsert',

    
    tapBtnAnnulla: function(th){
    	var me = this;
    	me.getView().destroy();
    },
    
    tapBtnSalva: function(th,e){
    	var me = this;
    	var operatore = CBA.moduli.modulo49.operatore;
		var nome = operatore.descr;
		var professione = operatore.figuraProfessionale;
		
		let form = me.lookupReference('Form');
		let campoData = me.lookupReference('DataInsert');
		let campoOra = me.lookupReference('OraInsert');
		
		let record = form.getValues();
		
		me.newDate = new Date();
		
		record.data = StdCba.cssCheckDataOraRegistrazione(form, campoData, campoOra);
			
		Ext.apply(record,{
			id: record.id,
			compilatoreFigProf:professione,
			compilatoreNominativo: nome,
			compilatore: operatore.id,
			idTe: me.cbaConfig.controllerMain.cbaConfig.controllerContenzioni.idTestata,
			codEnte: CBA.parametriGenerali.codEnte
		});
		delete record.ora;
		delete record.tipoBlocco;
		delete record.idRicovero;
		
		Ext.Ajax.request({
			url: `${CbaRootServer}`+'/cba/css/cs/ws/eventi/contenzioni/note/new', 
			method: 'POST',
			jsonData: record, 
			params: '',
			async: false, //e' sincrona per poter abilitare o no i bottoni in caso di errore!!
			success: function (response) {
				var risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				var titolo = "";

				if (risposta.success){
					
					StdCba.svuotaStore(me.cbaConfig.controllerMain.lookupReference('GridNoteAgg').getStore());
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
    	
//		me.lookupReference('DataInsert').setMaxDate(CBA.moduli.modulo49.serverDate); //TODO_PLS modificare
		
		me.lookupReference('DataInsert').setValue(new Date());
		me.lookupReference('DataInsert').setDateFormat('d/m/Y');
		me.lookupReference('OraInsert').setInputValue(StdCba.FormattaData(new Date(), 'H:i'));
    },

	destroy: function(){
		
		this.callParent();
	}
});
