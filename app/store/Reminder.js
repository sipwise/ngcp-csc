Ext.define('NgcpCsc.store.Reminder', {
    extend: 'Ext.data.Store',

    storeId: 'Reminder',

    model: 'NgcpCsc.model.Reminder',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'reminders',
        params: 'subscriber_id=179',
        actionMethods: {
            read: 'GET',
            update: 'PATCH'
        }
    },

    listeners: {
        load: function(store, recs) {
            this.fireEvent('reminderStoreLoaded', this, recs[0]);
        },
        beforesync: function(options) {
            this.fireEvent('reminderStoreBeforeSync', this, options);
        }
    }

});
