Ext.define('NgcpCsc.store.Notifications', {
    extend: 'Ext.data.Store',

    storeId: 'Notifications',

    model: 'NgcpCsc.model.Notification',

    autoLoad:true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/notifications.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
