Ext.define('NgcpCsc.store.Conversations', {
    extend: 'Ext.data.Store',

    storeId: 'Conversations',

    model: 'NgcpCsc.model.Conversation',

    autoLoad: true,

    groupField: 'timeGroup',

    proxy: {
        type: 'ajax',
        url: '/resources/data/conversations.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
