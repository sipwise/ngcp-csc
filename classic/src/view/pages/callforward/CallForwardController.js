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

    checkIndexOf: function(string, target) {
        return target.indexOf(string) > -1;
    },

    addRowToStore: function (store) {
        // TODO: Rewrite to work with form instead
        // var targetStore = Ext.getStore(store);
        // var record = targetStore.getAt(targetStore.getCount() - 1);
        // if (record == null || record.data.phone !== '') {
        //     targetStore.add({ "phone": "", "active": false, "ring_for": "" });
        // };
        console.log('Button for ' + store + ' store clicked');
    },

    addEmptyRow: function (el) {
        var targetId = el.getTarget().id;
        if (this.checkIndexOf('onlineButton', targetId)) {
            this.addRowToStore('CallForwardOnline');
        } else if (this.checkIndexOf('busyButton', targetId)) {
            this.addRowToStore('CallForwardBusy');
        } else if (this.checkIndexOf('offlineButton', targetId)) {
            this.addRowToStore('CallForwardOffline');
        } else if (this.checkIndexOf('addListAButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-a-grid');
            this.addRowToStore(grid.getStore());
        } else if (this.checkIndexOf('addListBButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-b-grid');
            this.addRowToStore(grid.getStore());
        };
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    changeWidget: function (target, vm) {
        var me = this;
        vm.set('after_hours', true);
        vm.set('company_hours', true);
        vm.set('list_a', true);
        vm.set('list_b', true);
        switch (target) {
            case 'afterHoursButton-btnIconEl':
                if (vm.get('active_widget') == 'After hours') {
                    vm.set('after_hours', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.after_hours[localStorage.getItem('languageSelected')]);
                    vm.set('after_hours', false);
                };
                break;
            case 'companyHoursButton-btnIconEl':
                if (vm.get('active_widget') == 'Company hours') {
                    vm.set('company_hours', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.company_hours[localStorage.getItem('languageSelected')]);
                    vm.set('company_hours', false);
                };
                break;
            case 'listAButton-btnIconEl':
                if (vm.get('active_widget') == 'List A') {
                    vm.set('list_a', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.list_a[localStorage.getItem('languageSelected')]);
                    vm.set('list_a', false);
                };
                break;
            case 'listBButton-btnIconEl':
                if (vm.get('active_widget') == 'List B') {
                    vm.set('list_a', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.list_b[localStorage.getItem('languageSelected')]);
                    vm.set('list_b', false);
                };
                break;
        };
    },

    getSelectedSet: function (type) {
        return type == 'timeButtons' ? 'selected_timeset' : 'selected_sourceset';
    },

    clickSegmentedButton: function (button, event) {
        var me = this,
            vm = me.getViewModel(),
            targetId = event.getTarget().id,
            buttonValue = button.value,
            buttonType = button.findParentByType('segmentedbutton').itemId,
            storesArray = ['CallForwardOnline', 'CallForwardBusy', 'CallForwardOffline'];
        me.changeWidget(targetId, vm);
        vm.set(me.getSelectedSet(buttonType), buttonValue);
        Ext.Ajax.request({
            url: '/resources/data/callForwardCombinations.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText),
                    combinationStore = obj.data[0],
                    selectedTimeset = vm.get('selected_timeset'),
                    selectedSourceset = vm.get('selected_sourceset');
                storesArray.map(function (storeName) {
                    var store = Ext.getStore(storeName);
                    store.removeAll();
                    for (node in combinationStore) {
                        if (me.checkIndexOf(storeName, node) && me.checkIndexOf(selectedTimeset, node) && me.checkIndexOf(selectedSourceset, node)) {
                            var records = combinationStore[node];
                            store.add(records);
                        };
                    };
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
    },

    renderPhoneColumn: function(value, metaData, record) {
        if (!value) {
            return 'Enter number';
        } else if (Ext.isNumber(parseInt(value))){
            return '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>' + '+' + value;
        } else {
            return '<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>' + value;
        };
    },

    renderSecsColumn: function(value, metaData, record) {
        return 'and ring for ' + value + ' secs';
        // TODO: Remove once new "add new" functionality in place
        // if (!value) {
        //     return 'Enter secs';
        // } else {
        //     return 'and ring for ' + value + ' secs';
        // };
    }

});
