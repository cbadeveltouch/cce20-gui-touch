Ext.define('CS.menuAzioni.rilevazioneAttivita.sommAttivitaMain.SommAttivitaMainController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-rilevazioneattivita-sommattivitamain-sommattivitamain',
    
    selectOspite: function(th, record){
    	var	menuCard = this.cbaConfig.controllerMainApp.lookupReference('MainLevels');
    	
    	StdCba.destroyFloatingButton(this.lookupReference('Form')); //altrimenti non mi ricrea i pulsanti giusti
    	
		this.cbaConfig.controllerMainApp.lookupReference('Level3').add(Ext.create('Generali.arch.pageStdAzioni.PageStdAzioni',{
			cbaConfig:{
				nomeVideata: this.cbaConfig.controllerPageStd.cbaConfig.nomeVideata,
				percorsoVideata: 'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.DettSommAttivita',
				tipo : 2,
				controllerMainApp: this.cbaConfig.controllerMainApp,
				record: record,
				recordAttivita: this.recordAttivita
			}
		}));
		
		menuCard.setActiveItem('#Level3');
    },
    
    onDislike: function(list, info){
    	let url = "resources/images/generali/dislike.svg";
    	this.controlloEsiti('F', url, info);
    },
    
    onLike: function(list, info){
    	
    	let url = "resources/images/generali/like.svg";
    	this.controlloEsiti('T', url, info);
    	
    },
    
    onDenied: function(list, info){
    	let url = "resources/images/generali/denied.svg";
    	this.controlloEsiti('X', url, info);
    	
    },
    
    controlloEsiti: function(esito, url, info){
    	this.storeEsitiGroup=[];
    	Ext.each(this.storeRisposte.getGroups().items, (rec)=>{
    		if(rec._groupKey === esito){
    			if(rec.length > 1){
    				Ext.each(rec.items, rec =>{
    					this.storeEsitiGroup.push(rec);
    				})

    				let panelRisposte = Ext.create('Ext.Panel',{
    					layout: {
    						type:'vbox',
    						align: 'stretch'
    					},
    					left: '10%',
    					top:'30%',
    					width: Ext.is.Phone ? '80%' : 500,
    				    maxHeight: 250,
    				    floated: true,
    				    modal: true,
    				    hideOnMaskTap: true,
    				    flex: 1,
    				    items: [
    				    	{
    				    		xtype: 'container',
    				    		itemId: 'CntRisposte', reference: 'CntRisposte',
    				    		layout:{
    				    			type:'vbox',
    				    			align: 'stretch'
    				    		},
    				    		flex: 1,
    				    		items:[
    				    			{
    									xtype:'dataview',
    									itemId: 'ListEsiti', reference: 'ListEsiti',
    									cls: 'cbaDataView',
    									flex: 1,
    									itemTpl: '<div style="width: 100%; display:inline-block; vertical-align:middle; align-items: center;">'+
		    									 '<image width = "30px"; src = "'+`${url}`+'"></image>'+
		    									 '<span style="display:inline-block; vertical-align:middle; align-items: center; height:40px ; margin-left:5px">{descrizione}</span>'+
		    									 '</div>',
    									store: this.storeEsitiGroup,
    									listeners:{
    										select: (th, record)=>{
    											th.up('panel').destroy();
    											let nominativo = info.record.get('nominativo');
    								        	info.item.setTpl('<div style="width: 100%; display:inline; vertical-align:middle;">'+
	    					        							 '<span style="float: left; width: 80%" class= "cbaCssLabel">'+`${nominativo}`+'</span>'+
		    					    							 '<image style= "float: right" width = "30px"; src = "'+`${url}`+'"></image>'+
		    					    							 '</div>'
		    					    							 )
    										}
    									}
    								}
    				    		]
    				    	}
				    	]
    				});
    				panelRisposte.show();
    			}
				else{
		    		let nominativo = info.record.get('nominativo');
		        	info.item.setTpl('<div style="width: 100%; display:inline; vertical-align:middle;">'+
	        						 '<span style="float: left; width: 80%" class= "cbaCssLabel">'+`${nominativo}`+'</span>'+
	    							 '<image style= "float: right" width = "30px"; src = "'+`${url}`+'"></image>'+
	    							 '</div>'
	    							 )
				}
    		}
    	});
    	return this.storeEsitiGroup;
    },
    
    gestionePulsanti:function(){
		var me = this;
		let form = me.lookupReference('Form'),
			btnConferma = form.createFabs.btnConferma,
			btnNuovo = form.createFabs.btnNuovo,
			btnRipristina = form.createFabs.btnRipristina;
		
		form.createFabs.btnMore.setHidden(true);
		form.createFabs.btnAnnulla.setHidden(true);
		
		btnNuovo.on('tap', function(){
			//TODO_PLS visualizzo listaUtenti e alla selezione lo aggiungo alla lista
		});
		
		btnRipristina.on('tap', function(){
			me.aggiornamentoTestata = true;
			me.aggiornaStore(me.testataSelezionata ? me.testataSelezionata : null, function(){
				me.resetControlli();
			});
		});
	},
	
	gestioneForm: function(){
		var me = this;
		var form = me.lookupReference('Form');
		
		this.cbaConfig.controllerPageStd.cbaConfig.permesso = 'S'; //TODO_PLS modifica

		me.cbaConfig.controllerPageStd.cbaConfig.controller = me;
		StdCba.createButton(me.cbaConfig.controllerPageStd);
		
        form.permesso = me.cbaConfig.permesso ? me.cbaConfig.permesso : 'L';
		form.controller = me;
		
		 form.on('dirtychange', function(th, isDirty) {
			if(isDirty){
				form.createFabs.btnMore.setHidden(true);
				form.createFabs.btnAnnulla.setHidden(true);
			}
				
			StdCba.btnNascondiMostra(isDirty, th);
	     	me.cbaConfig.controllerPageStd.nuovo = isDirty;
			StdCba.abilitaDisabilitaBtn(me.cbaConfig.controllerPageStd);
			
	     });
		
	},
    
	aggiornaStore: function(){
		
		let store = this.lookupReference('ListOspiti').getStore();
		
		
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/anagrafica/listMobile',
			params : {
				idProfilo: this.idProfilo
			},
			success: (response) => {
				var risposta = Ext.JSON.decode(response.responseText);
				var records = risposta.data;
				if(risposta.success){
					if(!Ext.isEmpty(records)){	

						Ext.each(records, function(rec) {
							modelAppo = Ext.create('Generali.arch.listaUtenti.ListaUtentiModel', rec);
							store.add(modelAppo);
						});
					}
				}
			}
		});
	},
	
    init: function(){
    	this.callParent(arguments);
    	Ext.is.Tablet ? this.cbaConfig.controllerPageStd.lookupReference('BtnBack').setHidden(true) : null;
    	this.lookupReference('Form').controller = this;
    	this.recordAttivita = this.cbaConfig.controllerPageStd.cbaConfig.record;
    	this.cbaConfig.controllerPageStd.tipo = 1;
    	this.cbaConfig.controllerPageStd.nuovo = false;
    	this.idProfilo = CBA.parametriGenerali.idProfiloCss;
    	
    	this.storeRisposte = Ext.create('CS.personalizzazioni.risposte.store.RisposteDe',{})
		
		let params = {
			codArea: 13,
			codDomanda: 20,
			idProfilo: this.idProfilo
		};
		this.storeRisposte.load({
			params: params
		});
		
    	this.gestioneForm();
    	
    	this.aggiornaStore();
    	
    	
    },
    
    destroy: function(){
    	StdCba.eliminaStore(this.storeRisposte);
    	this.callParent();
    }

});
