Ext.define('NgcpCsc.view.pages.conversationwith.Notifications', {
    extend: 'Ext.DataView',
    xtype: 'notifications',

    cls: 'user-notifications',

    scrollable:true,

    itemTpl: [
        // "<div class='comments'>",
        // "<img src='{thumbnail}' alt='' class='profile-icon'>",
        // "<div class='content-wrap'>",
        // "<div>",
        // "<h4 class='profilenotifications-username'>{name}</h4>",
        // "<span class='from-now'><span class='x-fa fa-clock-o'></span>{time} {date}",
        // "<span class='like-comment-btn-wrap'>", // hide the private message button in case the message comes from the user (in this case _d = 0);
        // "<button type='button' id='{name}' class='x-fa fa-comments {[values.name === 'administrator' ? 'hide-pm' : '']}'></button>",
        // "</span></span>",
        // "</div>",
        // "<div class='content'>{content}</div>",
        // "</div>",
        // "</div>"
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
