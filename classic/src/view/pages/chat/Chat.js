Ext.define('NgcpCsc.view.pages.chat.Chat', {
    extend: 'Ext.panel.Panel',

    xtype: 'chat',

    layout: 'responsivecolumn',

    scrollable:true,

    initComponent:function(){
        this.items = [{
            xtype: 'chatlist',
            userCls: 'big-20 small-100 white-box',
            collapsible:true
        }, {
            height: Ext.getCmp('mainContainer').getHeight() - 105 ,
            xtype:'chatcontainer',
            userCls: 'big-80 small-100 white-box',
        }]
        this.callParent();
    }

});
