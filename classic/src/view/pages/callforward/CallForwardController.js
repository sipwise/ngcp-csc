Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    clickMdCard: function(view, record, item, rowIndex, e, eOpts) {
        // TODO: Upon click, redirect to right view
        // with if statement record.getName()
        this.redirectTo('#callforward-always');
    }

});
