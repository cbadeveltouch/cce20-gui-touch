Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.DettSommAttivitaController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-dettsommattivita-dettsommattivita',
    
	gestioneForm: function(){
		var me = this;
		var form = me.lookupReference('Form');
		form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';
		form.controller = me;
		this.cbaConfig.controllerPageStd.cbaConfig.permesso = 'S'; //TODO_PLS modifica

		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		
		 form.on('dirtychange', function(th, isDirty) {
			if(isDirty){
//				form.createFabs.btnMore.setHidden(true);
//				form.createFabs.btnAnnulla.setHidden(true);
			}
				
			StdCba.btnNascondiMostra(isDirty, th);
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			
	     });
		
	},
	
    gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnRipristina = form.createFabs.btnRipristina;
		
		btnConferma.on('tap', function(){
			
		});
		btnRipristina.on('tap', function(){
			me.aggiornamentoTestata = true;
			me.aggiornaStore(me.testataSelezionata ? me.testataSelezionata : null, function(){
				me.resetControlli();
			});
		});
	},
    
    aggiornaStore: function(){
    	let form = this.lookupReference('Form');
    
    	Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/attivita/anagrafica/get',
			async: false,
			params: {
				id: this.cbaConfig.recordAttivita.get('codice')
			},
			success: response => {
				var risposta = Ext.JSON.decode(response.responseText);
				var record = risposta.data;
				if(risposta.success){
					if(!Ext.isEmpty(record)){
						form.dirty_suspendDirtyChange = true
						form.setRecord_cba(record);
						
						if(!Ext.isEmpty(record.attivitaProprieta)){
							Ext.each(record.attivitaProprieta, rec =>{
								this.storeProprieta.add(rec);
							})
						}
						
						form.dirty_suspendDirtyChange = false
						form.dirty_resetOriginal();
					}
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		})
    },
    
    init: function(){
    	this.callParent(arguments);
    	this.cbaConfig.controllerPageStd.nuovo = true;
    	
    	let nominativo = this.cbaConfig.controllerPageStd.cbaConfig.record.get('nominativo');
    
    	this.lookupReference('Nome').setHtml(nominativo);
		
    	this.storeProprieta = Ext.create('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_ProprietaStore')
    	
    	this.gestioneForm();
    	
    	this.aggiornaStore();
    	
    	this.lookupReference('CntOperatori').add(Ext.create('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_Operatori', {
			cbaConfig: {
				controllerDett: this
			}
		}));
//		
    	this.lookupReference('CntProp').add(Ext.create('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_Proprieta', {
			cbaConfig: {
				controllerUlteriori: this
			}
		}))
    },
    
    destroy: function(){
    	this.callParent();
    }

});
