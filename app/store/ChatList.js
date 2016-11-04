Ext.define('NgcpCsc.store.ChatList', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.chatlist',

    storeId: 'ChatList',

    proxy: {
        type: 'ajax',
        url: 'resources/data/chatlist.json'
    },

    sorters: [{
        property: 'online',
        direction: 'DESC'
    }]
});
