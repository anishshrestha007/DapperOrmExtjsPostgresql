/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('demoapp.Application', {
    extend: 'Ext.app.Application',

    name: 'demoapp',
    requires: [
        'Ext.panel.Panel'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    init: function function_name(argument) {
        Ext.enableAriaPanels = false;
    },
    launch: function() {
        // TODO - Launch the application
    },
    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});