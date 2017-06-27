/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('NgcpCsc.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.login',

    // left inline by purpose until auth specs
    data: {
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || ''
    },

    formulas: {
        authValid: function(get) {
            return ( get('username').length > 0 && get('password').length > 0);
        }
    }

});
