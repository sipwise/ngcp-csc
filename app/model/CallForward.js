Ext.define('NgcpCsc.model.CallForward', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'from', type: 'string' },
        { name: 'when', type: 'string' },
        { name: 'to', type: 'string' }
    ]

});
