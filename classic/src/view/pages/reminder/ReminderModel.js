Ext.define('NgcpCsc.view.pages.account.ReminderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reminder',
    session: true,
    links: {
        reminder: {
            type: 'NgcpCsc.model.Reminder',
            id: Ext.id()
        }
    }
});
