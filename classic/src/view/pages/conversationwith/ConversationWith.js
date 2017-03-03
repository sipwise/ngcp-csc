// CHAT
// . when call, sms or fax are sent/triggered add entry in chat
// [DONE] when chat is opened, display topbar (add fax, sms, call to chat data)
// . create multiple submit text btn (chat, sms, call)
// . change how contacts look like in mobile
// [DONE] chat should not be a tabpanel anymore
// . apply filters on conversationwith
// [DONE] clicking on user in chat opens conversationwith
// [DONE] rename the module from chat to conversationwith
// . change data
Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWith', {
    extend: 'Ext.tab.Panel',
    xtype: 'conversationwith',
    cls: 'chat-container',
    plugins: 'tabreorderer',
    viewModel: 'conversationwith',
    controller: 'conversationwith',
    title: null,
    listeners: {
        render: 'hideTabBar'
    },
    dockedItems: [Ext.create('NgcpCsc.view.pages.conversations.ConversationsToolbar'), {
        xtype: 'toolbar',
        reference: 'chat-bottom-bar',
        cls: 'new-message-cont',
        fixed: true,
        margin: '0 5 5 5',
        dock: 'bottom',
        hidden: true,
        items: [{
            width: '100%',
            xtype: 'container',
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
                menu: [{
                    text: 'Send as SMS'
                }, {
                    text: 'Send as chat message'
                }],
                iconCls: 'fa fa-send',
                cls: 'submit-new-message',
                handler: 'onPressSubmitBtn'
            }]
        }]
    }]
})
