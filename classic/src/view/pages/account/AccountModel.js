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
            return '<strong>username:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + localStorage.getItem('username');
        }
    }

});
