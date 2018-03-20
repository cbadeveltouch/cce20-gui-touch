Ext.define('CS.menuAzioni.somministrazioneTerapie.StdComponentiTerapie', {
	alternateClassName: 'StdComponentiTerapie',			
	
    statics: {
    	_INTERAZIONI: StdCba.traduci('TERAPIE_INTERAZIONI'),
    	_STORICO: StdCba.traduci('STORICO_FARMACO'),
    	_TERAPIE_DOPPI: StdCba.traduci('TERAPIE_DOPPI'),
    	_TERAPIE_ALLERGIE: StdCba.traduci('TERAPIE_ALLERGIE'),
    	_TERAPIE_FARMACO_H: StdCba.traduci('TERAPIE_FARMACO_H'),
    	_TERAPIE_ASSOCIATA: StdCba.traduci('TERAPIE_ASSOCIATA'),
    	_TERAPIE_MADRE: StdCba.traduci('TERAPIE_MADRE'),
    	_TERAPIE_TERAPIA_AL_BISOGNO: StdCba.traduci('TERAPIE_TERAPIA_AL_BISOGNO'),
    	_TERAPIE_ESTEMPORANEA_EMERGENZA: StdCba.traduci('TERAPIE_ESTEMPORANEA_EMERGENZA'),
    	_TERAPIE_BASE: StdCba.traduci('TERAPIE_TERAPIA_BASE'),
    	_TERAPIE_SETTIMANALE: StdCba.traduci('TERAPIE_TERAPIA_SETTIMANALE'),
    	_TERAPIE_VARIABILE: StdCba.traduci('TERAPIE_TERAPIA_VARIABILE'),
    	_TERAPIE_PERIODICA: StdCba.traduci('TERAPIE_TERAPIA_PERIODICA'),
    	_DATA_REG: StdCba.traduci('DATA_REG'),
		_ORA: StdCba.traduci('ORA'),
		_COMPILATORE: StdCba.traduci('COMPILATORE'),
		_TERAPIE_QUANTITA: StdCba.traduci('TERAPIE_QUANTITA'),
		_TERAPIE_UM: StdCba.traduci('TERAPIE_UM'),
		_FREQUENZA: StdCba.traduci('FREQUENZA'),
		_TERAPIE_ORARI: StdCba.traduci('TERAPIE_ORARI'),
		_TERAPIE_VIA_SOMMINISTRAZIONE: StdCba.traduci('TERAPIE_VIA_SOMMINISTRAZIONE'),
		_DATA_FINE: StdCba.traduci('DATA_FINE'),
		_INTERAZIONI: StdCba.traduci('TERAPIE_INTERAZIONI'),
		_STORICO: StdCba.traduci('STORICO_FARMACO'),
		_TERAPIE_DOPPI: StdCba.traduci('TERAPIE_DOPPI'),
		_TERAPIE_ALLERGIE: StdCba.traduci('TERAPIE_ALLERGIE'),
		_TERAPIE_FARMACO_H: StdCba.traduci('TERAPIE_FARMACO_H'),
		_TERAPIE_ASSOCIATA: StdCba.traduci('TERAPIE_ASSOCIATA'),
		_TERAPIE_MADRE: StdCba.traduci('TERAPIE_MADRE'),
		_TERAPIE_TERAPIA_AL_BISOGNO: StdCba.traduci('TERAPIE_TERAPIA_AL_BISOGNO'),
		_TERAPIE_ESTEMPORANEA_EMERGENZA: StdCba.traduci('TERAPIE_ESTEMPORANEA_EMERGENZA'),
		_TERAPIE_BASE: StdCba.traduci('TERAPIE_TERAPIA_BASE'),
		_TERAPIE_SETTIMANALE: StdCba.traduci('TERAPIE_TERAPIA_SETTIMANALE'),
		_TERAPIE_VARIABILE: StdCba.traduci('TERAPIE_TERAPIA_VARIABILE'),
		_TERAPIE_PERIODICA: StdCba.traduci('TERAPIE_TERAPIA_PERIODICA'),	
		_FINO_AL_GIORNO: StdCba.traduci('FINO_AL_GIORNO').toLowerCase(),
		_CHIUSA_DA: StdCba.traduci('TERAPIE_CHIUSA_DA'),
		_TERAPIE_MOTIVO_PRESCRIZIONE: StdCba.traduci('TERAPIE_MOTIVO_PRESCRIZIONE'),
		_UTENTE_ASSENTE_AL: StdCba.traduci('AL').toLowerCase(),
		_TERAPIE_MOTIVO_CHIUSURA: StdCba.traduci('TERAPIE_MOTIVO_CHIUSURA'),
		_NOTE: StdCba.traduci('NOTE'),
		_TERAPIE_MOTIVO_ANNULLAMENTO: StdCba.traduci('TERAPIE_MOTIVO_ANNULLAMENTO'),
		_CS_RECORD_ANNULLATO_DA: StdCba.traduci('CS_RECORD_ANNULLATO_DA'),
		_CS_RECORD_SOSPESO_DA: StdCba.traduci('CS_RECORD_SOSPESO_DA'),
		_IL_GIORNO: StdCba.traduci('IL_GIORNO'),
		_ALLE: StdCba.traduci('ALLE').toLowerCase(),
		_TERAPIE_NON_SOSTITUIBILE: StdCba.traduci('TERAPIE_NON_SOSTITUIBILE'),
		_TERAPIE_OFF_LABEL: StdCba.traduci('TERAPIE_OFF_LABEL'),
		_TERAPIE_CONVENZIONATO:StdCba.traduci('TERAPIE_CONVENZIONATO'),
		_TERAPIE_SPERIMENTALE:StdCba.traduci('TERAPIE_SPERIMENTALE'),
		_TERAPIE_DEL_PAZIENTE:StdCba.traduci('TERAPIE_DEL_PAZIENTE'),
    	
    	/** 
		 *  converto il formato orario  12.5 in formato H:i  12:30
		 */		
    	formattedOrario: function(value) {  //form int to string
    		let orario = '' + value,
    			minuti = '00',
    			ore = '',
    			str = orario.split('.');
    		
    		if (!Number.isInteger(value)) { 
    			let integerPart  = parseInt(str[0]),
    				decimalPart = Math.abs(integerPart - value);
    			minuti = Math.floor((decimalPart * 3700) / 60);
    		}
    		ore = str[0].length > 1 ? str[0] : '0' + str[0]; 
    		return (ore + ':' + minuti);
    	}, 
    	/**
		 *  converto il formato orario H:i in formato float o integer  12:30 = 12.5
		 */
    	convertHours: function(orario) { //string  to int
    		
    		let str = '';
    		if (orario.length > 0) {
    			tmp = orario.split(':');
    			str += tmp[0];
    			if (tmp[1].includes('3')) {
    				str += '.' + (parseInt(tmp[1]) / 60) * 100;
    			}
    			str = parseFloat(str);
    		} 
    		return str;
    	},
    	/**
    	 *  controlla l'ultimo orario inserito all'interno di uno store, ne ritorno l'ultimo orario incrementato di mezzo'ora NB: si da per
    	 *  scontato che lo store sia ORDINATO per data, DIREZIONE ASC
    	 */
    	checkUltimoOrarioEsistente: function(store, field) {
    		let lastRec = store.getAt(store.getCount() - 1),
    			nextOrario = 8;
    		
    		if (lastRec) {
    			nextOrario = lastRec.get(field) + 0.5;
    		} 
    		return nextOrario;
    	},
    	/**
    	 *  da capire se sulla terapia base/periodica va tolta la funzione di sort
    	 */
    	sorterFn: function(record1, record2, key) { 
        	 if (Ext.isEmpty(record1.get(key)) || 
        			 	Ext.isEmpty(record2.get(key))) {
        		 return 0;
        	 } 
        	 else return record1.get(key) > record2.get(key) ? 1 : -1;
        		 
         },
         /**  scatenato sul valid della form nella funzione verificaCampiForm editTerapia controller,
  		 *  il campo è validato se è pieno e se il tipo di terapia corrisponde a quello selezionato nella cbox 
  		 *  NB: questo perche a seconda del tipo di terapia ci sono dei campi nascosti che sulla validazione della form non devono essere considerati
  		 **/
         checkValidField: function(value, tipoTerapiaToValid, tipoTerapiaSel){
     		
     		let valid = true;
     		if (Ext.isEmpty(value)) {
     			valid = false;
     		} 
     		
     		if (!valid && !tipoTerapiaToValid.includes(tipoTerapiaSel)) {
     			return true;
     		}
     		return valid || StdCba.traduci('CS_CAMPO_OBBLIGATORIO');
             
         },	
         /**
          *  se farmaco è non sostituibile vengono aggiunge delle note extra da inserire nel campo note effettivo, 
          *  viene aggiunta un'icona rossa che apre un menu con la descrizione delle voci da mettere nel campo note
          */
         setNoteFarmacoNonSost: function(ckbNonSost, campoNote, ctrlTerapie) { 
        	 campoNote.on('boxready', th => { 
     			if (ckbNonSost.getValue() && !Ext.isDefined(th.alertNote)) {
     				if (ctrlTerapie) 
     					ctrlTerapie.menuNoteAggiuntive(th, false);
     			}
     		});
         },
         /**
          *  sul change del campo note, viene valorizzata la variabile di controller "note", le note relative alla terapia  
          *  vengono esposte in altre parti della videata
          */
         onChangeCmpNote: function(campo, ctrlTerapie) {
        	 if (campo) {
	        	 let textarea = campo.down('#CbaHtmlEditor_CampoTextArea');
	        	 if (textarea) {
	        		 textarea.on('change', (th, value) => {
	        			 ctrlTerapie.note = value; 
	          		});
	        	 }
        	 }
         },
         /**
          *  a seconda della modalità di ingresso nella videata vengono abilitati/disabilitati alcuni campi,
          *  ci sono delle condizioni extra per decidere se abilitare un campo o meno 
          */
         containerSolaLettura: function(component, arrayCmp, lock, associaTerapia, exclude) {
        	 lock = lock ? true : false;
        	 if (arrayCmp && arrayCmp.length > 0) {
        		
        		 arrayCmp.forEach(c => {
        			let cmp = component.down(`#${c}`);
        			if (cmp) {
        				
        				let abilita = associaTerapia && (exclude && exclude.includes(c));
        				
        				if (!abilita) {
	        				if (typeof cmp.setReadOnly === 'function') {
	        					cmp.setReadOnly(lock)
	        				} else {
	        					cmp.setDisabled(lock);
	        				}
        				}
        			}
    		 	});
        	 }
         },
         
         creaAvatar: function(tipo, config = {}, itemIdAutomatici = false) {
     		let tmp,
     			itemId;
     		
     		if(itemIdAutomatici)
     			itemId= 'Av-' + Ext.id();
     		
     		let height= config && config.height ? config.height : 32,
     			margin= config && config.margin ? config.margin : 'margin-right: 3px',					
     			float=  config && config.float ? config.float : 'none'; 		
     		
     		switch(tipo) {
     			case 'interazioni' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvInt',
     					color: 'red',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'INT'});
     			break;
     				
     			case 'lasa' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvLasa',
     					color: '#e1c11e',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'LASA'});
     			break;
     				
     			case 'doppi' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvDop',
     					color: '#cc7fe5',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'DOP'});
     			break;	
     				
     			case 'allergie' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvAll',
     					color: '#FFA500',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'ALL'});
     			break;
     				
     			case 'classeH' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvH',
     					color: '#4f7671',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'H'});
     			break;
     			
     			case 'storico' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvS',
     					color: '#c5c5c5',
     					textColor: '#000000',
     					height: height,
     					margin: margin,
     					float: float,
     					label: 'S'});
     			break;
     			
     			case 'alBisogno' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvAb',
     					color: '#88c575',
     					height: height,
     					margin: margin,					
     					shape: 'rect',
     					float: float,
     					label: 'AB'});			
     			break;
     			
     			case 'emergenza' : 
     				tmp= Ext.create('CbaUtils.componenti.all.Avatar', {
     					itemId: itemId ? itemId : 'AvEm',
     					color: '#FFA2A2',
     					height: height,
     					margin: margin,
     					shape: 'rect',
     					float: float,
     					label: 'EME'});			
     			break;			
     		}
     		
     		Ext.apply(tmp, config);				
     		
     		return tmp;
     	},
     	
     	creaLegendaGrid: function() {
     		return Ext.create('Ext.Container', {
     			layout: 'vbox',
     	    	defaults: {
     	    		margin: '0 0 5 0'
     	    	},		
     			items: [
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('interazioni', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._INTERAZIONI	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('lasa', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: 'LASA'	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('doppi', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_DOPPI	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('allergie', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_ALLERGIE	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('classeH', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_FARMACO_H	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        this.creaAvatar('storico', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._STORICO	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: `<img style="border:0 !important; height: 32px; width: 32px;" class="icon-chain" src="${Ext.BLANK_IMAGE_URL}" </img>`
     		    	        },
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_MADRE	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: `<img style="border:0 !important; height: 32px; width: 32px;" class="icon-chain-child" src="${Ext.BLANK_IMAGE_URL}" </img>`
     		    	        },
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_ASSOCIATA	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     			    	    this.creaAvatar('alBisogno', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_TERAPIA_AL_BISOGNO	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     						this.creaAvatar('emergenza', {}, true),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_ESTEMPORANEA_EMERGENZA	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     						Ext.create('CbaUtils.componenti.all.Avatar', {
     							color: '#' + this.getColoreTerapia('F', false),
                     			height: 32,
                     			margin: 'margin-right: 3px',
                     			shape: 'rect',
                     			label: 'aaa'}),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_BASE	
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     						Ext.create('CbaUtils.componenti.all.Avatar', {
     							color: '#' + this.getColoreTerapia('S', false),
                     			height: 32,
                     			margin: 'margin-right: 3px',
                     			shape: 'rect',
                     			label: ''}),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_SETTIMANALE
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     						Ext.create('CbaUtils.componenti.all.Avatar', {
     							color: '#' + this.getColoreTerapia('V', false),
                     			height: 32,
                     			margin: 'margin-right: 3px',
                     			shape: 'rect',
                     			label: ''}),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_VARIABILE
     		    	        }
     			    	]        			    	       
     			    },
     			    {    
     			    	xtype: 'container',
     			    	layout: {
     			    		type: 'hbox',
     			    		align: 'middle',
     			    		pack: 'center'
     			    	},
     			    	defaults: {
     			    		margin: '0 5 10 0'
     			    	},
     			    	items: [
     						Ext.create('CbaUtils.componenti.all.Avatar', {
     							color: '#' + this.getColoreTerapia('P', false),
                     			height: 32,
                     			margin: 'margin-right: 3px',
                     			shape: 'rect',
                     			label: ''}),
     		    	        {
     		    	        	xtype: 'label',
     		    	        	html: this._TERAPIE_PERIODICA
     		    	        }
     			    	]        			    	       
     			    }
     			]
     		});
     	},
     		
     	formattaCella: function(value, field) {
     		if(value) {
     			let str= '<div>',
     				len= value.length;						
     			
     			value.forEach((item, index) => {				
     				if(field == 'dosi')
     					item= Number.isInteger(parseFloat(item)) ? parseFloat(item) : formatFloat(parseFloat(item));	
     				
     				if(item == ' ' || item == null)
     					item= '&nbsp';
     								
     				if(len > 1)
     					style= 'min-height: 45px;'
     				else style= '';		
     																								
     				str += `<div style="${style}">${item}</div>`;
     			});								
     		
     			return str + '</div>';																																
     		}
     	},
     	/**
     	 *  componente per il dettaglio della prescrizione mostra quasi tutte li informazioni rlative alla prescrizione
     	 */
     	getDetailFarmaco: function(rowNode, row, record, isGridPortlet) {
    		/*
    		 * creo i dettagli del farmaco della grid 
    		 * */
    		let me= this;

        	rowNode.myCnt= Ext.create('Ext.panel.Panel', {	    		
    			layout: {
    				type: 'vbox',
    				align: 'stretch'
    			},
    			border: 0,
    			items: [
    			    {
    			    	xtype: 'panel',
    			    	border: 0,
    			    	layout: {
    			    		type: 'vbox',
    			    		align: 'stretch'
    			    	},
    			    	items: [
    		    	        {
    			    	    	xtype: 'panel',
    			    	    	border: 0,
    			    	    	itemId: 'CntDatiAgg',
    			    	    	margin: '0 0 0 5',
    			    	    	layout: {
    			    	    		type: 'vbox',
    			    	    		align: 'stretch'
    			    	    	}
    			    	    },    
    			    	    {
    			    	    	xtype: 'container',
    			    	    	itemId: 'CntAnnulla',
    			    	    	hidden: true,
    							layout: 'vbox',
    							defaults: {
    								margin: '10 20 10 5'
    							},
    							items: [
    							   {
    								    xtype: 'label',
    									itemId: 'LbAnnulla'
    							   }
    							]
    			    	    },
    			    	    { 
    			    	    	xtype: 'panel',
    			    	    	layout: {
    			    	    		type: 'hbox',
    			    	    		align: 'center'
    			    	    	},
    			    	    	border: 0,
    			    	    	items: [
    						        {
    									xtype: 'container',
    									itemId: 'CntCompilatore',										
    									layout:  isGridPortlet ? 'vbox' : 'hbox',
    									defaults: {
    										margin: '0 20 0 5'
    									},										
    									items: [
    										{
    											xtype: 'displayfield',
    											itemId:'DataRegistrazione',										        
    											fieldLabel: this._DATA_REG,
    											labelWidth: 65,
    											labelClsExtra: 'cbaCssLabel'
    										},
    										{
    											xtype: 'displayfield',
    											itemId:'OraRegistrazione',										        
    											fieldLabel: this._ORA,
    											labelWidth: 28,
    											labelClsExtra: 'cbaCssLabel'
    										},
    										{
    											xtype: 'displayfield',
    											itemId: 'LabelCompilatore',
    											fieldLabel: this._COMPILATORE,
    											labelClsExtra: 'cbaCssLabel',
    											labelWidth: 80
    										}
    									]
    						        },
    						        {
    									xtype: 'container',
    									itemId: 'CntAvatar',
    									layout: {
    										type: 'hbox'
    									},
    									margin: '0 0 0 10',
    									defaults: {
    					    	    		margin: '0 3 0 0'
    					    	    	}
    								}
    							]
    			    	    },
    			    	    {
    							xtype: 'label',
    							cls: 'cbaCssLabel',
    							itemId:'LabelMotiviPresc',
    							margin: '0 0 5 5'
    			    	    },
    			    	    {
    							xtype: 'label',
    							cls: 'cbaCssLabel',
    							itemId:'LabelDescrTerapiaAB', //descrizione per terapia al bisogno
    							margin: '0 0 5 5'
    			    	    },
    						{
    							xtype: 'label',
    							itemId:'LabelCompilatoreChiusura',
    							margin: '0 0 5 5'
    			    	    },
    			    	    {
    			    	    	xtype: 'cbaFieldsetHtmlEditor',
    			    	    	hidden: true,
    			    	    	itemId: 'TxtAreanote',
    			    	    	labelClsExtra: 'cbaCssLabel',
    			    	    	title: this._NOTE,
    			    	    	flex: 1,
    			    	    	margin: '0 5 5 5',
    			    	    	solaLettura: true,
    			    	    	labelAlign: 'top',
    			    	    	cbaConfig: {
    			    	    		minimal: true
    			    	    	}	
    			    	    },
    						{
    					    	xtype: 'panel',
    					    	border: 0,
    					    	itemId: 'CntOther'				    	
    					    }
    					]
    			    }				    
    			]
    		});
        										
    		let cntAvatar= rowNode.myCnt.down('#CntAvatar'),
    			cntCompilatore= rowNode.myCnt.down('#CntCompilatore'),
    			cntAnnulla= rowNode.myCnt.down('#CntAnnulla'),
    			cntOther= rowNode.myCnt.down('#CntOther'),
    			txtAreanote= rowNode.myCnt.down('#TxtAreanote'),
    			labelCompilatoreChiusura= rowNode.myCnt.down('#LabelCompilatoreChiusura'),
    			labelMotiviPresc= rowNode.myCnt.down('#LabelMotiviPresc'),
    			labelDescrAb = rowNode.myCnt.down('#LabelDescrTerapiaAB'); // label per descrizione terapia al bisogno
    		
    		Ext.Ajax.request({
    			method: 'GET',
    			url: '/cba/css/cs/ws/terapie/presc/getById', 
    			params: {
    				id: record.get('id')
    			},
    			success: (response) => {
    				var risposta = Ext.JSON.decode(response.responseText);					
    				
    				if(risposta.success){
    					if(risposta.data) {
    						let rec= risposta.data,
    							compilatore= rec.compilatoreNominativo,
    							isSospeso= record.get('sospensione'),
    							isDeleted= record.get('dataAnnulla'),
    							giorno= isSospeso ? rec.dataSosp : record.get('dataAnnulla'),
    							alGiorno= rec.dataFineSosp;
    							    					
    						//----------------- gestione eliminazione / annullamento -----------------	    						    					
    						if((isSospeso && rec.compilatoreSosp) || isDeleted) {
    							let compilatoreSospeso= isSospeso ? rec.compilatoreSosp : null,
    								compilatoreAnnulla = isDeleted ? rec.compilatoreAnnulla : null,
    								figProfSospeso= isSospeso ? rec.figProfSosp : null,
									figProfAnnulla = isDeleted ? rec.figProfAnnulla : null
    								motivoChiusura= isDeleted ? this._TERAPIE_MOTIVO_ANNULLAMENTO + ': ' +  rec.noteAnnullamento : '',
    			    				txtSospeso= isSospeso ? this._CS_RECORD_SOSPESO_DA : null,
		    						txtAnnullato = isDeleted ? this._CS_RECORD_ANNULLATO_DA : null
    			    				txtFinoAlGiorno= '',
    			    				txtAnnulla='';
    							
    							if(isSospeso && alGiorno != null)
    								txtFinoAlGiorno= `${this._FINO_AL_GIORNO} ${Ext.Date.format(Ext.Date.parse(alGiorno, 'c'), 'd/m/Y')}
    												  ${this._ALLE} ${Ext.Date.format(Ext.Date.parse(alGiorno, 'c'), 'H:i')}`;
    							if(isSospeso)
    								txtAnnulla = `
    								<div>
    									<span style="color:#ee3442;"><b>
    										${txtSospeso} ${compilatoreSospeso} ( ${figProfSospeso} )
    										${this._IL_GIORNO} ${Ext.Date.format(Ext.Date.parse(giorno, 'c'), 'd/m/Y')} 
    										${this._ALLE} ${Ext.Date.format(Ext.Date.parse(giorno, 'c'), 'H:i')}
    										${txtFinoAlGiorno}
    									</b></span>
    								</div>`;
    			    						
    							if(isDeleted)
    								txtAnnulla += `
    								<div>
    									<span style="color:#ee3442;"><b>
    										${txtAnnullato} ${compilatoreAnnulla} ( ${figProfAnnulla} )
    										${this._IL_GIORNO} ${Ext.Date.format(Ext.Date.parse(giorno, 'c'), 'd/m/Y')} 
    										${this._ALLE} ${Ext.Date.format(Ext.Date.parse(giorno, 'c'), 'H:i')}
    									</b></span>
    								</div>
    								<div>
    									<span style="color:#ee3442;">
    										${motivoChiusura} 
    									</span>
    								</div>`;
    							
    							cntAnnulla.down('#LbAnnulla').setHtml(txtAnnulla);
    							cntAnnulla.show();
    						}
    							    						
    						//----------------- gestione compilatore -----------------		    							    					
    						
    						if(!Ext.isEmpty(rec.compilatoreFigProf))
    							compilatore += ' (' + rec.compilatoreFigProf + ')'; 
    							
    						let dataReg= cntCompilatore.down('#DataRegistrazione');
    						dataReg.setValue(FormattaData(Ext.Date.parse(rec.dataCompilazione, 'c')));
    							    					
    						let oraReg= cntCompilatore.down('#OraRegistrazione'); 
    						oraReg.setValue(FormattaOra(Ext.Date.parse(rec.dataCompilazione, 'c')));
    						
    						cntCompilatore.down('#LabelCompilatore').setValue(compilatore);
    						
    						//----------------- Motivi prescrizione ---------------------------
    						if (rec.motivoPrescrizioneDesc) {
    							labelMotiviPresc.update(`<b>${this._TERAPIE_MOTIVO_PRESCRIZIONE}:</b> ${this.splitStr(rec.motivoPrescrizioneDesc)}`);
    						}
    						
    						//----------------- Gestione delle info legate alle alla terapia al bisogno --------
    						if (rec.tipoTerapia.includes('B')) {
    							let str = '';
    							if (rec.desAbCondSomm) {
    								str += `<b>${traduci('TERAPIE_CONDIZIONI_SOMMINISTRAZIONE')}:</b> ${rec.desAbCondSomm} - `;
    							}
    							if (rec.abSoglia) {
    								str += `<b>${traduci('TERAPIE_SOGLIA_MAX')}:</b> ${rec.abSoglia}  - `;
    							}
    							if (rec.abIntervalloMinimo) {
    								let time = FormattaData(new Date(rec.abIntervalloMinimo), 'H:i');
    								str += `<b>${traduci('TERAPIE_INTERVALLO')}:</b> ${time} (h) - `;
    							}
    							if (rec.abDosemax24h) {
    								str += `<b>${traduci('TERAPIE_DOSE_MAX_24')}:</b> ${rec.abDosemax24h} `;
    							}
    							labelDescrAb.setHtml(str);
    						}
    						//----------------- gestione chiusura compilatore -----------------
    												
    						if(rec.updateCompilatore && rec.updateData != null) {
    							let motiviChiusura= rec.motivoSospensioneDesc ? this._TERAPIE_MOTIVO_CHIUSURA + ': ' + rec.motivoSospensioneDesc.split(',').join(' - ') : '';
    							let compilatoreChiusura= `<b>${this._CHIUSA_DA} ${rec.compilatoreChiusura}
    													  ${this._IL_GIORNO} ${Ext.Date.format(Ext.Date.parse(rec.updateData, 'c'), 'd/m/Y')} 
    													  ${this._ALLE} ${Ext.Date.format(Ext.Date.parse(rec.updateData, 'c'), 'H:i')}
    													  <br>${motiviChiusura}
    													  </b>`;

    							labelCompilatoreChiusura.setHtml(compilatoreChiusura);
    						}	
    						
    						if(rec.note) {
    							txtAreanote.setValue(rec.note);
    							txtAreanote.show();
    						}	
    						if(cntOther) {
    							cntOther.add([
    							    {
    									xtype: 'checkboxgroup',															
    									columns: 3,
    							        vertical: true,
    							        defaults: {
    							    		width: 130
    							    	},
    							        items: [
    							        	{
    											xtype: 'checkboxfield',
    											itemId: 'CkbNonSost', reference: 'CkbNonSost',
    											cls: 'cbaCssLabel',
    											inputValue: 'T',
    											uncheckedValue: 'F',
    											name: 'nonSostituibile',
    											boxLabel: this._TERAPIE_NON_SOSTITUIBILE, 
    											readOnly: true,
    											checked: true,
    											hidden: rec.nonSostituibile != 'T' 
    										},
    										{
    											xtype: 'checkboxfield',
    											itemId: 'CkbOffLabel', reference: 'CkbOffLabel',
    											cls: 'cbaCssLabel',
    											inputValue: 'T',
    											uncheckedValue: 'F',
    											name: 'offlabel',
    											boxLabel: this._TERAPIE_OFF_LABEL,
    											readOnly: true,
    											checked: true,
    											hidden: rec.offlabel != 'T'
    										},													        	
    										{
    											xtype: 'checkboxfield',
    											itemId: 'CkbConvenzionato', reference: 'CkbConvenzionato',
    											cls: 'cbaCssLabel',
    											inputValue: 'T',
    											uncheckedValue: 'F',
    											name: 'convenzionato',
    											boxLabel: this._TERAPIE_CONVENZIONATO,
    											readOnly: true,
    											checked: true,
    											hidden: rec.convenzionato != 'T'
    										},
    										{
    											xtype: 'checkboxfield',
    											itemId: 'CkbSperimentale', reference: 'CkbSperimentale',
    											cls: 'cbaCssLabel',
    											inputValue: 'T',
    											uncheckedValue: 'F',
    											name: 'sperimentale',
    											boxLabel: this._TERAPIE_SPERIMENTALE,
    											readOnly: true,
    											checked: true,
    											hidden: rec.sperimentale != 'T'
    										},
    										{
    											xtype: 'checkboxfield',
    											itemId: 'CkbDelPaziente', reference: 'CkbDelPaziente',
    											cls: 'cbaCssLabel',
    											inputValue: 'T',
    											uncheckedValue: 'F',
    											name: 'delPaziente',
    											boxLabel: this._TERAPIE_DEL_PAZIENTE,
    											readOnly: true,
    											checked: true,
    											hidden: rec.delPaziente != 'T'
    										}
    									]
    							    }
    							]);
    						}	
    					}	
    				}else{
    					msgShowError('',risposta.message);
    				}
    			}
    		});	
    			    					
    		if(isGridPortlet) {
    			let store= Ext.create('Ext.data.ArrayStore', {
            		fields: ['dosi', 'umList', 'ggFrequenza', 'orari']
            	});
    			
    			if(record.get('ggFrequenza')) {
    				store.add({
    					dosi: record.get('dosi'),
    					umList: record.get('umList'),
    					ggFrequenza: record.get('ggFrequenza'),
    					orari: record.get('orari')
    				});
    			}	    
    			
    			rowNode.myCnt.down('#CntDatiAgg').add([
    				{	        
    		    		xtype: 'displayfield',
    		        	labelClsExtra: 'cbaCssLabel',	        	
    		        	labelWidth: 150,
    		        	fieldLabel: this._DATA_FINE,
    		        	value: FormattaData(record.get('dataFine'), 'd/m/Y H:i')
    		    	}, {
    		    		xtype: 'displayfield',
    		        	labelClsExtra: 'cbaCssLabel',	        	
    		        	labelWidth: 150,
    		        	fieldLabel: this._TERAPIE_VIA_SOMMINISTRAZIONE,
    		        	value: record.get('desViaDiSomm')
    		    	},
    		    	Ext.create('Ext.grid.Panel', {	    		
    		    		store: store,
    		    		flex: 1,
    		    		columns: [
    						{
    							xtype: 'gridcolumn',
    							text: this._TERAPIE_QUANTITA,
    							width: 48,
    							dataIndex: 'dosi',
    							align: 'center',
    							sortable: false,
    							renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    								return StdComponentiTerapie.formattaCella(value, 'dosi');	
    							}
    						},
    						{
    							xtype: 'gridcolumn',
    							text: this._TERAPIE_UM,
    							width: 42,
    							dataIndex: 'umList',
    							align: 'center',
    							sortable: false,
    							renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    								return StdComponentiTerapie.formattaCella(value, 'umList');	
    							}
    						},
    						{
    							xtype: 'gridcolumn',
    							text: this._FREQUENZA,
    							flex: 1,
    							dataIndex: 'ggFrequenza',
    							sortable: false,
    							renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    								return StdComponentiTerapie.formattaCella(value, 'ggFrequenza');	
    							}
    						},
    						{
    							xtype: 'gridcolumn',
    							text: this._TERAPIE_ORARI,
    							width: 100,
    							align: 'center',
    							dataIndex: 'orari',
    							sortable: false,
    							renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {                            	
    								return StdComponentiTerapie.formattaCella(value, 'orari');
    							}							
    						},
    					],
    					viewConfig: {
    						loadMask: false
    					}	
    				})
    		    ]);	
    		}
    		
    		Ext.Ajax.request({
    			method: 'GET',
    			url: '/cba/css/cs/ws/terapie/farmaco/indicatori', 
    			params: {
    				aic: record.get('aic'),
    				codArticolo: record.get('codArticolo'),
    				idRicovero: CBA.moduli.modulo49.storeAnagraficaSel.getAt(0).get('idRicovero'),
    				idTerapia: record.get('id')
    			},
    			success: (response) => {
    				var risposta = Ext.JSON.decode(response.responseText);					
    				
    				if(risposta.success){
    					if(risposta.data) {
    						let tmp,
    							listAvatar= [];																					
    						
    						if(risposta.data.interazioni) {
    							tmp= StdComponentiTerapie.creaAvatar('interazioni');			
    							listAvatar.push(tmp);					
    						}
    						
    						if(risposta.data.lasa) {
    							tmp= StdComponentiTerapie.creaAvatar('lasa');		
    							listAvatar.push(tmp);					
    						}		
    						
    						if(risposta.data.doppi) {
    							tmp= StdComponentiTerapie.creaAvatar('doppi');
    							listAvatar.push(tmp);				
    						}
    						
    						if(risposta.data.allergie) {
    							tmp= StdComponentiTerapie.creaAvatar('allergie');
    							listAvatar.push(tmp);			
    						}
    						
    						if(risposta.data.classeH) {
    							tmp= StdComponentiTerapie.creaAvatar('classeH');
    							listAvatar.push(tmp);		
    						}
    						
    						if(risposta.data.storico) {
    							tmp= StdComponentiTerapie.creaAvatar('storico');
    							listAvatar.push(tmp);								
    						}
    						
    						let dataFine= record.get('dataFine');												
    						
    						cntAvatar.add(listAvatar);										        																										
    					}	
    				}else{
    					msgShowError('',risposta.message);
    				}
    			}
    		});				
    		
    		rowNode.myCnt.render(row);
    	},
    	/**
     	 *  estrapola le informazioni formattatate con la ',' in '-' (descr1, descr2, descr3)
     	 */
    	splitStr: function(str) {
     		let tmp = '';
     		if (str && str.length > 0) {
     			tmp = str.split(',').join(' - ');
     		}
     		return tmp;
     	},
     	/**
     	 *  definisce il colore terapia in base al tipo
     	 */
     	getColoreTerapia: function(tipoTerapia, backgroundColor) {
    		let tmpClass= backgroundColor ? 'cba-bgcolor-' : '';
    		
    		switch (tipoTerapia) {
    			case 'F' : return `${tmpClass}f2fdfd`; break; //base
    			case 'B' : return `${tmpClass}f2fbf1`; break; //bisogno
    			case 'S' : return `${tmpClass}fefce8`; break; //settimanale
    			case 'V' : return `${tmpClass}fff4e9`; break; //variabile
    			//mensile ??
    			case 'E' : return `${tmpClass}ffe0e0`; break; //Emergenza/Estemporanea
    			case 'P' : return `${tmpClass}fdf5fd`; break; //periodica
    		}				
    	},
    	/**
     	 *  Formattazione della cella relativa al farmaco:
     	 *  	- icone per terapie madri, figlie,
     	 *  	- avatar per terapie al bisogno / emergenza 
     	 *  	- gestione della sospsensione font italic e grigio
     	 */
    	renderCellFarmaco: function(value, record, storico) {
    		let me = this;
    		if(!Ext.isEmpty(record.get('desFarmaco'))) {																	
    			let img= '',
    				idImg= Ext.id(),
    				idBisogno= Ext.id(),
    				idEmergenza= Ext.id(),
    				grid= this,
    				idTerapiaMadre= !Ext.isEmpty(record.get('idTerapiaMadre')),
    				isTerapiaMadre= record.get('isTerapiaMadre');									
    			
    			if(idTerapiaMadre || isTerapiaMadre) {
    				
    				if (!storico) {console.log(2)
	    				img= `<img id=${idImg} style="border:0 !important; height: 20px; width: 20px; margin-right: 3px; cursor: pointer;"
    						class="${isTerapiaMadre ? 'icon-chain' : 'icon-chain-child'}"
    						src="${Ext.BLANK_IMAGE_URL}">
    					  </img>`;
    				}						
    				//Ext.defer(function () {
                	//	Ext.get(idImg).on('click', Ext.bind(this.clickImgAssociato, this, [grid, record]));
                    //}, 50);
    			}
    			
    			if(record.get('tipoTerapia') == 'B') {            											
    				Ext.defer(() => {
    					let elBisogno= Ext.get(idBisogno); 
    					
//    					if(elBisogno)
//    						this.creaAvatar('alBisogno', {height: 25, margin: 'margin-right: 3px', float: 'right'}, true).render(elBisogno, idBisogno);
                    }, 50);
            	}
    			
            	if(record.get('tipoTerapia') == 'E') {            		            	
            		Ext.defer(() => {
            			let elEmergenza= Ext.get(idEmergenza);
            			
//            			if(elEmergenza){
//            				this.creaAvatar('emergenza', {height: 25, margin: 'margin-right: 3px', float: 'right'}, true).render(elEmergenza, idEmergenza);
//            			}
                    }, 50);  
            	}	
            	
            	let styleFarmaco = '';
            	if (!storico) {
    	        	if(record.get('sospensione'))
    	        		styleFarmaco = 'color: #808080; font-style: italic; font-weight: bold;';
    	        	else styleFarmaco = 'color: #2F5F8F; font-weight: bold;'; 
            	}
            	
    			return `<div style="display: table">
    						<span style="vertical-align: middle; display: table-cell">
    							${img}
    							<span id="${idBisogno}"></span>
    							<span id="${idEmergenza}"></span>	
    						</span>	
    						<span style="${styleFarmaco} vertical-align: middle; white-space: normal; display: table-cell">
    							${value.toUpperCase()}
    						</span>												
    					</div>`;									
    		}
    		
    	},
		/**
		 *  validazione della combo unita di misura, se il farmaco non prevede l'unita di misura, 
		 *  il campo diventa obbligatorio, altrimenti in sola lettura
		 */
