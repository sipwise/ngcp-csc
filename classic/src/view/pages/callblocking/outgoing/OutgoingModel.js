Ext.define('NgcpCsc.view.pages.callblocking.outgoing.OutgoingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.outgoing',

    links:{
        callbarring:{
            type:"NgcpCsc.model.CallBarring",
            id: Ext.id()
        }
    },

    stores: {
        outgoingCalls: 'CallBarringOutgoing'
    }
});
