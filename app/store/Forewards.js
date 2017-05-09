Ext.define('NgcpCsc.store.Forewards', {
    extend: 'Ext.data.Store',

    storeId: 'Forewards',

    model: 'NgcpCsc.model.Foreward',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/resources/data/forewards.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
