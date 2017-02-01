Ext.define('NgcpCsc.view.pages.password.PasswordController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.password',

    resetForm: function() {
        this.getViewModel().set('credentials.old_password', '');
        this.getViewModel().set('credentials.new_password', '');
        this.getViewModel().set('credentials.repeat_password', '');
    },

    submitForm: function(field) {
        var oldPassword = localStorage.getItem('password');
        var enteredOldPassword = this.getViewModel().get('credentials.old_password');
        var newPassword = this.getViewModel().get('credentials.new_password');
        var repeatPassword = this.getViewModel().get('credentials.repeat_password');
        if (enteredOldPassword === null) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.password.enter_current[localStorage.getItem('languageSelected')]);
        } else if (newPassword.length < 6 || repeatPassword.length < 6) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.password.password_short[localStorage.getItem('languageSelected')]);
        } else if (oldPassword === enteredOldPassword && newPassword === repeatPassword) {
            localStorage.setItem('password', newPassword);
            this.fireEvent('showmessage', true, Ngcp.csc.locales.password.change_success[localStorage.getItem('languageSelected')]);
        } else if (newPassword !== repeatPassword) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.password.password_match[localStorage.getItem('languageSelected')]);
        } else if (oldPassword !== enteredOldPassword) {
            this.fireEvent('showmessage', false, Ngcp.csc.locales.password.wrong_password[localStorage.getItem('languageSelected')]);
        };
        this.resetForm();
    },

    onEnterPressed: function (field, el) {
        if (el.getKey() == el.ENTER) {
            this.submitForm(field.id);
        };
    }

});
