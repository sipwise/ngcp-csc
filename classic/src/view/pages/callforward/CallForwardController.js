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
        var adjacentRec = dropPosition === 'before' ? store.getAt(recIndex + 1) : store.getAt(recIndex - 1);
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

    checkIncompatibleTimeset: function(timeSlot) {
        var mday = timeSlot.mday;
        var minute = timeSlot.minute;
        var month = timeSlot.month;
        var year = timeSlot.year;
        return mday || minute || month || year;
    },

    parseTimesetApiToRecords: function(times, timesetName, timesetId) {
        var retData = [];
        var me = this;
        var vm = me.getViewModel();
        var weekDaysMap = {
            1: 'Sunday',
            2: 'Monday',
            3: 'Tuesday',
            4: 'Wednesday',
            5: 'Thursday',
            6: 'Friday',
            7: 'Saturday'
        };
        Ext.each(times, function(timeSlot) {
            var checkIncompatibleTimeset = me.checkIncompatibleTimeset(timeSlot);
            if (checkIncompatibleTimeset || !timeSlot.wday || !timeSlot.hour) {
                vm.set(me.getTimesetPrexifFromName(timesetName) + '_add_text', '<div class="cf-invalid-period-box">' + Ngcp.csc.locales.callforward.invalid_times[localStorage.getItem('languageSelected')] + '</div>');
                vm.set(me.getTimesetPrexifFromName(timesetName) + '_is_invalid', timesetId);
                return;
            }
            var days =  timeSlot.wday.split('-');
            var fromHour = timeSlot.hour ? parseInt(timeSlot.hour.split('-')[0]) : null;
            var toHour = timeSlot.hour ? parseInt(timeSlot.hour.split('-')[1]) : null;

            if (days.length > 1) {
                var fromDay = parseInt(days[0]);
                var toDay = parseInt(days[1]);
                while (fromDay < toDay) {
                    days.push(fromDay.toString())
                    fromDay++;
                }
            }
            days = Ext.Array.unique(days).sort();
            Ext.each(days, function(day) {
                retData.push({
                    day: weekDaysMap[day],
                    dayArrIndex: parseInt(day), // needed for sorting
                    timeFrom: fromHour ? fromHour.toString() : null,
                    timeTo: toHour ? toHour.toString() : null
                });
            });
        });
        return Ext.Array.sort(retData, this.sortTimeSlots);
    },

    sortTimeSlots: function(timeSlot1, timeSlot2) {
        switch (true) {
            case timeSlot1.dayArrIndex < timeSlot2.dayArrIndex:
                return -1;
                break;
            case timeSlot1.dayArrIndex > timeSlot2.dayArrIndex:
                return 1;
                break;
            default:
                return 0;
        }
    },

    unmaskDestinationGrids: function() {
        var stores = this.getStoresByStatus('all');
        var moduleName = this.getModuleFromRoute();
        Ext.each(stores.keys, function(storeName) {
            if (storeName.indexOf(moduleName) > -1) {
                var grid = Ext.getCmp(storeName);
                if (grid && grid.body) {
                    grid.unmask();
                }
            }
        });
    },

    cfTimesetStoreLoaded: function(store, data) {
        var me = this;
        var arrayOfModels = [];
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var timesets;

        if (data.getData()._embedded == undefined) {
            return;
        } else {
            timesets = data.getData()._embedded['ngcp:cftimesets'];
        }
        store.removeAll();
        Ext.each(timesets, function(timeset) {
            var timesetName = timeset.name;
            var timesetId = timeset.id;
            if (/(After|Company)\s(Hours)/.test(timesetName)) {
                var times = me.parseTimesetApiToRecords(timeset.times, timesetName, timeset.id);
                Ext.each(times, function(time) {
                    var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                        id: Ext.id(),
                        timeset_name: timesetName,
                        timeset_id: timesetId,
                        time_from: time.timeFrom,
                        time_to: time.timeTo,
                        day: time.day
                    });
                    arrayOfModels.push(cfModel);
                    me.setVm(timesetName, true);
                });
            };
        });
        if (arrayOfModels.length > 0) {
            me.populateTimesetStores(arrayOfModels);
        } else {
            me.setVm(me.getTimesetFromRoute(currentRoute), false);
        }
    },

    setVm: function(name, exists) {
        var vm = this.getViewModel();
        switch (name) {
            case 'After Hours':
                vm.set('after_hours_exists_in_api', exists);
                break;
            case 'Company Hours':
                vm.set('company_hours_exists_in_api', exists);
                break;
        };
    },

    cfSourcesetStoreLoaded: function(store, data) {
        var $cf = this;
        var arrayOfModels = [];
        if (data.getData()._embedded) {
            var sourcesets = data.getData()._embedded['ngcp:cfsourcesets'];
            store.removeAll();
            store._sourcesets = sourcesets;
            Ext.each(sourcesets, function(sourceset) {
                var sourcesetName = sourceset.name;
                var sourcesetId = sourceset.id;
                Ext.each(sourceset.sources, function(sourceEntry) {
                    arrayOfModels.push(Ext.create('NgcpCsc.model.CallForwardDestination', {
                        id: Ext.id(),
                        sourceset_name: sourcesetName,
                        sourceset_id: sourcesetId,
                        source: sourceEntry.source
                    }))
                });
            });
        }
        $cf.createSourcesetTabs(sourcesets);
        Ext.defer(function() {
            $cf.populateSourcesetStores(arrayOfModels);
        }, 100)
    },

    getTimesetFromRoute: function() {
        var route = window.location.hash;
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

    getTimesetPrexifFromName: function(timesetName) {
        switch (timesetName) {
            case ('Company Hours'):
                return 'company_hours';
                break;
            case ('After Hours'):
                return 'after_hours';
                break;
        };
    },

    getStoreNameFromRoute: function(route) {
        switch (route) {
            case ('#callforward/always'):
                return 'CallForwardAlways';
                break;
            case ('#callforward/afterhours'):
                return 'CallForwardAfterHours';
                break;
            case ('#callforward/companyhours'):
                return 'CallForwardCompanyHours';
                break;
        };
    },

    sortDestinationsetByPriority: function(destinations) {
        var sorted = destinations.sort(function(a, b) {
            return parseFloat(a.priority) - parseFloat(b.priority);
        });
        return sorted;
    },

    addCftOwnPhone: function(destinations, timeout) {
        if (destinations.length > 0) {
            destinations.unshift({
                "announcement_id": null,
                "destination": "own phone",
                "priority": 1,
                "timeout": timeout
            })
        }
    },

    hasMappings: function(mapping) {
        return mapping.length !== 0;
    },

    buildArrayOfModels: function(cfMappings, cfType, routeTimeset, cfdestinationsets, cftRingTimeout, arrayOfModels, hasCftAndCfuMappings) {
        var $cf = this;
        Ext.each(cfMappings, function(mapping, j) {
            var currentMapping = {};
            currentMapping.destinationsetName = mapping.destinationset;
            currentMapping.sourcesetName = mapping.sourceset;
            currentMapping.timesetName = mapping.timeset;
            if (currentMapping.timesetName == routeTimeset) {
                Ext.each(cfdestinationsets, function(cfdestinationset) {
                    if (cfType.match(/(cfb|cfna)/) || cfType === 'cfu' && cfMappings[0].destinationset === mapping.destinationset || !hasCftAndCfuMappings && cfType === 'cft') {
                        // _modelCreated check in place to make sure we don't add the destinationset more
                        // than one time if the cftype already has that destinationset added as model
                        if (cfdestinationset.name == currentMapping.destinationsetName && !currentMapping._modelCreated) {
                            cfdestinationset.destinations = $cf.sortDestinationsetByPriority(cfdestinationset.destinations);
                            if (cfType === 'cft' && cfMappings[0].destinationset === mapping.destinationset) {
                                $cf.addCftOwnPhone(cfdestinationset.destinations, cftRingTimeout);
                            };
                            for (item in cfdestinationset.destinations) {
                                var destinationToDisplayInGrid = $cf.getDestinationFromSipId(cfdestinationset.destinations[item].destination);
                                // Removes timeout if destination is not a number
                                var ringFor = !Ext.isNumber(parseInt(destinationToDisplayInGrid)) ? '' : cfdestinationset.destinations[item].timeout;
                                var cbModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                                    type: cfType,
                                    destination_displayed: destinationToDisplayInGrid,
                                    destination: cfdestinationset.destinations[item].destination,
                                    destination_announcement_id: cfdestinationset.announcement_id,
                                    priority: cfdestinationset.destinations[item].priority,
                                    timeout_displayed: ringFor,
                                    timeout: cfdestinationset.destinations[item].timeout,
                                    sourceset: currentMapping.sourcesetName,
                                    timeset: currentMapping.timesetName,
                                    destinationset_id: cfdestinationset.id,
                                    destinationset_name: cfdestinationset.name
                                });
                                arrayOfModels.push(cbModel);
                                currentMapping._modelCreated = true;
                            }
                        }
                    };
                });
            };
        });
    },

    cfStoreLoaded: function(store, data) {
        var $cf = this;
        var $vm = this.getViewModel();
        var cfuMappings = data.get('cfu');
        var cftMappings = data.get('cft');
        var cfbMappings = data.get('cfb');
        var cfnaMappings = data.get('cfna');
        var cftRingTimeout = data.get('cft_ringtimeout');
        var hasCftAndCfuMappings = $cf.hasMappings(cfuMappings) && $cf.hasMappings(cftMappings);
        var timeset = store._type;
        var arrayOfModels = [];
        $vm.set('destStoresPopulated', false);
        var routeTimeset = this.getTimesetFromRoute();
        $vm.set('cft_ringtimeout', cftRingTimeout);
        store.removeAll();
        Ext.Ajax.request({
            url: '/api/cfdestinationsets/?rows=100&subscriber_id=' + localStorage.getItem('subscriber_id'),
            success: function(response, opts) {
                var decodedResponse = Ext.decode(response.responseText);
                if (decodedResponse._embedded) {
                    var cfdestinationsets = decodedResponse._embedded['ngcp:cfdestinationsets'];
                    $cf.buildArrayOfModels(cfbMappings, 'cfb', routeTimeset, cfdestinationsets, cftRingTimeout, arrayOfModels);
                    $cf.buildArrayOfModels(cfuMappings, 'cfu', routeTimeset, cfdestinationsets, cftRingTimeout, arrayOfModels);
                    $cf.buildArrayOfModels(cftMappings, 'cft', routeTimeset, cfdestinationsets, cftRingTimeout, arrayOfModels, hasCftAndCfuMappings);
                    $cf.buildArrayOfModels(cfnaMappings, 'cfna', routeTimeset, cfdestinationsets, cftRingTimeout, arrayOfModels);
                    $cf.addOwnPhoneToEmptyOnline();
                    if (arrayOfModels.length > 0) {
                        $vm.set('arrayOfDestModels', arrayOfModels);
                        $cf.populateDestinationStores();
                    };
                    $cf.unmaskDestinationGrids();
                };
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    hasDestinationWithId: function(arr, id) {
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
                switch (recordsToSend.length === 0 || !me.hasDestinationWithId(recordsToSend, data.destinationset_id)) {
                    case true:
                        // if recordsToSend array is empty or recordsToSend does not already contain current destinationset already
                        if (data.timeout) {
                            recordsToSend.push({
                                id: data.destinationset_id,
                                records: [{
                                    "announcement_id": null,
                                    "destination": data.destination,
                                    "priority": data.priority,
                                    "timeout": data.timeout
                                }]
                            });
                        } else {
                            recordsToSend.push({
                                id: data.destinationset_id,
                                records: [{
                                    "announcement_id": null,
                                    "destination": data.destination,
                                    "priority": data.priority
                                }]
                            });
                        };
                        break;
                    case false:
                        // if destinationset has already been added to recordsToSend, push to the records field for that destinationset,
                        // building up an array of destination objects to write to API
                        recordsToSend.forEach(function(obj, index) {
                            if (obj.id == data.destinationset_id) {
                                if (data.timeout) {
                                    recordsToSend[index].records.push({
                                        "announcement_id": null,
                                        "destination": data.destination,
                                        "priority": data.priority,
                                        "timeout": data.timeout
                                    });
                                } else {
                                    recordsToSend[index].records.push({
                                        "announcement_id": null,
                                        "destination": data.destination,
                                        "priority": data.priority
                                    });
                                };
                            };
                        });
                        break;
                };
            };
        });
        if (recordsToSend.length === 0) { // handles cases where last destination in store is deleted
            var destinationsetId = store.removed[0].data.destinationset_id;
            Ext.Ajax.request({
                url: '/api/cfdestinationsets/' + destinationsetId,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json-patch+json'
                },
                jsonData: [{
                    "op": "add",
                    "path": "/destinations",
                    "value": []
                }],
                success: function(response, opts) {
                    var currentRoute = window.location.hash;
                    var currentStoreName = me.getStoreNameFromRoute(currentRoute);
                    Ext.getStore(currentStoreName).load();
                    vm.set('last_store_synced', currentStoreName);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        } else {
            Ext.each(recordsToSend, function(obj) {
                Ext.Ajax.request({
                    url: '/api/cfdestinationsets/' + obj.id,
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json-patch+json'
                    },
                    jsonData: [{
                        "op": "add",
                        "path": "/destinations",
                        "value": obj.records
                    }],
                    success: function(response, opts) {
                        var currentRoute = window.location.hash;
                        var currentStoreName = me.getStoreNameFromRoute(currentRoute);
                        Ext.getStore(currentStoreName).load();
                        vm.set('last_store_synced', currentStoreName);
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            });
        };
        return false;
    },

    cfReLoadStore: function() {
        var me = this;
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var currentStoreName = me.getStoreNameFromRoute(currentRoute);
        if (vm.get('last_store_synced').length > 0 && currentStoreName !== vm.get('last_store_synced')) {
            Ext.getStore(currentStoreName).load();
        };
    },

    cfSourcesetBeforeSync: function(store, options) {
        // Using Ajax request here as we are using different url
        // params for PATCH compared to GET
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        var sourcesetId = store._sourcesetListId;
        var recordsToSend = [];
        Ext.each(store.getRange(), function(record) {
            var data = record.getData();
            recordsToSend.push({
                "source": data.source
            });
        });
        Ext.Ajax.request({
            url: '/api/cfsourcesets/' + sourcesetId,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
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
    createTimesetReq: function(timesetName, subscriberId, store) {
        var me = this;
        Ext.Ajax.request({
            url: '/api/cftimesets/',
            method: 'POST',
            jsonData: {
                name: timesetName,
                subscriber_id: subscriberId,
                times: [{
                        wday: '1',
                        hour: '0'
                    }] // we need to create a default valid period
            },
            success: function(response, opts) {
                store.load();
            }
        });
    },

    createTimeset: function() {
        var vm = this.getViewModel();
        var me = this;
        var currentRoute = window.location.hash;
        var timesetName = me.getTimesetFromRoute(currentRoute);
        var subscriberId = localStorage.getItem('subscriber_id');
        var store = Ext.getStore(me.getModuleFromRoute() + '-Timeset');
        switch (true) {
            case !!vm.get(me.getTimesetPrexifFromName(timesetName) + '_is_invalid'):
                // if timeset is invalid it's deleted and recreated with the same name
                Ext.Ajax.request({
                    url: '/api/cftimesets/' + vm.get(me.getTimesetPrexifFromName(timesetName) + '_is_invalid'),
                    method: 'DELETE',
                    success: function(response, opts) {
                        vm.set(me.getTimesetPrexifFromName(timesetName) + '_is_invalid', null);
                        me.createTimesetReq(timesetName, subscriberId, store);
                    }
                });
                break;
            case !vm.get(me.getTimesetPrexifFromName(timesetName) + '_exists_in_api'):
                me.createTimesetReq(timesetName, subscriberId, store);
                break
            default:
                me.setVm(timesetName, true);
        }
    },

    cfTimesetBeforeSync: function(store, options) {
        // TODO
        delete options['destroy'];
        delete options['create'];
        delete options['update'];
        return false;
    },

    getDestinationFromSipId: function(destination) {
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

    getGridCategoryFromType: function(type) {
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

    getTypeFromTypeName: function(type, store) {
        switch (type) {
            case 'Online':
                if (store.getCount() === 1 && store.first().get('destination') === 'own phone') {
                    return 'cft';
                } else if (store.last()) {
                    return 'cfu';
                } else {
                    return 'cft';
                };
                break;
            case 'Busy':
                return 'cfb';
                break;
            case 'Offline':
                return 'cfna';
                break;
        };
    },

    getSourceNameFromSourceSet: function(sourceset) {
        switch (sourceset) {
            case null:
                return 'everybody-';
                break;
            default:
                return sourceset.replace(/ /g, '') + '-';
        }
    },

    getTimeNameFromTimeSet: function(timeset) {
        switch (timeset) {
            case 'After Hours':
                return 'afterhours-';
                break;
            case 'Company Hours':
                return 'companyhours-';
                break;
            case null:
                return 'always-';
                break;
        }
    },

    getTimeSetFromTimeSource: function(timeset) {
        switch (timeset) {
            case 'afterhours':
                return 'After Hours';
                break;
            case 'companyhours':
                return 'Company Hours';
                break;
            case null:
                return null;
                break;
        }
    },

    getModuleFromRoute: function() {
        var currentRoute = window.location.hash;
        switch (currentRoute) {
            case '#callforward/always':
                return 'always';
                break;
            case '#callforward/afterhours':
                return 'afterhours';
                break;
            case '#callforward/companyhours':
                return 'companyhours';
                break;
        };
    },

    getModelValuesFromTimesData: function(timesData) {
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
            var weekdaysArray = weekdayLiterals.slice(dayFrom - 1, dayTo);
            times.days = weekdaysArray;
        } else {
            times.days = null;
        };
        return times;
    },

    populateTimesetStores: function(models) {
        var vm = this.getViewModel();
        var moduleName = this.getModuleFromRoute();
        var store = Ext.getStore(moduleName + '-Timeset');
        if (store && store.getCount() === 0) {
            Ext.each(models, function(model) {
                if (moduleName == 'afterhours' && model.get('timeset_name') == 'After Hours') {
                    store.add(model);
                } else if (moduleName == 'companyhours' && model.get('timeset_name') == 'Company Hours') {
                    store.add(model);
                };
            });
            store.commitChanges();
            if (store.getCount() > 0) {
                vm.set(moduleName + '_hideMessage', true);
            };
        };
    },

    setLabelTerminationType: function(store) {
        var terminationPositionRecord = store.findRecord('destination_displayed', /(Voicemail|Fax2Mail|Conference|Custom-hours|Office-hours|Auto-attendant|Callthrough|Callingcard)/);
        var storeCount = store.getCount();
        // Sets after_termination value for all records after first non-number
        if (terminationPositionRecord && terminationPositionRecord.get('destination_displayed')) {
            var terminationPositionIndex = store.indexOf(terminationPositionRecord);
            var terminationTrueIndexRange = [];
            var terminationFalseIndexRange = [];
            for (i = terminationPositionIndex + 1; i < storeCount; i++) {
                terminationTrueIndexRange.push(i);
            };
            for (i = terminationPositionIndex; i >= 0; i--) {
                terminationFalseIndexRange.push(i);
            };
            terminationTrueIndexRange.map(function(index) {
                store.getAt(index).set('after_termination', true);
            });
            terminationFalseIndexRange.map(function(index) {
                store.getAt(index).set('after_termination', false);
            });
        };
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

    populateDestinationStores: function() {
        var $cf = this;
        var $vm = $cf.getViewModel();
        var store;
        var stores = [];
        var models = $vm.get('arrayOfDestModels');
        if (models && !$vm.get('destStoresPopulated')) {
            Ext.each(models, function(model) {
                var sourcename = $cf.getSourceNameFromSourceSet(model.get('sourceset'));
                var timename = $cf.getTimeNameFromTimeSet(model.get('timeset'));
                var type = $cf.getGridCategoryFromType(model.get('type'));
                var storeName = sourcename + timename + type;
                store = Ext.getStore(storeName);
                if (store) {
                    if (!store._emptied) {
                        store.removeAll();
                        store._emptied = true;
                    }
                    store.add(model);
                    stores.push(store);
                }
            });
            if (store) {
                Ext.each(stores, function(store) {
                    store.commitChanges();
                    $cf.setLabelTerminationType(store);
                    store._emptied = false;
                });
            };
            $vm.set('destStoresPopulated', true);
        };
    },

    getStoresByStatus: function(status) {
        var stores;
        switch (status) {
            case 'all':
                stores = Ext.data.StoreManager.filterBy(function(item, key) {
                    return (key.indexOf('CallForward') > -1);
                });
                break;
            case 'online':
                stores = Ext.data.StoreManager.filterBy(function(item, key) {
                    return (key.indexOf('CallForwardOnline') > -1);
                });
                break;
            case 'busy':
                stores = Ext.data.StoreManager.filterBy(function(item, key) {
                    return (key.indexOf('CallForwardBusy') > -1);
                });
                break;
            case 'offline':
                stores = Ext.data.StoreManager.filterBy(function(item, key) {
                    return (key.indexOf('CallForwardOffline') > -1);
                });
                break;
        };
        return stores;
    },

    addOwnPhoneToEmptyOnline: function() {
        var $cf = this;
        var $vm = $cf.getViewModel();
        var timeout = $vm.get('cftRingTimeout');
        var stores = $cf.getStoresByStatus('online');
        Ext.each(stores.getRange(), function(store) {
            if (!store.last()) {
                var cfModel = Ext.create('NgcpCsc.model.CallForwardDestination', {
                    type: 'cft',
                    destination: 'own phone',
                    destination_announcement_id: null,
                    priority: 1,
                    timeout: timeout
                });
                store.add(cfModel);
                $cf.setLabelTerminationType(store);
            };
        });
    },

    createSourcesetTabs: function(sourcesets) {
        var $cf = this;
        var $vm = this.getViewModel();
        var subscriberId = localStorage.getItem('subscriber_id');
        var cfTabPanels = Ext.ComponentQuery.query('[name=cfTab]');
        var moduleName = this.getModuleFromRoute();
        if (sourcesets && sourcesets.length > 0) {
            Ext.each(cfTabPanels, function(tabP) {
                if (tabP._tabId == moduleName) {
                    Ext.each(sourcesets, function(sourceset, index) {
                        var sourcesetName = sourceset.isModel ? sourceset.get('sourceset_name') : sourceset.name;
                        var sourcesetId = sourceset.isModel ? sourceset.get('sourceset_id') : sourceset.id;
                        var strippedSourcesetName = sourcesetName.replace(/ /g, '');
                        tabP._firstPrefixes.push(strippedSourcesetName + '-');
                        $vm.set('sourceset-' + sourcesetId + '-title', sourcesetName);
                        $vm.set('sourceset-' + sourcesetId + 'from-title', Ngcp.csc.locales.callforward.from[localStorage.getItem('languageSelected')] + sourcesetName);
                        $vm.set('sourceset-' + sourcesetId + '-titleField-value', '');
                        Ext.defer(function() {
                            if (Ext.ComponentQuery.query("[name=" + tabP._tabId + '-tab-' + strippedSourcesetName + "]").length < 1) {
                                var newTab = Ext.create('Ext.panel.Panel', {
                                    bind: {
                                        title: '{sourceset-' + sourcesetId + 'from-title}'
                                    },
                                    name: tabP._tabId + '-tab-' + strippedSourcesetName,
                                    id: (tabP._tabId + '-tab-' + strippedSourcesetName).toString(),
                                    items: [
                                        Ext.create('NgcpCsc.view.pages.callforward.CallForwardMainForm', {
                                            _isEverybody: false,
                                            _sourcesetStoreId: strippedSourcesetName,
                                            _sourcesetListName: sourcesetName,
                                            _sourcesetListId: sourcesetId,
                                            _firstprefix: tabP._firstPrefixes[index + 1],
                                            _secondprefix: tabP._secondprefix
                                        })
                                    ]
                                });
                                tabP.add(newTab);
                            }
                        }, 100);
                    });
                    return;
                }
            });
            $cf.populateDestinationStores();
        } else {
            var models = [];
            Ext.Ajax.request({
                url: '/api/cfsourcesets/',
                method: 'POST',
                jsonData: {
                    name: 'List A',
                    mode: 'whitelist',
                    subscriber_id: subscriberId
                },
                success: function(response, opts) {
                    var sourcesetId = response.getResponseHeader('Location').split('/')[3];
                    models.push(Ext.create('NgcpCsc.model.CallForwardDestination', {
                        id: Ext.id(),
                        sourceset_name: 'List A',
                        sourceset_id: sourcesetId
                    }));
                    Ext.Ajax.request({
                        url: '/api/cfsourcesets/',
                        method: 'POST',
                        jsonData: {
                            name: 'List B',
                            mode: 'whitelist',
                            subscriber_id: subscriberId
                        },
                        success: function(response, opts) {
                            var sourcesetId = response.getResponseHeader('Location').split('/')[3];
                            models.push(Ext.create('NgcpCsc.model.CallForwardDestination', {
                                id: Ext.id(),
                                sourceset_name: 'List B',
                                sourceset_id: sourcesetId
                            }));
                            $cf.createSourcesetTabs(models);
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },

    populateSourcesetStores: function(models) {
        var stores = {};
        Ext.each(models, function(model) {
            var tabId = model.get('sourceset_name');
            var strippedSourcesetName = tabId.replace(/ /g, '');
            if (!stores[strippedSourcesetName]) {
                stores[strippedSourcesetName] = [];
            }
            stores[strippedSourcesetName].push(model);
        });
        Ext.Object.each(stores, function(storeNameSuffix, models) {
            var store = Ext.getStore('CallForwardList_' + storeNameSuffix);
            store.removeAll();
            store.add(models);
            store.commitChanges();
        });
    },

    editingPhoneDone: function(editor, context) {
        var record = context.record;
        var grid = context.grid;
        var store = grid.getStore();
        record.set("edit", false);
        grid.getView().refresh();
        store.sync();
    },

    beforePhoneEdit: function(editor, context) {
        var record = context.record;
        var grid = context.grid;
        record.set("edit", true);
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
        var me = this;
        var vm = this.getViewModel();
        var buttonId = button.name;
        var keys = buttonId.split('-');
        Ext.Ajax.request({
            url: '/api/cfsourcesets/' + button._sourcesetListId,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            jsonData: [{
                "op": "replace",
                "path": "/name",
                "value": vm.get('sourceset-' + keys[0] + "-titleField-value")
            }],
            success: function(response, opts) {
                me.updateTabsTitles(keys[0]);
                me.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    updateTabsTitles: function(sourcesetId, sourcesetTitleValue) {
        var vm = this.getViewModel();
        var me = this;
        var cfTabPanels = Ext.ComponentQuery.query('[name=cfTab]');
        var moduleName = this.getModuleFromRoute();
        var newTitle = vm.get('sourceset-' + sourcesetId + "-titleField-value");

        Ext.each(cfTabPanels, function(tabP) { // every CF submodule has its own vm
            if (tabP._tabId !== moduleName) {
                me.updateVMTitle(tabP.up('callforward').getViewModel(), sourcesetId, newTitle);
            } else {
                me.updateVMTitle(vm, sourcesetId, newTitle);
            }
        });
    },

    updateVMTitle: function(vm, sourcesetId, sourcestTitleValue) {
        vm.set('sourceset-' + sourcesetId + "-title", sourcestTitleValue);
        vm.set('sourceset-' + sourcesetId + "from-title", Ngcp.csc.locales.callforward.from[localStorage.getItem('languageSelected')] + sourcestTitleValue);
        vm.set('sourceset-' + sourcesetId + "-titleField-value", "")
    },

    cancelNewTitle: function(button) {
        var vm = this.getViewModel();
        var buttonId = button.name;
        var keys = buttonId.split('-');
        vm.set('sourceset-' + keys[0] + "-titleField-value", "");
    },

    checkIndexOf: function(string, target) {
        return target.indexOf(string) > -1;
    },

    writeNewSourceToStore: function(grid) {
        var vm = this.getViewModel();
        var store = grid.getStore();
        var plugin = grid.getPlugin('celleditingSource');
        var newRowIndex = store.getCount() + 1;

        var cfSourcesetModel = Ext.create('NgcpCsc.model.CallForwardSourceset', {
            id: Ext.id(),
            source: " ",
            sourceset_name: vm.get('sourceset-' + grid.up('cfMainForm')._sourcesetListId + "-title"),
            sourceset_id: grid.up('cfMainForm')._sourcesetListId,
            edit: true
        });
        store.add(cfSourcesetModel);
        plugin.startEditByPosition({
            row: newRowIndex,
            column: 0
        });
    },

    addEmptySourcesetRow: function(button) {
        var buttonIdSplit = button.id.split('-');
        var buttonPrefixOne = buttonIdSplit[0];
        var buttonPrefixTwo = buttonIdSplit[1];
        var buttonSuffix = buttonIdSplit[2];
        var grid = Ext.getCmp(buttonPrefixOne + '-' + buttonPrefixTwo + '-cf-sourceset-list-grid');
        this.writeNewSourceToStore(grid);
    },

    removeEntry: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = grid.getStore().getAt(rowIndex);
        var title = Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')];
        var question = Ngcp.csc.locales.common.remove_confirm[localStorage.getItem('languageSelected')];
        var sucessMsg = Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')];
        this.fireEvent('showconfirmbox', title, question, sucessMsg, 'confirmCFRemoval', rec);
    },

    // setCfuAsType() sets type to cfu for all destinations with given destinationset id, and returns
    // the updated store
    setCfuAsType: function(store, id) {
        Ext.each(store.getRange(), function(record) {
            if (record.get('destinationset_id') === id) {
                record.set('type', 'cfu');
            }
        });
        return store;
    },

    recordHasStoreAndOwnPhone: function(record) {
        var store = record.store;
        return store && record.get('destination') === 'own phone';
    },

    isLastOnlineDestinationOfId: function(record, store) {
        if (store.getCount() === 2 && store.getAt(0).get('destination') === "own phone") {
            return true;
        }
        return false;
    },

    confirmCFRemoval: function(record) {
        var $cf = this;
        var store = record.store;
        var subscriberId = localStorage.getItem('subscriber_id');
        var isLastOnlineDestinationOfId = $cf.isLastOnlineDestinationOfId(record, store);
        if ($cf.recordHasStoreAndOwnPhone(record)) {
            store = $cf.setCfuAsType(store, record.get('destinationset_id'));
            Ext.Ajax.request({
                url: '/api/cfmappings/' + localStorage.getItem('subscriber_id'),
                method: 'GET',
                jsonData: {},
                success: function(response) {
                    var decodedResponse = Ext.decode(response.responseText);
                    var cfuMappings = decodedResponse['cfu'];
                    var cftMappings = decodedResponse['cft'];
                    cfuMappings.push({
                        "destinationset": record.get('destinationset_name'),
                        "sourceset": record.get('sourceset'),
                        "timeset": record.get('timeset')
                    });
                    cftMappings = cftMappings.filter(function(obj) {
                        return obj.destinationset !== record.get('destinationset_name');
                    });
                    if (isLastOnlineDestinationOfId) {
                        cfuMappings = [];
                        cftMappings = [];
                    };
                    Ext.Ajax.request({
                        url: '/api/cfmappings/' + subscriberId,
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json-patch+json'
                        },
                        // We are writing to two paths based on the call forwarding
                        // types we are manipulating. Removing the mapping from cft
                        // and adding a new mapping for cfu
                        jsonData: [{
                            "op": "add",
                            "path": "/cft",
                            "value": cftMappings
                        }, {
                            "op": "add",
                            "path": "/cfu",
                            "value": cfuMappings
                        }],
                        success: function(response) {
                            store.sync();
                        },
                        failure: function(response) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            });
        } else if (store) {
            store.remove(record);
            store.sync();
            $cf.setLabelTerminationType(store);
        };
    },

    getStoresArrayFromRoute: function(currentRoute, currentSourceset) {
        var view = currentRoute.split('/')[1];
        var prefix = currentSourceset + '-' + view + '-';
        return [prefix + 'CallForwardOnline', prefix + 'CallForwardBusy', prefix + 'CallForwardOffline'];
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
        var $vm = this.getViewModel();
        if (record.get('destination') === 'own phone') {
            return Ext.String.format('Own phone and ring for {0} secs', $vm.get('cft_ringtimeout') || 15);
        } else if (record.get('timeout_displayed') === '' && !Ext.isNumber(parseInt(value))) {
            return Ext.String.format('{0}', value);
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

    createNewMapping: function(subscriberId, newType, newDestinationsetName, newSourceset, newTimeset) {
        Ext.Ajax.request({
            url: '/api/cfmappings/' + localStorage.getItem('subscriber_id'),
            method: 'GET',
            jsonData: {},
            success: function(response) {
                var decodedResponse = Ext.decode(response.responseText);
                var mappings = decodedResponse[newType];
                mappings.push({
                    "destinationset": newDestinationsetName,
                    "sourceset": newSourceset,
                    "timeset": newTimeset
                });
                Ext.Ajax.request({
                    url: '/api/cfmappings/' + subscriberId,
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json-patch+json'
                    },
                    jsonData: [{
                        "op": "add",
                        "path": "/" + newType,
                        "value": mappings
                    }]
                });
            }
        });
    },

    hasOnlyOwnPhone: function(store) {
        if (store.first()) {
            return store.getCount() === 1 && store.first().get('destination') === 'own phone';
        } else {
            return false;
        }
    },

    storeIsEmpty: function(store) {
        return !store.first() || this.hasOnlyOwnPhone(store);
    },

    writeNewDestinationToStore: function(store, destination, timeout) {
        var $cf = this;
        var $vm = this.getViewModel();
        var simpleDestination = destination;
        var priority = 1;
        var storeCount = store.getCount();
        var activeTab = this.getView().down('tabpanel').getActiveTab().down('cfMainForm');
        // Removes timeout if destination is not a number
        var ringFor = !Ext.isNumber(parseInt(destination)) ? '' : timeout;
        var storeIdSplit = store.storeId.split('-');
        var newSourcesetName = storeIdSplit[0] == 'everybody' ? null : storeIdSplit[0];
        var newTimesetName = storeIdSplit[1] == 'always' ? null : storeIdSplit[1];
        var newTypeName = storeIdSplit[2].slice(11);
        var newSourceset = activeTab ? $vm.get('sourceset-' + activeTab._sourcesetListId + "-title") : null;
        var newTimeset = this.getTimeSetFromTimeSource(newTimesetName);
        var newType = this.getTypeFromTypeName(newTypeName, store);
        var newDestination = destination === 'Voicemail' ? 'voicebox' : destination.toLowerCase();
        var newTimeout = !timeout ? null : timeout;
        if ($cf.storeIsEmpty(store)) { // if store empty we need to create new destset
            var newDestinationsetName = 'csc_' + newType + '_' + Date.now();
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
                    $cf.setLabelTerminationType(store);
                    store.sync();
                    $cf.createNewMapping(subscriberId, newType, newDestinationsetName, newSourceset, newTimeset);
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
            $cf.setLabelTerminationType(store);
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
    },

    removePeriod: function(grid, rowIndex, colIndex) {
        var store = grid.getStore()
        var rec = store.getAt(rowIndex);
        store.remove(rec);
    },
    addNewPeriod: function(btn) {
        var grid = btn.up('[name=timesetCont]').down('grid');
        var store = grid.getStore();
        var newModel = Ext.create('NgcpCsc.model.CallForwardTimeset');
        store.add(newModel);
    }

});
