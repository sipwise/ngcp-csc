Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    listen: {
        controller : {
            '*' : {
                newSearchFieldInput: 'filterBySearchFieldInput',
                toggleFilterForm: 'toggleFilterForm',
                routeChange: 'hideFilterForms',
                toggleFreeSearch: 'toggleFreeSearch',
                resetFilters : 'resetVM'
            }
        }
    },

    submitSearchFilter: function () {
        var me = this;
        var vm = me.getViewModel();
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        if (vm.get('freeSearchState')) {
            store.filterBy(me.applyFreeSearchFilter, me);
        } else {
            switch (true) {
                case (currentRoute == '#inbox'):
                    store.filterBy(me.applyConvSearchFilter, me);
                    break;
                case (currentRoute == '#conversation-with'):
                    store.filterBy(me.applyConvWithSearchFilter, me);
                    break;
                break
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
        };
    },

    applyFreeSearchFilter: function(record) {
        var vm = this.getViewModel();
        var search_term = vm.get('filtergrid.headerBarFieldInput').toLowerCase() || "";
        var retVal = false;
        Ext.Object.each(record.data, function(key, val) {
            if (Ext.isString(val) && val.toLowerCase().indexOf(search_term) > -1) {
                retVal = true;
                return;
            }
        });
        return retVal;
    },

    getStoreFromRoute: function (currentRoute) {
        switch (true) {
            case (currentRoute == '#inbox'):
                return 'Conversations';
                break;
            case (currentRoute == '#conversation-with'):
                return 'Notifications';
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
        var store = Ext.getStore('Conversations');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase();
        var retVal = true;
        if (fieldInput && record.get('source_cli').toLowerCase().indexOf(fieldInput) == -1) {
            retVal = false;
        }
        return retVal;
    },

    applyConvWithSearchFilter: function(record) {
        var vm = this.getViewModel();
        var store = Ext.getStore('Notifications');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase();
        var retVal = true;
        if (fieldInput && record.get('text').indexOf(fieldInput) == -1) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxSearchFilter: function(record) {
        var vm = this.getViewModel();
        var store = Ext.getStore('Conversations');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase();
        var retVal = true;
        if (fieldInput && record.get('name').toLowerCase().indexOf(fieldInput) == -1) {
            retVal = false;
        }
        return retVal;
    },

    getFormReference: function (currentRoute) {
        switch (true) {
            case (currentRoute == '#inbox'):
            case (currentRoute == '#conversation-with'):
                return this.lookupReference('conversationsFilterForm');
                break;
            case (currentRoute == '#pbxconfig/seats'):
                return this.lookupReference('pbxSeatsFilterForm');
                break;
            case (currentRoute == '#pbxconfig/groups'):
                return this.lookupReference('pbxGroupsFilterForm');
                break;
            case (currentRoute == '#pbxconfig/devices'):
                return this.lookupReference('pbxDevicesFilterForm');
                break;
        };
    },

    submitFilters: function() {
        var store;
        var me = this;
        var vm = me.getViewModel();
        var currentRoute = window.location.hash;
        var form = this.getFormReference(currentRoute);
        var storeName = me.getStoreFromRoute(currentRoute);
        if (form.isValid()) {
            if (Ext.isString(storeName)) {
                storeName = [storeName]; // both string and array should be allowed
            }
            Ext.each(storeName, function(storeId) {
                store = Ext.getStore(storeId);
                switch (true) {
                    case (currentRoute == '#inbox'):
                    case (currentRoute == '#conversation-with'):
                        store.filterBy(me.applyCallFilters, me);
                        me.fireEvent('focusLastMsg')
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
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        /* filters */
        var fromFilter = vm.get('filtergrid.from_date');
        var toFilter = vm.get('filtergrid.to_date') || Date.now();
        var direction = [vm.get('filtergrid.incoming') ? 'incoming' : null, vm.get('filtergrid.outgoing') ? 'outgoing' : null];
        var status = [vm.get('filtergrid.missed') ? 'missed' : null, vm.get('filtergrid.answered') ? 'answered' : null];
        var answered = vm.get('filtergrid.answered');
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase();
        var types = [vm.get('filtergrid.call') ? 'call' : null,
                    vm.get('filtergrid.voicemail') ? 'voicemail' : null,
                    vm.get('filtergrid.sms') ? 'sms' : null,
                    vm.get('filtergrid.chat') ? 'chat' : null,
                    vm.get('filtergrid.fax') ? 'fax' : null];
        var retVal = true;
        if (new Date(record.get('start_time')) < new Date(fromFilter) ||
            new Date(record.get('start_time')) >  new Date(toFilter).setHours(23,59,59,999) ||
            fieldInput && record.get('source_cli').toLowerCase().indexOf(fieldInput) == -1 ||
            types.length > 0 && types.indexOf(record.get('conversation_type')) == -1 ||
            direction.length > 0 && direction.indexOf(record.get('direction')) == -1 ||
            status.length > 0 && status.indexOf(record.get('status')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigSeatsFilters: function(record) {
        var vm = this.getViewModel();
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase() || "";
        var extension = vm.get('filtergrid.seats_extension') ? vm.get('filtergrid.seats_extension').toLowerCase().split(',') : [];
        var primary_number = vm.get('filtergrid.primary_number') ? vm.get('filtergrid.primary_number').split(',') : [];
        var alias_numbers = vm.get('filtergrid.alias_numbers') ? vm.get('filtergrid.alias_numbers').toString().split(',') : [];
        var groups = vm.get('filtergrid.groups') ? vm.get('filtergrid.groups').toString().split(',') : [];
        var retVal = true;
        if (fieldInput && record.get('name').toLowerCase().indexOf(fieldInput) == -1 ||
            extension && record.get('extension').toLowerCase().indexOf(extension) == -1 ||
            primary_number && record.get('primary_number').indexOf(primary_number) == -1 ||
            alias_numbers && record.get('alias_numbers').indexOf(alias_numbers) == -1 ||
            groups && record.get('groups').indexOf(groups) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigGroupsFilters: function(record) {
        var vm = this.getViewModel();
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase() || "";
        var extension = vm.get('filtergrid.groups_extension') ? vm.get('filtergrid.groups_extension').toLowerCase().split(',') : [];
        var hunt_policy = vm.get('filtergrid.hunt_policy') ? vm.get('filtergrid.hunt_policy').toLowerCase().split(',') : [];
        var hunt_timeout = vm.get('filtergrid.hunt_timeout') ? vm.get('filtergrid.hunt_timeout').toLowerCase().split(',') : [];
        var retVal = true;
        if (fieldInput && record.get('name').toLowerCase().indexOf(fieldInput) == -1 ||
            extension && record.get('extension').toLowerCase().indexOf(extension) == -1 ||
            hunt_policy && record.get('hunt_policy').toLowerCase().indexOf(hunt_policy) == -1 ||
            hunt_timeout && record.get('hunt_timeout').toLowerCase().indexOf(hunt_timeout) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    applyPbxconfigDevicesFilters: function(record) {
        var vm = this.getViewModel();
        var fieldInput = vm.get('filtergrid.headerBarFieldInput').toLowerCase() || "";
        var deviceProfile = vm.get('filtergrid.device') || "";
        var mac = vm.get('filtergrid.mac') || "";
        var status = [vm.get('filtergrid.enabled') ? 'enabled' : null, vm.get('filtergrid.disabled') ? 'disabled' : null];
        var retVal = true;
        if (fieldInput && record.get('name').toLowerCase().indexOf(fieldInput) == -1 ||
            deviceProfile && record.get('device').indexOf(deviceProfile) == -1 ||
            mac && record.get('mac').indexOf(mac) == -1 ||
            status.length > 0 && status.indexOf(record.get('status')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    resetFilters: function(store) {
        var store;
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        if (Ext.isString(storeName)) {
            storeName = [storeName]; // both string and array should be allowed
        }
        Ext.each(storeName, function(storeId) {
            store = Ext.getStore(storeId);
            me.resetVM(store);
        })
    },

    resetVM: function(store) {
        var vm = this.getViewModel();
        if(store){
            store.clearFilter();
        }
        vm.set('filtergrid.from_date', null);
        vm.set('filtergrid.to_date', null);
        vm.set('filtergrid.number', null);
        vm.set('filtergrid.call', true);
        vm.set('filtergrid.voicemail', true);
        vm.set('filtergrid.sms', true);
        vm.set('filtergrid.chat', true);
        vm.set('filtergrid.fax', true);
        vm.set('filtergrid.incoming', true);
        vm.set('filtergrid.outgoing', true);
        vm.set('filtergrid.missed', true);
        vm.set('filtergrid.answered', true);
        vm.set('filtergrid.search_term', '');
        vm.set('filtergrid.name', '');
        vm.set('filtergrid.seats_extension', '');
        vm.set('filtergrid.groups_extension', '');
        vm.set('filtergrid.group', '');
        vm.set('filtergrid.phone_devices', '');
        vm.set('filtergrid.enabled', true);
        vm.set('filtergrid.disabled', true);
        vm.set('filtergrid.device', '');
        vm.set('filtergrid.mac', '');
    },

    filterBySearchFieldInput: function(el) {
        var vm = this.getViewModel();
        var val = el.getTarget().value.toLowerCase();
        vm.set('filtergrid.headerBarFieldInput', val);
        if (val.length === 0) {
            this.resetFilters();
        } else {
            this.submitSearchFilter();
        };
    },

    showCalendar: function (field) {
        field.el.on('click', function () {
            field.expand();
        });
    },

    fromFilterDateChanged: function(field, newVal, oldVal){
        if(!newVal){
            this.getViewModel().set('filtergrid.from_date', null);
        }
        this.submitFilters();
    },

    toFilterDateChanged: function(field, newVal, oldVal){
        if(!newVal){
            this.getViewModel().set('filtergrid.to_date', null);
        }
        this.submitFilters();
    },

    toggleFilterForm: function () {
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var me = this;
        switch (true) {
            case (currentRoute == '#inbox'):
            case (currentRoute == '#conversation-with'):
                vm.set('filtergrid.convFilterHideState', !vm.get('filtergrid.convFilterHideState'));
                break;
            case (currentRoute == '#pbxconfig/seats'):
                vm.set('filtergrid.pbxSeatsFilterHideState', !vm.get('filtergrid.pbxSeatsFilterHideState'));
                break;
            case (currentRoute == '#pbxconfig/groups'):
                vm.set('filtergrid.pbxGroupsFilterHideState', !vm.get('filtergrid.pbxGroupsFilterHideState'));
                break;
            case (currentRoute == '#pbxconfig/devices'):
                vm.set('filtergrid.pbxDevicesFilterHideState', !vm.get('filtergrid.pbxDevicesFilterHideState'));
                break;
        };
        vm.set('headerBarFieldHideState', !vm.get('headerBarFieldHideState'));
        // we need to resize the section container when the filterpanel toggles
        Ext.Function.defer(function(){
            me.fireEvent('setCentralContentHeight');
        }, 100);
    },

    hideFilterForms: function () {
        var vm = this.getViewModel();
        vm.set('filtergrid.convFilterHideState', true);
        vm.set('filtergrid.pbxSeatsFilterHideState', true);
        vm.set('filtergrid.pbxGroupsFilterHideState', true);
        vm.set('filtergrid.pbxDevicesFilterHideState', true);
    },

    toggleFreeSearch: function (pressed) {
        var vm = this.getViewModel();
        var currentFreeSearchState = vm.get('freeSearchState');
        switch (!pressed) {
            case (true):
                vm.set('freeSearchState', !currentFreeSearchState);
                break;
            case (false):
                vm.set('freeSearchState', true);
                break;
        };
    }

});
