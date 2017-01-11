Ext.define('NgcpCsc.view.pages.chat.ChatList', {
    extend: 'Ext.tree.Panel',

    alias: 'widget.chatlist',

    controller: 'chatlist',

    itemId: 'chatlist',

    title: Ngcp.csc.locales.chat.title[localStorage.getItem('languageSelected')],

    hideHeaders: true,

    cls: 'navigation-email',

    store: 'ChatList',

    rootVisible: false,

    viewConfig: {
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
            name: 'newChatBtn',
            text: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            handler: 'createNewChannel'
        },'->',
        {
            xtype: 'button',
            name: 'commitChangesBtn',
            text: Ngcp.csc.locales.common.done[localStorage.getItem('languageSelected')],
            handler: 'save',
            hidden: true
        }]
    }],
    listeners: {
        beforeitemclick: 'nodeClicked',
        selectionchange: 'onNodeSelected'
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
                return (context.record && !context.record.get('leaf')) ? 'x-add-user-display' : '';
            },
            handler: 'addUser'
        },{
            getClass: function(value, context) {
                return (context.record && !context.record.get('leaf') && context.record.get('name') !== 'Buddies') ? 'x-drop-display' : '';
            },
            handler: 'deleteNode'
        }]
    }]
});
