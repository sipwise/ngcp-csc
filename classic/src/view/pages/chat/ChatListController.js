Ext.define('NgcpCsc.view.pages.chat.ChatListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chatlist',

    id: 'chatlist', // needed as reference in ChatController listeners

    renderStatus: function(val, meta, rec) {
        if (rec.get('leaf')) {
            rec.set('iconCls', 'x-fa fa-circle ' + (rec.get('online') ? 'online-user' : 'offline-user'));
        }
        return val;
    },

    onNodeSelected: function(sel, record) {
        var selectedRec = record[0];
        var chatListStore = this.getView().getStore('ChatList');
        var destination = chatListStore.findRecord('id', selectedRec.get('addTo'));

        if (destination && !!destination.findChild('uid', selectedRec.get('uid'))) { // checks if user is already in group
            this.fireEvent('showmessage', false, Ngcp.csc.locales.chat.alerts.user_in_group[localStorage.getItem('languageSelected')]);
            selectedRec.set('checked', false);
        } else {
            selectedRec.set('checked', null);
            destination.insertChild(0, selectedRec.copy(null));
        }

    },
    showTabBar: function() {
        var chatList = this.getView();
        chatList.getDockedItems('toolbar[dock="top"]')[0].setVisible(true);
    },
    addUser: function(view, rowIndex, colIndex, item, ev, record) {
        var chatList = this.getView();
        chatList.getStore().each(function(rec) {
            if (rec.get('leaf') && rec.get('parentId') !== record.get('id')) {
                rec.set('checked', false);
                rec.set('addTo', record.get('id'));
            }
        });
    },
    createNewChannel: function() {
        var chatList = this.getView();
        var tbar = chatList.getDockedItems('toolbar[dock="top"]')[0];
        var newChatName = tbar.down('[name=newChatName]');
        var newChatBtn = tbar.down('[name=newChatBtn]');
        var done = tbar.down('[name=commitChangesBtn]');
        if (newChatName.getValue().length < 1) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.chat.alerts.choose_valid_name[localStorage.getItem('languageSelected')]);
            return;
        }

        var newNode = chatList.getRootNode().insertChild(chatList.getStore().getCount(), {
            "name": newChatName.getValue(),
            "iconCls": "x-fa fa-wechat",
            "expanded": true,
            "children": []
        });
        chatList.getStore().sort('online', 'DESC');
        this.fireEvent('showmessage', true, Ngcp.csc.locales.chat.alerts.channel_created[localStorage.getItem('languageSelected')]);
        newChatName.hide();
        newChatBtn.hide();
        done.show();
        newChatName.reset();
    },
    preventTabOpen: function(view, cell, cellIdx, record, row, rowIdx, eOpts) {
        if (cellIdx === 1) { // prevents tabs to be opened in case user clicked on icons in actioncolumn (startcall/delete/...)
            return false;
        }
    },
    startCall: function(grid, rowIndex, colIndex, item, e, record) {
        if (record.get('online'))
            this.fireEvent('initwebrtc', record);
    },
    startVideoCall: function(grid, rowIndex, colIndex, item, e, record) {
        if (record.get('online'))
            this.fireEvent('initwebrtc', record, true);
    },
    nodeClicked: function(node, record, item, index, e) {
        if (record.get('checked') != null)
            return;
        if (!record.get('leaf'))
            this.fireEvent('openchanneltab', record);
        else
            this.fireEvent('openpmtab', null, record);
        return false;

    },
    deleteNode: function(grid, rowIndex, colIndex) {
        var nodeToDelete = grid.getStore().getAt(rowIndex);
        var me = this;
        if (nodeToDelete.get('leaf'))
            return;
        Ext.Msg.show({
            message: Ext.String.format(Ngcp.csc.locales.chat.alerts.channel_delete[localStorage.getItem('languageSelected')], nodeToDelete.get('name')),
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
    save: function(){
        var store = this.getView().getStore();
        var tbar = this.getView().getDockedItems('toolbar[dock="top"]')[0];
        var newChatName = tbar.down('[name=newChatName]');
        var newChatBtn = tbar.down('[name=newChatBtn]');
        var done = tbar.down('[name=commitChangesBtn]');
        store.sort('online', 'DESC');
        store.commitChanges();
        tbar.hide();
        newChatName.show();
        newChatBtn.show();
        done.hide();
    }
});
