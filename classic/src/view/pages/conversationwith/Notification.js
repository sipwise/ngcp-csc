Ext.define('NgcpCsc.view.pages.conversationwith.Notifications', {
    extend: 'Ext.DataView',
    xtype: 'notifications',

    cls: 'user-notifications',

    scrollable:true,

    itemTpl: [
        "<div class='notification'>",
        "<div class='{conversation_type}-icon'></div>",
        "<div class='{direction}-{status}-icon'></div>",
        "<div>{[Ngcp.csc.formatter.timeSince(values.start_time)]} " + Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')] + "</div>",
        "<div class='text'>",
        "<tpl if='conversation_type == \"sms\" || conversation_type == \"chat\"'>",
            "<p>{text}</p>",
        "</tpl>",
        "</div>",
        "</div>"
    ]
});
