/*
let's use this class as helper to format data.
An example of usage:
Ngcp.csc.formatter.timeSince('2016-10-13T11:14:12.274000000+02:00');
*/
Ext.define('Ngcp.csc.formatter', {
    statics: {
        timeSince: function (date) {

            var date = new Date(date);

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
        splitData: function (data) {
            // return data + ' test'; // Works
            return data.replace(/,/g, ", "); // Does not work
        }
    }
});
