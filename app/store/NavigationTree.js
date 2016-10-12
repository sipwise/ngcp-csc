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
            leaf: true
        }, {
            text: 'Calls',
            iconCls: 'x-fa fa-phone',
            viewType: 'calls',
            routeId: 'callist',
            leaf: true
        }, {
            text: 'Voicemails',
            iconCls: 'x-fa fa-envelope',
            viewType: 'pageblank',
            routeId: 'voicebox',
            leaf: true
        }, {
            text: 'Address book',
            iconCls: 'x-fa fa-book',
            viewType: 'pageblank',
            routeId: 'addressbook',
            leaf: true
        }, {
            text: 'Call forward',
            iconCls: 'x-fa fa-mail-forward',
            expanded: false,
            selectable: false,
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
            leaf: 'true'

        }, {
            text: 'Reminder',
            iconCls: 'x-fa fa-sticky-note',
            viewType: 'pageblank',
            routeId: 'reminder',
            leaf: true
        }, {
            text: 'Account',
            iconCls: 'x-fa fa-user',
            viewType: 'pageblank',
            routeId: 'account',
            leaf: true
        }]
    }
});
