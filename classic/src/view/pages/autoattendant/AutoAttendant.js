Ext.define('NgcpCsc.view.pages.autoattendant.AutoAttendant', {
    extend: 'Ext.panel.Panel',

    xtype: 'autoattendant',

    viewModel: 'autoattendant',

    controller: 'autoattendant',

    title: Ngcp.csc.locales.autoattendant.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    items: [{
        layout: 'responsivecolumn',
        userCls: 'white-box',
        margin: 20,
        padding: 10,
        items: [{
            height: 25,
            html: Ngcp.csc.locales.autoattendant.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
            html: Ext.String.format('<div class="autoattendant-heading">{0} {1}</div>', Ngcp.csc.locales.autoattendant.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