//		checkValidUnitaMisura: function(value, hasUnitaMisura, valFarmaco) { 
//			let valid = true;
//			if (!Ext.isEmpty(valFarmaco) && !hasUnitaMisura && Ext.isEmpty(value)) {
//				valid = false;
//			}
//			return valid || traduci('CS_CAMPO_OBBLIGATORIO')
//		},
		/**
		 *  crea una record fake nella cbox delle unita di misura, questo perche se il farmaco da PN o da PTO, ha una propria 
		 *  unita di misura devo visualizzarlo all'interno della combobox unita di misura
		 */
		setFakeValueCboxUniMis: function(cboxUniMis, uniMis) {
			
			let rec = trovaRecord(cboxUniMis.getStore(), 'codice', -99999);
			if (rec) {
				cboxUniMis.getStore().remove( rec );
			}
			cboxUniMis.getStore().add({
				codice: -99999,
				valore: uniMis
			});
			cboxUniMis.setValue(-99999);
			cboxUniMis.resetOriginalValue();
		},
		/**
		 *	se l'unita di misura del farmaco viene cambiata,  espone un messaggio, 
		 *	NB: la modifica dell'unita di misura per farmaci provenienti da PTO (catalogo articoli db economato),
		 *	indica la svorascrittura dell'unita di misura del farmaco stesso, le prossime prescrizioni proporrano la nuova 
		 *	unita di misura 
		 */
		msgChangeUniMis: function(cbox, newValue) {
			
			if (!newValue) return;
			
			let cboxFarmaco = null,
				uniMis = null;
					
			if (cbox.controllerMain) {
				cboxFarmaco = cbox.controllerMain.getCboxFarmaco();
				uniMis = cbox.controllerMain.codUniMis;
			} 

 			if (cboxFarmaco) { 
 				let rec = cboxFarmaco.getSelection();
 				if (rec && !Ext.isEmpty(rec.get('extra')) && uniMis && (uniMis !== newValue)) {
 					
 					Messaggio('ATTENZIONE', traduci('TERAPIE_MSG_CAMBIO_UNIMIS'), 'YESNO', 'WARNING', false, false, () => {
 						cbox.setValue(uniMis)
 					});
 				}
 			}
		}
    }
});
