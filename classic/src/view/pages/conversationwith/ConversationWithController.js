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
        var currMsg = this.lookupReference('newmessage').getValue();
        if (!e.shiftKey && e.getKey() == e.ENTER &&  currMsg.length > 0) {
            e.preventDefault();
            this.submitMessage();
        }
    },

    onPressSubmitBtn: function(menuitem, ev) {
        var currMsg = this.lookupReference('newmessage').getValue();
        this.getViewModel().set('messagetype', menuitem.value);
        this.getViewModel().set('iconcls', menuitem.value  == 'sms'? 'fa fa-envelope':'fa fa-comment-o');
        if(currMsg.length > 0){
            this.submitMessage();
        }
    },

    hideTabBar: function(panel){
        panel.getTabBar().hide();
    },

    submitMessage: function() {
        var vm = this.getViewModel();
        var chatStore = this.getView().getActiveTab().getStore('Notifications');
        var messageModel = Ext.create('NgcpCsc.model.Notification', {
            "id": Ext.id(),
            "conversation_type": vm.get('messagetype'),
            "direction" : "outgoing",
            "status" : "answered",
            "text": this.lookupReference('newmessage').getValue(),
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

    loadOlderMsg: function(btn){
        var chatCmp = this.getView().getActiveTab();
        chatCmp.getEl().scroll('t', Infinity, true);
    },

    openPM: function(item, rec) {
        var tab = this.getView().down('[name=' + rec.get('uid') + ']');
        var me = this;
        var vm = this.getViewModel();
        var textArea = this.lookupReference('newmessage');
        if (!tab) {
            vm.set('newmessage-' + rec.get('id'), '');
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
        textArea.setBind({ value:'{newmessage-'+rec.get('id')+'}'});
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
