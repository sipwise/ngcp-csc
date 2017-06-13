Ext.define('NgcpCsc.store.Devices', {
    extend: 'Ext.data.Store',

    storeId: 'Devices',

    model: 'NgcpCsc.model.Device',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/devices.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
