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
            if (data && data._embedded && data._embedded['ngcp:reminders'] && data._embedded['ngcp:reminders'].length > 0) {
                return data._embedded['ngcp:reminders'][0].recur;
            }
        }
    }, {
        name: "time",
        type: 'date',
        dateFormat: 'H:i',
        mapping: function(data) {
            if (data && data._embedded && data._embedded['ngcp:reminders'] && data._embedded['ngcp:reminders'].length > 0) {
                return data._embedded['ngcp:reminders'][0].time.substr(0,5);
            }
        }
    }, {
        name: "active",
        mapping: function(data) {
            if (data && data._embedded && data._embedded['ngcp:reminders'] && data._embedded['ngcp:reminders'].length > 0) {
                return data._embedded['ngcp:reminders'][0].active;
            } else {
                return false;
            }
        }
    }, {
        name: "subscriber_id",
        mapping: function(data) {
            if (data && data._embedded && data._embedded['ngcp:reminders'] && data._embedded['ngcp:reminders'].length > 0) {
                return data._embedded['ngcp:reminders'][0].subscriber_id;
            }
        }
    }],

    onLoad: function() {
        if (this.data && this.data._embedded && this.data._embedded['ngcp:reminders'] && this.data._embedded['ngcp:reminders'].length > 0) {
            this.set("id", this.data._embedded['ngcp:reminders'][0].id);
            this.commit();
        }else{
            // in case there are no reminders in DB for the current subscriber,
            // a new one needs to be created
            Ext.Ajax.request({
                url: '/api/reminders/',
                method: 'POST',
                jsonData: {
                    subscriber_id: localStorage.getItem('subscriber_id'),
                    time: '00:00',
                    recur : 'never'
                },
                success: function(){
                    this.load();
                },
                scope: this
            });
        }
    },

    proxy: {
        type: 'ngcp-api',
        route: 'reminders',
        params: 'subscriber_id=' + localStorage.getItem('subscriber_id')
    }
});
