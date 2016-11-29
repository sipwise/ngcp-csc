Ext.define('NgcpCsc.view.pages.account.Account', {
    extend: 'Ext.panel.Panel',

    xtype: 'account',

    controller: 'account',

    title: Ngcp.csc.locales.account.title[localStorage.getItem('languageSelected')],

    scrollable: true,

    initComponent: function() {
        this.items = [{
            layout: 'responsivecolumn',
            userCls:'white-box',
            margin:20,
            padding: 10,
            items: [{
                    padding: '0 0 5 0',
                    html: Ngcp.csc.locales.account.subtitle[localStorage.getItem('languageSelected')]
                }, {
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
                            flex:1
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
