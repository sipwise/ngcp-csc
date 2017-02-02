Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    controller: 'conversations',

    viewModel: 'conversations',

    title: Ngcp.csc.locales.conversations.section_title[localStorage.getItem('languageSelected')],

    initComponent: function() {

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui:'conversations-actions-tbar',
            items: [{
                xtype:'core-container',
                margin: '-5 0 0 15',
                width: Ext.os.is.Desktop ? 810 : '100%',
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                defaults:{
                    xtype:'button',
                    flex:1,
                    handler:'openCallPanel',
                    iconAlign:'top',
                    scale:'medium',
                    ui:'conversations-actions-btn'
                },
                items:[{
                    text:'new sms',
                    itemId:'newSms',
                    iconCls: 'x-fa fa-comment fa-2x',
                    margin:'0 20 0 0'
                },{

                    text:'new call',
                    itemId:'newCall',
                    iconCls: 'x-fa fa-phone fa-2x',
                    margin:'0 20 0 0'
                },{
                    text:'new fax',
                    itemId:'newfax',
                    iconCls: 'x-fa fa-fax fa-2x'
                }]
            }]
        }];

        this.items = [{
            xtype: 'conversations-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
