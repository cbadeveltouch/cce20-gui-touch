
Ext.define('CS.schede.standard.provvedimenti.TabProvvedimentiPanel',{
    extend: 'Ext.Container',

    requires: [
        'CS.schede.standard.provvedimenti.TabProvvedimentiPanelController'
    ],

    controller: 'cartella-schede-standard-provvedimenti-tabprovvedimentipanel',
    
    items:[
    	{
    		xtype: 'container',
    		itemId: 'CntProvv', reference: 'CntProvv',
    		layout:{
    			type: 'vbox',
    			align: 'stretch'
    		},
    		cls:'cbaBorderPanel',
			margin: '0 0 16 0',
			style:{
				border: 'solid 1px #2f5f8f'
			},
			height: 250,
			width: '97%',
			padding: 10,
    		items:[
    			{
					xtype: 'textfield',
					itemId: 'TextfieldID', reference: 'TextfieldID',
//					name: 'id',
					hidden: true
			   },
			   {
	   	        	xtype: 'container',
	   	        	itemId: 'HeaderPannello', reference: 'HeaderPannello',
	   	        	layout: {
	   	        		type: 'hbox',
	   	        		align: 'stretch'
	   	        	},
	   	        	style:{
	   					'border-bottom': 'solid 0.1px #2f5f8f'
	   				},
	   				padding: '5px',
	   	        	width: '100%',
						items:[
							{
								xtype: 'container',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								padding: 5,
								flex:1,
								items:[
									{
										xtype: 'textfield',
										itemId: 'CompilatoreID', reference: 'CompilatoreID',
//										name: 'compilatore',
										hidden: true
									},
	                                {
	                                    xtype: 'label',
	                                    itemId: 'DataCompilatore', reference: 'DataCompilatore',
	                                    margin: '0 0 0 5',
//	                                    name: 'dataOra'
	                                },
	                                {
	                                	xtype: 'spacer'
	                                },
	                                {
	                                    xtype: 'label',
	                                    itemId: 'LabelCompilatore', reference: 'LabelCompilatore',
	                                    margin: '0 0 0 5',
//	                                    name: 'compilatoreNominativo'
	                                },   
						        ]
		    	        },
						{
				        	 xtype: 'image',
							 itemId: 'BtnMenu', reference: 'BtnMenu',
							 src: 'resources/images/generali/menuConsegne.svg',
							 cls: 'css-nero',
							 maxHeight: 35,
							 maxWidth: 35,
							 height: 35,
							 width: 35,
							 flex: 1,
							 listeners:{
								 tap: 'tapBtnMenu'
							 }
				        }, 
       	        ]
			   },
			   {
				   xtype: 'container',
				   layout:{
					   type: 'vbox',
					   align: 'stretch'
				   },
				   margin: '10 0 10 0',
				   items:[
					   {
						   xtype: 'label',
						   html: StdCba.traduci('PROVVEDIMENTI') + ':',
						   margin: '0 0 10 0',
						   cls: 'labelStrong'
					   },
					   {
						   xtype: 'container',
						   itemId: 'Provvedimenti', reference: 'Provvedimenti'
					   }
				   ]
			   },
			   {
				   xtype: 'container',
				   layout:{
					   type: 'vbox',
					   align: 'stretch'
				   },
				   margin: '10 0 0 0',
				   items:[
					   {
						   xtype: 'label',
						   html: StdCba.traduci('NOTE') + ':',
						   margin: '0 0 10 0',
						   cls: 'labelStrong'
					   },
					   {
						   xtype: 'label',
						   itemId: 'LabelNote', reference: 'LabelNote'
					   }
				   ]
			   }
    		]
    	}
    ]
});
