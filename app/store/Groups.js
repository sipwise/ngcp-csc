Ext.define('NgcpCsc.store.Groups', {
    extend: 'Ext.data.Store',

    storeId: 'Groups',

    model: 'NgcpCsc.model.Group',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/groups.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
