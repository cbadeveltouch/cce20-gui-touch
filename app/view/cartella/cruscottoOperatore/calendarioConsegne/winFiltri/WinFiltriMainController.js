Ext.define('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltriMainController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-cruscottooperatore-calendarioconsegne-winfiltri-winfiltrimain',
    
    mostraFiltri: function(th){
    	var me = this;
    	th.setHidden(true);
    	me.cbaConfig.controllerMain.cbaConfig.controllerFiltriAvanzati.lookupReference('CntMain').setHidden(false);
    },
    
    init: function(){
    	this.callParent(arguments);
    	var me = this;
    	me.idProfilo = CBA.parametriGenerali.idProfiloCss;
        me.operatore = CBA.moduli.modulo49.operatore;
        me.isAmministratore = me.operatore.amministratore == 'T';
    	me.lookupReference('ContainerFiltri').controller = me;
    	me.primaVolta = true;
    	me.cbaConfig.controllerMain.cbaConfig.controllerFiltri = me;
    	
    	this.lookupReference('DataDal').setDateFormat('d/m/Y');
    	this.lookupReference('DataAl').setDateFormat('d/m/Y');
    	
    	StdCba.cssCaricaImpoVideata(me.cbaConfig.controllerMain, 'CS.personalizzazioni.personConsegne.impostazioni.Impostazioni', function(controller, rec){
			if(!Ext.isEmpty(rec)){
				//valori da impostazioni consegne
				var dataDal = Ext.Date.add(new Date(), Ext.Date.DAY, -rec.get('ggAddietro')),
					dataAl = Ext.Date.add(new Date(), Ext.Date.DAY, rec.get('ggSuccessivi'));
				
				me.lookupReference('DataDal').setValue(dataDal);
				me.lookupReference('DataAl').setValue(dataAl);
				
				me.lookupReference('OraDal').setInputValue('00:00');
				me.lookupReference('OraAl').setInputValue('23:59');

				me.lookupReference('DataDal').cbaConfig.defaultDate = dataDal;
				me.lookupReference('DataAl').cbaConfig.defaultDate = dataAl;
			
			}	
		});
    	
    	 me.lookupReference('ContainerFiltri').on('painted', function(th) {
             //dopo il render del contenuto recupero il bottone cerca per aggiungere un controllo 
             var btnCerca = th.up('#Container').down('#BtnCerca'),
                 btnCancella =  th.up('#Container').down('#BtnCancella'),
                 arrayBtn =  btnCerca.up('container').query('button'),
                 pos = null;
             
             if(me.primaVolta){
            	 me.primaVolta = false;
            	 btnCancella.setHidden(true);
                 //cerco il bottone il BtnCerca
                 arrayBtn.forEach(
                     function(btn, index) {
                         var itemId = btn.getItemId().toLowerCase();
                         if (itemId.includes('cerca')) {
                             pos = index;
                             return;
                         }
                     }
                 );
                 btnCerca.up('container').insert(pos + 3, {
                     xtype: 'button',
                     iconCls:'box-annulla-css',
                     cls: 'cbaBtnFunzione-mini',
                     handler: function() {
                         
                         var valFormIniziale = Ext.clone(me.cbaConfig.controllerMain.defaultConfig),
                         	 controllerFiltriAvanzati =  me.cbaConfig.controllerMain.cbaConfig.controllerFiltriAvanzati,
                             form = me.lookupReference('ContainerMain').up('#FormFiltri');
                         
                         Ext.each(me.lookupReference('FieldFiltri').query('checkboxfield'), function(th){
                        	 th.setChecked(false)
                         });
                         controllerFiltriAvanzati.lookupReference('CboxTipoConsegna').setValue(-1);;
                         
                         valFormIniziale.figProfDest = me.isAmministratore ? -1 : me.operatore.tipo;
                         valFormIniziale.idMittente = null;

                         controllerFiltriAvanzati.lookupReference('CboxUtenti').setValue(null);
                        
                         //ripristino configurazione iniziale iniziale  
                         form.setValues(valFormIniziale);
                     }
                 }); 
             }
             
         });
    	 
    	 me.lookupReference('ContainerFiltri').add(Ext.create('CS.cruscottoOperatore.calendarioConsegne.winFiltri.WinFiltri',{
     		cbaConfig:{
     			controllerMain: me.cbaConfig.controllerMain
     		}
     	}));
    },

	destroy: function(){
		this.callParent();
	}
    
});
