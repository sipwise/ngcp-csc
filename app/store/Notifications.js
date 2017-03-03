Ext.define('NgcpCsc.store.Notifications', {
    extend: 'Ext.data.Store',

    storeId: 'Notifications',

    model: 'NgcpCsc.model.Notification',

    autoLoad:true,

    proxy: {
        type: 'ajax',
        baseUrl : '/resources/data/notifications/',
        url: '/resources/data/notifications/0.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
