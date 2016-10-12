Ext.define('NgcpCsc.model.Call', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'call-type',
        type: 'string'
    }, {
        name: 'source-cli',
        type: 'string'
    }, {
        name: 'duration',
        type: 'string'
    }, {
        name: 'charges',
        type: 'string'
    }, {
        name: 'start_time',
        type: 'string'
    }, {
        name: 'timeGroup',
        type: 'string',
        persist: false
    }]
});
