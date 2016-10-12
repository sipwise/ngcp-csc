Ext.define('NgcpCsc.view.common.gridfilters.GridFilters.js', {
    extend: 'Ext.form.Panel',

    xtype: 'gridfilters',

    controller: 'gridfilters',

    margin: '0 10 0 0',

    items: [{
        html: Ngcp.csc.locales.filters.search[Ext.manifest.locale],
        padding: '10 0 10 0'
    }, {
        xtype: 'datefield',
        format: 'd.m.Y',
        labelAlign: 'top',
        width: '100%',
        fieldLabel: Ngcp.csc.locales.filters.from[Ext.manifest.locale],
        name: 'from_date'
    }, {
        xtype: 'datefield',
        format: 'd.m.Y',
        width: '100%',
        name: 'to_date',
        maxValue: new Date() // limited to the current date or prior
    }, {
        xtype: 'textfield',
        labelAlign: 'top',
        width: '100%',
        fieldLabel: Ngcp.csc.locales.filters.search_term[Ext.manifest.locale]
    }, {
        layout: 'hbox',
        margin: '10 0 0 0',
        defaults: {
            xtype: 'button',
            flex: 1
        },
        items: [{
            text: Ngcp.csc.locales.filters.apply[Ext.manifest.locale],
            margin: '0 5 0 0',
            handler: 'submitFilters'
        }, {
            text: Ngcp.csc.locales.filters.reset[Ext.manifest.locale],
            handler: 'resetFilters'
        }]
    }]

})
