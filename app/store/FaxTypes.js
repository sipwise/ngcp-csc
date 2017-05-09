Ext.define('NgcpCsc.store.FaxTypes', {
    extend: 'Ext.data.Store',

    storeId: 'FaxTypes',

    model: 'NgcpCsc.model.FaxType',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/faxtypes.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
