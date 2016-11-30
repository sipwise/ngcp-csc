Ext.define('NgcpCsc.view.pages.faxsend.FaxSend', {
    extend: 'Ext.panel.Panel',

    xtype: 'faxsend',

    viewModel: 'faxsend',

    controller: 'faxsend',

    title: Ngcp.csc.locales.fax_send.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    initComponent: function () {
        this.items = [{

            userCls: 'white-box',

            layout: 'responsivecolumn',

            margin:20,

            padding: 10,

            items:[{

                userCls: 'big-66 small-100',

                items:[{
                    height: 60,
                    html: Ngcp.csc.locales.fax_send.subtitle[localStorage.getItem('languageSelected')]
                }, {
                    reference:'faxsendForm',
                    xtype: 'faxsendform',
                    width:'100%'
                }, {
                    layout: 'hbox',
                    width:'99%',
                    defaults: {
                        xtype: 'button',
                        flex: 1
                    },
                    items: [{
                        text: Ngcp.csc.locales.fax_send.send_fax[localStorage.getItem('languageSelected')],
                        margin: '0 5 0 0',
                        handler: 'submitForm'
                    }, {
                        text: Ngcp.csc.locales.common.reset_form[localStorage.getItem('languageSelected')],
                        handler: 'resetForm'
                    }]
                }]
            }]
        }];
        this.callParent();
    }

})
