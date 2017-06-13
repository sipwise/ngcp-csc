Ext.define('NgcpCsc.store.Extensions', {
    extend: 'Ext.data.Store',

    storeId: 'Extensions',

    model: 'NgcpCsc.model.Extension',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/extensions.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
