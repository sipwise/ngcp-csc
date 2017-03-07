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

    name: 'mainView',

    initComponent: function() {
        var vm = this.getViewModel();
        this.items = [{
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
                    reference: 'filterTxtSearch',
                    bind: {
                        hidden: '{headerBarFieldHideState}'
                    },
                    // need specs on what should be shown in toolbar.
                    // for now, in mobile the search field takes ~half of the available space
                    width: Ext.os.is.Desktop ? 730 : '52%',
                    listeners: {
                        input: {
                            element: 'el',
                            fn: 'newSearch'
                        }
                    }
                }, {
                    iconCls: 'x-fa fa-header',
                    reference: 'headerToggleButton',
                    enableToggle: true,
                    pressed: false,
                    tooltip: Ngcp.csc.locales.filters.tooltips.search_toggle[localStorage.getItem('languageSelected')],
                    margin: '0 2 0 3',
                    bind: {
                        hidden: '{headerBarFieldHideState}'
                    },
                    listeners: {
                        click: 'toggleFree'
                    }
                }, {
                    iconCls: Ngcp.csc.icons.filter,
                    enableToggle: true,
                    tooltip: Ngcp.csc.locales.filters.tooltips.show_filter[localStorage.getItem('languageSelected')],
                    bind: {
                        hidden: '{headerBarFieldHideState}'
                    },
                    listeners: {
                        click: 'toggleFilter'
                    }
                },
                '->', {
                    xtype: 'tbtext',
                    bind: {
                        text: Ngcp.csc.locales.main.logged_in_as[localStorage.getItem('languageSelected')] + '{username}'
                    },
                    cls: 'top-user-name',
                    hidden: !Ext.os.is.Desktop
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
                micro: (Ext.isIE9m || !Ext.os.is.Desktop),
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            }, {
                xtype: 'container',
                flex: 1, // combined with hbox stretch, it takes all the available space
                id: 'mainContainer',
                layout: {
                    type: 'hbox'
                },
                userCls: 'main-container',
                defaults: {
                    scrollable: true,
                    height: '100%'
                },
                items: [{
                    flex: 5,
                    scrollable: false,
                    id: 'mainContainerInner',
                    items: [{
                        reference: 'sectionTitle',
                        bind: {
                            title: '{sectionTitle}'
                        }
                    }, {
                        xtype: 'gridfilters',
                        reference: 'gridFilters'
                    }, {
                        reference: 'mainCardPanel',
                        cls: 'sencha-dash-right-main-container',
                        id: 'contentPanel',
                        layout: {
                            type: 'card'
                        },
                        listeners: {
                            resize: 'mainContainerResized'
                        },
                        defaults: {
                            scrollable: true
                        }
                    }]
                }, {
                    flex: 3,
                    resizable: Ext.os.is.Desktop,
                    xtype: 'rtc',
                    itemId: 'webrtcPanel',
                    hidden: true
                }, {
                    width: 250,
                    resizable: Ext.os.is.Desktop,
                    xtype: 'contacts',
                    ui: 'core-container'
                }]
            }]
        }];
        this.callParent();
    }
});
