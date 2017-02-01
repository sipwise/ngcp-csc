Ext.define('NgcpCsc.view.pages.password.PasswordModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.password',

    links: {
        credentials: {
            type: 'NgcpCsc.model.Password',
            id: Ext.id()
        }
    },

    formulas: {
        username: function(get) {
            return Ext.String.format('{0}: <span class="account-username">{1}</span>', Ngcp.csc.locales.common.username[localStorage.getItem('languageSelected')], localStorage.getItem('username'));
        }
    }

});
