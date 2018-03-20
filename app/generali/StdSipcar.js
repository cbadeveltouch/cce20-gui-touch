/**
 *  NB classe standard Sipcar non aggiungere il constructor
 *  NB i metodo vanno dichiarati STATIC
 */
class StdSipcar {
	
	/**
	 *  @param datiUtente - dati che provengono dalla chiamata relativa all'utente loggato dopo aver fatto il login
	 */
	static setParametriGen( datiUtente ) {
		if (datiUtente) {
			Ext.apply(CBA.parametriGenerali,{
                codUtente: datiUtente.get('codUtente'),
                amministratore: datiUtente.get('amministratore'),
                nomeUtente: datiUtente.get('nomeUtente'),
                codProfilo: datiUtente.get('codProfilo')
            });
            
            //salvo i parametriGenerali nel localStorage per gestione tasto F5
            localStorage.setItem('cbaCodEntePwd',CBA.parametriGenerali.codEntePwd);
            localStorage.setItem('cbaCodUtente',CBA.parametriGenerali.codUtente);
            localStorage.setItem('cbaAmministratore',CBA.parametriGenerali.amministratore);        
            localStorage.setItem('cbaNomeUtente',CBA.parametriGenerali.nomeUtente);
            localStorage.setItem('cbaCodProfilo',CBA.parametriGenerali.codProfilo);
            localStorage.setItem('cbaLingua',CBA.parametriGenerali.lingua);        
            localStorage.setItem('cbaidProfiloPwdDe',CBA.parametriGenerali.idProfiloPwdDe);
    		localStorage.setItem('idProfiloCss',CBA.parametriGenerali.idProfiloCss);
		} else {
			Ext.apply(CBA.parametriGenerali,{
                codEntePwd: localStorage.getItem('cbaCodEntePwd'),
                codUtente: localStorage.getItem('cbaCodUtente'),
                amministratore: localStorage.getItem('cbaAmministratore'),
                nomeUtente: localStorage.getItem('cbaNomeUtente'),
                codProfilo: localStorage.getItem('cbaCodProfilo'),
                lingua: localStorage.getItem('cbaLingua'),
				idProfiloPwdDe : localStorage.getItem('cbaidProfiloPwdDe'),
				idProfiloCss: parseInt(localStorage.getItem('idProfiloCss')),
            });
		}
	}
}

