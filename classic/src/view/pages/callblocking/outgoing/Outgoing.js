Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'outgoing',

    _displayIncomingOutgoingSection: true,

    initComponent: function () {
        var outgoingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
            store: 'CallBlockingOutgoing'
        });
        this.items = [outgoingGrid];
        this.callParent();
    }

});
