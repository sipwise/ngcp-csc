Ext.define('NgcpCsc.store.HuntPolicies', {
    extend: 'Ext.data.Store',

    storeId: 'HuntPolicies',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/huntPolicies.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
