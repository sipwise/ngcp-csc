Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: 'fit',

    defaults: {
        margin: 10
    },

    initComponent: function() {
        this.items = [{
            //height: Ext.getCmp('mainContainer').getHeight() - 50,
            xtype: 'chatcontainer',
        }];
        this.callParent();
    }

});
