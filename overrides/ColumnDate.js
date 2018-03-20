//visualizzazione 24:00 ore nelle griglie
Ext.define('app.overrides.ColumnDate', {    
	override: 'Ext.grid.column.Date',

    defaultRenderer: function(value) {
		if(Ext.Date.isEqual(value, new Date(1899, 11, 31, 0, 0, 0)))
			return "24:00";
        else return Ext.util.Format.date(value, this.format);
    }
});