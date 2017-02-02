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
        render: 'onMainViewRender',
        resize: 'setItemsSize'
    },

    // TODO: 1. Organize the different forms (calls, pbx) properly, and toggle
    // visibility of them depending on route
    // TODO: 2. Style form and position of elements in headerBar
    // TODO: 3. Fix delayed binds in formFilter, see submitFilters() in controller

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar shadow',
        height: 64,
        itemId: 'headerBar',
        items: [{
                xtype: 'container',
                reference: 'logo',
                id: 'logoContainer',
                cls: 'logo',
                html: '&nbsp;', // workaround to set the height
                width: (Ext.isIE9m || !Ext.os.is.Desktop) ? 64 : 250
            }, {
                margin: '0 0 0 8',
                ui: 'header',
                iconCls: 'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            }, {
                xtype: 'textfield',
                bind: {
                    hidden: '{headerBarFieldHideState}'
                },
                width: 500,
                align: 'center',
                listeners: {
                    input: {
                        element: 'el',
                        fn: 'newSearch'
                    }
                }
            }, {
                iconCls: 'x-fa fa-header',
                enableToggle: true,
                tooltip: 'Search for text in card header only, or whoole card.',
                bind: {
                    hidden: '{headerBarFieldHideState}'
                },
                listeners: {
                    click: {
                        element: 'el',
                        fn: 'toggleFree'
                    }
                }
            }, {

                iconCls: 'x-fa fa-filter',
                enableToggle: true,
                tooltip: 'Show filters.',
                bind: {
                    hidden: '{headerBarFieldHideState}'
                },
                listeners: {
                    click: {
                        element: 'el',
                        fn: 'toggleFilter'
                    }
                }
            },
            '->', {
                iconCls: 'x-fa fa-th-large',
                ui: 'header',
                href: '#account',
                hrefTarget: '_self',
                tooltip: Ngcp.csc.locales.main.tooltips.see_profile[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'tbtext',
                bind: {
                    text: Ngcp.csc.locales.main.logged_in_as[localStorage.getItem('languageSelected')] + '{username}'
                },
                cls: 'top-user-name'
            }, {
                xtype: 'tbseparator'
            }, {
                html: Ngcp.csc.locales.common.logout[localStorage.getItem('languageSelected')],
                tooltip: Ngcp.csc.locales.common.logout[localStorage.getItem('languageSelected')],
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
                items: [{
                    xtype: 'gridfilters'
                }, {
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card'
                    }
                }]
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
