//Bug sencha su checkfield readonly non disabilita 
Ext.define('app.overrides.Checkboxfield', {
	override: 'Ext.field.Checkbox',
	
	initialize: function(){
		if (this.cbahtml) {
			this.setLabel(StdCba.traduci(this.cbahtml))
		}
	},
	
	onChange: function(e) {
		let value = this.getChecked();
		if(this.getReadOnly() === true ){
			return false;
			
		}
	
		this.callParent(arguments)
	}
});