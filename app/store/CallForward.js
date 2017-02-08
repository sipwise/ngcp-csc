Ext.define('NgcpCsc.store.CallForward', {
    extend: 'Ext.data.Store',

    storeId: 'CallForward',

    model: 'NgcpCsc.model.CallForward',

    autoLoad: true,

    listeners: {
        load: function(store, recs) {
            Ext.each(recs, function(rec) {
                var phone = rec.get('phone');
                var secs = rec.get('ring_for');
                console.log(store.length);
                if (!isNaN(parseInt(phone.charAt(0)))) {
                    rec.set('sentence', '+' + phone + ' and ring for ' + secs + ' secs');
                } else {
                    rec.set('sentence', phone + ' and ring for ' + secs + ' secs');
                }
            });
        }
    }

});
