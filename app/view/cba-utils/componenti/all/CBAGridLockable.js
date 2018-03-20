Ext.define('CbaUtils.componenti.all.CBAGridLockable', {
	extend: 'Ext.grid.Grid',
	alias: 'widget.CBAGridLockable',
	alternateClassName: 'CBAGridLockable',
	
	initialize: function() {
		var me = this;
		
		me._columns.splice( 0, 0, Ext.create('Ext.grid.column.Column', {
			itemId: 'ColumnLock', reference: 'ColumnLock',
	        text: '',
	        fixed: 'true',
	        width: 32,
	        sortable: false,
	        resizable: false,
	        renderer: function(value, metadata, record, rowIndex,colIndex, store) {
	        	return "<span style='white-space: nowrap' id='" + 'colcanc' + Ext.id() + "'></span>";
			}
	    }));
		
		this.callParent(arguments);
		
		this.on('select', this.select);
	},
	
	listeners: {
		//l'evento beforeedit deve essere gestito cosi' perche' ritorna un valore..
		//quindi l'evento beforeedit standard del componente sencha deve essere eseguito per ultimo
		beforeedit: function(editor, context, eOpts) {
			//RICHIAMO EVENTO SU GRID ANNULLABILE (figlia)
			if( this.onBeforeEdit && Ext.isFunction(this.onBeforeEdit) )
				this.onBeforeEdit(editor, context, eOpts);
			
			if (editor.editing === true) {
				return false;
			}

			var tipoBlocco = context.record.get('tipoBlocco');
			if( tipoBlocco && cssHasBloccoModifica(tipoBlocco) )
				return false;
		}
	},
	
	select: function( th, selected, item, index, e, eOpts ){
		var idRec = ( selected && selected.length > 0 ) ? selected[0].get('id') : false;
		if( ( !selected || selected.length == 0 ) || !( idRec && idRec > 0 ) ) {
			var btnElimina = this.cbaConfig.btnElimina;
			if( btnElimina )
				btnElimina.setDisabled(true);
			return false;
		}
		
		var grid = this;			
		if( !grid.btnElimina ) {
			var itemId;
			Ext.each( this.query('image'), function(btn) {
				itemId = btn._itemId.toUpperCase();
				if( ( itemId.indexOf('ELIMINA') != -1 ) || ( itemId.indexOf('ANNULLA') != -1 ) ) {
					grid.btnElimina = btn;
				}
			});
			
			//controllo per sviluppo
			if( !grid.btnElimina && !CBA.parametriGenerali.produzione )
				alert('Button Elimina non trovato, inserire sul launch della videata: grid.cbaConfig.btnElimina = me.getBtnElimina();');
		}

		var btnElimina = grid.btnElimina;
		if( btnElimina && !btnElimina.cbaConfig.gestAnnullabile )
			btnElimina.setHidden( StdCba.cssHasBloccoModifica(selected[0].get('tipoBlocco')) );
	}
});