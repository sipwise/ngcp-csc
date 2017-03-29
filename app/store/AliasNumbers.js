Ext.define('NgcpCsc.store.AliasNumbers', {
    extend: 'Ext.data.Store',

    storeId: 'AliasNumbers',

    autoLoad: true,

    fields: ['number'],

    proxy: {
        type: 'ajax',
        url: '/resources/data/aliasNumbers.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
