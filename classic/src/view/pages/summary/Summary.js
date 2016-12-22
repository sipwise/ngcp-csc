Ext.define('NgcpCsc.view.pages.summary.Summary', {
    extend: 'Ext.panel.Panel',

    xtype: 'summary',

    viewModel: 'summary',

    controller: 'summary',

    title: Ngcp.csc.locales.summary.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    defaults: {
        ui: 'core-container',
        margin: 10,
        userCls: 'big-30 small-100',
    },
    items: [{
        xtype: 'summary-pie'
    },{
        xtype: 'summary-pie'
    },{
        xtype: 'summary-pie'
    }]
});
