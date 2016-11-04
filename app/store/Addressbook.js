Ext.define('NgcpCsc.store.Addressbook', {
    extend: 'Ext.data.Store',

    storeId: 'Addressbook',

    model: 'NgcpCsc.model.Addressbook',

    autoLoad: true,

    groupField: 'firstname_initial',

    proxy: {
        type: 'ajax',
        url: '/resources/data/addressbook.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});
