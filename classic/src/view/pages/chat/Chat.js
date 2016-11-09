Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'chatlist',
        flex:1,
        padding: '0 1 0 3',
        scrollable:true
    }, {
        xtype:'chatcontainer',
        flex: 3
    }]

});
