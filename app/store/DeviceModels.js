Ext.define('NgcpCsc.store.DeviceModels', {
    extend: 'Ext.data.Store',

    storeId: 'DeviceModels',

    model: 'NgcpCsc.model.DeviceModel',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/devicemodels.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
