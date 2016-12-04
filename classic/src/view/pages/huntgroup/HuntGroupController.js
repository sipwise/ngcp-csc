Ext.define('NgcpCsc.view.pages.huntgroup.HuntGroupController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.huntgroup',

    onGridRendered: function(grid) {
        grid.getStore().load();
    },

});
