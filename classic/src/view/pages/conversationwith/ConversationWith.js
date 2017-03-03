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
            text: 'Older',
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
            xtype: 'panel',
            layout: {
                type: 'hbox'
            },
            items: [{
                // bind is dynamically set in controller (search for ".setBind")
                xtype: 'textfield',
                cls: 'new-message',
                reference: 'newmessage',
                enableKeyEvents: true,
                flex: 1,
                emptyText: Ngcp.csc.locales.conversationwith.msg_box.empty_text[localStorage.getItem('languageSelected')],
                listeners: {
                    keypress: 'onPressEnter'
                }
            }, {
                width:50,
                xtype: 'button',
                menu: {
                    defaults:{
                        handler: 'onPressSubmitBtn'
                    },
                    items:[{
                        text: 'Send as SMS',
                        value: 'sms'
                    }, {
                        text: 'Send as chat message',
                        value: 'chat'
                    }]
                },
                bind:{
                    iconCls: '{iconcls}'
                },
                cls: 'submit-new-message'
            },{
                width:35,
                xtype: 'button',
                margin : '0 0 0 5',
                cls: 'rtc-icons',
                iconCls: 'x-fa fa-phone',
                handler: 'onPressCallBtn'
            }]
        }]
    }]
})
