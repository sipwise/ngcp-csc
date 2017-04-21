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
        checkchange: 'onNodeChecked',
        beforeitemexpand: 'resizePanel',
        beforeitemcollapse: 'resizePanel',
        itemexpand: 'nodeExpanded',
        itemcollapse: 'nodeCollapsed'
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

    // plugins: [
    //     Ext.create('Ext.grid.plugin.CellEditing', {
    //         id: 'celledit',
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'validateFields'
    //         }
    //     })
    // ],

    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        renderer: 'renderStatus',
        width: 183
    }, {
        reference: 'userContactFields',
        flex: 10,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'label',
            bind: {
                text : '{record.fieldValue}',
                hidden: '{!!record.editInProgress}'
            }
        }
    }, {
        flex: 10,
        reference: 'userContactFieldsEdit',
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'textfield',
            bind: {
                value : '{record.fieldValue}',
                hidden: '{!record.editInProgress}'
            }
        }
    },{
        xtype: 'actioncolumn',
        text: 'actions',
        width: 100,
        items: [{
            tooltip: Ngcp.csc.locales.common.call[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook" ? '-extra-margin' : '';
                return ((context.record && (context.record.get('leaf') || context.record.get('isAddressBookContact')) && context.record.get('online')) ? 'x-phone-display' : '') + extraMarginRight;
            },
            handler: 'startCall'
        }, {
            tooltip: Ngcp.csc.locales.common.videocall[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook" ? '-extra-margin' : '';
                return ((context.record && (context.record.get('leaf') || context.record.get('isAddressBookContact')) && context.record.get('online')) ? 'x-video-display' : '') + extraMarginRight;
            },
            handler: 'startVideoCall'
        }, {
            tooltip: Ngcp.csc.locales.common.edit[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                return (context.record && context.record.get('isAddressBookContact')) ? 'x-edit-display' : '';
            },
            handler: 'editContactField'
        }, {
            tooltip: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                return (context.record && !context.record.get('leaf') && context.record.parentNode.get('id') !== "addressbook") ? 'x-add-user-display' : '';
            },
            handler: 'addUser'
        }, {
            tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            getClass: function(value, context) {
                return (context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook") ? 'x-remove-user-display' : '';
            },
            handler: 'deleteUser'
        }]
    }]
});
