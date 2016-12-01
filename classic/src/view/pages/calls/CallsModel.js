Ext.define('NgcpCsc.view.pages.calls.CallsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.calls',

    stores: {
        voicemails: 'VoiceMails'
    },

    links: {
        settings: {
            type: 'NgcpCsc.model.VoiceMailSettings',
            id: Ext.id() // genrates random id (required)
        }
    }
});
