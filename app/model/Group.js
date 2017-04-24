Ext.define('NgcpCsc.model.Group', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'hunt_policy',
        type: 'string'
    }, {
        name: 'hunt_timeout',
        type: 'string'
    }]
});
