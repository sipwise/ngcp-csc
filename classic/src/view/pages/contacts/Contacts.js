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
        itemcollapse: 'cancelEdit'
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
            name: 'cancelNewChatBtn',
            hidden: true,
            text: Ngcp.csc.locales.common.cancel[localStorage.getItem('languageSelected')],
            handler: 'cancelCreateNewChannel'
        }, {
            xtype: 'button',
            name: 'newChatBtn',
            hidden: true,
            text: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            handler: 'createNewChannel'
        }]
    }],
    bbar: ['->', {
        name: 'commitContactChangesBtn',
        text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
        handler: 'validateFields',
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
        width: 190
    }, {
        reference: 'userContactFields',
        flex: 1,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            hidden: false,
            xtype: 'container',
            /**   workaround to bind widgetcolumn subcomponents  **/
            bind: {
                record: '{record}'
            },
            setRecord: Ext.emptyFn,
            /******/
            items: [{
                xtype: 'label',
                bind: {
                    text: '{record.fieldValue ? record.fieldValue : ""}',
                    hidden: '{record.editInProgress}'
                }
            }, {
                xtype: 'textfield',
                listeners: {
                    specialkey: 'jumpToNextField'
                },
                bind: {
                    value: '{record.fieldValue}',
                    hidden: '{!record.editInProgress}'
                }
            }]
        }
    }, {
        // Current order:
        // | Btn1 | Btn2  | Btn3 | Btn4 |  Btn5  |
        // |------|-------|------|------|--------|
        // | call | video | edit | add  | delete |
        // TODO New order:
        // |  Btn1  | Btn2 | Btn3  | Btn4 | Btn5 |
        // |--------|------|-------|------|------|
        // | delete | edit | video | add  | call |
        xtype: 'actioncolumn',
        text: 'actions',
        width: 100,
        items: [{
            tooltip: Ngcp.csc.locales.common.call[localStorage.getItem('languageSelected')],
            isDisabled: 'disableCallIcon',
            getClass: 'setCallIconClass',
            handler: 'startCall'
        }, {
            tooltip: Ngcp.csc.locales.common.videocall[localStorage.getItem('languageSelected')],
            isDisabled: 'disableVideoIcon',
            getClass: 'setVideoIconClass',
            handler: 'startVideoCall'
        }, {
            tooltip: Ngcp.csc.locales.common.edit[localStorage.getItem('languageSelected')],
            isDisabled: 'disableEditIcon',
            getClass: 'setEditIconClass',
            handler: 'editContactField'
        }, {
            tooltip: Ngcp.csc.locales.common.add[localStorage.getItem('languageSelected')],
            getClass: 'setAddUserIconClass',
            isDisabled: 'disableAddUserIcon',
            handler: 'addUser'
        }, {
            tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
            getClass: 'setDeleteUserClass',
            isDisabled: 'disableDeleteUserIcon',
            handler: 'deleteUser'
        }]
    }]
});
