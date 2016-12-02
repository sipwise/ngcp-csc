Ext.define('NgcpCsc.view.pages.callbarring.CallBarringModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.callbarring',

    links:{
        settings:{
            type:"NgcpCsc.model.CallBarring",
            id: Ext.id()
        }
    },

    stores: {
        incomingCalls: 'CallBarringIncoming',
        outgoingCalls: 'CallBarringOutgoing'
    }
});
