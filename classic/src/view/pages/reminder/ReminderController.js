Ext.define('NgcpCsc.view.pages.reminder.ReminderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reminder',

    clickActiveInactiveButton: function () {
        var vm = this.getViewModel();
        var currentReminderIsMode = vm.get('reminder.reminder_status');
        switch (currentReminderIsMode) {
            case false:
                this.fireEvent('showmessage', false, Ngcp.csc.locales.reminder.reminder_set_to_inactive[localStorage.getItem('languageSelected')]);
                break;
            case true:
                this.fireEvent('showmessage', true, Ngcp.csc.locales.reminder.reminder_set_to_active[localStorage.getItem('languageSelected')]);
                break;
        };
    }

});
