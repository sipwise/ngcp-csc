Ext.define('NgcpCsc.store.FaxSendQuality', {
    extend: 'Ext.data.Store',

    storeId: 'FaxSendQuality',

    fields: [{
        name: 'quality',
        type: 'string'
    }],

    data: [{
        quality: 'Normal'
    }, {
        quality: 'Fine'
    }, {
        quality: 'Super'
    }]

});
