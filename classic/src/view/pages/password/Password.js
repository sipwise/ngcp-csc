Ext.define('NgcpCsc.view.pages.password.Password', {
    extend: 'Ext.panel.Panel',

    xtype: 'password',

    controller: 'password',

    viewModel: 'password',

    initComponent: function() {
        this.items = [{
            layout: 'responsivecolumn',
            xtype: 'core-container',
            items: [{
                    padding: '0 0 5 0',
                    html: Ngcp.csc.locales.common.password[localStorage.getItem('languageSelected')].toUpperCase()
                }, {
                    padding: '0 0 5 0',
                    html: Ngcp.csc.locales.password.password_instructions[localStorage.getItem('languageSelected')]
                }, {
                    userCls: 'big-66 small-100',
                    items:[{
                        xtype: 'passwordform'
                    },
                    {
                        layout: 'hbox',
                        margin: '20 0 0 0',
                        defaults: {
                            xtype: 'button',
                            flex: 1
                        },
                        items: [{
                            text: Ngcp.csc.locales.password.change_password[localStorage.getItem('languageSelected')].toLowerCase(),
                            margin: '0 5 0 0',
                            handler: 'submitForm'
                        }, {
                            text: Ngcp.csc.locales.common.reset_form[localStorage.getItem('languageSelected')].toLowerCase(),
                            handler: 'resetForm'
                        }]
                    }]
                }
            ]
        }];
        this.callParent();
    }

});
