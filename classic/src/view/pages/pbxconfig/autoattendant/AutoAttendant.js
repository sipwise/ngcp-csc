Ext.define('NgcpCsc.view.pages.pbxconfig.autoattendant.AutoAttendant', {
    extend: 'Ext.panel.Panel',

    xtype: 'autoattendant',

    viewModel: 'autoattendant',

    controller: 'autoattendant',

    title: Ngcp.csc.locales.pbxconfig.autoattendant.title[localStorage.getItem('languageSelected')],

    items: [{
        layout: 'responsivecolumn',
        xtype:'core-container',
        items: [{
            height: 25,
            html: Ngcp.csc.locales.pbxconfig.autoattendant.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
            html: Ext.String.format('<div class="autoattendant-heading">{0} {1}</div>', Ngcp.csc.locales.pbxconfig.autoattendant.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
