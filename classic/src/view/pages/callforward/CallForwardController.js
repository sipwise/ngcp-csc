Ext.define('NgcpCsc.view.pages.callforward.CallForwardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.callforward',

    listen: {
        controller: {
            '*': {
                confirmCFRemoval: 'confirmCFRemoval',
                cfReloadStore: 'cfReLoadStore'
            }
        },
        store: {
            '*': {
                cfStoreLoaded: 'cfStoreLoaded',
                cfTimesetStoreLoaded: 'cfTimesetStoreLoaded',
                cfSourcesetStoreLoaded: 'cfSourcesetStoreLoaded',
                cfStoreBeforeSync: 'cfStoreBeforeSync',
                cfSourcesetBeforeSync: 'cfSourcesetBeforeSync',
                cfTimesetBeforeSync: 'cfTimesetBeforeSync'
            }
        }
    },

    destinationDropped: function(node, data, overModel, dropPosition, eOpts) {
        var dropRec = data.records[0];
        var store = overModel.store;
        var recIndex = store.indexOf(dropRec);
        var adjacentRec = dropPosition === 'before' ? store.getAt(recIndex+1) : store.getAt(recIndex-1);
        var destinationsetId = adjacentRec.get('destinationset_id') === dropRec.get('destinationset_id') ? dropRec.get('destinationset_id') : adjacentRec.get('destinationset_id');
        var destinationsetName = adjacentRec.get('destinationset_name') === dropRec.get('destinationset_name') ? dropRec.get('destinationset_name') : adjacentRec.get('destinationset_name');
        var afterTermination = adjacentRec.get('after_termination') === dropRec.get('after_termination') ? dropRec.get('after_termination') : adjacentRec.get('after_termination');
        var priority = adjacentRec.get('priority') === dropRec.get('priority') ? dropRec.get('priority') : adjacentRec.get('priority');
        var type = adjacentRec.get('type') === dropRec.get('type') ? dropRec.get('type') : adjacentRec.get('type');
        dropRec.set('destinationset_id', destinationsetId);
        dropRec.set('destinationset_name', destinationsetName);
        dropRec.set('after_termination', afterTermination);
        dropRec.set('priority', priority);
        dropRec.set('type', type);
        this.setLabelTerminationType(store);
        store.sync();
    },

    cfTimesetStoreLoaded: function(store, data) {
        var me = this;
        var arrayOfModels = [];
        var timesets;
        if (data.getData()._embedded == undefined) {
            return;
        } else {
            timesets = data.getData()._embedded['ngcp:cftimesets'];
        }
        store.removeAll();
        Ext.each(timesets, function (timeset) {
            var timesetName = timeset.name;
            var timesetId = timeset.id;
            me.setVmToTrue(timesetName);
            if (/(After|Company)\s(Hours)/.test(timesetName)) {
                var times = me.getModelValuesFromTimesData(timeset.times[0]);
                Ext.each(times.days, function (weekday) {
                    var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                        id: Ext.id(),
                        timeset_name: timesetName,
                        timeset_id: timesetId,
                        time_from: times.timeFrom,
                        time_to: times.timeTo,
                        day: weekday,
                        closed: false
                    });
                    arrayOfModels.push(cfModel);
                });
            };
        });
        if (arrayOfModels.length > 0) {
            me.populateTimesetStores(arrayOfModels);
        };
    },

    setVmToTrue: function (name) {
        var vm = this.getViewModel();
        switch (name) {
            case 'After Hours':
                vm.set('after_hours_exists_in_api', true);
                break;
            case 'Company Hours':
                vm.set('company_hours_exists_in_api', true);
                break;
            case 'List A':
                vm.set('list_a_exists_in_api', true);
                break;
            case 'List B':
                vm.set('list_b_exists_in_api', true);
                break;
        };
    },

    cfSourcesetStoreLoaded: function(store, data) {
        var me = this;
        var arrayOfModels = [];
        if (data.getData()._embedded == undefined) {
            return;
        } else {
            var sourcesets = data.getData()._embedded['ngcp:cfsourcesets'];
            store.removeAll();
            Ext.each(sourcesets, function (sourceset) {
                var sourcesetName = sourceset.name;
                var sourcesetId = sourceset.id;
                me.setVmToTrue(sourcesetName);
                Ext.each(sourceset.sources, function (sourceEntry) {
                    var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                        id: Ext.id(),
                        sourceset_name: sourcesetName,
                        sourceset_id: sourcesetId,
                        source: sourceEntry.source
                    });
                    arrayOfModels.push(cfModel);
                });
            });
            if (arrayOfModels.length > 0) {
                me.populateSourcesetStores(arrayOfModels);
            };
        }

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

    sortDestinationsetByPriority: function (destinations) {
        var sorted = destinations.sort(function(a, b) {
            return parseFloat(a.priority) - parseFloat(b.priority);
        });
        return sorted;
    },

    addCftOwnPhone: function (destinations) {
        if (destinations.length > 0) {
            destinations.unshift({
                "announcement_id": null,
                "destination": "own phone",
                "priority": 1,
                "timeout": 15
              })
      }
    },

    cfStoreLoaded: function(store, data) {
        var me = this;
        var cfTypeArrayOfObjects = [data.get('cfu'), data.get('cft'), data.get('cfb'), data.get('cfna')];
        var cfTypes = ['cfu', 'cft', 'cfb', 'cfna'];
        var timeset = store._type;
        var arrayOfModels = [];
        var currentRoute = window.location.hash;
        var routeTimeset = this.getTimesetFromRoute(currentRoute);
        store.removeAll();
        // TODO optimize, too many nested loops affects performance.
        // Ex. Where possible use break Ext.each by return false;
        Ext.Ajax.request({
            url: '/api/cfdestinationsets/?subscriber_id=' + localStorage.getItem('subscriber_id'),
            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                if (decodedResponse._embedded) {
                    var destinationsets = decodedResponse._embedded['ngcp:cfdestinationsets'];
                    destinationsets[0].destinations = me.sortDestinationsetByPriority(destinationsets[0].destinations);
                    Ext.each(cfTypeArrayOfObjects, function (cfTypeObjects, index) {
                        var cfType = cfTypes[index];
                        cfType !== 'cft' && me.addCftOwnPhone(destinationsets[0].destinations); // if 'cft' we invoke addCftOwnPhone()
                        Ext.each(cfTypeObjects, function(cfTypeObject) {
                            var destinationsetName = cfTypeObject.destinationset;
                            var sourcesetName = cfTypeObject.sourceset;
                            var timesetName = cfTypeObject.timeset;
                            if (timesetName == routeTimeset) {
                                var destinationSetNamesPushed = [];
                                Ext.each(destinationsets, function(destinationset) {
                                    // NOTE: Here we are iterating over all the desinationsets received from Ajax request to /ap/cfdestinationsets/?subscriber_id=??, and only pushing a model if name matches and it hasn't already had a destinationset name pushed with that name
                                    // NB: Because API can have duplicate names, we can not be sure we're getting the right destinationset here. We are always assuming it's the first one we receive in array in API response
                                    if (destinationset.name == destinationsetName && destinationSetNamesPushed.indexOf(destinationset.name)) {
                                        for (item in destinationset.destinations) {
                                            var destinationToDisplayInGrid = me.getDestinationFromSipId(destinationset.destinations[item].destination);
                                            var destinationAnnouncementId = destinationset.announcement_id;
                                            var destination = destinationset.destinations[item].destination;
                                            var priority = destinationset.destinations[item].priority;
                                            var timeout = destinationset.destinations[item].timeout;
                                            var destinationId = destinationset.id;
                                            var destinationName = destinationset.name;
                                            // Removes timeout if destination is not a number
                                            var ringFor = !Ext.isNumber(parseInt(destinationToDisplayInGrid)) ? '' : destinationset.destinations[item].timeout;
                                            var cbModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                                                type: cfType,
                                                destination_displayed: destinationToDisplayInGrid,
                                                destination: destination,
                                                destination_announcement_id: destinationAnnouncementId,
                                                priority: priority,
                                                timeout_displayed: ringFor,
                                                timeout: timeout,
                                                sourceset: sourcesetName,
                                                timeset: timesetName,
                                                destinationset_id: destinationId,
                                                destinationset_name: destinationName
                                            });
                                            arrayOfModels.push(cbModel);
                                            destinationSetNamesPushed.push(destinationset.name);
                                        }
                                    }
                                });
                            };
                        });
                    });
                    if (arrayOfModels.length > 0) {
                        me.populateDestinationStores(arrayOfModels);
                    };
                };
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    destinationIdExistsInArray: function (arr, id) {
        return arr.some(function(arrObj) {
            return id == arrObj.id;
        });
    },

    cfStoreBeforeSync: function(store, options) {
        var me = this;
        var vm = this.getViewModel();
        var recordsToSend = [];
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        Ext.each(store.getRange(), function(record) {
            var data = record.getData();
            if (data.destination !== 'own phone') {
                switch (recordsToSend.length === 0 || !me.destinationIdExistsInArray(recordsToSend, data.destinationset_id)) {
                    case true:
                        recordsToSend.push({id: data.destinationset_id, records: [{
                            "announcement_id": null,
                            "destination": data.destination,
                            "priority": data.priority,
                            "timeout": data.timeout }]});
                        break;
                    case false:
                        recordsToSend.forEach(function (obj, index) {
                            if (obj.id == data.destinationset_id) {
                                recordsToSend[index].records.push({
                                    "announcement_id": null,
                                    "destination": data.destination,
                                    "priority": data.priority,
                                    "timeout": data.timeout });
                            };
                        });
                        break;
                };
            };
        });
        Ext.each(recordsToSend, function (obj) {
            Ext.Ajax.request({
                url: '/api/cfdestinationsets/' + obj.id,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json-patch+json' },
                jsonData: [{
                    "op": "add",
                    "path": "/destinations",
                    "value": obj.records
                }],
                success: function(response, opts) {
                    // TODO: See if you can refactor this immediate code, as
                    // well as helper functions and logic you are hooking into
                    // as part of this - keeping in mind the scope of this story
                    // is the reordering part (perhaps loading indicator would
                    // be helpful when switching between modules to show that we
                    // are in the process of reloading the grids/store)
                    var currentRoute = window.location.hash;
                    var routeTimeset = me.getTimesetFromRoute(currentRoute);
                    var storeSuffix = !routeTimeset ? 'Always' : routeTimeset.replace(/\s/, '');
                    var currentStoreName = 'CallForward' + storeSuffix;
                    Ext.getStore(currentStoreName).load();
                    vm.set('last_store_synced', currentStoreName);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        });
        return false;
    },

    cfReLoadStore: function () {
        var me = this;
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var routeTimeset = me.getTimesetFromRoute(currentRoute);
        var storeSuffix = !routeTimeset ? 'Always' : routeTimeset.replace(/\s/, '');
        var currentStoreName = 'CallForward' + storeSuffix;
        if (vm.get('last_store_synced').length > 0 && currentStoreName !== vm.get('last_store_synced')) {
            Ext.getStore(currentStoreName).load();
        };
    },

    cfSourcesetBeforeSync: function (store, options) {
        // Using Ajax request here as we are using different url
        // params for PATCH compared to GET
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        var sourcesetId = store.last().get('sourceset_id');
        var recordsToSend = [];
        Ext.each(store.getRange(), function (record) {
            var data = record.getData();
            recordsToSend.push({ "source": data.source });
        });
        Ext.Ajax.request({
            url: '/api/cfsourcesets/' + sourcesetId,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json-patch+json' },
            jsonData: [{
                "op": "add",
                "path": "/sources",
                "value": recordsToSend
            }],
            success: function(response, opts) {
                store.commitChanges();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        return false;
    },

    cfTimesetBeforeSync: function (store, options) {
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        return false;
    },

    getDestinationFromSipId: function (destination) {
        var splitDestination = destination === 'own phone' ? [null, null, 'own phone', null, null] : destination.split(/(:|@)/);
        switch (splitDestination[4]) {
            case 'voicebox.local':
                return 'Voicemail';
                break;
            case 'conference.local':
                return 'Conference';
                break;
            case 'fax2mail.local':
                return 'Fax2Mail';
                break;
            default:
                // Returns parsed destination URI/Number types to make them
                // human readable in grid, as well as for any app.local types
                // that might exist (callingcard, callthrough, autoattendant,
                // officehours, customhours, localuser)
                if (!Ext.isNumber(parseInt(splitDestination[2]))) {
                    return Ext.util.Format.capitalize(splitDestination[2]);
                } else {
                    return splitDestination[2];
                };
        };
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
        };
    },

    getTypeFromTypeName: function (type) {
        switch (type) {
            case 'Online':
                return 'cfu';
                break;
            case 'Busy':
                return 'cfb';
                break;
            case 'Offline':
                return 'cfna';
                break;
        };
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
        };
    },

    getSourceSetFromSourceName: function (sourceset) {
        switch (sourceset) {
            case 'listA':
                return 'List A';
                break;
            case 'listB':
                return 'List B';
                break;
            case null:
                return null;
                break;
        };
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

    getTimeSetFromTimeSource: function (timeset) {
        switch (timeset) {
            case 'afterHours':
                return 'After Hours';
                break;
            case 'companyHours':
                return 'Company Hours';
                break;
            case null:
                return null;
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

    setLabelTerminationType: function (store) {
        var terminationPositionRecord = store.findRecord('destination_displayed', /(Voicemail|Fax2Mail|Conference|Custom-hours|Office-hours|Auto-attendant|Callthrough|Callingcard)/);
        var storeCount = store.getCount();
        // Sets after_termination value for all records after first non-number
        if (terminationPositionRecord && terminationPositionRecord.get('destination_displayed')) {
            var terminationPositionIndex = store.indexOf(terminationPositionRecord);
            var terminationTrueIndexRange = [];
            var terminationFalseIndexRange = [];
            for (i = terminationPositionIndex+1; i < storeCount; i++) {
                terminationTrueIndexRange.push(i);
            };
            for (i = terminationPositionIndex; i >= 0; i--) {
                terminationFalseIndexRange.push(i);
            };
            terminationTrueIndexRange.map(function (index) {
                store.getAt(index).set('after_termination', true);
            });
            terminationFalseIndexRange.map(function (index) {
                store.getAt(index).set('after_termination', false);
            });
        };
        // Set all cft records to after_termination true if cfu records exist
        if (store.findRecord('type', 'cfu') && store.findRecord('type', 'cft')) {
            Ext.each(store.getRange(), function(record) {
                if (!record.get('after_termination') && record.get('type') === 'cft') {
                    record.set('after_termination', true);
                };
            });
        };
        // Sorts "own phone" to top plus prevents it from being reordered
        Ext.each(store.getRange(), function(record) {
            if (record.get('destination') === 'own phone') {
                record.set('label', 'first ring');
                record.set('after_termination', false);
                store.remove(record);
                store.insert(0, record);
            };
        });
        // Sets "first ring", "then forward to ..." and "" (empty) labels
        Ext.each(store.getRange(), function(record, index) {
            if (index === 0) {
                record.set('label', 'first ring');
            } else if (index === 1) {
                record.set('label', 'then forward to ...');
            } else {
                record.set('label', '');
            }
        });
    },

    populateDestinationStores: function (models) {
        var me = this;
        var store;
        var stores = [];
        Ext.each(models, function (model) {
            var sourcename = me.getSourceNameFromSourceSet(model.get('sourceset'));
            var timename = me.getTimeNameFromTimeSet(model.get('timeset'));
            var type = me.getGridCategoryFromType(model.get('type'));
            var storeName = sourcename + timename + type;
            store = Ext.getStore(storeName);
            if(!store._emptied){
                store.removeAll();
                store._emptied = true;
            }
            if (store) {
                store.add(model);
                stores.push(store);
            }
        });
        if (store) {
            Ext.each(stores, function (store) {
                store.commitChanges();
                me.setLabelTerminationType(store);
                store._emptied = false;
            });
        }
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

    editingPhoneDone: function(editor, context) {
        var record = context.record;
        var grid = context.grid;
        var store = grid.getStore();
        record.set("edit", false);
        grid.getView().refresh();
        store.sync();
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

    writeNewSourceToStore: function(grid) {
        var vm = this.getViewModel();
        var store = grid.getStore();
        var plugin = grid.getPlugin('celleditingSource');
        var newRowIndex = store.getCount() + 1;
        var record = store.last();
        var sourcesetName = grid.id.split('-')[0] == 'listA' ? 'List A' : 'List B';
        var listAId = null;
        var listBId = null;
        var listExistsInApi = false;
        Ext.Ajax.request({
            url: '/api/cfsourcesets/?subscriber_id=' + localStorage.getItem('subscriber_id'),
            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                if (decodedResponse._embedded) {
                    var sourcesets = decodedResponse._embedded['ngcp:cfsourcesets'];
                    Ext.each(sourcesets, function (destinationset, index) {
                        if (destinationset.name == 'List A') {
                            listAId = destinationset.id;
                        } else if (destinationset.name == 'List B') {
                            listBId = destinationset.id;
                        }
                        if (sourcesetName == 'List A' && listAId !== null) {
                            listExistsInApi = true;
                        } else if (sourcesetName == 'List B' && listBId !== null) {
                            listExistsInApi = true;
                        }
                    });
                };
                switch (!store.last()) {
                    case false:
                        if (record == null || (record.data.source !== ' ' && record.data.source !== '')) {
                            var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                                id: Ext.id(),
                                source: " ",
                                sourceset_name: record.get('sourceset_name'),
                                sourceset_id: record.get('sourceset_id'),
                                edit: true
                            });
                            store.add(cfSourcesetModel);
                        };
                        break;
                    case true: // if store empty we need to create new sourceset
                        switch (listExistsInApi) {
                            case true:
                                var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                                    id: Ext.id(),
                                    source: " ",
                                    sourceset_name: sourcesetName,
                                    sourceset_id: listAId || listBId,
                                    edit: true
                                });
                                store.add(cfSourcesetModel);
                                break;
                            case false:
                                var subscriberId = localStorage.getItem('subscriber_id');
                                Ext.Ajax.request({
                                    url: '/api/cfsourcesets/',
                                    method: 'POST',
                                    jsonData: {
                                        name: sourcesetName,
                                        subscriber_id: subscriberId
                                    },
                                    success: function(response, opts) {
                                        var sourcesetId = response.getResponseHeader('Location').split('/')[3];
                                        var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                                            id: Ext.id(),
                                            source: " ",
                                            sourceset_name: sourcesetName,
                                            sourceset_id: sourcesetId,
                                            edit: true
                                        });
                                        store.add(cfSourcesetModel);
                                    },
                                    failure: function(response, opts) {
                                        console.log('server-side failure with status code ' + response.status);
                                    }
                                });
                                break;
                        }
                        break;
                }
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            },

            callback: function () {
                plugin.startEditByPosition({
                    row: newRowIndex,
                    column: 0
                });
            }
        });
    },

    addEmptySourcesetRow: function(button) {
        var buttonIdSplit = button.id.split('-');
        var buttonPrefixOne = buttonIdSplit[0];
        var buttonPrefixTwo = buttonIdSplit[1];
        var buttonSuffix = buttonIdSplit[2];
        switch (buttonSuffix) {
            case 'addListAButton':
                var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-a-grid');
                this.writeNewSourceToStore(grid);
                break;
            case 'addListBButton':
                var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-b-grid');
                this.writeNewSourceToStore(grid);
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
        var me = this;
        var store = record.store;
        if (store) {
            store.remove(record);
            store.sync();
            me.setLabelTerminationType(store);
        };
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
        if (record.get('timeout_displayed') === '' && !Ext.isNumber(parseInt(value))) {
            return Ext.String.format('{0}', value);
        } else if (record.get('destination') === 'own phone') {
            return Ext.String.format('own phone and ring for {0} secs', record.get('timeout_displayed'));
        } else if (Ext.isNumber(parseInt(value))) {
            return Ext.String.format('+{0} and ring for {1} secs', value, record.get('timeout_displayed'));
        } else {
            return Ext.String.format('{0} and ring for {1} secs', value, record.get('timeout_displayed'));
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
                        me.fireEvent('showmessage', false, Ngcp.csc.locales.callforward.number_is_required[localStorage.getItem('languageSelected')]);
                        break;
                    case false:
                        me.writeNewDestinationToStore(targetStore, newDest, "");
                        me.hideThenFieldsByStoreName(vm, storeNameStripped);
                        break;
                };
                vm.set(storeNameCategory + '_then_number', '');
                break;
            case false:
                switch (Ext.isNumber(parseInt(newNumber))) {
                    case false:
                        me.fireEvent('showmessage', false, Ngcp.csc.locales.callforward.only_numbers_allowed[localStorage.getItem('languageSelected')]);
                        vm.set(storeNameCategory + '_then_number', '');
                        break;
                    case true:
                        var newTimeout = newDest === 'Number' ? vm.get(storeNameCategory + '_then_timeout') : '';
                        var newPhone = newDest === 'Number' ? newNumber : newDest;
                        me.writeNewDestinationToStore(targetStore, newPhone, parseInt(newTimeout));
                        vm.set(storeNameCategory + '_then_number', '');
                        me.hideThenFieldsByStoreName(vm, storeNameStripped);
                        break;
                };
                break;
        };
    },


    createNewStandardSet: function (url, name, subscriberId) {
        var vm = this.getViewModel();
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: {
                name: name,
                subscriber_id: subscriberId
            },
            success: function(response, opts) {
                switch (name) {
                    case 'List A':
                    vm.set('list_a_exists_in_api', true);
                    break;
                    case 'List B':
                    vm.set('list_b_exists_in_api', true);
                    break;
                    case 'After Hours':
                    vm.set('after_hours_exists_in_api', true);
                    break;
                    case 'Company Hours':
                    vm.set('company_hours_exists_in_api', true);
                    break;
                }
            }
        });
    },

    createNewMapping: function (subscriberId, newType, newDestinationsetName, newSourceset, newTimeset) {
        Ext.Ajax.request({
            url: '/api/cfmappings/' + subscriberId,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json-patch+json' },
            jsonData: [{
                "op": "add",
                "path": "/" + newType,
                "value": [{ "destinationset": newDestinationsetName, "sourceset": newSourceset, "timeset": newTimeset }]
            }]
        });
    },

    writeNewDestinationToStore: function (store, destination, timeout) {
        var me = this;
        var vm = this.getViewModel();
        var simpleDestination = destination;
        var priority = 1;
        var storeCount = store.getCount();
        // Removes timeout if destination is not a number
        var ringFor = !Ext.isNumber(parseInt(destination)) ? '' : timeout;
        var storeIdSplit = store.storeId.split('-');
        var newSourcesetName = storeIdSplit[0] == 'everybody' ? null : storeIdSplit[0];
        var newTimesetName = storeIdSplit[1] == 'always' ? null : storeIdSplit[1];
        var newTypeName = storeIdSplit[2].slice(11);
        var newSourceset = this.getSourceSetFromSourceName(newSourcesetName);
        var newTimeset = this.getTimeSetFromTimeSource(newTimesetName);
        var newType = this.getTypeFromTypeName(newTypeName);
        var newDestination = destination === 'Voicemail' ? 'voicebox' : destination.toLowerCase();
        // TODO: Sets default timeout to 10 for non-number types, as can not be
        // set to null. Not sure if this has any implication, so needs to be
        // checked with Andreas
        var newTimeout = !timeout ? '10' : timeout;
        if (!store.last()) { // if store empty we need to create new destset
            var newDestinationsetName = 'csc_defined_' + newType;
            var subscriberId = localStorage.getItem('subscriber_id');
            Ext.Ajax.request({
                url: '/api/cfdestinationsets/',
                method: 'POST',
                jsonData: {
                    name: newDestinationsetName,
                    subscriber_id: subscriberId
                },
                success: function(response, opts) {
                    var destinationsetId = response.getResponseHeader('Location').split('/')[3];
                    var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                        type: newType,
                        destination_displayed: destination,
                        destination: newDestination,
                        timeout_displayed: ringFor,
                        timeout: newTimeout,
                        sourceset: newSourceset,
                        timeset: newTimeset,
                        destinationset_id: destinationsetId,
                        destinationset_name: newDestinationsetName
                    });
                    store.add(cfModel);
                    me.setLabelTerminationType(store);
                    store.sync();
                    // Creates new sourceset/timeset if variable is not set to null
                    newSourceset && me.createNewStandardSet('/api/cfsourcesets/', newSourceset, subscriberId);
                    newTimeset && me.createNewStandardSet('/api/cftimesets/', newTimeset, subscriberId);
                    me.createNewMapping(subscriberId, newType, newDestinationsetName, newSourceset, newTimeset);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        } else {
            var lastRecordInStore = store.last();
            var afterTermination = false;
            switch (true) {
                case (!lastRecordInStore.get('after_termination') && !Ext.isNumber(parseInt(lastRecordInStore.get('destination_displayed')))):
                    afterTermination = true;
                    break;
                case (lastRecordInStore.get('after_termination')):
                    afterTermination = true;
                    break;
            };
            var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                type: lastRecordInStore.get('type'),
                destination_displayed: destination,
                destination: newDestination,
                after_termination: afterTermination,
                priority: lastRecordInStore.get('priority'),
                timeout_displayed: ringFor,
                timeout: newTimeout,
                sourceset: lastRecordInStore.get('sourceset'),
                timeset: lastRecordInStore.get('timeset'),
                destinationset_id: lastRecordInStore.get('destinationset_id'),
                destinationset_name: lastRecordInStore.get('destinationset_name')
            });
            store.add(cfModel);
            me.setLabelTerminationType(store);
            store.sync();
        }
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

    saveTimesetGrid: function(el) {
        var storeName = el.id.split('-')[0] + '-Timeset';
        var store = Ext.getStore(storeName);
        store.sync();
    }

});
