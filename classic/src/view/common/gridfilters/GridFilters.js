Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    title: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],

    padding: 0,

    collapsible: true,

    collapsed: !Ext.os.is.Desktop,

    // TODO: Notes from Carlo:
    // yes you can use a toolbar which contains the name of the section (replacing the section title) and a search texxtfield
    // http://examples.sencha.com/extjs/6.2.0/examples/kitchensink/#toolbars
    // and inside the toolbar (or just beneath), you can add a collapsible panel which contains the fields. to build more complex toolbars pls use
    // http://docs.sencha.com/extjs/6.2.0/classic/Ext.panel.Panel.html#cfg-dockedItems (edited)
    // Collapsible panels http://docs.sencha.com/extjs/6.2.0/classic/Ext.panel.Panel.html#cfg-collapsible
    // regarding the logic, you have to intercept the keydown on the search field and trigger store filter of the current section
    // and you have to toggle visibility of the search filter when section changes ( you can get it from url change or by adding a listener on navigation tree)

    initComponent: function() {
        this.tools = [{
            xtype: 'textfield',
            width: 500,
            listeners: {
                input: {
                    element: 'el',
                    fn: 'filterSearchInput'
                }
            }
        }, {
            type: 'search'
        }, {
            type: 'caret', // TODO: Replace with right type/glyph
            callback: 'toggleFilterPanel'
        }];

        this.items = [{
            xtype: 'form',
            reference: 'filterForm',
            padding: 20,
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'datefield',
                format: 'd.m.Y',
                labelAlign: 'top',
                hidden: !this._callFilters,
                fieldLabel: Ngcp.csc.locales.filters.from[localStorage.getItem('languageSelected')],
                name: 'from_date',
                bind: {
                    value: '{filtergrid.from_date}',
                    maxValue: '{fromDateMax}'
                }
            }, {
                xtype: 'datefield',
                format: 'd.m.Y',
                hidden: !this._callFilters,
                name: 'to_date',
                bind: '{filtergrid.to_date}',
                maxValue: new Date() // limited to the current date or prior
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                hidden: !this._callFilters,
                bind: '{filtergrid.number}', // TODO: Number field to move to title bar
                fieldLabel: Ngcp.csc.locales.common.number[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'tagfield',
                labelAlign: 'top',
                reference: 'types',
                hidden: !this._callFilters,
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
                xtype: 'checkboxgroup',
                hidden: !this._callFilters,
                labelAlign: 'top',
                items: [{
                    boxLabel: Ngcp.csc.locales.filters.incoming[localStorage.getItem('languageSelected')],
                    inputValue: "incoming",
                    bind: '{filtergrid.incoming}'
                }, {
                    boxLabel: Ngcp.csc.locales.filters.outgoing[localStorage.getItem('languageSelected')],
                    inputValue: "outgoing",
                    bind: '{filtergrid.outgoing}'
                }]
            }, {
                xtype: 'checkboxgroup',
                hidden: !this._callFilters,
                labelAlign: 'top',
                items: [{
                    boxLabel: Ngcp.csc.locales.filters.missed[localStorage.getItem('languageSelected')],
                    inputValue: "missed",
                    bind: '{filtergrid.missed}'
                }, {
                    boxLabel: Ngcp.csc.locales.filters.answered[localStorage.getItem('languageSelected')],
                    inputValue: "answered",
                    bind: '{filtergrid.answered}'
                }]
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
            },{
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
            }, {
                layout: 'hbox',
                margin: '10 0 0 0',
                defaults: {
                    xtype: 'button',
                    flex: 1
                },
                items: [{
                    text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                    handler: 'resetFilters',
                    margin: '0 5 0 0'
                },{
                    text: Ngcp.csc.locales.filters.apply[localStorage.getItem('languageSelected')],
                    handler: 'submitFilters'
                }]
            }]
        }];
        this.callParent();
    }
})
