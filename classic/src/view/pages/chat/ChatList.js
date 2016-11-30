Ext.define('NgcpCsc.view.pages.chat.ChatList', {
    extend: 'Ext.tree.Panel',

    alias: 'widget.chatlist',

    controller: 'chatlist',

    itemId:'chatlist',

    title: Ngcp.csc.locales.chat.title[localStorage.getItem('languageSelected')],

    hideHeaders: true,

    cls: 'navigation-email',

    store: 'ChatList',

    rootVisible: false,

    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            sortOnDrop: true,
            containerScroll: true
        },
        listeners: {
            beforecellclick: 'preventTabOpen'
        }
    },

    tools: [{
        type: 'plus',
        tooltip: Ngcp.csc.locales.chat.new_group[localStorage.getItem('languageSelected')],
        callback: 'showTabBar'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        hidden: true,
        items: [{
            xtype: 'textfield',
            name: 'newChatName',
            width: '80%',
            emptyText: Ngcp.csc.locales.chat.provide_name[localStorage.getItem('languageSelected')],
            minLength: 1
        }, {
            xtype: 'button',
            text: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            handler: 'createNewChannel'
        }]
    }],
    listeners: {
        beforeitemclick: 'nodeClicked',
        beforedrop: 'onBeforeUserDropped'
    },

    defaults: {
        menuDisabled: true
    },

    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        renderer: 'renderStatus',
        flex: 2
    }, {
        xtype: 'actioncolumn',
        text: 'actions',
        flex: 1,
        items: [{
            tooltip: Ngcp.csc.locales.common.call[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                return (context.record && context.record.get('leaf') && context.record.get('online')) ? 'x-phone-display' : '';
            },
            handler: 'startCall'
        }, {
            tooltip: Ngcp.csc.locales.common.videocall[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                return (context.record && context.record.get('leaf') && context.record.get('online')) ? 'x-video-display' : '';
            },
            handler: 'startVideoCall'
        }, {
            getClass: function(value, context) {
                return (context.record && !context.record.get('leaf')) ? 'x-drop-display' : '';
            },
            handler: 'deleteNode'
        }]
    }]
});
