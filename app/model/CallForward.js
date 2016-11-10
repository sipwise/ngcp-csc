Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'phone',
        type: 'string'
    }, {
        name: 'active',
        type: 'boolean'
    }, {
        name: 'ring_for',
        type: 'string'
    }]

});
