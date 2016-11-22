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
            xtype: 'container',
            height: 40,
            padding: '10 0 10 10',
            html: Ngcp.csc.locales.fax_send.send_fax[localStorage.getItem('languageSelected')].toLowerCase(),
            cls: 'link',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'submitForm'
                }
            }
        }, {
            xtype: 'container',
            height: 40,
            padding: '10 0 10 10',
            html: Ngcp.csc.locales.fax_send.reset_form[localStorage.getItem('languageSelected')].toLowerCase(),
            cls: 'link',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'resetForm'
                }
            }
        }];
        this.callParent();
    }

})
