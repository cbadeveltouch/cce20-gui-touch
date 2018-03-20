Ext.define('Ext.layout.Fluid', {
    extend: 'Ext.layout.Box',
    alias: 'layout.fluid',
    setContainer: function(container) {
        this.callSuper(arguments);
        container.innerElement.replaceCls('x-horizontal', 'x-horizontal-fluid');
    }
});

Ext.define('Generali.arch.panelPortlet.PanelPortlet',{
    extend: 'Ext.Panel',

    requires: [
        'Generali.arch.panelPortlet.PanelPortletController',
        
        'CS.schede.schede.spmsq.Spmsq',
        'CS.schede.schede.cgi.Cgii',
        'CS.schede.schede.mhct.Mhct',
        'CS.schede.schede.nrsvrsvas.NrsVrsVas',
        'CS.schede.schede.kane.Kane',
        'CS.schede.schede.Tinetti.Tinetti',
        'CS.schede.schede.mmse.Mmse',
        'CS.schede.schedeModulari.domande.Domande',
        'CS.schede.schede.nortonexton.NortonExton',
        'CS.schede.schede.gds.Gds',
        'CS.schede.schede.cgi.Cgi',
        'CS.schede.schede.noppain.Noppain',
        'CS.schede.schede.morse.Morse'
    ],

    controller: 'generali-arch-panelportlet-panelportlet',
    
    itemId: 'PanelPortlet', reference: 'PanelPortlet',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	width: '80%',
	height: '65%',
	top: '15%',
	left: '10%',
	floated: true,
    modal: true,
    hideOnMaskTap: true,
    closeAction: 'hide',
    cls: 'cbaPanelArrotondato',
    items: [
    	{
			xtype: 'panel',
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			margin: '5 0 0 5',
			height: 43,
			items:[
				{
		    		xtype: 'container',
		    		itemId: 'CntImgSearch', reference: 'CntImgSearch',
		    		layout:{
		    			type:'hbox',
		    			align: 'center',
		    			pack: 'center'
		    		},
//		    		padding: 10,
		    		width: 40,
					height: 40,
					cls: 'borderSearch',
		    		items:[
		    			{
		    	    		xtype: 'img',
		    				src: 'resources/images/generali/search.svg',
		    				width: 25,
		    				height: 25,
		    				listeners:{
		    					tap: 'tapBtnSearch'
		    				}
		    	    	}
		    		]
		    	},
		    	{
		    		xtype: 'container',
		    		itemId: 'Search', reference: 'Search',
		    		layout:{
		    			type: 'vbox',
		    			align: 'center',
		    			pack: 'center'
		    		},
		    		hidden: true,
		    		items:[
		    			{
		    	    		xtype: 'searchfield',
		    	    		width: Ext.is.Phone ? '60%' : 250,
		    				listeners:{
								change: 'changeRicercaFunzione',
								focusleave: 'focusLeaveSearch'
							}
		    	    	}
		    		]
		    	},
			]
		},
		{
			xtype: 'panel',
			itemId: 'MainContainer', reference: 'MainContainer',
			layout: {
				type: 'vbox',
				align: 'stretch',
			},
			flex: 1
		}
	]
});
