Ext.define('NgcpCsc.store.Groups', {
    extend: 'Ext.data.Store',

    storeId: 'Groups',

    model: 'NgcpCsc.model.Group',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/groups.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
