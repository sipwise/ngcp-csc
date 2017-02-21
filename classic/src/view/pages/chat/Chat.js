Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: 'fit',

    defaults: {
        margin: 10
    },

    initComponent: function() {
        this.items = [{
            xtype: 'chatcontainer'
        }];
        this.callParent();
    }
});
