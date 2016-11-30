Ext.define('NgcpCsc.view.pages.account.AccountForm', {
    extend: 'Ext.form.Panel',

    xtype: 'accountform',

    viewModel: 'account',

    defaults: {
        width: '100%'
    },

    // DONE: 1. Go over all forms and replace fieldLabel values with locale
    // DONE: 2. Look for tooltips
    // DONE: 3. Go over controllers and check for strings
    // DONE: 4. Look for other value strings in project, that we can put
    // in locale
    // TODO: 5. Look for duplicates in locales

    // TIME: Worked 20 min until 12:05 (plus the already logged hour). Started again from about 13:05.

    items: [{
        xtype: 'container',
        bind: '{username}',
        margin:'0 0 10 0'
    }, {
        xtype: 'textfield',
        inputType: 'password',
        fieldLabel: Ngcp.csc.locales.account.field_labels.old_password[localStorage.getItem('languageSelected')],
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
            fieldLabel: Ngcp.csc.locales.account.field_labels.new_password[localStorage.getItem('languageSelected')],
            name: 'account-new-password',
            bind: '{new-password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            inputType: 'password',
            fieldLabel: Ngcp.csc.locales.account.field_labels.repeat_password[localStorage.getItem('languageSelected')],
            name: 'account-repeat-password',
            bind: '{repeat-password}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }]
    }]

});
