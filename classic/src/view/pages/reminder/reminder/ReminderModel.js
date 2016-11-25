Ext.define('NgcpCsc.view.pages.account.ReminderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reminder',
    data: {
        reminder_status: true,
        timer:'17:50',
        recurrence:{
            value:'always'
        }
    },
    formulas: {
        checkReminder: function(get) {
            var active = get('reminder_status') ? 'active' : 'inactive';
            return Ext.String.format('<span class="fa fa-exclamation fa-3x"></span><span>{0} {1}</span>', Ngcp.csc.locales.reminder.is[localStorage.getItem('languageSelected')], active);
        }
    }
});
