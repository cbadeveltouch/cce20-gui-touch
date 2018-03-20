//Bug sencha su checkfield readonly non disabilita 
Ext.define('app.overrides.Radiofield', {
	override: 'Ext.field.Radio',
	
	initialize: function(){
		if (this.cbahtml) {
			this.setLabel(StdCba.traduci(this.cbahtml))
		}
		
		this.on('change', function(th, newValue, oldValue){
			let value = th.getChecked();
			if(this.getReadOnly() === true ){
				this.suspendEvents();  //TDOD_BES: da rivedere :) 
				value === false ? this.setChecked(true) : this.setChecked(false) ;
				this.resumeEvents();
				return false;
				
			}
		})
	}
});