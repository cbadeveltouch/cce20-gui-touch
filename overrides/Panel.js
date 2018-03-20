// Correggi la definizione di "dockedItems" che in ExtJS 5 e' impostato a "null",
// rompendo cosi' il meccanismo usato in molti posti basato su "Ext.applyIf()".
Ext.define('app.overrides.Panel', {
	override: 'Ext.Panel',
	
	dockedItems: undefined,

});