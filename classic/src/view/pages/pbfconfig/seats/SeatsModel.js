Ext.define('NgcpCsc.view.pages.pbxconfig.seats.SeatsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.seats',

    formulas: {
        selection: {
            bind: '{seatsGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
    }

});
