Ext.define('NgcpCsc.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onPressEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onLoginClick();
        }
    },

    onCredentialsChanged: function(field, val) {
        if (val.length < 1) {
            field.addCls('invalid-field');
        } else {
            field.removeCls('invalid-field');
        }
    },

    // XXX: Leaving this for possible future re-implementation
    // languageSelection: function(cmp, rec) {
    //     var selectedLang = rec.get('id');
    //     this.getView().down('#title').setTitle(Ngcp.csc.locales.login.title[selectedLang]);
    //     this.getView().down('#login-username').setEmptyText(Ngcp.csc.locales.common.username[selectedLang]);
    //     this.getView().down('#login-password').setEmptyText(Ngcp.csc.locales.common.password[selectedLang]);
    //     this.getView().down('#login-language').setEmptyText(Ngcp.csc.locales.login.choose_language[selectedLang]);
    //     this.getView().down('#login-button').setText(Ngcp.csc.locales.login.button_text[selectedLang]);
    //     localStorage.setItem('languageSelected', selectedLang);
    // },

    onLoginClick: function() {
        var me = this;
        if (!localStorage.getItem('languageSelected')) {
            localStorage.setItem('languageSelected', 'en');
        }
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
        var languageSelected = localStorage.getItem('languageSelected');

        Ext.Ajax.request({
            url: '/login_jwt/',
            method: 'POST',
            jsonData: {
                username: inputUsername,
                password: inputPassword
            },
            success: this.successLogin,
            failure: this.unsuccessLogin
        });
    },

    successLogin: function(response) {
        var data = Ext.decode(response.responseText);
        if (data.token) {
            localStorage.setItem('username', this.getViewModel().get('username'));
            localStorage.setItem('subscriber_id', data.subscriber_id);
            localStorage.setItem('jwt_token', data.token);
            this.getView().close();
            Ext.create({
                xtype: 'ngcp-main'
            });
        }
    },

    unsuccessLogin: function(response) {
        localStorage.removeItem('jwt_token');
        Ext.Msg.alert('Error', 'Username or Password not valid!');
    }
});
