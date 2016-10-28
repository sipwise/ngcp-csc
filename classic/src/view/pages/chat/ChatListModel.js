Ext.define('NgcpCsc.view.pages.chat.ChatListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.chatlist',

    stores: {
        friends: {
            //Store reference
            type: 'chatlist',

            //Auto load
            autoLoad: true
        }
    }
});
