Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    submitFilters: function() {
        var store;
        var vm = this.getViewModel();
        var form = this.lookupReference('filterForm');
        var me = this;

        if (form.isValid()) {
            if (Ext.isString(this.getView()._linkedStoreId)) {
                me.getView()._linkedStoreId = [me.getView()._linkedStoreId]; // both string and array should be allowed
            }
            Ext.each(me.getView()._linkedStoreId, function(storeId) {
                store = Ext.getStore(storeId);
                switch (true) {
                    case me.getView()._callFilters:
                        store.filterBy(me.applyCallFilters, me)
                        break;
                    case me.getView()._searchTerm:
                        store.filterBy(me.searchText, me);
                        break;
                    case me.getView()._pbxconfigSeats:
                        store.filterBy(me.applyPbxconfigSeatsFilters, me);
                        break;
                    case me.getView()._pbxconfigGroups:
                        store.filterBy(me.applyPbxconfigGroupsFilters, me);
                        break;
                    case me.getView()._pbxconfigDevices:
                        store.filterBy(me.applyPbxconfigDevicesFilters, me);
                        break;
                }
            })
        }
    },

    searchText: function(record) {
        var vm = this.getViewModel();
        var search_term = vm.get('filtergrid.search_term') || "";
        var retVal = false;
        Ext.Object.each(record.data, function(key, val) {
            if (Ext.isString(val) && val.indexOf(search_term) > -1) {
                retVal = true;
                return;
            }
        });
        return retVal;

    },

    applyCallFilters: function(record) {
        var vm = this.getViewModel();
        var store = Ext.getStore(this.getView()._linkedStoreId);
        /* filters */
        var fromFilter = vm.get('filtergrid.from_date');
        var toFilter = vm.get('filtergrid.to_date') || Date.now();
        var direction = [vm.get('filtergrid.incoming') ? 'incoming' : null, vm.get('filtergrid.outgoing') ? 'outgoing' : null];
        var status = [vm.get('filtergrid.missed') ? 'missed' : null, vm.get('filtergrid.answered') ? 'answered' : null];
        var answered = vm.get('filtergrid.answered');
        var number = vm.get('filtergrid.number');
        var types = vm.get('types').value;
        var retVal = true;

        if (fromFilter && !Ext.Date.between(new Date(record.get('start_time')), new Date(fromFilter), new Date(toFilter)) ||
            number && record.get('source_cli').indexOf(number) == -1 ||
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
        var store,
            me = this;
        if (Ext.isString(me.getView()._linkedStoreId)) {
            me.getView()._linkedStoreId = [me.getView()._linkedStoreId];
        }
        Ext.each(me.getView()._linkedStoreId, function(storeId) {
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
    }

});
