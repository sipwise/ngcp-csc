Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    controller: 'conversations',

    viewModel: 'conversations',

    title: Ngcp.csc.locales.conversations.section_title[localStorage.getItem('languageSelected')],

    initComponent: function() {
        this.items = [{
            xtype: 'conversations-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
