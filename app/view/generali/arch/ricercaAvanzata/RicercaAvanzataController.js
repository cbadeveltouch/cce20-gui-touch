Ext.define('Generali.arch.ricercaAvanzata.RicercaAvanzataController', {
    extend: 'CBAViewController',
    alias: 'controller.generali-arch-ricercaavanzata-ricercaavanzata',
    
    changeFiltriAttiviMobile: function(th, newValue, oldValue) {
		//per filtro su dispositivo  mobile
		var me = this;

		me.manualClick = true;
		if(newValue == "") 
			newValue = false;
		var attivo = newValue,
            btnApriFiltro = me.cbaConfig.controllerTestata.lookupReference('BtnAvanzate'),
			ctnInner = me.lookupReference('FiltriAttiviMobile').down('#MultipleChoiceCheck'); //cambiare il testo all'interno del cbaMultipleCoiche
		
		if ( ctnInner )
			ctnInner.setHtml(StdCba.traduci(attivo ? 'CS_ATTIVO' : 'CS_SPENTO'));
			
        btnApriFiltro.cbaConfig.attivo = attivo;
        btnApriFiltro.addCls(attivo ? 'icon-filter-on' : 'icon-filter-off');
        btnApriFiltro.removeCls(!attivo ? 'icon-filter-on' : 'icon-filter-off');
        
        if(!attivo)
        	me.cbaConfig.controllerTestata.aggiornaStore();
	},

	changeDataDal: function(th, newValue, oldValue){
		var me = this;
		var dataAl = me.lookupReference('DataAl');	
		if(newValue && StdCba.isValidDate(th) 
				&& ( !dataAl.getValue() || newValue.getTime() > dataAl.getValue().getTime() ))
			dataAl.setValue(newValue);
	},
	changeDataAl: function(th, newValue){
		var me = this;
		var dataDal = me.lookupReference('DataDal');
		if(!newValue){
			dataDal.setValue();
		}else{
			if(dataDal.getValue() && StdCba.isValidDate(th) && newValue.getTime() < dataDal.getValue().getTime())
				dataDal.setValue(newValue);
		}
	},
	
	clearFiltri: function(){debugger
		StdCba.clearForm(this.lookupReference('FormFiltri'));
	},
	
	applicaFiltri: function(th){debugger
		var me = this;
		me.lookupReference('FormFiltri').controller = me;
		if (th.stopEvent)
			return;

		//se non imposto le date si considera "ricerca alla data odierna"
		if( me.lookupReference('DataAl') && !me.lookupReference('DataAl').getValue() && !me.lookupReference('DataDal').getValue() )
			me.lookupReference('DataAl').setValue(new Date());
		
		if(me.cbaConfig.callbackCerca)
			me.cbaConfig.callbackCerca();
		me.lookupReference('Container').up('panel').hide();
		
		if (!me.manualClick) {
			if(me.lookupReference('FiltriAttiviMobile').getValueExclusive() == false || !me.lookupReference('FiltriAttiviMobile').getValueExclusive())
				me.lookupReference('FiltriAttiviMobile').setValueExclusive(true);
		}
		me.manualClick = false;

		
		me.cbaConfig.controllerTestata.aggiornaStore();
	},
	
	init: function(){	
		var me= this;
		me.callParent(arguments);
		
		me.lookupReference('FormFiltri').controller = me;

		if( me.cbaConfig.hideFiltriBase ) {
			Ext.each( me.lookupReference('FormFiltri').query('field'), function(field) {
				if( field.cbaConfig.filtroBase ) {
					field.hide();
					field.destroy();
				}
			});
			Ext.each( me.lookupReference('FormFiltri').query('fieldset'), function(fieldset) {
//				if( Ext.isEmpty(fieldset.items.items) ) {
					fieldset.hide();
					fieldset.destroy();
//				}
			});
		}
		
		me.lookupReference('MultipleChoiceCheck').setHtml(StdCba.traduci('CS_SPENTO'));
		
		if( me.cbaConfig.filtriPerson )
			me.lookupReference('FormFiltri').add( me.cbaConfig.filtriPerson );
		
		if( me.cbaConfig.callbackFn )
			me.cbaConfig.callbackFn();
//		
//		//SOLO PER DEBUG
//		if(!CBA.parametriGenerali.produzione) {
//			me.lookupReference('BtnCerca').up('container').add(Ext.create('Ext.Button', {
//				width: 24,
//				text: 'E',
//				tooltip: 'Visibile SOLO in fase di SVILUPPO!',
//				handler: function(th) {
//					cssEnableAll(me.cbaConfig.controllerTestata);
//					th.up('window').hide();
//				}
//			}));
//		}
	},	
	destroy : function(){
		//eliminaStore(this.storeX);
        this.callParent();
    }	

});
