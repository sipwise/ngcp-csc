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
        // TODO: (seem to only be able to display times that we have stored from
        // csc panel. if I change in ngcp-csc, it gives me blank value)
        // TODO: 1. Fix it so that we can also store and read time with minutes
        // TODO: a. after investigating I have discovered:
        //         I. changing type to "string" enables us to read time with
        //            minutes and seconds, but gives PUT error when writing
        //        II. the issue might have to do with the fact we are consuming
        //            HAL api. see possible solution here (though strange that it
        //            works partly by writing hours and not also minutes):
        //            https://www.sencha.com/forum/showthread.php?297936-Integrate-Extjs-with-HAL-REST
        // TODO: 2. The API allows for seconds and increments of 1 second and 1
        // minute. We need to accomodate this eventually. Will look into it now,
        // and implement a solution if I can come up with something appropriate.
        // could for example just do as in ngcp-css; textfield manually entered
        name: "time",
        dateFormat: 'H:m:s',
        type: 'date',
        // type: "string",
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
        params: 'subscriber_id=175'
    }
});
