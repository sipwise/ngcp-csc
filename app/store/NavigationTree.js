Ext.define('NgcpCsc.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [{
            text: 'Conversations',
            iconCls: Ngcp.csc.icons.phone,
            viewType: 'conversations',
            routeId: 'inbox',
            acl: ['administrator', 'restricted'], //TODO define real roles, which should be delivered along with user info after successfull login
            leaf: true
        }, {
            text: 'Conversation with',
            iconCls: 'x-fa fa-wechat',
            viewType: 'conversationwith',
            routeId: 'conversation-with',
            acl: ['administrator', 'restricted'],
            visible: false,
            leaf: true
        }, {
            text: 'Call Forward',
            iconCls: Ngcp.csc.icons.doubleangleright,
            viewType: 'callforward',
            routeId: 'callforward',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call Blocking',
            iconCls: Ngcp.csc.icons.block,
            routeId: 'callblocking',
            acl: ['administrator'],
            children: [{
                text: 'Incoming',
                iconCls: 'x-fa fa-arrow-circle-o-left',
                viewType: 'incoming',
                routeId: 'callblocking/incoming',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Outgoing',
                iconCls: 'x-fa fa-arrow-circle-o-right',
                viewType: 'outgoing',
                routeId: 'callblocking/outgoing',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Privacy',
                iconCls: Ngcp.csc.icons.user_secret,
                viewType: 'privacy',
                routeId: 'callblocking/privacy',
                acl: ['administrator'],
                leaf: true
            }]
        }, {
            text: 'Reminder',
            iconCls: Ngcp.csc.icons.bell,
            viewType: 'reminder',
            routeId: 'reminder',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Theme Roller',
            iconCls: Ngcp.csc.icons.paintbrush,
            viewType: 'themeroller',
            routeId: 'themeroller',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Pbx Config',
            iconCls: Ngcp.csc.icons.cog,
            routeId: 'pbxconfig',
            acl: ['administrator', 'restricted', 'host'],
            children: [{
                text: 'Seats',
                iconCls: Ngcp.csc.icons.home,
                viewType: 'seats',
                routeId: 'pbxconfig/seats',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Groups',
                iconCls: Ngcp.csc.icons.users,
                viewType: 'groups',
                routeId: 'pbxconfig/groups',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Devices',
                iconCls: Ngcp.csc.icons.fax,
                viewType: 'devices',
                routeId: 'pbxconfig/devices',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Auto Attendant',
                iconCls: Ngcp.csc.icons.microphone,
                viewType: 'autoattendant',
                routeId: 'pbxconfig/autoattendant',
                acl: ['administrator', 'restricted', 'host'],
                leaf: true
            }]
        }, {
            text: 'Account',
            iconCls: Ngcp.csc.icons.desktop,
            viewType: 'account',
            routeId: 'account',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }]
    }
});
