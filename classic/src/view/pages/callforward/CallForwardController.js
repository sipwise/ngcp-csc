Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    onEnterPressed: function (field, el) {
        var me = this;
        if (el.getKey() == el.ENTER) {
            me.addNewDestination(field);
        };
    },

    toggleChangeTitle: function (button) {
        var vm = this.getViewModel();
        var buttonId = button.id;
        var hiddenKey = 'hide_' + buttonId.split('-')[2];
        vm.set(hiddenKey, !vm.get(hiddenKey));
    },

    saveNewTitle: function (button) {
        var vm = this.getViewModel();
        var buttonId = button.id;
        var hiddenKey = 'hide_' + buttonId.split('-')[2];
        vm.set(hiddenKey, !vm.get(hiddenKey));
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },

    onEditClicked: function (el) {
        var vm = this.getViewModel();
        var classList = el.target.classList;
        var currentListAHideState = vm.get('list_a');
        var currentListBHideState = vm.get('list_b');
        switch (true) {
            case (classList.contains('edit-listA')):
                vm.set('list_b', true);
                vm.set('list_a', !currentListAHideState);
                break;
            case (classList.contains('edit-listB')):
                vm.set('list_a', true);
                vm.set('list_b', !currentListBHideState);
                break;
        };
    },

    selectFirstRing: function(component, record) {
        var me = this;
        var vm = this.getViewModel();
        var cmpId = component.getId();
        function showHideTimeoutField(timeoutField) {
            record === 'Own phone' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        switch (true) {
            case (me.checkIndexOf('onlineFirstDest', cmpId)):
                showHideTimeoutField('online_first_timeout_hidden');
                break;
            case (me.checkIndexOf('busyFirstDest', cmpId)):
            case 'companyhours-busyThenDest':
                showHideTimeoutField('busy_first_timeout_hidden');
                break;
            case (me.checkIndexOf('offlineFirstDest', cmpId)):
                showHideTimeoutField('offline_first_timeout_hidden');
                break;
        };
    },

    checkIndexOf: function(string, target) {
        return target.indexOf(string) > -1;
    },

    saveEmptyRowToStore: function (grid) {
        var store = grid.getStore();
        var plugin = grid.getPlugin('celleditingTime');
        var targetStore = Ext.getStore(store);
        var newRowIndex = store.getCount() + 1;
        var record = targetStore.getAt(targetStore.getCount() - 1);
        if (record == null || record.data.phone !== '') {
            targetStore.add({ "phone": "", "active": false, "ring_for": "" });
        };
        plugin.startEditByPosition({ row: newRowIndex, column: 0 });
    },

    addEmptyRow: function (button) {
        var buttonIdSplit = button.id.split('-');
        var buttonPrefixOne = buttonIdSplit[0];
        var buttonPrefixTwo = buttonIdSplit[1];
        var buttonSuffix = buttonIdSplit[2];
        switch (buttonSuffix) {
            case 'addListAButton':
                var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-a-grid');
                this.saveEmptyRowToStore(grid);
                break;
            case 'addListBButton':
                var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-b-grid');
                this.saveEmptyRowToStore(grid);
                break;
        };
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        store.remove(rec);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    changeWidget: function (target, vm, view) {
        var me = this;
        vm.set('list_a', true);
        vm.set('list_b', true);
        switch (target) {
            case view + '-listAButton-btnIconEl':
                if (vm.get('active_widget') == 'List A') {
                    vm.set('list_a', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.list_a[localStorage.getItem('languageSelected')]);
                    vm.set('list_a', false);
                };
                break;
            case view + '-listBButton-btnIconEl':
                if (vm.get('active_widget') == 'List B') {
                    vm.set('list_a', true);
                } else {
                    vm.set('active_widget', Ngcp.csc.locales.callforward.list_b[localStorage.getItem('languageSelected')]);
                    vm.set('list_b', false);
                };
                break;
        };
    },

    getViewFromRoute: function(currentRoute) {
        switch (true) {
            case (currentRoute == '#callforward/always'):
                return 'always';
                break;
            case (currentRoute == '#callforward/afterhours'):
                return 'afterHours';
                break;
            case (currentRoute == '#callforward/companyhours'):
                return 'companyHours';
                break;
        };
    },

    getStoresArrayFromRoute: function (currentRoute, currentSourceset) {
        var view = currentRoute.split('/')[1] || 'always';
        var prefix = currentSourceset + '-' + view + '-';
        return [prefix + 'CallForwardOnline', prefix + 'CallForwardBusy', prefix + 'CallForwardOffline'];
    },

    onTabClicked: function (cmp) {
        var me = this;
        var vm = me.getViewModel();
        var el = cmp.getEl();
        var cmpId = cmp.id;
        var loadingBar = me.lookupReference('loadingBar');
        var currentRoute = window.location.hash;
        var currentView = me.getViewFromRoute(currentRoute);
        var currentSourceset = cmpId.split('-')[2];
        var storesArray = this.getStoresArrayFromRoute(currentRoute, currentSourceset);
        vm.set('list_a', true);
        vm.set('list_b', true);
        loadingBar.showBusy();
        Ext.Ajax.request({
            url: '/resources/data/callForwardCombinations.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var combinationStore = obj.data[0];
                var selectedTimeset = currentView;
                var selectedSourceset = currentSourceset;
                storesArray.map(function (storeName) {
                    var store = Ext.getStore(storeName);
                    var strippedStoreName = storeName.split('-')[2];
                    store.removeAll();
                    for (node in combinationStore) {
                        if (me.checkIndexOf(strippedStoreName, node) && me.checkIndexOf(selectedTimeset, node) && me.checkIndexOf(selectedSourceset, node)) {
                            var records = combinationStore[node];
                            store.add(records);
                        };
                    };
                    Ext.defer(function () {
                        loadingBar.clearStatus();
                    }, 300);
                });
            },
            failure: function(response, opts) {
            }
        });
    },

    getSelectedSet: function (type) {
        return type == 'timeButtons' ? 'selected_timeset' : 'selected_sourceset';
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
        return rec.get('closed') === true ? Ngcp.csc.icons.square_checked : Ngcp.csc.icons.square;
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
            return Ext.String.format('{0}', value);
        } else if (Ext.isNumber(parseInt(value))) {
            return Ext.String.format('+{0} and ring for {1} secs', value, record.get('ring_for'));
        } else {
            return Ext.String.format('{0} and ring for {1} secs', value, record.get('ring_for'));
        };
    },

    selectThenRing: function (component, record) {
        var me = this;
        var vm = this.getViewModel();
        var cmpId = component.getId();
        function showHideTimeoutField(timeoutField) {
            record === 'Number' ? vm.set(timeoutField, false) : vm.set(timeoutField, true);
        };
        switch (true) {
            case (me.checkIndexOf('onlineThenDest', cmpId)):
                showHideTimeoutField('online_then_timeout_hidden');
                break;
            case (me.checkIndexOf('busyThenDest', cmpId)):
            case 'companyhours-busyThenDest':
                showHideTimeoutField('busy_then_timeout_hidden');
                break;
            case (me.checkIndexOf('offlineThenDest', cmpId)):
                showHideTimeoutField('offline_then_timeout_hidden');
                break;
        };
    },

    showNewDestinationForm: function (button) {
        var me = this;
        var vm = this.getViewModel();
        var targetId = button.id;
        switch (true) {
            case (me.checkIndexOf('online', targetId)):
                vm.set('online_add_new_then_hidden', !vm.get('online_add_new_then_hidden'));
                break;
            case (me.checkIndexOf('busy', targetId)):
                vm.set('busy_add_new_then_hidden', !vm.get('busy_add_new_then_hidden'));
                break;
            case (me.checkIndexOf('offline', targetId)):
                vm.set('offline_add_new_then_hidden', !vm.get('offline_add_new_then_hidden'));
                break;
        };
    },

    getNumberFromViewModelByStoreName: function (vm, storeName) {
        var storeNameSuffix = storeName.split('-')[2];
        switch (storeNameSuffix) {
            case 'CallForwardOnline':
                return vm.get('online_then_number');
                break;
            case 'CallForwardBusy':
                return vm.get('busy_then_number');
                break;
            case 'CallForwardOffline':
                return vm.get('offline_then_number');
                break;
        };
    },

    getDestFromViewModelByStoreName: function (vm, storeName) {
        var storeNameSuffix = storeName.split('-')[2];
        switch (storeNameSuffix) {
            case 'CallForwardOnline':
                return vm.get('online_then_dest');
                break;
            case 'CallForwardBusy':
                return vm.get('busy_then_dest');
                break;
            case 'CallForwardOffline':
                return vm.get('offline_then_dest');
                break;
        };
    },

    hideThenFieldsByStoreName: function (vm, storeName) {
        var storeNameSuffix = storeName.split('-')[2];
        switch (storeNameSuffix) {
            case 'CallForwardOnline':
                vm.set('online_add_new_then_hidden', true);
                break;
            case 'CallForwardBusy':
                vm.set('busy_add_new_then_hidden', true);
                break;
            case 'CallForwardOffline':
                vm.set('offline_add_new_then_hidden', true);
                break;
        };
    },

    resetNumberField: function (vm, storeName) {
        var storeNameSuffix = storeName.split('-')[2];
        switch (storeNameSuffix) {
            case 'CallForwardOnline':
                return vm.set('online_then_number', '');
                break;
            case 'CallForwardBusy':
                return vm.set('busy_then_number', '');
                break;
            case 'CallForwardOffline':
                return vm.set('offline_then_number', '');
                break;
        };
    },

    validateDestinationForm: function (storeName) {
        var me = this;
        var vm = me.getViewModel();
        var targetStore = Ext.getStore(storeName);
        var newDest = me.getDestFromViewModelByStoreName(vm, storeName);
        var newNumber = me.getNumberFromViewModelByStoreName(vm, storeName);
        var newPhone, newTimeout;
        switch (Ext.isEmpty(newNumber) || newDest === 'Voicemail' || newDest === 'Fax2Mail') {
            case true:
                switch (Ext.isEmpty(newNumber) && newDest === 'Number') {
                    case true:
                        me.fireEvent('showmessage', false, 'Number is required. Please retry.');
                        break;
                    case false:
                        targetStore.add({ "phone": newDest, "ring_for": "" });
                        me.hideThenFieldsByStoreName(vm, storeName);
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
                        break;
                };
                me.resetNumberField(vm, storeName);
                break;
            case false:
                switch (Ext.isNumber(parseInt(newNumber))) {
                    case false:
                        me.fireEvent('showmessage', false, 'Only numbers allowed. Please retry.');
                        me.resetNumberField(vm, storeName);
                        break;
                    case true:
                        switch (true) {
                            case (me.checkIndexOf('CallForwardOnline', storeName)):
                                var newTimeout = newDest === 'Number' ? vm.get('online_then_timeout') : '';
                                var newPhone = newDest === 'Number' ? newNumber : newDest;
                                break;
                            case (me.checkIndexOf('CallForwardBusy', storeName)):
                                var newTimeout = newDest === 'Number' ? vm.get('busy_then_timeout') : '';
                                var newPhone = newDest === 'Number' ? newNumber : newDest;
                                break;
                            case (me.checkIndexOf('CallForwardOffline', storeName)):
                                var newTimeout = newDest === 'Number' ? vm.get('offline_then_timeout') : '';
                                var newPhone = newDest === 'Number' ? newNumber : newDest;
                                break;
                        };
                        targetStore.add({ "phone": newPhone, "ring_for": newTimeout });
                        me.resetNumberField(vm, storeName);
                        me.hideThenFieldsByStoreName(vm, storeName);
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
                        break;
                };
                break;
        };
    },

    addNewDestination: function (element) {
        var me = this;
        var targetId = element.id;
        var splitTargetId = targetId.split('-');
        var selectedSourceset = splitTargetId[0];
        var selectedTimeset = splitTargetId[1];
        switch (true) {
            case (me.checkIndexOf('online', targetId)):
                me.validateDestinationForm(selectedSourceset + '-' + selectedTimeset + '-CallForwardOnline');
                break;
            case (me.checkIndexOf('busy', targetId)):
                me.validateDestinationForm(selectedSourceset + '-' + selectedTimeset + '-CallForwardBusy');
                break;
            case (me.checkIndexOf('offline', targetId)):
                me.validateDestinationForm(selectedSourceset + '-' + selectedTimeset + '-CallForwardOffline');
                break;
        };
    },

    toggleAfterTimesetGrid: function () {
        var vm = this.getViewModel();
        vm.set('after_hours', !vm.get('after_hours'));
    },

    toggleCompanyTimesetGrid: function () {
        var vm = this.getViewModel();
        vm.set('company_hours', !vm.get('company_hours'));
    }

});
