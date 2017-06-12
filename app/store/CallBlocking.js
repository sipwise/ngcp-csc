Ext.define('NgcpCsc.store.CallBlocking', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlocking',

    model: 'NgcpCsc.model.CallBlocking',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'subscriberpreferences', // subscriber id should be read from localStorage
        subscriberId: '195',
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('cbStoreLoaded', this, recs[0]);
        },
        beforesync: function(options) {
            this.fireEvent('cbStoreBeforeSync', this, options);
        }
    }
});
