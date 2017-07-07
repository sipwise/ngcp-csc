Ext.define('NgcpCsc.store.CallForwardSourceset', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardSourceset',

    model: 'NgcpCsc.model.CallForwardSourceset',

    proxy: {
        type: 'ngcp-api',
        route: 'cfsourcesets',
        params: 'subscriber_id=' + localStorage.getItem('subscriber_id'),
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cfSourcesetStoreLoaded', this, recs[0]);
        },
        beforesync: function(options) {
            this.fireEvent('cfSourcesetBeforeSync', this, options);
        }
    }

});
