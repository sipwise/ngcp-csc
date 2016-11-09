Ext.define('NgcpCsc.view.pages.chat.ChatContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'chatcontainer',
    plugins: 'tabreorderer',
    viewModel: 'chat',
    controller: 'chat',
    dockedItems: [{
        xtype: 'toolbar',
        cls: 'new-message-cont',
        fixed: true,
        padding: '0 0 10 0',
        dock: 'bottom',
        items: [{
            xtype: 'textarea',
            bind: {
                value: '{new_message}'
            },
            cls: 'new-message',
            name: 'new-message',
            enableKeyEvents: true,
            height: 100,
            width: '90%',
            emptyText: Ngcp.csc.locales.chat.msg_box.empty_text[localStorage.getItem('languageSelected')],
            listeners: {
                keypress: 'onPressEnter'
            }
        }, {
            xtype: 'button',
            cls: 'submit-new-message',
            text: Ngcp.csc.locales.common.submit[localStorage.getItem('languageSelected')],
            handler: 'onPressSubmitBtn'
        }]
    }]
})
