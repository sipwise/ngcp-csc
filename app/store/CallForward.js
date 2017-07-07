Ext.define('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

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
