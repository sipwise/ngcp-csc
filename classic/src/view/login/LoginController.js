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

    languageSelection: function (cmp, rec) {
        languageSelected = localStorage.setItem('languageSelected', rec.get('id'));
    },

    showMessage: function (message) {
        this.loginFormReset();
        this.getViewModel().set('message', message);
        inputMessageComponent.show();
    },

    onLoginClick: function () {
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
        var defaultCredential = 'administrator';
        languageSelected = localStorage.getItem('languageSelected') || 'en';
        inputMessageComponent = this.getView().down('#login-message');

        if (inputUsername === defaultCredential && inputPassword === defaultCredential) {
            this.getView().destroy();
            Ext.create({
                xtype: 'ngcp-main'
            });
        } else if (inputUsername === '' && inputPassword === '' || inputUsername === '' ) {
            this.showMessage('Please enter your username.');
        } else if (inputPassword === '') {
            this.showMessage('Please enter your password.');
        } else if (inputUsername !== defaultCredential || inputPassword !== defaultCredential) {
            this.showMessage('Login failed, please verify username and password.');
        }
    }

});
