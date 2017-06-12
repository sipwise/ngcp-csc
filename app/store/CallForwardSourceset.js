Ext.define('NgcpCsc.store.CallForwardSourceset', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardSourceset',

    model: 'NgcpCsc.model.CallForwardSourceset',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'cfsourcesets',
        subscriberId: '195',
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cfSourcesetStoreLoaded', this, recs[0]);
        }
    }

});
