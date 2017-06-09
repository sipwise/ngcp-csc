Ext.define('NgcpCsc.model.Notification', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'conversation_type',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'direction',
        type: 'string'
    }, {
        name: 'start_time',
        type: 'date'
    }]

});
