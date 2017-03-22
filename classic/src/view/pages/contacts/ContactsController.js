/*
TODO
- one click to edit
- expand contacts panel when a addressbook contact is expanded
- add contact icon in conversations
- fix collapse/expand of new nodes
- when add user on non addressbook panel, fix bugs
- create treemodel
- prevent Conversation with Personal Addressbook
- sync store on add/edit/delete + message
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
        if ((rec.get('leaf') && !rec.get('fieldValue')) || rec.parentNode.id == 'addressbook') {
            rec.set('iconCls', Ngcp.csc.icons.circle + ' ' + (rec.get('online') ? 'online-user' : 'offline-user'));
        } else if (rec.get('fieldValue')) {
            rec.set('iconCls', Ngcp.csc.icons.text + ' addressbook-contact ');
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
        var newContact = {
                "online": 0,
                "name": "TEST",
                "expanded": true,
                "children": [{
                    "name": "First Name :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Second Name :",
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
        this.getView().view.focusRow(lastNode);
    },

    resizePanel: function(rec) {
        if(rec.parentNode && rec.parentNode.id == 'addressbook'){
            var newWidth = this.getView().getWidth() > 300 ? 300 : 600;
            var contactFields = this.lookupReference('userContactFields');
            this.getView().setWidth(newWidth);
            contactFields.setVisible(contactFields.isHidden());
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

        var newNode = contacts.getRootNode().insertChild(contacts.getStore().getCount(), {
            "name": newChatName.getValue(),
            "iconCls": Ngcp.csc.icons.multichat,
            "expanded": true,
            "children": []
        });
        contacts.getStore().sort('online', 'DESC');
        this.fireEvent('showmessage', true, Ngcp.csc.locales.conversationwith.alerts.channel_created[localStorage.getItem('languageSelected')]);
        createGroupBtn.show();
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
    nodeClicked: function(node, record, item, index, e) {
        var me = this;
        if (record.get('checked') != null || record.get('fieldValue'))
            return;
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
    save: function(btn) {
        var store = this.getView().getStore();
        var tbar = this.getView().getDockedItems('toolbar[dock="top"]')[0];
        store.each(function(rec) {
            rec.set('checked', null);
        });
        store.sort('online', 'DESC');
        store.commitChanges();
        btn.hide();
        this.getView().getView().refresh();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },
    resizeContactPanel: function(newHeight) {
        this.getView().setHeight(newHeight);
    }
});
