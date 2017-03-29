Ext.define('NgcpCsc.view.pages.pbxconfig.seats.GroupsGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    cls: 'card-grid',
    reference: 'groupsGrid',
    store: 'Groups',

    viewConfig: {
        stripeRows: false,
        enableTextSelection: true
    },

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
        },
        cellclick: 'expandRow',
        rowbodyclick: 'expandRow'
    },

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            dataIndex: 'name',
            renderer: 'nameRenderer',
            header: false,
            width: '96%'
        }]
    },
    userCls: Ext.os.is.Desktop ? 'pbx-widget-grid big-820' : 'pbx-widget-grid small-100',

    plugins: [{
        pluginId: 'rowwidgetGroups',
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden',
            bind: {
                hidden: '{!record}',
                id: 'groups-{record.id}'
            },
            defaults: {
                layout: 'hbox'
            },
            items: [{
                name: 'name',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    bind: {
                        id: 'groups-label-mainname-{record.id}'
                    },
                    hidden: true,
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.name[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-textfield-name-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'extension',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: false,
                    bind: {
                        id: 'groups-label-extension-{record.id}',
                        text: '{record.extension}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-textfield-extension-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'hunt_policy',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.hunt_policy[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: false,
                    bind: {
                        id: 'groups-label-hunt_policy-{record.id}',
                        text: '{record.hunt_policy}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_hunt_policy[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-textfield-hunt_policy-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'hunt_timeout',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.hunt_timeout[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: false,
                    bind: {
                        id: 'groups-label-hunt_timeout-{record.id}',
                        text: '{record.hunt_timeout}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_hunt_timeout[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-textfield-hunt_timeout-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                xtype: 'label',
                bind: {
                    html: '<div class="card-wrapper"><div class="card-icon-row">' +
                    '<div id="removeGroup-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="editGroup-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="cancelGroup-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
