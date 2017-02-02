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
            reference: 'filterForm',
            bind: {
                hidden: '{filtergrid.filterHideState}'
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
                        boxLabel: "Call", // TODO: Find/create locales
                        inputValue: "call",
                        bind: '{filtergrid.call}'
                    }, {
                        boxLabel: "Voicemail",
                        inputValue: "voicemail",
                        bind: '{filtergrid.voicemail}'
                    }, {
                        boxLabel: "Reminder",
                        inputValue: "reminder",
                        bind: '{filtergrid.reminder}'
                    }, {
                        boxLabel: "Fax",
                        inputValue: "fax",
                        bind: '{filtergrid.fax}'
                    }]
                }]
            }]
        }, {
            xtype: 'form',
            // reference: 'filterForm',
            // padding: 20,
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'tagfield', // TODO: Remove when adjusted to checkboxes above
                labelAlign: 'top',
                reference: 'types',
                hidden: true,
                fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')],
                store: {
                    type: 'CallTypes'
                },
                displayField: 'call_type',
                valueField: 'id',
                filterPickList: true,
                publishes: 'value',
                bind: {
                    value: '{filtergrid.type}'
                }
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.search_term}',
                hidden: !this._searchTerm,
                fieldLabel: Ngcp.csc.locales.filters.search_term[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.name}',
                hidden: !this._pbxconfigSeats && !this._pbxconfigGroups && !this._pbxconfigDevices,
                fieldLabel: Ngcp.csc.locales.common.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.extensions}',
                hidden: !this._pbxconfigSeats && !this._pbxconfigGroups,
                fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.groups}',
                hidden: !this._pbxconfigSeats,
                renderer: 'renderGroupsFilterText'
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.numbers}',
                hidden: !this._pbxconfigSeats,
                fieldLabel: Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.phone_devices}',
                hidden: !this._pbxconfigSeats,
                fieldLabel: Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.hunt_policy}',
                hidden: !this._pbxconfigGroups,
                fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.hunt_timeout}',
                hidden: !this._pbxconfigGroups,
                fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'combo',
                labelAlign: 'top',
                store: Ext.create('NgcpCsc.store.DevicesList'),
                fieldLabel: Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')],
                name: 'deviceCombo',
                displayField: 'name',
                valueField: 'name', // here we will use the ids most probablys
                editable: false,
                bind: '{filtergrid.device}',
                hidden: !this._pbxconfigDevices
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.mac}',
                fieldLabel: Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')],
                hidden: !this._pbxconfigDevices
            }, {
                xtype: 'checkboxgroup',
                hidden: !this._pbxconfigDevices,
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
        }];
        this.callParent();
    }
})
