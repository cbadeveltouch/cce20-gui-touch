Ext.define('Generali.arch.login.Login',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.login.LoginController',
        'Ext.field.Password',
        'Ext.layout.Center',
        'CbaCssView.store.enti',
        'CbaCssView.store.utente'
    ],

    controller: 'generali.arch.login.login',
    
    itemId: 'MyViewport', reference: 'MyViewport',
    layout: {
		type:'vbox',
		align: 'middle',
		pack: 'center'
	},
	flex: 1,
	items: [
		{
			xtype: 'container',
			layout:{
				type:'vbox',
				align: 'middle',
				pack: 'center'
			},
			items:[
				{
					xtype:'img',
					src: 'resources/images/logo-shortcut-cba.svg',
					width: 70,
					height: 70,
					margin: '0 0 5 0'
				}
			]
		},
		{
			xtype: 'formpanel',
			itemId: 'Form', reference: 'Form',
			layout: {
				type:'vbox',
				align: 'middle',
				pack: 'center'
			},
			padding: '10px',
			border: false,
			items: [
				{
					xtype: 'label',
					html: 'Cartella 2.0',
					style: {
					    'font-size': '30px',
				    	color: '#5fa2dd'
					},
					margin: '0 0 10 0'
				},
				{
                    xtype: 'container',
                    itemId: 'CardUser', reference: 'CardUser',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                    	{
							xtype: 'textfield',
							itemId: 'UserName' , reference:'UserName',
		                    name: 'username',
		                    placeholder: 'USERNAME',
		                    margin: '0 0 10 0'
						},
						{
							xtype: 'passwordfield',
							itemId: 'Password' , reference:'Password',
		                    name: 'password',
		                    placeholder: 'PASSWORD',
		                    margin: '0 0 10 0'
						}
                    ]
				},
				{
                    xtype: 'container',
                    itemId: 'CardEnte', reference: 'CardEnte',
                    layout: {
                    	type: 'vbox',
                        align: 'stretch'
                    },
                    width: '100%',
                    items: [
                        {
                            xtype: 'selectfield',
                            anchor: '98%',
                            itemId: 'CbEnte', reference: 'CbEnte',
                            label: 'ENTE',
                            width: Ext.is.Phone ? '95%' : 280,
                            labelAlign: 'top',
                            editable: false,
                            hidden: true,
                            displayField: 'valore',
                            queryMode: 'local',
                            valueField: 'codice',
                            margin: '5 0 5 0',
                            store: {
                            	type: 'enti'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    itemId: 'TbLogin', reference: 'TbLogin',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'label',
                            hidden: true,
                            itemId: 'LbErrore', reference: 'LbErrore',
                            text: 'ERRORE'
                        },
                        {
                            xtype: 'button',
                            itemId: 'BtnLogin', reference: 'BtnLogin',
                            text: 'LOGIN',
                            listeners:{
                            	tap: 'tapBtnLogin'
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            itemId: 'BtnEntra', reference: 'BtnEntra',
                            text: 'ENTRA',
                            listeners:{
                            	tap: 'tapBtnEntra'
                            }
                        }
                    ]
                }
			]  
		}
	]
});
