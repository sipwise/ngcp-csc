Ext.define('NgcpCsc.store.CallForwardDestinations', {
    extend: 'Ext.data.Store',

    storeId: 'CallForwardDestinations',

    model: 'NgcpCsc.model.CallForwardDestination',

    proxy: {
        type: 'ngcp-api',
        route: 'cfmappings',
        addSubscriber: true,
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        beforesync: function(options) {
            this.fireEvent('cfStoreBeforeSync', this, options);
        }
    }

});
