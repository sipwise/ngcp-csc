Ext.define('NgcpCsc.model.Reminder', {
    extend: 'Ext.data.Model',

    requires: ['NgcpCsc.proxy.NgcpApi'],

    fields: [{
        name: "_embedded",
        persist: false
    }, {
        name: "_links",
        persist: false
    }, {
        name: "total_count",
        persist: false
    }, {
        name: "id",
        persist: false
    }, {
        name: "recur",
        mapping: function(data) {
            return data._embedded['ngcp:reminders'][0].recur;
        }
    }, {
        name: "time",
        dateFormat: 'H:i:s',
        type: 'date',
        mapping: function(data) {
            console.log(data._embedded['ngcp:reminders'][0].time);
            return data._embedded['ngcp:reminders'][0].time;
        }
    }, {
        name: "reminder_status",
        mapping: function(data) {
            return true;
        }
    }, {
        name: "subscriber_id",
        mapping: function(data) {
            return data._embedded['ngcp:reminders'][0].subscriber_id;
        }
    }],

    // this replace the temprary Model ID in VM links
    onLoad: function() {
        this.set("id", this.data._embedded['ngcp:reminders'][0].id);
        this.commit();
    },

    proxy: {
        type: 'ngcp-api',
        route: 'reminders',
        params: 'subscriber_id=239'
    }
});
