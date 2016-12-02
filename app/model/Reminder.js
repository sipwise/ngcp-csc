Ext.define('NgcpCsc.model.Reminder', {
    extend: 'Ext.data.Model',

    fields: ["reminder_status", "timer", "recurrence"],

    proxy: {
        type: 'ajax',
        url: '/resources/data/reminder.json',
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
