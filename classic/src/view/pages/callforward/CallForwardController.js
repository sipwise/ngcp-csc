Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

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

    checkIndex: function(button, target) {
        return (target.indexOf(button) > -1) === true ? true : false;
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
        if (this.checkIndex('onlineButton', targetId)) {
            addRowToStore('CallForwardOnline');
        } else if (this.checkIndex('busyButton', targetId)) {
            addRowToStore('CallForwardBusy');
        } else if (this.checkIndex('offlineButton', targetId)) {
            addRowToStore('CallForwardOffline');
        } else if (this.checkIndex('addListAButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-a-grid');
            addRowToStore(grid.getStore());
        } else if (this.checkIndex('addListBButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-b-grid');
            addRowToStore(grid.getStore());
        };
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
    },

    changeWidget: function (el, target, vm) {
        vm.set('after_hours', true);
        vm.set('company_hours', true);
        vm.set('list_a', true);
        vm.set('list_b', true);
        if (this.checkIndex('afterHoursButton-btnIconEl', target)) {
            vm.set('active_widget', Ngcp.csc.locales.callforward.after_hours[localStorage.getItem('languageSelected')]);
            vm.set('after_hours', false);
        } else if (this.checkIndex('companyHoursButton-btnIconEl', target)) {
            vm.set('active_widget', Ngcp.csc.locales.callforward.company_hours[localStorage.getItem('languageSelected')]);
            vm.set('company_hours', false);
        } else if (this.checkIndex('listAButton-btnIconEl', target)) {
            vm.set('active_widget', Ngcp.csc.locales.callforward.list_a[localStorage.getItem('languageSelected')]);
            vm.set('list_a', false);
        } else if (this.checkIndex('listBButton-btnIconEl', target)) {
            vm.set('active_widget', Ngcp.csc.locales.callforward.list_b[localStorage.getItem('languageSelected')]);
            vm.set('list_b', false);
        };

    },

    clickSegmentedButton: function (el) {
        var targetId = el.getTarget().id;
        var vm = this.getViewModel();
        this.changeWidget(el, targetId, vm);
        var storesArray = ['CallForwardOnline', 'CallForwardBusy', 'CallForwardOnline']; // should we hardcode like this, and should we store names or actual stores?
        Ext.Ajax.request({
            url: '/resources/data/cfCombinations.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var records = obj.data[0];
                // TODO: Loop over the storesArray, and do:
                // a. Remove all records
                // b. Extract the matching combination from the json
                // c. loadData inside the store
                // d. commitChanges of the store
                for (item in records) {
                    console.log(item); // checked that we can access the records
                }
            },
            failure: function(response, opts) {
                console.log('failed to load store, with code ' + response.status);
            }
        });
    },

    renderDay: function(value, meta, record) {
        if (record.get('closed') === true) {
            return Ext.String.format('<div class="cf-deactivate-day">{0}</div>', value);
        } else {
            return value;
        }
    },

    toggleClosedState: function(grid, rowIndex, colIndex, item, event, record, row) {
        record.set('closed', !record.get('closed'));
        this.renderDay(record.get('closed'), null, record);
    },

    toggleClosedClass: function (val, meta, rec) {
        return rec.get('closed') === true ? "x-fa fa-check-square-o" : "x-fa fa-square-o";
    },

    resetTimesetWidget: function (el) {
        var buttonId = el.id;
        if (buttonId == 'resetAfter') {
            var grid = Ext.getCmp('cf-timeset-after-grid');
            var store = grid.getStore();
            store.rejectChanges();
            grid.reconfigure(store);
        } else {
            var grid = Ext.getCmp('cf-timeset-company-grid');
            var store = grid.getStore();
            store.rejectChanges();
            grid.reconfigure(store);
        };
    },

    removeSourcelistRecord: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    }

});
