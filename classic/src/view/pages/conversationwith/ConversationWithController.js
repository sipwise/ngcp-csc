Ext.define('NgcpCsc.view.pages.conversationwith.ConversationWithController', {
    extend: 'NgcpCsc.view.pages.conversations.ConversationsController',

    alias: 'controller.conversationwith',

    listen: {
        controller: {
            '#contacts': {
                openpmtab: 'openPM',
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

    hideTabBar: function(panel){
        panel.getTabBar().hide();
    },

    submitMessage: function(msg, user) {
        var message = msg || this.getViewModel().get('message.new_message');
        if (message.length < 1 || !this.getView().getActiveTab()) {
            return;
        }
        var chatStore = this.getView().getActiveTab().getStore('Notifications');
        var lastMsg = chatStore.getAt(chatStore.getCount() - 1) || this.getViewModel().getStore('notifications').findRecord('id', this.getView().getActiveTab().name);
        var date = new Date();
        var minutes = date.getMinutes();
        var hour = date.getHours();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var messageModel = Ext.create('NgcpCsc.model.Notification', {
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

    focusLastMsg: function() {
        var chatCmp = this.getView().getActiveTab();
        chatCmp.getEl().scroll('b', Infinity);
    },

    loadOlderMsg: function(btn){
        var chatCmp = this.getView().getActiveTab();
        chatCmp.getEl().scroll('t', Infinity, true);
    },

    openPM: function(item, rec) {
        var tab = this.getView().down('[name=' + rec.get('uid') + ']');
        var me = this;
        if (rec.get('name') == 'administrator'){
            return;
        }
        if (!tab) {
            tab = this.getView().add({
                xtype: 'notifications',
                title: rec.get('name'),
                closable: true,
                cls: 'private-conversation-text',
                deferEmptyText: false,
                emptyText: Ext.String.format(Ngcp.csc.locales.conversationwith.start_conversation[localStorage.getItem('languageSelected')], rec.get('name')),
                name: rec.get('uid'),
                store: Ext.create('NgcpCsc.store.Notifications',{
                    listeners:{
                        load:function(){
                            me.focusLastMsg();
                        }
                    }
                })
            });
        }
        this.toggleTextArea(true);
        this.redirectTo('conversation-with');
        me.getView().setActiveTab(tab);
        me.focusLastMsg();

    },

    closeChat: function(tabToClose) {
        var tabToClose = this.getView().down('[name=' + tabToClose + ']');
        var contacts = this.getView().down('#contacts');
        if (tabToClose) {
            tabToClose.destroy();
        }
        if(contacts){
            contacts.getView().refresh()
        }
    },

    toggleChat: function(visible) {
        this.getViewModel().set('messages.chatEnabled', visible);
    },

    toggleTextArea: function(visible){
        this.lookupReference('chat-bottom-bar').setVisible(visible);
    }
});
