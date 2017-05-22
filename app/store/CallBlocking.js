Ext.define('NgcpCsc.store.CallBlocking', {
    extend: 'Ext.data.Store',

    storeId: 'CallBlocking',

    model: 'NgcpCsc.model.CallBlocking',

    autoLoad: true,

    proxy: {
        type: 'ngcp-api',
        route: 'subscriberpreferences', // subscriber id should be read from localStorage
        subscriberId: '175',
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'PATCH'
        }
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
            store.commitChanges();
            this.fireEvent('cbStoreLoaded', this, data);
        },
        beforesync: function(options) {
            var block_in_list = [],
                data = [];
            Ext.each(this.getRange(), function(record) {
                block_in_list.push(record.get('block_list'));
            });
            delete options['destroy'];
            delete options['create'];

            options["update"] = [Ext.create('NgcpCsc.model.Patch',{
                "id": "175",
                "op": "add",
                "path": "/block_in_list",
                "value": block_in_list
            })]
        }
    }
});
