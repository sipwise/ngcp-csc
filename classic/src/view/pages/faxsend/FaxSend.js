Ext.define('NgcpCsc.view.pages.faxsend.FaxSend', {
    extend: 'Ext.panel.Panel',

    xtype: 'faxsend',

    viewModel: 'faxsend',

    controller: 'faxsend',

    title: Ngcp.csc.locales.fax_send.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    initComponent: function () {
        this.items = [{
            height: 60,
            padding: '20 0 5 20',
            html: Ngcp.csc.locales.fax_send.subtitle[localStorage.getItem('languageSelected')]
        }, {
            xtype: 'form',
            reference:'faxsendForm',
            items: [{
                xtype: 'faxsendform'
            }]
        }, {
            layout: 'hbox',
            margin: '0 0 0 5',
            defaults: {
                xtype: 'button'
            },
            items: [{
                text: Ngcp.csc.locales.fax_send.send_fax[localStorage.getItem('languageSelected')],
                margin: '0 5 0 0',
                handler: 'submitForm'
            }, {
                text: Ngcp.csc.locales.fax_send.reset_form[localStorage.getItem('languageSelected')],
                handler: 'resetForm'
            }]
        }];
        this.callParent();
    }

})
