Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        hours_form: true
    },

    stores: {
        onlineCfs: 'CallForwardOnline'
    }

});
