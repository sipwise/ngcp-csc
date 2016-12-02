Ext.define('NgcpCsc.view.pages.account.AccountModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.account',

    links: {
        credentials: {
            type: 'NgcpCsc.model.Account',
            id: Ext.id()
        }
    },

    formulas: {
        username: function(get) {
            return Ext.String.format('{0}: <span class="account-username">{1}</span>', Ngcp.csc.locales.common.username[localStorage.getItem('languageSelected')], localStorage.getItem('username'));
        }
    }

});
