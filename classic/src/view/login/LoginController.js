Ext.define('NgcpCsc.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    loginFormReset: function () {
        this.getViewModel().set('username', '');
        this.getViewModel().set('password', '');
        this.getViewModel().set('message', '');
    },

    onPressEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.onLoginClick();
        }
    },

    onLoginClick: function () {
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
        var inputMessage = this.getView().down('message');

        if (inputUsername === 'admin' && inputPassword === 'admin') {
            this.getView().destroy();
            // TODO: Use
            Ext.create({
                xtype: 'ngcp-main'
            });
        } else if (inputUsername === 'admin' && inputPassword !== 'admin') {
            this.lookupReference('login-form').getForm().markInvalid([{
                field: 'password',
                message: 'Invalid password'
            }]);
            this.loginFormReset();
            this.getViewModel().set('message', 'Login failed, please verify username and password.');
        } else if (inputUsername === '') {
            this.loginFormReset();
            this.getViewModel().set('message', 'Please enter your username.');
        } else if (inputPassword === '') {
            this.loginFormReset();
            this.getViewModel().set('message', 'Please enter your password.');
        } else if (inputUsername !== 'admin' && inputPassword !== '') {
            this.lookupReference('login-form').getForm().markInvalid([{
                field: 'username',
                message: 'Invalid username'
            }]);
            this.loginFormReset();
            this.getViewModel().set('message', 'Login failed, please verify username and password.');
        }
    }

});
