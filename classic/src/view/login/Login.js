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
            store: new Ext.data.Store({
                data: [{
                    id: "en",
                    language: 'English'
                },{
                    id: "it",
                    language: 'Italian'
                },{
                    id: "de",
                    language: 'German'
                },{
                    id: "fr",
                    language: 'French'
                },{
                    id: "sp",
                    language: 'Spanish'
                }]
            }),
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
