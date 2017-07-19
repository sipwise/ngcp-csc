Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callforward',

    // left inline as non-Api data
    data: {
        after_hours: true,
        company_hours: true,
        online_first_timeout_hidden: false,
        busy_first_timeout_hidden: true,
        offline_first_timeout_hidden: true,
        online_then_timeout_hidden: false,
        busy_then_timeout_hidden: false,
        offline_then_timeout_hidden: false,
        online_add_new_then_hidden: true,
        busy_add_new_then_hidden: true,
        offline_add_new_then_hidden: true,
        online_add_button_hidden: false,
        busy_add_button_hidden: false,
        offline_add_button_hidden: false,
        online_cancel_button_hidden: true,
        busy_cancel_button_hidden: true,
        offline_cancel_button_hidden: true,
        selected_timeset: 'always',
        selected_sourceset: 'everybody',
        online_then_dest: 'Number',
        online_then_number: '',
        online_then_timeout: '10',
        busy_then_dest: 'Number',
        busy_then_number: '',
        busy_then_timeout: '10',
        offline_then_dest: 'Number',
        offline_then_number: '',
        offline_then_timeout: '10',
        after_hours_exists_in_api: false,
        company_hours_exists_in_api: false
    },

    formulas: {
        afterPanelIsCollapsed: function (get) {
            var store = Ext.getStore('CallForwardLocalStorage');
            var localStorageRecord = store.getAt(0);
            if (store.getRange().length < 1) {
                store.add({afterHoursCollapsed: false, companyHoursCollapsed: false});
                store.sync();
                return false;
            } else {
                var currentState = localStorageRecord.get('afterHoursCollapsed');
                return currentState;
            }
        },
        companyPanelIsCollapsed: function (get) {
            var store = Ext.getStore('CallForwardLocalStorage');
            var localStorageRecord = store.getAt(0);
            if (store.getRange().length < 1) {
                store.add({afterHoursCollapsed: false, companyHoursCollapsed: false});
                store.sync();
                return false;
            } else {
                var currentState = localStorageRecord.get('companyHoursCollapsed');
                return currentState;
            }
        }
    }

});
