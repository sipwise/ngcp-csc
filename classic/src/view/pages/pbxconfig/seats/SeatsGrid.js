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
                    width: 130
                },
                {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    width: 250,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-name-{record.id}'
                    },
                    msgTarget: 'side',
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        blur: {
                            fn: 'fieldBlurred',
                            el: 'element'
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
                    width: 130
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
                    width: 250,
                    emptyText: Ngcp.csc.locales.pbxconfig.enter_new_extension[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-textfield-extension-{record.id}'
                    },
                    msgTarget: 'side',
                    maxLength: 3,
                    enforceMaxLength: true,
                    regex: /^[0-9]{3}$/,
                    regexText: Ngcp.csc.locales.pbxconfig.digit_extension_number[localStorage.getItem('languageSelected')],
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        blur: {
                            fn: 'fieldBlurred',
                            el: 'element'
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
                    width: 130
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-primary_number-{record.id}',
                        text: '{record.primary_number}'
                    }
                }, {
                    xtype: 'combo',
                    store: 'PrimaryNumbers',
                    editable: false,
                    width: 250,
                    displayField: 'number',
                    valueField: 'number',
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_new_primary_number[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-combo-primary_number-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        blur: {
                            fn: 'fieldBlurred',
                            el: 'element'
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
                    width: 130
                }, {
                    xtype: 'label',
                    bind: {
                        id: 'seats-label-alias_numbers-{record.id}',
                        text: '{record.alias_numbers_split}'
                    }
                }, {
                    xtype: 'tagfield',
                    valueField: 'number',
                    store: 'AliasNumbers',
                    width: 250,
                    displayField: 'number',
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_alias_numbers[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-tagfield-alias_numbers-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        blur: {
                            fn: 'fieldBlurred',
                            el: 'element'
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
                    width: 130
                }, {
                    xtype: 'label',
                    hidden: false,
                    bind: {
                        id: 'seats-label-groups-{record.id}',
                        text: '{record.groups_split}'

                    }
                }, {
                    xtype: 'tagfield',
                    valueField: 'id',
                    store: 'Groups',
                    width: 250,
                    displayField: 'name',
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_groups[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'seats-tagfield-groups-{record.id}'
                    },
                    listeners: {
                        focus: {
                            fn: 'setFieldValue'
                        },
                        blur: {
                            fn: 'fieldBlurred',
                            el: 'element'
                        },
                        specialkey: 'onEnterPressed'
                    }
                }]
            }, {
                xtype: 'label',
                bind: {
                    html: '<div class="card-wrapper"><div class="card-icon-row">' +
                    '<div id="removeSeat-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="editSeat-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="cancelSeat-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
