Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    init: function() {
        this.getView().down('[name=from_date]').hidden = this.getView()._hideDateFilters;
        this.getView().down('[name=to_date]').hidden = this.getView()._hideDateFilters;
    },

    submitFilters: function() {
        var store = Ext.getStore(this.getView()._linkedStoreId);
        store.filterBy(this.applyFilters, this);
    },

    applyFilters: function(record) {
        var vm = this.getViewModel();
        var fromFilter = vm.get('filtergrid.from_date');
        var toFilter = vm.get('filtergrid.to_date') || Date.now();
        var direction = vm.get('filtergrid.direction');
        var status = [vm.get('filtergrid.missed') ? 'missed': null , vm.get('filtergrid.answered') ? 'answered': null];
        var answered = vm.get('filtergrid.answered');
        var number = vm.get('filtergrid.number');
        var types = vm.get('types').value;
        var store = Ext.getStore(this.getView()._linkedStoreId);
        var retVal = true;

        // match between  filters and card store
        if (fromFilter && !Ext.Date.between(new Date(record.get('start_time')), new Date(fromFilter), new Date(toFilter)) ||
            number && record.get('source_cli').indexOf(number) == -1 ||
            types.length > 0 && types.indexOf(record.get('call_type')) == -1 ||
            direction && record.get('direction') !== direction ||
            status.length > 0 && status.indexOf(record.get('status')) == -1
        ) {
            retVal = false;
        }
        return retVal;
    },

    resetFilters: function() {
        var store = Ext.getStore(this.getView()._linkedStoreId);
        this.getView().down('form').getForm().reset();
        store.clearFilter();
    }
});
