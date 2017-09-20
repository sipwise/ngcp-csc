Ext.define('NgcpCsc.model.CallForwardTimeset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'timeset_name'
    }, {
        name: 'timeset_id'
    }, {
        name: 'time_from'
    }, {
        name: 'time_to'
    }, {
        name: 'day'
    }]

});
