Ext.define('CS.parametri.ParametriStdController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-parametri-parametriStd',
    
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
	
	getValoreCampo: function() {

		var form =  this.parametro.up('#Form'),
			ctrl = form.controller,
			valCampo = null,
			table = '',
			color = ctrl.isWarning(this) ? 'red;' : 'none;';
		
		switch (this.parametro.xtype) {
			case  'selectfield': 
				valCampo =  !Ext.isEmpty(this.parametro.getSelection()) ? '<span style="color: '+ color +' ">' + this.parametro.getSelection().get(this.parametro._displayField) +'</span>' : '';
			break;
			case 'radiogroup': 
				var items = this.parametro.getBoxes();					
				items.forEach(
					function(radio){
						if (radio.getValue()) {
							valCampo =  '<span style="color: ' + color + '">' + StdCba.traduci(radio.boxLabel) + '</span>' ;
						}
					});
			break;
			default: 
				valCampo = !Ext.isEmpty(this.parametro.getValue()) ? '<span style="color: '+ color +' ">' + this.parametro.getValue() +'</span>' : '';
			break;
		}
		return valCampo;

	},
	
	calcolaBMI: function(peso, altezza, bmi, controller){
		var me = controller;
		let statoBmi = '',
			form = me.lookupReference('Form');
		
		if((peso != null || altezza != null) && Ext.isEmpty(bmi)){
			if(me.showMessaggioBmi){
				StdCba.Messaggio('ATTENZIONE', StdCba.traduci('MSG_BMI'), 'OK', 'INFO');
				me.showMessaggioBmi = false;
				return false;
			}
		}
		//TODO_PLS numeri decimali???
		me.vitaliController.lookupReference('Bmi').cbaConfig.valBmi = bmi;
		if(!Ext.isEmpty(bmi)){
			bmi = parseFloat(bmi.toString().replace('.', ','));
			form.dirty_suspendDirtyChange = true;
			me.vitaliController.lookupReference('Bmi').setValue(bmi);
			form.dirty_suspendDirtyChange = false;
		}
	}

});
