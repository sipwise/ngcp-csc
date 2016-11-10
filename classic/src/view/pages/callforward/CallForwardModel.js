Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        after_hours_form: true,
        company_hours_form: true
    },

    stores: {
        onlineCfs: 'CallForwardOnline',
        busyCfs: 'CallForwardBusy',
        offlineCfs: 'CallForwardOffline'
    }

});
