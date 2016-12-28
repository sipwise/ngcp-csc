Ext.define('NgcpCsc.store.Destinations', {
    extend: 'Ext.data.Store',

    storeId: 'Destinations',

    model: 'NgcpCsc.model.Destination',

    proxy: {
        type: 'ajax',
        url: '/resources/data/destinations.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
