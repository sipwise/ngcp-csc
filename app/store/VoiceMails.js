Ext.define('NgcpCsc.store.VoiceMails', {
    extend: 'Ext.data.Store',

    storeId: 'VoiceMails',

    model: 'NgcpCsc.model.VoiceMail',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/voicemails.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
