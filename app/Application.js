/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('CbaCssTouch.Application', {
    extend: 'Ext.app.Application',

    name: 'CbaCssTouch',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    viewport: {
        nameHolder: false
    },

    launch: function () {
		// Destroy the #appLoadingIndicator element
        var ali = Ext.fly('appLoadingIndicator');
        if(ali) ali.destroy();
		
		Ext.Loader.setPath({
			'Generali': 'app/view/generali',
			'CS': 'app/view/cartella',
			'CbaUtils': 'app/view/cba-utils',
			'CbaCssView': 'app/view'
		});
		
		Ext.define('CbaUtils.all.Base', {
        	override: 'Ext.Base',
        	initConfig: function(config) {
        		this.callParent([config]);
        		this.cbaConfig = this.cbaConfig || {};
        		return this;
        	}
        });
		
		
		Ext.require('CbaCssTouch.view.generali.arch.mainApp.MainApp');
		StdCba.initLaunchApp();
		
    }
});
