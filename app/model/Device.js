Ext.define('NgcpCsc.model.Device', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'destinations',
        type: 'auto'
    }]
});
