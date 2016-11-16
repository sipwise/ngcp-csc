Ext.define('NgcpCsc.model.FaxSpool', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'timestamp',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    }, {
        name: 'duration',
        type: 'string'
    }, {
        name: 'direction',
        type: 'string'
    }, {
        name: 'caller',
        type: 'string'
    }, {
        name: 'callee',
        type: 'string'
    }, {
        name: 'pages',
        type: 'string'
    }]

});
