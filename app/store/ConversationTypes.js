Ext.define('NgcpCsc.store.ConversationTypes', {
    extend: 'Ext.data.Store',

     alias: 'store.ConversationTypes',

    storeId: 'ConversationTypes',

    model: 'NgcpCsc.model.ConversationType',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/conversationtypes.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
