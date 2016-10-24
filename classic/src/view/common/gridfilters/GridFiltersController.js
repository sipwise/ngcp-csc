Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    submitFilters: function() {
        Ext.getStore(this.getView()._linkedStoreId).load();
    },

    resetFilters: function() {
        this.getView().getForm().reset();
    }
});
