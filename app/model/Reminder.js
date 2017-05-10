Ext.define('NgcpCsc.model.Reminder', {
    extend: 'Ext.data.Model',

    fields: ["reminder_status", "timer", "recurrence"],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:1443/api/reminders/',
        withCredentials: true,
        username: 'administrator',
        password: 'administrator',
        actionMethods:{
            read: 'GET'
        },
        autoLoad: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
