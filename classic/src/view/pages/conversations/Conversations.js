Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    viewModel: 'conversations',

    controller: 'conversations',

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'conversations-actions-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 35' : '-5 0 0 15',
                width: Ext.os.is.Desktop ? 810 : '100%',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'button',
                    flex: 1,
                    iconAlign: 'top',
                    scale: 'medium',
                    ui: 'conversations-actions-btn'
                },
                items: [{
                    text: Ngcp.csc.locales.conversations.btns.new_sms[localStorage.getItem('languageSelected')],
                    itemId: 'newSms',
                    iconCls: Ngcp.csc.icons.sms,
                    overCls: 'conversations-btn-over',
                    margin: '0 20 0 0',
                    handler: 'composeSms',
                    tooltip: Ngcp.csc.locales.conversations.tooltips.new_sms[localStorage.getItem('languageSelected')]
                }, {

                    text: Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')],
                    itemId: 'newCall',
                    iconCls: Ngcp.csc.icons.phone,
                    overCls: 'conversations-btn-over',
                    margin: '0 20 0 0',
                    handler: 'composeCall',
                    tooltip: Ngcp.csc.locales.conversations.tooltips.new_call[localStorage.getItem('languageSelected')]
                }, {
                    text: Ngcp.csc.locales.conversations.btns.new_fax[localStorage.getItem('languageSelected')],
                    itemId: 'newfax',
                    iconCls: Ngcp.csc.icons.faxpaper,
                    overCls: 'conversations-btn-over',
                    handler: 'composeFax',
                    tooltip: Ngcp.csc.locales.conversations.tooltips.new_fax[localStorage.getItem('languageSelected')]
                }]
            }]
        }];

        this.items = [{
            xtype: 'conversations-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
