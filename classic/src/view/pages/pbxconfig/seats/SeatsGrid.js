Ext.define('NgcpCsc.view.pages.pbxconfig.seats.SeatsGrid', {
    extend: 'NgcpCsc.view.core.GridCards',

    cls: 'card-grid',
    reference: 'seatsGrid',
    store: 'Seats',

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
        pluginId: 'rowwidgetSeats',
        ptype: 'rowwidget',
        widget: {
            xtype: 'form',
            defaultBindProperty: 'hidden',
            bind: {
                hidden: '{!record}',
                id: 'seats-{record.id}'
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
                        id: 'seats-label-mainname-{record.id}'
                    },
                    hidden: true,
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.name[localStorage.getItem('languageSelected')],
                    width: 120
                },
                {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-name-{record.id}'
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
                        id: 'seats-label-extension-{record.id}',
                        text: '{record.extension}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-extension-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'primary_number',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.primary_number[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-group-{record.id}',
                        text: '{record.primary_number}',
                        hidden: false
                    }
                }, {
                    xtype: 'combo',
                    store: 'PrimaryNumbers',
                    editable: false,
                    width: 250,
                    displayField: 'number',
                    valueField: 'number',
                    // hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_new_primary_number[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-primary_number-{record.id}',
                        value: '{record.primary_number}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'alias_numbers',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.alias_numbers[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-alias_numbers-{record.id}',
                        text: Ngcp.csc.formatter.splitData('{record.alias_numbers}')
                    }
                }, {
                    xtype: 'tagfield',
                    valueField: 'number',
                    queryMode: 'local',
                    publishes: 'value',
                    store: 'AliasNumbers',
                    width: 250,
                    displayField: 'number',
                    // hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_alias_numbers[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-alias_numbers-{record.id}',
                        value: '{record.alias_numbers}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'groups',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.common.groups[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-group-{record.id}',
                        text: '{record.groups}',
                        hidden: false
                    }
                }, {
                    xtype: 'tagfield',
                    valueField: 'group',
                    queryMode: 'local',
                    publishes: 'value',
                    store: 'GroupNames',
                    width: 250,
                    displayField: 'group',
                    // hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_groups[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-group-{record.id}',
                        value: '{record.groups}'
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
                    '<div id="removeSeat-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="editSeat-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="cancelSeat-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
