Ext.define('NgcpCsc.store.Seats', {
    extend: 'Ext.data.Store',

    storeId: 'Seats',

    model: 'NgcpCsc.model.Seat',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/seats.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
