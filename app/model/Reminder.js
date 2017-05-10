Ext.define('NgcpCsc.model.Reminder', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    fields: ["reminder_status", "timer", "recurrence"],

    proxy: {
        type: 'ngcp-api',
        route: 'reminders/',
        autoLoad: true
    },
    listeners: {
        // here is where the data should be parsed, if needed
        beforeload: function() {},
        beforesync: function() {}
    }
});
