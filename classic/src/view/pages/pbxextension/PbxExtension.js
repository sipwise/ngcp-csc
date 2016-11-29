Ext.define('NgcpCsc.view.pages.pbxextension.PbxExtension', {
    extend: 'Ext.panel.Panel',

    xtype: 'pbxextension',

    viewModel: 'pbxextension',

    controller: 'pbxextension',

    title: Ngcp.csc.locales.pbxextension.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    items: [{
        layout: 'responsivecolumn',
        userCls: 'white-box',
        margin: 20,
        padding: 10,
        items: [{
            height: 25,
            html: Ngcp.csc.locales.pbxextension.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25,
            html: Ext.String.format('<div class="pbxextension-heading">{0} {1}</div>', Ngcp.csc.locales.pbxextension.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

});
