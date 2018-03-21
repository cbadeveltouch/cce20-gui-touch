Ext.define('CS.parametri.TabVitaliController', {
    extend: 'CS.parametri.ParametriStdController',
    alias: 'controller.cartella-parametri-tabvitali',
    
    blurPeso: function(th, ctrl){
		var me = this;
		if (!th.isValid()) {
			StdCba.Messaggio('ATTENZIONE', StdCba.traduci(th.cbaConfig.nomeCampo) + ' ' + StdCba.traduci('NON_VALIDO'), 'OK', 'ERROR',
				function(){
					ctrl.lookupReference('Bmi').setValue(null);
				 	th.setValue(null);
			 	}
			 );
			 return;
		}
		me.caricaBmi(th.getValue(), this.lookupReference('Altezza').getValue(),this.cbaConfig.parametriController);
		
	},
	
	blurAltezza: function(th, ctrl){
		this.caricaBmi(this.lookupReference('Peso').getValue(), th.getValue(), this.cbaConfig.parametriController);
		
	},


	caricaBmi: function(peso, altezza) {
		var me = this;
		
		if (Ext.isEmpty(peso) && Ext.isEmpty(altezza) ){
			me.lookupReference('Bmi').setValue(null);
			return false;
		}
			
		var parametri = {
			idRicovero: me.cbaConfig.parametriController.idRicovero
		};
		if (!Ext.isEmpty(peso)) {
			Ext.apply(parametri, {
				peso: peso
			});
		}

		if (!Ext.isEmpty(altezza)) {
			Ext.apply(parametri, {
				altezza: altezza
			});
		} 

		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/css/cs/ws/parametri/visite/bmi',
			params: parametri,
			success:  (response)=> {
				var risposta = Ext.JSON.decode(response.responseText);
				if(risposta.success){

					if(!Ext.isEmpty(risposta.data))
						me.calcolaBMI(null, null, risposta.data, me.cbaConfig.parametriController);
				   	

				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
	},
	changeRadioDroghe: function(th, newValue, oldValue) {
		if(newValue == 1) {
			this.lookupReference('DescrDroghe').setHidden(false);
		} else {
			this.lookupReference('DescrDroghe').setValue();
			this.lookupReference('DescrDroghe').setHidden(true);
		}
	},
	
	setParametriController: function(parametriController) {
        this.cbaConfig.parametriController = parametriController;

        this.cbaConfig.parametriController.vitaliController = this;
        //parametro : è il campo (componenete)
        //attivaControlli: se il campo ha controlli di massimo e minimo
        //valoreMin: valore minimo
        //valoreMax: valore massimo
        //abilitaFocus: funzione di focus
        //abilitaBlur: funzione di blur
        //nomeCampo: nome del campo
        //name per la form
        //fnConfronta funzione per eventuali confronti fra dati personalizzabile
        //tabRif: se clinico o vitale
        //fnExtraBlur: funzione per il blur del campo

        this.cbaConfig.parametriController.cntParametri = [
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
                parametro: me.lookupReference('OssigenoAriaAmbiente'),
                attivaControlli: true,
                valoreMin: 65,
                valoreMax: 100,
                abilitaBlur: true,
                abilitaFocus: true,
                nomeCampo: 'SPO2_ARIA_AMBIENTE',
                name: 'spo2',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_SPO2'

            },
            {
                parametro: me.lookupReference('OssigenoTerapia'),
                attivaControlli: true,
                valoreMin: 65,
                valoreMax: 100,
                abilitaBlur: true,
                abilitaFocus: true,
                nomeCampo: 'SPO2_OSSIGENO_TERAPIA',
                name: 'spo2ot',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_SPO2'


            },
            {
                parametro: me.lookupReference('FreqCardiaca'),
                attivaControlli: true,
                valoreMin: 30,
                valoreMax: 200,
                abilitaBlur: true,
                abilitaFocus: true,
                nomeCampo: 'FREQUENZA_CARDIACA',
                name: 'frequenza',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_FREQUENZACARD'

            },
            {
                parametro: me.lookupReference('SelectTipoCardiaca'),
                nomeCampo: 'TIPO_FREQUNZACARDIACA',
                name: 'tipoFreqCardiaca',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo
            },
            {
                parametro: me.lookupReference('Temperatura'),
                attivaControlli: true,
                valoreMin: 30,
                valoreMax: 50,
                abilitaBlur: true,
                abilitaFocus: true,
                nomeCampo: 'TEMPERATURA',
                name: 'temperatura',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_TEMPERATURA'

            },
            {
                parametro: me.lookupReference('FreqRespiratoria'),
                attivaControlli: true,
                nomeCampo: 'FREQUENZA_RESPIRATORIA',
                name: 'freqRespiratoria',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_FREQUENZARESPIRATORIA'

            },
            {
                parametro: me.lookupReference('SelectTipoRespiratoria'),
                nomeCampo: 'TIPO_RESPIRAZIONE',
                name: 'tipoRespirazione',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo

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
                getValoreCampo: me.getValoreCampo,
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
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'UNITA_MISURA_GLICEMIA'

            },
            {
                parametro: me.lookupReference('SelectAvpu'), //escluso da tutti i controlli
                name: 'avpu',
                tabRif: 'V',
                nomeCampo: 'AVPU',
                escludiDaParametri: true,
                getValoreCampo: me.getValoreCampo
            },
            {
                parametro: me.lookupReference('Peso'),
                abilitaFocus: true,
                abilitaBlur: true,
                nomeCampo: 'PESO',
                name: 'peso',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'KG'

            },
            {
                parametro: me.lookupReference('Altezza'),
                abilitaBlur: true,
                abilitaFocus: true,
                nomeCampo: 'ALTEZZA',
                name: 'altezza',
                tabRif: 'V',
                getValoreCampo: me.getValoreCampo,
                unitaMisura: 'CM'

            },
            {
                parametro: me.lookupReference('RadioAlcol'),
                name: 'testAlcool',
                escludiDaParametri: true,
                noGrafico: true,
                tabRif: 'V'
            },
            {
                parametro: me.lookupReference('RadioDroghe'),
                name: 'testDroghe',
                escludiDaParametri: true,
                noGrafico: true,
                tabRif: 'V'
            },
            {
                parametro: me.lookupReference('Bmi'),
                nomeCampo: 'BMI',
                name: 'bmi',
                escludiDaParametri: false,
                getValoreCampo: me.getValoreCampo,
                tabRif: 'V'
            },
            {
                parametro: me.lookupReference('RadioMalattiaAcuta'),
                escludiDaParametri: true,
                tabRif: 'V',
                noGrafico: true,
            }

        ];
	},

	init: function(){
		this.callParent(arguments);
		
		this.loadCbox(this.lookupReference('SelectTipoRespiratoria').getStore(), 3, 20);
		this.loadCbox(this.lookupReference('SelectTipoCardiaca').getStore(), 3, 30);
	},

	destroy: function(){
	    this.callParent();
	}

});
