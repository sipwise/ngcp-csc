Ext.define('NgcpCsc.view.pages.account.AccountModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.account',

    data: {
        new_password: '',
        old_password: '',
        repeat_password: ''
    },

    formulas: {
        username: function(get) {
            return Ext.String.format('{0}: <span class="account-username">{1}</span>', Ngcp.csc.locales.account.username[localStorage.getItem('languageSelected')], localStorage.getItem('username'));
        }
    }

});
