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
                cfStoreBeforeSync: 'cfStoreBeforeSync',
                cfSourcesetBeforeSync: 'cfSourcesetBeforeSync',
                cfTimesetBeforeSync: 'cfTimesetBeforeSync'
            }
        }
    },

    // TODO Review feedback - make it work with no data for destinations, mappings,
    // sourceset and timeset. Should also be able to create destinations/mappings,
    // and sourcesets and if none exist in the first place. See XXX HERE below

    destinationDropped: function (node, data, overModel, dropPosition, eOpts) {
        // TODO: Leaving uncommented code here for upcoming task #17654
        // var store = Ext.getStore('everybody-always-CallForwardBusy');
        // Ext.each(store.getRange(), function(record) {
            // console.log(record.get('destination_cleaned'));
        // })
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
            if (timesetName == 'After Hours' || timesetName == 'Company Hours') {
                var times = me.getModelValuesFromTimesData(timeset.times[0]);
                Ext.each(times.days, function (weekday) {
                    var cfModel = Ext.create('NgcpCsc.model.CallForward', {
                        id: Ext.id(),
                        timeset_name: timesetName,
                        timeset_id: timesetId,
                        time_from: times.timeFrom,
                        time_to: times.timeTo,
                        day: weekday,
                        closed: false   // TODO: #18401 decide if we should keep
                                        // this, or solve this differently.
                                        // Right now it has no function, but
                                        // could maybe enable removing of days
                                        // from timeset. Not an original req, so
                                        // should be fine removing it completely
                                        // for now, and implement if specs
                    });
                    arrayOfModels.push(cfModel);
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
        var sourcesets;
        if (data.getData()._embedded == undefined) {
            return;
        } else {
            sourcesets = data.getData()._embedded['ngcp:cfsourcesets'];
        }
        store.removeAll();
        Ext.each(sourcesets, function (sourceset) {
            var sourcesetName = sourceset.name;
            var sourcesetId = sourceset.id;
            Ext.each(sourceset.sources, function (sourceEntry) {
                var cfModel = Ext.create('NgcpCsc.model.CallForward', {
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
        var timesets;
        if (data.getData()._embedded == undefined || me.getView()._preventReLoad) {
            return;
        }
        // if (me.getView()._preventReLoad) {
        //     return;
        // }
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

    destinationIdExistsInArray: function (arr, id) {
        return arr.some(function(arrObj) {
            return id == arrObj.id;
        });
    },

    cfStoreBeforeSync: function(store, options) {
        // TODO: #17654 Ensure we also have ability to display and write all
        // required destination types, like voicemail, fax, conference, etc
        var me = this;
        var recordsToSend = [];
        delete options['destroy'];
        delete options['create'];
        Ext.each(store.getRange(), function(record) {
            var data = record.getData();
            switch (recordsToSend.length === 0 || !me.destinationIdExistsInArray(recordsToSend, data.destinationset_id)) {
                case true:
                    recordsToSend.push({id: data.destinationset_id, records: [{ "announcement_id": null, "destination": data.simple_destination, "priority": data.priority, "timeout": data.ring_for }]});
                    break;
                case false:
                    recordsToSend.forEach(function (obj, index) {
                        if (obj.id == data.destinationset_id) {
                            recordsToSend[index].records.push({ "announcement_id": null, "destination": data.simple_destination, "priority": data.priority, "timeout": data.ring_for });
                        }
                    })
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
                    store.commitChanges();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        });
        return false;
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

    timesBasedOnRecords: function (store) {
        // TODO: Started this, but then discovered the issue leading to creation
        // of #18401. Leaving the code in place for upcoming task #18401
        var recordsToSend = [];
        Ext.each(store.getRange(), function(record) {
            var data = record.getData();
            // console.log(data.time_from);
            // console.log(data.time_to);
            // For fields of data that have been changed in the grid, data is in
            // this format:
            // Tue Jan 01 2008 13:00:00 GMT+0100 (CET)
        });
        return recordsToSend;
    },

    cfTimesetBeforeSync: function (store, options) {
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        var timesetId = store.last().get('timeset_id');
        // var recordsToSend = this.timesBasedOnRecords(store);
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

    populateDestinationStores: function (models) {
        var me = this;
        var gridName = this.getGridCategoryFromType(models[0].get('type'));
        var store;
        // TODO: #17654 New grid logic and styling with conditions for cft/cfu,
        // and remove first ring section
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

    saveEmptyToSourcesetStore: function(grid) {
        var store = grid.getStore();
        var plugin = grid.getPlugin('celleditingSource');
        var newRowIndex = store.getCount() + 1;
        var record = store.last();
        var sourcesetName = grid.id.split('-')[0] == 'listA' ? 'List A' : 'List B';
        var listAId = null;
        var listBId = null;
        var listExistsInApi = false;
        Ext.Ajax.request({
            url: window.location.origin + '/api/cfsourcesets/?subscriber_id=' + localStorage.getItem('subscriber_id'),
            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
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
                switch (store.last()) {
                    case true:
                        switch (record == null || (record.data.source !== ' ' && record.data.source !== '')) {
                            case true:
                                var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                                    id: Ext.id(),
                                    source: " ",
                                    sourceset_name: record.get('sourceset_name'),
                                    sourceset_id: record.get('sourceset_id'),
                                    edit: true
                                });
                                store.add(cfSourcesetModel);
                                break;
                        }
                        break;
                    case false:
                        switch (listExistsInApi) {
                            case false:
                                var subscriberId = localStorage.getItem('subscriber_id');
                                Ext.Ajax.request({
                                    url: window.location.origin + '/api/cfsourcesets/',
                                    method: 'POST',
                                    jsonData: {
                                        name: sourcesetName,
                                        subscriber_id: subscriberId
                                    },
                                    success: function(response, opts) {
                                        var sourcesetId = response.getResponseHeader('Location').split('/')[3];
                                        var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForward', {
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
                        }
                        break;
                }
                // if (!store.last() && !listExistsInApi) {
                //     var subscriberId = localStorage.getItem('subscriber_id');
                //     Ext.Ajax.request({
                //         url: window.location.origin + '/api/cfsourcesets/',
                //         method: 'POST',
                //         jsonData: {
                //             name: sourcesetName,
                //             subscriber_id: subscriberId
                //         },
                //         success: function(response, opts) {
                //             var sourcesetId = response.getResponseHeader('Location').split('/')[3];
                //             var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForward', {
                //                 id: Ext.id(),
                //                 source: " ",
                //                 sourceset_name: sourcesetName,
                //                 sourceset_id: sourcesetId,
                //                 edit: true
                //             });
                //             store.add(cfSourcesetModel);
                //         },
                //         failure: function(response, opts) {
                //             console.log('server-side failure with status code ' + response.status);
                //         }
                //     });
                // } else if (!store.last() && listExistsInApi) {
                //     var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                //         id: Ext.id(),
                //         source: " ",
                //         sourceset_name: sourcesetName,
                //         sourceset_id: listAId || listBId,
                //         edit: true
                //     });
                //     store.add(cfSourcesetModel);
                // } else if (record == null || (record.data.source !== ' ' && record.data.source !== '')) {
                //     var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
                //         id: Ext.id(),
                //         source: " ",
                //         sourceset_name: record.get('sourceset_name'),
                //         sourceset_id: record.get('sourceset_id'),
                //         edit: true
                //     });
                //     store.add(cfSourcesetModel);
                // };
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
                this.saveEmptyToSourcesetStore(grid);
                break;
            case 'addListBButton':
                var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-b-grid');
                this.saveEmptyToSourcesetStore(grid);
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
            store.sync();
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
                        me.writeNewDestinationToStore(targetStore, newDest, "");
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
                        me.writeNewDestinationToStore(targetStore, newPhone, parseInt(newTimeout));
                        vm.set(storeNameCategory + '_then_number', '');
                        me.hideThenFieldsByStoreName(vm, storeNameStripped);
                        break;
                };
                break;
        };
    },

    writeNewDestinationToStore: function (store, destination, timeout) {
        var simpleDestination = destination;
        var priority = 1;
        var storeCount = store.getCount();
        var ringFor = destination == 'Voicemail' ? '' : timeout;
        var destinationCleaned = destination;
        var storeIdSplit = store.storeId.split('-');
        var newSourcesetName = storeIdSplit[0] == 'everybody' ? null : storeIdSplit[0];
        var newTimesetName = storeIdSplit[1] == 'always' ? null : storeIdSplit[1];
        var newTypeName = storeIdSplit[2].slice(11);
        var newSourceset = this.getSourceSetFromSourceName(newSourcesetName);
        var newTimeset = this.getTimeSetFromTimeSource(newTimesetName);
        var newType = this.getTypeFromTypeName(newTypeName);
        var newDomain = localStorage.getItem('domain');
        // TODO: #17654 Consider the fact that one destinationset can be in
        // several grids, so if you write one, update all other grids with
        // that same destinationset id
        if (!store.last()) { // if store empty we need to create new destset
            var newDestinationsetName = 'csc_defined_' + newType;
            var subscriberId = localStorage.getItem('subscriber_id');
            Ext.Ajax.request({
                url: window.location.origin + '/api/cfdestinationsets/',
                method: 'POST',
                jsonData: {
                    name: newDestinationsetName,
                    subscriber_id: subscriberId
                },
                success: function(response, opts) {
                    var destinationsetId = response.getResponseHeader('Location').split('/')[3];
                    var cfModel = Ext.create('NgcpCsc.model.CallForward', {
                        type: newType,
                        destination_cleaned: destinationCleaned,
                        destination_announcement_id: null,
                        destination: 'sip:' + destination + '@' + newDomain,
                        // Keeping priority 1 as default for now, as we'll handle priotity
                        // with grid "drag-and-drop" widget plugin in upcoming task
                        priority: 1,
                        simple_destination: destination,
                        ring_for: ringFor,
                        sourceset: newSourceset,
                        timeset: newTimeset,
                        destinationset_id: destinationsetId,
                        destinationset_name: newDestinationsetName
                    });
                    // TODO: #17654 We need to also do an ajax request cfmappings to
                    // map this destinationset under right type (cfu/cft, cfna
                    // to cfb) with sourceset and timeset. Don't know what to
                    // define cfu/cft type on, so will default to cfu for now
                    // XXX HERE
                    store.add(cfModel);
                    store.sync();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        } else {
            var lastRecordInStore = store.last();
            var cfModel = Ext.create('NgcpCsc.model.CallForward', {
                type: lastRecordInStore.get('type'),
                destination_cleaned: destinationCleaned,
                destination_announcement_id: null,
                destination: 'sip:' + destination + '@' + newDomain,
                priority: 1,
                simple_destination: destination,
                ring_for: ringFor,
                sourceset: lastRecordInStore.get('sourceset'),
                timeset: lastRecordInStore.get('timeset'),
                destinationset_id: lastRecordInStore.get('destinationset_id'),
                destinationset_name: lastRecordInStore.get('destinationset_name')
            });
            store.add(cfModel);
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

    // TODO #18401, maybe use a blur or change listener on editors in grid
    // editingTimeDone: function () {
    //
    // }

});
