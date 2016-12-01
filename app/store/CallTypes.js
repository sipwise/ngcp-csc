Ext.define('NgcpCsc.store.CallTypes', {
    extend: 'Ext.data.Store',

     alias: 'store.CallTypes',

    storeId: 'CallTypes',

    model: 'NgcpCsc.model.CallType',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/calltypes.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
