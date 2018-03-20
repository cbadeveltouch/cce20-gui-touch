/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('CbaCssTouch.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    requires: [
    ],

    controller: 'main',

    config: {
		itemId: 'ContainerMain',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		flex: 1,
		listeners: {
			initialize: function(th) {
				Ext.CbaCssTouch = {
					ContainerMain: th
				};
			}
		}
    }
});
