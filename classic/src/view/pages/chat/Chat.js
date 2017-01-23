Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: 'responsivecolumn',

    defaults: {
        ui: 'core-container',
        margin: 10
    },

    title: Ngcp.csc.locales.chat.title[localStorage.getItem('languageSelected')],

    initComponent: function() {
        this.items = [{
            xtype: 'chatlist',
            userCls: 'big-30 small-100',
            collapsible: true
        }, {
            height: Ext.getCmp('mainContainer').getHeight() - 105,
            xtype: 'chatcontainer',
            userCls: 'big-70 small-100'
        }]
        this.callParent();
    }

});
