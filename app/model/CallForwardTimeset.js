Ext.define('NgcpCsc.model.CallForwardTimeset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'day',
        type: 'string'
    }, {
        name: 'time_full',
        type: 'string'
    }, {
        name: 'time_from',
        type: 'string'
    }, {
        name: 'time_to',
        type: 'string'
    }, {
        name: 'closed',
        type: 'boolean'
    }]

});
