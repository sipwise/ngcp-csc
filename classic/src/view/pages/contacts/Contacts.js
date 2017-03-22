Ext.define('NgcpCsc.view.pages.contacts.Contacts', {
    extend: 'Ext.tree.Panel',

    alias: 'widget.contacts',

    controller: 'contacts',

    itemId: 'contacts',

    hideHeaders: true,

    cls: 'contacts',

    store: 'Contacts',

    rootVisible: false,

    scrollable: true,

    collapsible: true,

    collapseDirection: 'left',

    title: Ngcp.csc.locales.contacts.title[localStorage.getItem('languageSelected')],

    viewConfig: {
        listeners: {
            beforecellclick: 'preventTabOpen'
        }
    },

    listeners: {
        beforeitemclick: 'nodeClicked',
        checkchange: 'onNodeChecked'
    },


    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'button',
            name: 'showNewChatBtn',
            text: Ngcp.csc.locales.conversationwith.new_group[localStorage.getItem('languageSelected')],
            handler: 'showCreationFields',
            align: 'right'
        }, {
            xtype: 'textfield',
            name: 'newChatName',
            hidden: true,
            emptyText: Ngcp.csc.locales.conversationwith.provide_name[localStorage.getItem('languageSelected')],
            minLength: 1,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onPressEnter'
            }
        }, {
            xtype: 'button',
            name: 'newChatBtn',
            hidden: true,
            text: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            handler: 'createNewChannel'
        }]
    }],
    bbar: ['->', {
        name: 'commitChangesBtn',
        text: Ngcp.csc.locales.common.done[localStorage.getItem('languageSelected')],
        handler: 'save',
        hidden: true,
        margin: '0 10 5 0'
    }],

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
                var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook"  ? '-extra-margin' : '';
                return ((context.record && context.record.get('leaf') && context.record.get('online')) ? 'x-phone-display' : '') + extraMarginRight;
            },
            handler: 'startCall'
        }, {
            tooltip: Ngcp.csc.locales.common.videocall[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook"  ? '-extra-margin' : '';
                return ((context.record && context.record.get('leaf') && context.record.get('online')) ? 'x-video-display' : '' ) + extraMarginRight;
            },
            handler: 'startVideoCall'
        }, {
            getClass: function(value, context) {
                return (context.record && !context.record.get('leaf')) ? 'x-add-user-display' : '';
            },
            handler: 'addUser'
        }, {
            getClass: function(value, context) {
                return (context.record && context.record.get('leaf') && context.record.parentNode.get('id') == "addressbook") ? 'x-remove-user-display' : '';
            },
            handler: 'deleteUser'
        }, {
            getClass: function(value, context) {
                return (context.record && !context.record.get('leaf')) ? 'x-drop-display' : '';
            },
            handler: 'deleteNode'
        }]
    }]
});
