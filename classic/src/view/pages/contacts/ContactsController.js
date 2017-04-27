Ext.define('NgcpCsc.view.pages.contacts.ContactsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.contacts',

    listen: {
        controller: {
            '*': {
                collapseContacts: 'collapseContacts',
                expandContacts: 'expandContacts',
                resizeContactPanel: 'resizeContactPanel',
                addContact: 'addContact',
                confirmUserRemoval: 'confirmUserRemoval'
            }
        },
        store: {
            '#Contacts': {
                load: 'contactsStoreLoaded'
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

    contactsStoreLoaded: function(store, recs) {
        Ext.each(recs, function(rec) {
            rec.set('editInProgress', false);
        });
        this.getView().getStore().commitChanges();
        this.getView().view.refresh();
    },

    renderStatus: function(val, meta, rec) {
        if ((rec.get('leaf') && !rec.parentNode.get('isAddressBookContact'))) {
            rec.set('iconCls', Ngcp.csc.icons.circle + ' ' + (rec.get('online') ? 'online-user' : 'offline-user'));
        } else if (rec.parentNode.get('isAddressBookContact')) {
            rec.set('iconCls', Ngcp.csc.icons.text + ' addressbook-contact ');
        }
        if (rec.get('isAddressBookContact')) {
            var firstNameNode = rec.findChild('isFirstName', true);
            var secondNameNode = rec.findChild('isSecondName', true);
            val = Ext.String.format('{0} {1}', firstNameNode ? firstNameNode.get('fieldValue') : '', secondNameNode ? secondNameNode.get('fieldValue') : '');
        }
        return val;
    },

    onNodeChecked: function(node, checked, ev) {
        var selectedRec = node;
        var contactsStore = this.getView().getStore('Contacts');
        var destination = contactsStore.findRecord('id', selectedRec.get('addTo'));
        var nodeAdded = destination.appendChild(selectedRec.copy(null));
        var nodeEl = Ext.get(this.getView().view.getNode(nodeAdded));
        var saveBtn = this.getView().down('[name=commitContactChangesBtn]');
        if (nodeEl) {
            nodeEl.scrollIntoView(this.getView().view.el, false, true);
        }
        selectedRec.set('checked', null);
        contactsStore.each(function(rec) {
            if (rec.get('uid') === selectedRec.get('uid')) { // checks if user is already in group
                rec.set('checked', null);
            }
        });
        saveBtn.show();
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
                if (!rec.get('isAddressBookContact')) {
                    rec.expand();
                    if (rec.get('leaf') && rec.get('parentId') !== record.get('id') && !rec.get('isAddressBookContact') && !rec.parentNode.get('isAddressBookContact') && !record.findChild("uid", rec.get('uid'))) {
                        rec.set('checked', false);
                        rec.set('addTo', record.get('id'));
                    }
                }
            });
        }
    },
    addContact: function(record) {
        var me = this;
        var rootNode = Ext.getStore('Contacts').findRecord('id', 'addressbook');
        var newContact = { // TODO to be moved in model once we have API endpoint
                "online": 0,
                "name": "",
                "expanded": true,
                "isAddressBookContact": true,
                "iconCls": "no-icon",
                "children": [{
                    "name": "First Name :",
                    "isFirstName": true,
                    "fieldValue": record.get('uid') ? record.get('source_cli').split(" ")[0] : " ", // TODO to b improved (user can have multiple first names)
                    "leaf": true
                }, {
                    "name": "Second Name :",
                    "isSecondName": true,
                    "fieldValue": record.get('uid') ? record.get('source_cli').split(" ")[1] : " ", // TODO to b improved (user can have multiple first names)
                    "leaf": true
                }, {
                    "name": "Company :",
                    "fieldValue": " ",
                    "leaf": true
                }, {
                    "name": "Home :",
                    "fieldValue": (record.get('source_cli') && !record.get('uid')) ? record.get('source_cli') : " ",
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
        lastNode = rootNode.appendChild(newContact, false, true);
        if (me.getView().collapsed) {
            me.getView().expand();
        }
        Ext.Function.defer(function() {
            me.editContactField(null, null, null, null, null, lastNode);
            me.getView().view.focusRow(lastNode.lastChild);
        }, 50);
    },

    resizePanel: function(rec) {
        var store, keepExpanded = false,
            newWidth,
            minWidth = 350,
            maxWidth = 600;
        if (rec.parentNode && rec.parentNode.id == 'addressbook') {
            store = Ext.getStore('Contacts').findRecord();
            rec.parentNode.eachChild(function(node) {
                if (node.get('expanded') && node.get('id') !== rec.get('id')) {
                    keepExpanded = true;
                }
            });
            newWidth = !rec.get('expanded') || keepExpanded ? maxWidth : minWidth;
            this.getView().setWidth(newWidth);
        }
    },
    nodeExpanded: function(node) {
        var me = this;
        if (node && node.hasChildNodes()) {
            Ext.Function.defer(function() {
                me.getView().view.focusRow(node.lastChild);
            }, 50);
        }
    },
    deleteUser: function(view, rowIndex, colIndex, item, ev, record) {
        var contactStore = Ext.getStore('Contacts');
        var me = this;
        me.fireEvent('showconfirmbox', Ext.String.format(Ngcp.csc.locales.contacts.delete_user[localStorage.getItem('languageSelected')], record.get('name')) , Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')], 'confirmUserRemoval', record);
    },
    confirmUserRemoval: function(userRec){
        var store = this.getView().getStore();
        store.remove(userRec);
        this.getView().view.refresh();
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
    editContactField: function(tree, rowIndex, colIndex, item, e, record) {
        var me = this;
        var doneBtn = this.getView().down('[name=commitContactChangesBtn]');
        record.expand();
        record.set('childrenEditInProgress', true);
        record.commit();
        me.getView().view.refresh();
        Ext.each(record.childNodes, function(leafRec) {
            leafRec.set('editInProgress', true);
            leafRec.commit();
            if (leafRec.get('isFirstName')) {
                me.focusField(leafRec)
            }
        });
        doneBtn.show();
    },
    focusField: function(rec) {
        var me = this;
        var fieldEl = Ext.fly(me.getView().view.getNode(rec))
        me.getView().setSelection(rec);
        Ext.Function.defer(function() {
            fieldEl.down('input').focus();
        }, 50)

    },
    jumpToNextField: function(field, e) {
        if (e.getKey() == e.TAB) {
            var tree = this.getView();
            var currentNode = tree.selection;
            var indexOfCurrentNode = tree.getStore().indexOf(currentNode);
            var nextNode = tree.getStore().getAt(indexOfCurrentNode + 1);
            if (nextNode && nextNode.parentNode.get('isAddressBookContact')) {
                this.focusField(nextNode);
            } else {
                this.focusField(currentNode.parentNode.firstChild);
            }
        }
    },
    nodeClicked: function(node, record, item, index, e) {
        var me = this;
        if (record.get('checked') != null || record.get('fieldValue') || record.get('id') == 'addressbook') {
            return;
        }
        this.fireEvent('updateconversationtitle', 'conversation-with', record);
        this.redirectTo('conversation-with');
        Ext.Function.defer(function() {
            me.fireEvent('openpmtab', null, record);
        }, 100);
        return false;
    },
    validateFields: function(btn) {
        var me = this;
        var doSave = this.getView().getStore().getModifiedRecords().length > 0,
            btnVisible = false;
        this.getView().getStore().each(function(record) {
            if (record.get('isFirstName') && (record.get('fieldValue').length < 1 || record.get('fieldValue') == " ")) { //should be done for every mandatory field
                me.fireEvent('showmessage', false, Ext.String.format(Ngcp.csc.locales.common.field_required[localStorage.getItem('languageSelected')], record.get('name').split(':')[0]));
                record.reject();
                doSave = false;
                btnVisible = true;
            }
        });
        if (doSave) {
            this.save();
        } else if (!btnVisible) {
            me.cancelEdit();
        }
        btn.setVisible(btnVisible);
    },
    cancelEdit: function(rec) {
        var store = this.getView().getStore();
        var saveBtn = this.getView().down('[name=commitContactChangesBtn]');
        var array = rec ? rec.childNodes : store.getRange();
        if (rec && rec.get('childrenEditInProgress')) {
            rec.set('childrenEditInProgress', false);
        }
        Ext.each(array, function(rec) {
            rec.set('checked', null);
            if (rec.get('editInProgress')) {
                rec.set('editInProgress', false);
            }
            if (rec.get('childrenEditInProgress')) {
                rec.set('childrenEditInProgress', false);
            }
        });
        this.getView().view.refresh();
        saveBtn.hide();
    },
    save: function() {
        var me = this;
        var store = this.getView().getStore();
        var tbar = this.getView().getDockedItems('toolbar[dock="top"]')[0];
        me.cancelEdit();
        store.sort('online', 'DESC');
        store.commitChanges();
        this.getView().view.refresh();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    },
    resizeContactPanel: function(newHeight) {
        this.getView().setHeight(newHeight);
    },
    disableCallIcon: function(view, rowIndex, colIndex, item, record) {
        return !((record.get('leaf') && record.get('fieldValue')) || record.get('isAddressBookContact') || record.get('online'));
    },
    disableVideoIcon: function(view, rowIndex, colIndex, item, record) {
        return !((record.get('leaf') && record.get('fieldValue')) || record.get('isAddressBookContact') || record.get('online'));
    },
    disableEditIcon: function(view, rowIndex, colIndex, item, record) {
        return !(record.get('isAddressBookContact') && !record.get('childrenEditInProgress'));
    },
    disableAddUserIcon: function(view, rowIndex, colIndex, item, record) {
        return !(!record.get('leaf') && !record.get('isAddressBookContact'));
    },
    disableDeleteUserIcon: function(view, rowIndex, colIndex, item, record) {
        return !(!record.get('leaf'));
    },
    setCallIconClass: function(value, context) {
        var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook" ? '-extra-margin' : '';
        return ((context.record && ((context.record.get('leaf') && context.record.get('online')) || context.record.get('isAddressBookContact'))) ? 'x-phone-display' : '') + extraMarginRight;
    },
    setVideoIconClass: function(value, context) {
        var extraMarginRight = context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook" ? '-extra-margin' : '';
        return ((context.record && ((context.record.get('leaf') && context.record.get('online')) || context.record.get('isAddressBookContact'))) ? 'x-video-display' : '') + extraMarginRight;
    },
    setEditIconClass: function(value, context) {
        var rec = context.record;
        return (context.record && context.record.get('isAddressBookContact')) ? 'x-edit-display' : '';
    },
    setAddUserIconClass: function(value, context) {
        return (context.record && !context.record.get('leaf') && context.record.parentNode.get('id') !== "addressbook") ? 'x-add-user-display' : '';
    },
    setDeleteUserClass: function(value, context) {
        return (context.record && context.record.parentNode && context.record.parentNode.get('id') == "addressbook") ? 'x-remove-user-display' : '';
    }
});
