
Ext.define('CS.parametri.Parametri',{
    extend: 'Ext.Container',

    requires: [
        'CS.parametri.ParametriController',
    	'CS.personalizzazioni.risposte.store.RisposteDe',
    	'CS.parametri.Avpu',
    	'CS.personalizzazioni.risposte.store.RisposteCbox',
    	'CS.consegne.Consegne',
    	'CbaUtils.componenti.all.CbaMultipleChoice',
    	'CbaCssView.store.ImpostazioniParametri',
    	'CS.parametri.TabVitali',
    	'CS.parametri.TabClinici',
    	'CS.parametri.ParametriStdController'
    ],

    controller: 'cartella-parametri-parametri',

	items: [
		{
			xtype: 'CbaForm',
            nameHolder: false,
			itemId: 'Form', reference: 'Form',
			layout:{
				type:'vbox',
				align: 'stretch'
			},
			scrollable: false,
			flex: 1,
			items:[
				{
					xtype: 'textfield',
					name: 'id',
					hidden: true
				},
				{
					xtype: 'tabpanel',
					itemId: 'TabPanel', reference: 'TabPanel',
					cls: 'cbaTabParam',
					tabBarPosition: 'top',
					width: '100%',
					flex: 1,
					items: [
						{
							title: 'PARAMETRI_VITALI',
							itemId: 'TabVitali',
							reference: 'TabVitali',
							layout: {
								type: 'vbox',
								align: 'center',
							},
							scrollable: true,
							items: [{
                                xtype: 'parametritabvitali',
                                reference: 'TabVitaliView'
							}]
						},
						{
							title: 'PARAMETRI_CLINICI',
							itemId: 'TabClinici',
							reference: 'TabClinici',
							layout: {
								type: 'vbox',
								align: 'center'
							},
							scrollable: true,
							items: [{
                                xtype: 'parametritabclinici',
                                reference: 'TabCliniciView'
							}]
						}
					]
				}
			]
		}
	]
});
