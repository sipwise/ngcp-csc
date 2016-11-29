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
            text: 'Voicemails',
            iconCls: 'x-fa fa-envelope',
            viewType: 'voicemails',
            routeId: 'voicebox',
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
            viewType: 'pageblank',
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
            iconCls: 'x-fa fa-paper-plane', //fa-file-text-o
            viewType: 'faxsend',
            routeId: 'faxsend',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Fax Spool',
            iconCls: 'x-fa fa-file-text-o',
            viewType: 'faxspool',
            routeId: 'faxspool',
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
            text: 'Auto attendant',
            iconCls: 'x-fa fa-microphone',
            viewType: 'autoattendant',
            routeId: 'autoattendant',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Device provisioning',
            iconCls: 'x-fa fa-fax',
            viewType: 'deviceprovisioning',
            routeId: 'deviceprovisioning',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            text: 'Hunt group',
            iconCls: 'x-fa fa-users',
            viewType: 'huntgroup',
            routeId: 'huntgroup',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            // TODO: 1. Implement scaffolding for this module
            text: 'Pbx extension',
            iconCls: 'x-fa fa-sign-out',
            viewType: 'pageblank',
            routeId: 'pbxextension',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }, {
            // TODO: 2. Implement scaffolding for this module
            text: 'Subscriber admin',
            iconCls: 'x-fa fa-cog',
            viewType: 'pageblank',
            routeId: 'subscriberadmin',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }]
    }
});
