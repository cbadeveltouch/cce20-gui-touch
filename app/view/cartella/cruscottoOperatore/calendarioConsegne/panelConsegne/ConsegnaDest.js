Ext.define('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.ConsegnaDest', {
	extend: 'Ext.data.Store',
    model: 'CS.cruscottoOperatore.calendarioConsegne.panelConsegne.ConsegnaDestModel',
	groupField: 'ragg',
	autoDestroy: true	
});