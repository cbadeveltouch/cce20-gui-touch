//visualizzazione 24:00 ore nelle griglie
Ext.define('app.overrides.Picker', {    
	override: 'Ext.picker.Picker',

    config: {
        doneButton: 'Ok',
        cancelButton: 'Annulla'
    }
});