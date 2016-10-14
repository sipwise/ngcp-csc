/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('NgcpCsc.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.login',

    data: {
       username: '',
       password: '',
       message: ''
   }
});
