Ext.define('NgcpCsc.view.pages.callblocking.outgoing.Outgoing', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'outgoing',

    initComponent: function () {
        var outgoingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
            store: 'CallBlockingOutgoing',
            reference: 'OutgoingGrid'
        });
        this.items = [outgoingGrid];
        this.callParent();
    }

});
