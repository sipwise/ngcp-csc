Ext.define('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

    // autoSync: true,

    proxy: {
        type: 'ngcp-api',
        route: 'cfmappings',
        subscriberId: '175',
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
