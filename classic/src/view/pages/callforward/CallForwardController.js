// DONE: 1. Update endpoints mapping, as callforwards has sources and times,
//          but no sourceset or timeset names. Need to perform an ajax
//          request in controller to get sourceset name for current cf type
//          for subscriber
// +--------------+---------------+------+-------------------------+
// | Submodule    | Grid          | CRUD | Endpoint                |
// +--------------+---------------+------+-------------------------+
// | Alw/Aft/Comp | Timeset       | RU   | /api/cftimesets/        |
// | Alw/Aft/Comp | Sourceset     | RU   | /api/cfsourcesets/      |
// | Alw/Aft/Comp | Onl/Offl/Busy | CRUD | /api/cfmappings/        |
// | Alw/Aft/Comp | Onl/Offl/Busy | CR   | /api/cfsourcesets/      |
// | Alw/Aft/Comp | Onl/Offl/Busy | CR   | /api/cftimesets/        |
// | Alw/Aft/Comp | Onl/Offl/Busy | CRUD | /api/cfdestinationsets/ |
// +--------------+---------------+------+-------------------------+
// (timeset/sourceset in onl/off/busy CRUD depends on UI implementation)
// DONE: 2. create proxy configurations for each store/models, extending
//          NgcpApi proxy from CB modules
// DONE: 2a. implement initial model, store, and store load listener logic
//           in controller
// DONE: 2b. create a store and grid with destinations cfu
// DONE: 2c. Remap endpoints, again, this time using cfmappings to base initial
// store data request on with proxy, and then build stores with ajax requests
// to /api/cfdestinationsets, /api/cfsourcesets and /api/cftimesets.
// DONE: 2d. Redo 2a and 2b to complete a successful request, and start building
// up the data needed for the stores
// DONE: 2e. Add all data values from API to model (destination id, simple_dest, etc)
// DONE 3a. implement into view for displaying data based on requested data
// TODO: 3b. prevent duplicate entries with same destination_id, and fix any other
// mistakes in writing data from API
// TODO: 3c. Display timeset and sourceset data from API (read only for this task)
// DONE: 4. CANCEL button text does not get reverted back to ADD NEW
//    DESTINATION after adding new from empty list, fix
// DONE: 5. Make timeout field editable
// DONE: 6. For busy and offline, don't display "first ring" section
// TODO: 7a. Display timeset and sourceset data from API (read only for
//           this task)
//       7b. For after timeset grids, we need a good solution for what to
//           display if not "After Hours" / "Company Hours" timeset exists,
//           which will be the case for most all users first time they set up
//           CFs. Andreas suggested red exclamation mark/notification badge
//           displayed on menu item with "after hours not defined" indication.
//           Could also have a "Your after hours are not configured yet. Click
//           here to do that... [Dismiss] ("I do not want to do that")" as a
//           notification bar/row on top
// TODO: 8. (API WRITE ticket) Implement logic for "first ring and "then ring"
//    conditions (first ring if cfu is set as other than own phone, grid is cfu.
//    first ring own phone cft (on timeout, on ring timeout). if no data,
//    then set as own phone)
// TODO: 9. Remove any unused code and .json files etc
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
                cfStoreBeforeSync: 'cfStoreBeforeSync',
                cfTimesetStoreLoaded: 'cfTimesetStoreLoaded',
                cfSourcesetStoreLoaded: 'cfSourcesetStoreLoaded'
            }
        }
    },

    cfTimesetStoreLoaded: function(store, data) {
        // var me = this;
        // var cfTypeArrayOfObjects = [data.get('cfu'), data.get('cft'), data.get('cfb'), data.get('cfna')];
        // var cfTypes = ['cfu', 'cft', 'cfb', 'cfna'];
        // var timeset = store._type[0];
        // var arrayOfModels = [];
        // store.removeAll();
        console.log(data);
    },

    cfSourcesetStoreLoaded: function(store, data) {
        // var me = this;
        // var cfTypeArrayOfObjects = [data.get('cfu'), data.get('cft'), data.get('cfb'), data.get('cfna')];
        // var cfTypes = ['cfu', 'cft', 'cfb', 'cfna'];
        // var timeset = store._type[0];
        // var arrayOfModels = [];
        // store.removeAll();
        console.log(data);
    },

    cfStoreLoaded: function(store, data) {
        var me = this;
        var cfTypeArrayOfObjects = [data.get('cfu'), data.get('cft'), data.get('cfb'), data.get('cfna')];
        var cfTypes = ['cfu', 'cft', 'cfb', 'cfna'];
        var timeset = store._type[0];
        var arrayOfModels = [];
        store.removeAll();
        Ext.each(cfTypeArrayOfObjects, function (cfTypeObjects, index) {
            var cfType = cfTypes[index];
            var counter = 0;
            Ext.each(cfTypeObjects, function(cfTypeObject) {
                var destinationsetName = cfTypeObject.destinationset;
                var sourcesetName = cfTypeObject.sourceset;
                var timesetName = cfTypeObject.timeset;
                Ext.Ajax.request({
                    url: 'https://localhost:1443/api/cfdestinationsets/?subscriber_id=195',

                    success: function(response, opts) {
                        var decodedResponse = Ext.decode(response.responseText);
                        var destinationsets = decodedResponse._embedded['ngcp:cfdestinationsets'];
                        Ext.each(destinationsets, function(destinationset) {
                            if (destinationset.name == destinationsetName) {
                                for (item in destinationset.destinations) {
                                    var destinationToUse = me.getDestinationFromSipId(destinationset.destinations[item].destination);
                                    var destionationAnnouncementId = destinationset.announcement_id;
                                    var destination = destinationset.destinations[item].destination;
                                    var priority = destinationset.destinations[item].priority;
                                    var simpleDestination = destinationset.destinations[item].simple_destination;
                                    var destinationId = destinationset.id;
                                    var destinationName = destinationset.name;
                                    var cbModel = Ext.create('NgcpCsc.model.CallForward', {
                                        type: cfType,
                                        destination_cleaned: destinationToUse,
                                        destination: destination,
                                        priority: priority,
                                        simple_destination: simpleDestination,
                                        timeout: destinationset.destinations[item].timeout,
                                        sourceset: sourcesetName,
                                        timeset: timesetName,
                                        destinationset_id: destinationId,
                                        destinationset_name: destinationName
                                    });
                                    arrayOfModels.push(cbModel);
                                }
                            }
                        });
                        if (arrayOfModels.length > 0) {
                            me.populateIndividualStores(arrayOfModels);
                        }
                    },

                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            });

        });

    },

    cfStoreBeforeSync: function(store, options) {
        console.log('cfStoreBeforeSync');
        // TODO: (next ticket) Model on CB module
    },

    getDestinationFromSipId: function (destination) {
        var splitDestination = destination.split(/(:|@)/);
        if (splitDestination[4] == 'voicebox.local') {
            return 'Voicemail';
        } else {
            return splitDestination[2];
        }
    },

    getGridCategoryFromType: function (type) {
        switch (type) {
            case 'cft':
            case 'cfu':
                return 'CallForwardOnline';
                break;
            case 'cfb':
                return 'CallForwardBusy';
                break;
            case 'cfna':
                return 'CallForwardOffline';
                break;
        }
    },

    getSourceNameFromSourceSet: function (sourceset) {
        switch (sourceset) {
            case 'List A':
                return 'listA-';
                break;
            case 'List B':
                return 'listB-';
                break;
            case null:
                return 'everybody-';
                break;
        }
    },

    getTimeNameFromTimeSet: function (timeset) {
        switch (timeset) {
            case 'After Hours':
                return 'afterHours-';
                break;
            case 'Company Hours':
                return 'companyHours-';
                break;
            case null:
                return 'always-';
                break;
        }
    },

    populateIndividualStores: function (models) {
        // TODO: Cvenusino: There is an issue where the store get's reloaded if
        // I switch back and forth between modules. I am not sure how to handle
        // this, as each combination of destinationset/sourceset/timeset does
        // not get a unique id from the API, and setting unique idea in the
        // model is not something we tghen can check against the subsequent API
        // calls to control for duplicates
        var me = this;
        var gridName = this.getGridCategoryFromType(models[0].get('type'));
        var store;
        Ext.each(models, function (model) {
            var sourcename = me.getSourceNameFromSourceSet(model.get('sourceset'));
            var timename = me.getTimeNameFromTimeSet(model.get('timeset'));
            var type = me.getGridCategoryFromType(model.get('type'));
            var storeName = sourcename + timename + type;
            store = Ext.getStore(storeName);
            store.add(model);
        });
        store.commitChanges();
    },

    cfdestinationsetsClick: function () {
        console.log('cfdestinationsetsClick');
        Ext.Ajax.request({
            url: 'https://localhost:1443/api/cfdestinationsets/?subscriber_id=297',

            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                var sourcesets = decodedResponse._embedded['ngcp:cfsourcesets'];
                Ext.each(sourcesets, function(destinationset) {
                    if (destinationset.name == destinationsetName) {
                        for (item in destinationset.destinations) {
                            var cbModel = Ext.create('NgcpCsc.model.CallForward', {
                                destination: destinationset.destinations[item].destination, // TODO: Split and reduce to proper destination
                                timeout: destinationset.destinations[item].timeout
                            });
                            store.add(cbModel);

                        }
                    }
                });
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    cfsourcesetsClick: function () {
        console.log('cfsourcesetsClick');
        Ext.Ajax.request({
            url: 'https://localhost:1443/api/cfsourcesets/?subscriber_id=297',

            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                var sourceset = decodedResponse;
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    cftimesetsClick: function () {
        console.log('cftimesetsClick');
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

    renderDestinationColumn: function(value, metaData, record) {
        if (record.get('timeout') === '' && !Ext.isNumber(parseInt(value))) {
            return Ext.String.format('{0}', value);
        } else if (Ext.isNumber(parseInt(value))) {
            return Ext.String.format('+{0} and ring for {1} secs', value, record.get('timeout'));
        } else {
            return Ext.String.format('{0} and ring for {1} secs', value, record.get('timeout'));
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
                vm.set('online_cancel_button_hidden', true);
                vm.set('online_add_button_hidden', false);
                // TODO: Hide
                break;
            case 'CallForwardBusy':
                vm.set('busy_add_new_then_hidden', true);
                vm.set('busy_cancel_button_hidden', true);
                vm.set('busy_add_button_hidden', false);
                break;
            case 'CallForwardOffline':
                vm.set('offline_add_new_then_hidden', true);
                vm.set('offline_cancel_button_hidden', true);
                vm.set('offline_add_button_hidden', false);
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
        var vm = this.getViewModel();
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
