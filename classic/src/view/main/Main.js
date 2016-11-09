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
                xtype: 'component',
                reference: 'logo',
                cls: 'logo',
                html: '<div class="main-logo"></div>',
                width: 250
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
        scrollable: false,
        layout:'border',
        items: [{
            xtype: 'treelist',
            reference: 'navigationTreeList',
            itemId: 'navigationTreeList',
            ui: 'navigation',
            store: 'NavigationTree',
            region: 'west',
            width: 250,
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }, {
            xtype: 'container',
            flex: 1,
            region: 'center',
            reference: 'mainCardPanel',
            cls: 'sencha-dash-right-main-container',
            itemId: 'contentPanel',
            height: 500,
            layout: {
                type: 'card'
            }
        }, {
            xtype:'webrtc',
            region: 'east',
            itemId:'webrtcPanel',
            hidden: true,
            collapsed:true,
            collapsible: true
        }]
    }]
});
