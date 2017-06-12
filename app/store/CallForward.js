Ext.define('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

    // TODO: (For PUT/PATCH ticket)
    // autoSync: true,

    proxy: {
        type: 'ngcp-api',
        route: 'cfmappings',
        subscriberId: '195',
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    }
    
    // TODO: (For PUT/PATCH ticket)
    // ,listeners: {
    //     beforesync: function(options) {
    //         this.fireEvent('cfStoreBeforeSync', this, options);
    //     }
    // }

});
