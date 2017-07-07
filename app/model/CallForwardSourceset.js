Ext.define('NgcpCsc.model.CallForwardSourceset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'sourceset_name',
        type: 'auto'
    }, {
        name: 'sourceset_id',
        type: 'auto'
    }, {
        name: 'source',
        type: 'auto'
    }, {
        name: 'edit',
        type: 'boolean'
    }]

});
