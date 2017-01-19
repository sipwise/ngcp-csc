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

    checkIndex: function(string, target) {
        return (target.indexOf(string) > -1) === true ? true : false;
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
        var me = this;
        var storesArray = ['CallForwardOnline', 'CallForwardBusy', 'CallForwardOffline']; // should we hardcode like this, and should we store names or actual stores?
        Ext.Ajax.request({
            url: '/resources/data/cfCombinations.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var combinationStore = obj.data[0];
                // TODO: 1. Loop over the storesArray, and do:
                storesArray.map(function (storeName) {
                    var store = Ext.getStore(storeName), nodeArray = [];
                    // DONE: 1a. Remove all records
                    store.removeAll();
                    for (node in combinationStore) {
                        if (me.checkIndex(storeName, node)) {
                            var gridStore = combinationStore[node];

                            for (record in gridStore) {
                                // TODO: 1b. Extract the matching combination from the json.
                                // Need to end up with an array of records for each of the 3
                                // grid stores. Currently pushes all 36 records to each of
                                // the 3 arrays, so have to figure out why...
                                nodeArray.push(gridStore[record]);
                            }
                            // TODO: 1c. loadData inside the store
                            // TODO: 1d. commitChanges of the store
                        };
                    };
                    console.log(nodeArray);
                });
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
