Ext.define('NgcpCsc.view.pages.callblocking.incoming.Incoming', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'incoming',

    initComponent: function () {
        var incomingGrid = Ext.create('NgcpCsc.view.pages.callblocking.CallBlockingGrid', {
            store: 'CallBlockingIncoming',
            reference: 'IncomingGrid'
        });
        this.items = [incomingGrid];
        this.callParent();
    }

});
