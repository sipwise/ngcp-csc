Ext.define('NgcpCsc.view.pages.chat.ChatList', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.chatlist',

    viewModel: {
        type: 'chatlist'
    },

    controller: 'chatlist',

    title: Ngcp.csc.locales.chat.title[localStorage.getItem('languageSelected')],

    cls: 'navigation-email',

    iconCls: 'x-fa fa-group',

    floating: false,

    listeners: {
        click: 'itemListClicked'
    }
});
