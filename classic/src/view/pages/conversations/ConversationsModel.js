Ext.define('NgcpCsc.view.pages.conversations.ConversationsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.conversations',

    links: {
        settings: {
            type: 'NgcpCsc.model.VoiceMailSettings',
            id: Ext.id() // generates random id (required)
        }
    }
});
