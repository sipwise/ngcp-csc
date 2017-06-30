Ext.define('NgcpCsc.store.CallBlocking', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlocking',

    model: 'NgcpCsc.model.CallBlocking',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'subscriberpreferences',
        addSubscriber: true,
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            if(recs){
                this.fireEvent('cbStoreLoaded', this, recs[0]);
            }
        },
        beforesync: function(options) {
            this.fireEvent('cbStoreBeforeSync', this, options);
        }
    }
});
