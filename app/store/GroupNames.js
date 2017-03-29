Ext.define('NgcpCsc.store.GroupNames', {
    extend: 'Ext.data.Store',

    storeId: 'GroupNames',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/groupNames.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
