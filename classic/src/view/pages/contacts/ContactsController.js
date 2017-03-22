/*
TODO
- add contact icon in conversations
- fix collapse/expand of new nodes , when add user on non addressbook panel, fix bugs
- create treemodel
*/
Ext.define('NgcpCsc.view.pages.contacts.ContactsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.contacts',

    listen: {
        controller: {
            '*': {
                collapseContacts: 'collapseContacts',
                expandContacts: 'expandContacts',
                resizeContactPanel: 'resizeContactPanel'
            }
        }
    },

    id: 'contacts', // needed as reference in ChatController listeners

    collapseContacts: function() {
        this.getView().collapse();
    },

    expandContacts: function() {
        this.getView().expand();
    },

    renderStatus: function(val, meta, rec) {
        if ((rec.get('leaf') && !rec.parentNode.get('isAddressBookContact')) || rec.parentNode.id == 'addressbook') {
            rec.set('iconCls', Ngcp.csc.icons.circle + ' ' + (rec.get('online') ? 'online-user' : 'offline-user'));
        } else if (rec.parentNode.get('isAddressBookContact')) {
            rec.set('iconCls', Ngcp.csc.icons.text + ' addressbook-contact ');
        }
        return val;
    },
    composeName: function(val, meta, rec) {
        if (rec.get('isAddressBookContact')) {
            var firstNameNode = rec.findChild('isFirstName', true);
            var secondNameNode = rec.findChild('isSecondName', true);
            val = firstNameNode.get('fieldValue') + ' ' + secondNameNode.get('fieldValue')
        }
        return val;
    },

    onNodeChecked: function(node, checked, ev) {
        var selectedRec = node;
        var contactsStore = this.getView().getStore('Contacts');
        var destination = contactsStore.findRecord('id', selectedRec.get('addTo'));
        var nodeAdded = destination.appendChild(selectedRec.copy(null));
        var nodeEl = Ext.get(this.getView().view.getNode(nodeAdded));
        if (nodeEl) {
            nodeEl.scrollIntoView(this.getView().view.el, false, true);
        }
        selectedRec.set('checked', null);
        contactsStore.each(function(rec) {
            if (rec.get('uid') === selectedRec.get('uid')) { // checks if user is already in group
                rec.set('checked', null);
            }
        });
    },
    showCreationFields: function(btn) {
        var contacts = this.getView();
        var tbar = contacts.getDockedItems('toolbar[dock="top"]')[0];
        var newChatName = tbar.down('[name=newChatName]');
        var newChatBtn = tbar.down('[name=newChatBtn]');
        btn.hide();
        newChatName.show();
        newChatBtn.show();
        newChatName.focus();
    },
    addUser: function(view, rowIndex, colIndex, item, ev, record) {
        var contacts = this.getView();
        var done = contacts.down('[name=commitChangesBtn]');
        var store = contacts.getStore();

        if (record.get('id') == "addressbook") {
            this.addContact(record);
        } else {
            store.each(function(rec) {
                if (rec.get('leaf') && rec.get('parentId') !== record.get('id') && !record.findChild("uid", rec.get('uid'))) {
                    rec.set('checked', false);
                    rec.set('addTo', record.get('id'));
                }
            });
            done.show();
        }

    },
    addContact: function(record) {
        var me = this;
        var newContact = {
                "online": 0,
                "name": "",
                "expanded": true,
                "children": [{
                    "name": "First Name :",
                    "isFirstName": true,
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Second Name :",
                    "isSecondName": true,
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Company :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Home :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Office :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Mobile :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Fax :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "E-mail :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Homepage :",
                    "fieldValue": " ",
                    "leaf": true
                }]
            },
            lastNode;
        lastNode = record.appendChild(newContact, false, true);
        me.getView().view.focusRow(lastNode.lastChild);
    },

    resizePanel: function(rec) {
        var contactFields, store, keepExpanded, newWidth,
            minWidth = 300,
            maxWidth = 600;
        if (rec.parentNode && rec.parentNode.id == 'addressbook') {
            contactFields = this.lookupReference('userContactFields');
            store = Ext.getStore('Contacts').findRecord();
            keepExpanded = false;
            rec.parentNode.eachChild(function(node) {
                if (node.get('expanded') && node.get('id') !== rec.get('id')) {
                    keepExpanded = true;
                }
            });
            newWidth = this.getView().getWidth() > minWidth && !keepExpanded ? minWidth : maxWidth;
            this.getView().setWidth(newWidth);
            contactFields.setVisible(keepExpanded ? keepExpanded : contactFields.isHidden());
        }
    },
    deleteUser: function(view, rowIndex, colIndex, item, ev, record) {
        var contactStore = Ext.getStore('Contacts');
        var me = this;
        Ext.Msg.show({
            title: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
            message: Ext.String.format(Ngcp.csc.locales.contacts.delete_user[localStorage.getItem('languageSelected')], record.get('name')),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    contactStore.remove(record);
                    me.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
                }
            }
        });
    },
    onPressEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.createNewChannel();
        }
    },
    createNewChannel: function() {
        var contacts = this.getView();
        var tbar = contacts.getDockedItems('toolbar[dock="top"]')[0];
        var createGroupBtn = tbar.down('[name=showNewChatBtn]');
        var newChatName = tbar.down('[name=newChatName]');
        var newChatBtn = tbar.down('[name=newChatBtn]');
        if (newChatName.getValue().length < 1) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.conversationwith.alerts.choose_valid_name[localStorage.getItem('languageSelected')]);
            return;
        }
        var newNode = contacts.getRootNode().insertChild(0, {
            "name": newChatName.getValue(),
            "iconCls": Ngcp.csc.icons.multichat,
            "expanded": true,
            "children": []
        });
        contacts.getStore().sort('online', 'DESC');
        this.fireEvent('showmessage', true, Ngcp.csc.locales.conversationwith.alerts.channel_created[localStorage.getItem('languageSelected')]);
        createGroupBtn.show();
        contacts.view.focusRow(newNode);
        newChatName.hide();
        newChatBtn.hide();
        newChatName.reset();
    },
    preventTabOpen: function(view, cell, cellIdx, record, row, rowIdx, eOpts) {
        var retVal = true;
        if (record.get('checked') !== null) {
            this.onNodeChecked(record, true);
            retVal = false;
        }
        if (cellIdx === 1) { // prevents tabs to be opened in case user clicked on icons in actioncolumn (startcall/delete/...)
            retVal = false;
        }
        return retVal;
    },
    startCall: function(grid, rowIndex, colIndex, item, e, record) {
        if (record.get('online'))
            this.fireEvent('initrtc', record, 'startCall');
    },
    startVideoCall: function(grid, rowIndex, colIndex, item, e, record) {
        if (record.get('online'))
            this.fireEvent('initrtc', record, 'startVideoCall', true);
    },
    editContactField: function(grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var editableColumnIndex;
        Ext.each(this.getView().getColumns(), function(col, index) {
            if (col.dataIndex == 'fieldValue') {
                editableColumnIndex = index;
            }
        });
        Ext.Function.defer(function() {
            me.getView().getPlugin('celledit').startEdit(record, editableColumnIndex);
        }, 50);
    },
    nodeClicked: function(node, record, item, index, e) {
        var me = this;
        if (record.get('checked') != null || record.get('fieldValue')) {
            return;
        }
        this.fireEvent('updateconversationtitle', 'conversation-with', record);
        this.redirectTo('conversation-with');
        Ext.Function.defer(function() {
            me.fireEvent('openpmtab', null, record);
        }, 100);
        return false;
    },
    deleteNode: function(grid, rowIndex, colIndex, item, ev) {
        var nodeToDelete = grid.getStore().getAt(rowIndex);
        var me = this;
        if (nodeToDelete.get('leaf'))
            return;
        Ext.Msg.show({
            message: Ext.String.format(Ngcp.csc.locales.conversationwith.alerts.channel_delete[localStorage.getItem('languageSelected')], nodeToDelete.get('name')),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    nodeToDelete.remove();
                    me.fireEvent('destroytab', nodeToDelete.get('name'));
                }
            }
        });
    },
    save: function(btn, p2, p3) {
        var store = this.getView().getStore();
        var tbar = this.getView().getDockedItems('toolbar[dock="top"]')[0];
        store.each(function(rec) {
            rec.set('checked', null);
        });
        store.sort('online', 'DESC');
        store.commitChanges();
        if (!p3) {
            btn.hide();
        }
        this.getView().getView().refresh();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },
    resizeContactPanel: function(newHeight) {
        this.getView().setHeight(newHeight);
    }
});
