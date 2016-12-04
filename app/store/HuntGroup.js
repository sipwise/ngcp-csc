Ext.define('NgcpCsc.store.HuntGroup', {
    extend: 'Ext.data.Store',

    storeId: 'HuntGroup',

    model: 'NgcpCsc.model.HuntGroup',

    groupField: 'name',

    proxy: {
        type: 'ajax',
        url: '/resources/data/huntgroup.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
