Ext.define('NgcpCsc.store.Conversations', {
    extend: 'Ext.data.Store',

    storeId: 'Conversations',

    model: 'NgcpCsc.model.Conversation',

    groupField: 'timeGroup',

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/conversations.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
