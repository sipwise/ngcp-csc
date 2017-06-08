// DONE 1. Fix cancel button in contacts not hidden after creating a new team
// TODO 2. Implement consistent button ordering
// TODO a. CONVERSATIONS
// DONE - top bar: new fax - new sms - new call
// TODO - card bottom icons: addressbook - sms - chat - call - play
// TODO b. CALL FORWARD
// TODO - sourceset grid: change title - add new source
// TODO - change title active: cancel (needs to be added) - save
// TODO c. CALL BLOCKING
// TODO - card bottom icons: delete - toggle enable
// TODO d. PBX
// TODO - card bottom icons: cancel - delete - edit/save
// TODO - devices edit box bottom icons: cancel - delete - save
// TODO e. CONTACTS
// TODO - contact row: delete - edit - video - call

Ext.define('NgcpCsc.view.pages.conversations.Conversations', {
    extend: 'Ext.panel.Panel',

    xtype: 'conversations',

    viewModel: 'conversations',

    controller: 'conversations',

    initComponent: function() {

        this.dockedItems = Ext.create('NgcpCsc.view.pages.conversations.ConversationsToolbar');

        this.items = [{
            xtype: 'conversations-grid',
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100'
        }];

        this.callParent();
    }
});
