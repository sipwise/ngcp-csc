Ext.define('NgcpCsc.view.pages.callforward.CallForwardModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.callforward'

    ,links: {
        callforward: {
            type: 'NgcpCsc.model.CallForward',
            id: Ext.id()
        }
    }

});
