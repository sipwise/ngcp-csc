Ext.define('NgcpCsc.model.CallBlocking', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'block_list',
        type: 'string'
    }, {
        name: 'block_in_mode',
        type: 'boolean'
    }, {
        name: 'block_out_mode',
        type: 'boolean'
    },{
        name: 'clir',
        type: 'boolean'
    },  {
        name: 'enabled',
        type: 'boolean'
    }]

});
