Ext.define('NgcpCsc.view.pages.pbxconfig.devices.DevicesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.devices',

    formulas: {
        selection: {
            bind: '{devicesGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
    }

});
