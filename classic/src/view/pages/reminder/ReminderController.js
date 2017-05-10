Ext.define('NgcpCsc.view.pages.reminder.ReminderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reminder',

    clickActiveInactiveButton: function() {
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
    },
    saveReminder: function() {
        var me = this;
        var reminderRec = this.getViewModel().get('reminder');
        Ext.defer(function() {
            if (reminderRec.dirty) {
                reminderRec.save({
                    failure: function(record, operation) {
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
                    },
                    success: function(record, operation) {
                        me.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
                    },
                    callback: function(record, operation, success) {
                        // do something whether the save succeeded or failed
                    }
                });
            }
        }, 1);
    }
});
