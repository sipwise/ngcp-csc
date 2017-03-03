Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.conversationwith',
    data:{
        messagetype:'sms',
        iconcls:'fa fa-envelope'
    },
    stores: {
        notifications: 'Notifications'
    }
});
