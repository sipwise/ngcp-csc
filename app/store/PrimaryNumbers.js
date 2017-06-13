Ext.define('NgcpCsc.store.PrimaryNumbers', {
    extend: 'Ext.data.Store',

    storeId: 'PrimaryNumbers',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/primaryNumbers.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
