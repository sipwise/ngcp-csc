Ext.define('NgcpCsc.store.CallForwardTimeset', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardTimeset',

    model: 'NgcpCsc.model.CallForwardTimeset',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'cftimesets',
        params: 'subscriber_id=195',
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cfTimesetStoreLoaded', this, recs[0].data._embedded['ngcp:cftimesets']);
        }
    }

});
