Ext.define('NgcpCsc.store.Forwards', {
    extend: 'Ext.data.Store',

    storeId: 'Forwards',

    model: 'NgcpCsc.model.Forward',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/forwards.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
