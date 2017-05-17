Ext.define('NgcpCsc.view.pages.conversations.ConversationsToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    dock: 'top',
    layout: 'center',
    ui: 'conversations-actions-tbar',
    items:  [{
        xtype: 'core-container',
        margin: Ext.os.is.Desktop ? '-5 0 0 22' : '-5 0 0 2',
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
            iconCls: 'x-fa fa-envelope fa',
            overCls: 'conversations-btn-over',
            margin: '0 20 0 0',
            handler: 'composeSms',
            tooltip: Ngcp.csc.locales.conversations.tooltips.new_sms[localStorage.getItem('languageSelected')]
        }, {

            text: Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')],
            itemId: 'newCall',
            iconCls: 'x-fa fa-phone fa',
            overCls: 'conversations-btn-over',
            margin: '0 20 0 0',
            handler: 'composeCall',
            tooltip: Ngcp.csc.locales.conversations.tooltips.new_call[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.conversations.btns.new_fax[localStorage.getItem('languageSelected')],
            itemId: 'newfax',
            iconCls: 'x-fa fa-file-text fa',
            overCls: 'conversations-btn-over',
            handler: 'composeFax',
            tooltip: Ngcp.csc.locales.conversations.tooltips.new_fax[localStorage.getItem('languageSelected')]
        }]
    }]
});
