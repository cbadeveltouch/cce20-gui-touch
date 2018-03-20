
Ext.define('CS.menuAzioni.rilevazioneAttivita.sommAttivitaMain.SommAttivitaMain',{
    extend: 'Ext.Container',

    requires: [
        'CS.menuAzioni.rilevazioneAttivita.sommAttivitaMain.SommAttivitaMainController',
        'Ext.dataview.listswiper.ListSwiper',
        'Generali.arch.listaUtenti.ListaUtentiModel',
        'Generali.arch.listaUtenti.ListaUtentiStore',
        'CS.personalizzazioni.risposte.store.RisposteDe',
        'CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.DettSommAttivita'
    ],

    controller: 'cartella-menuazioni-rilevazioneattivita-sommattivitamain-sommattivitamain',
    
    requires: [
        'Ext.dataview.listswiper.ListSwiper'
    ],
    
    layout:{
    	type:'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'CbaForm',
			itemId: 'Form', reference: 'Form',
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			scrollable: false,
			style:{
				padding: '0px !important'
			},
			flex: 1,
			items:[
				{
		    		xtype: 'list',
		    		itemId: 'ListOspiti', reference: 'ListOspiti',
		    	    itemTpl: '<div style= "width: 100%" class= "cbaCssLabel">{nominativo}</div>',
		    	    store: {
		    			type: 'listaUtenti',
		    		},
		    	    itemConfig: {
		    	        height: 50
		    	    },
		    	    itemContentCls: 'cbaInnerList',
		    	    listeners:{
		    	    	select: 'selectOspite'
		    	    },
		    	    flex:1,
		    	    plugins: {
		    	        listswiper: {
		    	            defaults: {
		    	                width: 48
		    	            },

		    	            right: [{
		    	                iconCls: 'icon-dislike-css',
		    	                undoable: true,
//		    	                ui: 'alt decline',
		    	                commit: 'onDislike'
		    	            }, {
		    	                iconCls: 'icon-denied-css ',
//		    	                ui: 'alt action',
		    	                commit: 'onDenied',
		    	                undoable: true
		    	            }, {
		    	                iconCls: 'icon-like-css',
//		    	                ui: 'alt confirm',

//		    	                precommit: 'onDeleteItem',
		    	                commit: 'onLike',
		    	            }]
		    	        }
		    	    }
		    	
				}
			]
    	}
	]
});
