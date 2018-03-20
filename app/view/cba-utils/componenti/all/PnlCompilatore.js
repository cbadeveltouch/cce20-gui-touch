Ext.define ('CbaUtils.componenti.all.PnlCompilatore', {
	extend: 'Ext.Toolbar',
	alias: 'widget.pnlCompilatore',
	alternateClassName: 'pnlCompilatore',

	docked: 'bottom',
	layout:{
		type: 'hbox',
		align: 'stretch'
	},
	flex: 1,
	height: 38,
	width: '100%',
	initialize: function() {
		let items= [
			{
				xtype: 'img',
				itemId: 'ImgBlocco', reference: 'ImgBlocco',
				width: 30,
				height: 30,
				listeners:{
					tap: 'tapInfoBlocco'
				}
			},
			{
				xtype: 'label',
				itemId: 'LabelCompilatore', reference: 'LabelCompilatore',
				width: '95%',
				cls: 'cbaCssLabel',
				margin: '0 5 0 0'
			}
		]
		this.add(items);
	},
	
	setLabelCompilatore: function(text, form){
		this.down('#LabelCompilatore').setHtml('Compilatore: '+ text);
		
		let btnBlocco = this.down('#ImgBlocco');
		
		btnBlocco.setHidden(true);
		
		/*
		 * Se non ho la testata non gestisco blocchi tranne che nel caso di consegne dove uso il form.contorller.tipoBlocco
		 * 
		 * 
		 * */
		var recordTestata = form && form.controller ? 
									( form.controller.recordTestata ? form.controller.recordTestata : form.controller.tipoBlocco): null;
		if(!recordTestata) 
			return false;
		btnBlocco.setHidden(false);
		let bloccoTestata = form.controller.tipoBlocco ? form.controller.tipoBlocco : form.controller.recordTestata.get('tipoBlocco'),
			tipoBlocco = StdCba.cssGetBlocchi(bloccoTestata);
			
		let objWarningRetrOrazione = StdCba.cssGetWarningHours(bloccoTestata),
			clsWarning = '',
			descrAlert = '';
		
		if (objWarningRetrOrazione) {
			descrAlert = `<b>${objWarningRetrOrazione['extra']}</b>`;
			clsWarning = '-warning';
		}
		/* texttooltip fissato nell'aggiornaStore*/
		btnBlocco.recordAnnullato = false;
		
		var textBlocco = '',
			permessoForm = form.permesso;
		if(tipoBlocco[0] == 'DEL'){
			btnBlocco.recordAnnullato = true;
			btnBlocco.removeCls(btnBlocco.classeLockTestata);
			btnBlocco.classeLockTestata = `cbaCssLockTestata-annullata${clsWarning}`;
			btnBlocco.addCls(btnBlocco.classeLockTestata);
			btnBlocco.gonzo = 'annullato';
			
			let	dataDeleted = form.controller.recordTestata.get('deletedData');
			textBlocco = StdCba.traduci('ANNULLATO') + ' ' + StdCba.traduci('DA') + ' ' + text;
			textBlocco += ' ' + StdCba.traduci('IL_GIORNO');
			textBlocco += ' ' + Ext.Date.format(Ext.Date.parse(dataDeleted, 'c'), 'd/m/Y');
			textBlocco += ' ' + StdCba.traduci('ALLE').toLowerCase() + ' ' + Ext.Date.format(Ext.Date.parse(dataDeleted, 'c'), 'H:i');	
			
//			btnBlocco.cbaConfig.txt = textBlocco;
		}else if ( permessoForm == 'S' && tipoBlocco[0] == 'SOME' ) {		//RECORD MULTICOMPILATORE (lucchetto aperto)
			btnBlocco.removeCls(btnBlocco.classeLockTestata);
			btnBlocco.classeLockTestata = `cbaCssLockTestata-unlocked${clsWarning}`;
			btnBlocco.addCls(btnBlocco.classeLockTestata);
			
			textBlocco = '<b>' + StdCba.traduci('CS_TESTATA_MULTICOMPILATORE') + ':</b><br>' + tipoBlocco[2] + '<br>' + descrAlert;
			btnBlocco.gonzo = 'parziale';	//serve per capire dalla form il permesso testata ereditando gli stessi controlli
		} else if ( permessoForm == 'L' || tipoBlocco[0] == 'LOCK' ) {		//RECORD BLOCCATO
			btnBlocco.removeCls(btnBlocco.classeLockTestata);
			btnBlocco.classeLockTestata = `cbaCssLockTestata${clsWarning}`;
			btnBlocco.addCls(btnBlocco.classeLockTestata);
			textBlocco = '<b>' + StdCba.traduci('IMPOSSIBILE_MODIFICA_DATI') + ':</b>';
			if( permessoForm == 'S' ) {
				if(tipoBlocco[0] == 'LOCK')
					textBlocco += tipoBlocco[2]  + descrAlert;
			}else textBlocco += '<br><b>' + StdCba.traduci('CS_PERMESSI_DI_SOLA_LETTURA') + '</b><br>' + descrAlert;
	
			btnBlocco.gonzo = 'bloccato';	//serve per capire dalla form il permesso testata ereditando gli stessi controlli
		} else {
			btnBlocco.gonzo = false;	//serve per capire dalla form il permesso testata ereditando gli stessi controlli
			btnBlocco.removeCls(btnBlocco.classeLockTestata);
		}
		btnBlocco.cbaConfig.txt = textBlocco;
		//scheda aperta
		if (tipoBlocco[0] === 'WR' && objWarningRetrOrazione) {
			btnBlocco.classeLockTestata = 'cbaCssWarningHours';
			btnBlocco.addCls(btn.classeLockTestata);
		}
	},
	
	setNuovoRecord: function(ggBloccoModifica) {
    	let idProfilo = CBA.parametriGenerali.idProfiloCss;
    	this.setLabelCompilatore(StdCba.descNomeProfUser());
    	this.down('#ImgBlocco').setHidden(true);
	}
});