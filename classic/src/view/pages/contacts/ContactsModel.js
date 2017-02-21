Ext.define('NgcpCsc.view.pages.contacts.ContactsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.contacts',

    stores: {
        buddyList: {
            type: 'contacts'
        }
    }
});
