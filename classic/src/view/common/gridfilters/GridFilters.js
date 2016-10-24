Ext.define('NgcpCsc.view.common.gridfilters.GridFilters', {
    extend: 'Ext.form.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    model: 'gridfilters',

    margin: '0 10 0 0',

    items: [{
        html: Ngcp.csc.locales.filters.search[localStorage.getItem('languageSelected')],
        padding: '10 0 10 0'
    }, {
        xtype: 'datefield',
        format: 'd.m.Y',
        labelAlign: 'top',
        width: '100%',
        fieldLabel: Ngcp.csc.locales.filters.from[localStorage.getItem('languageSelected')],
        name: 'from_date',
        bind:{
            value:'{from_date}',
            maxValue: '{to_date}'
        }
    }, {
        xtype: 'datefield',
        format: 'd.m.Y',
        width: '100%',
        name: 'to_date',
        bind:{
            value: '{to_date}'
        },
        maxValue: new Date() // limited to the current date or prior
    }, {
        xtype: 'textfield',
        labelAlign: 'top',
        width: '100%',
        fieldLabel: Ngcp.csc.locales.filters.search_term[localStorage.getItem('languageSelected')]
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
    }],

})
