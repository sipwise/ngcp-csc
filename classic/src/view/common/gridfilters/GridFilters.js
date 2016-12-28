Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    title: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],

    padding: 0,

    collapsible: true,

    collapsed: !Ext.os.is.Desktop,

    initComponent: function() {

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
                bind: '{filtergrid.number}',
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
                hidden: !this._subscriberAdminSeats && !this._subscriberAdminGroups && !this._subscriberAdminDevices,
                fieldLabel: Ngcp.csc.locales.filters.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.extensions}',
                hidden: !this._subscriberAdminSeats && !this._subscriberAdminGroups && !this._subscriberAdminDevices,
                fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.groups}',
                hidden: !this._subscriberAdmin,
                fieldLabel: Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.pbx_devices}',
                hidden: !this._subscriberAdmin,
                fieldLabel: Ngcp.csc.locales.filters.pbx_devices[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.hunt_policy}',
                hidden: !this._subscriberAdminGroups,
                fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{filtergrid.hunt_timeout}',
                hidden: !this._subscriberAdminGroups,
                fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'checkboxgroup',
                hidden: !this._subscriberAdminDevices,
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
                    text: Ngcp.csc.locales.filters.apply[localStorage.getItem('languageSelected')],
                    margin: '0 5 0 0',
                    handler: 'submitFilters'
                }, {
                    text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                    handler: 'resetFilters'
                }]
            }]
        }];
        this.callParent();
    }
})
