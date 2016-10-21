/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('NgcpCsc.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.login',

    data: {
        username: localStorage.getItem('username') || '',
        password:  localStorage.getItem('password') || '',
        defaultCredentials: 'administrator',
        remember_me: false
    },
    formulas: {
        authValid: function(get) {
            return (get('username') == get('defaultCredentials') && get('password') == get('defaultCredentials'));
        }
    }
});
