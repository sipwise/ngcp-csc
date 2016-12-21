Ext.define('NgcpCsc.store.CallForwardTimeset', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardTimeset',

    model: 'NgcpCsc.model.CallForwardTimeset',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForwardTimeset.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
