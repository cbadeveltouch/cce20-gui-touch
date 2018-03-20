/**
 *  classe javascript per modularizzazione login.js
 */
class StdLoginSipcar {
	constructor() {
		
		this._storeUtente = null;
		this._parametriGet = null;
		this._storeModuli = null;
		this._storeEnte = null;
	}

	getParametriGet() {
		return this._parametriGet;
	}
	/**
	 *  @return _storeUtente
	 */
	getStoreUtenteLog() {
		let store = null;
		if (this._storeUtente === null) {
			this._storeUtente = Ext.create('CbaCssView.store.utente');
		} else {
			this._storeUtente = this._storeUtente;
		}
		return this._storeUtente;
	}
	/**
	 *  @return _storeEnte
	 */
	getStoreEnte() {
		let store = null;
		if (this._storeEnte === null) {
			this._storeEnte = Ext.create('CbaCssView.store.enti');
		} else {
			this._storeEnte = this._storeEnte;
		}
		return this._storeEnte;
	}
	/**
	 * 	@param lbErrore, 
	 *  @param text 
	 */ 
	showErrorMsg(lbErrore, text) {
		lbErrore.update(`<span class="erroreLogin">${StdCba.traduci(text)}<span>`);
		lbErrore.show(); 
	}
	/**
	 *  nel caso in cui ci siano altri browser da controllare vedi es IE8
	 * 	@param lbErrore 
	 *  @return isValid (true / false) 
	 */
	checkVersionBrowser(lbErrore) {
		
		let isValid = true;
		switch(true) {
			case Ext.isIE8m: 
				 //se il browser e' IE e la versione e' <=8 segnalo l'errore
				 this.showErrorMsg(lbErrore, 'MSG_ERRORE_VERSIONE_IE9')
				 isvalid = false;
			 break;
		}
		return isValid;
	}
	/**
	 *  controlla versione libreria di extjs
	 *  @param lbErrore, 
	 *  @param extjsVersion
	 *  @return validVersion (true / false)  
	 */
	checkVersionExtjs(lbErrore, extjsVersion) {
		const currentVersion = '6.2.1.167',
			  validVersion = !(extjsVersion.isLessThan(currentVersion)||(extjsVersion.isGreaterThan(currentVersion)));
		if (!validVersion){
			this.showErrorMsg(lbErrore, 'MSG_ERRORE_VERSIONE_EXTJS');
		}
		return validVersion; 
	}
	/**
	 *  prende parametri da URL se presenti
	 */
	findParametriGen() {  //TODO_BES togliere funzione getParametriGen da standard
		
		let array_url = document.URL.split("?");
		const getParams =  array_url.length > 1 ? array_url[array_url.length - 1] : false,		
			  params = null;
	
		// se ho parametri creo l'oggetto params
		if (getParams) {
		
			let strUrl = getParams.replace('loginParams=','');
			strUrl = decodeURI(params);
			
			let split = strUrl.split('&');
			let [username, password, codEntePwd, idModulo, cdc] = split; //risptterare ordine [0], [1] ..ecc
			params = { username, password, codEntePwd, idModulo, cdc };
		}		
		this._parametriGet = params;
	}
	/**
	 *  nasconde parametri nell' url
	 */
	hideUrlParams() {
		 if(history.replaceState){
	         history.replaceState({}, "", "/cba/login.html");
	     }
	}
	/**
	 * 	 imposta titolo nella tab del browser
	 * 	 @param text
	 */
	setDocumentTitle(text) {
		document.title = text; 
	}
	/**
	 * 	caricamento delle lingue utente/ componeneti di Exjs in base al parametro produzione true / false
	 *  @param lingua
	 *  @param produzione
	 */
	caricaLingua(lingua, produzione) {
		if (produzione) {
            Localizer.loadLocaleStrings(`${CbaRootServer}/cba/lingue/generali-${lingua}.js`);  //carico la lingua dell'utente
           // loadScript(`${CbaRootServer}`+`/cba/lingue/ext-lang-${lingua}.js`);				    //carico la lingua x i componenti ExtJS
            //TODO_PLS ext-lang
        }else {
            Localizer.loadLocaleStrings(`${CbaRootServer}/cba/generali/lingue/${lingua}.js`); //carico la lingua dell'utente
            //loadScript(`${CbaRootServer}`+`/cba/generali/lingue/ext-lang-${lingua}.js`);		   //carico la lingua x i componenti ExtJS
        }
	}
	/**
	 *  estrapolazione dei moduli abilitati e moduli installati
	 *  @return CBA.moduli
	 */
	getModuliAbilitati() {   //TODO_BES togliere da standard.js
		Ext.Ajax.request({
			url: `${CbaRootServer}`+'/cba/gen/auth/profile/modenabled',
			method: 'GET',
			async: false,
			params: {
				codProfilo: CBA.parametriGenerali.codProfilo,
				codEnte: CBA.parametriGenerali.codEntePwd,
				idProfiloDePwd: Ext.isEmpty(CBA.parametriGenerali.idProfiloPwdDe)? -1 : CBA.parametriGenerali.idProfiloPwdDe
			},
			success: function(response){
				var risposta = Ext.JSON.decode(response.responseText);
				// aggiorno la variabile CBA.moduli.moduloXY dove XY e' il codmodulo
				// passato a parametro
				if(risposta.success){
					let moduli = {};
					
					let [modAbilitati, modInstallati] = risposta.data; //rispttare ordine  indice 0 abilitati  indice 1 installati
					
					modAbilitati = modAbilitati.split(''); // trasformo la stringa in array 
					modInstallati = modInstallati.split(''); // trasformo la stringa in array
					
					//TODO_BES moduli abilitati sono 99 installati 100 perche???
					for (let i = 0, countModuli = 100; i < countModuli; i++) {
						
						let abilitato = !Ext.isEmpty(modAbilitati[i]) && modAbilitati[i].includes('S');
						let installato = abilitato || modInstallati[i].includes('S');
						moduli[`modulo${i + 1}`] = {abilitato, installato};
						
					}
					//applico alla variabile globale
					Object.assign(CBA, {moduli});
				}else{
					StdCba.msgShowError('',risposta.message);
				}
			}
		});
	}
	/**
	 *  versione libreria utilizzate sencha, jasper, java
	 *  @param elToShow
	 */
	getVersioniLibrerie(elToShow) {
		Ext.Ajax.request({
			method: 'GET',
			url: `${CbaRootServer}`+'/cba/gen/systeminfo',
			params: {
				parametro: 'java.runtime.version'
            },
			success: function (response) {
				const panel= Ext.create('Ext.panel.Panel', {
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					bodyPadding: 10,
					items: [
						{
							xtype: 'label',
							margin: '0 0 20 0',
							html: `<div> 
										 <img src="generali/images/login/logo-extjs.png" style="height: 24px;"/> 
										 <span class="cbaVersioniLibrerie">v. ${Ext.getVersion().version}</span>
								   </div>`
						},
						{
							xtype: 'label',
							margin: '0 0 20 0',
							html: `<div> 
										<img src="generali/images/login/logo-jasper.png" style="height: 24px;"/>
										<span class="cbaVersioniLibrerie">v.5.6.1'</span>
								  </div>`
						},
						{
							xtype: 'label',
							html: `<div>
										<img src="generali/images/login/logo-java.png" style="height: 40px;"/>
										<span class="cbaVersioniLibrerie">v. ${response.responseText}</span>
								  </div>`
						}
					]
				});
			}
		});
	}
	/**
	 *  logOut applicativo per modulo = 43
	 *  @param idModulo
	 */
	logoutApplicativo(idModulo = null) {
		 //preparo il path x il logout
        const urlApp = `${CbaRootServer}`+'/cba/gen/auth/webApp/disable';

        if(idModulo && idModulo === 43){
            Ext.Ajax.request({
                url: urlApp,
                method: 'GET',
                params: {
                    moduleId: idModulo
                },
                async: false
            });
        }
	}
	/**
	 * 	login Applicativo in base all' idModulo
	 *  @param idModulo
	 */
	loginApplicativo(idModulo = null) {
		 let errore = true;
        //faccio primo il logout dell'applicativo per evitare che rimanga pending
        this.logoutApplicativo(idModulo);

        //preparo il path x il programma da lanciare
        const urlApp= `${CbaRootServer}`+'/cba/gen/auth/webApp/enable';

        //creo la sessione shiro del programma
        Ext.Ajax.request( {
            async: false,
            url: urlApp,
            method: 'GET',
            params: {
                moduleId: idModulo
            },
            success: (response) => {
                let risposta = Ext.decode(response.responseText);
                if (risposta.success) {
                    errore = false;
                } else {
                	StdCba.msgShowError('',risposta.message);
                }
            }
        });
        return !errore;
	}
	/**
	 *  recupera il controller della Menu.js
	 *  @return controllerMenu
	 */
	getControllerMenu() {
		return Sipcar.app.getController('Menu');
	}
	/**
	 *  @param config 
	 *  @param callBackFnResolve
	 *  @param callBackFnReject
	 *  @return callBackFnResolve
	 */
	setLogin(config = {}, callBackFnResolve = null, callBackFnReject = null) {
		/*
		 *  promise, prima chiamata store utente log seconda chiamata store ente
		 */
		this.promiseCall(this.getStoreUtenteLog(), config)
			.then(rec => {
				//controllo idProfilo
				//se ho il profilo = null do il msg ed esco
				let  {codProfilo, nomeUtente} = rec[0].data; 
				
				if (!codProfilo) {
					StdCba.msgShowError('','MSG_ERRORE_PROFILO');
					return false;
				}
				this.setDocumentTitle(nomeUtente);
				return this.promiseCall(this.getStoreEnte(), {codProfilo})
			})
			.then(rec => {
				
				if (callBackFnResolve)
					callBackFnResolve(rec);
			})
			.catch(error => {
				
				if(callBackFnReject)
					callBackFnReject(error)
			}); 
	}
	/**
	 *  Promise per store utente log e store ente selezionato 
	 *  @param store
	 *  @param params
	 *  @param callBackFn
	 *  @return promise  
	 */
	promiseCall(store, params, callBackFn) {
		store.getProxy().extraParams = params;
		return new Promise((resolve, reject) => { 
			store.load({
				callback: (rec, eOpts, success) => {
					if(success && callBackFn) {
						callBackFn(rec);
					} 
					if (success) {
						resolve(rec);
						
					} else {
						reject(eOpts)
					}
					
				}});
		});
	}
	/**
	 *  Promise per load script .js !(CBA.parametriGenerali.produzione)
	 *  @param pathScript
	 *  @param callBackFn
	 *  @return promise  
	 */
	loadScriptByPromise(pathScript, callBackFn) {
		return new Promise((resolve, reject) => {
			loadScript(pathScript, () => {
				if (callBackFn) {
					callBackFn();
				}
				resolve();  
			},
			() =>{
				reject(pathScript)
			});
		});
	}
	/**
	 *  controllo versione database 
	 *  @param idModulo
	 *  @return versionOK 
	 */
	checkDbVersion(idModulo) {
        let versionOK = false;

        Ext.Ajax.request({
            url: `${CbaRootServer}`+'/cba/gen/auth/webApp/check/dbvers',
            params: {
                moduleId: idModulo
            },
            method: 'GET',
            async: false,
            success: function (response) {
                var risposta = Ext.decode( response.responseText );

                if(risposta.success){
                    if(risposta.data){
                        //le versioni coincidono
                        versionOK = true;
                    }else{
                        Messaggio('ATTENZIONE',risposta.message[0].testo,'OK','WARNING',
                        () => {
                            this.getControllerMenu().logout();
                        });
                    }
                }else{
                	StdCba.msgShowError('',risposta.message);
                }

            }
        });
        return versionOK;
    }
}
