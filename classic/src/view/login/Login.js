Ext.define('NgcpCsc.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'ngcp-login',

    controller: 'login',
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
    modal: true,
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
                id: 'title',
                panel: 'label',
                title: Ngcp.csc.locales.login.title[localStorage.getItem('languageSelected') || 'en']
            }, {
                xtype: 'textfield',
                name: 'username',
                id: 'login-username',
                cls: 'auth-textbox',
                emptyText: Ngcp.csc.locales.login.username[localStorage.getItem('languageSelected') || 'en'],
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
                emptyText: Ngcp.csc.locales.login.password[localStorage.getItem('languageSelected') || 'en'],
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
            }, {
                xtype: 'combo',
                emptyText: Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected') || 'en'],
                padding: '0 0 0 15',
                store: 'Languages',
                queryMode: 'local',
                id: 'login-language',
                valueField: 'id',
                displayField: 'language',
                editable: false,
                value: localStorage.getItem('languageSelected') || 'en',
                listeners: {
                    'select': 'languageSelection'
                }
            },
            // TODO: remember me & forgotten pswd
            {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'checkboxfield',
                    flex: 1,
                    cls: 'form-panel-font-color rememberMeCheckbox',
                    height: 30,
                    boxLabel: 'Remember me',
                    bind: {
                        value: '{remember_me}'
                    }
                }, {
                    xtype: 'box',
                    html: '<a href="#" class="link-forgot-password"> Forgot Password ?</a>'
                }]
            }, {
                text: Ngcp.csc.locales.login.button_text[localStorage.getItem('languageSelected') || 'en'],
                id: 'login-button',
                xtype: 'button',
                width: '100%',
                scale: 'large',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
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
