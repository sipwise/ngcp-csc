Ext.define('NgcpCsc.view.pages.summary.Summary', {
    extend: 'Ext.panel.Panel',

    xtype: 'summary',

    viewModel: 'summary',

    controller: 'summary',

    title: Ngcp.csc.locales.summary.title[localStorage.getItem('languageSelected')],

    layout: 'responsivecolumn',

    html: '<p><a target="blank" href="https://sipwise.attask-ondemand.com/task/view?ID=580e25510021e900c9bb4f35ad94d665" class="link"> TODO </a></p>'
});
