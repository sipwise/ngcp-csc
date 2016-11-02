Ext.define('NgcpCsc.store.CallBarringIncoming', {
    extend: 'Ext.data.Store',

    storeId: 'CallBarringIncoming',

    model: 'NgcpCsc.model.CallBarringIncoming',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callBarringIncoming.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
