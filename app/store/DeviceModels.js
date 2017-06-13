Ext.define('NgcpCsc.store.DeviceModels', {
    extend: 'Ext.data.Store',

    storeId: 'DeviceModels',

    model: 'NgcpCsc.model.DeviceModel',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/devicemodels.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
