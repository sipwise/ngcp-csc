Ext.define('NgcpCsc.store.Sounds', {
    extend: 'Ext.data.Store',

    storeId: 'Sounds',

    model: 'NgcpCsc.model.Sound',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: Ext.manifest.resources.path + '/data/sounds.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
