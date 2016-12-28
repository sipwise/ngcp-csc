Ext.define('NgcpCsc.store.DevicesList', {
    extend: 'Ext.data.Store',

    storeId: 'DevicesList',

    model: 'NgcpCsc.model.DevicesListItem',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/deviceslist.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
