Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    selectFirstRing: function(component, record) {
        var vm = this.getViewModel();
        function showHideTimeoutField(timeoutField) {
            record === 'Own phone' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        if (component.getId() === 'onlineFirstDest') {
            showHideTimeoutField('online_first_timeout_hidden');
        } else if (component.getId() === 'busyFirstDest') {
            showHideTimeoutField('busy_first_timeout_hidden');
        } else if (component.getId() === 'offlineFirstDest') {
            showHideTimeoutField('offline_first_timeout_hidden');
        };
    },

    checkIndexOf: function(string, target) {
        return target.indexOf(string) > -1;
    },

    addEmptyRowToStore: function (store) {
        var targetStore = Ext.getStore(store);
        var record = targetStore.getAt(targetStore.getCount() - 1);
        if (record == null || record.data.phone !== '') {
            targetStore.add({ "phone": "", "active": false, "ring_for": "" });
        };
    },

    addEmptyRow: function (button) {
        var targetId = button.id;
        if (this.checkIndexOf('addListAButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-a-grid');
            this.addEmptyRowToStore(grid.getStore());
        } else if (this.checkIndexOf('addListBButton', targetId)) {
            var grid = Ext.getCmp('cf-sourceset-list-b-grid');
            this.addEmptyRowToStore(grid.getStore());
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
        this.showLoadingIndicator();
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
        if (record.get('ring_for') === '' && !Ext.isNumber(parseInt(value))) {
            return Ext.String.format('<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>{0}', value);
        } else if (Ext.isNumber(parseInt(value))) {
            return Ext.String.format('<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>+{0} and ring for {1} secs', value, record.get('ring_for'));
        } else {
            return Ext.String.format('<i class="fa fa-circle cf-tpl-fa" aria-hidden="true"></i>{0} and ring for {1} secs', value, record.get('ring_for'));
        };
    },

    selectThenRing: function (component, record) {
        var vm = this.getViewModel();
        function showHideTimeoutField(timeoutField) {
            record === 'Number' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        if (component.getId() === 'onlineThenDest') {
            showHideTimeoutField('online_then_timeout_hidden');
        } else if (component.getId() === 'busyThenDest') {
            showHideTimeoutField('busy_then_timeout_hidden');
        } else if (component.getId() === 'offlineThenDest') {
            showHideTimeoutField('offline_then_timeout_hidden');
        };
    },

    showNewDestinationForm: function (button) {
        var vm = this.getViewModel();
        var targetId = button.id;
        if (this.checkIndexOf('onlineButton', targetId)) {
            vm.set('online_add_new_then_hidden', !vm.get('online_add_new_then_hidden'));
        } else if (this.checkIndexOf('busyButton', targetId)) {
            vm.set('busy_add_new_then_hidden', !vm.get('busy_add_new_then_hidden'));
        } else if (this.checkIndexOf('offlineButton', targetId)) {
            vm.set('offline_add_new_then_hidden', !vm.get('offline_add_new_then_hidden'));
        };
    },

    saveDestinationToStore: function (store) {
        var me = this;
        var vm = me.getViewModel();
        var targetStore = Ext.getStore(store);
        var newPhone, newTimeout;
        switch (store) {
            case 'CallForwardOnline':
                var newDest = vm.get('online_then_dest');
                var newNumber = vm.get('online_then_number');
                var newTimeout = newDest === 'Number' ? vm.get('online_then_timeout') : '';
                var newPhone = newDest === 'Number' ? newNumber : newDest;
                targetStore.add({ "phone": newPhone, "ring_for": newTimeout });

                vm.set('online_add_new_then_hidden', true);
                break;
            case 'CallForwardBusy':
                var newDest = vm.get('busy_then_dest');
                var newNumber = vm.get('busy_then_number');
                var newTimeout = newDest === 'Number' ? vm.get('busy_then_timeout') : '';
                var newPhone = newDest === 'Number' ? newNumber : newDest;
                targetStore.add({ "phone": newPhone, "ring_for": newTimeout });
                vm.set('busy_add_new_then_hidden', true);
                break;
            case 'CallForwardOffline':
                var newDest = vm.get('offline_then_dest');
                var newNumber = vm.get('offline_then_number');
                var newTimeout = newDest === 'Number' ? vm.get('offline_then_timeout') : '';
                var newPhone = newDest === 'Number' ? newNumber : newDest;
                targetStore.add({ "phone": newPhone, "ring_for": newTimeout });
                vm.set('offline_add_new_then_hidden', true);
                break;
        };
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },

    addNewDestination: function (button) {
        var targetId = button.id;
        if (this.checkIndexOf('onlineSaveButton', targetId)) {
            this.saveDestinationToStore('CallForwardOnline');
        } else if (this.checkIndexOf('busySaveButton', targetId)) {
            this.saveDestinationToStore('CallForwardBusy');
        } else if (this.checkIndexOf('offlineSaveButton', targetId)) {
            this.saveDestinationToStore('CallForwardOffline');
        };
    },

    toggleEnableButtons: function (buttons, state) {
        if (state === 'disable') {
            buttons.forEach(function (button) {
                button.disable();
            });
        } else if (state === 'enable') {
            buttons.forEach(function (button) {
                button.enable();
            });
        }
    },

    showLoadingIndicator: function() {
        var me = this;
        var vm = me.getViewModel();
        var loadingBar = me.lookupReference('loadingBar');
        var buttons = [me.lookupReference('alwaysButton'),
            me.lookupReference('afterHoursButton'),
            me.lookupReference('companyHoursButton'),
            me.lookupReference('everybodyButton'),
            me.lookupReference('listAButton'),
            me.lookupReference('listBButton')];
        me.toggleEnableButtons(buttons, 'disable');
        loadingBar.showBusy();
        Ext.defer(function () {
            loadingBar.clearStatus();
            me.toggleEnableButtons(buttons, 'enable');
        }, 300);
    }

});
