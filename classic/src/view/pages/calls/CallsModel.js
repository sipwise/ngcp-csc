Ext.define('NgcpCsc.view.pages.calls.CallsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.calls',

    data: {
        filtersVisible: false
    },

    links: {
        settings: {
            type: 'NgcpCsc.model.VoiceMailSettings',
            id: Ext.id() // genrates random id (required)
        }
    }
});
