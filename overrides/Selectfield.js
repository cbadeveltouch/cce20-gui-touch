//Bug sencha su selectfiel readonly non disabilita il mostra picker
Ext.define('app.overrides.Selectfield', {
	override: 'Ext.field.Select',
	// se non ho dati da visualizzare non apro il picker ma visualizzo messaggio
	initialize: function(){
		var me = this;
		if (this.cbahtml) {
			this.setLabel(StdCba.traduci(this.cbahtml))
		}
		this.getPicker().on('beforeshow', (th =>{
			if(this.getReadOnly())
				return false
			else{
				if(Ext.isEmpty(this.getStore().getData().items)){
					 Ext.toast(StdCba.traduci('MSG_DATI_NON_PRESENTI'), 600);
						return false;
				}
			}
				
		}))
	}
});