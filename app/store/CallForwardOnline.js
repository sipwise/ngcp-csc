Ext.define('NgcpCsc.store.CallForwardOnline', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardOnline',

    model: 'NgcpCsc.model.CallForwardOnline',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForwardOnline.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
