Ext.define('NgcpCsc.view.pages.addressbook.AddressbookModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.addressbook',

    formulas: {
        selection: {
            bind: '{addressBookGrid.selection}',
            get: function(selection) {
                return selection;
            }
        }
    }
});
