// CHAT
// [DONE] when call, sms or fax are sent/triggered add entry in chat
// [DONE] when chat is opened, display topbar (add fax, sms, call to chat data)
// [DONE] create multiple submit text btn (chat, sms, call)
// [DONE] chat should not be a tabpanel anymore
// >>> apply filters on conversationwith
// [DONE] clicking on user in chat opens conversationwith
// [DONE] rename the module from chat to conversationwith
// [DONE] change data
Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWith', {
    extend: 'Ext.tab.Panel',
    xtype: 'conversationwith',
    cls: 'conversation-with-container',
    plugins: 'tabreorderer',
    viewModel: 'conversationwith',
    controller: 'conversationwith',
    title: null,
    scrollable:false,
    listeners: {
        render: 'hideTabBar'
    },
    dockedItems: [Ext.create('NgcpCsc.view.pages.conversations.ConversationsToolbar'),
    {
        xtype: 'toolbar',
        dock: 'top',
        height:60,
        cls: 'toolbar-cont',
        items:['->',{
            text:'Older',
            handler: 'loadOlderMsg'
        },'->']
    }
    , {
        xtype: 'toolbar',
        reference: 'chat-bottom-bar',
        cls: 'toolbar-cont',
        fixed: true,
        margin: '0 5 5 5',
        dock: 'bottom',
        items: [{
            width: '100%',
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'textfield',
                cls: 'new-message',
                reference:'newmessage',
                enableKeyEvents: true,
                flex: 8,
                emptyText: Ngcp.csc.locales.conversationwith.msg_box.empty_text[localStorage.getItem('languageSelected')],
                listeners: {
                    keypress: 'onPressEnter'
                }
            }, {
                flex: 1,
                xtype: 'button',
                menu: {
                    defaults:{
                        handler:'onPressSubmitBtn'
                    },
                    items:[{
                        text: 'Send as SMS',
                        value:'sms'
                    }, {
                        text: 'Send as chat message',
                        value:'chat'
                    }]
                },
                bind:{
                    iconCls: '{iconcls}',
                },
                cls: 'submit-new-message'
            }]
        }]
    }]
})
