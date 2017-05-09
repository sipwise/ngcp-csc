Ext.define('NgcpCsc.store.SeatTypes', {
    extend: 'Ext.data.Store',

    storeId: 'SeatTypes',

    model: 'NgcpCsc.model.SeatType',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/seattype.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
