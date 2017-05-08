Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'Ext.panel.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    ui: 'core-container',

    // DONE 1. remove toggle (H) input button, and always search in all data of current active module
    // DONE 2. reset input field should be triggered on route change, to prevent wrong filtering
    // DONE 3. make input field slightly wider, to be consistent with card-grid width
    // DONE 4. all the input fields should have label left & input right
    // TODO 5. implement filters for last devices/seats/groups changes

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
                    editable: false,
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
                    width: 250,
                    bind: '{filtergrid.alias_numbers}',
                    fieldLabel: Ngcp.csc.locales.filters.alias_numbers[localStorage.getItem('languageSelected')],
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }
                // TODO: Needs adjusting in gridfilters task
                // {
                //     xtype: 'tagfield',
                //     labelAlign: 'top',
                //     store: 'GroupNames',
                //     displayField: 'group',
                //     valueField: 'group',
                //     width: 250,
                //     bind: '{filtergrid.groups}',
                //     fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')],
                //     listeners: {
                //         delay: 100,
                //         change: 'submitFilters'
                //     }
                // }
                ]
            }]
        }, {
            xtype: 'form',
            hidden:true,
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
                    editable: false,
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
                    labelAlign: 'left',
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
                    xtype: 'combo',
                    labelAlign: 'left',
                    store: Ext.create('NgcpCsc.store.DevicesList'),
                    fieldLabel: Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')],
                    name: 'deviceCombo',
                    displayField: 'name',
                    valueField: 'name', // here we will use the ids most probablys
                    editable: true,
                    bind: '{filtergrid.device}',
                    listeners: {
                        delay: 100,
                        change: 'submitFilters'
                    }
                }, {
                    xtype: 'textfield',
                    labelAlign: 'left',
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
                    labelAlign: 'left',
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
