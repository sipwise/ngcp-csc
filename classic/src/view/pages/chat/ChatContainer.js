Ext.define('NgcpCsc.view.pages.chat.ChatContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'chatcontainer',
    plugins: 'tabreorderer',
    viewModel: 'chat',
    controller: 'chat',
    title: null,
    dockedItems: [{
        xtype: 'toolbar',
        cls: 'new-message-cont',
        fixed: true,
        margin: '0 5 5 5',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textarea',
            bind: {
                value: '{new_message}'
            },
            cls: 'new-message',
            name: 'new-message',
            enableKeyEvents: true,
            height: 100,
            flex:8,
            emptyText: Ngcp.csc.locales.chat.msg_box.empty_text[localStorage.getItem('languageSelected')],
            listeners: {
                keypress: 'onPressEnter'
            }
        }, {
            flex:1,
            xtype: 'button',
            cls: 'submit-new-message',
            text: Ngcp.csc.locales.common.submit[localStorage.getItem('languageSelected')],
            handler: 'onPressSubmitBtn'
        }]
    }]
})
