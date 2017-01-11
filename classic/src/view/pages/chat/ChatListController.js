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
    onBeforeUserDropped: function(node, data, overModel, dropPosition, dropHandlers) {
        var chatListStore = this.getView().getStore('ChatList');
        var dropTeam = overModel.get('leaf') ? overModel.parentNode : overModel;
        dropHandlers.cancelDrop();
        switch (true) {
            case !data.records[0].get('leaf'): // happens when a group is dropped
                this.fireEvent('showmessage', false, Ngcp.csc.locales.chat.alerts.user_ddrop[localStorage.getItem('languageSelected')]);
                break;
            case !!dropTeam.findChild('uid', data.records[0].get('uid')): // checks if user is already in team
                this.fireEvent('showmessage', false, Ngcp.csc.locales.chat.alerts.user_in_group[localStorage.getItem('languageSelected')]);
                break;
            default:
                dropTeam.insertChild(0, data.records[0].copy(null));
                chatListStore.sort('online', 'DESC');
                this.fireEvent('showmessage', true, Ext.String.format(Ngcp.csc.locales.chat.alerts.user_added[localStorage.getItem('languageSelected')], data.records[0].get('name'), dropTeam.get('name')));
        }
    },
    showTabBar: function() {
        var chatList = this.getView();
        chatList.getDockedItems('toolbar[dock="top"]')[0].setVisible(true);
    },
    addUser:function(){
        // TODO
        // - checkbox for users on other chats only
        // - on click copy the user to the new chat
        // - callback to drop user 
        var chatList = this.getView();
        chatList.getStore().each(function(rec) {
            if (rec.get('leaf')) {
                rec.set('checked', false);
            }
        });
    },
    createNewChannel: function() {
        var chatList = this.getView();
        var tbar = chatList.getDockedItems('toolbar[dock="top"]')[0];
        var newChatName = tbar.down('[name=newChatName]');
        var selectedUsers = chatList.getChecked();
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
        Ext.each(selectedUsers, function(user) {
            newNode.insertChild(0, user.copy(null));
        });
        // chatList.getStore().each(function(rec) {
        //     rec.set('checked', null);
        // });
        chatList.getStore().sort('online', 'DESC');
        this.fireEvent('showmessage', true, Ngcp.csc.locales.chat.alerts.channel_created[localStorage.getItem('languageSelected')]);
        tbar.hide();
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
    }
});
