Ext.define('NgcpCsc.view.pages.huntgroup.HuntGroup', {
    extend: 'Ext.panel.Panel',

    xtype: 'huntgroup',

    viewModel: 'huntgroup',

    controller: 'huntgroup',

    title: Ngcp.csc.locales.huntgroup.title[localStorage.getItem('languageSelected')],

    items: [{
        layout: 'responsivecolumn',
        xtype: 'core-container',
        items: [{
            height: 25,
            html: Ngcp.csc.locales.huntgroup.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
            html: Ext.String.format('<div class="huntgroup-heading">{0} {1}</div>', Ngcp.csc.locales.huntgroup.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
