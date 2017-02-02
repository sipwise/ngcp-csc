Ext.define('NgcpCsc.model.Conversation', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'call_type',
        type: 'string'
    }, {
        name: 'source_cli',
        type: 'string'
    }, {
        name: 'duration',
        type: 'string'
    }, {
        name: 'charges',
        type: 'string'
    },{
        name: 'status',
        type: 'string'
    }, {
        name: 'start_time',
        type: 'string'
    }, {
        name: 'number',
        type: 'string'
    }, {
        name: 'direction',
        type: 'string'
    }, {
        name: 'pages',
        type: 'string'
    }, {
        name: 'timeGroup',
        type: 'string',
        persist: false
    }]
});
