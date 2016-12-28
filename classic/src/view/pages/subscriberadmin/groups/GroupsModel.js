Ext.define('NgcpCsc.view.pages.subscriberadmin.groups.GroupsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groups',

    formulas: {
        selection: {
            bind: '{groupsGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
    }

});
