Ext.define('NgcpCsc.store.CallForwardLocalStorage', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardLocalStorage',

    model: 'NgcpCsc.model.CallForwardLocalStorage',

    autoSync: true,
    autoLoad: true,

    proxy: {
        type: 'localstorage',
        id: 'callForward'
    }

});
