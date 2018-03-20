Ext.define('CS.menuAzioni.rilevazioneAttivita.filtroAttivita.FiltroAttivitaController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-filtroattivita-filtroattivita',
    
    
    changeSelectReparto: function(select, newValue, oldValue){		
		let sede= select.up().down('#Sede');
		
		this.idReparto= newValue;
		
		//cerco solo se ho avvalorata la sede, altrimente il cerca viene scatenato due volte
		if(sede.getValue())
			this.cbaConfig.controllerListAttivita.aggiornaStore();
	},
	
	changeSelectSede: function(select, newValue, oldValue){
		let reparto= select.up().down('#Reparto');
		
		this.idSede= newValue;
				
		StdCba.svuotaSelect(reparto);
        
        if (select._value > 0){
        	reparto.getStore().getProxy().extraParams = {
                sede: select._value
            };
        	
        	reparto.getStore().load({
				callback:function(records,operation,success){
				}
			});
        }
        
		if(!Ext.isEmpty(select.getSelection())){			
			Ext.apply(select.cbaConfig, {
				valore: newValue,
				descrizione: select.getSelection().data.valore,
				name: 'sede',
				select: true
			});
		}
		
		this.cbaConfig.controllerListAttivita.aggiornaStore();
	},
    
    init: function(){
    	this.callParent(arguments);
    	
    	this.idProfilo = CBA.parametriGenerali.idProfiloCss;
    	
    	this.lookupReference('Sede').getStore().load();
    	this.lookupReference('Reparto').getStore().load();
    	
    	this.lookupReference('SelectAree').getStore().load({
			params: {
				idProfilo: this.idProfilo
			},
			callback: function (records, operation, success){
				if(success){
					
				}else{
					StdCba.msgShowError('',operation.getError());	
				}				
			}
		});
    },
    
    destroy: function(){
    	this.callParent();
    }

});
