Ext.define('NgcpCsc.model.Reminder', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'time',
        type: 'auto'
    }, {
        name: 'recur',
        type: 'auto'
    }, {
        name: 'active',
        type: 'boolean'
    }]

});
