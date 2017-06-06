Ext.define('NgcpCsc.model.CFDestination', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    links: {
        destination: {
            type: 'NgcpCsc.model.CFDestinationset',
            id: Ext.id() // generates random id (required)
            // NOTE: There is probably a better way to structure this, but I am
            // envisioning a store of all destinationset.destinations records
        }
    }
});
