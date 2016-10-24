Ext.define('NgcpCsc.model.VoiceMail', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'caller',
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
