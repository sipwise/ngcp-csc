Ext.define('NgcpCsc.store.CallForwardOffline', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardOffline',

    model: 'NgcpCsc.model.CallForwardOffline',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForwardOffline.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
