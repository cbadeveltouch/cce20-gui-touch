/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'CbaCssTouch.Application',

    name: 'CbaCssTouch',

    requires: [
        // This will automatically load all classes in the CbaCssTouch namespace
        // so that application classes do not need to require each other.
        'CbaCssTouch.view.main.Main'
    ],

    // The name of the initial view to create.
    mainView: 'CbaCssTouch.view.main.Main'
});
