Ext.define('NgcpCsc.view.pages.account.AccountForm', {
    extend: 'Ext.form.Panel',

    xtype: 'accountform',

    viewModel: 'account',

    store: 'Account',

    items: [{
        xtype: 'container',
        width: 750,
        items: [{
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,
            fieldDefaults: {
                msgTarget: 'side',
                labelAlign: 'right',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [{
                xtype: 'container',
                bind: '{username}',
                padding: '0 0 15 0'
            }, {
                xtype: 'textfield',
                inputType: 'password',
                fieldLabel: 'old password',
                name: 'account-old-password',
                bind: '{old-password}',
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }, {
                xtype: 'fieldcontainer',
                labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'textfield',

                fieldDefaults: {
                    labelAlign: 'right'
                },
                items: [{
                    flex: 2,
                    inputType: 'password',
                    fieldLabel: 'new password',
                    name: 'account-new-password',
                    bind: '{new-password}',
                    listeners: {
                        specialKey: 'onEnterPressed'
                    }
                }, {
                    flex: 2,
                    inputType: 'password',
                    fieldLabel: 'repeat',
                    name: 'account-repeat-password',
                    margin: '0 0 0 5',
                    bind: '{repeat-password}',
                    listeners: {
                        specialKey: 'onEnterPressed'
                    }
                }]
            }]
        }]
    }]
    
});
