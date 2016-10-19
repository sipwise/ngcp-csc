Ext.define('NgcpCsc.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'ngcp-login',

    controller: 'login',
    bodyPadding: 10,
    title: Ngcp.csc.locales.login.title[localStorage.getItem('languageSelected')],
    closable: false,
    autoShow: true,
    standardSubmit: true,
    viewModel: 'login',
    width: 330,

    items: {
        xtype: 'form',
        reference: 'login-form',
        enableKeyEvents: true,
        items: [{
            xtype: 'textfield',
            name: 'username',
            id: 'login-username',
            fieldLabel: Ngcp.csc.locales.login.username[localStorage.getItem('languageSelected')],
            allowBlank: false,
            padding: '10 0 0 15',
            listeners: {
                specialKey: 'onPressEnter'
            },
            bind: '{username}'
        }, {
            xtype: 'textfield',
            name: 'password',
            id: 'login-password',
            inputType: 'password',
            fieldLabel: Ngcp.csc.locales.login.password[localStorage.getItem('languageSelected')],
            allowBlank: false,
            padding: '0 0 0 15',
            listeners: {
                specialKey: 'onPressEnter'
            },
            bind: '{password}'
        }, {
            xtype: 'combo',
            fieldLabel: Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected')],
            padding: '0 0 0 15',
            store: 'Languages',
            queryMode: 'local',
            id: 'login-language',
            valueField: 'id',
            displayField: 'language',
            value: localStorage.getItem('languageSelected') || 'en',
            listeners: {
                'select': 'languageSelection'
            }
        },  {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            padding: '0 0 5 15',
            hidden: true,
            id: 'login-message',
            bind: '{message}'
        }],
        buttons: [{
            text: Ngcp.csc.locales.login.button_text[localStorage.getItem('languageSelected')],
            id: 'login-button',
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});
