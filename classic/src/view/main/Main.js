Ext.define('NgcpCsc.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'ngcp-main',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ngcp.csc.view.pages.BlankPage'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar shadow',
        height: 64,
        itemId: 'headerBar',
        items: [{
                xtype: 'container',
                reference: 'logo',
                id:'logoContainer',
                cls: 'logo',
                html:'&nbsp;', // workaround to set the height
                width: (Ext.isIE9m || !Ext.os.is.Desktop) ? 64 : 250
            }, {
                margin: '0 0 0 8',
                ui: 'header',
                iconCls: 'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            }, {
                border: 1,
                reference: 'console',
                xtype: 'label',
                cls: 'toolbar-console'
            },
            '->', {
                iconCls: 'x-fa fa-th-large',
                ui: 'header',
                href: '#account',
                hrefTarget: '_self',
                tooltip: 'See your profile'
            }, {
                xtype: 'tbtext',
                bind: {
                    text: 'Logged in as {username}'
                },
                cls: 'top-user-name'
            }, {
                xtype: 'tbseparator'
            }, {
                html: Ngcp.csc.locales.common.logout[localStorage.getItem('languageSelected')],
                tooltip: 'Logout',
                handler: 'logout'
            }, {
                xtype: 'image',
                cls: 'header-right-profile-image',
                height: 35,
                width: 35,
                alt: 'current user image',
                src: 'resources/images/user-profile/2.png'
            }
        ]
    }, {
        xtype: 'maincontainerwrap',
        id: 'main-view-detail-wrap',
        reference: 'mainContainerWrap',
        flex: 1,
        scrollable: true,
        height: '100%',
        items: [{
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            width: (Ext.isIE9m || !Ext.os.is.Desktop) ? 65 : 250,
            expanderFirst: false,
            expanderOnly: false,
            micro:(Ext.isIE9m || !Ext.os.is.Desktop),
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }, {
            xtype: 'container',
            height: 1, // (any) height is required by border layout
            flex: 1, // combined with hbox stretch, it takes all the available space
            id: 'mainContainer',
            layout: 'border',
            userCls: 'main-container',
            items: [{
                region: 'center',
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                layout: {
                    type: 'card'
                }
            }, {
                xtype: 'webrtc',
                region: 'east',
                itemId: 'webrtcPanel',
                hidden: true,
                collapsed: true,
                collapsible: true
            }]

        }]
    }]
});
