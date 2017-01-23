Ext.define('NgcpCsc.model.Seat', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'extension',
        type: 'string'
    }, {
        name: 'groups',
        type: 'string'
    },{
        name: 'numbers',
        type: 'string'
    }, {
        name: 'phone_devices',
        type: 'string'
    }]
});
