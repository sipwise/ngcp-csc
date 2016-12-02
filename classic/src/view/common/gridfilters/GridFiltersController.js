Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    init: function() {
        this.getView().down('[name=from_date]').hidden = this.getView()._hideDateFilters;
        this.getView().down('[name=to_date]').hidden = this.getView()._hideDateFilters;
    },

    submitFilters: function() {
        Ext.getStore(this.getView()._linkedStoreId).load();
    },

    resetFilters: function() {
        this.getView().getForm().reset();
        this.submitFilters();
    }
});
