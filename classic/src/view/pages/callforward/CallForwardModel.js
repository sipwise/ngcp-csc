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
        offline_first_timeout_hidden: true,
        online_then_timeout_hidden: false,
        busy_then_timeout_hidden: false,
        offline_then_timeout_hidden: false,
        online_add_new_then_hidden: true,
        busy_add_new_then_hidden: true,
        offline_add_new_then_hidden: true,
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
        source_lista_title: 'List A',
        source_listb_title: 'List B',
        hide_lista_titleField: true,
        hide_listb_titleField: true
    },

    formulas: {
        panelIsCollapsed: function (get) {
            var store = Ext.getStore('CallForwardLocalStorage');
            // If local storage object afterHoursCollapsed does not exist, we
            // return false and write false default value to local storage
            if (!store.findRecord('afterHoursCollapsed', false) && !store.findRecord('afterHoursCollapsed', true)) {
                store.add({afterHoursCollapsed: false});
                store.sync();
                return false;
            }
            // If local storage value object with afterHoursCollapsed and
            // true exists, we return true
            if (store.findRecord('afterHoursCollapsed', true)) {
                return true;
            }
        }
    }

});
