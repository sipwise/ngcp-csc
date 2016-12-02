Ext.define('NgcpCsc.model.VoiceMailSettings', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'email',
        type: 'string'
    }, {
        name: 'attach_rec',
        type: 'string'
    }, {
        name: 'pin',
        type: 'string'
    }],

    proxy: {
        type: 'ajax',
        url: '/resources/data/voicemailsSettings.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
