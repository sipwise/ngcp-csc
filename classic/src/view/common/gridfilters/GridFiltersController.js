Ext.define('NgcpCsc.view.common.gridfilters.GridFiltersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridfilters',

    submitFilters: function() {
        this.getView()._attachedCmp.getStore().load();
    },

    resetFilters: function() {
        this.getView().getForm().reset();
    }
});
