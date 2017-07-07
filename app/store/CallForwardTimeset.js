Ext.define('NgcpCsc.store.CallForwardTimeset', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardTimeset',

    model: 'NgcpCsc.model.CallForwardTimeset',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'cftimesets',
        params: 'subscriber_id=' + localStorage.getItem('subscriber_id'),
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cfTimesetStoreLoaded', this, recs[0]);
        },
        beforesync: function(options) {
            this.fireEvent('cfTimesetBeforeSync', this, options);
        }
    }

});
