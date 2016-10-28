Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    viewModel: 'chat',

    controller: 'chat',

    layout: 'hbox',

    items: [{
        xtype: 'chatlist',
        width: 200,
        padding: '10 20 20',
        height: '100%'
    }, {
        xtype: 'tabpanel',
        width: '90%',
        height: '100%',
        items: [{
            title: Ngcp.csc.locales.chat.title[localStorage.getItem('languageSelected')],
            xtype: 'chat-notifications',
            id: 'chat-notifications',
            scrollable: true,
            bind: {
                store: '{notifications}'
            }
        }]
    }],

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
            width: '95%',
            listeners: {
                keypress: 'onPressEnter'
            },
            emptyText: Ngcp.csc.locales.chat.msg_box.empty_text[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'button',
            cls: 'submit-new-message',
            text: Ngcp.csc.locales.common.submit[localStorage.getItem('languageSelected')],
            handler: 'onPressSubmitBtn'
        }]
    }]

});
