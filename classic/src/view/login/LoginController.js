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
        this.getView().down('#login-username').setFieldLabel(Ngcp.csc.locales.login.username[localStorage.getItem('languageSelected')]);
        this.getView().down('#login-password').setFieldLabel(Ngcp.csc.locales.login.password[localStorage.getItem('languageSelected')]);
        this.getView().down('#login-language').setFieldLabel(Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected')]);
        this.getView().down('#login-button').setConfig('text', Ngcp.csc.locales.login.button_text[localStorage.getItem('languageSelected')]);
        this.getView().setConfig('title', Ngcp.csc.locales.login.title[localStorage.getItem('languageSelected')]);
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
            this.showMessage(Ngcp.csc.locales.login.missing_username[localStorage.getItem('languageSelected')]);
        } else if (inputPassword === '') {
            this.showMessage(Ngcp.csc.locales.login.missing_password[localStorage.getItem('languageSelected')]);
        } else if (inputUsername !== defaultCredential || inputPassword !== defaultCredential) {
            this.showMessage(Ngcp.csc.locales.login.invalid_credentialse[localStorage.getItem('languageSelected')]);
        }
    }

});
