Ext.define('NgcpCsc.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onPressEnter: function(field, e) {
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
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

    onLoginClick: function() {
        var me = this;
        if (!localStorage.getItem('languageSelected')) {
            localStorage.setItem('languageSelected', 'en');
        }
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');
        Ext.Ajax.request({
            url: '/login_jwt/',
            method: 'POST',
            jsonData: {
                username: inputUsername,
                password: inputPassword
            },
            success: this.successLogin,
            failure: this.unsuccessLogin,
            scope: this
        });
    },

    successLogin: function(response) {
        var data = Ext.decode(response.responseText);
        if (data.jwt) {
            localStorage.setItem('username', this.getViewModel().get('username'));
            localStorage.setItem('subscriber_id', data.subscriber_id);
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('type', data.type || 'admin'); // this is the user Role, which shows/hides the modules in navigation tree
            this.getView().close();
            Ext.create({
                xtype: 'ngcp-main'
            });
        }
    },

    unsuccessLogin: function(response) {
        localStorage.removeItem('jwt');
        Ext.Msg.alert('Error', 'Username or Password not valid!');
    }
});
