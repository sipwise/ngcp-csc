Ext.define('NgcpCsc.view.pages.reminder.Reminder', {
    extend: 'Ext.panel.Panel',

    xtype: 'reminder',

    controller: 'reminder',

    title: Ngcp.csc.locales.reminder.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    items:[]

});
