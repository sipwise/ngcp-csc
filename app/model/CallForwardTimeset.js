Ext.define('NgcpCsc.model.CallForwardTimeset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'timeset_name',
        type: 'auto'
    }, {
        name: 'timeset_id',
        type: 'auto'
    }, {
        name: 'time_from',
        type: 'auto'
    }, {
        name: 'time_to',
        type: 'auto'
    }, {
        name: 'day',
        type: 'auto'
    }, {
        name: 'closed',
        type: 'auto'
    }]

});
