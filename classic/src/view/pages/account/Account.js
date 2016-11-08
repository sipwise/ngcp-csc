Ext.define('NgcpCsc.view.pages.account.Account', {
    extend: 'Ext.panel.Panel',

    xtype: 'account',

    controller: 'account',

    title: Ngcp.csc.locales.account.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    items: [{
        height: 60,
        padding: '20 0 5 20',
        html: Ngcp.csc.locales.account.subtitle[localStorage.getItem('languageSelected')]
    }, {
        height: 60,
        padding: '20 0 5 20',
        html: Ngcp.csc.locales.account.password_instructions[localStorage.getItem('languageSelected')]
    }, {
        xtype: 'accountform'
    }, {
        xtype: 'container',
        height: 40,
        padding: '10 0 10 10',
        html: Ngcp.csc.locales.account.change_password[localStorage.getItem('languageSelected')].toLowerCase(),
        cls: 'link',
        listeners: {
            click: {
                element: 'el',
                fn: 'submitForm'
            }
        }
    }, {
        xtype: 'container',
        height: 40,
        padding: '10 0 10 10',
        html: Ngcp.csc.locales.account.reset_form[localStorage.getItem('languageSelected')].toLowerCase(),
        cls: 'link',
        listeners: {
            click: {
                element: 'el',
                fn: 'resetForm'
            }
        }
    }]

});
