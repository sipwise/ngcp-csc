Ext.define('NgcpCsc.view.pages.summary.SummaryController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.summary',

    showAllCalls: function() {
        this.redirectTo('#callist');
    },

    showAllVoicemails: function() {
        this.redirectTo('#voicebox');
    },

    showSettings: function() {
        this.redirectTo('#reminder');
    },

    showCallForward: function() {
        this.redirectTo('#callforward');
    }
});
