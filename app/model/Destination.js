Ext.define('NgcpCsc.model.Destination', {
    extend: 'Ext.data.Model',

    fields: ['id', {
        name: 'name',
        type: 'string'
    }, {
        name: 'sound',
        type: 'string'
    }, {
        name: 'position',
        type: 'string'
    }]
});
