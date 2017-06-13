Ext.define('NgcpCsc.store.SeatTypes', {
    extend: 'Ext.data.Store',

    storeId: 'SeatTypes',

    model: 'NgcpCsc.model.SeatType',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/seattype.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
