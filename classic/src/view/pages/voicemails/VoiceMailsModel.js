Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.voicemails',

    stores:{
        voicemails: 'VoiceMails'
    },

    links:{
        settings: {
            type: 'NgcpCsc.model.VoiceMailSettings',
            id: Ext.id() // genrates random id (required)
        }
    },

    formulas:{
        month_summary: function(get){
            return 'October';
        }
    }
});
