Ext.define('NgcpCsc.view.pages.reminder.ReminderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reminder',

    clickActiveInactiveButton: function() {
        var vm = this.getViewModel();
        var currentReminderIsMode = vm.get('reminder.reminder_status');
        switch (currentReminderIsMode) {
            case false:
                dataset.qtip = 'Set to active...';
                this.fireEvent('showmessage', true, Ngcp.csc.locales.reminder.reminder_set_to_inactive[localStorage.getItem('languageSelected')]);
                break;
            case true:
                dataset.qtip = 'Set to inactive...';
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
                        me.fireEvent('showmessage', false, Ngcp.csc.locales.common.save_unsuccess[localStorage.getItem('languageSelected')]);
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
    },

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [event]);
        }
    },

    toggleReminderActive: function(event) {
        var vm = this.getViewModel();
        var classList = event.target.classList;
        var prefixElementClassList = document.getElementById('toggleTextPrefixReminder').classList;
        var suffixElementClassList = document.getElementById('toggleTextSuffixReminder').classList;
        var currentValue = vm.get('reminder.reminder_status');
        var newValueToUse = currentValue ? false : true;
        var currentFontValueSuffix = currentValue ? 'off' : 'on';
        var newFontClassSuffix = currentValue ? 'on' : 'off';
        vm.set('reminder.reminder_status', newValueToUse);
        classList.remove('fa-toggle-' + currentFontValueSuffix);
        classList.add('fa-toggle-' + newFontClassSuffix);
        prefixElementClassList.toggle('grey');
        suffixElementClassList.toggle('grey');
        this.clickActiveInactiveButton();
    }

});
