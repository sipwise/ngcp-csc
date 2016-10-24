Ext.define('NgcpCsc.view.pages.voicemails.VoiceMailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.voicemails',

    stores:{
        voicemails: 'VoiceMails'
    },

    data: {
        email: '1234@1.2.3.4',
        attach_rec: true,
        pin: '1234'
    },

    formulas:{
        month_summary: function(get){
            return 'October';
        }
    }
});
