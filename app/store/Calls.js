Ext.define('NgcpCsc.store.Calls', {
    extend: 'Ext.data.Store',

    storeId: 'Calls',

    model: 'NgcpCsc.model.Call',

    autoLoad: true,

    groupField: 'timeGroup',

    proxy: {
        type: 'ajax',
        url: '/resources/data/calls.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(store, recs) {

            var callStartTime,
                today = new Date(),
                oneWeekAgo = new Date();

            today.setDate(today.getDate());
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            Ext.each(recs, function(rec) {
                callStartTime = new Date(rec.get('start_time')).getTime();
                if (callStartTime >= today.getTime()) {
                    rec.set('timeGroup', '1.' + Ngcp.csc.locales.common.today[localStorage.getItem('languageSelected')])
                } else if (callStartTime < today.getTime() && callStartTime > oneWeekAgo.getTime()) {
                    rec.set('timeGroup', '2.' + Ngcp.csc.locales.common.last_week[localStorage.getItem('languageSelected')])
                } else {
                    rec.set('timeGroup', '3.' + Ngcp.csc.locales.common.past[localStorage.getItem('languageSelected')])
                }
            });
            this.group();
        }
    }

});
