Ext.define('NgcpCsc.view.pages.reminder.ReminderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reminder',

    saveReminder: function() {
        var me = this;
        var reminderRec = this.getViewModel().get('reminder');
        var totalCount = reminderRec.get('total_count');
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
            } else {
                me.fireEvent('showmessage', false, Ngcp.csc.locales.common.no_changes[localStorage.getItem('languageSelected')]);
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
        var dataset = event.target.dataset;
        var prefixElementClassList = document.getElementById('toggleTextPrefixReminder').classList;
        var suffixElementClassList = document.getElementById('toggleTextSuffixReminder').classList;
        var currentValue = vm.get('reminder.active');
        var newValueToUse = currentValue ? false : true;
        var currentFontValueSuffix = currentValue ? 'off' : 'on';
        var newFontClassSuffix = currentValue ? 'on' : 'off';
        var reminderForm = this.lookupReference('reminderForm');
        vm.set('reminder.active', newValueToUse);
        classList.remove('fa-toggle-' + currentFontValueSuffix);
        classList.add('fa-toggle-' + newFontClassSuffix);
        prefixElementClassList.toggle('grey');
        suffixElementClassList.toggle('grey');
        dataset.qtip = Ngcp.csc.locales.reminder.activate_or_deactivate[newFontClassSuffix][localStorage.getItem('languageSelected')];
        if (reminderForm.getUserCls() == 'reminder-form') {
            reminderForm.setUserCls(null);
        } else {
            reminderForm.setUserCls('reminder-form');
        }
    }

});
