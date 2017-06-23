Ext.define('NgcpCsc.view.login.Login', {
    extend: 'Ext.window.Window',
    controller: 'login',
    autoShow: true,
    bodyPadding: 20,
    closable: false,
    autoShow: true,
    standardSubmit: true,
    viewModel: 'login',
    width: 500,
    resizable: false,
    draggable: false,
    header: false,
    cls: 'auth-dialog',
    items: {
        xtype: 'form',
        reference: 'login-form',
        enableKeyEvents: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        defaults: {
            margin: '5 0'
        },
        items: [{
                id: 'login-title',
                padding: '20 0 20 0',
                height: 70,
                html: Ngcp.csc.locales.login.title[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                name: 'username',
                id: 'login-username',
                cls: 'auth-textbox',
                emptyText: Ngcp.csc.locales.common.username[localStorage.getItem('languageSelected')],
                padding: '10 0 0 15',
                minLength: 1,
                listeners: {
                    specialKey: 'onPressEnter',
                    change: 'onCredentialsChanged'
                },
                bind: '{username}',
                triggers: {
                    glyphed: {
                        cls: 'auth-user-trigger'
                    }
                }
            }, {
                xtype: 'textfield',
                name: 'password',
                id: 'login-password',
                cls: 'auth-textbox',
                inputType: 'password',
                minLength: 1,
                emptyText: Ngcp.csc.locales.common.password[localStorage.getItem('languageSelected')],
                padding: '0 0 0 15',
                listeners: {
                    specialKey: 'onPressEnter',
                    change: 'onCredentialsChanged'
                },
                bind: '{password}',
                triggers: {
                    glyphed: {
                        cls: 'auth-password-trigger'
                    }
                }
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'box',
                    width: 120,
                    html: '<a href="#" class="link-forgot-password"> ' + Ngcp.csc.locales.login.forgot_password[localStorage.getItem('languageSelected')] + '</a>'
                }]
            }, {
                text: Ngcp.csc.locales.login.button_text[localStorage.getItem('languageSelected')],
                id: 'login-button',
                xtype: 'button',
                width: '100%',
                scale: 'large',
                iconAlign: 'right',
                iconCls: Ngcp.csc.icons.angleright,
                bind: {
                    disabled: '{!authValid}'
                },
                listeners: {
                    click: 'onLoginClick'
                }
            }
        ]
    }

});
