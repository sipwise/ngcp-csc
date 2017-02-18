Ext.define('NgcpCsc.model.CallBlockingOutgoing', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'block_out_list',
        type: 'string'
    }, {
        name: 'enabled',
        type: 'boolean'
    }]
});
