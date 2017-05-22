Ext.define('NgcpCsc.store.CallBlocking', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlocking',

    model: 'NgcpCsc.model.CallBlocking',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'subscriberpreferences/175' // subscriber id should be read from localStorage
    },

    listeners: {
        load: function(store, recs) {
            var data = recs[0];
            var models = [];
            var blockInNums = data.get(this._type);

            store.removeAll();
            Ext.each(blockInNums, function(num) {
                var cbModel = Ext.create('NgcpCsc.model.CallBlocking', {
                    block_list: num,
                    enabled: (num.charAt(0) !== '#')
                });
                store.add(cbModel);
            });
            this.fireEvent('cbStoreLoaded', this, data);
        }
    }
});
