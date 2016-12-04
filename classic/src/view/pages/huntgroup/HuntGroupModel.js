Ext.define('NgcpCsc.view.pages.huntgroup.HuntGroupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.huntgroup',

    formulas: {
        selection: {
            bind: '{hungtGroupGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
    }
    
});
