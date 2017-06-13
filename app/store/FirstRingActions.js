Ext.define('NgcpCsc.store.FirstRingActions', {
    extend: 'Ext.data.Store',

    storeId: 'FirstRingActions',

    model: 'NgcpCsc.model.FirstRingAction',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/firstringactions.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
