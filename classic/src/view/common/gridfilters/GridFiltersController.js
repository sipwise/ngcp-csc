Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    submitFilters: function() {
        var store;
        var vm = this.getViewModel();
        var form = this.lookupReference('filterForm');

        if (form.isValid()) {
            if (Ext.isString(this.getView()._linkedStoreId)) {
                store = Ext.getStore(this.getView()._linkedStoreId);
                this.getView()._hideSearchTerm ? store.filterBy(this.applyFilters, this) : store.filterBy(this.searchText, this);
            } else {
                Ext.each(this.getView()._linkedStoreId, function(storeId) {
                    store = Ext.getStore(storeId);
                    this.getView()._hideSearchTerm ? store.filterBy(this.applyFilters, this) : store.filterBy(this.searchText, this);
                }, this)
            }
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

    applyFilters: function(record) {
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

    resetFilters: function() {
        var store;
        if(Ext.isString(this.getView()._linkedStoreId)){
            store = Ext.getStore(this.getView()._linkedStoreId);
            this.resetVM(store)
        }else{
            Ext.each(this.getView()._linkedStoreId, function(storeId) {
                store = Ext.getStore(storeId);
                this.resetVM(store);
            }, this)
        }

    },
    resetVM: function(store){
        var vm = this.getViewModel();
        store.clearFilter();
        vm.set('filtergrid.from_date', null);
        vm.set('filtergrid.to_date', null);
        vm.set('filtergrid.number', null);
        vm.set('filtergrid.type', null);
        vm.set('filtergrid.incoming', true);
        vm.set('filtergrid.outgoing', true);
        vm.set('filtergrid.missed', true);
        vm.set('filtergrid.answered', true);
        vm.set('filtergrid.search_term', '');
    }
});
