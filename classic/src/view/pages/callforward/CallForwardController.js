Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    renderSaveRuleText: function(value, metaData) {
        return Ngcp.csc.locales.callforward.save_rule[localStorage.getItem('languageSelected')].toLowerCase();
    },

    submitForm: function(field) {
        var vm = this.getViewModel();
    },

    onEnterPressed: function(field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    },

    selectOnlineFirstRing: function(component, record) {
        var vm = this.getViewModel();
        if (record === 'Own phone') {
            vm.set('online_timeout_hidden', false);
        } else {
            vm.set('online_timeout_hidden', true);
        }
    },

    selectBusyFirstRing: function(component, record) {
        var vm = this.getViewModel();
        if (record === 'Own phone') {
            vm.set('busy_timeout_hidden', false);
        } else {
            vm.set('busy_timeout_hidden', true);
        }
    },

    selectOfflineFirstRing: function(component, record) {
        var vm = this.getViewModel();
        if (record === 'Own phone') {
            vm.set('offline_timeout_hidden', false);
        } else {
            vm.set('offline_timeout_hidden', true);
        }
    },

    toggleIconClass: function (val, meta, rec) {
        return rec.get('active') === true ? "x-fa fa-toggle-on" : "x-fa fa-toggle-off";
    },

    toggleActive: function(grid, rowIndex, colIndex, item, event, rec, row) {
        rec.set('active', !rec.get('active'));
    },

    onlineAddEmptyRow: function () {
        store = Ext.getStore('CallForwardOnline');
        storeCount = store.getCount();
        record = store.getAt(storeCount - 1);
        if (record.data.phone !== '') {
            store.add({ "phone": "", "active": false, "ring_for": "0 secs" });
        }
    },

    busyAddEmptyRow: function () {
        store = Ext.getStore('CallForwardBusy');
        storeCount = store.getCount();
        record = store.getAt(storeCount - 1);
        if (record.data.phone !== '') {
            store.add({ "phone": "", "active": false, "ring_for": "0 secs" });
        }
    },

    offlineAddEmptyRow: function () {
        store = Ext.getStore('CallForwardOffline');
        storeCount = store.getCount();
        record = store.getAt(storeCount - 1);
        if (record.data.phone !== '') {
            store.add({ "phone": "", "active": false, "ring_for": "0 secs" });
        }
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
    },

    clickAfterHoursForm: function () {
        var vm = this.getViewModel();
        vm.set('company_hours_form', true);
        vm.set('after_hours_form', false);
    },

    clickCompanyHoursForm: function () {
        var vm = this.getViewModel();
        vm.set('after_hours_form', true);
        vm.set('company_hours_form', false);
    },

    clickAlwaysHoursForm: function () {
        var vm = this.getViewModel();
        vm.set('after_hours_form', true);
        vm.set('company_hours_form', true);
    }

});
