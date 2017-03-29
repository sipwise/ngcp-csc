Ext.define('NgcpCsc.store.HuntPolicies', {
    extend: 'Ext.data.Store',

    storeId: 'HuntPolicies',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/huntPolicies.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
