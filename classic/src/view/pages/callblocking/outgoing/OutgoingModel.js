Ext.define('NgcpCsc.view.pages.callblocking.outgoing.OutgoingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.outgoing',

    links:{
        outgoing:{
            type:"NgcpCsc.model.CallBlocking",
            id: Ext.id()
        }
    }
});
