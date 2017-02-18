Ext.define('NgcpCsc.view.pages.callblocking.incoming.IncomingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.incoming',

    links:{
        callbarring:{
            type:"NgcpCsc.model.CallBarring",
            id: Ext.id()
        }
    },

    stores: {
        incomingCalls: 'CallBarringIncoming'
    }
});
