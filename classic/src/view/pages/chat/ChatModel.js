Ext.define('NgcpCsc.view.pages.chat.ChatModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chat',
    links: {
        message: {
            type: 'NgcpCsc.model.Chat',
            id: Ext.id()
        }
    },
    stores: {
        notifications: 'Chat'
    }
});
