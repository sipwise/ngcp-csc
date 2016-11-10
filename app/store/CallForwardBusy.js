Ext.define('NgcpCsc.store.CallForwardBusy', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardBusy',

    model: 'NgcpCsc.model.CallForwardBusy',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/callForwardBusy.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
