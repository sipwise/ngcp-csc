Ext.define('NgcpCsc.view.pages.callblocking.privacy.Privacy', {
    extend: 'NgcpCsc.view.pages.callblocking.CallBlocking',

    xtype: 'privacy',

    _displayPrivacySection: true,
    _vmPrefix: 'privacy_',

    initComponent: function() {
        // this can also be a model, as only it's one record store
        var incomingStore = Ext.create('NgcpCsc.store.CallBlocking', {
            storeId: 'CallBlockingPrivacy',
            _type: 'privacy'
        });
        this.callParent();
    }
});
