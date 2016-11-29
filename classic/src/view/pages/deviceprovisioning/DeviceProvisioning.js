Ext.define('NgcpCsc.view.pages.deviceprovisioning.DeviceProvisioning', {
    extend: 'Ext.panel.Panel',

    xtype: 'deviceprovisioning',

    viewModel: 'deviceprovisioning',

    controller: 'deviceprovisioning',

    title: Ngcp.csc.locales.deviceprovisioning.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    items: [{
        layout: 'responsivecolumn',
        userCls: 'white-box',
        margin: 20,
        padding: 10,
        items: [{
            height: 25,
            html: Ngcp.csc.locales.deviceprovisioning.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
            html: Ext.String.format('<div class="deviceprovisioning-heading">{0} {1}</div>', Ngcp.csc.locales.deviceprovisioning.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
