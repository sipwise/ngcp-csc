Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    viewModel: 'conversations',

    controller: 'conversations',

    title: Ngcp.csc.locales.conversations.section_title[localStorage.getItem('languageSelected')],

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
                    handler: 'openCallPanel',
                    iconAlign: 'top',
                    scale: 'medium',
                    ui: 'conversations-actions-btn'
                },
                items: [{
                    text: Ngcp.csc.locales.conversations.btns.new_sms[localStorage.getItem('languageSelected')],
                    itemId: 'newSms',
                    iconCls: 'x-fa fa-envelope fa',
                    margin: '0 20 0 0',
                    tooltip: Ngcp.csc.locales.conversations.tooltips.new_sms[localStorage.getItem('languageSelected')]
                }, {

                    text: Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')],
                    itemId: 'newCall',
                    iconCls: 'x-fa fa-phone fa',
                    margin: '0 20 0 0',
                    tooltip: Ngcp.csc.locales.conversations.tooltips.new_call[localStorage.getItem('languageSelected')]
                }, {
                    text: Ngcp.csc.locales.conversations.btns.new_fax[localStorage.getItem('languageSelected')],
                    itemId: 'newfax',
                    iconCls: 'x-fa fa-file-text fa',
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
