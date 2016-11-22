Ext.define('NgcpCsc.view.pages.account.AccountForm', {
    extend: 'Ext.form.Panel',

    xtype: 'accountform',

    viewModel: 'account',

    defaults: {
        width: '100%'
    },

    items: [{
        xtype: 'container',
        bind: '{username}',
        margin:'0 0 10 0'
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
        defaultType: 'textfield',
        defaults: {
            width: '100%'
        },
        items: [{
            inputType: 'password',
            fieldLabel: 'new password',
            name: 'account-new-password',
            bind: '{new-password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            inputType: 'password',
            fieldLabel: 'repeat',
            name: 'account-repeat-password',
            bind: '{repeat-password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }]
    }]

});
