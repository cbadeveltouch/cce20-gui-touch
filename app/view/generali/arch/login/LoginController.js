Ext.define('Generali.arch.login.LoginController', {
    extend: 'CBAViewController',
    alias: 'controller.generali.arch.login.login',

	tapBtnEntra: function(){
		let selectEnte = this.lookupReference('CbEnte'),
			ente= selectEnte.getValue();
        if (ente) {
			/* non posso utilizzare il comboEnte.getSelectedRecord() perche' potrebbero esserci piu record con la stessa chiave, quindi guardo il testo, che e' univoco */
			let stEnte = selectEnte.getStore(),
				recEnte = StdCba.trovaRecord(stEnte, 'valore', selectEnte.getSelection().get('valore')),
				idProfiloPwdDe = 0;
			CBA.parametriGenerali.idProfiloCss = null;
			if (recEnte) {
				idProfiloPwdDe = recEnte.get('extra');
				CBA.parametriGenerali.idProfiloCss = recEnte.get('idProfiloCss');
			}
			this.setEnteSessione(ente, idProfiloPwdDe);
        }else{
            StdCba.msgShowError('','MSG_ERRORE_ENTE_LOGIN');
        }
	},
	
	getRegione : function(){
		var me = this;
		var idProfiloCss = Ext.isEmpty(CBA.parametriGenerali.idProfiloCss)? -1 : CBA.parametriGenerali.idProfiloCss;

		Ext.Ajax.request({
			method:'GET',
			url:`${CbaRootServer}`+'/cba/css/cs/ws/profili/regione',
			params:{
				 id: idProfiloCss,

			},
			success: function (response){
				var	risposta = Ext.JSON.decode(response.responseText);
				var messaggi = [];
				if(risposta.success){
					if(!Ext.isEmpty(risposta.data)){
						Ext.apply(CBA.moduli.modulo49, {
							regione: risposta.data
						});
					}
				}
			}
		});
	},
    	
	setEnteSessione(codiceEntePwd, idProfiloPwdDe) {
		var me = this;
        //setto l'ente selezionato per l'utente in sessione
		Ext.Ajax.request({
            url: `${CbaRootServer}`+'/cba/gen/auth/user/selectente',
            method: 'GET',
            params: {
                idEnte: codiceEntePwd
            },
            success: function(response){
                var risposta = Ext.decode(response.responseText);
                if(risposta.success){
                    me.caricaApplicativi(codiceEntePwd, idProfiloPwdDe);
                }else{
                	StdCba.msgShowError('',risposta.message);
                }
            }
        });
	},
    	
	caricaApplicativi: function(codiceEntePwd, idProfiloPwdDe) {
    	//TODO lingua
		let lingua;
        //se non ho fatto il logout o premuto il tasto F5
        if (localStorage.getItem('cbaLogoutEseguito')=='F') {
            //salvo i parametri generali presi dal localStorage, aggiornando la lingua
        	StdSipcar.setParametriGen()
        	lingua= CBA.parametriGenerali.lingua; //lingua dell'utente
        } else {
        	lingua= CBA.parametriGenerali.lingua; 
            //recupero dati utente login
            let datiUtente = this.stdLoginSipcar.getStoreUtenteLog().getAt(0);
            
            if (datiUtente.get('lingua')) {
                lingua = datiUtente.get('lingua').toLowerCase();
            }
        	Ext.apply(CBA.parametriGenerali,{
                codEntePwd: codiceEntePwd,
				idProfiloPwdDe : idProfiloPwdDe,
            });
            //salvo i parametri generali
            StdSipcar.setParametriGen(datiUtente);
        }
        
        if(lingua){
        	Localizer.loadLocaleStrings('resources/lingue/'+lingua+'.js');

            //carico la lingua x i componenti ExtJS
          //  StdCba.loadScript('app/generali/lingue/ext-lang-'+lingua+'.js');
        }
        
        Ext.apply(CBA.parametriGenerali,{
			codEnte: 101,
//			desEnte: this.organizzazione.get('valore'),
//			partitaIva: getExtraFieldOrg('pIva')
		});
        
        this.ajaxCall(`${CbaRootServer}`+'/cba/gen/auth/user/selectOrganization', {idOrganizzazione: 1}, 'GET')
		.then(() =>  this.ajaxCall(`${CbaRootServer}`+'/cba/gen/auth/user/selectSipcarModule', {idModulo: 49}, 'GET'))
		.then(() =>  this.ajaxCall(`${CbaRootServer}`+'/cba/gen/auth/webApp/enable', {moduleId: 49}, 'GET'))
		.then(() =>  this.changeLevel())
		.catch((message) => {
			StdCba.msgShowError('', message);
		});

		//this.stdLoginSipcar.caricaLingua(lingua, CBA.parametriGenerali.produzione);
		 //TODO finisco di caricare / inizializzare pjmenu...
        //===================================================
        localStorage.setItem('cbaLogoutEseguito','F');

    },
        
    setCodOperatore: function(){
    	 //codOperatore
    	
        Ext.Ajax.request({
			url: `${CbaRootServer}`+"/cba/css/cs/ws/teanapers/getbyutentepwd",
			method: "GET",
			async: false,
			params: {
				idUtentePwd: CBA.parametriGenerali.codUtente
			},
			success: function (response) {
				var risposta= Ext.decode(response.responseText);
				
				if (risposta.success){
					if (Ext.isEmpty(risposta.data.tipo)) {
						StdCba.msgShowError('', 'MSG_FIG_PROF');
						fineAttesa();
						return false;
					}
					CBA.moduli.modulo49.operatore = risposta.data;
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
    },
                
	ajaxCall: function(url, params, method, callbackfn){
		const promiseObj = new Promise((resolve, reject) =>{
			Ext.Ajax.request({
    			method: method,
    			url: url, 
    			params: params,
    			success: function (response) {
    				var risposta = Ext.JSON.decode(response.responseText);
    				if(risposta.success){
    					if(callbackfn)
    						callbackfn(risposta);
    					resolve(risposta);
    				}else{
    					reject(`${risposta.message[0].testo}` );
    				}
    			}
    		});
		});
		return promiseObj;
	},
	serverDate: function(){
		Ext.Ajax.request({
            url:`${CbaRootServer}`+'/cba/css/cs/ws/prszn/genparams',
            async: false,
            params: {
                codEnte: CBA.parametriGenerali.codEntePwd,
                codProfilo: CBA.parametriGenerali.codProfilo
            },
            method: 'GET',
            success: function (response) {
                var risposta= Ext.decode(response.responseText);
                if(risposta.success){
                    if(risposta.data.serverDate){
                    	CBA.parametriGenerali.serverDate = new Date(risposta.data.serverDate)
                        //converto la data del server nel formatto extjs
                        risposta.data.serverDate= Ext.Date.parse(risposta.data.serverDate,'c');
                    }
                    Ext.apply(CBA.moduli.modulo49,risposta.data);
                }else{
                	StdCba.msgShowError('',risposta.message);
                }
            }
        });
	},
	
	changeLevel: function(){
		var me = this;
		me.setCodOperatore();
		me.setCodOperatore();
		
		me.serverDate();
		me.getRegione();
		StdCba.cssImpostazioniConsegne();
		
		let containerMenuApp = me.cbaConfig.controllerMenuApp.lookupReference('ContainerMenuApp');
		
		containerMenuApp.removeAll();
	},
    	
	tapBtnLogin: function(th){
		var me = this;
		
		let username= this.lookupReference('UserName').getValue();
	    let password= this.lookupReference('Password').getValue();
	    let encrypt= 'F';
	    let cdc;
	
	    //controllo se ho settato i parametri di get
	    if (this.parametriGet) {
	    	
	    	let {username, password, cdc} = this.parametriGet;
	        encrypt= 'T';
	        username = username;
	        password = password;
	        cdc = cdc;
	    }
	    this.stdLoginSipcar.setLogin({username, password, encrypt, cdc}, 
			/*
	         *  in caso di successo caso del  callback loadEnti
	         */
			(rec) => {
				
	        	let {idProfiloCss, extra, codice} = rec[0].data;
				let ente = this.parametriGet ? this.parametriGet.codEntePwd : codice;
//				this.lookupReference('CbEnte').setStore(Ext.create('CbaCssView.store.enti'));
				this.lookupReference('CbEnte').getStore().loadData(rec);
				/*
				se ho un solo ente o se ho settato i parametri di get
				entro direttamente nel menu
				*/
				if (rec.length === 1 || this.parametriGet){
					CBA.parametriGenerali.idProfiloCss = idProfiloCss;
					this.setEnteSessione(ente, extra);
				}else{
					this.lookupReference('BtnLogin').hide();
					this.lookupReference('BtnEntra').show();
					
					this.lookupReference('CardUser').setHidden(true);
					this.lookupReference('CbEnte').setHidden(false);
					this.lookupReference('CbEnte').setValue(ente);
				}
	        }, 
	        /*
	         *  in caso di errore caso del reject
	         */
	        (recError) =>{
	        	 //azzero  la proprieta parametriGet
	        	delete this.parametriGet;
	        	
	        	StdCba.msgShowError('',recError.error, () => {
	        		let password = this.lookupReference('Password');
	        		password.reset();
	        		password.stopKeyEvent=true;
	            });
	        });
	},

	
	init: function(){
		var me = this;
		this.callParent(arguments);
		StdCba.requestexception(); //TODO_PLS sistemare
		this.stdLoginSipcar = new StdLoginSipcar();
        
        //controllo se ho settato i parametri di get
       this.stdLoginSipcar.findParametriGen();
       
       Ext.define('CBA.moduli.modulo49',{});
       
       if (this.stdLoginSipcar.getParametriGet()){
        	//in caso affermativo associo al controller la proprieta parametriGet
        	this.parametriGet = this.stdLoginSipcar.getParametriGet();
            this.stdLoginSipcar.hideUrlParams();
        }
        
        //sbianco i campi di autenticazione
        this.lookupReference('UserName').setValue('');
        this.lookupReference('Password').setValue('');
        this.lookupReference('Password').stopKeyEvent = false;
        //mi posiziono sul campo user
        this.lookupReference('UserName').focus();
        
         Localizer.localize(this.getView());
         /*TODO versione ext e browser
         * let lbErrore = me.lookupReference('LbErrore');
         * const isValidBrowser = this.stdLoginSipcar.checkVersionBrowser(lbErrore);
         * const isValidVersion = this.stdLoginSipcar.checkVersionExtjs(lbErrore,  Ext.getVersion());
         * 
         *  if (!isValidBrowser || !isValidVersion) 
        	return;
         */
        
        //se e' caduta la connessione al server rimando all'autenticazione
        //NB: cbaErroreConnessione impostato in Ext.Ajax.on('requestexception')
        if(localStorage.getItem('cbaErroreConnessione')=='T'){
        	localStorage.setItem('cbaLogoutEseguito','T');
        }

        localStorage.setItem('cbaErroreConnessione','F');

        if (localStorage.getItem('cbaLogoutEseguito')=='F'){

        	this.stdLoginSipcar.setDocumentTitle(localStorage.cbaNomeUtente);
        	
        	this.caricaApplicativi(localStorage.getItem('cbaCodEntePwd'), localStorage.getItem('cbaidProfiloPwdDe'));
   
        } else if (this.parametriGet){
        //se ho settato i parametri di get faccio il login
        	this.tapBtnLogin();
        } 
	},

	destroy: function(){
	    this.callParent();
	}
});
