Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithController', {
    extend: 'NgcpCsc.view.pages.conversations.ConversationsController',

    alias: 'controller.conversationwith',

    listen: {
        controller: {
            '*': {
                openpmtab: 'openPM',
                destroytab: 'closeChat',
                notify: 'submitNotification',
                focusLastMsg: 'focusLastMsg'
            }
        }
    },

    onPressEnter: function(field, e) {
        var vm = this.getViewModel();
        var currMsg = this.lookupReference('newmessage').getValue();
        var type = vm.get('messagetype');
        if (!e.shiftKey && e.getKey() == e.ENTER && currMsg.length > 0) {
            e.preventDefault();
            this.submitNotification(type);
        }
    },

    onPressSubmitBtn: function(menuitem, ev) {
        var currMsg = this.lookupReference('newmessage').getValue();
        this.getViewModel().set('messagetype', menuitem.value);
        this.getViewModel().set('iconcls', menuitem.value == 'sms' ? Ngcp.csc.icons.envelope : Ngcp.csc.icons.comment);
        if (currMsg.length > 0) {
            this.submitNotification(menuitem.value);
        }
    },

    onPressCallBtn: function(btn) {
        var vm = this.getViewModel();
        var contact = Ext.getStore('Contacts').findRecord("uid", vm.get('activeUserId'));
        var record = Ext.create('Ext.data.Model', {
            id: vm.get('activeUserId'),
            callee: vm.get('activeUserName'),
            thumbnail: contact ? contact.get('thumbnail') : null
        });
        this.fireEvent('initrtc', record, 'startCall', false, true);
    },

    onPressFaxBtn: function() {
        var vm = this.getViewModel();
        var contact = Ext.getStore('Contacts').findRecord("uid", vm.get('activeUserId'));
        var record = Ext.create('Ext.data.Model', {
            id: vm.get('activeUserId'),
            callee: vm.get('activeUserName'),
            thumbnail: contact ? contact.get('thumbnail') : null
        });
        this.fireEvent('initrtc', record, 'faxComposer');

    },

    hideTabBar: function(panel) {
        panel.getTabBar().hide();
    },

    submitNotification: function(type, msg) {
        var vm = this.getViewModel();
        var chatStore = this.getView().getActiveTab().getStore('Notifications');
        var messageModel = Ext.create('NgcpCsc.model.Notification', {
            "id": Ext.id(),
            "conversation_type": type || vm.get('messagetype'),
            "direction": "outgoing",
            "status": "answered",
            "author": "Administrator",
            "thumbnail": "resources/images/user-profile/2.png",
            "text": (type && ['sms', 'chat'].indexOf(type) > -1) ? msg || this.lookupReference('newmessage').getValue() : '',
            "start_time": Date.now()
        });
        chatStore.add(messageModel);
        this.clearMsg();
        this.focusLastMsg();
    },

    clearMsg: function() {
        this.lookupReference('newmessage').reset();
    },

    focusLastMsg: function() {
        var chatCmp = this.getView().getActiveTab();
        if (chatCmp) {
            chatCmp.getEl().scroll('b', Infinity);
        }
    },

    openPM: function(item, rec, focusTextarea, msgType) {
        var id = rec.get('uid') || rec.get('id');
        var tab = this.getView().down('[name=' + id + ']');
        var me = this;
        var vm = this.getViewModel();
        var textArea = this.lookupReference('newmessage');
        if (!tab) {
            vm.set('newmessage-' + id, '');
            tab = this.getView().add({
                xtype: 'notifications',
                title: rec.get('name') || rec.get('source_cli'),
                closable: false,
                cls: 'private-conversation-text',
                deferEmptyText: false,
                emptyText: Ext.String.format(Ngcp.csc.locales.conversationwith.start_conversation[localStorage.getItem('languageSelected')], rec.get('name')),
                name: id,
                store: Ext.create('NgcpCsc.store.Notifications', {
                    autoLoad: !!rec.get('uid'), // when new call/sms/fax is triggered the callback has no uid ( = user id from contacts), so the conversation is new and should not have logs => prevents autoload (TODO remove when API is available)
                    listeners: {
                        beforeload: function(store) {
                            me.updateProxy(store, id);
                        },
                        load: function() {
                            me.focusLastMsg();
                        }
                    }
                })
            });
        }
        textArea.setBind({
            value: '{newmessage-' + id + '}'
        });
        me.getView().setActiveTab(tab);
        me.focusLastMsg();
        vm.set('activeUserName', rec.get('name') || rec.get('callee'));
        vm.set('activeUserId', id);
        vm.set('messagetype', msgType || 'sms');
        vm.set('iconcls', msgType == 'chat' ? Ngcp.csc.icons.comment : Ngcp.csc.icons.envelope);
        if (focusTextarea) {
            textArea.focus();
        }
    },
    // (only for prototyping) change randomly the read url to retrieve different json
    updateProxy: function(store, uid) {
        var filename = uid + '.json';
        store.proxy.url = store.proxy.baseUrl + filename;
    },

    closeChat: function(tabToClose) {
        var tabToClose = this.getView().down('[name=' + tabToClose + ']');
        var contacts = this.getView().down('#contacts');
        if (tabToClose) {
            tabToClose.destroy();
        }
        if (contacts) {
            contacts.getView().refresh()
        }
    }
});
