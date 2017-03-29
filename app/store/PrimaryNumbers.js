Ext.define('NgcpCsc.store.PrimaryNumbers', {
    extend: 'Ext.data.Store',

    storeId: 'PrimaryNumbers',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/primaryNumbers.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
