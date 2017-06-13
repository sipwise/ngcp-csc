Ext.define('NgcpCsc.store.DevicesList', {
    extend: 'Ext.data.Store',

    storeId: 'DevicesList',

    model: 'NgcpCsc.model.DevicesListItem',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/deviceslist.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
