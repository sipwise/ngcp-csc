Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    viewModel: 'chat',

    controller: 'chat',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'chatlist',
        flex:1,
        padding: '0 1 0 3',
        scrollable:true
    }, {
        xtype: 'tabpanel',
        flex: 5,
        plugins: 'tabreorderer',
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
    }]

});
