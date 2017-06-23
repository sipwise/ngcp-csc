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

    onLoginClick: function() {
        var me = this;
        if (!localStorage.getItem('languageSelected')) {
            localStorage.setItem('languageSelected', 'en');
        }
        var inputUsername = this.getViewModel().get('username');
        var inputPassword = this.getViewModel().get('password');

        Ext.Ajax.request({
            url: Ext.manifest.resources.path + '/data/auth.json', // will be '/login_jwt/',
            method: 'GET', // will be POST
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
        var data = Ext.decode(response.responseText).data;
        if (data.token) {
            localStorage.setItem('username', this.getViewModel().get('username'));
            localStorage.setItem('subscriber_id', data.subscriber_id);
            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('type', data.type || 'admin'); // this is the user Role, which shows/hides the modules in navigation tree
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
