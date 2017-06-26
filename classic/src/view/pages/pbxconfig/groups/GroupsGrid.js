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
        mousedown: {
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
                    text: Ngcp.csc.locales.pbxconfig.group_name[localStorage.getItem('languageSelected')],
                    width: 130
                }, {
                    xtype: 'textfield',
                    required: true,
                    hidden: true,
                    width: 250,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_groups[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-textfield-name-{record.id}'
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
                    msgTarget: 'side',
                    enforceMaxLength: true,
                    regex: /^[1-9][0-9]*$/,
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
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    name: 'hunt_policy',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-hunt-labels-and-fields pbx-data-value',
                        text: Ngcp.csc.locales.pbxconfig.hunt_policy[localStorage.getItem('languageSelected')],
                        width: 130
                    }, {
                        xtype: 'label',
                        cls: 'pbx-hunt-labels-and-fields',
                        hidden: false,
                        bind: {
                            id: 'groups-label-hunt_policy-{record.id}',
                            text: '{record.hunt_policy}'
                        }
                    }, {
                        xtype: 'combo',
                        cls: 'pbx-hunt-labels-and-fields',
                        store: 'HuntPolicies',
                        required: true,
                        editable: false,
                        displayField: 'policy',
                        valueField: 'policy',
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.choose_new_hunt_policy[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'groups-combo-hunt_policy-{record.id}'
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
                    name: 'hunt_timeout',
                    defaults: {
                        padding: '0 0 15 0'
                    },
                    items: [{
                        xtype: 'label',
                        cls: 'pbx-hunt-labels-and-fields pbx-hunttimeout-labels',
                        margin: '0 10 0 10',
                        text: Ngcp.csc.locales.pbxconfig.for[localStorage.getItem('languageSelected')],
                        bind: {
                            id: 'groups-prelabel-hunt_timeout-{record.id}'
                        }
                    }, {
                        xtype: 'label',
                        cls: 'pbx-hunt-labels-and-fields',
                        bind: {
                            id: 'groups-label-hunt_timeout-{record.id}',
                            text: '{record.hunt_timeout}'
                        }
                    }, {
                        xtype: 'textfield',
                        cls: 'pbx-hunt-labels-and-fields',
                        required: true,
                        hidden: true,
                        emptyText: Ngcp.csc.locales.pbxconfig.enter_new_hunt_timeout[localStorage.getItem('languageSelected')],
                        msgTarget: 'side',
                        maxLength: 3,
                        enforceMaxLength: true,
                        regex: /^[0-9]{1,3}$/,
                        regexText: 'Must be a 3 digit timeout number',
                        bind: {
                            id: 'groups-textfield-hunt_timeout-{record.id}'
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
                    }, {
                        xtype: 'label',
                        cls: 'pbx-hunt-labels-and-fields pbx-hunttimeout-labels',
                        margin: '0 0 0 10',
                        text: Ngcp.csc.locales.pbxconfig.seconds[localStorage.getItem('languageSelected')],
                        width: 130,
                        bind: {
                            id: 'groups-postlabel-hunt_timeout-{record.id}'
                        }
                    }]
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
                        id: 'groups-label-primary_number-{record.id}',
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
                        id: 'groups-combo-primary_number-{record.id}'
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
                        id: 'groups-label-alias_numbers-{record.id}',
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
                        id: 'groups-tagfield-alias_numbers-{record.id}'
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
                name: 'seats',
                defaults: {
                    padding: '0 0 15 0'
                },
                items: [{
                    xtype: 'label',
                    cls: 'pbx-data-value',
                    text: Ngcp.csc.locales.common.seats[localStorage.getItem('languageSelected')],
                    width: 130
                }, {
                    xtype: 'label',
                    hidden: false,
                    bind: {
                        id: 'groups-label-seats-{record.id}',
                        text: '{record.seats_split}'

                    }
                }, {
                    xtype: 'tagfield',
                    valueField: 'id',
                    store: 'Seats',
                    width: 250,
                    displayField: 'name',
                    hidden: true,
                    emptyText: Ngcp.csc.locales.pbxconfig.choose_one_or_more_seats[localStorage.getItem('languageSelected')],
                    bind: {
                        id: 'groups-tagfield-seats-{record.id}'
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
                    '<div id="cancelGroup-{record.id}" class="card-icon hidden" data-callback="cancelCard" data-qtip="' + Ngcp.csc.locales.pbxconfig.cancel_operation[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.block2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="removeGroup-{record.id}" class="card-icon" data-callback="removeCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.trash2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '<div id="editGroup-{record.id}" class="card-icon" data-callback="editCard" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_entry[localStorage.getItem('languageSelected')] + '"><i class="' + Ngcp.csc.icons.edit2x + ' green-icon pointer" aria-hidden="true"></i></div>' +
                    '</div></div>'
                }
            }]
        }
    }]
});
