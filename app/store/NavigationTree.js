Ext.define('NgcpCsc.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [{
            text: 'Desktop',
            iconCls: 'x-fa fa-desktop',
            viewType: 'summary',
            routeId: 'desktop',
            acl: ['administrator', 'restricted', 'host'], //TODO define real roles, which should be delivered along with user info after successfull login
            leaf: true
        }, {
            text: 'Calls',
            iconCls: 'x-fa fa-phone',
            viewType: 'calls',
            routeId: 'callist',
            acl: ['administrator', 'restricted'],
            leaf: true
        }, {
            text: 'Chat',
            iconCls: 'x-fa fa-wechat',
            viewType: 'chat',
            routeId: 'chat',
            acl: ['administrator', 'restricted'],
            leaf: true
        }, {
            text: 'Addressbook',
            iconCls: 'x-fa fa-book',
            viewType: 'addressbook',
            routeId: 'addressbook',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call forward',
            iconCls: 'x-fa fa-mail-forward',
            viewType: 'callforward',
            routeId: 'callforward',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call barring',
            iconCls: 'x-fa fa-ban',
            routeId: 'callblock',
            viewType: 'callbarring',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Fax Send',
            iconCls: 'x-fa fa-file-text',
            viewType: 'faxsend',
            routeId: 'faxsend',
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
            text: 'Account',
            iconCls: 'x-fa fa-user',
            viewType: 'account',
            routeId: 'account',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Theme roller',
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
            children: [
                {
                text: 'Seats',
                iconCls: 'x-fa fa-home',
                viewType: 'seats',
                routeId: 'pbxconfig/seats',
                acl: ['administrator'],
                leaf: true
            },
            {
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
            }
        ]
        }, {
            text: 'Auto attendant',
            iconCls: 'x-fa fa-microphone',
            viewType: 'autoattendant',
            routeId: 'autoattendant',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Pbx extension',
            iconCls: 'x-fa fa-sign-out',
            viewType: 'pbxextension',
            routeId: 'pbxextension',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }]
    }
});
