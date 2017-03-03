// CHAT
// . when call, sms or fax are sent/triggered add entry in chat
// . when chat is opened, display topbar (add fax, sms, call to chat data)
// . create multiple submit text btn (chat, sms, call)
// . change how contacts look like in mobile
// . chat should not be a tabpanel anymore
// . apply filters on conversationwith
// . clicking on user in chat opens conversationwith
// . rename the module from chat to conversationwith
Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'conversationwith-container',
    cls: 'chat-container',
    plugins: 'tabreorderer',
    viewModel: 'conversationwith',
    controller: 'conversationwith',
    title: null,
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
            emptyText: Ngcp.csc.locales.conversationwith.msg_box.empty_text[localStorage.getItem('languageSelected')],
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
