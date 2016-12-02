Ext.define('NgcpCsc.view.pages.account.ReminderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reminder',
    links: {
        reminder: {
            type: 'NgcpCsc.model.Reminder',
            id: Ext.id()
        }
    }
});
