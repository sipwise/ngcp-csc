Ext.define('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForward.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
