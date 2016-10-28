Ext.define('NgcpCsc.view.pages.chat.ChatNotifications', {
    extend: 'Ext.DataView',
    xtype: 'chat-notifications',

    cls: 'user-notifications',

    scrollable: false,

    listeners: {
        itemclick: 'openPM'
    },

    itemTpl: [
        "<div class='comments'>",
        "<img src='{thumbnail}' alt='' class='profile-icon'>",
        "<div class='content-wrap'>",
        "<div>",
        "<h4 class='profilenotifications-username'>{name}</h4>",
        "<span class='from-now'><span class='x-fa fa-clock-o'></span>{time} {date}",
        "<span class='like-comment-btn-wrap'>", // hide the private message button in case the message comes from the user (in this case _d = 0);
        "<button type='button' id='{name}' class='x-fa fa-comments {[values.id == 0 ? 'hide-pm' : '']}'></button>",
        "</span></span>",
        "</div>",
        "<div class='content'>{content}</div>",
        "</div>",
        "</div>"
    ]
});
