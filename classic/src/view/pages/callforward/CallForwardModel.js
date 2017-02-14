Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        after_hours: true,
        company_hours: true,
        list_a: true,
        list_b: true,
        online_first_timeout_hidden: false,
        busy_first_timeout_hidden: true,
        online_first_timeout_hidden: true,
        busy_first_timeout_hidden: true,
        offline_first_timeout_hidden: true,
        active_widget: '',
        row_elements_disabled: false,
        selected_timeset: 'always',
        selected_sourceset: 'everybody'
    }

});
