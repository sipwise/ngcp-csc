Ext.define('NgcpCsc.view.pages.subscriberadmin.devices.Devices', {
    extend: 'Ext.panel.Panel',

    xtype: 'devices',

    viewModel: 'devices',

    controller: 'devices',

    title: Ngcp.csc.locales.subscriberadmin.title[localStorage.getItem('languageSelected')],

    items: [{
        layout: 'responsivecolumn',
        xtype: 'core-container',
        items: [{
            height: 25,
            //html: Ngcp.csc.locales.subscriberadmin.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
        //    html: Ext.String.format('<div class="subscriberadmin-heading">{0} {1}</div>', Ngcp.csc.locales.subscriberadmin.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
