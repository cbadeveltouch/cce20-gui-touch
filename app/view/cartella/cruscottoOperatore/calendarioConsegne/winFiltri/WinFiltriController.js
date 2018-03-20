Ext.define('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-cruscottooperatore-calendarioconsegne-winfiltri-winfiltri',
    
    changeCboxFigProf: function(th, newValue, oldValue) {
        var me = this;
        // quando selezione la voce tutte le fig prof dal menu a tendina imposta a null  il valore del combo  cosi si sbinca e riprstino l'emptyText  evitando porcate  
        // in modo da avere sempre una gestione corretta del campo descCampo e listaFig prof    
        if (newValue == -1 ) {
            th.setValue(null);
            return;
        }

        th.cbaConfig.descrCampo = ((me.isAmministratore || !newValue) ?  'TUTTE_LE_FIGPROF_ABILITATE' : me.operatore.figuraProfessionale);
        th.cbaConfig.listFigProf = (Ext.isEmpty(newValue) ? th.cbaConfig.figProfAbilitate :  ';' + newValue + ';');

    },
    
    changeCboxTipoConsegna: function(th, newValue, oldValue) {
        var me = this;
        // quando selezione la voce tutte le consegne dal menu a tendina imposta a null  il valore del combo  cosi si sbinca e riprstino l'emptyText  evitando porcate  
        // in modo da avere sempre una gestione corretta del campo descCampo e listaFig prof    
        if (newValue == -1 ) {
            th.setValue(null);
            return;
        }

       // th.cbaConfig.descrCampo = ((me.isAmministratore || !newValue) ?  'TUTTE_LE_FIGPROF_ABILITATE' : me.operatore.figuraProfessionale);
        th.cbaConfig.listFigProf = (Ext.isEmpty(newValue) ? th.cbaConfig.tipoConsegne :  ';' + newValue + ';');

    },

    changeCboxSede: function(select, newValue, oldValue) {
    	let reparto = this.lookupReference('SelectReparto');
        StdCba.svuotaSelect(reparto);
        if (select.getValue() > 0){
        	reparto.getStore().getProxy().extraParams = {
                sede: select.getValue()
            };
        	reparto.getStore().load();
        }
    },

    loadCbox: function(arrayStore, callbackFn) {
        var me = this;
        arrayStore.forEach(function(rec){
            rec.store.load({
                params: rec.params, 
                callback: function(records,operation,success){
                    if (success){
                        if (rec.callbackFn)
                            rec.callbackFn(records);
                    }
                }
            });
        });
    },

	init: function() {
		this.callParent(arguments);
		var me = this;
        me.idProfilo = CBA.parametriGenerali.idProfiloCss;
        me.operatore = CBA.moduli.modulo49.operatore;
        me.isAmministratore = me.operatore.amministratore == 'T';
        me.lookupReference('CntMain').controller = me;
        
       me.cbaConfig.controllerMain.cbaConfig.controllerFiltriAvanzati = me;
    
       this.lookupReference('SelectSede').getStore().load({
			params:{},
			callback: (records,operation,success)=>{
               if(success){
                   if(records.length == 1){
                   	this.lookupReference('SelectSede').setValue(records[0]);
                   	this.lookupReference('SelectSede').setDisabled(true);
                   } else {
                   	this.lookupReference('SelectSede').setDisabled(false);
                   }
               }else{
                   StdCba.msgShowError('',operation.getError());  
               }
           }
		});
        
        //questo perche è combobox con il query mode remote che accetta solo un parametro quindi l'idProfilo lo includo gia nell' url
        me.lookupReference('CboxUtenti').getStore().getProxy().url += '?idProfilo=' + CBA.parametriGenerali.idProfiloCss;
        
        me.lookupReference('CboxTipoConsegna').getStore().load({
       	 callback: function(records,operation,success){
                if (success){
               	let comboConsegne =  me.lookupReference('CboxTipoConsegna'),
               		listTipoConsegna = '',
   	 				store = comboConsegne.getStore();
               	 store.insert(0, {
                        abbreviazione: -1,
                        tipoConsegna: StdCba.traduci('SELEZIONA_TUTTE')
                    });
               	 
               	 records.forEach(
                        function(rec) {
                            listTipoConsegna += ';' + rec.get('abbreviazione') + ';';
                    });
               	 
               	 comboConsegne.cbaConfig.tipoConsegne= listTipoConsegna;
               	 
               	 me.lookupReference('CboxTipoConsegna').setValue(-1);
                }
       	 }
        });
        me.lookupReference('CboxOperatore').getStore().load({
            params: {
               filtriAttivi: true
           }
        });
        
         me.lookupReference('CboxFigProf').getStore().load({
             params: {
                consegne: 'T',
                codFigProf: me.operatore.tipo,
                idProfilo: CBA.parametriGenerali.idProfiloCss
            },
            callback: function(records,operation,success){
                if (success){

                    var listFigProf = '',
                        comboFigProf = me.lookupReference('CboxFigProf'),
                        store = comboFigProf.getStore();

                    store.getSorters().removeAll(true);

                    store.insert(0, {
                        codpermesso: -1,
                        descrizione: StdCba.traduci('TUTTE_LE_FIGPROF_ABILITATE')
                    });
                    //scateno il change e viene gestito tutto da li  -1 vuol dire tutte le foig prof abilitate nel change poi viene gestito
                    comboFigProf.setValue(me.isAmministratore ? -1 : me.operatore.tipo);
                    
                    records.forEach(
                        function(rec) {
                            listFigProf += ';' + rec.get('codpermesso') + ';';
                    });

                    comboFigProf.cbaConfig.figProfAbilitate = listFigProf;
                    
                    Ext.apply(me.cbaConfig.controllerMain.defaultConfig, {
                        idOperatore: me.operatore.id,
                        figProfDest: me.isAmministratore ? listFigProf :';' +  me.operatore.tipo + ';',
                        consegneDa: me.lookupReference('CboxTipoConsegna').cbaConfig.tipoConsegne,
                        idProfilo: me.idProfilo,
                        figProf: me.operatore.tipo
                    });                

                    me.cbaConfig.controllerMain.aggiornaStore();
                }
            }

         });

        
	},
    destroy: function() {
	    this.callParent();
	}

});
