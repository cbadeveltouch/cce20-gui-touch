Ext.define('app.overrides.Store', {
	override: 'Ext.data.Store',
	
	listeners:{
		beforeload: (th)=>{
			//Per la lista è gia previsto un loadMask quindi allo store della lista attacco cbaConfig.list per non fare caricare un altro loadMask
//			if(Ext.isDefined(th.cbaConfig) && Ext.isDefined(th.cbaConfig.list)) 
				StdCba.inizioAttesa();
		},
		load: (th)=>{
			StdCba.fineAttesa();
			
		}
	},
	
    getByInternalId: function(internalId) {
        var data = this.getData(),
            keyCfg;
   
		// Qui l'originale 5.1 sbaglia in qualche modo, perché
		// hasInternalKeys risulta true ma byInternalId non c'è...
        if (!this.hasInternalKeys || !this.byInternalId) {
            keyCfg = {
                byInternalId: {
                    property: 'internalId',
                    rootProperty: ''
                }
            };
            this.hasInternalKeys = true;
        }
        if (data.filtered) {
            if (keyCfg) {
                data.setExtraKeys(keyCfg);
            }
            data = data.getSource();
        }
        if (keyCfg) {
            data.setExtraKeys(keyCfg);
        }
        return data.byInternalId.get(internalId) || null;
	}
});	