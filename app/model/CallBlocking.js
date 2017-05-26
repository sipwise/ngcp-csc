Ext.define('NgcpCsc.model.CallBlocking', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'block_list',
        type: 'string'
    }, {
        name: 'enabled',
        type: 'boolean'
    }]

});
