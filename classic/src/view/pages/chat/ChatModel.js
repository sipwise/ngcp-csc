Ext.define('NgcpCsc.view.pages.chat.ChatModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chat',
    data: {
        new_message:''
    },
    formulas: {},
    stores: {
        notifications: 'Chat'
    }
});
