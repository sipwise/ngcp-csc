Ext.define('NgcpCsc.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onPressEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onLoginClick();
        }
    },

    onCredentialsChanged: function(field, val){
        if(val.length < 1){
            field.addCls('invalid-field');
        }else{
            field.removeCls('invalid-field');
        }
    },

    languageSelection: function(cmp, rec) {
        var selectedLang = rec.get('id');
        this.getView().down('#title').setTitle(Ngcp.csc.locales.login.title[selectedLang]);
        this.getView().down('#login-username').setEmptyText(Ngcp.csc.locales.login.username[selectedLang]);
        this.getView().down('#login-password').setEmptyText(Ngcp.csc.locales.login.password[selectedLang]);
        this.getView().down('#login-language').setEmptyText(Ngcp.csc.locales.login.choose_language[selectedLang]);
        this.getView().down('#login-button').setText(Ngcp.csc.locales.login.button_text[selectedLang]);
        localStorage.setItem('languageSelected', selectedLang);
    },

    onLoginClick: function() {
        localStorage.removeItem('remember_me');
        if (!localStorage.getItem('languageSelected')) {
            localStorage.setItem('languageSelected', 'en');
        }
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
        var remember_me = this.getViewModel().get('remember_me') || false;
        var defaultCredentials = this.getViewModel().get('defaultCredentials');
        var languageSelected = localStorage.getItem('languageSelected');

        if (inputUsername === defaultCredentials && inputPassword === defaultCredentials) {
            localStorage.setItem('username', inputUsername);
            localStorage.setItem('password', inputPassword);
            if(remember_me){
                localStorage.setItem('remember_me', remember_me);
            }
            this.getView().close();
            Ext.create({
                xtype: 'ngcp-main'
            });
        }
    }
});
