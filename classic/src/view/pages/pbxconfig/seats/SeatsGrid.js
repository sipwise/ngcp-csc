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
                    hidden: true, // TODO
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.name[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    hidden: true, // TODO
                    bind: {
                        id: 'seats-label-name-{record.id}',
                        text: '{record.name}'
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true, // TODO
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
                    bind: {
                        id: 'seats-label-extension-{record.id}',
                        text: '{record.extension}',
                        hidden: false
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true, // TODO
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-extension-{record.id}',
                        hidden: true
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
                },
                // {
                //     xtype: 'label',
                //     bind: {
                //         id: 'seats-label-group-{record.id}',
                //         text: '{record.group}',
                //         hidden: false
                //     }
                // }
                , {
                    xtype: 'combo',
                    store: ['43991001', '43991002', '43991003', '43991004', '43991005', '43991006'],
                    required: true, // TODO: Needed, or better with allowBlank?
                    editable: false,
                    value: '',
                    // hidden: true, // TODO
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_new_primary_number[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-primary_number-{record.id}'
                        // ,hidden: true
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'group',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.common.group[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-group-{record.id}',
                        text: '{record.group}',
                        hidden: false
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true, // TODO
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_groups[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-group-{record.id}',
                        hidden: true
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'numbers',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.numbers[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-numbers-{record.id}',
                        text: '{record.numbers}',
                        hidden: false
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true, // TODO
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_numbers[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-numbers-{record.id}',
                        hidden: true
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                name: 'phone_devices',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.pbxconfig.phone_devices[localStorage.getItem('languageSelected')],
                    width: 120
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-phone_devices-{record.id}',
                        text: '{record.phone_devices}',
                        hidden: false
                    }
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true, // TODO
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_phone[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-phone_devices-{record.id}',
                        hidden: true
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
                    '</div></div>'
                }
            }]
        }
    }]
});
