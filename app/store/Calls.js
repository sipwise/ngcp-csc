Ext.define('NgcpCsc.store.Calls', {
    extend: 'Ext.data.Store',

    storeId: 'Calls',

    model: 'NgcpCsc.model.Call',

    autoLoad: true,

    groupField: 'timeGroup',

    proxy: {
        type: 'ajax',
        url: '/app/data/calls.json',
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
                    rec.set('timeGroup', '1.' + Ngcp.csc.locales.common.today[Ext.manifest.locale])
                } else if (callStartTime < today.getTime() && callStartTime > oneWeekAgo.getTime()) {
                    rec.set('timeGroup', '2.' + Ngcp.csc.locales.common.last_week[Ext.manifest.locale])
                } else {
                    rec.set('timeGroup', '3.' + Ngcp.csc.locales.common.past[Ext.manifest.locale])
                }
            });
            this.group();
        }
    }

});
