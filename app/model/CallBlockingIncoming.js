Ext.define('NgcpCsc.model.CallBlockingIncoming', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'block_in_list',
        type: 'string'
    }, {
        name: 'enabled',
        type: 'boolean'
    }]
});
