Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    title: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            reference:'filterForm',
            padding: 20,
            defaults: {
                width: '100%'
            },
            items: [{
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'top',
                    hidden: !this._hideSearchTerm,
                    fieldLabel: Ngcp.csc.locales.filters.from[localStorage.getItem('languageSelected')],
                    name: 'from_date',
                    bind: {
                        value: '{filtergrid.from_date}',
                        maxValue: '{fromDateMax}'
                    }
                }, {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    hidden: !this._hideSearchTerm,
                    name: 'to_date',
                    bind: '{filtergrid.to_date}',
                    maxValue: new Date() // limited to the current date or prior
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    hidden: !this._hideSearchTerm,
                    bind: '{filtergrid.number}',
                    fieldLabel: Ngcp.csc.locales.filters.number[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'tagfield',
                    labelAlign: 'top',
                    reference: 'types',
                    hidden: !this._hideSearchTerm,
                    fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')],
                    store: {
                        type: 'CallTypes'
                    },
                    displayField: 'call_type',
                    valueField: 'id',
                    filterPickList: true,
                    publishes: 'value',
                    bind:{
                        value:'{filtergrid.type}'
                    }
                },
                {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    bind: '{filtergrid.search_term}',
                    hidden:this._hideSearchTerm,
                    fieldLabel: Ngcp.csc.locales.filters.search_term[localStorage.getItem('languageSelected')]
                },
                {
                    xtype: 'checkboxgroup',
                    hidden: !this._hideSearchTerm,
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
                    hidden: !this._hideSearchTerm,
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
                        text: Ngcp.csc.locales.filters.reset[localStorage.getItem('languageSelected')],
                        handler: 'resetFilters'
                    }]
                }
            ]
        }];
        this.callParent();
    }

})
