Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    title: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],

    padding: 0,

    collapsible: true,

    collapsed: true,

    flex: 1,

    // ui: 'gridfilters',

    // DONE: 0. Utilize dockedItems for now to display filter bar on top in main container. Might look into implementing this inside headerBar in ngcp-main instead later
    // DONE: 1a. Intercept the input event on the search field..
    // DONE: 1b. ..and trigger store filter
    // DONE: 1c. And trigger filter on every input event
    // DONE: 2. Create click/blur listener for datefield to trigger calendar to appear when clicking in it
    // DONE: 3a. Rearrange calls/conversations fields according to wireframe
    // TODO: 3b. Properly adjust tabfields to checkboxes in view and controller
    // TODO: 4. Style gridfilters to centered, align form elements right, no border, etc. Setting an ui: config removes all inherited container styles? How do I properly style this?
    // TODO: 5. Style x-tool position, colors, etc
    // TODO: 6. Adjust it to also work for pbx filters

    initComponent: function() {
        this.tools = [{
            xtype: 'textfield',
            bind: '{filtergrid.number}',
            width: 500,
            listeners: {
                input: {
                    element: 'el',
                    fn: 'filterSearchInput'
                },
                specialKey: 'onEnterPressed'
            }
        }, {
            type: 'search' // TODO: Put inside textfield instead
        }];

        this.items = [{
            xtype: 'container',
            layout: 'responsivecolumn',
            margin: 20,
            items: [{
                userCls: 'big-50 small-100',
                items: [{
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'left',
                    hidden: !this._callFilters,
                    fieldLabel: Ngcp.csc.locales.common.from[localStorage.getItem('languageSelected')],
                    name: 'from_date',
                    bind: {
                        value: '{filtergrid.from_date}',
                        maxValue: '{fromDateMax}'
                    },
                    listeners: {
                        render: 'showCalendar'
                    }
                }, {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    hidden: !this._callFilters,
                    labelAlign: 'left',
                    fieldLabel: Ngcp.csc.locales.common.to[localStorage.getItem('languageSelected')],
                    name: 'to_date',
                    bind: '{filtergrid.to_date}',
                    listeners: {
                        render: 'showCalendar'
                    },
                    maxValue: new Date() // limited to the current date or prior
                }, {
                    xtype: 'checkboxgroup',
                    hidden: !this._callFilters,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    defaults: {
                        margin: '0 10 0 0'
                    },
                    fieldLabel: Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')], // TODO: Capital first char
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
                userCls: 'big-50 small-100',
                items: [{
                    xtype: 'checkboxgroup',
                    hidden: !this._callFilters,
                    labelAlign: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')], // TODO: Capital first char
                    items: [{
                        boxLabel: "Call", // TODO: Find/create locales
                        inputValue: "Call"
                        // ,bind: '{filtergrid.incoming}'
                    }, {
                        boxLabel: "Voicemail",
                        inputValue: "Voicemail"
                        // ,bind: '{filtergrid.outgoing}'
                    }, {
                        boxLabel: "Reminder",
                        inputValue: "Reminder"
                        // ,bind: '{filtergrid.missed}'
                    }, {
                        boxLabel: "Fax",
                        inputValue: "Fax"
                        // ,bind: '{filtergrid.answered}'
                    }]
                }]
            }]
        }, {
            xtype: 'form',
            reference: 'filterForm',
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
