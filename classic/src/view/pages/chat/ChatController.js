Ext.define('NgcpCsc.view.pages.chat.ChatController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chat',

    listen: {
        controller: {
            '#chatlist': {
                openpmtab: 'openPM',
                openchanneltab: 'openChat',
                destroytab: 'closeChat'
            },
            '*': {
                togglechat: 'toggleChat'
            }
        }
    },

    onPressEnter: function(field, e) {
        if (!e.shiftKey && e.getKey() == e.ENTER) {
            e.preventDefault();
            this.submitMessage();
        }
    },

    onPressSubmitBtn: function(field, e) {
        this.submitMessage();
    },

    submitMessage: function(msg, user) {
        var message = msg || this.getViewModel().get('message.new_message');
        if (message.length < 1 || !this.getView().getActiveTab()) {
            return;
        }
        var chatStore = this.getView().getActiveTab().getStore('notifications');
        var lastMsg = chatStore.getAt(chatStore.getCount() - 1) || this.getViewModel().getStore('notifications').findRecord('id', this.getView().getActiveTab().name);
        var date = new Date();
        var minutes = date.getMinutes();
        var hour = date.getHours();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var messageModel = Ext.create('NgcpCsc.model.ChatNotification', {
            ///    "id": (user) ? user.get('id') : 0,
            "name": (user) ? user.get('name') : localStorage.getItem('username'),
            "date": Ext.String.format("{0}.{1}", day, month),
            "isActive": true,
            "time": Ext.String.format("{0}:{1}", hour, minutes),
            "thumbnail": (user) ? user.get('thumbnail') : "resources/images/user-profile/2.png",
            "content": message.replace(/(?:\r\n|\r|\n)/g, '<br />')
        });
        chatStore.add(messageModel);
        this.clearMsg();
        this.focusLastMsg();
    },

    clearMsg: function() {
        this.getView().down('[name=new-message]').reset();
    },

    focusLastMsg: function(rec) {
        var chatCmp = this.getView().getActiveTab();
        chatCmp.scrollTo(0, chatCmp.getEl().dom.scrollHeight);
    },

    openPM: function(item, rec) {
        var tab = this.getView().down('[name=' + rec.get('uid') + ']');
        if (rec.get('name') == 'administrator') // hardcoded administrator
            return;
        if (!tab) {
            tab = this.getView().add({
                xtype: 'chat-notifications',
                title: rec.get('name'),
                closable: true,
                scrollable: true,
                cls: 'private-conversation-text',
                deferEmptyText: false,
                emptyText: Ext.String.format(Ngcp.csc.locales.chat.start_conversation[localStorage.getItem('languageSelected')], rec.get('name')),
                name: rec.get('uid'),
                store: Ext.create('Ext.data.Store', {
                    model: 'NgcpCsc.model.ChatNotification'
                })
            });
        }
        this.getView().setActiveTab(tab);
        this.toggleTextArea(true);

    },
    openChat: function(rec) {
        var tab = this.getView().down('[name=' + rec.get('name') + ']');
        if (rec.get('name') == 'Buddies')
            return;
        if (!tab) {
            tab = this.getView().add({
                xtype: 'chat-notifications',
                title: rec.get('name'),
                name: rec.get('name'),
                closable: true,
                bind: {
                    store: '{notifications}'
                }
            });
        }
        this.getView().setActiveTab(tab);
    },

    closeChat: function(tabToClose) {
        var tabToClose = this.getView().down('[name=' + tabToClose + ']');
        var chatList = this.getView().down('#chatlist');
        if (tabToClose) {
            tabToClose.destroy();
        }
        if(chatList){
            chatList.getView().refresh()
        }
    },

    tabRemoved: function(tabP){
        this.toggleTextArea(tabP.items.length > 0);
    },

    toggleChat: function(visible) {
        this.getViewModel().set('messages.chatEnabled', visible);
    },

    toggleTextArea: function(visible){
        this.lookupReference('chat-bottom-bar').setVisible(visible);
    }
});
