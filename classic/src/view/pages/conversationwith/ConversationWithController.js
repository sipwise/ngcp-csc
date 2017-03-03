Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithController', {
    extend: 'NgcpCsc.view.pages.conversations.ConversationsController',

    alias: 'controller.conversationwith',

    listen: {
        controller: {
            '*': {
                openpmtab: 'openPM',
                destroytab: 'closeChat',
                notify: 'submitNotification'
            }
        }
    },

    onPressEnter: function(field, e) {
        var currMsg = this.lookupReference('newmessage').getValue();
        if (!e.shiftKey && e.getKey() == e.ENTER && currMsg.length > 0) {
            e.preventDefault();
            this.submitNotification();
        }
    },

    onPressSubmitBtn: function(menuitem, ev) {
        var currMsg = this.lookupReference('newmessage').getValue();
        this.getViewModel().set('messagetype', menuitem.value);
        this.getViewModel().set('iconcls', menuitem.value == 'sms' ? 'fa fa-envelope' : 'fa fa-comment');
        if (currMsg.length > 0) {
            this.submitNotification();
        }
    },

    onPressCallBtn: function(btn) {
        var msgTxtField = this.lookupReference('newmessage');
        var msg = msgTxtField.getValue();
        if (msg.length > 0 && msg.match(/^[0-9#*+]+$/)) {
            var record = Ext.create('Ext.data.Model', {
                callee: msg,
                id:Ext.id()
            })
            this.fireEvent('initrtc', record, 'startCall');
            msgTxtField.reset();
        }else{
            msgTxtField.markInvalid('Allowed digits for calls are 0-9, +, # and *.')
        }
    },

    hideTabBar: function(panel) {
        panel.getTabBar().hide();
    },

    submitNotification: function(type) {
        var vm = this.getViewModel();
        var chatStore = this.getView().getActiveTab().getStore('Notifications');
        var messageModel = Ext.create('NgcpCsc.model.Notification', {
            "id": Ext.id(),
            "conversation_type": type || vm.get('messagetype'),
            "direction": "outgoing",
            "status": "answered",
            "text": (type && type == 'call') ? this.lookupReference('newmessage').getValue() : '',
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
        chatCmp.getEl().scroll('b', Infinity);
    },

    loadOlderMsg: function(btn) {
        var chatCmp = this.getView().getActiveTab();
        chatCmp.getEl().scroll('t', Infinity, true);
    },

    openPM: function(item, rec, focusTextarea) {
        var id = rec.get('uid') || rec.get('id');
        var tab = this.getView().down('[name=' + id + ']');
        var me = this;
        var vm = this.getViewModel();
        var textArea = this.lookupReference('newmessage');
        if (!tab) {
            vm.set('newmessage-' + id, '');
            tab = this.getView().add({
                xtype: 'notifications',
                title: rec.get('name'),
                closable: true,
                cls: 'private-conversation-text',
                deferEmptyText: false,
                emptyText: Ext.String.format(Ngcp.csc.locales.conversationwith.start_conversation[localStorage.getItem('languageSelected')], rec.get('name')),
                name: id,
                store: Ext.create('NgcpCsc.store.Notifications', {
                    autoLoad: !!rec.get('uid'), // when new call/sms/fax is triggered the callback has no uid ( = user id from contacts), so the conversation is new and should not have logs => prevents autoload (TODO remove when API is available)
                    listeners: {
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
        if (focusTextarea) {
            textArea.focus();
            vm.set('messagetype', 'chat');
            vm.set('iconcls', 'fa fa-comment');
        }
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
