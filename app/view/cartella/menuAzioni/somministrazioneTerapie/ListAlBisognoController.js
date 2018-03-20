Ext.define('CS.menuAzioni.somministrazioneTerapie.ListAlBisognoController', {
    extend: 'CBAViewController',
    alias: 'controller.cartella-menuazioni-somministrazioneterapie-listalbisogno',
    
    tapIconaCollapse: function(th, e){
    	th.apriPanel = !th.apriPanel;
    	th.setSrc('resources/images/generali/'+ (th.apriPanel == true ? 'portlet-collapse.svg' : 'portlet-expand.svg'));
    	
    	let containerMain = th.up('#CntMainSomm'),
    		cnt = containerMain.down('#CntSomm');
    	if(!th.apriPanel){
    		containerMain.setFlex(null);
    		cnt.hide();
    	}else{
    		containerMain.setFlex(1);
    		cnt.show();
    	}
    	this.expandUltimeSomm(cnt, th.up('panel').cbaConfig.record);
    	e.stopEvent();
    },
    
    expandUltimeSomm: function(fieldset, record) {
		if(!Ext.isDefined(fieldset.firstTime)) {
			fieldset.firstTime= true;
			
			let me= this;
			
			Ext.Ajax.request({
				method: 'GET',
				url: `${CbaRootServer}`+'/cba/css/cs/ws/somm/getLastAB',
				params:{
	            	idRicovero: this.cntTe.idRicovero,
	            	idTerapia: record.get('idTerapia')				
				},
				success: (response) => {
					//se la vista è stata distrutta esco
					if(!me.view)
						return;
					
					let risposta = Ext.JSON.decode(response.responseText);
					
					if(risposta.success) {
						if(risposta.data && risposta.data.length > 0) {	
							risposta.data.forEach((rec) => {
								let dataSomm= Ext.Date.parse(rec.dataSomm, 'c'),
									giorno= StdCba.getGiorno(Ext.Date.format(dataSomm, 'w'));
							
								fieldset.add({
									xtype: 'label',
									margin: '10 0 0 0',
									html: `${giorno} ${StdCba.FormattaData(dataSomm)} ${this._ALLE_ORE} ${StdCba.FormattaOra(dataSomm)}`,									
								});
							});	
						}							
					} else {	
						StdCba.msgShowError('',risposta.message);
					}
				}
			});						
		}
	},
    
    addPanel: function(record) {
		let uniMis= record.get('desUnimis') ? record.get('desUnimis') : '',
			dose= record.get('dose') ? record.get('dose') : '',
			note= record.get('note') ? record.get('note') : '',
			desAbCondSomm= record.get('desAbCondSomm') ? record.get('desAbCondSomm') : '',
			abSoglia= record.get('abSoglia') ? record.get('abSoglia') : '',
			abIntervalloMinimo= record.get('abIntervalloMinimo') ? StdCba.FormattaOra(record.get('abIntervalloMinimo')) : '',
			abDosemax24h= record.get('abDosemax24h') ? record.get('abDosemax24h') : '';
			
		let motiviPrescrizione= record.get('motiviPrescrizione') ? record.get('motiviPrescrizione') : '';		
		
 		if (motiviPrescrizione && motiviPrescrizione.length > 0) {
 			motiviPrescrizione = motiviPrescrizione.split(',').join(' - ');
 		}
		
		let pnl= Ext.create('Ext.Panel', {		
			layout: {
				type: 'vbox',
				align: 'stretch'
			},		
			margin: 3,
			padding: 10,
			cls: 'borderPanel',
			cbaConfig:{
				record: record
			},
			items: [
				{
					xtype: 'label',
					html: `<span style="color: #2F5F8F; font-weight: bold;">${record.get('desFarmaco')}</span>`,
					margin: '0 0 5 0'
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5 0',
					items: [
						{
							xtype: 'label',
							html: `<span style="width:50%"; class="cbaCssLabel">${this._TERAPIE_QUANTITA}: </span><span>${dose}</span>`							
						},
						{
							xtype: 'container',
							flex: 1
						},
						{
							xtype: 'label',
							html: `<span class="cbaCssLabel">${this._TERAPIE_UM}: </span><span>${uniMis}</span>`
						},
						{
							xtype: 'container',
							flex: 1
						}
					]
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._TERAPIE_CONDIZIONI_SOMMINISTRAZIONE}: </span><span>${desAbCondSomm}</span>`,
					margin: '0 0 5 0'
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._TERAPIE_SOGLIA_MAX}: </span><span>${abSoglia}</span>`,
					margin: '0 0 5 0'
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._TERAPIE_INTERVALLO_TEMPO_MINIMO}: </span><span>${abIntervalloMinimo}</span>`,
					margin: '0 0 5 0',
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._TERAPIE_DOSE_MAX_24}: </span><span>${abDosemax24h}</span>`,
					margin: '0 0 5 0',
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._TERAPIE_MOTIVO_PRESCRIZIONE}: </span><span>${motiviPrescrizione}</span>`,
					margin: '0 0 5 0'
				},
				{
					xtype: 'label',
					html: `<span class="cbaCssLabel">${this._NOTE}: </span><span>${note}</span>`,
					margin: '0 0 5 0'	
				},
				{
					xtype:'container',
					itemId:'CntMainSomm',reference:'CntMainSomm',
					layout:{
						type:'vbox',
						align:'stretch'
					},
					margin:'10 0 10 0',
					width: '100%',
					items:[
						{
							xtype: 'container',
							layout:{
								type:'hbox',
								align: 'center',       
							},
							items: [
								{
									xtype:'container',
									layout:{
										type:'hbox',
									},
									cls: 'headerFormSchede',
									width:Ext.is.Phone ? '90%' : 600,
									padding: '3px',
									items:[
										{
											xtype:'container',
											layout:{
												type:'hbox',
												align: 'begin ',
												pack: 'center'
											},
											width: '90%',
											items:[
												{
													xtype:'label',
													cbahtml: this._TERAPIE_ULTIME_SOMMINISTRAZIONI,
													height:20,
													cls:'cbaCssLabelTitolo',
													margin:'0 0 0 8',
													width: '100%',
													listeners:{
														painted: function(th){
															/*Identifico quando la string va a capo*/
															if(th.innerHtmlElement.dom.clientHeight > 30)
																th.setHeight(45)
														}
													}
												}		
											]
										},
										{
											xtype:'image',
											src: 'resources/images/generali/portlet-expand.svg',
											layout:{
												type:'hbox',
												align:'center',
												pack:'end'
											},
											apriPanel: false,
											flex:1,
											listeners:{
												tap:'tapIconaCollapse'
											}
										}
									]
								}
							]
						},
						{
							xtype:'container',
							itemId:'CntSomm',reference:'CntSomm',
							padding: 5,
							hidden: true,
							layout:{
								type:'vbox',
								align:'stretch'
							},
							flex:1
						}
					]
				},
//				{
//					xtype: 'fieldset',
//					flex: 1,
//					title: this._TERAPIE_ULTIME_SOMMINISTRAZIONI,
//					collapsible: true,
//					collapsed: true,
//					layout: 'vbox',
//					listeners: {
//						expand: (th) => {
//							this.expandUltimeSomm(th, record)
//						},
//						painted: (th) => {
//							th.el.on('tap', (th) => {
//								th.stopEvent();
//							})
//						}
//					}
//				}
			]			
		});
		
		pnl.on('painted', (th) => {
			th.el.on('tap', () => {
				this.cntTe.addTerapia(record);
			});						
		});
		
		this.lookupReference('List').add(pnl);
	},
	
	traduzioni: function(){
		this._NOTE= StdCba.traduci('NOTE');
		this._TERAPIE_ULTIME_SOMMINISTRAZIONI= StdCba.traduci('TERAPIE_ULTIME_SOMMINISTRAZIONI');
		this._ALLE_ORE= StdCba.traduci('ALLE_ORE').toLowerCase();
		this._TERAPIE_UM= StdCba.traduci('TERAPIE_UM').toLowerCase();
		this._TERAPIE_QUANTITA= StdCba.traduci('TERAPIE_QUANTITA').toLowerCase();
		this._TERAPIE_MOTIVO_PRESCRIZIONE= StdCba.traduci('TERAPIE_MOTIVO_PRESCRIZIONE');
		this._TERAPIE_CONDIZIONI_SOMMINISTRAZIONE= StdCba.traduci('TERAPIE_CONDIZIONI_SOMMINISTRAZIONE');
		this._TERAPIE_SOGLIA_MAX= StdCba.traduci('TERAPIE_SOGLIA_MAX');
		this._TERAPIE_INTERVALLO_TEMPO_MINIMO= StdCba.traduci('TERAPIE_INTERVALLO_TEMPO_MINIMO');
		this._TERAPIE_DOSE_MAX_24= StdCba.traduci('TERAPIE_DOSE_MAX_24');
	},
	
	init: function(){	
		this.callParent(arguments);
		
		this.cntTe= this.cbaConfig.controllerForm;
		this.cntTe.cbaConfig.controllerListAlBisogno = this;
		this.traduzioni();
		this.store= Ext.create('Ext.data.Store', {			
			fields: [
				{name: 'idSomm'},
				{name: 'esito'},
				{name: 'desEsito'}
			],
			proxy: {
				type: 'ajax',
				method:'GET',
				url: `${CbaRootServer}`+'/cba/css/cs/ws/somm/getAB',				
				reader: {
					type: 'json',
					messageProperty: 'message',
					rootProperty: 'data'
				}
			},				
			autoDestroy: true,
			autoLoad: false
		});
		
		this.store.load({
            params:{
            	idRicovero: this.cntTe.idRicovero,
            	dataInizio: this.cntTe.dataInizio,
            	dataFine: this.cntTe.dataFine				
            },
            callback: (records,operation,success) => {
        		if(success && records.length > 0){
        			records.forEach((record) => {
            			this.addPanel(record);
            		});	
				} else {	
					StdCba.msgShowError('', operation.getError());
				}
    		}	
        });    	    	
	},
	
	destroy: function(){
		StdCba.eliminaStore(this.store);
	    this.callParent();
	}

});
