Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.conversationwith',
    // non-API data
    data:{
        messagetype: 'chat',
        iconcls: 'fa fa-comment',
        activeUserName: '',
        activeUserId: ''
    },
    stores: {
        notifications: 'Notifications'
    }
});
