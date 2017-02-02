Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    listen: {
        controller : {
            '*' : {
                newSearchFieldInput: 'filterBySearchFieldInput',
                toggleFilterForm: 'toggleFilterForm',
                routeChange: 'hideFilterForm',
                toggleFreeSearch: 'toggleFreeSearch'
            }
        }
    },

    submitSearchFilter: function (state) {
        var me = this;
        var vm = me.getViewModel();
        var currentRoute = window.location.hash;
        var linkedStore = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(linkedStore);
        if (vm.get('freeSearchState')) {
            store.filterBy(me.applyFreeSearchFilter, me);
            console.log('state true');
        } else {
            switch (true) {
                case (currentRoute == '#inbox'):
                    store.filterBy(me.applyConvSearchFilter, me);
                    break;
                case (currentRoute == '#pbxconfig/devices'):
                    store.filterBy(me.applyPbxSearchFilter, me);
                    break;
                case (currentRoute == '#pbxconfig/groups'):
                    store.filterBy(me.applyPbxSearchFilter, me);
                    break;
                case (currentRoute == '#pbxconfig/seats'):
                    store.filterBy(me.applyPbxSearchFilter, me);
                    break;
            };
            console.log('state false');
        };
    },

    applyFreeSearchFilter: function(record) {
        var vm = this.getViewModel();
        var search_term = vm.get('filtergrid.headerBarFieldInput') || "";
        var retVal = false;
        Ext.Object.each(record.data, function(key, val) {
            if (Ext.isString(val) && val.indexOf(search_term) > -1) {
                retVal = true;
                return;
            }
        });
        return retVal;
    },

    getStoreFromRoute: function (currentRoute) {
        switch (true) {
            case (currentRoute == '#inbox'):
                return 'Calls';
                break;
            case (currentRoute == '#pbxconfig/devices'):
                return 'Devices';
                break;
            case (currentRoute == '#pbxconfig/groups'):
                return 'Groups';
                break;
            case (currentRoute == '#pbxconfig/seats'):
                return 'Seats';
                break;
        };
    },

    applyConvSearchFilter: function(record) {
        var vm = this.getViewModel();
        var store = Ext.getStore('Calls');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput');
        var retVal = true;
        if (fieldInput && record.get('source_cli').indexOf(fieldInput) == -1) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxSearchFilter: function(record) {
        var vm = this.getViewModel();
        var store = Ext.getStore('Calls');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput');
        var retVal = true;
        if (fieldInput && record.get('name').indexOf(fieldInput) == -1) {
            retVal = false;
        }
        return retVal;
    },

    submitFilters: function() {
        // TODO: Changes are applied when form changes, but values are "delayed"
        // (unchecking "missed" treats it as checked/true, and checking it
        // treats it as unchecked/false. Tried setTimeout() without luck, and
        // doublechecked that bind does not explicitly need to declare value:
        var store;
        var me = this;
        var vm = me.getViewModel();
        var form = me.lookupReference('filterForm');
        var currentRoute = window.location.hash;
        var linkedStore = me.getStoreFromRoute(currentRoute);
        if (form.isValid()) {
            if (Ext.isString(linkedStore)) {
                linkedStore = [linkedStore]; // both string and array should be allowed
            }
            Ext.each(linkedStore, function(storeId) {
                store = Ext.getStore(storeId);
                console.log(vm.get('filtergrid.missed'));
                switch (true) {
                    case (currentRoute == '#inbox'):
                        store.filterBy(me.applyCallFilters, me);
                        break;
                    case (currentRoute == '#pbxconfig/seats'):
                        store.filterBy(me.applyPbxconfigSeatsFilters, me);
                        break;
                    case (currentRoute == '#pbxconfig/groups'):
                        store.filterBy(me.applyPbxconfigGroupsFilters, me);
                        break;
                    case (currentRoute == '#pbxconfig/devices'):
                        store.filterBy(me.applyPbxconfigDevicesFilters, me);
                        break;
                }
            });
        }
    },

    applyCallFilters: function(record) {
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var linkedStore = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(linkedStore);
        /* filters */
        var fromFilter = vm.get('filtergrid.from_date');
        var toFilter = vm.get('filtergrid.to_date') || Date.now();
        var direction = [vm.get('filtergrid.incoming') ? 'incoming' : null, vm.get('filtergrid.outgoing') ? 'outgoing' : null];
        var status = [vm.get('filtergrid.missed') ? 'missed' : null, vm.get('filtergrid.answered') ? 'answered' : null];
        var answered = vm.get('filtergrid.answered');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput');
        console.log(fieldInput);
        var types = [vm.get('filtergrid.call') ? 'call' : null, vm.get('filtergrid.voicemail') ? 'voicemail' : null, vm.get('filtergrid.reminder') ? 'reminder' : null, vm.get('filtergrid.reminder') ? 'reminder' : null];
        var retVal = true;
        if (fromFilter && !Ext.Date.between(new Date(record.get('start_time')), new Date(fromFilter), new Date(toFilter)) ||
            fieldInput && record.get('source_cli').indexOf(fieldInput) == -1 ||
            types.length > 0 && types.indexOf(record.get('call_type')) == -1 ||
            direction.length > 0 && direction.indexOf(record.get('direction')) == -1 ||
            status.length > 0 && status.indexOf(record.get('status')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigSeatsFilters: function(record) {
        var vm = this.getViewModel();
        var name = vm.get('filtergrid.name') || "";
        var extensions = vm.get('filtergrid.extensions') ? vm.get('filtergrid.extensions').split(',') : [];
        var groups = vm.get('filtergrid.groups') ? vm.get('filtergrid.groups').split(',') : [];
        var numbers = vm.get('filtergrid.numbers') || "";
        var phone_devices = vm.get('filtergrid.phone_devices') ? vm.get('filtergrid.phone_devices').split(',') : [];

        var retVal = true;

        if (name && record.get('name').indexOf(name) == -1 ||
            extensions.length > 0 && extensions.indexOf(record.get('extension')) == -1 ||
            groups.length > 0 && groups.indexOf(record.get('groups')) == -1 ||
            numbers && record.get('numbers').indexOf(numbers) == -1 ||
            phone_devices.length > 0 && phone_devices.indexOf(record.get('phone_devices')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigGroupsFilters: function(record) {
        var vm = this.getViewModel();
        var name = vm.get('filtergrid.name') || "";
        var extensions = vm.get('filtergrid.extensions') ? vm.get('filtergrid.extensions').split(',') : [];
        var hunt_policy = vm.get('filtergrid.hunt_policy') ? vm.get('filtergrid.hunt_policy').split(',') : [];
        var hunt_timeout = vm.get('filtergrid.hunt_timeout') ? vm.get('filtergrid.hunt_timeout').split(',') : [];
        var retVal = true;
        if (name && record.get('name').indexOf(name) == -1 ||
            extensions.length > 0 && extensions.indexOf(record.get('extension')) == -1 ||
            hunt_policy.length > 0 && hunt_policy.indexOf(record.get('hunt_policy')) == -1 ||
            hunt_timeout.length > 0 && hunt_timeout.indexOf(record.get('hunt_timeout')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigDevicesFilters: function(record) {
        var vm = this.getViewModel();
        var name = vm.get('filtergrid.name') || "";
        var deviceProfile = vm.get('filtergrid.device') || "";
        var mac = vm.get('filtergrid.mac') || "";
        var status = [vm.get('filtergrid.enabled') ? 'enabled' : null, vm.get('filtergrid.disabled') ? 'disabled' : null];

        var retVal = true;

        if (name && record.get('name').indexOf(name) == -1 ||
            deviceProfile && record.get('device').indexOf(deviceProfile) == -1 ||
            mac && record.get('mac').indexOf(mac) == -1 ||
            status.length > 0 && status.indexOf(record.get('status')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    resetFilters: function() {
        var store;
        var me = this;
        var currentRoute = window.location.hash;
        var linkedStore = me.getStoreFromRoute(currentRoute);
        if (Ext.isString(linkedStore)) {
            linkedStore = [linkedStore]; // both string and array should be allowed
        }
        Ext.each(linkedStore, function(storeId) {
            store = Ext.getStore(storeId);
            me.resetVM(store);
        })
    },

    resetVM: function(store) {
        var vm = this.getViewModel();
        store.clearFilter();
        vm.set('filtergrid.from_date', null);
        vm.set('filtergrid.to_date', null);
        vm.set('filtergrid.number', null);
        vm.set('filtergrid.type', ["call", "voicemail", "reminder", "fax"]);
        vm.set('filtergrid.incoming', true);
        vm.set('filtergrid.outgoing', true);
        vm.set('filtergrid.missed', true);
        vm.set('filtergrid.answered', true);
        vm.set('filtergrid.search_term', '');
        vm.set('filtergrid.name', '');
        vm.set('filtergrid.extensions', '');
        vm.set('filtergrid.groups', '');
        vm.set('filtergrid.phone_devices', '');
        vm.set('filtergrid.enabled', true);
        vm.set('filtergrid.disabled', true);
        vm.set('filtergrid.device', '');
        vm.set('filtergrid.mac', '');
    },

    renderGroupsFilterText: function(value, metaData) {
        return Ngcp.csc.locales.common.groups[localStorage.getItem('languageSelected')].toLowerCase();
    },

    filterBySearchFieldInput: function(el) {
        var vm = this.getViewModel();
        var val = el.getTarget().value;
        vm.set('filtergrid.headerBarFieldInput', val);
        if (val.length === 0) {
            this.resetFilters();
        } else {
            this.submitSearchFilter(vm.get('filtergrid.freeSearchState'));
        };
    },

    showCalendar: function (field) {
        field.el.on('click', function () {
            field.onTriggerClick();
        });
    },

    toggleFilterForm: function () {
        var vm = this.getViewModel();
        vm.set('filtergrid.filterHideState', !vm.get('filtergrid.filterHideState'));
    },

    hideFilterForm: function () {
        var vm = this.getViewModel();
        vm.set('filtergrid.filterHideState', true);
    },

    toggleFreeSearch: function () {
        var vm = this.getViewModel();
        vm.set('freeSearchState', !vm.get('freeSearchState'));
    },

    renderHeaderGlyph: function () {
        return "x-fa fa-toggle-off";
    }

});
