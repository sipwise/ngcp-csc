Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.conversationwith',
    links: {
        message: {
            type: 'NgcpCsc.model.Notification',
            id: Ext.id()
        }
    },
    stores: {
        notifications: 'Notifications'
    }
});
