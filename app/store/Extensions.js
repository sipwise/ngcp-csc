Ext.define('NgcpCsc.store.Extensions', {
    extend: 'Ext.data.Store',

    storeId: 'Extensions',

    model: 'NgcpCsc.model.Extension',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/extensions.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
