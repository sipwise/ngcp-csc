Ext.define('NgcpCsc.model.CallForwardSourceset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'sourceset_name'
    }, {
        name: 'sourceset_id'
    }, {
        name: 'source'
    }, {
        name: 'edit',
        type: 'boolean'
    }]

});
