Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'outgoing',

    _displayIncomingOutgoingSection: true,
    _displayOutgoingSection: true,
    _vmPrefix: 'outgoing_',

    initComponent: function () {
        var outgoingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
            store: Ext.create('NgcpCsc.store.CallBlocking',{
                storeId: 'CallBlockingOutgoing',
                _type: 'block_out_list'
            })
        });
        this.items = [outgoingGrid];
        this.callParent();
    }

});
