Ext.define('NgcpCsc.view.pages.chat.ChatListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chatlist',

    id: 'chatlist', // needed as reference in ChatController listeners

    init: function() {
        var me = this,
            friendsStore = me.getViewModel().getStore('friends');

        //Trigger local sorting once new data is available
        friendsStore.on('load', function(store) {
            store.sort();
        });

        //Sort locally and then update menu
        friendsStore.on('sort', function(store) {
            me.mutateData(store, store.getRange());
        });

        me.callParent(arguments);
    },

    mutateData: function(store, records) {
        var view = this.getView(),
            arr = [],
            len = records.length,
            i;

        for (i = 0; i < len; i++) {
            arr.push({
                xtype: 'menuitem',
                uId: records[i].get('id'),
                text: records[i].get('name'),
                cls: 'font-icon ' + (records[i].get('online') ? 'online-user' : 'offline-user')
            });
        }

        Ext.suspendLayouts();
        view.removeAll(true);
        view.add(arr);
        Ext.resumeLayouts(true);
    },

    itemListClicked: function(menu, item) {
        var selectedUser = Ext.getStore('ChatList').findRecord('id', item.uId, 0, false, true, true);
        if (selectedUser && selectedUser.get('online'))
            this.fireEvent('openpmtab', null, selectedUser);
    }
});
