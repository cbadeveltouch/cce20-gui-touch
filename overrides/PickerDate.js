//visualizzazione 24:00 ore nelle griglie
Ext.define('app.overrides.PickerDate', {    
	override: 'Ext.picker.Date',

	config: {
        doneButton: 'Ok',
        monthText: 'Mese',
        dayText: 'Giorno',
        yearText: 'Anno'
    }
});