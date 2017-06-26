Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'Ext.panel.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    ui: 'core-container',

    // TODO: Fix input field not working on first input. See
    // GridFiltersController.js line 21

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            reference: 'conversationsFilterForm',
            margin: '20 20 0 20',
            layout: 'responsivecolumn',
            hidden:true,
            bind: {
                hidden: '{filtergrid.convFilterHideState}'
            },
            items: [{
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'left',
                    fieldLabel: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                    name: 'from_date',
                    allowBlank: true,
                    bind: {
                        value: '{filtergrid.from_date}',
                        maxValue: '{fromDateMax}'
                    },
                    listeners: {
                        render: 'showCalendar',
                        change: {
                            fn: 'fromFilterDateChanged',
                            delay: 100
                        }
                    }
                }, {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'left',
                    fieldLabel: Ngcp.csc.locales.common.to[localStorage.getItem('languageSelected')],
                    name: 'to_date',
                    bind: '{filtergrid.to_date}',
                    allowBlank: true,
                    listeners: {
                        render: 'showCalendar',
                        change: {
                            fn: 'toFilterDateChanged',
                            delay: 100
                        }
                    },
                    maxValue: new Date() // limited to the current date or prior
                }, {
                    xtype: 'checkboxgroup',
                    labelAlign: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        margin: '0 10 0 0',
                        listeners: {
                            delay: 100,
                            change: 'submitFilters'
                        }
                    },
                    fieldLabel: Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')],
                    items: [{
                        boxLabel: Ngcp.csc.locales.filters.incoming[localStorage.getItem('languageSelected')],
                        inputValue: "incoming",
                        bind: '{filtergrid.incoming}'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.outgoing[localStorage.getItem('languageSelected')],
                        inputValue: "outgoing",
                        bind: '{filtergrid.outgoing}'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.missed[localStorage.getItem('languageSelected')],
                        inputValue: "missed",
                        bind: '{filtergrid.missed}'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.answered[localStorage.getItem('languageSelected')],
                        inputValue: "answered",
                        bind: '{filtergrid.answered}'
                    }]
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'checkboxgroup',
                    labelAlign: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        listeners: {
                            delay: 100,
                            change: 'submitFilters'
                        }
                    },
                    fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')],
                    items: [{
                        boxLabel: Ngcp.csc.locales.common.conversation_type.call[localStorage.getItem('languageSelected')],
                        inputValue: "call",
                        bind: '{filtergrid.call}'
                    }, {
                        boxLabel: Ngcp.csc.locales.common.conversation_type.voicemail[localStorage.getItem('languageSelected')],
                        inputValue: "voicemail",
                        bind: '{filtergrid.voicemail}'
                    }, {
                        boxLabel: Ngcp.csc.locales.common.conversation_type.fax[localStorage.getItem('languageSelected')],
                        inputValue: "fax",
                        bind: '{filtergrid.fax}'
                    }, {
                        boxLabel: Ngcp.csc.locales.common.conversation_type.sms[localStorage.getItem('languageSelected')],
                        inputValue: "sms",
                        bind: '{filtergrid.sms}'
                    }, {
                        boxLabel: Ngcp.csc.locales.common.conversation_type.chat[localStorage.getItem('languageSelected')],
                        inputValue: "chat",
                        bind: '{filtergrid.chat}'
                    }]
                }]
            }]
        }, {
            xtype: 'form',
            hidden: true,
            reference: 'pbxGroupsFilterForm',
            bind: {
                hidden: '{filtergrid.pbxGroupsFilterHideState}'
            },
            margin: 20,
            layout: 'responsivecolumn',
            items: [{
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'left',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.groups_extension}',
                    fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: 'HuntPolicies',
                    displayField: 'policy',
                    valueField: 'policy',
                    editable: true,
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.hunt_policy}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'left',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.hunt_timeout}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: 'PrimaryNumbers',
                    bind: '{filtergrid.primary_number}',
                    displayField: 'number',
                    valueField: 'number',
                    width: 400,
                    labelWidth: 120,
                    editable: true,
                    fieldLabel: Ngcp.csc.locales.filters.primary_number[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'tagfield',
                    labelAlign: 'left',
                    store: 'AliasNumbers',
                    displayField: 'number',
                    valueField: 'number',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.alias_numbers}',
                    fieldLabel: Ngcp.csc.locales.filters.alias_numbers[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'tagfield',
                    labelAlign: 'left',
                    store: 'Seats',
                    displayField: 'name',
                    valueField: 'id',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.seats}',
                    fieldLabel: Ngcp.csc.locales.filters.seats[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }]
        }, {
            xtype: 'form',
            reference: 'pbxSeatsFilterForm',
            hidden:true,
            bind: {
                hidden: '{filtergrid.pbxSeatsFilterHideState}'
            },
            margin: 20,
            layout: 'responsivecolumn',
            items: [{
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'left',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.seats_extension}',
                    fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: 'PrimaryNumbers',
                    bind: '{filtergrid.primary_number}',
                    displayField: 'number',
                    valueField: 'number',
                    width: 400,
                    labelWidth: 120,
                    editable: true,
                    fieldLabel: Ngcp.csc.locales.filters.primary_number[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'tagfield',
                    labelAlign: 'left',
                    store: 'AliasNumbers',
                    displayField: 'number',
                    valueField: 'number',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.alias_numbers}',
                    fieldLabel: Ngcp.csc.locales.filters.alias_numbers[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'tagfield',
                    labelAlign: 'left',
                    store: 'Groups',
                    displayField: 'name',
                    valueField: 'id',
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.groups}',
                    fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }]
        }, {
            xtype: 'form',
            hidden:true,
            reference: 'pbxDevicesFilterForm',
            bind: {
                hidden: '{filtergrid.pbxDevicesFilterHideState}'
            },
            margin: 20,
            layout: 'responsivecolumn',
            items: [{
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'left',
                    bind: '{filtergrid.mac}',
                    width: 400,
                    labelWidth: 120,
                    fieldLabel: Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: 'DevicesList',
                    fieldLabel: Ngcp.csc.locales.pbxconfig.device[localStorage.getItem('languageSelected')],
                    displayField: 'name',
                    valueField: 'name',
                    editable: true,
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.device}',
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: 'Seats',
                    fieldLabel: Ngcp.csc.locales.filters.user[localStorage.getItem('languageSelected')],
                    displayField: 'name',
                    valueField: 'id',
                    editable: true,
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.devices_seat}',
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: ['Shared', 'Speed dial', 'Busy lamp', 'Private'],
                    fieldLabel: Ngcp.csc.locales.filters.type[localStorage.getItem('languageSelected')],
                    editable: true,
                    width: 400,
                    labelWidth: 120,
                    bind: '{filtergrid.devices_type}',
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: ['Ext1', 'Ext2', 'Ext3'],
                    bind: '{filtergrid.devices_extension}',
                    width: 400,
                    labelWidth: 120,
                    editable: true,
                    fieldLabel: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')] + " 1",
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: ['Ext1', 'Ext2', 'Ext3'],
                    bind: '{filtergrid.devices_extension2}',
                    width: 400,
                    labelWidth: 120,
                    editable: true,
                    fieldLabel: Ngcp.csc.locales.pbxconfig.extension[localStorage.getItem('languageSelected')] + " 2",
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }]
        }];
        this.callParent();
    }
})
