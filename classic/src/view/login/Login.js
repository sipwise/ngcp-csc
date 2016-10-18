Ext.define('NgcpCsc.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'ngcp-login',

    controller: 'login',
    bodyPadding: 10,
    title: 'Login Window',
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
            fieldLabel: 'Username',
            allowBlank: false,
            padding: '10 0 0 15',
            listeners: {
                specialKey: 'onPressEnter'
            },
            bind:'{username}'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            padding: '0 0 0 15',
            listeners: {
                specialKey: 'onPressEnter'
            },
            bind:'{password}'
        }, {
            xtype: 'combo',
            fieldLabel: 'Choose language',
            padding: '0 0 0 15',
            store: 'Languages',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'language',
            value: localStorage.getItem('languageSelected') || 'en',
            listeners: {
                'select': 'languageSelection'
            }
        },  {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            itemId: 'login-message',
            padding: '0 0 5 15',
            hidden: true,
            width: 310,
            bind:'{message}'
        }],
        buttons: [{
            text: 'Login',
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});
