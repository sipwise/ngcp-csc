Ext.define('NgcpCsc.store.CallBlockingOutgoing', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlockingOutgoing',

    model: 'NgcpCsc.model.CallBlocking',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callBlockingOutgoing.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
