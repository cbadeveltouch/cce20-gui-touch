
Ext.define('Generali.arch.testataStd.TestataStd',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.testataStd.TestataStdController'
    ],

    controller: 'generali-arch-testatastd-testatastd',
    
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
    items: [
		{
			//testata
			xtype: 'container',
			itemId: 'ContainerTestata', reference: 'ContainerTestata',
			layout:{
				type:'hbox',
				align: 'stretch',
				pack: 'center'
			},
			style:{
				'border-bottom': !Ext.is.Phone ? '1px solid #5fa2dd' : null
			},
			padding: '3px',
			flex:1,
			items:[
				{
					xtype: 'container',
					itemId: 'ContainerStorico', reference: 'ContainerStorico',
					layout:{
						type:'hbox',
						align: 'middle',
						pack: 'center'
					},
					flex: 1,
					maxWidth: 275,
					items: [
						{
							xtype: 'img',
							itemId: 'BtnLeft', reference: 'BtnLeft',
							direzione: 'sinistra',
							src: 'resources/images/back.svg',
							width: 30,
							height: 30,
							hidden: true,
							listeners:{
								tap: 'navigaButton'
							}
						},
						{
							xtype: 'container',
							itemId:'CntRegistrazioni',reference:'CntRegistrazioni',
							layout:{
								type:'hbox',
								align: 'middle',
								pack: 'center'
							},
							padding: '5px',
							margin: '0 18 0 18',
							flex: 1,
							items:[
								{
									xtype: 'datepickerfield',
									itemId:'DataTestataInsert', reference: 'DataTestataInsert',
									name: 'data',
									dateFormat : 'd/m/Y',
				                    width: 105,
				                    height: 47,
				                    margin: '0 5 0 0',
				                    hidden:true,
				                    triggers: false,
				                    listeners:{
				                    	change: 'changeData'
				                    }
								},
								{
									xtype: 'label',
									itemId: 'DataTestata', reference: 'DataTestata',
									cls: 'cbaCssLabel', 
									margin: '0 5 0 0'
								},
								{
									xtype: 'datepickerfield',
									itemId:'OraTestataInsert', reference: 'OraTestataInsert',
									dateFormat : 'H:i',
				                    width: 90,
				                    height: 47,
				                    margin: '0 5 0 0',
				                    inputType: 'time',
				                    hidden:true,
				                    triggers: false,
				                    picker: null,
				                    edgePicker: null,//TODO_PLS da sistemare per non vedere picker
				                    listeners:{
				                    	blur: function(th){

												var dataReg = th.up('#CntRegistrazioni').down('#DataTestataInsert');
												
												if(!dataReg.getValue() && th.getImputValue())
													dataReg.setValue(new Date());
												var futuro = false;
												var dataAttuale = new Date();
												var data = dataReg.getValue();
												
												if(data && th.getInputValue()){
													if(StdCba.dmyIsEqual(data)){
														if(parseInt(th.getInputValue().substr(0,2)) > dataAttuale.getHours()){
															futuro = true;
														}else if(parseInt(th.getInputValue().substr(0,2)) == dataAttuale.getHours() && 
																parseInt(th.getInputValue().substr(3,5)) > dataAttuale.getMinutes()){
															futuro = true;
														}
													}
													
													if(futuro){
														StdCba.Messaggio('ATTENZIONE', 'CS_DATA_FUTURO', 'OK', 'WARNING', function(){
															th.setInputValue(StdCba.FormattaData(new Date(), 'H:i'));
														});
													}else{
														th.up('#CntRegistrazioni').down('#OraTestata').setHtml(th.getInputValue());
													}
														
												}
										},
				                    }
								},
								{
									xtype: 'label',
									itemId: 'OraTestata', reference: 'OraTestata',
									cls: 'cbaCssLabel' 
								},
								{
									xtype:'image',
									nonDisabilitare: true,
									margin:'0 0 0 10',
									cls:'icon-info',
									itemId:'InfoScadenza',reference:'InfoScadenza',
									hidden: true
								},
							]
						},
						{
							xtype: 'img',
							itemId: 'BtnRight', reference: 'BtnRight',
							direzione: 'destra',
							src: 'resources/images/next.svg',
							width: 30,
							height: 30,
							hidden: true,
							listeners:{
								tap: 'navigaButton'
							}
						}
							
					]
				}
			]
		
		}	
	]
});
