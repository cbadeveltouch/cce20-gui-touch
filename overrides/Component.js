//Per sistemare il problema relativo ai radiogroup quando vengono disabilitati e non piu selezionabili
Ext.define('app.overrides.Component', {
    override: 'Ext.Component',

    initComponent: function() {
//        this.callParent(arguments);
		
        this.on('enable', function(cmp) {
            if (cmp.isMasked()) {
                cmp.unmask();
            }
        })
    }
});