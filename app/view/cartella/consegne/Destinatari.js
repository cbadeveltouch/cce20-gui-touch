
Ext.define('CbaCssTouch.view.cartella.consegne.Destinatari',{
    extend: 'Ext.Panel',

    requires: [
        'CbaCssTouch.view.cartella.consegne.DestinatariController'
    ],

    controller: 'cartella-consegne-destinatari',
    
    items:[
    	{
    		xtype:'checkbox',
    		itemId: 'SelTutto', reference: 'SelTutto',
    		boxLabel:'Seleziona Tutte le figure professionali',
    		inputValue:'T',
    		name: 'selTutto',
    		uncheckedValue: 'F',
    		margin:'5 0 0 10'
    	},
//    	{
//    		xtype: 'container',
//    		html: '<hr>'
//    	},
    	{
    		xtype:'textfield',
    		hidden: true,
    		name: 'campoDirty',
    		itemId: 'CampoDirty', reference: 'CampoDirty',
    	},
    	{
    		xtype: 'searchfield',
    		placeholder: 'CERCA',
    		width: 250,
    		isFormField: false, 
    		itemId: 'TxtRicerca', reference: 'TxtRicerca'
    	},
    	{
    		xtype: 'tree',
    		flex: 1,
    		hideHeaders: true,
    		//border: 0,
    		//rootVisible: false,
    		//sortable: false,
    		itemId: 'TreeFigProf', reference: 'TreeFigProf',
    		store: Ext.create('CS.consegne.FigProfTree'),
    		columns: [
             	{
    	        	xtype: 'treecolumn',
    	        	dataIndex: 'text',
    	        	flex: 1,
    	        	sortable: false,
//    	        	renderer: function(value, record, dataIndex, cell, column)  {
//    	        		let icon = record.get('selected') ? 'checked' : 'check-disabled-gray',
//    	        			styleSelected = icon === 'checked' ? `font-weight:bold;` : ``,
//            				descr = `<span style="margin-right: 50px; ${styleSelected}">${value}</span>`,
//            				img = `<img style="display:block;float:right; height: 24px;" 
//            						src="/cba/generali/images/svg/others/${icon}.svg"></img>`
//    	        		return `${descr} ${img}`
//    				}
    	        },
    	        {
    	            xtype: 'checkcolumn',
    	            dataIndex: 'checked'
    	        }
            ],
    		viewConfig: {
    			loadMask: false
    		}
    	}
    ]
    
});
