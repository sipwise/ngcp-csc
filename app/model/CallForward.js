Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'type',
        type: 'auto'
    }, {
        name: 'destination',
        type: 'auto'
    }, {
        name: 'timeout',
        type: 'auto'
    }, {
        name: 'sourceset',
        type: 'auto'
    }, {
        name: 'timeset',
        type: 'auto'
    }]

});
