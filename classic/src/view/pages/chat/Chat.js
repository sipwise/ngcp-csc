Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: 'responsivecolumn',

    defaults: {
        margin: 10
    },

    initComponent: function() {
        this.items = [{
            xtype: 'chatlist',
            ui: 'core-container',
            userCls: 'big-30 small-100',
            collapsible: true
        }, {
            height: Ext.getCmp('mainContainer').getHeight() - 50,
            xtype: 'chatcontainer',
            userCls: 'big-70 small-100'
        }];
        this.callParent();
    }

});
