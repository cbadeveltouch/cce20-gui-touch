Ext.define('CbaUtils.componenti.all.CBAGridAnnullabile', {
	extend: 'CBAGridLockable',
	alias: 'widget.CBAGridAnnullabile',
	alternateClassName: 'CBAGridAnnullabile',
		
	listeners:{
		initialize: function() {
			var me = this;
			
			me._columns.splice( 0, 0, Ext.create('Ext.grid.column.Column', {
		        text: '',
		        dataIndex: 'deletedInfo',
		        width: 32,
		        sortable: false,
		        resizable: false,
		        renderer : function(value, metadata, record, rowIndex,colIndex, store)  {
	                var idBtn = 'btnfunzionecss' + Ext.id(),
	                	cmp,
	                	tipoBlocco = record.get('tipoBlocco'),
	        			bloccoTrans = tipoBlocco ? cssGetBlocchi(tipoBlocco) : null,
						deleted = bloccoTrans && bloccoTrans[0] && bloccoTrans[0] == 'DEL';
	                if( tipoBlocco && deleted ){
						cmp = `<img id=" + idBtn + " src="/cba/css/generali/images/generali/css-lock-annullato${cssGetWarningHours(record.get('tipoBlocco')) ? '-warning' : ''}.svg" />`;

	                }
	                return cmp;
	            }
		    }));
			
			//edito funzione getRowClass, aggiungendo controllo su record eliminati (testo barrato)
//			var rwC = this.viewConfig.getRowClass,
//				a = ( rwC && Ext.isFunction(rwC) ) ? rwC : function (record, rowIndex, rp, store) {	return ' ';	},
//				old = a;
//			a = function(){
//				var originalResult = old.apply(old, arguments),			
//					tipoBlocco = arguments[0].get('tipoBlocco'),
//	    			bloccoTrans = tipoBlocco ? cssGetBlocchi(tipoBlocco) : null,
//					deleted = bloccoTrans && bloccoTrans[0] && bloccoTrans[0] == 'DEL';
//				if( tipoBlocco && deleted ){
//					originalResult += ' ' + 'cbaCssLockTestata-annullata-testo ';
//				}
//				return originalResult;
//			};		
//			this.viewConfig.getRowClass = a;
			
//			this.callParent(arguments);
		},
		
		select: function(th, selected) {
			var idRec = ( selected && selected.length > 0 ) ? selected[0].get('id') : false;
			if( ( !selected || selected.length == 0 ) || !StdCba.cbaValidId(idRec) )
				return false;
			
			var grid = this;			
			if(!grid.btnAnnulla ) {
				var itemId;
				Ext.each( this.query('image'), function(btn) {
					itemId = btn._itemId.toUpperCase();
					if( ( itemId.indexOf('ELIMINA') != -1 ) || ( itemId.indexOf('ANNULLA') != -1 ) ) {
						grid.btnAnnulla = btn;
						//ho associato il btn alla grid, in fase di destroy delle grid (mia dipendenza), devo anche eliminare il btn
						grid.on('beforedestroy', function(th_grid) {
							delete th_grid.btnAnnulla;
						});
					}
				});
			}
			
			var btnAnnulla = grid.btnAnnulla;
			if( btnAnnulla ) {
				var tipoBlocco = selected[0].get('tipoBlocco'),
					bloccoTrans = tipoBlocco ? StdCba.cssGetBlocchi(tipoBlocco) : null,
					deleted = bloccoTrans && bloccoTrans[0] && bloccoTrans[0] == 'DEL',
					bloccoModifica = StdCba.cssHasBloccoModifica(tipoBlocco),
					proprietarioScheda = CBA.moduli.modulo49.operatore.compilatore == selected[0].get('compilatore');
					
				btnAnnulla.setHidden( (tipoBlocco && deleted ) || !proprietarioScheda );
				
				btnAnnulla.cbaConfig.gestAnnullabile = true;
			}
		},
	},
	
	
	onBeforeEdit: function( editor, context, eOpts ) {
		var tipoBlocco = context.record.get('tipoBlocco'),
			bloccoTrans = tipoBlocco ? cssGetBlocchi(tipoBlocco) : null,
			deleted = bloccoTrans && bloccoTrans[0] && bloccoTrans[0] == 'DEL';
		if( tipoBlocco && ( deleted || StdCba.cssHasBloccoModifica(tipoBlocco) ) )
			return false;
		
	}
	
});