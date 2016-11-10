Ext.define('NgcpCsc.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    viewModel: 'callforward',

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
        //,xtype: 'container' TODO: Note to self, remember that we can put default xtypes here.
    },

    items: [{
        height: 60,
        padding: '20 0 5 20',
        html: Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')]
    }, {
        height: 60,
        padding: '5 0 0 20',
        // TODO: This class does not get created
        html: Ext.String.format('<div class="callforwarding-heading">{0} {1}</div>', Ngcp.csc.locales.callforward.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
    }, {
        bind: {
            // This ia only to test the data model binding
            html: '{cfu}'
        }
    }]

});
