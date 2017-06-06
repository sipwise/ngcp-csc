Ext.define('NgcpCsc.model.CFBusy', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    links: {
        destination: {
            type: 'NgcpCsc.model.CFBusy',
            id: Ext.id() // generates random id (required)
            // NOTE: There is probably a better way to structure this, but I am
            // envisioning a store of all mappings.busy records
        }
    }
});
