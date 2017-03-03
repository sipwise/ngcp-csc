Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWith', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversationwith',

    layout: 'fit',

    defaults: {
        margin: 10
    },

    initComponent: function() {
        this.items = [{
            xtype: 'conversationwith-container'
        }];
        this.callParent();
    }
});
