Ext.define('NgcpCsc.view.pages.calls.Calls', {
    extend: 'Ext.panel.Panel',

    xtype: 'calls',

    controller: 'calls',

    viewModel: 'calls',

    layout: 'responsivecolumn',

    title: Ngcp.csc.locales.calls.section_title[localStorage.getItem('languageSelected')],

    items: [{
        userCls: 'big-30 small-100',
        items: [Ext.create('NgcpCsc.view.common.gridfilters.GridFilters', {
            _linkedStoreId: 'Calls',
            _callFilters: true
        })]
    }, {
        xtype: 'calls-grid',
        userCls: 'big-70 small-100'
    }]
})
