Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id', // NOTE: This endpoint doesn't have an id value
        type: 'string'
    }, {
        name: 'type',
        type: 'auto'
    }, {
        name: 'destination',
        type: 'auto'
    }, {
        name: 'timeout',
        type: 'auto'
    }, {
        name: 'sourceset',
        type: 'auto'
    }, {
        name: 'timeset',
        type: 'auto'
    }]

});
