Ext.define('NgcpCsc.model.CFOffline', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    links: {
        destination: {
            type: 'NgcpCsc.model.CFOffline',
            id: Ext.id() // generates random id (required)
            // NOTE: There is probably a better way to structure this, but I am
            // envisioning a store of all mappings.offline records
        }
    }
});
