Ext.define('app.overrides.Label', {
	override: 'Ext.Label',
	
	initialize: function(){
		/*Viene usato nel caso in cui la label da tradurre non va a capo, in quanto inizialmente si setta quelle non tradotto piu brve 
		 * e solo in seguito quella tradotta
		 * */
		
		if (this.cbahtml) {
			this.setHtml(StdCba.traduci(this.cbahtml))
		}
	}
});