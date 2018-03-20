//PARAMS in itemsCfg:
//html:   la label contenuta nel cerchio
//cls:   classe di base del campo
//checkedClsPerson:  classe di stato checkato
//style:   da utilizzare SOLO se diverso da default (utile se bisogna rimpicciolire il testo con label lunghe)
//isFormField:   da utilizzare se il campo deve essere visibile nel record della form
//inputValue:   da utilizzare ad ex. se il campo è esclusivo
Ext.define('CbaUtils.componenti.all.CbaMultipleChoice', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.cbaMultipleChoice',
	alternateClassName: 'cbaMultipleChoice',
	layout:{
		type: 'hbox',
		align: 'stretch',
		pack: 'center'
	},
	cls: 'no-borderPadding',
	margin: 0,
	items:[
		
	],
	
	initialize: function() {
		var me = this,
			idCalc;
		this.items = [];
		
		Ext.each( me.cbaConfig.itemsCfg, function(i) {
			idCalc = i.itemId ? i.itemId : null;
			
			var cnt = Ext.create('Ext.Container', {
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				width: i.labelWidth ? null : '100%',
				flex: i.labelWidth ? null : 1
			});
			let testo = StdCba.traduci(i.html);
			var items = [
				{

					xtype: 'container',
					itemId: 'MultipleChoiceCheck', reference : 'MultipleChoiceCheck',
					layout: {
						type: 'vbox',
						align: i.layout ? i.layout.align : 'stretch'
					},
					margin: '5 0 0 0',
					width: i.width || 40,
					height: i.height || 40,
					margin: i.margin || 5,
					html: testo,
					cls: i.cls ? ( i.cls + ' disable-select-text-highlight' ) : 'choice-round-unchecked disable-select-text-highlight',
					style: i.style,
					flex: i.flex,
					items: [
				        {
							xtype: 'checkboxfield',
							itemId: idCalc, reference: idCalc,
							//name: i.name,
							hidden: true,
							value: i.value,
							isFormField: me.cbaConfig.esclusivo ? false : i.isFormField,
							id: Ext.id(),
							inputValue: Ext.isEmpty(i.inputValue) ? true : i.inputValue,
							cbaInputValue: Ext.isEmpty(i.cbaInputValue) ? true : i.cbaInputValue,
							//uncheckedValue: i.uncheckedValue || false,
							cbaConfig: {
								checkedClsPerson: i.checkedClsPerson,
								extra: i.extra
							}
						}
				    ]
				}
			];
			
			//imposto la label del cbaMultipleChoice 
			if (!Ext.isEmpty(i.label)) {
				if(!i.labelWidth)
					me.setWidth('100%');
//				else
//					me.setFlex(1);
				
				let traduzione = StdCba.traduci(i.label);
				
				var label = {
						xtype: 'label',
						cbahtml: traduzione,
						width: i.labelWidth ? i.labelWidth : '90%',
						margin: i.labelMargin || '10 0 0 7', //possibile passare un margine personalizzato alla label 
						listeners:{
							painted: function(th){
								/*Identifico quando la string va a capo*/
								if(th.innerHtmlElement.dom.clientHeight > 30)
									th.setMargin('0 0 10 5')
							}
						}
					};
			}
			
			
			if(i.labelAlign == 'left'){
				label.width = '100px';
				!Ext.isEmpty(i.label) ? cnt.add(label) : null;
				cnt.add(items);
			}else{
				cnt.add(items);
				!Ext.isEmpty(i.label) ? cnt.add(label) : null;
			}
				
			
			//imposto la label del cbaMultipleChoice 
//			if (!Ext.isEmpty(i.label)) {
//				if(!i.labelWidth)
//					me.setWidth('100%');
////				else
////					me.setFlex(1);
//				
//				let traduzione = StdCba.traduci(i.label);
//				cnt.add(
//					{
//						xtype: 'label',
//						cbahtml: traduzione,
//						width: i.labelWidth ? i.labelWidth : '90%',
//						margin: i.labelMargin || '10 0 0 7', //possibile passare un margine personalizzato alla label 
//						listeners:{
//							painted: function(th){
//								/*Identifico quando la string va a capo*/
//								if(th.innerHtmlElement.dom.clientHeight > 30)
//									th.setMargin('0 0 10 5')
//							}
//						}
//					}
//				)
//			} 
			
			
			//me.items.push( cnt );
			me.add(cnt)
			
		});
		
		var itemZero = me.cbaConfig.itemsCfg[0];
		if( me.cbaConfig.esclusivo && itemZero.isFormField ) {
			var fakeCheckbox = Ext.create('Ext.Container', {
				itemId: 'FakeCheck',
				hidden: true,
				items: [
			        {
			        	xtype: 'textfield',
						name: itemZero.name,
						isFormField: true,
						width: 32,
						value: null,
						listeners: {
							change: function( th, newValue, oldValue, eOpts ) {
								if(th.cbaConfig.suspendChange)
									return false;
								
								if( !th.cbaConfig.changeFromCheck ) {
									th.cbaConfig.changeFromText = true;
									var cmp = th.up('cbaMultipleChoice'),
										cks = cmp.query('checkboxfield');								
									Ext.each( cks, function(ck) {
										if( !Ext.isEmpty(newValue)) {
											ck.setValue( ck.cbaInputValue == newValue );
										} else {
											ck.setValue(false);
										}
									});
									th.cbaConfig.changeFromText = false;
								}
																
								me.fireEvent('choicechange', th, newValue, oldValue);
							}
						}
			        }
		        ]				
			});
			//me.items.push(fakeCheckbox);
			me.add(fakeCheckbox)
			me.cbaConfig.fakeCheckbox = fakeCheckbox.down('textfield');
		}
		
		this.callParent(arguments);
	},
	listeners: {
		initialize: function(th) {
				var me = this,
				cntFake = th,
				esclusivo = th.cbaConfig.esclusivo,
				fakeCnt,
				fakeCheckbox = cntFake.query('checkboxfield');
				
			Ext.each( fakeCheckbox, function( ck ) {
				fakeCnt = ck.up('container');
				
				fakeCnt.el.on( 'tap', function() {
					if( ck.isDisabled() || ck.readOnly )
						return false;
					this.tap = true;
					if( esclusivo ) {
						if( ck.getValue() && !ck.up('cbaMultipleChoice').cbaConfig.deselezionabile )
							return false;
						
						//Si azzerano valori
						Ext.each( fakeCheckbox, function(cks) {
							if( cks.getId() != ck.getId() ) {
								cks.cbaConfig.onResetValue = true;
								cks.setValue(false);
								cks.cbaConfig.onResetValue = false;
							}
						});
					}
					ck.setValue(!ck.getValue());
				});
				
				ck.on( 'change', function( checkbox, newValue ,oldValue) {
					if( checkbox.cbaConfig.onResetValue || checkbox.getReadOnly() == true)
						return false;
					var cPerson = checkbox.cbaConfig.checkedClsPerson,
						cClass = cPerson ? cPerson : 'choice-checked';	//TODO da gestire classe standard in base al tema
					
					if( newValue ) {
						checkbox.up('container').addCls( cClass );
					} else	checkbox.up('container').removeCls( cClass );
															
					if( th.cbaConfig.esclusivo ) {						
						var currentValue = null;						
						Ext.each( fakeCheckbox, function(fkck) {
							if( fkck.getValue() && ( fkck.cbaInputValue == checkbox.cbaInputValue ) )
								currentValue = fkck.cbaInputValue;
							if( fkck.getId() != checkbox.getId() ) {
								fkck.up('container').removeCls( fkck.cbaConfig.checkedClsPerson || 'choice-checked' );	//TODO da gestire classe standard in base al tema
								fkck.cbaConfig.onResetValue = true;
								fkck.setValue(false);
								fkck.cbaConfig.onResetValue = false;
							}
						});
						if( !checkbox.cbaConfig.onResetValue &&
								th.cbaConfig.fakeCheckbox &&
									!th.cbaConfig.fakeCheckbox.cbaConfig.changeFromText ) {
							th.cbaConfig.fakeCheckbox.cbaConfig.changeFromCheck = true;
							th.cbaConfig.fakeCheckbox.setValue(currentValue);
							th.cbaConfig.fakeCheckbox.cbaConfig.changeFromCheck = false;
						}
					}
				});
				
				var valCk = ck.getValue();
				if( valCk ) {
					ck.cbaConfig.onResetValue = true;
					ck.setValue(!valCk);	//bisogna prima azzerare il campo
					ck.cbaConfig.onResetValue = false;
					ck.setValue(valCk);
				}
			});
			
		}
	},
	setValueExclusive: function(val) {
		var fk = this.cbaConfig.fakeCheckbox;
		if( this.cbaConfig.esclusivo && fk ) {
			var listaCheck = this.query('checkboxfield');
			Ext.each( listaCheck, function(cks) {				
				if(!Ext.isEmpty(val) ) {
					if( val == cks.cbaInputValue ) { /*era cks._inputValue: ma viene resettato a false quindi uso l'originalValue*/
						cks.setValue(true);
					} else {
						if( cks.getValue() ) {
							cks.cbaConfig.onResetValue = true;
							cks.setValue(false);
							cks.cbaConfig.onResetValue = false;
						}else cks.setValue(false);
					}						
				} else {
					cks.setValue(false);
				}
			});
		}
	},
	getValueExclusive: function() {
		return this.cbaConfig.esclusivo && this.cbaConfig.fakeCheckbox ? this.cbaConfig.fakeCheckbox.getValue() : null;
	},
	
});