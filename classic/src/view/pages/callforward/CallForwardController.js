// DONE: 1. Update endpoints mapping, as callforwards has sources and times,
//          but no sourceset or timeset names. Need to perform an ajax
//          request in controller to get sourceset name for current cf type
//          for subscriber
// +--------------+---------------+------+--------------------+
// |  Submodule   |     Grid      | CRUD |      Endpoint      |
// +--------------+---------------+------+--------------------+
// | Alw/Aft/Comp | Timeset       | RU   | /api/cftimesets/   |
// | Alw/Aft/Comp | Sourceset     | RU   | /api/cfsourcesets/ |
// | Alw/Aft/Comp | Onl/Offl/Busy | CRUD | /api/callforwards/ |
// | Alw/Aft/Comp | Onl/Offl/Busy | R    | /api/cfsourcesets/ |
// | Alw/Aft/Comp | Onl/Offl/Busy | R    | /api/cftimesets/   |
// +--------------+---------------+------+--------------------+
// TODO: 2. create proxy configurations for each store/models, extending
//          NgcpApi proxy from CB modules
// DONE: 2a. implement initial model, store, and store load listener logic
//           in controller
// TODO: 2b. create a store and grid with destinations cfu
// TODO: 3. implement into view for displaying data based on requested data
// TODO: 4. CANCEL button text does not get reverted back to ADD NEW
//    DESTINATION after adding new from empty list, fix
// TODO: 5. Make timeout field editable
// TODO: 6. For busy and offline, don't display "first ring" section
// TODO: 7. For after timeset grids, we need a good solution for what to
//    display if not "After Hours" / "Company Hours" timeset exists,
//    which will be the case for most all users first time they set up
//    CFs. Andreas suggested red exclamation mark/notification badge
//    displayed on menu item with "after hours not defined" indication.
//    Could also have a "Your after hours are not configured yet. Click
//    here to do that... [Dismiss] ("I do not want to do that")" as a
//    notification bar/row on top
// TODO: 8. Implement logic for "first ring and "then ring" conditions (first
//    ring if cfu is set as other than own phone, grid is cfu. first
//    ring own phone cft (on timeout, on ring timeout). if no data,
//    then set as own phone)
// TODO: X. Talked about having a plus icon after List B, to add more
//    sourcesets. Will not complete that as part of this task, but
//    keeping it in mind
// TODO: XX. Once all is remaining CF tasks are implemented, discuss in a
//     sync-up validation restrictions for what destinations you can put
//     "on top of each other"
Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    listen: {
        controller: {
            '*': {
                confirmCFRemoval: 'confirmCFRemoval'
            }
        },
        store: {
            '*': {
                cfStoreLoaded: 'cfStoreLoaded',
                cfStoreBeforeSync: 'cfStoreBeforeSync'
            }
        }
    },

    cfStoreLoaded: function(store, data) {
        var models = [];
        var cfType = store._type;
        var destinationObjects = data.get(cfType);
        store.removeAll();
        Ext.each(destinationObjects, function(obj) {
            var cbModel = Ext.create('NgcpCsc.model.CallForwardInitial', {
                cfna: obj
            });
            store.add(cbModel);
            console.log(obj);
        });
        // store.commitChanges();
        // this.setVm(store, data);
    },

    cfStoreBeforeSync: function(store, options) {
        console.log('cfStoreBeforeSync');
    },

    editingPhoneDone: function(editor, context) {
        var record = context.record;
        var grid = context.grid;
        record.set("edit", false);
        grid.getView().refresh();
    },

    beforePhoneEdit: function (editor, context) {
        var record = context.record;
        var grid = context.grid;
        record.set("edit", true);
        grid.getView().refresh();
    },

    collapsePanel: function(el) {
        var panelId = el.id.split('-')[1];
        var isCollapsed = el.collapsed === false ? false : true;
        var store = Ext.getStore('CallForwardLocalStorage');
        var localStorageRecord = store.getAt(0);
        switch (panelId) {
            case 'afterHours':
                switch (isCollapsed) {
                    case true:
                        localStorageRecord.set('afterHoursCollapsed', true);
                        break;
                    case false:
                        localStorageRecord.set('afterHoursCollapsed', false);
                        break;
                }
                break;
            case 'companyHours':
                switch (isCollapsed) {
                    case true:
                        localStorageRecord.set('companyHoursCollapsed', true);
                        break;
                    case false:
                        localStorageRecord.set('companyHoursCollapsed', false);
                        break;
                }
                break;
        };
        store.sync();
    },

    onEnterPressed: function(field, el) {
        var me = this;
        if (el.getKey() == el.ENTER) {
            me.addNewDestination(field);
        };
    },

    toggleChangeTitle: function(button) {
        var vm = this.getViewModel();
        var buttonId = button.id;
        var hiddenKey = 'hide_' + buttonId.split('-')[2];
        vm.set(hiddenKey, !vm.get(hiddenKey));
    },

    saveNewTitle: function(button) {
        var vm = this.getViewModel();
        var buttonId = button.id;
        var hiddenKey = 'hide_' + buttonId.split('-')[2];
        vm.set(hiddenKey, !vm.get(hiddenKey));
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },

    cancelNewTitle: function(button) {
        var vm = this.getViewModel();
        var buttonId = button.id;
        var hiddenKey = 'hide_' + buttonId.split('-')[2];
        vm.set(hiddenKey, !vm.get(hiddenKey));
    },

    onEditClicked: function(el) {
        var vm = this.getViewModel();
        var classList = el.target.classList;
        switch (true) {
            case (classList.contains('edit-listA')):
                vm.set('list_b', true);
                vm.set('list_a', !vm.get('list_a'));
                break;
            case (classList.contains('edit-listB')):
                vm.set('list_a', true);
                vm.set('list_b', !vm.get('list_b'));
                break;
        };
    },

    checkIndexOf: function(string, target) {
        return target.indexOf(string) > -1;
    },

    saveEmptyRowToStore: function(grid) {
        var store = grid.getStore();
        var plugin = grid.getPlugin('celleditingSource');
        var newRowIndex = store.getCount() + 1;
        var record = store.getAt(store.getCount() - 1);
        if (record == null || (record.data.phone !== ' ' && record.data.phone !== '')) {
            // Need to add whitespace in record when using widgetcolumn
            store.add({
                "phone": " ",
                "edit": true
            });
        };
        plugin.startEditByPosition({
            row: newRowIndex,
            column: 0
        });
    },

    addEmptyRow: function(button) {
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
        var title = Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')];
        var question = Ngcp.csc.locales.common.remove_confirm[localStorage.getItem('languageSelected')];
        var sucessMsg = Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')];
        this.fireEvent('showconfirmbox', title, question, sucessMsg, 'confirmCFRemoval', rec);
    },

    confirmCFRemoval: function(record) {
        var store = record.store;
        store.remove(record);
    },

    getStoresArrayFromRoute: function(currentRoute, currentSourceset) {
        var view = currentRoute.split('/')[1];
        var prefix = currentSourceset + '-' + view + '-';
        return [prefix + 'CallForwardOnline', prefix + 'CallForwardBusy', prefix + 'CallForwardOffline'];
    },

    onTabClicked: function(cmp) {
        var me = this;
        var vm = me.getViewModel();
        var currentRoute = window.location.hash.replace('hours', 'Hours');
        var currentTimeset = currentRoute.split('/')[1];
        var currentSourceset = cmp.id.split('-')[2];
        var storesArray = this.getStoresArrayFromRoute(currentRoute, currentSourceset);
        if (currentSourceset === 'everybody') {
            vm.set('list_b', true);
            vm.set('list_a', true);
        } else if (currentSourceset === 'listA') {
            vm.set('list_b', true);
            vm.set('list_a', false);
        } else if (currentSourceset === 'listB') {
            vm.set('list_a', true);
            vm.set('list_b', false);
        };
        Ext.Ajax.request({
            url: '/resources/data/callForwardCombinations.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var combinationStore = obj.data[0];
                storesArray.map(function(storeName) {
                    var store = Ext.getStore(storeName);
                    var strippedStoreName = storeName.split('-')[2];
                    // Workaround since tabpanel being in initComponent causes this function to run before we have a route set.
                    // This short-circuits into evaluating the right hand side only if we have a store that is not undefined
                    !!store && store.removeAll();
                    for (node in combinationStore) {
                        if (me.checkIndexOf(strippedStoreName, node) && me.checkIndexOf(currentTimeset, node) && me.checkIndexOf(currentSourceset, node)) {
                            var records = combinationStore[node];
                            store.add(records);
                        };
                    };
                });
            },
            failure: function(response, opts) {}
        });
    },

    renderDay: function(value, meta, record) {
        if (record.get('closed') === true) {
            return Ext.String.format('<div class="cf-deactivate-day">{0}</div>', value);
        } else {
            return value;
        }
    },

    toggleClosedState: function(grid, rowIndex, colIndex, item, event, record) {
        record.set('closed', !record.get('closed'));
        this.renderDay(record.get('closed'), null, record);
    },

    toggleClosedClass: function(val, meta, rec) {
        return rec.get('closed') === true ? Ngcp.csc.icons.square_checked : Ngcp.csc.icons.square;
    },

    removeSourcelistRecord: function(grid, rowIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        var title = Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')];
        var question = Ngcp.csc.locales.common.remove_confirm[localStorage.getItem('languageSelected')];
        var sucessMsg = Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')];
        this.fireEvent('showconfirmbox', title, question, sucessMsg, 'confirmCFRemoval', rec);
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

    showHideTimeoutField: function(vm, record, timeoutField) {
        switch (record) {
            case 'Number':
            case 'Own phone':
                vm.set(timeoutField, false);
                break;
            case 'Voicemail':
            case 'Fax2Mail':
            case 'None':
                vm.set(timeoutField, true);
                break;
        };
    },

    selectRing: function(component, record) {
        var vm = this.getViewModel();
        var cmpIdSplit = component.getId().split('-');
        var timeoutFieldCategory = cmpIdSplit[2].replace(/FirstDest|ThenDest/, '');
        var firstOrThen = cmpIdSplit[2].replace(/online|offline|busy/, '').toLowerCase().replace('dest', '');
        this.showHideTimeoutField(vm, record, timeoutFieldCategory + '_' + firstOrThen + '_timeout_hidden');
    },

    toggleNewDestinationForm: function(button) {
        var me = this;
        var vm = this.getViewModel();
        var targetId = button.id;
        switch (true) {
            case (me.checkIndexOf('online', targetId)):
                vm.set('online_add_new_then_hidden', !vm.get('online_add_new_then_hidden'));
                vm.set('online_cancel_button_hidden', !vm.get('online_cancel_button_hidden'));
                vm.set('online_add_button_hidden', !vm.get('online_add_button_hidden'));
                break;
            case (me.checkIndexOf('busy', targetId)):
                vm.set('busy_add_new_then_hidden', !vm.get('busy_add_new_then_hidden'));
                vm.set('busy_cancel_button_hidden', !vm.get('busy_cancel_button_hidden'));
                vm.set('busy_add_button_hidden', !vm.get('busy_add_button_hidden'));
                break;
            case (me.checkIndexOf('offline', targetId)):
                vm.set('offline_add_new_then_hidden', !vm.get('offline_add_new_then_hidden'));
                vm.set('offline_cancel_button_hidden', !vm.get('offline_cancel_button_hidden'));
                vm.set('offline_add_button_hidden', !vm.get('offline_add_button_hidden'));
                break;
        };
    },

    hideThenFieldsByStoreName: function(vm, storeNameStripped) {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        switch (storeNameStripped) {
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

    validateDestinationForm: function(storeName) {
        var me = this;
        var vm = me.getViewModel();
        var targetStore = Ext.getStore(storeName);
        var storeNameStripped = storeName.split('-')[2];
        var storeNameCategory = storeNameStripped.replace('CallForward', '').toLowerCase();
        var newNumber = vm.get(storeNameCategory + '_then_number');
        var newDest = vm.get(storeNameCategory + '_then_dest');
        var newPhone, newTimeout;
        switch (Ext.isEmpty(newNumber) || newDest === 'Voicemail' || newDest === 'Fax2Mail') {
            case true:
                switch (Ext.isEmpty(newNumber) && newDest === 'Number') {
                    case true:
                        me.fireEvent('showmessage', false, 'Number is required. Please retry.');
                        break;
                    case false:
                        targetStore.add({
                            "phone": newDest,
                            "ring_for": ""
                        });
                        me.hideThenFieldsByStoreName(vm, storeNameStripped);
                        break;
                };
                vm.set(storeNameCategory + '_then_number', '');
                break;
            case false:
                switch (Ext.isNumber(parseInt(newNumber))) {
                    case false:
                        me.fireEvent('showmessage', false, 'Only numbers allowed. Please retry.');
                        vm.set(storeNameCategory + '_then_number', '');
                        break;
                    case true:
                        var newTimeout = newDest === 'Number' ? vm.get(storeNameCategory + '_then_timeout') : '';
                        var newPhone = newDest === 'Number' ? newNumber : newDest;
                        targetStore.add({
                            "phone": newPhone,
                            "ring_for": newTimeout
                        });
                        vm.set(storeNameCategory + '_then_number', '');
                        me.hideThenFieldsByStoreName(vm, storeNameStripped);
                        break;
                };
                break;
        };
    },

    addNewDestination: function(element) {
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

    saveGrid: function(el) {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }

});
