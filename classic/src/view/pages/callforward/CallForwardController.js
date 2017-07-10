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
                cfTimesetStoreLoaded: 'cfTimesetStoreLoaded',
                cfSourcesetStoreLoaded: 'cfSourcesetStoreLoaded',
                cfTimesetBeforeSync: 'cfTimesetBeforeSync'
            }
        }
    },

    parseTimesetApiToRecords: function (times) {
        console.log(times);
        var daysOfTheWeek = {
            1: {day: 'Sunday', timeFrom: '', timeTo: ''},
            2: {day: 'Monday', timeFrom: '', timeTo: ''},
            3: {day: 'Tuesday', timeFrom: '', timeTo: ''},
            4: {day: 'Wednesday', timeFrom: '', timeTo: ''},
            5: {day: 'Thursday', timeFrom: '', timeTo: ''},
            6: {day: 'Friday', timeFrom: '', timeTo: ''},
            7: {day: 'Saturday', timeFrom: '', timeTo: ''}
        };
        // XXX: With the help of rfuchs, a better solution to handle the merging
        // would be to have an array for each day, and sort from-to ranges based
        // on from time, and merge them of the adjacent arrays have lower/higher
        // values. Before adding the from-to ranges to the arrays, we need to
        // split on midnight if they cross over, resulting in two from-to ranges
        // to add instead of one. Example object with said day arrays:
        // [ { day: "Sunday", times: [ [0-8], [10-17], [9-20] ] },
        //   { day: "Monday", times: [ [8-16] ] },
        //   { day: "Tuesday", times: [ [8-], [10-17], [9-20] ] } } ]
        // NOTE: We have two issues we need to solve:
        //       1. We can not account for all possible combination of ranges
        //          with the current calendar table. We either need to a) display
        //          more time from-to in same row, b) display several rows per
        //          wday if needed, c) implement a full calendar view instead,
        //          or d) only let the user see the the timeset name, but not
        //          change it, and let the superuser change it in a card style
        //          view with one card per time object (sort of like in
        //          ngcp-panel)
        //       2. Currently we're allowing the user to cross midnight when
        //          altering times
        Ext.each(times, function (time) {
            // DONE: Create a range of days, e.g [2, 3, 4, 5]
            var timesFromAndTo = time.hour !== null ? time.hour.split('-') : false;
            var timeFrom = timesFromAndTo[0];
            var timeTo = timesFromAndTo[1];
            var daysFromAndTo = time.wday !== null ? time.wday.split('-') : false;
            var daysRange = [];
            if (!timesFromAndTo || !daysFromAndTo) return;
            for (var i = daysFromAndTo[0]; i <= daysFromAndTo[1]; i++) {
                daysRange.push(parseInt(i));
            };
            daysRange.forEach(function (dayNum) {
                if (daysOfTheWeek[dayNum].timeFrom.length === 0) {
                    daysOfTheWeek[dayNum].timeFrom = timeFrom;
                    daysOfTheWeek[dayNum].timeTo = timeTo;
                } else {

                    // TODO: Merge days if day object already has values stored
                    // for timeFrom and timeTo
                    // NOTE: How do we handle the fact that timeFrom might be
                    // larger than timeTo?? E.g. "hour": "16-8"... API allows
                    // for value from 1-23 from timeFrom and timeTo.
                    // Could we use an if statement to handle it separately?:
                    // if (timeFrom > timeTo) {
                    // // TODO: Figure out how to merge in this scenario
                    // }
                    // TODO: timeFrom and timeTo can also be same value. Assuming
                    // such a rule will be ignore in system, unless minutes
                    // are set. So will ignore those for now
                }
            });
            console.log(daysOfTheWeek);
        });
        //
        // TODO: Take this input...
        // "times": [
        //   {
        //     "hour": "8-16",
        //     "mday": null,
        //     "minute": null,
        //     "month": null,
        //     "wday": "2-3",
        //     "year": null
        //   },
        //   {
        //     "hour": "10-18",
        //     "mday": null,
        //     "minute": null,
        //     "month": null,
        //     "wday": "3",
        //     "year": null
        //   }
        // ]
        // >>>>>> ... and return this output: >>>>>>
        // [ { "timeFrom": "8", "timeTo": "16", "day": "Monday" },
        //   { "timeFrom": "8", "timeTo": "16", "day": "Tuesday" },
        //   { "timeFrom": "8", "timeTo": "18", "day": "Wednesday" }
        // ]
        // XXX Temp dummy data XXX
        return [
            { "timeFrom": "9", "timeTo": "16", "day": "Monday" },
            { "timeFrom": "12", "timeTo": "16", "day": "Tuesday" },
            { "timeFrom": "8", "timeTo": "18", "day": "Wednesday" },
            { "timeFrom": "8", "timeTo": "11", "day": "Thursday" },
            { "timeFrom": "8", "timeTo": "14", "day": "Friday" }
        ];
    },

    cfTimesetStoreLoaded: function(store, data) {
        var me = this;
        var arrayOfModels = [];
        store.removeAll();
        Ext.each(data, function (timeset) {
            var timesetName = timeset.name;
            var timesetId = timeset.id;
            if (timesetName == 'After Hours' || timesetName == 'Company Hours') {
                // DONE: Currently only takes first object in array. Fix.
                var times = me.parseTimesetApiToRecords(timeset.times);
                Ext.each(times, function (time) {
                    var cbModel = Ext.create('NgcpCsc.model.CallForward', {
                        id: Ext.id(),
                        timeset_name: timesetName,
                        timeset_id: timesetId,
                        time_from: time.timeFrom,
                        time_to: time.timeTo,
                        day: time.day,
                        closed: false   // TODO: (For PUT/PATCH ticket) decide
                                        // if we should keep this, or solve this
                                        // differently, or not at all
                    });
                    arrayOfModels.push(cbModel);
                });
            };
        });
        if (arrayOfModels.length > 0) {
            me.populateTimesetStores(arrayOfModels);
        };
    },

    cfSourcesetStoreLoaded: function(store, data) {
        var me = this;
        var arrayOfModels = [];
        store.removeAll();
        Ext.each(data, function (sourceset) {
            var sourcesetName = sourceset.name;
            var sourcesetId = sourceset.id;
            Ext.each(sourceset.sources, function (sourceEntry) {
                var cbModel = Ext.create('NgcpCsc.model.CallForward', {
                    id: Ext.id(),
                    sourceset_name: sourcesetName,
                    sourceset_id: sourcesetId,
                    source: sourceEntry.source
                });
                arrayOfModels.push(cbModel);
            });
        });
        if (arrayOfModels.length > 0) {
            me.populateSourcesetStores(arrayOfModels);
        };
    },

    getTimesetFromRoute: function (route) {
        switch (route) {
            case ('#callforward/always'):
                return null;
                break;
            case ('#callforward/afterhours'):
                return 'After Hours';
                break;
            case ('#callforward/companyhours'):
                return 'Company Hours';
                break;
        };
    },
    cfStoreLoaded: function(store, data) {
        var me = this;
        var cfTypeArrayOfObjects = [data.get('cfu'), data.get('cft'), data.get('cfb'), data.get('cfna')];
        var cfTypes = ['cfu', 'cft', 'cfb', 'cfna'];
        var timeset = store._type;
        var arrayOfModels = [];
        var currentRoute = window.location.hash;
        var routeTimeset = this.getTimesetFromRoute(currentRoute);
        if(me.getView()._preventReLoad){
            return;
        }
        store.removeAll();
        // TODO optimize, too many nested loops affects performance.
        // Ex. Where possible use break Ext.each by return false;
        Ext.Ajax.request({
            url: window.location.origin + '/api/cfdestinationsets/?subscriber_id=' + localStorage.getItem('subscriber_id'),
            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                var destinationsets = decodedResponse._embedded['ngcp:cfdestinationsets'];
                me.getView()._preventReLoad = true; // assumes there is no need to reload the store
                Ext.each(cfTypeArrayOfObjects, function (cfTypeObjects, index) {
                    var cfType = cfTypes[index];
                    Ext.each(cfTypeObjects, function(cfTypeObject) {
                        var destinationsetName = cfTypeObject.destinationset;
                        var sourcesetName = cfTypeObject.sourceset;
                        var timesetName = cfTypeObject.timeset;
                        if (timesetName == routeTimeset) {
                            Ext.each(destinationsets, function(destinationset) {
                                if (destinationset.name == destinationsetName) {
                                    for (item in destinationset.destinations) {
                                        var destinationToUse = me.getDestinationFromSipId(destinationset.destinations[item].destination);
                                        var destinationAnnouncementId = destinationset.announcement_id;
                                        var destination = destinationset.destinations[item].destination;
                                        var priority = destinationset.destinations[item].priority;
                                        var simpleDestination = destinationset.destinations[item].simple_destination;
                                        var destinationId = destinationset.id;
                                        var destinationName = destinationset.name;
                                        var ringFor = destinationToUse == 'Voicemail' ? '' : destinationset.destinations[item].timeout;
                                        var cbModel = Ext.create('NgcpCsc.model.CallForward', {
                                            type: cfType,
                                            destination_cleaned: destinationToUse,
                                            destination_announcement_id: destinationAnnouncementId,
                                            destination: destination,
                                            priority: priority,
                                            simple_destination: simpleDestination,
                                            ring_for: ringFor,
                                            sourceset: sourcesetName,
                                            timeset: timesetName,
                                            destinationset_id: destinationId,
                                            destinationset_name: destinationName
                                        });
                                        arrayOfModels.push(cbModel);
                                    }
                                }
                            });
                        };
                    });
                });
                if (arrayOfModels.length > 0) {
                    me.populateDestinationStores(arrayOfModels);
                }
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    cfStoreBeforeSync: function(store, options) {
        console.log('cfStoreBeforeSync');
        // TODO: (For PUT/PATCH ticket) Base on on CB module implementation
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


    getModuleFromRoute: function(currentRoute) {
        switch (currentRoute) {
            case '#callforward/always':
                return 'always';
                break;
            case '#callforward/afterhours':
                return 'afterHours';
                break;
            case '#callforward/companyhours':
                return 'companyHours';
                break;
        };
    },

    // TODO: Remove when done with this task, but keep for reference for now
    getModelValuesFromTimesData: function (timesData) {
        var times = {};
        var timesFromAndTo = timesData.hour !== null ? timesData.hour.split('-') : [null, null];
        var daysFromAndTo = timesData.wday !== null ? timesData.wday.split('-') : [null, null];
        var weekdayLiterals = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var timeFrom = timesFromAndTo[0];
        var timeTo = timesFromAndTo[1];
        var dayFrom = daysFromAndTo[0];
        var dayTo = daysFromAndTo[1];
        times.days;
        var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        times.timeFrom = timeFrom;
        times.timeTo = timeTo;
        if (!!timesData.wday) {
            var weekdaysArray = weekdayLiterals.slice(dayFrom-1, dayTo);
            times.days = weekdaysArray;
        } else {
            times.days = null;
        };
        return times;
    },

    populateTimesetStores: function (models) {
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var moduleName = this.getModuleFromRoute(currentRoute);
        var store = Ext.getStore(moduleName + '-Timeset');
        if (store.getCount() === 0 ) {
            Ext.each(models, function (model) {
                if (moduleName == 'afterHours' && model.get('timeset_name') == 'After Hours') {
                    store.add(model);
                } else if (moduleName == 'companyHours' && model.get('timeset_name') == 'Company Hours') {
                    store.add(model);
                };
            });
            store.commitChanges();
            if (store.getCount() > 0 ) {
                vm.set(moduleName + '_hideMessage', true);
            };
        };
    },

    populateSourcesetStores: function (models) {
        var storeListAAlways = Ext.getStore('CallForwardListA');
        var storeListBAlways = Ext.getStore('CallForwardListB');
        storeListAAlways.removeAll();
        storeListBAlways.removeAll();
        Ext.each(models, function (model) {
            if (model.get('sourceset_name') == 'List A') {
                storeListAAlways.add(model);
            } else if (model.get('sourceset_name') == 'List B') {
                storeListBAlways.add(model);
            };
        });
        storeListAAlways.commitChanges();
        storeListBAlways.commitChanges();
    },

    populateDestinationStores: function (models) {
        var me = this;
        var gridName = this.getGridCategoryFromType(models[0].get('type'));
        var store;
        Ext.each(models, function (model) {
            var sourcename = me.getSourceNameFromSourceSet(model.get('sourceset'));
            var timename = me.getTimeNameFromTimeSet(model.get('timeset'));
            var type = me.getGridCategoryFromType(model.get('type'));
            var storeName = sourcename + timename + type;
            store = Ext.getStore(storeName);
            if (store) {
                store.add(model);
            }
        });
        if (store) {
            store.commitChanges();
        }
    },

    cfdestinationsetsClick: function () {
        console.log('cfdestinationsetsClick');
    },

    cfsourcesetsClick: function () {
        console.log('cfsourcesetsClick');
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
        if(store){
            store.remove(record);
        }
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
                vm.set('online_cancel_button_hidden', true);
                vm.set('online_add_button_hidden', false);
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

    parseRecordsToTimesetApi: function () {

    },

    recordsToSendBasedOnTimes: function (store) {
        // Started this, but then discovered the issue leading to creation
        // of #18401. Leaving the code in place for upcoming task #18401
        // DONE: Solve how to convert ExtJS default timevalues to hour only value
        // for /api/cftimesets/ PATCH
        // Ext.each(store.getRange(), function (record) {
        //     var timeTo = record.get('time_to');
        //     if (timeTo.length === undefined) {
        //         console.log(Ext.Date.format(record.get('time_to'), 'G')); // Converts to 24-hour format of an hour without leading zeros
        //     } else {
        //         console.log(timeTo);
        //     }
        // });
        var recordsToSend = [];
            Ext.each(store.getRange(), function(record) {
                var data = record.getData();
                // TODO: First iteration - for each weekday, create a model to
                // append to recordsToSend array. Might make sense to create a
                // separate function that massages the data in recordsToSend array,
                // and returns a merged set of hours and times to send in patch
                // console.log(data.time_from);
                // console.log(data.time_to);
            });
        var mergedRecordsToSend = this.parseRecordsToTimesetApi(recordsToSend);
        return mergedRecordsToSend;
    },

    cfTimesetBeforeSync: function (store, options) {
        // XXX: Currently cfTimesetStoreLoaded builds arrayOfModels() based on data
        // from proxy, then invokes populateTimesetStores with the array as argument
        // and adds models to correct store.
        // XXX: To implement additional logic we need to:
        // TODO: 1. Handle initial response from proxy fetch of /api/cftimesets/
        //          data, also when times value array has several time objects
        // TODO: 2. Handle saving of grid changes by binding timefield widgets
        //          to store, and syncing upong pressing "SAVE" button
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        var timesetId = store.last().get('timeset_id');
        var recordsToSend = this.recordsToSendBasedOnTimes(store);
        // TODO: Example ajax request for #18401
        // Ext.Ajax.request({
        //     url: '/api/cftimesets/' + timesetId,
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json-patch+json' },
        //     jsonData: [{
        //         "op": "add",
        //         "path": "/times",
        //         "value": recordsToSend
        //     }],
        //     success: function(response, opts) {
        //         console.log('server-side success with status code ' + response.status);
        //     },
        //     failure: function(response, opts) {
        //         console.log('server-side failure with status code ' + response.status);
        //     }
        // });
        return false;
    },

    saveGrid: function(el) {
        var storeName = el.id.split('-')[0] + '-Timeset';
        var store = Ext.getStore(storeName);
        store.sync();
    }

});
