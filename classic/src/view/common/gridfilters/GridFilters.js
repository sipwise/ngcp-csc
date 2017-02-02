Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'Ext.panel.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    padding: 0,

    flex: 1,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            reference: 'conversationsFilterForm',
            bind: {
                hidden: '{filtergrid.convFilterHideState}'
            },
            margin: 20,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                flex: 1,
                items: [{
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'left',
                    fieldLabel: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                    name: 'from_date',
                    bind: {
                        value: '{filtergrid.from_date}',
                        maxValue: '{fromDateMax}'
                    },
                    listeners: {
                        render: 'showCalendar',
                        click: {
                            element: 'el',
                            fn: 'submitFilters'
                        }
                    }
                }, {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'left',
                    fieldLabel: Ngcp.csc.locales.common.to[localStorage.getItem('languageSelected')],
                    name: 'to_date',
                    bind: '{filtergrid.to_date}',
                    listeners: {
                        render: 'showCalendar',
                        click: {
                            element: 'el',
                            fn: 'submitFilters'
                        }
                    },
                    maxValue: new Date() // limited to the current date or prior
                }, {
                    xtype: 'checkboxgroup',
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    defaults: {
                        margin: '0 10 0 0',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'submitFilters'
                            }
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
                items: [{
                    xtype: 'checkboxgroup',
                    labelAlign: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        listeners: {
                            click: {
                                element: 'el',
                                fn: 'submitFilters'
                            }
                        }
                    },
                    fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')],
                    items: [{
                        boxLabel: Ngcp.csc.locales.common.call[localStorage.getItem('languageSelected')],
                        inputValue: "call",
                        bind: '{filtergrid.call}'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.voicemail[localStorage.getItem('languageSelected')],
                        inputValue: "voicemail",
                        bind: '{filtergrid.voicemail}'
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.reminder[localStorage.getItem('languageSelected')],
                        inputValue: "reminder",
                        bind: '{filtergrid.reminder}'
                    }, {
                        boxLabel: Ngcp.csc.locales.common.fax[localStorage.getItem('languageSelected')],
                        inputValue: "fax",
                        bind: '{filtergrid.fax}'
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
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                flex: 1,
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.extensions}',
                    fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.groups}',
                    renderer: 'renderGroupsFilterText',
                    fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')]
                }]
            }, {
                flex: 1,
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.numbers}',
                    fieldLabel: Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.phone_devices}',
                    fieldLabel: Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')]
                }]
            }]
        }, {
            xtype: 'form',
            reference: 'pbxGroupsFilterForm',
            bind: {
                hidden: '{filtergrid.pbxGroupsFilterHideState}'
            },
            margin: 20,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                flex: 1,
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.hunt_policy}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')]
                }]
            }, {
                flex: 1,
                items: [{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.hunt_timeout}',
                    fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')]
                }]
            }]
        }, {
            xtype: 'form',
            reference: 'pbxDevicesFilterForm',
            bind: {
                hidden: '{filtergrid.pbxDevicesFilterHideState}'
            },
            margin: 20,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                flex: 1,
                items: [{
                    xtype: 'combo',
                    labelAlign: 'top',
                    store: Ext.create('NgcpCsc.store.DevicesList'),
                    fieldLabel: Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')],
                    name: 'deviceCombo',
                    displayField: 'name',
                    valueField: 'name', // here we will use the ids most probablys
                    editable: false,
                    bind: '{filtergrid.device}'
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.mac}',
                    fieldLabel: Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')]
                }]
            }, {
                flex: 1,
                items: [{
                    xtype: 'checkboxgroup',
                    labelAlign: 'top',
                    items: [{
                        boxLabel: Ngcp.csc.locales.filters.enabled[localStorage.getItem('languageSelected')],
                        inputValue: "enabled",
                        bind: '{filtergrid.enabled}'
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
