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
            text: 'Address book',
            iconCls: 'x-fa fa-book',
            viewType: 'pageblank',
            routeId: 'addressbook',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Call forward',
            iconCls: 'x-fa fa-mail-forward',
            expanded: false,
            selectable: false,
            acl: ['administrator'],
            children: [{
                text: 'Mapping',
                iconCls: 'x-fa fa-sitemap',
                viewType: 'pageblank',
                routeId: 'callforward/mapping',
                leaf: true
            }, {
                text: 'Destinations sets',
                iconCls: 'x-fa fa-plane',
                viewType: 'pageblank',
                routeId: '/callforward/destination',
                leaf: true
            }, {
                text: 'Time sets',
                iconCls: 'x-fa fa-clock-o',
                viewType: 'pageblank',
                routeId: '/callforward/time',
                leaf: true
            }]
        }, {
            text: 'Call barring',
            iconCls: 'x-fa fa-ban',
            routeId: 'callblock',
            viewType: 'pageblank',
            acl: ['administrator'],
            leaf: 'true'

        }, {
            text: 'Reminder',
            iconCls: 'x-fa fa-sticky-note',
            viewType: 'pageblank',
            routeId: 'reminder',
            acl: ['administrator'],
            leaf: true
        }, {
            text: 'Account',
            iconCls: 'x-fa fa-user',
            viewType: 'pageblank',
            routeId: 'account',
            acl: ['administrator', 'restricted', 'host'],
            leaf: true
        }]
    }
});
