Ext.define('NgcpCsc.store.CallBlockingIncoming', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlockingIncoming',

    model: 'NgcpCsc.model.CallBlockingIncoming',

    autoLoad: true,

    // groupField: 'timeGroup',

    proxy: {
        type: 'ajax',
        url: '/resources/data/callBlockingIncoming.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
