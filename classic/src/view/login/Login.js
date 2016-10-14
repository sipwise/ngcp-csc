Ext.define('NgcpCsc.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'ngcp-login',

    requires: [
        'NgcpCsc.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'Login Window',
    closable: false,
    autoShow: true,
    standardSubmit: true,
    viewModel: 'login',

    items: {
        xtype: 'form',
        reference: 'login-form',
        enableKeyEvents: true,
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false,
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
            listeners: {
                specialKey: 'onPressEnter'
            },
            bind:'{password}'
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            itemId: 'login-message',
            width: 300,
            value: 'Enter any non-blank password',
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
