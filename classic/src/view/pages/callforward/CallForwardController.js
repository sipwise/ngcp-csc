Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    renderSaveRuleText: function(value, metaData) {
        return Ngcp.csc.locales.callforward.save_rule[localStorage.getItem('languageSelected')].toLowerCase();
    },

    selectFirstRing: function(component, record) {
        var vm = this.getViewModel();
        function showHideTimeoutField(timeoutField) {
            record === 'Own phone' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        if (component.getId() === 'onlineFirstDest') {
            showHideTimeoutField('online_timeout_hidden');
        } else if (component.getId() === 'busyFirstDest') {
            showHideTimeoutField('busy_timeout_hidden');
        } else if (component.getId() === 'offlineFirstDest') {
            showHideTimeoutField('offline_timeout_hidden');
        };
    },

    toggleIconClass: function (val, meta, rec) {
        return rec.get('active') === true ? "x-fa fa-toggle-on" : "x-fa fa-toggle-off";
    },

    toggleActive: function(grid, rowIndex, colIndex, item, event, rec, row) {
        rec.set('active', !rec.get('active'));
    },

    addEmptyRow: function (el) {
        var targetId = el.getTarget().id;
        function addRowToStore(store) {
            var targetStore = Ext.getStore(store);
            var record = targetStore.getAt(targetStore.getCount() - 1);
            if (record.data.phone !== '') {
                targetStore.add({ "phone": "", "active": false, "ring_for": "0 secs" });
            }
        };
        if (targetId.indexOf('onlineButton') > -1) {
            addRowToStore('CallForwardOnline');
        } else if (targetId.indexOf('busyButton') > -1) {
            addRowToStore('CallForwardBusy');
        } else if (targetId.indexOf('offlineButton') > -1) {
            addRowToStore('CallForwardOffline');
        };
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
    },

    clickTimesetButton: function (el) {
        var targetId = el.getTarget().id;
        var vm = this.getViewModel();
        vm.set('after_hours_form', true);
        vm.set('company_hours_form', true);
        if (targetId.indexOf('afterHoursButton') > -1) {
            vm.set('after_hours_form', false);
        } else if (targetId.indexOf('companyHoursButton') > -1) {
            vm.set('company_hours_form', false);
        };
    },

    editTimesetDay: function (grid, rowIndex, colIndex) {
        console.log(rowIndex);
    }

});
