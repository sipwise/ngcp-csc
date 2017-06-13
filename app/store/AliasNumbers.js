Ext.define('NgcpCsc.store.AliasNumbers', {
    extend: 'Ext.data.Store',

    storeId: 'AliasNumbers',

    autoLoad: true,

    fields: ['number'],

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/aliasNumbers.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
