Ext.define('NgcpCsc.view.pages.subscriberadmin.groups.GroupsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groups',

<<<<<<< 8a91b442e2622f48e2dfe71117e2cc1ff236a334
    data: {
        test_viewmodel_data: 'groups'
=======
    formulas: {
        selection: {
            bind: '{groupsGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
>>>>>>> TT#7556 ngcp-csc Subscriber Admin > Seats section
    }

});
