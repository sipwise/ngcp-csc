Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.incoming',

    links:{
        callblocking:{
            type:"NgcpCsc.model.CallBlocking",
            id: Ext.id()
        }
    },

    stores: {
        incomingCalls: 'CallBlockingIncoming'
    }
});
