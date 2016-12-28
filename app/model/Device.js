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
        name: 'image',
        type: 'string'
    }, {
        name: 'destinations',
        type: 'auto'
    }]
});
