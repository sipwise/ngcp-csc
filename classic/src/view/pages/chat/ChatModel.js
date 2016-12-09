Ext.define('NgcpCsc.view.pages.chat.ChatModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chat',
    data: {
        new_message: '',
        chatEnabled: false
    },
    formulas: {},
    stores: {
        notifications: 'Chat'
    }
});
