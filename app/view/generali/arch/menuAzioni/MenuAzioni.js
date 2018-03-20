Ext.define('Generali.arch.menuAzioni.MenuAzioni',{
    extend: 'Ext.Container',

    requires: [
        'Generali.arch.menuAzioni.MenuAzioniController',
        'CS.menuAzioni.parametriDiariMenu.ParametriDiariMenu',
        'CS.menuAzioni.rilevazioneAttivita.listaAttivita.ListaAttivita',
        'CS.menuAzioni.somministrazioneTerapie.SomministrazioneTerapie'
    ],

    controller: 'generali.arch.menuazioni.menuazioni',
	
	itemId: 'ContainerMenu', reference: 'ContainerMenu',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	flex: 1,
	items: [
		{
			xtype: 'container',
			layout:{
				type: 'hbox',
				align:'middle',
				pack: 'center'
			},
			width: '100%',
			height: 50,
			margin: 5,
			items:[
				{
					xtype:'img',
					itemId: 'BtnHome', reference: 'BtnHome',
					cls: 'cbaBackHomeIcon',
					width: 40,
					height: 40,
	                margin: '0 10 0 0',
	                left: 5,
	                listeners: {
	                	tap: 'tapBtnHome'
	                }
				},
				{
					xtype: 'label',
					html: StdCba.traduci('MENU_AZIONI'),
					cls: 'cbaLabelTitolo'
				}
			]
		},
		{
			xtype: 'panel',
			itemId: 'PanelDiario', reference: 'PanelDiario',
			title: 'DIARI/PARAMETRI',
			iconCls: 'cbaDiariIcon',
			cls: 'cbaPanelCollapsed',
			width: '100%',
			margin: '20 0 0 0',
			collapsed: true,
			collapsible: {
		        direction: 'top',
		        dynamic: true
		    },
			tools: [
				{
		        	 type: 'search',
	        		 handler: 'searchDiario'
		        }
			 ],
			 items:[
				  {
					  xtype:'label',
					  itemId: 'ContenutoDari', reference: 'ContenutoDiari',
					  html: 'ciao'
				  }
			 ]
		},
		{
			xtype: 'panel',
			itemId: 'PanelRilevazioneAttivita', reference: 'PanelRilevazioneAttivita',
			title: 'RILEVAZIONE_ATTIVITA',
			iconCls: 'cbaAttivitaIcon',
			width: '100%',
			cls: 'cbaPanelCollapsed',
			collapsed: true,
			collapsible: {
		        direction: 'top',
		        dynamic: true
		    },
			tools: [
				{
		        	 type: 'search',
	        		 handler: 'searchAttivita'
		        }
			 ]
		},
		{
			xtype: 'panel',
			itemId: 'PanelTerapie', reference: 'PanelTerapie',
			title: 'TERAPIE',
			iconCls: 'cbaTerapieIcon',
			width: '100%',
			cls: 'cbaPanelCollapsed',
			collapsed: true,
			collapsible: {
		        direction: 'top',
		        dynamic: true
		    },
			tools: [
				{
		        	 type: 'search',
	        		 handler: 'searchTerapie'
		        }
			 ]
		}
	]
});
