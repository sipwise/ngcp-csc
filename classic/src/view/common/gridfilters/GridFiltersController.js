Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    init: function() {
        this.getView().down('[name=from_date]').hidden = this.getView()._hideDateFilters;
        this.getView().down('[name=to_date]').hidden = this.getView()._hideDateFilters;
    },

    submitFilters: function() {
        var vm = this.getViewModel();
        var fromFilter = vm.get('from_date');
        var toFilter = vm.get('to_date');
        var number = vm.get('number');
        var types = vm.get('types');
        var store = Ext.getStore(this.getView()._linkedStoreId);

        store.filter([{
            property: 'from',
            value: fromFilter
        }, {
            property: 'to',
            value: toFilter
        }, {
            property: 'number',
            value: number
        }, {
            property: 'types',
            value: types
        }]);
    },

    resetFilters: function() {
        this.getView().down('form').getForm().reset();
        this.submitFilters();
    }
});
