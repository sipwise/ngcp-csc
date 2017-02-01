Ext.define('NgcpCsc.view.pages.password.PasswordForm', {
    extend: 'Ext.form.Panel',

    xtype: 'passwordform',

    defaults: {
        width: '100%'
    },

    items: [{
        xtype: 'container',
        bind: '{username}',
        margin: '0 0 10 0'
    }, {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: Ngcp.csc.locales.password.field_labels.old_password[localStorage.getItem('languageSelected')],
        name: 'account-old-password',
        bind: '{credentials.old_password}',
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
            fieldLabel: Ngcp.csc.locales.password.field_labels.new_password[localStorage.getItem('languageSelected')],
            name: 'account-new-password',
            bind: '{credentials.new_password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            inputType: 'password',
            fieldLabel: Ngcp.csc.locales.password.field_labels.repeat_password[localStorage.getItem('languageSelected')],
            name: 'account-repeat-password',
            bind: '{credentials.repeat_password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }]
    }]

});
