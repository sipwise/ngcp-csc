Ext.define('NgcpCsc.store.Chat', {
    extend: 'Ext.data.Store',

    storeId: 'Chat',

    model: 'NgcpCsc.model.ChatNotification',

    proxy: {
        type: 'ajax',
        url: '/resources/data/chat.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
