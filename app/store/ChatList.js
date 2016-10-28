Ext.define('NgcpCsc.store.ChatList', {
    extend: 'Ext.data.Store',

    alias: 'store.chatlist',

    storeId: 'ChatList',

    model: 'NgcpCsc.model.ChatList',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/chatlist.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    sorters: {
        direction: 'DESC',
        property: 'online'
    }
});
