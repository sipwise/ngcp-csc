Ext.define('NgcpCsc.model.VoiceMail', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'callee',
        type: 'string'
    }, {
        name: 'duration',
        type: 'string'
    }, {
        name: 'time',
        type: 'string'
    }, {
        name: 'href',
        type: 'string'
    }]
});
