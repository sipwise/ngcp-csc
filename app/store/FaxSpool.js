Ext.define('NgcpCsc.store.FaxSpool', {
    extend: 'Ext.data.Store',

    storeId: 'FaxSpool',

    model: 'NgcpCsc.model.FaxSpool',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/faxspool.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
