Ext.define('NgcpCsc.store.Sounds', {
    extend: 'Ext.data.Store',

    storeId: 'Sounds',

    model: 'NgcpCsc.model.Sound',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/sounds.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
