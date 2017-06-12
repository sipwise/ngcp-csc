Ext.define('NgcpCsc.store.CallForwardInitial', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardInitial',

    model: 'NgcpCsc.model.CallForwardInitial',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'callforwards', // subscriber id should be read from localStorage
        subscriberId: '175',
        actionMethods: {
            read: 'GET',
            update: 'PATCH' // NOTE: Same endpoint PUT/PATCH logic as for callblocking, so leaving this as is
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cfStoreLoaded', this, recs[0]);
        },
        beforesync: function(options) {
            this.fireEvent('cfStoreBeforeSync', this, options);
        }
    }
});
