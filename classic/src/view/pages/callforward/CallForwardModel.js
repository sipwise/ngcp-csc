Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    data: {
        after_hours_form: true,
        company_hours_form: true,
        online_timeout_hidden: false,
        busy_timeout_hidden: true,
        offline_timeout_hidden: true,
        active_widget_form: '',
        row_elements_disabled: false
    }

});
