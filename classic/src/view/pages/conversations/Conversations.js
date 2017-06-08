Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    viewModel: 'conversations',

    controller: 'conversations',

    initComponent: function() {

        this.dockedItems = Ext.create('NgcpCsc.view.pages.conversations.ConversationsToolbar');

        this.items = [{
            xtype: 'conversations-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
