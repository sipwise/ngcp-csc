Ext.define('NgcpCsc.model.HuntGroup', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'hunting_policy',
        type: 'string'
    }, {
        name: 'serial_hunting_timeout',
        type: 'string'
    }]
});
