Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'Ext.panel.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    ui: 'core-container',

    // DONE: 1. All devices filters seem to work. Check to verify.
    // DONE: 2. All other filters for pbx modules are not working, but field in
    // headerBar is working for both names and free search. Fix.
    // DONE: 3. Implement case insensitive search by default.
    // DONE: 4. Check and fix "empty field should reset".

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            reference: 'conversationsFilterForm',
            margin: '20 20 0 20',
            layout: 'responsivecolumn',
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
            reference: 'pbxSeatsFilterForm',
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
                    labelAlign: 'top',
                    bind: '{filtergrid.seats_extension}',
                    fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.groups}',
                    fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.numbers}',
                    fieldLabel: Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.phone_devices}',
                    fieldLabel: Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }]
        }, {
            xtype: 'form',
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
                    labelAlign: 'top',
                    bind: '{filtergrid.groups_extension}',
                    fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.hunt_policy}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.hunt_timeout}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }]
        }, {
            xtype: 'form',
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
                    xtype: 'combo',
                    labelAlign: 'top',
                    store: Ext.create('NgcpCsc.store.DevicesList'),
                    fieldLabel: Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')],
                    name: 'deviceCombo',
                    displayField: 'name',
                    valueField: 'name', // here we will use the ids most probablys
                    editable: false,
                    bind: '{filtergrid.device}',
                    listeners: {
                        delay: 100,
                        select: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.mac}',
                    fieldLabel: Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }]
            }, {
                flex: 1,
                userCls: 'small-100 big-50',
                items: [{
                    xtype: 'checkboxgroup',
                    labelAlign: 'top',
                    defaults: {
                        listeners: {
                            delay: 100,
                            change: 'submitFilters'
                        }
                    },
                    items: [{
                        boxLabel: Ngcp.csc.locales.filters.enabled[localStorage.getItem('languageSelected')],
                        inputValue: "enabled",
                        bind: '{filtergrid.enabled}',
                        margin: '0 10 0 0'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.disabled[localStorage.getItem('languageSelected')],
                        inputValue: "disabled",
                        bind: '{filtergrid.disabled}'
                    }]
                }]
            }]
        }];
        this.callParent();
    }
})
