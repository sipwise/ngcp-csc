Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'incoming',

    _displayIncomingOutgoingSection: true,
    _displayIncomingSection: true,
    _vmPrefix: 'incoming_',

    initComponent: function () {
        var incomingStore = Ext.create('NgcpCsc.store.CallBlocking',{
            storeId: 'CallBlockingIncoming',
            _type: 'block_in_list'
        });
        var incomingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
            store: incomingStore
        });
        this.items = [incomingGrid];
        this.callParent(arguments);
    }

});
