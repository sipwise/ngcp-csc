Ext.define('NgcpCsc.view.pages.chat.ChatListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.chatlist',

    stores: {
        buddyList: {
            type: 'chatlist'
        }
    }
});
