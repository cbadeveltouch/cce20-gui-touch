Ext.define('CbaCssTouch.view.cartella.consegne.DestinatariController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-consegne-destinatari',
    
	inizializzaNodiChecked: function() {
		var me = this,
			campoDirty = '';
		me.tmpEliminati = {};
		
		me.contaNodiPadre = 0;
		me.lookupReference('TreeFigProf').getRootNode().cascadeBy( function(n){

			var isLeaf = n.isLeaf();

			if (!isLeaf && !n.isRoot()) {
				n.bloccato  = n.get('checked') && me.consegnaLetta || !Ext.isEmpty(me.idPrev) && n.get('checked');
				me.contaNodiPadre = n.get('checked') ?  ++me.contaNodiPadre : me.contaNodiPadre;
				n.totaleFigliCheck = 0;

			} else if (isLeaf) {
				//sono sulle foglie 
				var nodoPadre = n.parentNode;
				n.set('visible', !nodoPadre.bloccato);
				nodoPadre.totaleFigliCheck = n.get('checked') ? ++nodoPadre.totaleFigliCheck :  nodoPadre.totaleFigliCheck; 
				
				if (!nodoPadre.isExpanded() && n.get('checked')) {
					nodoPadre.expand();
				}
			}

			if (n.get('checked')) {
				campoDirty +=  ';' + n.data.id + ';'; //le figure professionali hanno id negativo mentre i singoli operatori hanno id positivo	
			}
			//indipendentemente da foglia o padre e se consegna letta e ho dei checked a true vengono congelati ossia non possono piu essere modificati
			n.set('cls', (me.consegnaLetta && n.get('checked') || (!me.consegnaLetta && !Ext.isEmpty(me.idPrev)) && n.get('checked') ? 'cba-disabled-element': ''));
			n.nodoDisabled = n.get('cls') == 'cba-disabled-element'; //proprieta che su tutti i nodi viene applicata indica se il nodo è disabilitato oppure no il nodo risulta disabilitato se sto annullando e sostituendo una consegna 
			
		});

		me.lookupReference('Form').setValues({
			campoDirty: campoDirty,
			selTutto: me.lookupReference('TreeFigProf').getRootNode().childNodes.length == me.contaNodiPadre
		});

	},
    
	caricaFigProf: function(idConsegna){
		var me = this;
		var params = {};
		Ext.suspendLayouts();

		if (idConsegna) {
			params.idConsegna = idConsegna;
		}

		me.lookupReference('TreeFigProf').getStore().load({
			params: params,
			callback: function(records, operation, success){
				if (success){
					me.inizializzaNodiChecked();
				}
				else{
					StdCba.msgShowError('',operation.getError());
				}
			}
		});
		Ext.resumeLayouts(true);
	},
    
    init: function(){
    	this.callParent(arguments);
    	var me = this;
    	
    	//carico le figure professionali  se nuova consegna
		me.caricaFigProf();
    },
    
    destroy: function(){
    	
    }

});
