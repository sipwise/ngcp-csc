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
            acl: ['admin', 'restricted'], //TODO define real roles, which should be delivered along with user info after successfull login
            leaf: true
        }, {
            text: 'Conversation with',
            iconCls: 'x-fa fa-wechat',
            viewType: 'conversationwith',
            routeId: 'conversation-with',
            acl: ['admin', 'restricted'],
            visible: false,
            leaf: true
        }, {
            text: 'Call Forward',
            iconCls: Ngcp.csc.icons.doubleangleright,
            routeId: 'callforward',
            acl: ['admin'],
            children: [{
                text: 'Always',
                iconCls: Ngcp.csc.icons.star,
                viewType: 'always',
                routeId: 'callforward/always',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'After Hours',
                iconCls: Ngcp.csc.icons.timescircle,
                viewType: 'afterhours',
                routeId: 'callforward/afterhours',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Company Hours',
                iconCls: Ngcp.csc.icons.building,
                viewType: 'companyhours',
                routeId: 'callforward/companyhours',
                acl: ['admin'],
                leaf: true
            }]
        }, {
            text: 'Call Blocking',
            iconCls: Ngcp.csc.icons.block,
            routeId: 'callblocking',
            acl: ['admin'],
            children: [{
                text: 'Incoming',
                iconCls: 'x-fa fa-arrow-circle-o-left',
                viewType: 'incoming',
                routeId: 'callblocking/incoming',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Outgoing',
                iconCls: 'x-fa fa-arrow-circle-o-right',
                viewType: 'outgoing',
                routeId: 'callblocking/outgoing',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Privacy',
                iconCls: Ngcp.csc.icons.user_secret,
                viewType: 'privacy',
                routeId: 'callblocking/privacy',
                acl: ['admin'],
                leaf: true
            }]
        }, {
            text: 'Reminder',
            iconCls: Ngcp.csc.icons.bell,
            viewType: 'reminder',
            routeId: 'reminder',
            acl: ['admin', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Pbx Config',
            iconCls: Ngcp.csc.icons.cog,
            routeId: 'pbxconfig',
            acl: ['admin', 'restricted', 'host'],
            children: [{
                text: 'Groups',
                iconCls: Ngcp.csc.icons.users,
                viewType: 'groups',
                routeId: 'pbxconfig/groups',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Seats',
                iconCls: Ngcp.csc.icons.home,
                viewType: 'seats',
                routeId: 'pbxconfig/seats',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Devices',
                iconCls: Ngcp.csc.icons.fax,
                viewType: 'devices',
                routeId: 'pbxconfig/devices',
                acl: ['admin'],
                leaf: true
            }, {
                text: 'Auto Attendant',
                iconCls: Ngcp.csc.icons.microphone,
                viewType: 'autoattendant',
                routeId: 'pbxconfig/autoattendant',
                acl: ['admin', 'restricted', 'host'],
                leaf: true
            }]
        }, {
            text: 'Account',
            iconCls: Ngcp.csc.icons.desktop,
            viewType: 'account',
            routeId: 'account',
            acl: ['admin', 'restricted', 'host'],
            leaf: true
        }]
    }
});
