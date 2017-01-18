Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        after_hours: true,
        company_hours: true,
        list_a: true,
        list_b: true,
        online_timeout_hidden: false,
        busy_timeout_hidden: true,
        offline_timeout_hidden: true,
        active_widget: '',
        row_elements_disabled: false
    }

});
