Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'type',
        type: 'auto'
    }, {
        name: 'destination_cleaned',
        type: 'auto'
    }, {
        name: 'destination_announcement_id',
        type: 'auto'
    }, {
        name: 'destination',
        type: 'auto'
    }, {
        name: 'priority',
        type: 'auto'
    }, {
        name: 'simple_destination',
        type: 'auto'
    }, {
        name: 'ring_for',
        type: 'auto'
    }, {
        name: 'sourceset',
        type: 'auto'
    }, {
        name: 'timeset',
        type: 'auto'
    }, {
        name: 'destinationset_id',
        type: 'auto'
    }, {
        name: 'destinationset_name',
        type: 'auto'
    }]

});
