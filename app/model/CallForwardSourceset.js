Ext.define('NgcpCsc.model.CallForwardSourceset', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'auto'
    }, {
        name: 'sources',
        type: 'auto'
    }]

});
