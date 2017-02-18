Ext.define('NgcpCsc.model.CallBlockingIncoming', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'block_list',
        type: 'string'
    }, {
        name: 'enabled',
        type: 'boolean'
    }]
});
