Ext.define('NgcpCsc.view.pages.contacts.ChatListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.chatlist',

    stores: {
        buddyList: {
            type: 'chatlist'
        }
    }
});
