Ext.define('NgcpCsc.view.pages.callblocking.outgoing.OutgoingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.outgoing',

    links:{
        callblocking:{
            type:"NgcpCsc.model.CallBlocking",
            id: Ext.id()
        }
    },

    stores: {
        outgoingCalls: 'CallBlockingOutgoing'
    }
});
