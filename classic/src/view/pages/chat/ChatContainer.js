Ext.define('NgcpCsc.view.pages.chat.ChatContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'chatcontainer',
    cls: 'chat-container',
    plugins: 'tabreorderer',
    viewModel: 'chat',
    controller: 'chat',
    title: null,
    //html: Ext.String.format('<div class="chat-default-msg-cont">{0}</div>', Ngcp.csc.locales.chat.default_msg[localStorage.getItem('languageSelected')]),
    listeners: {
        remove: 'tabRemoved'
    },
    dockedItems: [{
        xtype: 'toolbar',
        reference: 'chat-bottom-bar',
        cls: 'new-message-cont',
        fixed: true,
        margin: '0 5 5 5',
        dock: 'bottom',
        hidden: true,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'textarea',
            bind: {
                value: '{message.new_message}'
            },
            cls: 'new-message',
            name: 'new-message',
            enableKeyEvents: true,
            height: 100,
            flex: 8,
            emptyText: Ngcp.csc.locales.chat.msg_box.empty_text[localStorage.getItem('languageSelected')],
            listeners: {
                keypress: 'onPressEnter'
            }
        }, {
            flex: 1,
            xtype: 'button',
            iconCls: 'fa fa-send',
            cls: 'submit-new-message',
            handler: 'onPressSubmitBtn'
        }]
    }]
})
