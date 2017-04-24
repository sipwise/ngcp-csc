/*
let's use this class as helper to format data.
An example of usage:
Ngcp.csc.formatter.timeSince('2016-10-13T11:14:12.274000000+02:00');

The return value is
- "seconds ago" if date within the last minute
- "minutes ago" if date within the last 5 minutes
- "x minutes ago" if date between 6 and 59 minutes ago
- "today at hh:mm" if date >= than 1 hour ago today
- "yesterday at hh:mm" if date was during yesterday's timeframe (from 00:00 to 23:59)
- "dd.mm.yyy at hh:mm" else

TODO better data

*/
Ext.define('Ngcp.csc.formatter', {
    statics: {
        timeSince: function (date) {
            var date = new Date(date);
            var resetDate = new Date(date);
            var todaysDate = new Date();
            var yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            var happenedToday = resetDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0);
            var happenedYesterday = resetDate.setHours(0,0,0,0) == yesterdayDate.setHours(0,0,0,0);
            var seconds = Math.floor((new Date() - date) / 1000);
            var interval = Math.floor(seconds / 86400); // days
            switch(true){
                case interval >= 2:
                    return Ext.Date.format(date, 'F j, Y \\a\\t g:i a');
                break;
                case happenedYesterday:
                    return "Yesterday at " + Ext.Date.format(date, 'g:i a');
                break;
            }
            interval = Math.floor(seconds / 3600); // hours
            if (interval >= 1 && happenedToday) {
                return "Today at " + Ext.Date.format(date, 'g:i a');
            }
            interval = Math.floor(seconds / 60); // minutes
            switch(true){
                case interval >= 6 && interval < 60:
                    return interval + " minutes " +  Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')];
                break;
                case interval >= 1 && interval < 6:
                    return "minutes " +  Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')];
                break;
            }
            return "seconds " +  Ngcp.csc.locales.common.ago[localStorage.getItem('languageSelected')];
        }
    }
});
