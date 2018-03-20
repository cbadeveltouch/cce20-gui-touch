Ext.define('app.overrides.LocalStore', {
	override: 'Ext.data.LocalStore',
	
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