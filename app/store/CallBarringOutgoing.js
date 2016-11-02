Ext.define('NgcpCsc.store.CallBarringOutgoing', {
    extend: 'Ext.data.Store',

    storeId: 'CallBarringOutgoing',

    model: 'NgcpCsc.model.CallBarringOutgoing',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callBarringOutgoing.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
