Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'NgcpCsc.view.core.Container',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    viewModel: 'gridfilters',

    title: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            padding: 20,
            defaults: {
                width: '100%',
            },
            items: [{
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    labelAlign: 'top',
                    fieldLabel: Ngcp.csc.locales.filters.from[localStorage.getItem('languageSelected')],
                    name: 'from_date',
                    bind: {
                        value: '{filtergrid.from_date}',
                        maxValue: '{filtergrid.to_date}'
                    }
                }, {
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    name: 'to_date',
                    bind: '{filtergrid.to_date}',
                    maxValue: new Date() // limited to the current date or prior
                }, {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    fieldLabel: Ngcp.csc.locales.filters.number[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'tagfield',
                    labelAlign: 'top',
                    fieldLabel: Ngcp.csc.locales.filters.calltype[localStorage.getItem('languageSelected')],
                    store: {
                        type: 'CallTypes'
                    },
                    displayField: 'call_type',
                    valueField: 'call_type',
                    filterPickList: true,
                    publishes: 'value'
                },
                // not sure if we need this anymore
                /*{
                    xtype: 'textfield',
                    labelAlign: 'top',
                    fieldLabel: Ngcp.csc.locales.filters.search_term[localStorage.getItem('languageSelected')]
                },*/
                {
                    xtype: 'radiogroup',
                    //fieldLabel: Ngcp.csc.locales.filters.direction[localStorage.getItem('languageSelected')],
                    labelAlign: 'top',
                    bind: '{filtergrid.direction}',
                    simpleValue: true,
                    defaults: {
                        name: 'direction'
                    },
                    items: [{
                        boxLabel: Ngcp.csc.locales.filters.incoming[localStorage.getItem('languageSelected')],
                        inputValue: "in"
                    }, {
                        boxLabel: Ngcp.csc.locales.filters.outcoming[localStorage.getItem('languageSelected')],
                        inputValue: "out"
                    }]
                }, {
                    xtype: 'checkboxgroup',
                    //fieldLabel: Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')],
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
