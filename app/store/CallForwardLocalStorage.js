Ext.define('NgcpCsc.store.CallForwardLocalStorage', {
    extend: 'Ext.data.Store',

    // TODO: Can be removed as we only have a single model, but is currently
    // used with Ext.getStore() references in CallForward modules

    storeId: 'CallForwardLocalStorage',

    model: 'NgcpCsc.model.CallForwardLocalStorage',

    autoSync: true,
    autoLoad: true,

    proxy: {
        type: 'localstorage',
        id: 'callForward'
    }

});
