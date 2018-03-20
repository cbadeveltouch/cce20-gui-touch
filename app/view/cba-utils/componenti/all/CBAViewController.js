Ext.define ('CbaUtils.componenti.all.CBAViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'widget.CBAViewController',
	alternateClassName: 'CBAViewController',
	
	init: function(config) {
	    this.cbaConfig = this.view.cbaConfig;
	    
		Localizer.localize(this.getView());
	}
	
});