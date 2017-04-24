Ext.define('NgcpCsc.view.pages.conversationwith.Notifications', {
    extend: 'Ext.DataView',
    xtype: 'notifications',

    cls: 'user-notifications',

    listeners: {
        afterrender: 'notificationRendered'
    },

    scrollable: true,

    disableSelection: true,

    itemTpl: [
        "<div class='notification'>",
        "<div class='thumbnail'>",
        "<tpl if='thumbnail'>",
        "<img class='profile-icon' src={thumbnail}>",
        "<tpl else>",
        "<img class='profile-icon' src=/resources/images/avatar.png>",
        "</tpl>",
        "</div>",
        "<div class='{conversation_type}-icon'></div>",
        "<div class='author'>{author}</div>",
        "<div class='{direction}-{status}-icon'></div>",
        "<div data-qtip='{[Ext.util.Format.date(values.start_time, 'd.m.Y h:i:s')]}'>{[Ngcp.csc.formatter.timeSince(values.start_time)]} " + Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')] + "</div>",
        "<div class='text'>",
        "<tpl if='conversation_type == \"sms\" || conversation_type == \"chat\"'>",
        "<p>{text}</p>",
        "</tpl>",
        "</div>",
        "</div>"
    ]
});
