Ext.define('NgcpCsc.view.pages.account.Account', {
    extend: 'Ext.panel.Panel',

    xtype: 'account',

    controller: 'account',

    title: Ngcp.csc.locales.account.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    defaults: {
        padding: 20
    },

    initComponent: function() {
        this.items = [{
            layout: 'responsivecolumn',
            userCls:'white-box',
            items: [{
                    //height: 60,
                    padding: '0 0 5 0',
                    html: Ngcp.csc.locales.account.subtitle[localStorage.getItem('languageSelected')]
                }, {
                    //height: 60,
                    padding: '00 0 5 0',
                    html: Ngcp.csc.locales.account.password_instructions[localStorage.getItem('languageSelected')]
                }, {
                    userCls: 'big-50 small-100',
                    items:[{
                        xtype: 'accountform'
                    },
                    {
                        layout: 'hbox',
                        margin: '20 0 0 0',
                        defaults: {
                            xtype: 'button',
                        },
                        items: [{
                            text: Ngcp.csc.locales.account.change_password[localStorage.getItem('languageSelected')].toLowerCase(),
                            margin: '0 5 0 0',
                            handler: 'submitForm'
                        }, {
                            text: Ngcp.csc.locales.account.reset_form[localStorage.getItem('languageSelected')].toLowerCase(),
                            handler: 'resetForm'
                        }]
                    }]
                }
            ]
        }];
        this.callParent();
    }

});
