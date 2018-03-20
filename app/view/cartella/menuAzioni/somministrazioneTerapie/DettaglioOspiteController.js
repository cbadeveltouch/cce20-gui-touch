Ext.define('CS.menuAzioni.somministrazioneTerapie.DettaglioOspiteController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-somministrazioneterapie-dettaglioospite',
    
    init: function(){
    	this.callParent();
    	let record = this.cbaConfig.record;
    	this.lookupReference('LbAssistito').setHtml(record.get('nominativo'));
    	this.lookupReference('LbDataNascita').setHtml(record.get('dataNascitaFormatted'));
//    	this.lookupReference('LbCodFisc').setHtml(record.get('codFisc'));
//    	
//    	let res= record.get('residenza'),
//    		desSede= res && res['desSede'] ? res['desSede'] : '',
//    		desReparto= res && res['desReparto'] ? ' - ' + res['desReparto'] : '',
//    		desStanza= res && res['desStanza'] ? ' - ' + res['desStanza'] : '',
//    		desLetto= res && res['desLetto'] ? ' - ' + res['desLetto'] : '';
//    	                	                	
//    	this.lookupReference('LbResidenziale').setHtml(`${desSede} ${desReparto} ${desStanza} ${desLetto}`);
    },
    
    destroy:function(){
    	this.callParent(arguments);
    }

});
