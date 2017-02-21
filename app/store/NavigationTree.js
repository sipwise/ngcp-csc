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
            iconCls: 'x-fa fa-phone',
            viewType: 'conversations',
            routeId: 'inbox',
            acl: ['administrator', 'restricted'], //TODO define real roles, which should be delivered along with user info after successfull login
            leaf: true
        }, {
            text: 'Conversation with',
            iconCls: 'x-fa fa-wechat',
            viewType: 'chat',
            routeId: 'conversation-with',
            acl: ['administrator', 'restricted'],
            visible: false,
            leaf: true
        }, {
            text: 'Addressbook',
            iconCls: 'x-fa fa-book',
            viewType: 'addressbook',
            routeId: 'addressbook',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call Forward',
            iconCls: 'x-fa fa-angle-double-right',
            viewType: 'callforward',
            routeId: 'callforward',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call Barring',
            iconCls: 'x-fa fa-ban',
            routeId: 'callblock',
            viewType: 'callbarring',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Reminder',
            iconCls: 'x-fa fa-sticky-note',
            viewType: 'reminder',
            routeId: 'reminder',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Password',
            iconCls: 'x-fa fa-key',
            viewType: 'password',
            routeId: 'password',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Theme Roller',
            iconCls: 'x-fa fa-paint-brush',
            viewType: 'themeroller',
            routeId: 'themeroller',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Pbx Config',
            iconCls: 'x-fa fa-cog',
            routeId: 'pbxconfig',
            acl: ['administrator', 'restricted', 'host'],
            children: [{
                text: 'Seats',
                iconCls: 'x-fa fa-home',
                viewType: 'seats',
                routeId: 'pbxconfig/seats',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Groups',
                iconCls: 'x-fa fa-users',
                viewType: 'groups',
                routeId: 'pbxconfig/groups',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Devices',
                iconCls: 'x-fa fa-fax',
                viewType: 'devices',
                routeId: 'pbxconfig/devices',
                acl: ['administrator'],
                leaf: true
            }, {
                text: 'Auto Attendant',
                iconCls: 'x-fa fa-microphone',
                viewType: 'autoattendant',
                routeId: 'pbxconfig/autoattendant',
                acl: ['administrator', 'restricted', 'host'],
                leaf: true
            }]
        }, {
            text: 'Account',
            iconCls: 'x-fa fa-desktop',
            viewType: 'account',
            routeId: 'account',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }]
    }
});
